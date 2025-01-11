<template>
  <div>
    <h1>Processing Login...</h1>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const getToken = async (code) => {
  authStore.loadCodeVerifier();

  const codeVerifier = authStore.codeVerifier;
  const tokenUrl = import.meta.env.VITE_SPOTIFY_API_TOKEN;
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  };

  fetch(tokenUrl, payload)
    .then((body) => body.json())
    .then((data) => {
      authStore.setToken(data.access_token, data.refresh_token);
      authStore.removeCodeVerifier();
      router.push("/");
    })
    .catch((err) => {
      // TODO: Use snackbar.
      console.error("Error exchanging code for tokens", err);
    });
};

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  await getToken(urlParams.get("code"));
});
</script>
