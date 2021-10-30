import * as sqlite3 from "sqlite3";
import { open } from "sqlite";
import { ExerciseRepository } from "./ExerciseRepository";
import { PlanRepository } from "./PlanRepository";
import { TrainingRepository } from "./TrainingRepository";

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
      PlanRepository: new PlanRepository(db),
      TrainingRepository: new TrainingRepository(db),
    };
  }
  private getRepo(repoName: string) {
    return this.repositories[repoName];
  }
  getExerciseRepo(): ExerciseRepository {
    return this.getRepo("ExerciseRepository");
  }
  getPlanRepo(): PlanRepository {
    return this.getRepo("PlanRepository");
  }
  getTrainingRepo(): TrainingRepository {
    return this.getRepo("TrainingRepository");
  }
}
