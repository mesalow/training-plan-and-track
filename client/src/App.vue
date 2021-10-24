<template>
  <div>
    <div>
      <Overview v-if="state.currentDisplay === 'overview'" />
      <div v-else-if="state.currentDisplay !== 'overview'" @click="backToOverview">
        Back to overview
      </div>
    </div>
    <CreatePlan v-if="state.currentDisplay === 'createPlan'" />
  </div>
</template>

<script lang="ts">
import Overview from './views/Overview/Overview.vue';
import CreatePlan from './views/CreatePlan/CreatePlan.vue';
import { useState, RootState } from './store/rootState';

export default {
  name: 'App',
  components: {
    Overview,
    CreatePlan,
  },
  setup() {
    const state = useState() as RootState;
    const backToOverview = () => {
      state.currentDisplay = 'overview';
    };
    return { state, backToOverview };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
