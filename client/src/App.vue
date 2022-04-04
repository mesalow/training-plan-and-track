<template>
  <div class="bg-blue-500">
    <div>
      <Overview v-if="state.currentDisplay === 'overview'" />
      <div v-else-if="state.currentDisplay !== 'overview'" @click="backToOverview">
        Back to overview
      </div>
    </div>
    <CreatePlan v-if="state.currentDisplay === 'createPlan'" />
    <ShowPlans v-if="state.currentDisplay === 'showPlans'" />
    <PlanOverview v-if="state.currentDisplay === 'planOverview'" />
  </div>
</template>

<script lang="ts">
import Overview from './views/Overview/Overview.vue';
import CreatePlan from './views/CreatePlan/CreatePlan.vue';
import ShowPlans from './views/ShowPlans/ShowPlans.vue';
import PlanOverview from './views/PlanOverview/PlanOverview.vue';
import { useState, RootState } from './store/rootState';

export default {
  name: 'App',
  components: {
    Overview,
    CreatePlan,
    ShowPlans,
    PlanOverview,
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
