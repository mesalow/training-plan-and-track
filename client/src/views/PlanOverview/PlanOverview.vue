<template>
  <div class="planoverview" v-if="state.currentPlan">
    <div>This is the plan {{ state.currentPlanId }} with {{ state.currentPlan.length }} weeks</div>
    <div v-for="week in state.currentPlan" :key="week.weekNumber">
      Week {{ week.weekNumber }}:
      <div v-for="day in week.days" :key="day.dayNumber">
        Day: {{ day.dayNumber }}<br />
        <exercise
          v-for="exercise in day.exercises"
          :key="exercise.name"
          :exercise="exercise"
          :weekNumber="week.weekNumber"
          :dayNumber="day.dayNumber"
          @save="load"
        ></exercise>
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
import { onBeforeMount } from 'vue';
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
    return { state, load };
  },
};
</script>

<style></style>
