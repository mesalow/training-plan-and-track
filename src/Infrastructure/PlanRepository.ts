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
    debug('ExerciseRepository::getAll, result %o', resultSet);
    return resultSet;
  }

  async add(programId: number, startDay: string): Promise<number> {
    const programRow = await this.db.get(`SELECT prg_name
     FROM program
     WHERE prg_id = ?
    `,[programId]);
    if (!programRow) {
      throw new Error('No program found for id' + programId);
    }
    await this.db.run(`
      INSERT INTO plan ('prg_prg_id', 'start_day') VALUES('${programId}', '${startDay}')
    `)
    const planRow = await this.db.get(`SELECT pl_id
     FROM plan
     WHERE prg_prg_id = ?
     AND start_day = ?
    `,[programId, startDay]);
    return planRow.pl_id
  }

  async addDay(planId: number, dayNumber: number): Promise<number> {
    return ;
  }

  async addExercise(planId:number, dayNumber:number, exerciseName: string): Promise<number> {
    return ;
  }
}
