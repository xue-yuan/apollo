<template>
  <v-btn @click="login" prepend-icon="mdi-spotify" color="success">Login</v-btn>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { base64encode, generateRandomString, sha256 } from "@/utils.js";

const authStore = useAuthStore();

const login = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const authUrl = new URL(import.meta.env.VITE_SPOTIFY_API_AUTH);
  const scope =
    "user-read-private user-read-email streaming app-remote-control user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read";
  const params = {
    response_type: "code",
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
  };

  authUrl.search = new URLSearchParams(params).toString();
  authStore.setCodeVerifier(codeVerifier);
  window.location.href = authUrl.toString();
};
</script>
