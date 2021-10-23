<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <jn-t-day-input :name="'Saturday'"></jn-t-day-input>
      <jn-t-day-input :name="'Monday'"></jn-t-day-input>
      <jn-t-day-input :name="'Wednesday'"></jn-t-day-input>
      <jn-t-day-input :name="'Friday'"></jn-t-day-input>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useState, State } from '../store/state';
import { getAllExercises } from '../api';
import JnTDayInput from './JnTDayInput.vue';

export default {
  name: 'createPlan',
  components: {
    JnTDayInput,
  },
  props: {},
  setup() {
    const isLoading = ref(false);
    const state = useState() as State;
    console.log(state.currentDisplay);
    isLoading.value = true;

    onBeforeMount(async () => {
      try {
        const data = await getAllExercises();
        isLoading.value = false;
        state.exerciseList = Object.keys(data);
      } catch (error) {
        console.error(error);
      }
    });
    return {
      isLoading,
      state,
    };
  },
};
</script>
