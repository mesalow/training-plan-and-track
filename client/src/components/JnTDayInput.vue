<template>
  <div class="jntday-input">
    <div>{{ name }}</div>
    <div @click="toggle">Expand</div>
    <div v-show="expanded">
      <exercise-input :progressionType="'T1'" />
      <exercise-input :progressionType="'T2a'" />
      <exercise-input :progressionType="'T2b'" />
      <exercise-input :progressionType="'T2c'" />
      <exercise-input :progressionType="'T3'" />
      <exercise-input :progressionType="'T3'" />
      <exercise-input :progressionType="'T3'" />
      <exercise-input :progressionType="'T3'" />
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
  },
  components: {
    ExerciseInput,
  },
  setup() {
    const expanded = ref(false);
    const toggle = () => {
      expanded.value = !expanded.value;
    };
    return { expanded, toggle };
  },
};
</script>
