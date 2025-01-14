<template>
  <div>
    <h1>Processing Login...</h1>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  await authStore.getAccessToken(urlParams.get("code"));
});
</script>
