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
      try {
        const data = await getAllExercises();
      isLoading.value = false;
        state.exerciseList = Object.keys(data);
      } catch (error) {
        console.error(error);
      }
    });
    return {
      isLoading, state,
    };
  },
};
</script>
