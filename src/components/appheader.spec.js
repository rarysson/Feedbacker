import { routes } from "../router";
import { shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";

import AppHeader from "./AppHeader.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

const mockStore = { currentUser: {} };

jest.mock("../hooks/useStore", () => {
  return () => {
    return mockStore;
  };
});

describe("AppHeader", () => {
  it("deveria renderizar header do app", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(AppHeader, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("deveria aparecer os 3 pontos quando o usuário não está logado", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(AppHeader, {
      global: {
        plugins: [router],
      },
    });

    const buttonLogout = wrapper.find('[data-test="logout-btn"]');
    expect(buttonLogout.text()).toBe("...");
  });

  it("deveria aparecer o nome do usuário quando o usuário está logado", async () => {
    router.push("/");
    await router.isReady();
    mockStore.currentUser.name = "Test";
    const wrapper = shallowMount(AppHeader, {
      global: {
        plugins: [router],
      },
    });

    const buttonLogout = wrapper.find('[data-test="logout-btn"]');
    expect(buttonLogout.text()).toBe("Test (sair)");
  });
});
