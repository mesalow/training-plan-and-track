import * as sqlite3 from "sqlite3";

import { IBaseController } from "../Controller/Controller";
import { IncomingMessage, ServerResponse } from "http";
import { appDebug as debug } from "../../Helpers/debuggers";
import IndexController from "../Controller/IndexController";
import FileController from "../Controller/FileController";
export class Router {
  private app;
  constructor(app) {
    this.app = app;
  }

  async listener(request: IncomingMessage, response: ServerResponse) {
    const route = request.url;
    debug("route", route);
    /**
     * route has the form /param1/param2, the split means, that the first element - here called _leading - will be an empty string
     */
    const [_leading, type, ...rest] = route.split("/");
    if (type === "api") {
      /**
       * RESTish API, first param is the resource request, the following are params
       */
      const [resource, ...params] = rest;
      const controller = await this.routeAPI(resource);
      const reqMethod = request.method;
      const methodName = this.getMethod(reqMethod, params);
      let requestBody = "";
      request.on("data", (chunk) => {
        debug("Server/Router::listener, got data: ", chunk.toString());
        requestBody += chunk;
      });
      request.on("end", async () => {
        debug("Server/Router::listener, request end");
        let requestAsJson = {};
        if (requestBody.length > 0) {
          requestAsJson = JSON.parse(requestBody);
        }
        const responseBody = await controller[methodName](
          params,
          requestAsJson
        );
        response.writeHead(200, {
          "Content-Type": "application/json",
        });
        response.write(responseBody);
        response.end();
      });
    } else if (type === "files") {
      /**
       * static routes, variable rest holds the filePath
       */
      request.on("data", (chunk) => {});
      request.on("end", async () => {
        debug("Server/Router::listener, request end");
        const controller = new FileController();
        const fileName = rest[rest.length - 1];
        const fileType = fileName.split(".")[1];
        if (["js", "css", "html"].includes(fileType)) {
          const responseBody = await controller.handleTextFile(rest.join("/"));
          response.write(responseBody);
        } else {
          const responseBody = await controller.handleBinaryFile(
            rest.join("/")
          );
          response.write(responseBody);
        }
        response.end();
      });
    } else if (type === "") {
      /**
       * root route, just serve Index
       */
      request.on("data", (chunk) => {});
      request.on("end", async () => {
        debug("Server/Router::listener, request end");
        const controller = new IndexController();
        const responseBody = await controller.handle(null);
        response.write(responseBody);
        response.end();
      });
    }
  }

  private async routeAPI(route: string): Promise<IBaseController> {
    const className = this.getControllerClassName(route);
    debug(
      "Server/Router::route, Controller-Class found: ",
      className,
      "for route",
      route
    );
    const { default: Controller } = await import("../Controller/" + className);
    return new Controller(this.app);
  }

  public getControllerClassName(route: string) {
    const routings = {
      exercise: "ExerciseController", // get all exercises
      plan: "PlanController", // create new Plan
      training: "TrainingController", // get training progress
    };
    if (routings[route]) {
      return routings[route];
    }
    return "NotFoundController";
  }

  private getMethod(reqMethod, params: string[]): string {
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
