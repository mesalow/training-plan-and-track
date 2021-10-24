<template>
  <div class="jntday-input">
    <div>{{ name }}</div>
    <div @click="toggle">Expand</div>
    <div v-show="expanded">
      <exercise-input
        v-for="(exercise, idx) in exercises"
        :key="idx"
        :progressionType="exercise.progression"
        :name="exercise.name"
        :tm="exercise.tm"
        :exNumber="idx"
        :weekDay="name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import ExerciseInput from './ExerciseInput.vue';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    exercises: {
      type: Array,
      required: true,
    },
  },
  components: {
    ExerciseInput,
  },
  setup(props: any) {
    console.log('jntdayInput, exercises: %o', props.exercises);
    const expanded = ref(false);
    const toggle = () => {
      expanded.value = !expanded.value;
    };
    return { expanded, toggle };
  },
};
</script>
