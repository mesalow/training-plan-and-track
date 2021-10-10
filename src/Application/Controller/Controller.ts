import { IncomingMessage, ServerResponse } from "http";

export interface IControllerConstructor  {
    new (app): IBaseController;
}
export interface IBaseController {
    handleGetAll(params: string[], requestBody: string): Promise<string>;
    handleGet(params: string[], requestBody: string): Promise<string>;
    handlePost(params: string[], requestBody: string): Promise<string>;
}