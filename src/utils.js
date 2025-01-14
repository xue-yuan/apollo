import { AccessTokenExpired } from "./errors";
import { useAuthStore } from "./stores/auth";

export const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));

  return values.reduce((acc, x) => acc + possible[x % possible.length]);
};

export const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return crypto.subtle.digest("SHA-256", data);
};

export const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const fetchWithRefresh = async (url, payload) => {
  const authStore = useAuthStore();

  return fetch(url, payload)
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status == 401) {
        throw new AccessTokenExpired();
      }

      throw new Error("request error");
    })
    .catch(async (error) => {
      if (error instanceof AccessTokenExpired) {
        await authStore.refreshAccessToken();
        const body = await fetch(url, payload)
          .then((retryResponse) => retryResponse.json())
          .catch((error) => {
            throw error;
          });

        return body;
      }

      throw error;
    });
};
