<template>
  <div class="jntday-input">
    <div>{{ name }}</div>
    <div @click="toggle">Expand</div>
    <div v-show="expanded">
      <div>T1</div>
      <div>T2a</div>
      <div>T2b</div>
      <div>T2c</div>
      <div>T3</div>
      <div>T3</div>
      <div>T3</div>
      <div>T3</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
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
