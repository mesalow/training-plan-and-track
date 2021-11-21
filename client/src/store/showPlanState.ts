import {
  reactive,
  provide,
  inject,
} from 'vue';

export interface Plan {
  planId: number;
  startDay: string;
  program: string;
}

const allPlans:Plan[] = [];

export interface ShowPlanState {
  allPlans: Plan[];

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
});
export const useState = () => inject(stateSymbol);
export const provideState = () => provide(stateSymbol, createState());
