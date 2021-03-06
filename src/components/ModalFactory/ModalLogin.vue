<template>
  <div class="flex justify-between" data-test="modal-login">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
      &#10761;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          type="email"
          class="
            block
            w-full
            px-4
            py-3
            mt-1
            text-lg
            bg-gray-100
            border-2 border-transparent
            rounded
          "
          :class="{ 'border-brand-danger': !!state.email.erroMessage }"
          placeholder="email@email.com"
          data-test="email-input"
          v-model="state.email.value"
        />
        <span
          v-if="!!state.email.erroMessage"
          class="block font medium text-brand-danger"
          data-test="email-error"
        >
          {{ state.email.erroMessage }}
        </span>
      </label>
      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          type="password"
          class="
            block
            w-full
            px-4
            py-3
            mt-1
            text-lg
            bg-gray-100
            border-2 border-transparent
            rounded
          "
          :class="{ 'border-brand-danger': !!state.password.erroMessage }"
          placeholder="*****"
          data-test="password-input"
          v-model="state.password.value"
        />
        <span
          v-if="!!state.password.erroMessage"
          class="block font medium text-brand-danger"
        >
          {{ state.password.erroMessage }}
        </span>
      </label>
      <button
        class="
          px-8
          py-3
          mt-10
          text-2xl
          font-bold
          text-white
          rounded-full
          bg-brand-main
          focus:outline-none
          transition-all
          duration-150
        "
        :class="{ 'opacity-50': state.isLoading }"
        :disabled="state.isLoading"
        type="submit"
        data-test="submit-btn"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useField } from "vee-validate";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import useModal from "@/hooks/useModal";
import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "@/services/validators";
import auth from "@/services/auth";

import Icon from "../Icon.vue";

export default {
  name: "ModalLogin",

  components: {
    Icon,
  },

  setup() {
    const router = useRouter();
    const modal = useModal();
    const toast = useToast();

    const { value: emailValue, errorMessage: emailErroMessage } = useField(
      "email",
      validateEmptyAndEmail
    );

    const { value: passwordValue, errorMessage: passwordErroMessage } =
      useField("password", validateEmptyAndLength3);

    const state = reactive({
      hasErros: false,
      isLoading: false,
      email: {
        value: emailValue,
        erroMessage: emailErroMessage,
      },
      password: {
        value: passwordValue,
        erroMessage: passwordErroMessage,
      },
    });

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { data, errors } = await auth.auth.login({
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          window.localStorage.setItem("token", data.token);
          router.push({ name: "Feedbacks" });
          modal.close();
        } else if (errors.status === 404) {
          toast.error("E-mail não encontrado");
        } else if (errors.status === 401) {
          toast.error("E-mail ou senha inválidos");
        } else if (errors.status === 400) {
          toast.error("Ocorreu um erro ao fazer o login");
        }
      } catch (error) {
        state.hasErros = true;
        toast.error("Ocorreu um erro ao fazer o login");
      } finally {
        state.isLoading = false;
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>
