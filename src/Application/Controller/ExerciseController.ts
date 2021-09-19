import { IncomingMessage, ServerResponse } from "http";
import { IBaseController } from "./Controller";
import { appDebug as debug } from "../../Helpers/debuggers";

export default class ExerciseController implements IBaseController {
  private db;
  constructor(db: any) {
    this.db = db;
  }
  async handle(
    request: IncomingMessage,
    requestBody: string,
  ) {
    const result = await this.db.get("SELECT * FROM exercise");
    debug("result", result);
    return "Hello " + result.ex_name;
  }
}
