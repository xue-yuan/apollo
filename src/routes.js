import Callback from "@/pages/Callback.vue";
import Index from "@/pages/Index.vue";
import Login from "@/pages/Login.vue";

export default [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
  },
];
