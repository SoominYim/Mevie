import { createRouter, createWebHistory } from "vue-router";
import MeMain from "@/views/MeMain.vue";
import MobileDetect from "mobile-detect";
import MoMain from "@/mobile/views/MoMain.vue";
// PC
const w_routes = [
  {
    path: "/",
    name: "main",
    component: MeMain,
  },
];

// Mobile
const m_routes = [
  {
    path: "/",
    name: "m_main",
    component: MoMain,
  },
];

const md = new MobileDetect(window.navigator.userAgent);

const createRouterInstance = () => {
  if (md.mobile()) {
    console.log("CONNECTION WITH MOBILE");
    return createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: m_routes,
    });
  } else {
    console.log("CONNECTION WITH PC");
    return createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes: w_routes,
    });
  }
};

const router = createRouterInstance();

export default router;
