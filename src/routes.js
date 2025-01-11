import Callback from "@/pages/Callback.vue";
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Test from "@/pages/Test.vue";
import LikedSong from "@/pages/LikedSong.vue";

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/liked-song",
    name: "LikedSong",
    component: LikedSong,
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
