import { IncomingMessage, ServerResponse } from "http";
import { IBaseController } from "./Controller";

export default class ExerciseController implements IBaseController {
  private db;
  constructor(db: any) {  
    this.db = db;
  }
  handle(request: IncomingMessage, response: ServerResponse) {
    request.on("data", (data) => {
      console.log("receiving data");
    });
    request.on("end", async () => {
      console.log("req end");

      const result = await this.db.get("SELECT * FROM exercise");
      console.log("result", result);
      response.write("Hello " + result.ex_name);
      response.end();
    });
  }
}
