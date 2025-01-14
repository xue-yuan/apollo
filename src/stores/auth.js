import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useAlertStore } from "./alert";

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
    getCodeVerifier() {
      return window.localStorage.getItem("code_verifier");
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
    async getAccessToken(code) {
      const alertStore = useAlertStore();
      const router = useRouter();
      const codeVerifier = this.getCodeVerifier();
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

      await fetch(tokenUrl, payload)
        .then(async (response) => {
          if (response.ok) {
            return response.json();
          }
          throw { response, error: await response.json() };
        })
        .then((data) => {
          this.setToken(data.access_token, data.refresh_token);
          this.removeCodeVerifier();
          router.push("/");
        })
        .catch((error) => {
          alertStore.showSnackbar({ text: error, color: red });
          console.error("Error exchanging code for tokens", error);

          this.removeToken();
          router.push("/login");
        });
    },
    async refreshAccessToken() {
      const router = useRouter();
      const tokenUrl = import.meta.env.VITE_SPOTIFY_API_TOKEN;
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
          grant_type: "refresh_token",
          refresh_token: this.refreshToken,
        }),
      };

      await fetch(tokenUrl, payload)
        .then(async (response) => {
          if (response.ok) {
            return response.json();
          }
          throw { response, error: await response.json() };
        })
        .then((data) => {
          this.setToken(
            data.access_token,
            data.refresh_token ?? this.refreshToken,
          );
        })
        .catch((error) => {
          alertStore.showSnackbar({ text: error, color: red });
          console.error("Error refreshing access token", error);

          this.removeToken();
          router.push("/login");
        });
    },
  },
});
