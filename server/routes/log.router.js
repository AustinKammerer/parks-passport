const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET request for getting a user's log records for all trips
router.get("/", rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT 
		    "trip"."user_id" AS "userId",
        "log"."id",
        "log"."trip_id" AS "tripId",
        "log"."type",
        "log"."text",
        "log"."image_path" AS "imagePath"
        FROM "trip"
        JOIN "log" ON "trip"."id" = "log"."trip_id"
        WHERE "user_id" = ${req.user.id}
        ORDER BY "log"."trip_id";
  `;
  pool
    .query(query)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })

    .catch((err) => {
      console.log("Error getting logs from database", err);
      res.sendStatus(500);
    });
});

// POST route for adding a journal entry
router.post("/:tripId", rejectUnauthenticated, (req, res) => {
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
router.delete("/:logId", rejectUnauthenticated, (req, res) => {
  const { logId } = req.params;
  const query = `
    DELETE FROM "log" WHERE "id" = $1;
  `;

  pool
    .query(query, [logId])
    .then((result) => {
      res.sendStatus(201);
    })

    .catch((err) => {
      console.log("Error deleting log from database", err);
      res.sendStatus(500);
    });
});

// PUT route for updating log text
router.put("/:logId", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { logId } = req.params;
  const { journalInput } = req.body;

  const query = `
    UPDATE "log" SET "text" = $1 WHERE "id" = $2
  `;

  pool
    .query(query, [journalInput, logId])
    .then((result) => {
      res.sendStatus(201);
    })

    .catch((err) => {
      console.log("Error updating log on database", err);
      res.sendStatus(500);
    });
});

module.exports = router;
