import { readFile } from "fs/promises";


export default class IndexController {
    async handle(_filePath) {
        const html = await readFile(__dirname+'/../../../client/files/index.html');
        return html.toString();
    }
}