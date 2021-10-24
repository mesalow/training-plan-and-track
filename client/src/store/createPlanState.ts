import {
  reactive,
  provide,
  inject,
} from 'vue';

interface plannedExercise {
  name: string;
  progression: string;
  tm: number | null;
}
interface plannedDay {
  day: number;
  weekDay: string;
  exercises: plannedExercise[];
}
export interface State {
  exerciseList: string[];
  plannedDays: plannedDay[];
  setExercise: (
    dayNumber: number,
    exerciseIndex: number,
    exerciseName: string,
    tm: number | null,
  ) => void;
}

const day = (dayNumber: number, weekDay: string): plannedDay => ({
  day: dayNumber,
  weekDay,
  exercises: [
    { name: '', progression: 'T1', tm: null },
    { name: '', progression: 'T2a', tm: null },
    { name: '', progression: 'T2b', tm: null },
    { name: '', progression: 'T2c', tm: null },
    { name: '', progression: 'T3', tm: null },
    { name: '', progression: 'T3', tm: null },
    { name: '', progression: 'T3', tm: null },
    { name: '', progression: 'T3', tm: null },
  ],
});
const plannedDays = [day(1, 'Saturday'), day(2, 'Monday'), day(3, 'Wednesday'), day(4, 'Friday')];

const setExercise = (
  weekDay: string,
  exerciseIndex: number,
  exerciseName: string,
  tm: number | null,
) => {
  console.log('state.setExercise called', weekDay, exerciseIndex, exerciseName, tm);
  const d = plannedDays.find((pd) => pd.weekDay === weekDay);
  if (!d) {
    throw new Error(`did not find planned day on ${weekDay}`);
  }
  const exercise = d.exercises[exerciseIndex];
  exercise.name = exerciseName;
  if (tm) {
    exercise.tm = tm;
  }
  console.log('state.setExercise new state: %o', plannedDays);
};
export const stateSymbol = Symbol('state');
export const createState = () => reactive({
  exerciseList: [],
  plannedDays,
  setExercise,
});
export const useState = () => inject(stateSymbol);
export const provideState = () => provide(stateSymbol, createState());
