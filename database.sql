
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- table to hold the trip logs for all the users
CREATE TABLE "trip" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user" ON DELETE CASCADE,
    "name" VARCHAR (255) NOT NULL,
    "park_code" VARCHAR (20) NOT NULL,
    "image_path" VARCHAR (510),
    "is_current" BOOLEAN NOT NULL DEFAULT FALSE,
    "is_complete" BOOLEAN NOT NULL DEFAULT FALSE
);

-- table to hold the actual log entries users make for each trip
CREATE TABLE "log" (
    "id" SERIAL PRIMARY KEY,
    "trip_id" INT NOT NULL REFERENCES "trip" ON DELETE CASCADE,
    "type" VARCHAR (20) NOT NULL,
    "text" VARCHAR (1000),
    "image_path" VARCHAR (510)
);