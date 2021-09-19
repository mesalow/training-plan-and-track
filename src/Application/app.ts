import { Server } from "./Server/server";

import { Router } from "./Server/router";
import { RepositoryManager } from "../Infrastructure/RepositoryManager";

export class App {
  public repositoryManager: RepositoryManager;
  public router: Router;
  private server: Server;
  constructor() {
    this.init();
  }

  async init() {
    // open the database

    this.repositoryManager = new RepositoryManager();
    this.router = new Router(this);
    this.server = new Server({ port: 3000 }, this.router);
  }
}
