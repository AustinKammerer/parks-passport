const pool = require("./pool");

// GET route for getting a list of states that contain National Parks
// this list is used for the search options in ParkFinder

// select the states for every park with particular disignation types
const query = `
    SELECT JSON_AGG("state") AS "states" FROM "designations"
        WHERE "type" = 'National Park'
        OR "type" = 'National Park and Preserve'
        OR "type" = 'National Park & Preserve'
        OR "type" = 'National Parks'
        OR "type" = 'National and State Parks'
        GROUP BY "type";
  `;
let states;

pool
  .query(query)
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
    states = filteredStatesList;
    console.log("list for client:", filteredStatesList);
  })
  .catch((err) => {
    console.log("Error getting list of states from database", err);
  });

module.exports = states;
