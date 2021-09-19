import { IncomingMessage, ServerResponse } from "http";

export interface IControllerConstructor  {
    new (db): IBaseController;
}
export interface IBaseController {

    handle(request: IncomingMessage, response: ServerResponse): void;
}