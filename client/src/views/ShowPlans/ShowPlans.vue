<template>
  <div>
    <div v-for="plan in state.allPlans" :key="plan.pl_id" @click="() => showPlan(plan.pl_id)">
      {{ plan.prg_name }} {{ plan.start_day }}
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount } from 'vue';
import { getAllPlans } from '../../api';
import { useState, ShowPlanState, Plan } from '../../store/showPlanState';
import { useState as useRootState, RootState } from '../../store/rootState';

export default {
  setup() {
    const state = useState() as ShowPlanState;
    const rootState = useRootState() as RootState;
    onBeforeMount(async () => {
      try {
        state.allPlans = (await getAllPlans()) as Plan[];
      } catch (error) {
        console.error('showPlans.beforeMount error', error);
      }
    });
    const showPlan = (planId: number) => {
      rootState.currentDisplay = 'planOverview';
      state.currentPlanId = planId;
    };
    return { state, showPlan };
  },
};
</script>
