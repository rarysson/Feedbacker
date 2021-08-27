<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Loading from "./Icon/Loading.vue";

export default {
  name: "Icon",

  components: {
    Loading,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
