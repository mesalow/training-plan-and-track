<template>
  <div>
    <div v-for="plan in state.allPlans" :key="plan.pl_id">
      {{ plan.prg_name }} {{ plan.start_day }}
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount } from 'vue';
import { getAllPlans } from '../../api';
import { useState, ShowPlanState, Plan } from '../../store/showPlanState';

export default {
  setup() {
    const state = useState() as ShowPlanState;
    onBeforeMount(async () => {
      try {
        state.allPlans = (await getAllPlans()) as Plan[];
      } catch (error) {
        console.error('showPlans.beforeMount error', error);
      }
    });
    return { state };
  },
};
</script>
