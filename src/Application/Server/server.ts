import * as http from "http";

interface ServerConfig {
    port: number,

}

export class Server {
    private config: ServerConfig;
    private router;
    private server;

    constructor(config: ServerConfig, router) {
        this.config = config;
        this.router = router;
        this.server = http.createServer((req,res) => this.router.listener(req,res))
        this.server.listen(config.port);
    }
}