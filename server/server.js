const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");
const pool = require("./modules/pool");

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const parksRouter = require("./routes/park.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/park", parksRouter);

// Serve static files
app.use(express.static("build"));

// axios
//   .get(
//     `https://developer.nps.gov/api/v1/parks/?api_key=${process.env.NPS_API_KEY}&limit=470`
//   )
//   .then((response) => {
//     const results = response.data.data;
//     let query = `INSERT INTO "designations" ("type", "state") VALUES `;
//     for (let i = 0; i < results.length; i++) {
//       query += ` ('${results[i].designation}', '${results[i].states}')`;
//       if (i === results.length - 1) {
//         // if last iteration, add semicolon
//         query += `;`;
//       } else {
//         // otherwise, add comma
//         query += `,`;
//       }
//     }
//     pool.query(query);
//   });

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
