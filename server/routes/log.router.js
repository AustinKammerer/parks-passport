const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

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
            type: log.type,
            text: log.text,
            imagePath: log.imagePath,
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
      "type",
      "text",
      "log"."image_path" AS "imagePath"
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
      "image_path" AS "imagePath",
      "type"
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

// POST route for adding a journal entry
router.post("/entry/:tripId", rejectUnauthenticated, (req, res) => {
  const { tripId } = req.params;
  const { journalInput } = req.body;
  console.log(req.body);

  const query = `
    INSERT INTO "log" ("trip_id", "type", "text", "image_path")
        VALUES ($1, $2, $3, $4);
  `;
  pool
    .query(query, [
      tripId,
      journalInput ? "journal" : "image",
      journalInput,
      journalInput ? "" : imagePath,
    ])
    .then((result) => {
      res.sendStatus(201);
    })

    .catch((err) => {
      console.log("Error posting log to database", err);
      res.sendStatus(500);
    });
});

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
