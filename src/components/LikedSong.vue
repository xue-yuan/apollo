<template>
  <v-row justify="center">
    <v-col>
      <v-card class="mx-auto">
        <v-list class="list" lines="two">
          <v-list-item
            v-for="(trackObj, index) in likedSong"
            :key="index"
            :value="index"
            color="primary"
          >
            <template v-slot:prepend>
              <div class="font-weight-bold">
                {{
                  (index + 1)
                    .toString()
                    .padStart(totalLiked.toString().length, " ")
                }}
              </div>
              <v-spacer />
              <v-img
                class="rounded-lg mx-3"
                width="48"
                :src="trackObj.track.album.images[0].url"
              ></v-img>
            </template>

            <template v-slot:append>
              <div class="font-weight-bold mx-auto">
                {{ durationMSToMMSS(trackObj.track.duration_ms) }}
              </div>
            </template>
            <v-list-item-title v-text="trackObj.track.name"></v-list-item-title>
            <v-list-item-subtitle
              v-text="
                trackObj.track.artists.map((artist) => artist.name).join(', ')
              "
            ></v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useAlertStore } from "@/stores/alert";
import { useAuthStore } from "@/stores/auth";
import { fetchWithRefresh } from "@/utils";
import { onMounted, ref } from "vue";

const alertStore = useAlertStore();
const authStore = useAuthStore();
let likedSong = ref([]);
let totalLiked = ref(0);

onMounted(async () => {
  await authStore.refreshAccessToken();
  const url = "https://api.spotify.com/v1/me/tracks";
  const payload = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  };
  fetchWithRefresh(url, payload)
    .then((data) => {
      likedSong.value = data.items;
      totalLiked.value = data.total;
      alertStore.showSnackbar({ text: "Liked", color: "green" });
    })
    .catch((error) => {
      alertStore.showSnackbar({ text: error, color: "red" });
      console.error(error);
    });
});

function durationMSToMMSS(durationMs) {
  const totalSeconds = Math.floor(durationMs / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
</script>

<style>
.list {
  font-family: monospace;
  white-space: pre;
}
</style>
