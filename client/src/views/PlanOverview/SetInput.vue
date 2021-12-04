<template>
  <div class="set-input">
    Not done! Expected weight: {{ expectedSet.weight }} Reps: {{ expectedSet.reps }}
    <label>Weight:<input v-model="setInput.weight" type="text"/></label>
    <label>Reps:<input v-model="setInput.reps" type="text"/></label>
    <div @click="submit" class="btn">Submit</div>
  </div>
</template>
<script lang="ts">
import { reactive, watch } from 'vue';
import { saveActualSet } from '../../api';

export default {
  props: {
    expectedSet: {
      type: Object,
      required: true,
    },
    exerciseName: {
      type: String,
      required: true,
    },
    planId: {
      type: Number,
      required: true,
    },
    weekNumber: {
      type: Number,
      required: true,
    },
    dayNumber: {
      type: Number,
      required: true,
    },
    setNumber: {
      type: Number,
      required: true,
    },
  },
  setup(props: any, context: any) {
    const setInput = reactive({
      weight: props.expectedSet.weight, // TODO: is not reactive when props are updated.
      // props.expectedSet.weight gets updated, but setInput.weight via the input model does not
      reps: props.expectedSet.reps,
    });
    watch(
      () => props.expectedSet,
      (newValue) => {
        setInput.weight = newValue.weight;
        setInput.reps = newValue.reps;
      },
    );
    const submit = async () => {
      console.log('submit', setInput.weight, setInput.reps);
      const body = {
        exerciseName: props.exerciseName,
        weekNumber: props.weekNumber,
        dayNumber: props.dayNumber,
        setNumber: props.setNumber,
        weight: setInput.weight,
        reps: setInput.reps,
      };
      await saveActualSet(props.planId, body);
      context.emit('save');
    };
    return { submit, setInput, props };
  },
};
</script>
<style scoped>
.set-input {
  margin-bottom: 1em;
}

.btn {
  background-color: whitesmoke;
  border: 1px darkgreen solid;
  border-radius: 3px;
  width: 50%;
}
</style>
