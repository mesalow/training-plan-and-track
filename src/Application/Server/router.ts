import * as sqlite3 from "sqlite3";

import { Database } from "sqlite";
import { ExerciseController } from "../Controller/ExerciseController";

export class Router {
  private db: Database<sqlite3.Database, sqlite3.Statement>;
  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    console.log("Router: db %o", db);
    this.db = db;
  }

  listener(request, response) {
    console.log("server listening");
    const controller = new ExerciseController(this.db);
    controller.handle(request, response);
  }
}
