<template>
  <div class="doneset">Already done! Weight: {{ weight }} Reps: {{ reps }}</div>
</template>

<script>
export default {
  props: {
    weight: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style>
.doneset {
  background-color: green;
  color:whitesmoke;
}
</style>
