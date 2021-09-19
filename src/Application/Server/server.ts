import * as http from "http";
import { appDebug as debug } from "../../Helpers/debuggers";

interface ServerConfig {
    port: number,

}

export class Server {
    private config: ServerConfig;
    private router;
    private server;

    constructor(config: ServerConfig, router) {
        debug('starting server with config %o', config)
        this.config = config;
        this.router = router;
        this.server = http.createServer((req,res) => this.router.listener(req,res))
        debug('server listening');
        this.server.listen(config.port);
    }
}