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

let statesList;

const getStates = async () => {
  try {
    const result = await pool.query(query);
    let nestedList = result.rows.map((row) => [...row.states]);
    // iterate over each subarray and parse multi-state strings
    const parsedStatesList = nestedList.map((arr) =>
      arr.map((el) => (el.includes(",") ? el.split(",") : el))
    );
    // flatten the array of sub-arrays
    // depth of 2 is passed because parsing multi-state strings results in an another nested array
    const flattenedStatesList = parsedStatesList.flat(2);
    // remove duplicate states by spreading the processed list into a new Set, then sort by state
    let filteredStatesList = [...new Set(flattenedStatesList)].sort();
    // console.log("list for client:", filteredStatesList);
    statesList = filteredStatesList;
    console.log(statesList);
  } catch (error) {
    console.log("Error getting list of states from database", error);
  }
};
