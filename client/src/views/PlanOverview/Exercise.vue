<template>
  <div>
    {{ exercise.name }}<br />
    <div v-for="(set, idx) in exercise.sets" :key="idx">
      <done-set
        v-if="set.weight !== null && set.weight !== undefined"
        :weight="set.weight"
        :reps="set.reps"
      ></done-set>
      <set-input
        v-else
        :exerciseName="exercise.name"
        :planId="state.currentPlanId"
        :weekNumber="weekNumber"
        :dayNumber="dayNumber"
        :setNumber="idx + 1"
        :expectedSet="set.expected"
        @save="emitSave"
      ></set-input>
    </div>
  </div>
</template>

<script lang="ts">
import SetInput from './SetInput.vue';
import DoneSet from './DoneSet.vue';
import { useState, ShowPlanState } from '../../store/showPlanState';

export default {
  components: {
    SetInput,
    DoneSet,
  },
  props: {
    exercise: Object,
    weekNumber: Number,
    dayNumber: Number,
  },
  setup(props: any, context: any) {
    const state = useState() as ShowPlanState;
    const emitSave = () => context.emit('save');
    return { state, emitSave };
  },
};
</script>

<style></style>
