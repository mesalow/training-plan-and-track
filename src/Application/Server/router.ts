import * as sqlite3 from "sqlite3";

import { IBaseController } from "../Controller/Controller";
import { IncomingMessage, ServerResponse } from "http";
import { appDebug as debug } from "../../Helpers/debuggers";
export class Router {
  private app;
  constructor(app) {
    this.app = app;
  }

  async listener(request: IncomingMessage, response: ServerResponse) {
    const route = request.url;
    debug("route", route);
    const controller = await this.route(route);
    let requestBody = "";
    request.on("data", (chunk) => {
      debug("Server/Router::listener, got data: ", chunk.toString());
      requestBody += chunk;
    });
    request.on("end", async () => {
      debug("Server/Router::listener, request end");
      const responseBody = await controller.handle(request, requestBody);
      response.write(responseBody);
      response.end();
    });
  }

  async route(route: string): Promise<IBaseController> {
    const className = this.getControllerClassName(route);
    debug("Server/Router::route, Controller-Class found: ", className);
    const { default: Controller } = await import("../Controller/" + className);
    return new Controller(this.app);
  }

  getControllerClassName(route: string) {
    const routings = {
      "/exercise": "ExerciseController", // get all exercises
      "/plan": "PlanController", // create new Plan
    };
    if (routings[route]) {
      return routings[route];
    }
    return "NotFoundController";
  }
}
