
import * as sqlite3 from "sqlite3";
import { open } from "sqlite";
import { ExerciseRepository } from "./ExerciseRepository";

export class RepositoryManager {
  private repositories;
  constructor() {
    this.init();
  }
  async init() {
    const db = await open({
      filename: "./database.db",
      driver: sqlite3.Database,
    });
    this.repositories = {
      ExerciseRepository: new ExerciseRepository(db),
    };
  }
  getRepo(repoName: string) {
    return this.repositories[repoName];
  }
}
