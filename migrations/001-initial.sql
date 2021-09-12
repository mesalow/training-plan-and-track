--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS exercise (
    ex_id INTEGER PRIMARY KEY,
    ex_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS muscle_group (
    musc_id INTEGER PRIMARY KEY,
    musc_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS ex_msc_map (
    ex_ex_id INTEGER,
    musc_musc_id INTEGER,
    FOREIGN KEY (ex_ex_id) REFERENCES exercise(ex_id),
    FOREIGN KEY (musc_musc_id) REFERENCES muscle_group(musc_id)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE exercise;
DROP TABLE muscle_group;
DROP TABLE ex_msc_map;