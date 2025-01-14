<template>
  <v-row justify="center">
    <v-col>
      <v-card class="mx-auto" variant="plain" ref="scrollContainer">
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
          <v-list-item class="py-5" v-show="isLoading">
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                :size="50"
                color="indigo"
                indeterminate
              ></v-progress-circular>
            </div>
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
const scrollContainer = ref(null);
let likedSong = ref([]);
let totalLiked = ref(0);
let nextPageUrl = ref("");
let isLoading = ref(true);

onMounted(async () => {
  const url = "https://api.spotify.com/v1/me/tracks?limit=50";
  fetchLikedSong(url, false);
  document.addEventListener("scroll", loadNextPage);
});

function loadNextPage() {
  if (
    nextPageUrl.value &&
    !isLoading.value &&
    window.scrollY + window.innerHeight >
      scrollContainer.value.$el.scrollHeight * 0.9
  ) {
    fetchLikedSong(nextPageUrl.value, true);
  }
}

function fetchLikedSong(url, isAppend) {
  isLoading.value = true;

  const payload = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  };

  fetchWithRefresh(url, payload)
    .then((data) => {
      if (isAppend) {
        likedSong.value.push(...(data?.items ?? []));
      } else {
        likedSong.value = data.items;
      }
      totalLiked.value = data.total;
      nextPageUrl.value = data.next;
      alertStore.showSnackbar({ text: "Liked", color: "green" });
    })
    .catch((error) => {
      alertStore.showSnackbar({ text: error, color: "red" });
      console.error(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

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
