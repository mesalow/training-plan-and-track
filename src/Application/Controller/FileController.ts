import { readFile } from "fs/promises";
import path from "path";
import { IFileController } from "./Controller";


export default class FileController implements IFileController {
    async handle(filePath) {
        const html = await readFile(path.resolve(__dirname+'/../../../client/'+filePath));
        return html.toString();
    }
}