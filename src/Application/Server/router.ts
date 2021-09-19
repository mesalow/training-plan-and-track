import * as sqlite3 from "sqlite3";

import { Database } from "sqlite";
import { IBaseController } from "../Controller/Controller";
import { IncomingMessage, ServerResponse } from "http";
import { appDebug as debug } from "../../Helpers/debuggers";
export class Router {
  private db: Database<sqlite3.Database, sqlite3.Statement>;
  constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
    debug("Router: db %o", db);
    this.db = db;
  }

  async listener(request: IncomingMessage, response: ServerResponse) {
    const route = request.url;
    debug("route", route);

    const controller = await this.route(route);
    controller.handle(request, response);
  }

  async route(route: string): Promise<IBaseController> {
    const className = this.getControllerClassName(route);
    const { default: Controller} = await import("../Controller/"+className);
    return new Controller(this.db)
  }

  getControllerClassName(route: string) {
      const routings = {
        '/exercise': 'ExerciseController'
      }
      if (routings[route]) {
          return routings[route];
      }
      return 'NotFoundController';
  }
}
