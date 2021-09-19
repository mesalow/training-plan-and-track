import { IBaseController } from "./Controller";

export default class NotFoundController implements IBaseController 
{
    constructor() {}
    handle(request, response) {
        request.on("data", (data) => {
            console.log("receiving data");
          });
          request.on("end", async () => {
            console.log("req end");
            response.write("Not found");
            response.end();
          });
    }
}