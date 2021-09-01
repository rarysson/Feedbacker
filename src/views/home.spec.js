import Home from "./Home.vue";
import { routes } from "../router";
import { shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

describe("Home", () => {
  it("deveria conseguir renderizar Home corretamente", async () => {
    router.push("/");
    await router.isReady();
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
