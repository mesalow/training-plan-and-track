import { ExpectedSet } from "../../Domain/Program/JackednTan2";
import { App } from "../app";
import { IBaseController } from "./Controller";
import { appDebug as debug } from "../../Helpers/debuggers";
import { getProgress } from "../../Domain/Progression";

export default class TrainingController implements IBaseController {
  private app: App;
  constructor(app: App) {
    this.app = app;
  }
  async handleGetAll(params, requestBody) {
    return "NOT IMPLEMENTED";
  }
  /**
   * gets overview of plan -> planned exercises + actual exercises in a mixed model
   * @param params
   * @param requestBody
   * @returns
   */
  async handleGet(params, requestBody) {
    if (params.length !== 1) {
      return "NOT OK";
    }
    const planId = params[0];
    const planRepository = this.app.repositoryManager.getPlanRepo();
    const completePlan = await Promise.all(
      [1, 2, 3, 4].map(async (dayNumber) => {
        const result = await planRepository.getPlannedExercises(
          planId,
          dayNumber
        );
        return { dayNumber, exercises: result };
      })
    );
    const trainingRepo = this.app.repositoryManager.getTrainingRepo();
    const allActualSets = await trainingRepo.getAllInPlan(planId);
    const result = getProgress(completePlan, allActualSets);
    debug("TrainingController: result %o", result[0].days[0].exercises[0].sets);
    /**
     * how should it look?
     * [{week: 1,
     *   days: [
     *    {day: 1,
     *     exercises: [
     *      { name: 'High Bar Squat', progression: 'T1', tm: 120, actualSets: [
     *         { weight: 96.5, reps: 10, expected: 10 }
     *        ]}
     *      { name: 'Hack Squat', progression: 'T2a', tm: 160, actualSets: []}
     *     ]}
     *   ]
     * }]
     */
    return JSON.stringify(result);
  }
  /**
   * saves array of actual sets, idempotent, returns new overview of plan
   * @param params
   * @param requestBody
   * @returns
   */
  async handlePost(params, requestBody) {
    if (params.length !== 1) {
      return "NOT OK";
    }
    const { exerciseName, weekNumber, dayNumber,  setNumber, weight, reps } = requestBody;
    const trainingRepo = this.app.repositoryManager.getTrainingRepo();
    trainingRepo.addActualSet(params[0], exerciseName, weekNumber, dayNumber, setNumber, weight, reps);
    return "NOT IMPLEMENTED";
  }
}
