var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as http from 'http';
import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';
// this is a top-level await 
(() => __awaiter(void 0, void 0, void 0, function* () {
    // open the database
    const db = yield open({
        filename: '../database.db',
        driver: sqlite3.Database
    });
    yield db.migrate({
        migrationsPath: '../migrations'
    }).catch(console.error);
    yield db.run("INSERT INTO exercise (ex_name) VALUES(?)", "Squat").catch(console.error);
    const server = http.createServer((req, res) => {
        console.log('server listening');
        req.on('data', (data) => {
            console.log('receiving data');
        });
        req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('req end');
            const result = yield db.get('SELECT * FROM exercise');
            console.log('result', result);
            res.write('Hello ' + result.ex_name);
            res.end();
        }));
    });
    server.listen(3000);
}))();
