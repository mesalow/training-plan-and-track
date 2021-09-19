import * as sqlite3 from "sqlite3";

import { Database } from "sqlite";
import { IBaseController } from "../Controller/Controller";
import { IncomingMessage, ServerResponse } from "http";

export class Router {
  private db: Database<sqlite3.Database, sqlite3.Statement>;
  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    console.log("Router: db %o", db);
    this.db = db;
  }

  async listener(request: IncomingMessage, response: ServerResponse) {
    const route = request.url;
    console.log("route", route);

    const controller = await this.route(route);
    controller.handle(request, response);
  }

  async route(route: string): Promise<IBaseController> {
    const className = this.getControllerClassName(route);
    const { default: Controller} = await import("../Controller/"+className);
    console.log('exported:', Controller)
    return new Controller(this.db)
  }

  getControllerClassName(route: string) {
      if (route === '/exercise') {
          return 'ExerciseController';
      }
  }
}
