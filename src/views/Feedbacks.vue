<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <app-header />
  </div>

  <div class="flex flex-col justify-center items-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Feedbacks</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">Listagem</h1>
        <suspense>
          <template #default>
            <filters
              class="mt-8 animate__animated animate__fadeIn animate__faster"
              @click="changeFeedbackType"
            />
          </template>
          <template #fallback>
            <filters-loading class="mt-8" />
          </template>
        </suspense>
      </div>
      <div class="px-10 pt-20 col-span-3">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks.
        </p>
        <p
          v-else-if="
            !state.feedbacks.length &&
            !state.isLoading &&
            !state.isLoadingFeedbacks &&
            !state.hasError
          "
          class="text-lg text-center text-gray-800 font-regular"
        >
          Nenhum feedback recebido.
        </p>
        <feedback-card-loading
          v-else-if="state.isLoading || state.isLoadingFeedbacks"
        />
        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-opened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
        <feedback-card-loading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onBeforeMount, onErrorCaptured, onUnmounted } from "@vue/runtime-core";

import AppHeader from "../components/AppHeader.vue";
import Filters from "../components/Feedbacks/Filters.vue";
import FiltersLoading from "../components/Feedbacks/FiltersLoading.vue";
import FeedbackCard from "../components/Feedbacks/FeedbackCard.vue";
import FeedbackCardLoading from "../components/Feedbacks/FeedbackCardLoading.vue";

import services from "../services/auth";

export default {
  name: "Feedbacks",

  components: {
    AppHeader,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading,
  },

  setup() {
    const state = reactive({
      hasError: false,
      feedbacks: [],
      isLoading: false,
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      currentFeedbackType: "",
      pagination: {
        limit: 5,
        offset: 0,
      },
    });

    function handleErrors(error) {
      state.hasError = !!error;
    }

    async function fetchFeedbacks() {
      try {
        state.isLoading = true;

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
        });

        state.feedbacks = data.results;
        state.pagination = data.pagination;
      } catch (error) {
        handleErrors(error);
      } finally {
        state.isLoading = false;
      }
    }

    async function changeFeedbackType(type) {
      try {
        state.isLoadingFeedbacks = true;
        state.pagination.limit = 5;
        state.pagination.offset = 0;

        const { data } = await services.feedbacks.getAll({
          type,
          ...state.pagination,
        });

        state.feedbacks = data.results;
        state.pagination = data.pagination;
        console.log(data);
      } catch (erro) {
        handleErrors(erro);
      } finally {
        state.isLoadingFeedbacks = false;
      }
    }

    async function handleScroll() {
      const isBottomOfWindow =
        Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
        document.documentElement.scrollHeight;

      if (state.isLoading || state.isLoadingMoreFeedbacks) {
        return;
      }

      if (!isBottomOfWindow) {
        return;
      }

      if (state.feedbacks.length >= state.pagination.total) {
        return;
      }

      try {
        state.isLoadingMoreFeedbacks = true;

        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offeset: state.pagination.offset + 5,
        });

        if (data.results.length) {
          state.feedbacks.push(...data.results);
        }

        state.pagination = data.pagination;
      } catch (error) {
        handleErrors(error);
      } finally {
        state.isLoadingMoreFeedbacks = false;
      }
    }

    onBeforeMount(() => {
      fetchFeedbacks();
      window.addEventListener("scroll", handleScroll, false);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll, false);
    });

    onErrorCaptured(() => {
      state.hasError = true;
      state.isLoading = false;
      state.isLoadingFeedbacks = false;
      state.isLoadingMoreFeedbacks = false;
    });

    return {
      state,
      changeFeedbackType,
    };
  },
};
</script>
