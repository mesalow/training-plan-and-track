<template>
  <div class="planoverview" v-if="state.currentPlan">
    <div>This is the plan {{ state.currentPlanId }} with {{ state.currentPlan.length }} weeks</div>
    <div v-for="week in state.currentPlan" :key="week.weekNumber">
      Week {{ week.weekNumber }}:
      <div v-for="day in week.days" :key="day.dayNumber">
        Day: {{ day.dayNumber }}<br />
        <div v-for="exercise in day.exercises" :key="exercise.name">
          {{ exercise.name }}<br />
          <div v-for="(set, idx) in exercise.sets" :key="idx">
            <done-set v-if="set.weight" :weight="set.weight" :reps="set.reps"></done-set>
            <set-input v-else :expectedSet="set.expected"></set-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount } from 'vue';
import { useState, ShowPlanState } from '../../store/showPlanState';
import { getProgress } from '../../api';
import SetInput from './SetInput.vue';
import DoneSet from './DoneSet.vue';

export default {
  components: {
    SetInput,
    DoneSet,
  },
  setup() {
    const state = useState() as ShowPlanState;
    onBeforeMount(async () => {
      try {
        const response = await getProgress(state.currentPlanId);
        console.log('loaded current plan %o', response);

        state.currentPlan = response;
        console.log('loaded current plan %o', state.currentPlan);
      } catch (error) {
        console.error('showPlans.beforeMount error', error);
      }
    });
    return { state };
  },
};
</script>

<style></style>
