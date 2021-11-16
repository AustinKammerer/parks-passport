const express = require("express");
const router = express.Router();
const axios = require("axios");

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

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
