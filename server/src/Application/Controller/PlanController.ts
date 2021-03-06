import { IncomingMessage, ServerResponse } from "http";
import { IBaseController } from "./Controller";
import { appDebug as debug } from "../../Helpers/debuggers";
import {
  ExerciseDTO,
  PlanRepository,
} from "../../Infrastructure/PlanRepository";
import { App } from "../app";
import { Validator } from "./Validator";
import { JackednTan2 } from "../../Domain/Program/JackednTan2";

export default class PlanController implements IBaseController {
  private app: App;
  constructor(app: App) {
    this.app = app;
  }
  /**
   * creating a new plan needs the following data
   * 4 days
   * each day needs one exercise with progression t1
   * 3 ex with t2
   * 3-4 ex with t3
   * each exercise has a name and a progression scheme and, depending on the progression scheme, a training max
   * serialized:
   * { programId: 1,
   * days: [
   * { day: 1,
   *   exercises: [
   *      {name: 'Squat', progression: 'T1', tm: 115},
   *      {name: 'Hack Squat', progression: 'T2a', tm: 130},
   *      {name: 'Nordic Curls', progression: 'T2b'}, // progression T2b does not depend on tm
   *   ]
   * },
   * {day: 2,
   *   exercises: [
   *      {name: 'Bench Press', progression: 'T1', tm: 95},
   *      {name: 'Close-grip Press', progression: 'T2a', tm: 75},
   *      {name: 'DB Press', progression: 'T2b'}, // progression T2b does not depend on tm
   *   ]
   * }
   * ]
   * }
   */
  /**
   * getAll should give us back all plans we ever did
   * @param params
   * @param requestBody
   * @returns
   */
  async handleGetAll(params, requestBody) {
    try {
      const planRepository = this.app.repositoryManager.getPlanRepo();
      const result = await planRepository.getAll();
      return JSON.stringify(result);
    } catch (error) {
      return "NOT OK";
    }
  }
  /**
   * specific get with /plan/{planId}/{weekNumber}/{dayNumber} -> all exercises for this day
   * the bare planned exercises are not useful - we need to complement them with the calculated weights and sets from the program
   * @param params
   * @param requestBody
   * @returns
   */
  async handleGet(params, requestBody) {
    debug("Controller/PlanController::handleGet: params: %o", params);
    try {
      if (params.length !== 3) {
        return "NOT OK";
      }
      const planId = params[0];
      const weekNumber = params[1];
      const dayNumber = params[2];
      const planRepository = this.app.repositoryManager.getPlanRepo();
      const result = await planRepository.getPlannedExercises(
        planId,
        dayNumber
      );
      const trainingModel = new JackednTan2();
      const prescribedExercises = result.map((exercise) => {
        return {
          name: exercise.name,
          sets: trainingModel.getExpectedSets(
            weekNumber,
            exercise.progression,
            exercise.tm
          ),
        };
      });
      return JSON.stringify(prescribedExercises);
    } catch (error) {
      console.error(error);
      return "NOT OK";
    }
  }

  async handlePost(params, requestBody) {
    debug(
      "Controller/PlanController::handlePost: requestBody: %o",
      requestBody
    );
    try {
      const validator = new Validator([]);
      if (!validator.validate(requestBody)) {
        console.error(JSON.stringify(validator.getErrors()));
        return "NOT OK";
      }
      const programId = requestBody.programId;
      const startDay = requestBody.startDay;
      const plannedDays = requestBody.days;
      const planRepository = this.app.repositoryManager.getPlanRepo();

      const planId = await planRepository.add(programId, startDay);
      for (const plannedDay of plannedDays) {
        const dayId = await planRepository.addDay(planId, plannedDay.day);
        for (const plannedExercise of plannedDay.exercises) {
          if (plannedExercise.name && plannedExercise.progression) {
            await planRepository.addExercise(dayId, plannedExercise);
          }
        }
      }
      // application need to do the following things
      /**
       * 1. create new plan in table plan
       * 2. in every plan, there will be days -> create planned_days
       * 3. on each planned_day there will be planned_exercises -> create those with the relevant data on each date
       */
    } catch (error) {
      console.error(
        "Controller/PlanController::handlePost: Error handling the request: " +
          error
      );
      return "NOT OK";
    }
    return "OK";
  }
}
