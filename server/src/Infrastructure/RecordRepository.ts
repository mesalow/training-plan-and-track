import { Database } from "sqlite";
import { infraStructureDebug as debug } from "../Helpers/debuggers";

export class RecordRepository {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }

  async getRecordByReps(exerciseId: number, reps: number) 
  {
      const resultSets = await this.db.all(`
      SELECT *
      from actual_set
      where ex_ex_id = ?
      and reps >= ?
      order by used_weight desc, reps desc
      `, [exerciseId, reps])
      debug('RecordRepository::getRecordByReps, resultSets: %o', resultSets);
      return resultSets[0]
  }
  async getRecordByWeight(exerciseId: number, weight: number) 
  {
      const resultSets = await this.db.all(`
      SELECT *
      from actual_set
      where ex_ex_id = ?
      and used_weight <= ?
      order by used_weight desc, reps desc
      `, [exerciseId, weight])
      debug('RecordRepository::getRecordByWeight, resultSets: %o', resultSets);
      return resultSets[0]
  }
}