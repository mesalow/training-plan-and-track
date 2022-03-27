<template>
  <div class="set-input" @mouseover="getRecord">
    Not done! Expected weight: {{ expectedSet.weight }} Reps: {{ expectedSet.reps }}
    <label>Weight:<input v-model="setInput.weight" type="text" /></label>
    <label>Reps:<input v-model="setInput.reps" type="text" /></label>
    <div
      @click="submit"
      @keydown.prevent.enter="submit"
      @keydown.prevent.space="submit"
      tabindex="0"
      class="btn"
    >
      Submit
    </div>
    <div v-if="record.weight > 0">Best weight {{ record.weight }} with reps {{ record.reps }}</div>
  </div>
</template>
<script lang="ts">
import { reactive, watch } from 'vue';
import { getRecordByReps, getRecordByWeight, saveActualSet } from '../../api';

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
    exerciseId: {
      type: Number,
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
    const record = reactive({ weight: 0, reps: 0 });
    watch(
      () => props.expectedSet,
      (newValue) => {
        setInput.weight = newValue.weight;
        setInput.reps = newValue.reps;
      },
    );
    const getRecord = async () => {
      if (record.weight !== 0 && record.reps !== 0) return record;
      console.log('getRecord');
      const isRm = props.expectedSet.weight === 'RM';
      const isMr = props.expectedSet.reps === 'MR';
      let recordSet;
      if (isRm) {
        recordSet = (await getRecordByReps(props.exerciseId, props.expectedSet.reps)) as any;
      } else if (isMr && !Number.isNaN(props.expectedSet.weight)) {
        recordSet = await getRecordByWeight(props.exerciseId, props.expectedSet.weight);
      } else {
        return null;
      }
      console.log('getRecord: %o', recordSet);
      record.weight = recordSet.used_weight;
      record.reps = recordSet.reps;
      return record;
    };

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
    return {
      submit,
      setInput,
      props,
      getRecord,
      record,
    };
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
