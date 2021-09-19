import { Database } from "sqlite";
import { infraStructureDebug as debug } from "../Helpers/debuggers";

export class ExerciseRepository {
  private db;
  constructor(db: Database) {
    this.db = db;
  }

  async getAll() {
    const resultSet = await this.db.all(`
        SELECT ex_name, musc_name 
        FROM exercise
        JOIN ex_msc_map on exercise.ex_id = ex_msc_map.ex_ex_id
        JOIN muscle_group on muscle_group.musc_id = ex_msc_map.musc_musc_id
         `);
    const results = resultSet.reduce((agg, row) => {
        const { ex_name, musc_name } = row;
        if (!agg[ex_name]) {
            agg[ex_name] = [musc_name];
        } else {
            agg[ex_name] = [...agg[ex_name], musc_name];
        }
        return agg;
    },{})
    debug('ExerciseRepository::getAll, result %o', results);
    return results;
  }
}
