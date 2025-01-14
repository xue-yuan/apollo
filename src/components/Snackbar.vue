<template>
  <v-snackbar
    variant="tonal"
    v-model="alertStore.show"
    :timeout="alertStore.timeout"
    :color="alertStore.color"
  >
    {{ alertStore.text }}
  </v-snackbar>
</template>

<script setup>
import { useAlertStore } from "@/stores/alert";

const alertStore = useAlertStore();
</script>
