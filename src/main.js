import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import MobileDetect from "mobile-detect";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$md = new MobileDetect(window.navigator.userAgent);
app.use(router).use(store).mount("#app");
