<template>
  <home-header @login="handleLogin" @create-account="handleCreateAccount" />
  <contact />
  <home-footer />
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";

import Contact from "../components/Home/Contact.vue";
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";

export default {
  name: "Home",

  components: {
    Contact,
    HomeHeader,
    HomeFooter,
  },

  setup() {
    const router = useRoute();

    onMounted(() => {
      const token = window.localStorage.getItem("token");

      if (token) {
        router.push({ name: "Feedbacks" });
      }
    });

    function handleLogin() {}

    function handleCreateAccount() {}

    return {
      handleLogin,
      handleCreateAccount,
    };
  },
};
</script>
