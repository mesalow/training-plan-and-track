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
  currentPlanId: number,
  currentPlan: any,
}
export const stateSymbol = Symbol('showplanstate');
export const createState = () => reactive({
  allPlans,
  currentPlanId: null,
  currentPlan: null,
});
export const useState = () => inject(stateSymbol);
export const provideState = () => provide(stateSymbol, createState());
