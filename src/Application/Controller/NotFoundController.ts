import { IBaseController } from "./Controller";

export default class NotFoundController implements IBaseController {
  constructor() {}
  async handleGetAll(request, requestBody) {
    return "Not found";
  }
  async handleGet(request, requestBody) {
    return "Not found";
  }
  async handlePost(request, requestBody) {
    return "Not found";
  }
}
