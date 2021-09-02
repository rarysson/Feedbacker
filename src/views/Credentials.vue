<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <app-header />
  </div>

  <div class="flex flex-col justify-center items-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-2-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>

      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>
      <content-loader
        v-if="storeGlobal.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="
          flex
          justify-between
          items-center
          py-3
          pl-5
          mt-2
          rounded
          bg-brand-gray
          w-full
          lg:w-1/2
        "
      >
        <span v-if="state.hasErrors">Erro ao carregar a api key</span>
        <span v-else data-test="api-key">{{
          storeUser.currentUser.apiKey
        }}</span>
        <div v-if="!state.hasErrors" class="flex ml-20 mr-5">
          <icon
            class="cursor-pointer"
            name="copy"
            size="24"
            :color="brandColors.graydark"
            @click="handleCopy"
          />
          <icon
            class="cursor-pointer ml-3"
            name="loading"
            size="24"
            :color="brandColors.graydark"
            data-test="generate-btn"
            @click="handleGenerateApiKey"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>
      <content-loader
        v-if="storeGlobal.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="
          py-3
          pl-5
          pr-20
          mt-2
          rounded
          bg-brand-gray
          w-full
          lg:w-2/3
          overflow-scroll-x
        "
      >
        <span v-if="state.hasErrors">Erro ao carregar o script</span>
        <pre v-else class="break-normal w-full">
&lt;script src="{{ apiUrl }}?api_key={{
            storeUser.currentUser.apiKey
          }}"&gt;&lt;/script&gt;</pre
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useToast } from "vue-toastification";

import useStore from "../hooks/useStore";

import AppHeader from "../components/AppHeader.vue";
import Icon from "../components/Icon.vue";
import ContentLoader from "../components/ContentLoader.vue";

import { brandColors } from "../services/colors";

import auth from "../services/auth";
import { setApiKey } from "../store/user";

export default {
  name: "Credentials",

  components: {
    AppHeader,
    Icon,
    ContentLoader,
  },

  setup() {
    const storeUser = useStore("User");
    const storeGlobal = useStore("Global");
    const toast = useToast();
    const apiUrl = "link.api";

    const state = reactive({
      isLoading: false,
      hasErrors: false,
    });

    watch(
      () => storeUser.currentUser,
      () => {
        if (!storeGlobal.isLoading && !storeUser.currentUser.apiKey) {
          state.isLoading = false;
          state.hasErrors = true;
        }
      }
    );

    async function handleCopy() {
      try {
        toast.clear();

        await navigator.clipboard.writeText(storeUser.currentUser.apiKey);

        toast.success("Copiado!");
      } catch (error) {
        state.isLoading = false;
        state.hasErrors = true;
      }
    }

    async function handleGenerateApiKey() {
      try {
        state.isLoading = true;

        const { data } = await auth.users.generateApiKey();
        setApiKey(data.apiKey);
      } catch (error) {
        state.hasErrors = true;
      } finally {
        state.isLoading = false;
      }
    }

    return {
      state,
      storeUser,
      storeGlobal,
      brandColors,
      apiUrl,
      handleCopy,
      handleGenerateApiKey,
    };
  },
};
</script>
