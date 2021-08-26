<template>
  <home-header @login="handleLogin" @create-account="handleCreateAccount" />
  <contact />
  <home-footer />
  <modal-factory />
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import useModal from "../hooks/useModal";

import Contact from "../components/Home/Contact.vue";
import HomeHeader from "../components/Home/HomeHeader.vue";
import HomeFooter from "../components/Home/HomeFooter.vue";
import ModalFactory from "../components/ModalFactory.vue";

export default {
  name: "Home",

  components: {
    Contact,
    HomeHeader,
    HomeFooter,
    ModalFactory,
  },

  setup() {
    const router = useRoute();
    const modal = useModal();

    onMounted(() => {
      const token = window.localStorage.getItem("token");

      if (token) {
        router.push({ name: "Feedbacks" });
      }
    });

    function handleLogin() {
      modal.open({
        component: "ModalLogin",
      });
    }

    function handleCreateAccount() {
      modal.open({
        component: "ModalCreateAccount",
      });
    }

    return {
      handleLogin,
      handleCreateAccount,
    };
  },
};
</script>
