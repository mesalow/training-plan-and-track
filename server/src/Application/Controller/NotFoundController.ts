import { IBaseController } from "./Controller";

export default class NotFoundController implements IBaseController {
  constructor() {}
  async handleGetAll(params, requestBody) {
    return "Not found";
  }
  async handleGet(params, requestBody) {
    return "Not found";
  }
  async handlePost(params, requestBody) {
    return "Not found";
  }
}
