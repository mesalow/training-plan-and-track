import { reactive, provide, inject } from 'vue';

export interface State {
  currentDisplay: string;
  exerciseList: string[];
}

export const stateSymbol = Symbol('state');
export const createState = () => reactive({ currentDisplay: 'overview', exerciseList: [] });

export const useState = () => inject(stateSymbol);
export const provideState = () => provide(stateSymbol, createState());
