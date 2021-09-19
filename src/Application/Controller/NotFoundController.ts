import { IBaseController } from "./Controller";

export default class NotFoundController implements IBaseController {
  constructor() {}
  async handle(request, requestBody) {
    return "Not found";
  }
}
