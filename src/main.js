import "@mdi/font/css/materialdesignicons.css";

import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "vuetify/styles";

import App from "@/App.vue";
import routes from "@/routes";
import { useAuthStore } from "@/stores/auth";

const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App).use(pinia).use(vuetify);

const authStore = useAuthStore();
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.accessToken) {
    next("/login");
  } else if (to.path === "/login" && authStore.accessToken) {
    next("/");
  } else {
    next();
  }
});

app.use(router).mount("#app");
