<template>
  <span class="cell">{{ cellValue }}</span>
</template>

<script>
export default {
  props: {
    cellValue: {
      type: String | Number,
      default: "",
    },
  },
};
</script>