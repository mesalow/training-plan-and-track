<template>
  <div class="planoverview" v-if="state.currentPlan">
    <div>This is the plan {{ state.currentPlanId }} with {{ state.currentPlan.length }} weeks</div>
    <div>
      Choose the week:
      <select v-model="selectWeek" @change="showWeek"
        ><option v-for="week in state.currentPlan" :key="week.weekNumber"
          >{{ week.weekNumber }}
        </option></select
      >
    </div>
    <week
      class="week-container"
      v-for="week in state.currentPlan"
      :key="week.weekNumber"
      :week="week"
      v-show="selectedWeek === week.weekNumber"
    >
    </week>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useState, ShowPlanState } from '../../store/showPlanState';

import Week from './Week.vue';

export default {
  components: {
    Week,
  },
  setup() {
    const state = useState() as ShowPlanState;
    const load = async () => state.load(state);
    onBeforeMount(load);
    const selectedWeek = ref(1);
    const showWeek = (e: any) => {
      console.log(e);
      selectedWeek.value = parseInt(e.target.value, 10);
    };
    return { state, showWeek, selectedWeek };
  },
};
</script>

<style>
.week-container {
  display: flex;
}
</style>
