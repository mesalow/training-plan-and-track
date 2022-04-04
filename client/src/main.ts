import { createApp } from 'vue';
import App from './App.vue';
import { stateSymbol as createStateSymbol, createState } from './store/createPlanState';
import { stateSymbol as rootStateSymbol, createState as createRootState } from './store/rootState';
import { stateSymbol as showPlanStateSymbol, createState as createShowPlanState } from './store/showPlanState';

import './assets/styles/index.css';

createApp(App)
  .provide(createStateSymbol, createState())
  .provide(rootStateSymbol, createRootState())
  .provide(showPlanStateSymbol, createShowPlanState())
  .mount('#app');
