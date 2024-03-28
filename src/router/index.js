import { createRouter, createWebHistory } from "vue-router";
import MeMain from "@/views/MeMain.vue";
import MoMain from "@/mobile/views/MoMain.vue";
import MeDetail from "@/views/MeDetail";
import MeSearch from "@/views/MeSearch.vue";
import MobileDetect from "mobile-detect";

// PC
const w_routes = [
  {
    path: "/",
    name: "MeMain",
    component: MeMain,
  },
  {
    path: "/detail/:id",
    name: "MeDetail",
    component: MeDetail,
  },
  {
    path: "/search",
    name: "search",
    component: MeSearch,
  },
];

// Mobile
const m_routes = [
  {
    path: "/",
    name: "m_main",
    component: MoMain,
  },
  {
    path: "/detail/:id",
    name: "MeDetail",
    component: MeDetail,
  },
  {
    path: "/search",
    name: "search",
    component: MeSearch,
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
