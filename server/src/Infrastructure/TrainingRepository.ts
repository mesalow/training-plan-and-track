import { Database } from "sqlite";
import { infraStructureDebug as debug } from "../Helpers/debuggers";

export class TrainingRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }

  async getAllInPlan(planId: number): Promise<ActualSetDTO[]> {
    debug("TrainingRepository::getAllInPlan, planId %d", planId);
    const resultSet: any[] = await this.db.all(
      `
        SELECT actual_set_id, ex_ex_id, pl_pl_id, week, day, set_number, used_weight as weight, reps
        FROM actual_set
        WHERE pl_pl_id = ?
         `,
      [planId]
    );
    debug("TrainingRepository::getAllInPlan, result %o", resultSet);
    return resultSet;
  }
}

export interface ActualSetDTO {
  actual_set_id: number;
  ex_ex_id: number;
  pl_pl_id: number;
  week: number;
  day: number;
  set_number: number;
  weight: number,
  reps: number,
}