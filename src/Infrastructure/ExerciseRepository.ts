import { Database } from "sqlite";


export class ExerciseRepository {
  private db;
  constructor(db: Database) {
    this.db = db;
  }

  getAll() {
      return {ex_name: 'High Bar Squat'};
  }
}
