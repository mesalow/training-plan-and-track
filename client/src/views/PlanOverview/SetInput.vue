<template>
  <div>Not done! Expected weight: {{ expectedSet.weight }} Reps: {{ expectedSet.reps }}
      <label>Weight:<input type="text"></label>
      <label>Reps:<input type="text"></label>
      <div>Submit</div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    expectedSet: {
      type: Object,
      required: true,
    },
  },
};
</script>
