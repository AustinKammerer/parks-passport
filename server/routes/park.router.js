const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const npsBaseUrl = `https://developer.nps.gov/api/v1/parks/?api_key=${process.env.NPS_API_KEY}`;
const npsAlertsUrl = `https://developer.nps.gov/api/v1/alerts/?api_key=${process.env.NPS_API_KEY}`;

// GET route for searching parks API by state
router.get("/finder", (req, res) => {
  // grab the state to search by from the client's query string
  const { stateCode } = req.query;
  console.log(req.query);
  // sends a GET request to NPS API
  axios
    .get(`${npsBaseUrl}&stateCode=${stateCode}`)
    .then((result) => {
      const list = result.data.data;
      // filter results to only return National Parks
      // there are many other designations on the API in addition to National Parks
      // const filtered = list.filter(
      //   (item) =>
      //     item.designation === "National Park" ||
      //     item.designation === "National Parks" ||
      //     item.designation === "National Park & Preserve" ||
      //     item.designation === "National Park and Preserve" ||
      //     item.designation === "National and State Parks"
      // );
      // console.log(filtered);
      res.send(list);
    })
    .catch((err) => {
      console.log("Error getting parks from NPS API", err);
      res.sendStatus(500);
    });
});

// GET route for getting info on a specific park from the NPS API
router.get("/info", (req, res) => {
  // grab the parkCode from the client's query string so it may be used in the request to the NPS API
  const { parkCode } = req.query;
  // send GET request to NPS API for a specific park's data
  axios
    .get(`${npsBaseUrl}&parkCode=${parkCode}`)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      console.log("Error getting park info from NPS API", err);
    });
});

// GET route for getting alerts for a specific park from the NPS API
router.get("/alerts", (req, res) => {
  // grab the parkCode from the client's query string so it may be used in the request to the NPS API
  const { parkCode } = req.query;
  // send GET request to NPS API for a specific park's data
  axios
    .get(`${npsAlertsUrl}&parkCode=${parkCode}`)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      console.log("Error getting park alerts from NPS API", err);
    });
});

// GET route for getting a list of states that contain National Parks
// this list is used for the search options in ParkFinder
router.get("/states", (req, res) => {
  // select the states for every park with particular disignation types
  // const query = `
  //   SELECT JSON_AGG("state") AS "states" FROM "designations"
  //       WHERE "type" = 'National Park'
  //       OR "type" = 'National Park and Preserve'
  //       OR "type" = 'National Park & Preserve'
  //       OR "type" = 'National Parks'
  //       OR "type" = 'National and State Parks'
  //       GROUP BY "type";
  // `;

  const queryForAll = `SELECT JSON_AGG("state") AS "states" FROM "designations";`;
  pool
    .query(queryForAll)
    .then((result) => {
      // result.rows is an array of objects containing arrays of states
      // these arrays need to be mapped into a single array and then flattened
      // but if a park spans multiple parks, the states are combined in a single string (ex: 'CA,NV')
      // these cases need to be separated into discrete elements (ex: 'CA, 'NV')

      // combine each row's array into a single array:
      let statesList = result.rows.map((row) => [...row.states]);
      // iterate over each subarray and parse multi-state strings
      const parsedStatesList = statesList.map((arr) =>
        arr.map((el) => (el.includes(",") ? el.split(",") : el))
      );
      // flatten the array of sub-arrays
      // depth of 2 is passed because parsing multi-state strings results in an another nested array
      const flattenedStatesList = parsedStatesList.flat(2);
      // remove duplicate states by spreading the processed list into a new Set, then sort by state
      let filteredStatesList = [...new Set(flattenedStatesList)].sort();
      console.log("list for client:", filteredStatesList);
      // send the final list back to the cient to use with a selector input
      res.send(filteredStatesList);
    })
    .catch((err) => {
      console.log("Error getting list of states from database", err);
      res.sendStatus(500);
    });
});

module.exports = router;
