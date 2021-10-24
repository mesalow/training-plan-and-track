<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <jn-t-day-input
        v-for="(plannedDay, idx) in state.plannedDays"
        :key="idx"
        :name="plannedDay.weekDay"
        :exercises="plannedDay.exercises"
      ></jn-t-day-input>
      <div class="createplan-submit" @click="submit">Submit</div>
    </div>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useState, State } from '../../store/state';
import { getAllExercises, createPlan } from '../../api';
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
    console.log('createPlan', state.currentDisplay);
    console.log('createPlan %o', state.plannedDays);
    isLoading.value = true;
    const submit = async () => {
      try {
        console.log('submit');
        const body = {
          programId: 1,
          startDay: new Date().toDateString(),
          days: state.plannedDays,
        };
        await createPlan(body);
      } catch (error) {
        console.error('createPlan.submit', error);
      }
    };
    onBeforeMount(async () => {
      try {
        const data = await getAllExercises();
        isLoading.value = false;
        state.exerciseList = Object.keys(data);
      } catch (error) {
        console.error('createPlan', error);
      }
    });
    return {
      isLoading,
      state,
      submit,
    };
  },
};
</script>
<style scoped>
.createplan-submit {
  background-color: black;
  width:30%;
  color: white;
  left:35%;
  position:absolute;
}
</style>
