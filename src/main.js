import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";

import "animate.css";
import "@/assets/css/fonts.css";
import "@/assets/css/tailwind.css";
import "vue-toastification/dist/index.css";

createApp(App).use(router).use(Toast).mount("#app");
