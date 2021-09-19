import * as http from "http";

import * as sqlite3 from "sqlite3";
import { open } from "sqlite";

// this is a top-level await
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

    const server = http.createServer((req, res) => {
      console.log("server listening");
      req.on("data", (data) => {
        console.log("receiving data");
      });
      req.on("end", async () => {
        console.log("req end");
        const result = await db.get("SELECT * FROM exercise");
        console.log("result", result);
        res.write("Hello " + result.ex_name);
        res.end();
      });
    });

    server.listen(3000);
  }
}
