const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../modules/pool");

const npsBaseUrl = `https://developer.nps.gov/api/v1/parks/?api_key=${process.env.NPS_API_KEY}`;

// GET route for searching parks API by state
router.get("/finder", (req, res) => {
  // grab the state to search by from the client's query string
  const state = req.query.stateCode;
  console.log(req.query);
  // sends a GET request to NPS API
  axios
    .get(`${npsBaseUrl}&stateCode=${state}`)
    .then((response) => {
      console.log("response is:", response);
      const list = response.data.data;
      // filter results to only return National Parks
      // there are many other designations on the API in addition to National Parks
      const filtered = list.filter(
        (item) =>
          item.designation === "National Park" ||
          item.designation === "National Parks" ||
          item.designation === "National Park & Preserve" ||
          item.designation === "National Park and Preserve" ||
          item.designation === "National and State Parks"
      );
      // console.log(filtered);
      res.send(filtered);
    })
    .catch((err) => {
      console.log("Error getting parks from NPS API", err);
    });
});

// GET route for getting info on a specific park from the NPS API
router.get("/info/:parkCode", (req, res) => {
  // grab the parkCode from the url so it may be used in the request to the NPS API
  const { parkCode } = req.params;
  // send GET request to NPS API for a specific park's data
  axios
    .get(`${npsBaseUrl}&parkCode=${parkCode}`)
    .then((response) => {
      console.log("response is:", response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log("Error getting park info from NPS API", err);
    });
});

// GET route for getting a list of states that contain National Parks
// this list is used for the search options in ParkFinder
router.get("/states", (req, res) => {
  // select the states for every park with particular disignation types
  const query = `SELECT JSON_AGG("state") AS "states" FROM "designations"
WHERE "type" = 'National Park'
OR "type" = 'National Park and Preserve'
OR "type" = 'National Park & Preserve'
OR "type" = 'National Parks'
OR "type" = 'National and State Parks'
GROUP BY "type"
;`;
  pool
    .query(query)
    .then((response) => {
      console.log("response is:", response);
      // response.rows is an array of objects containing arrays of states
      // these arrays need to be mapped into a single array and then flattened
      // but if a park spans multiple parks, the states are combined in a single string (ex: 'CA,NV')
      // these cases need to be separated into discrete elements (ex: 'CA, 'NV')

      // combine each row's array into a single array:
      let statesList = response.rows.map((row) => [...row.states]);
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
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
