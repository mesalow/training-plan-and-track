import { Server } from './Server/server';

import * as sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Router } from './Server/router';

export class App {
  constructor() {
    this.init();
  }

  async init() {
    // open the database
    const db = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });
    const router = new Router(db);

    const server = new Server({port:3000}, router);
  }
}
