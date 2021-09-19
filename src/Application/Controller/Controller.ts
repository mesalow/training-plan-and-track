import { IncomingMessage, ServerResponse } from "http";

export interface IControllerConstructor  {
    new (app): IBaseController;
}
export interface IBaseController {
    handle(request: IncomingMessage, requestBody: string): Promise<string>;
}