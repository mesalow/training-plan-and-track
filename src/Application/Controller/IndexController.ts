import { readFile } from "fs/promises";
import { IFileController } from "./Controller";


export default class IndexController implements IFileController {
    async handle(_filePath) {
        const html = await readFile(__dirname+'/../../../client/static/index.html');
        return html.toString();
    }
}