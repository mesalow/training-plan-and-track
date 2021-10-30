import { Database } from "sqlite";
import { infraStructureDebug as debug } from "../Helpers/debuggers";

export class PlanRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }

  async getAll(): Promise<string[]> {
    const resultSet: any[] = await this.db.all(`
        SELECT pl_id, prg_prg_id, start_day, prg_name
        FROM plan
        JOIN program on program.prg_id = plan.prg_prg_id
         `);
    debug("PlanRepository::getAll, result %o", resultSet);
    return resultSet;
  }

  async add(programId: number, startDay: string): Promise<number> {
    debug("PlanRepository::add, programId %d, startDay %s", programId, startDay);
    const programRow = await this.db.get(
      `SELECT prg_name
     FROM program
     WHERE prg_id = ?
    `,
      [programId]
    );
    if (!programRow) {
      throw new Error("No program found for id" + programId);
    }
    await this.db.run(`
      INSERT INTO plan ('prg_prg_id', 'start_day') VALUES('${programId}', '${startDay}')
    `);
    const planRow = await this.db.get(
      `SELECT pl_id
     FROM plan
     WHERE prg_prg_id = ?
     AND start_day = ?
    `,
      [programId, startDay]
    );
    debug("PlanRepository::add, resultSet %o", planRow);
    if (!planRow) {
      throw new Error(`insert of plan for programId ${programId} failed`)
    }
    return planRow.pl_id;
  }

  async addDay(planId: number, dayNumber: number): Promise<number> {
    debug("PlanRepository::addDay, planId %d, dayNumber %s", planId, dayNumber);
    await this.db.run(`
    INSERT INTO planned_day ('pl_pl_id', 'day_number') VALUES('${planId}', '${dayNumber}');
    `);
    const planedDayRow = await this.db.get(
      `SELECT pld_id
       FROM planned_day
       WHERE pl_pl_id = ?
      AND day_number = ?
      `,
      [planId, dayNumber]
    );
    return planedDayRow.pld_id;
  }

  async addExercise(
    plannedDayId: number,
    exercise: ExerciseDTO
  ): Promise<void> {
    debug("PlanRepository::addExercise, plannedDayId %d, exercise %o", plannedDayId, exercise);
    const { ex_id: exerciseId} = await this.db.get(
      `SELECT ex_id
       FROM exercise
       WHERE ex_name = ?
      `,
      [exercise.name]
    );
    if (!exerciseId) {
      throw new Error(`exercise with name ${exercise.name} not found`);
    }
    const { pt_id: progressionId  }= await this.db.get(
      `SELECT pt_id
       FROM progression_type
       WHERE pt_description = ?
      `,
      [exercise.progression]
    );
    if (!progressionId) {
      throw new Error(`progression with name ${exercise.progression} not found`);
    }
    await this.db.run(`
      INSERT INTO planned_exercise ('pld_pld_id', 'ex_ex_id', 'pt_pt_id', 'tm') 
      VALUES('${plannedDayId}','${exerciseId}','${progressionId}','${exercise.tm}');
    `);

    return;
  }

  async getPlannedExercises(planId: number, dayNumber:number): Promise<ExerciseDTO[]>
  {
    debug(`PlanRepository::getPlannedExercises, planId ${planId}, dayNumber ${dayNumber}`);
    const resultSet = await this.db.all(`
      SELECT ex_name, pt_description, tm, ex_id
      FROM planned_exercise 
      JOIN planned_day on planned_day.pld_id = planned_exercise.pld_pld_id
      JOIN plan on plan.pl_id = planned_day.pl_pl_id
      JOIN progression_type on progression_type.pt_id = planned_exercise.pt_pt_id
      JOIN exercise on exercise.ex_id = planned_exercise.ex_ex_id
      WHERE plan.pl_id = ?
      AND planned_day.day_number = ?
    `, [planId, dayNumber]);
    debug('PlanRepository::getPlannedExercises, resultSet %o', resultSet);

    return resultSet.map(row => {
      return {
        name: row.ex_name,
        id: row.ex_id,
        progression: row.pt_description,
        tm: row.tm
      }
    });
  }
}

export interface ExerciseDTO {
  name: string;
  id: number,
  progression: string;
  tm: number | null;
}
