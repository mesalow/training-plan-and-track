--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS planned_day (
    pld_id INTEGER PRIMARY KEY,
    day_number INTEGER NOT NULL,
    pl_pl_id INTEGER NOT NULL,
    FOREIGN KEY (pl_pl_id) REFERENCES plan(pl_id)
);

CREATE TABLE IF NOT EXISTS progression_type (
    pt_id INTEGER PRIMARY KEY,
    pt_description TEXT NOT NULL UNIQUE
);


INSERT INTO progression_type ('pt_description') VALUES('T1');
INSERT INTO progression_type ('pt_description') VALUES('T2a');
INSERT INTO progression_type ('pt_description') VALUES('T2b');
INSERT INTO progression_type ('pt_description') VALUES('T3');

INSERT INTO program('prg_name', 'number_of_weeks','number_of_days') VALUES('Jacked n Tan 6 weeks', 6,4);

CREATE TABLE IF NOT EXISTS planned_exercise (
    plex_id INTEGER PRIMARY KEY,
    pld_pld_id INTEGER NOT NULL,
    ex_ex_id INTEGER NOT NULL,
    pt_pt_id INTEGER NOT NULL,
    tm NUMERIC,
    FOREIGN KEY (pld_pld_id) REFERENCES planned_day(pl_id)
    FOREIGN KEY (ex_ex_id) REFERENCES exercise(ex_id)
    FOREIGN KEY (pt_pt_id) REFERENCES progression_type(pt_id)
);
--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE planned_exercise;
DROP TABLE progression_type;
DROP TABLE planned_day;