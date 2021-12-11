import { ExpectedSet } from "../../Domain/Program/JackednTan2";
import { App } from "../app";
import { IBaseController } from "./Controller";
import { appDebug as debug } from "../../Helpers/debuggers";
import { getProgress } from "../../Domain/Progression";

export default class RecordController implements IBaseController {
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
  async handleGet(params, requestBody, queryParams) {
    if (params.length !== 1) {
      return "NOT OK";
    }
    const exerciseId = params[0];
    debug(
      "RecordController::handleGet: params: %o, queryParams: %o",
      params,
      queryParams
    );
    const recordRepo = this.app.repositoryManager.getRecordRepo();
    let recordSet;
    if (queryParams.byReps) {
      recordSet = await recordRepo.getRecordByReps(exerciseId, queryParams.byReps);
    } else if (queryParams.byWeight) {
      recordSet = await recordRepo.getRecordByWeight(exerciseId, queryParams.byWeight);
    } else {
      return "NOT OK";
    }
    /**
     * records/{exerciseId}?byReps=10
     * records/{exerciseId}?byWeight=100&progressScheme=T3&set=3 --> for exercise, get personal best for weight 100 in T3 Set 3
     */
    const result = recordSet || {};
    debug('RecordController::handleGet: return %o', result)
    return JSON.stringify(result);
  }
  /**
   * should not save records with own method
   * @param params
   * @param requestBody
   * @returns
   */
  async handlePost(params, requestBody) {
    return "NOT IMPLEMENTED";
  }
}
