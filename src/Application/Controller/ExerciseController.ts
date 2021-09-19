import { IncomingMessage, ServerResponse } from "http";
import { IBaseController } from "./Controller";
import { appDebug as debug } from "../../Helpers/debuggers";

export default class ExerciseController implements IBaseController {
  private app;
  constructor(app: any) {
    this.app = app;
  }
  async handle(
    request: IncomingMessage,
    requestBody: string,
  ) {
    const exerciseRepo = this.app.repositoryManager.getRepo('ExerciseRepository');
    const result = await exerciseRepo.getAll();
    debug("result", result);
    return JSON.stringify(result);
  }
}
