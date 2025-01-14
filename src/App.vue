<template>
  <router-view></router-view>
  <Snackbar />
</template>

<script setup>
import Snackbar from "./components/Snackbar.vue";

// import { ref } from "vue";
// import { useTheme } from "vuetify";

// const theme = useTheme();

// let darkMode = ref(theme.global.name.value === "light" ? false : true);
// let drawer = ref(false);

// const updateTheme = (updatedTheme) => {
//   theme.global.name.value = updatedTheme;
//   darkMode.value = theme.global.name.value === "dark" ? true : false;
// };

// const toggleTheme = () => {
//   darkMode.value = !darkMode.value;
//   theme.global.name.value = darkMode.value ? "dark" : "light";
// };
</script>

<style>
.no-active-style {
  color: inherit;
  background: none;
}
</style>
