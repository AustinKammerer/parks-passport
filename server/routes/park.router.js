const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../modules/pool");

/**
 * GET route template
 */
router.get("/finder", (req, res) => {
  // GET route code here
  const state = req.query.stateCode;
  console.log(req.query);
  axios
    .get(
      `https://developer.nps.gov/api/v1/parks/?api_key=${process.env.NPS_API_KEY}&stateCode=${state}`
    )
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
      console.log(filtered);
      res.send(filtered);
    })
    .catch((err) => {
      console.log("Error getting on server", err);
    });
});

router.get("/states", (req, res) => {
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
      let statesList = response.rows
        .map((row) => [...row.states])
        .flat()
        .map((el) => el.split(","))
        .flat();
      // let flatStatesList = statesList.flat();
      // // console.log(flatStatesList);
      // let parsedList = flatStatesList.map((el) => el.split(","));
      // // console.log(parsedList);
      // let list = parsedList.flat();
      console.log(statesList);
      let filteredStatesList = [...new Set(statesList)].sort();
      console.log(filteredStatesList);
      res.send(filteredStatesList);
    })
    .catch((err) => {
      console.log("Error getting on server", err);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
