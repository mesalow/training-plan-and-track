import axios, { AxiosRequestConfig } from 'axios';

const baseRoute = 'http://localhost:3000/api/';

const sendRequest = async (
  route: string,
  method: string = 'GET',
  options: AxiosRequestConfig<any> | undefined = undefined,
  body: unknown = null,
) => {
  console.log(`sendRequest: ${route}`);
  let data: object;
  switch (method.toUpperCase()) {
    case 'GET':
      console.log('GET');
      ({ data } = await axios.get(baseRoute + route, options));
      break;
    case 'POST':
      console.log('POST');
      ({ data } = await axios.post(baseRoute + route, body, options));
      break;
    default:
      throw new Error(`not implemented method: ${method}`);
  }
  return data;
};

export interface ActualSetData {
  exerciseName: string;
  weekNumber: number;
  dayNumber: number;
  setNumber: number;
  weight: number;
  reps: number;
}
export const getAllExercises = async () => sendRequest('exercise');
export const getAllPlans = async () => sendRequest('plan');
export const getProgress = async (id: number) => sendRequest(`training/${id}`);
export const createPlan = async (body: any) => sendRequest('plan', 'POST', undefined, body);
export const saveActualSet = async (id: number, body: ActualSetData) => sendRequest(`training/${id}`, 'POST', undefined, body);
export const getRecordByReps = async (exerciseId: number, reps: number) => sendRequest(`record/${exerciseId}?byReps=${reps}`);
export const getRecordByWeight = async (exerciseId: number, weight: number) => sendRequest(`record/${exerciseId}?byWeight=${weight}`);
