
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
    "states" VARCHAR (255) NOT NULL,
    "park_code" VARCHAR (20) NOT NULL,
    "is_current" BOOLEAN NOT NULL DEFAULT FALSE,
    "is_complete" BOOLEAN NOT NULL DEFAULT FALSE,
    "image_path" VARCHAR (510),
    "started_at" TIMESTAMPTZ,
    "ended_at" TIMESTAMPTZ
);

-- table to hold the actual log entries users make for each trip
CREATE TABLE "log" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user" ON DELETE CASCADE,
    "trip_id" INT NOT NULL REFERENCES "trip" ON DELETE CASCADE,
    "type" VARCHAR (20) NOT NULL,
    "text" VARCHAR (1000),
    "image_path" VARCHAR (510),
    "time" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- function to create a timestamp when a trip is started
CREATE OR REPLACE FUNCTION trigger_start_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.started_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

-- triggers the above function when is_current is set to true
CREATE TRIGGER update_started_at 
BEFORE UPDATE ON "trip"
FOR EACH ROW
WHEN (NEW.is_current = true)
EXECUTE PROCEDURE trigger_start_timestamp();

-- function to create a timestamp when a trip is ended
CREATE OR REPLACE FUNCTION trigger_end_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.ended_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

-- triggers the above function when is_complete is set to true
CREATE TRIGGER update_ended_at 
BEFORE UPDATE ON "trip"
FOR EACH ROW
WHEN (NEW.is_complete = true)
EXECUTE PROCEDURE trigger_end_timestamp();