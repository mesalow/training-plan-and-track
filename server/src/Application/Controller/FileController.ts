import { readFile } from "fs/promises";
import path from "path";
import { IFileController } from "./Controller";


export default class FileController implements IFileController {
    async handleTextFile(filePath) {
        const html = await readFile(path.resolve(__dirname+'/../../../client/files/'+filePath));
        return html.toString();
    }

    async handleBinaryFile(filePath) {
        return await readFile(path.resolve(__dirname+'/../../../client/files/'+filePath));
    }
}