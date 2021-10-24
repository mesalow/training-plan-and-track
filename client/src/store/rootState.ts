import {
  reactive,
  provide,
  inject,
} from 'vue';

export interface RootState {
  currentDisplay: string;
}

export const stateSymbol = Symbol('state');
export const createState = () => reactive({
  currentDisplay: 'overview',
});
export const useState = () => inject(stateSymbol);
export const provideState = () => provide(stateSymbol, createState());
