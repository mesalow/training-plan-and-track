import { createApp } from 'vue';
import App from './App.vue';
import { stateSymbol, createState } from './store/createPlanState';

createApp(App)
  .provide(stateSymbol, createState())
  .mount('#app');
