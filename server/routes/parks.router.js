const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * GET route template
 */
router.get("/finder", (req, res) => {
  // GET route code here
  const { state } = req.query;
  axios
    .get(
      `https://developer.nps.gov/api/v1/parks/?api_key=${process.env.NPS_API_KEY}&stateCode=${state}`
    )
    .then((response) => {
      console.log("response is:", response);
      res.send(response.data);
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
