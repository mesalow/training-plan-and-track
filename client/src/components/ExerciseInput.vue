<template>
  <div>
    {{ progressionType }}
    <select :v-model="chosenExercise" default="">
      <option disabled> Select exercise </option>
      <option v-for="exercise in exercises" :key="exercise"> {{ exercise }}</option>
    </select>
    <input v-if="needsTm" type="text" :v-model="tm" />
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import { useState, State } from '../store/state';

export default {
  props: {
    progressionType: {
      type: String,
    },
  },
  setup(props: any) {
    const state = useState() as State;
    console.log('ExerciseInput: exercises %o', props.exercises);
    const needsTm = ['T1', 'T2a'].includes(props.progressionType);
    const chosenExercise = ref('');
    const tm = ref(0);
    const exercises = state.exerciseList;
    return {
      needsTm,
      chosenExercise,
      tm,
      exercises,
    };
  },
};
</script>
