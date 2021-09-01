<template>
  <div class="flex justify-between items-center w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="@/assets/image/logo.png" alt="logo" />
    </div>
    <div class="flex">
      <ul class="flex list-none">
        <li
          class="
            px-6
            py-2
            mr-2
            font-bold
            text-white
            rounded-full
            cursor-pointer
            focus:outline-none
          "
          @click="() => router.push({ name: 'Credentials' })"
        >
          Credenciais
        </li>
        <li
          class="
            px-6
            py-2
            mr-2
            font-bold
            text-white
            rounded-full
            cursor-pointer
            focus:outline-none
          "
          @click="() => router.push({ name: 'Feedbacks' })"
        >
          Feedbacks
        </li>
        <li
          class="
            px-6
            py-2
            font-bold
            bg-white
            rounded-full
            text-brand-main
            cursor-pointer
            focus:outline-none
          "
          data-test="logout-btn"
          @click="handleLogout"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

import useStore from "@/hooks/useStore";
import { clearCurrentUser } from "../store/user";

export default {
  name: "AppHeader",

  setup() {
    const router = useRouter();
    const store = useStore("User");

    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return "...";
      }

      return `${store.currentUser.name} (sair)`;
    });

    function handleLogout() {
      window.localStorage.removeItem("token");
      clearCurrentUser();
      router.push({ name: "Home" });
    }

    return {
      router,
      logoutLabel,
      handleLogout,
    };
  },
};
</script>
