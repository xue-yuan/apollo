import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: window.localStorage.getItem("access_token"),
    refreshToken: window.localStorage.getItem("refresh_token"),
    codeVerifier: window.localStorage.getItem("code_verifier"),
  }),
  actions: {
    loadCodeVerifier() {
      this.codeVerifier = window.localStorage.getItem("code_verifier");
    },
    setCodeVerifier(codeVerifier) {
      window.localStorage.setItem("code_verifier", codeVerifier);
    },
    removeCodeVerifier() {
      this.codeVerifier = null;
      window.localStorage.removeItem("code_verifier");
    },
    setToken(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      window.localStorage.setItem("access_token", accessToken);
      window.localStorage.setItem("refresh_token", refreshToken);
    },
    removeToken() {
      this.accessToken = null;
      this.refreshToken = null;
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
    },
    async refreshAccessToken() {
      try {
        const payload = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
            grant_type: "refresh_token",
            refresh_token: this.refreshToken,
          }),
        };
        const tokenUrl = import.meta.env.VITE_SPOTIFY_API_TOKEN;
        const body = await fetch(tokenUrl, payload);
        const response = await body.json();

        this.setToken(
          response.accessToken,
          response.refreshToken ?? this.refreshToken,
        );
      } catch (error) {
        // TODO: USE snackbar
        console.error("Error refreshing access token", error);

        this.removeToken();
        const router = useRouter();
        router.push("/");
      }
    },
  },
});
