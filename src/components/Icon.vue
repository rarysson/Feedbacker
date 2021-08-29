<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Loading from "./Icon/Loading.vue";
import Copy from "./Icon/Copy.vue";

export default {
  name: "Icon",

  components: {
    Loading,
    Copy,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
