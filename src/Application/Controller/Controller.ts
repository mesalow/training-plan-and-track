import { IncomingMessage, ServerResponse } from "http";

export interface IControllerConstructor  {
    new (app): IBaseController;
}
export interface IBaseController {
    handleGetAll(request: IncomingMessage, requestBody: string): Promise<string>;
    handleGet(request: IncomingMessage, requestBody: string): Promise<string>;
    handlePost(request: IncomingMessage, requestBody: string): Promise<string>;
}