<template>
  <div class="overview">
    <div @click="goToCreatePlan">Create a new plan</div>
    <div>Continue current plan</div>
    <div>Show plan details</div>
  </div>
</template>

<script lang="ts">
import { useState, RootState } from '../../store/rootState';

export default {
  name: 'Overview',
  props: {},
  setup() {
    const state = useState() as RootState;
    const goToCreatePlan = () => {
      console.log('goto');
      state.currentDisplay = 'createPlan';
    };
    return { goToCreatePlan };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
