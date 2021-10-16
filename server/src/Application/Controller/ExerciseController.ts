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
    params, requestBody
  ) {
    const exerciseRepo = this.app.repositoryManager.getExerciseRepo();
    const result = await exerciseRepo.getAll();
    debug("result", result);
    return JSON.stringify(result);
  }
  async handleGet(
    params, requestBody
  ) {
    return "NOT IMPLEMENTED";
  }
  async handlePost(
    params, requestBody
  ) {
    return "NOT IMPLEMENTED";
  }
}
