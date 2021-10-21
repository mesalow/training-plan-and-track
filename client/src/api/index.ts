import axios, { AxiosRequestConfig } from 'axios';

const baseRoute = 'http://localhost:3000/api/';

const sendRequest = async (
  route: string,
  method: string = 'GET',
  options: AxiosRequestConfig<any> | undefined = undefined,
  body = null,
) => {
  console.log(`sendRequest: ${route}`);
  let data: unknown;
  switch (method.toUpperCase()) {
    case 'GET':
      console.log('GET');
      ({ data } = await axios.get(baseRoute + route, options));
      break;
    default:
      throw new Error(`not implemented method: ${method}`);
  }
  return data;
};

export const getAllExercises = async () => sendRequest('exercise');
export const getAllExercises2 = async () => sendRequest('exercise');
