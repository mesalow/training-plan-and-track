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
    /**
     * route has the form /resource/param1/param2, the split means, that the first element - here called _leading - will be an empty string
     */
    const [_leading, resource, ...params] = route.split('/');
    const controller = await this.route(resource);
    const reqMethod = request.method;
    const methodName = this.getMethod(reqMethod, params);
    let requestBody = "";
    request.on("data", (chunk) => {
      debug("Server/Router::listener, got data: ", chunk.toString());
      requestBody += chunk;
    });
    request.on("end", async () => {
      debug("Server/Router::listener, request end");
      const responseBody = await controller[methodName](params, requestBody);
      response.write(responseBody);
      response.end();
    });
  }

  private async route(route: string): Promise<IBaseController> {
    const className = this.getControllerClassName(route);
    debug("Server/Router::route, Controller-Class found: ", className, 'for route', route);
    const { default: Controller } = await import("../Controller/" + className);
    return new Controller(this.app);
  }

  private getControllerClassName(route: string) {
    const routings = {
      "exercise": "ExerciseController", // get all exercises
      "plan": "PlanController", // create new Plan
    };
    if (routings[route]) {
      return routings[route];
    }
    return "NotFoundController";
  }

  private getMethod(reqMethod, params: string[]): string 
  {
    if (reqMethod === "GET") {
      if (params.length === 0) {
        return "handleGetAll";
      }
      return "handleGet";
    }
    if (reqMethod === "POST") {
      return "handlePost";
    }
  }
}
