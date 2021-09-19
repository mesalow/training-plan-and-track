import { IncomingMessage, ServerResponse } from "http";
import { IBaseController } from "./Controller";
import { appDebug as debug } from "../../Helpers/debuggers";

export default class ExerciseController implements IBaseController {
  private db;
  constructor(db: any) {  
    this.db = db;
  }
  handle(request: IncomingMessage, response: ServerResponse) {
    request.on("data", (data) => {
      debug("receiving data");
    });
    request.on("end", async () => {
      debug("req end");

      const result = await this.db.get("SELECT * FROM exercise");
      debug("result", result);
      response.write("Hello " + result.ex_name);
      response.end();
    });
  }
}
