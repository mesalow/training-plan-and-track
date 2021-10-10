import { IncomingMessage, ServerResponse } from "http";
import { IBaseController } from "./Controller";
import { appDebug as debug } from "../../Helpers/debuggers";
import { App } from "../app";

export default class ExerciseController implements IBaseController {
  private app: App;
  constructor(app: App) {
    this.app = app;
  }
  async handleGetAll(
    request: IncomingMessage,
    requestBody: string,
  ) {
    const exerciseRepo = this.app.repositoryManager.getExerciseRepo();
    const result = await exerciseRepo.getAll();
    debug("result", result);
    return JSON.stringify(result);
  }
  async handleGet(
    request: IncomingMessage,
    requestBody: string,
  ) {
    return "NOT IMPLEMENTED";
  }
  async handlePost(
    request: IncomingMessage,
    requestBody: string,
  ) {
    return "NOT IMPLEMENTED";
  }
}
