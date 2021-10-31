import { Database } from "sqlite";
import { infraStructureDebug as debug } from "../Helpers/debuggers";
import { ExerciseRepository } from "./ExerciseRepository";

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

  async addActualSet(
    planId,
    exerciseName,
    weekNumber,
    dayNumber,
    setNumber,
    weight,
    reps
  ) {
    const exerciseRepository = new ExerciseRepository(this.db);
    const exerciseId = exerciseRepository.getIdByName(exerciseName);
    if (!exerciseId) {
      throw new Error(`exercise with name ${exerciseName} not found`);
    }
    await this.db.run(`
    INSERT INTO actual_set ('ex_ex_id', 'pl_pl_id', 'week', 'day','set_number', 'used_weight', 'reps') 
    VALUES('${exerciseId}','${planId}','${weekNumber}','${dayNumber}','${setNumber}','${weight}','${reps}');
  `);
    return;
  }
}

export interface ActualSetDTO {
  actual_set_id: number;
  ex_ex_id: number;
  pl_pl_id: number;
  week: number;
  day: number;
  set_number: number;
  weight: number;
  reps: number;
}
