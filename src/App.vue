<template>
  <router-view />
</template>

<script>
import { watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

import auth from "./services/auth";
import { setCurrentUser } from "./store/user";

export default {
  name: "App",

  setup() {
    const router = useRouter();
    const route = useRoute();

    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem("token");

          if (!token) {
            router.push({ name: "Home" });
          } else {
            const { data } = await auth.users.getMe();
            setCurrentUser(data);
          }
        }
      }
    );
  },
};
</script>
