const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  onError: function (err, next) {
    console.log("error", err);
    next(err);
  },
});
const { uploadFile, getFileStream } = require("../services/s3.js");

// this function puts a trip's log entries in an array of entry objects
// the array is then added to the 'entries' property of a slimmed down version of the 'trip' obj
// as a result, a single row is returned to the client
const combineLogs = (logs) => {
  let logObj = {
    tripId: logs[0].tripId,
    name: logs[0].name,
    states: logs[0].states,
    parkCode: logs[0].parkCode,
    coverImage: logs[0].coverImage,
    isCurrent: logs[0].isCurrent,
    isComplete: logs[0].isComplete,
    entries:
      logs[0].logId !== null
        ? logs.map((log) => ({
            logId: log.logId,
            text: log.text,
            imagePath: log.imagePath,
            time: log.time,
          }))
        : [],
  };
  return logObj;
};

// GET request for getting a user's log records for a trip
router.get("/:tripId", rejectUnauthenticated, (req, res) => {
  const { tripId } = req.params;
  console.log("GET", tripId);
  // joins 'trip' and 'log' to get the trip info along with it's log entries
  // UI will need both tables' data
  const query = `
    SELECT 
      "trip"."id" AS "tripId",
		  "name",
		  "states",
		  "park_code" AS "parkCode",
		  "trip"."image_path" AS "coverImage",
		  "is_current" AS "isCurrent",
		  "is_complete" AS "isComplete",
		  "log"."id" AS "logId",
      "text",
      "log"."image_path" AS "imagePath",
      "time"
    FROM "trip" LEFT JOIN "log" ON "trip"."id" = "log"."trip_id"
    WHERE "trip"."id" = $1
    ORDER BY "log"."id" DESC;
  `;
  pool
    .query(query, [tripId])
    .then((result) => {
      console.log("combined:", combineLogs(result.rows));
      // log entries are consolidated into a single array, so a single row is returned to client
      res.send(combineLogs(result.rows));
    })

    .catch((err) => {
      console.log("Error getting logs from database", err);
      res.sendStatus(500);
    });
});

// GET route for a specific log entry to edit
router.get("/entry/:logId", rejectUnauthenticated, (req, res) => {
  const { logId } = req.params;
  console.log("/entry:", req.params);
  const query = `
    SELECT
      "id" AS "logId",
      "trip_id" AS "tripId",
      "text",
      "image_path" AS "imagePath"
    FROM "log" WHERE "id" = $1;
  `;
  pool
    .query(query, [logId])
    .then((result) => {
      console.log("entry:", result.rows);
      // log entries are consolidated into a single array, so a single row is returned to client
      res.send(result.rows);
    })

    .catch((err) => {
      console.log("Error getting log entry from database", err);
      res.sendStatus(500);
    });
});

// GET route for getting uploads from S3
router.get("/entry/uploads/:key", (req, res) => {
  const { key } = req.params;
  // create a read stream for the image in the S3 bucket
  const readStream = getFileStream(key);
  // handle errors
  readStream.on("error", (error) => {
    res.sendStatus(500);
  });
  // pipe the read stream to the client
  readStream.pipe(res);
});

// POST route for adding a journal entry
router.post(
  "/entry",
  rejectUnauthenticated,
  upload.single("imageUpload"),
  async (req, res) => {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    const file = req.file;
    const { tripId, text } = req.body;
    // if the user is uploading a file:
    if (req.file) {
      try {
        // upload the file to S3 and save the response which contains the key needed to render
        const result = await uploadFile(file, text);
        // removed the file from the uploads file on the server
        await unlinkFile(file.path);
        console.log("result from s3:", result);
        // save the user's entry data to the database (includes the S3 key)
        const query = `
      INSERT INTO "log" ("trip_id", "text", "image_path")
      VALUES ($1, $2, $3);
    `;
        pool
          .query(query, [tripId, text, result.Key])
          .then((result) => {
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log(`Error posting log with upload:`, err);
            res.sendStatus(500);
          });
      } catch (error) {
        console.log("error uploading", error);
        res.sendStatus(500);
      }
    }
    // if the user is not uploading a photo
    else {
      const query = `
        INSERT INTO "log" ("trip_id", "text")
            VALUES ($1, $2);
      `;
      pool
        .query(query, [tripId, text])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log("Error posting log to database without upload", err);
          res.sendStatus(500);
        });
    }
  }
);

// DELETE route for deleting a log entry (image/journal)
router.delete("/entry/:logId", rejectUnauthenticated, (req, res) => {
  const { logId } = req.params;
  const query = `
    DELETE FROM "log" WHERE "id" = $1
    RETURNING "trip_id" AS "tripId"; 
  `;

  pool
    .query(query, [logId])
    .then((result) => {
      res.send(result.rows);
    })

    .catch((err) => {
      console.log("Error deleting log from database", err);
      res.sendStatus(500);
    });
});

// PUT route for updating log entry
router.put("/entry/:logId", rejectUnauthenticated, (req, res) => {
  console.log("put:", req.body);
  console.log(req.params);
  const { logId } = req.params;
  const { text, imagePath } = req.body;

  const query = `
    UPDATE "log" SET "text" = $1, "image_path" = $2 WHERE "id" = $3
  `;

  pool
    .query(query, [text, imagePath, logId])
    .then((result) => {
      res.sendStatus(201);
    })

    .catch((err) => {
      console.log("Error updating log on database", err);
      res.sendStatus(500);
    });
});

module.exports = router;
