<template>
  <div
    class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex justify-between items-center w-full mb-8">
      <badge :type="feedback.type" />
      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>
    <div class="text-lg font-medium text-gray-800">
      {{ feedback.text }}
    </div>
    <div
      v-if="state.isOpen"
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
      :class="{ animate__fadeOutUp: state.isClosing }"
    >
      <div class="flex flex-col w-1/2">
        <span class="font-bold text-gray-400 uppercase select-none">
          Página
        </span>
        <span class="font-medium text-gray-700">{{ feedback.page }}</span>
      </div>
      <div class="flex flex-col w-1/2">
        <span class="font-bold text-gray-400 uppercase select-none">
          Dispositivo
        </span>
        <span class="font-medium text-gray-700">{{ feedback.device }}</span>
      </div>
      <div class="flex flex-col w-1/2">
        <span class="font-bold text-gray-400 uppercase select-none">
          Usuário
        </span>
        <span class="font-medium text-gray-700">
          {{ feedback.fingerprint }}
        </span>
      </div>
    </div>
    <div v-if="!state.isOpen" class="flex justify-end mt-8">
      <icon name="chevron-down" size="24" :color="brandColors.graydark" />
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";

import { getDiffTimeBetweenCurrentDate } from "@/services/date";
import { brandColors } from "@/services/colors";
import { wait } from "@/services/wait";

import Icon from "../Icon.vue";
import Badge from "./Badge.vue";

export default {
  name: "FeedbackCard",

  props: {
    feedback: {
      type: Object,
      required: true,
    },

    isOpened: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Badge,
    Icon,
  },

  setup(props) {
    const state = reactive({
      isOpen: props.isOpened,
      isClosing: !props.isOpened,
    });

    async function handleToggle() {
      state.isClosing = true;
      await wait(250);
      state.isOpen = !state.isOpen;
      state.isClosing = false;
    }

    return {
      state,
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors,
    };
  },
};
</script>
