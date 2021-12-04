<template>
  <div >
    Week {{ week.weekNumber }}:
    <div class="day-container" v-for="day in week.days" :key="day.dayNumber">
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
  </div>
</template>

<script lang="ts">
import Exercise from './Exercise.vue';
import { useState, ShowPlanState } from '../../store/showPlanState';

export default {
  components: {
    Exercise,
  },
  props: {
    week: Object,
  },
  setup() {
    const state = useState() as ShowPlanState;
    const load = async () => state.load(state);
    return { load };
  },
};
</script>

<style>
.day-container {
  background-color: aliceblue;
}
</style>
