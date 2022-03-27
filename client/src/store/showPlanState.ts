import { reactive, provide, inject } from 'vue';
import { getProgress } from '@/api';

export interface Plan {
  planId: number;
  startDay: string;
  program: string;
}

const allPlans: Plan[] = [];
export interface ShowPlanState {
  allPlans: Plan[];
  currentPlanId: number;
  currentPlan: any;
  load: (state: ShowPlanState) => any;
}

const updateSet1 = (exercise: any) => {
  const rExercise = exercise;
  if (!exercise.sets[0]) {
    console.log('warning: %o', exercise);
  }
  if (exercise.sets[0].weight === null || exercise.sets[0].weight === undefined) {
    return exercise;
  }
  rExercise.sets = exercise.sets.map((set: any) => {
    const rSet = set;
    if (set.expected.weight === 'Set1') {
      rSet.expected.weight = exercise.sets[0].weight;
    }
    return rSet;
  });
  return rExercise;
};

const updatePlan = (plan: any) => plan.map((week: any) => {
  const rweek = week;
  rweek.days = week.days.map((day: any) => {
    const rday = day;
    rday.exercises = day.exercises.map((exercise: any) => {
      if (exercise.sets.length && (exercise.progression === 'T3' || exercise.progression === 'T2b' || exercise.progression === 'T2a')) {
        return updateSet1(exercise);
      }
      return exercise;
    });
    return rday;
  });
  return rweek;
});

export const load = async (state: ShowPlanState) => {
  try {
    const response = await getProgress(state.currentPlanId);
    console.log('loaded current plan %o', response);

    state.currentPlan = updatePlan(response);
    console.log('loaded current plan %o', state.currentPlan);
  } catch (error) {
    console.error('showPlans.beforeMount error', error);
  }
};

export const stateSymbol = Symbol('showplanstate');
export const createState = () => reactive({
  allPlans,
  currentPlanId: null,
  currentPlan: null,
  load,
});
export const useState = () => inject(stateSymbol);
export const provideState = () => provide(stateSymbol, createState());
