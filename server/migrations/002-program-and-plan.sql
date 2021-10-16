--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS program (
    prg_id INTEGER PRIMARY KEY,
    prg_name TEXT NOT NULL UNIQUE,
    number_of_weeks INTEGER NOT NULL,
    number_of_days INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS plan (
    pl_id INTEGER PRIMARY KEY,
    prg_prg_id INTEGER NOT NULL,
    start_day TEXT NOT NULL,
    UNIQUE (prg_prg_id, start_day) ON CONFLICT ABORT
    FOREIGN KEY (prg_prg_id) REFERENCES program(prg_id)
);

CREATE TABLE IF NOT EXISTS actual_set (
    actual_set_id INTEGER PRIMARY KEY,
    ex_ex_id INTEGER NOT NULL,
    pl_pl_id INTEGER NOT NULL,
    week INTEGER NOT NULL,
    day INTEGER NOT NULL,
    set_number INTEGER NOT NULL,
    used_weight REAL NOT NULL,
    reps INTEGER NOT NULL,
    perceived_effort REAL,
    max_effort NUMERIC NOT NULL DEFAULT 0 CHECK(max_effort == 0 or max_effort == 1),
    UNIQUE (ex_ex_id, pl_pl_id,week,day,set_number) ON CONFLICT ABORT
    FOREIGN KEY (pl_pl_id) REFERENCES plan(pl_id),
    FOREIGN KEY (ex_ex_id) REFERENCES exercise(ex_id)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE program;
DROP TABLE plan;
DROP TABLE actual_set;