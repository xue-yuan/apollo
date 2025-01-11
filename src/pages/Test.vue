<template>
  <router-link to="/">
    <button>click here to Home</button>
  </router-link>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
