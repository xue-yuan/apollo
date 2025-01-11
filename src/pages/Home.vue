<template>
  <button @click="red">click here to Test</button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function red() {
  router.push("/test");
}
</script>
