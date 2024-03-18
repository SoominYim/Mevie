import { createRouter, createWebHistory } from "vue-router";
import MeMain from "@/views/MeMain.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MeMain,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
