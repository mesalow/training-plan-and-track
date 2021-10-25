<template>
  <div>This is the plan {{ state.currentPlanId }}</div>
</template>

<script lang="ts">
import { onBeforeMount } from 'vue';
import { useState, ShowPlanState } from '../../store/showPlanState';
import { getPlan } from '../../api';

export default {
  setup() {
    const state = useState() as ShowPlanState;
    onBeforeMount(async () => {
      try {
        state.currentPlan = await getPlan(state.currentPlanId);
      } catch (error) {
        console.error('showPlans.beforeMount error', error);
      }
    });
    return { state };
  },
};
</script>

<style></style>
