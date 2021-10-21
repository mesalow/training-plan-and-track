<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      Test
      <div v-for="(exerciseName, k) in state.exerciseList" :key="k">
        {{ exerciseName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useState, State } from '../store/state';
import { getAllExercises } from '../api';

export default {
  name: 'createPlan',
  props: {},
  setup() {
    const isLoading = ref(false);
    const state = useState() as State;
    console.log(state.currentDisplay);
    isLoading.value = true;

    onBeforeMount(async () => {
      const data = (await getAllExercises().catch(console.error)) as object;
      isLoading.value = false;
      console.log('got result:', data);
      state.exerciseList = Object.keys(data); // Object.keys(data);
      console.log('got exerciseList is now:', state.exerciseList);
    });
    console.log('got exercises:', state.exerciseList);
    return {
      isLoading, state,
    };
  },
};
</script>
