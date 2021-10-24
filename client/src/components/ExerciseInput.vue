<template>
  <div>
    {{ progressionType }}
    <select v-model="chosenExercise">
      <option disabled value=""> Select exercise </option>
      <option v-for="exercise in exercises" :key="exercise" :value="exercise">
        {{ exercise }}</option
      >
    </select>
    <span>{{ chosenExercise }} </span>
    <input v-if="needsTm" type="text" v-model="tm" />
  </div>
</template>
<script lang="ts">
import { ref, watch } from 'vue';
import { useState, State } from '../store/state';

export default {
  props: {
    progressionType: {
      type: String,
    },
    name: {
      type: String,
    },
    exNumber: {
      type: Number,
    },
    weekDay: {
      type: String,
    },
  },
  setup(props: any) {
    const state = useState() as State;
    const needsTm = ['T1', 'T2a'].includes(props.progressionType);
    const chosenExercise = ref('');
    const exercises = state.exerciseList;
    const tm = ref(0);
    watch(chosenExercise, (newVal, prevVal) => {
      console.log('newVal ex', newVal, prevVal);
      state.setExercise(props.weekDay, props.exNumber, newVal, tm.value);
    });
    watch(tm, (newVal, prevVal) => {
      console.log('newVal tm', newVal, prevVal);
      state.setExercise(props.weekDay, props.exNumber, chosenExercise.value, newVal);
    });
    return {
      needsTm,
      chosenExercise,
      exercises,
      tm,
    };
  },
};
</script>
