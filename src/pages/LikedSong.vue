<template>
  <v-row justify="center">
    <v-col lg="8">
      <v-card class="mx-auto mt-6" variant="flat">
        <v-card-item class="mt-4">
          <v-hover v-for="(trackObj, index) in likedSong" :key="index">
            <template v-slot:default="{ isHovering, props }">
              <v-card class="my-3 elevation-2 mx-6" rounded="xl">
                <v-card-item
                  v-bind="props"
                  class="py-5"
                  :title="trackObj.track.name"
                  :subtitle="
                    trackObj.track.artists
                      .map((artist) => artist.name)
                      .join(', ')
                  "
                  :value="trackObj"
                >
                  <template v-slot:prepend>
                    <div
                      class="mx-4 text-overline font-weight-bold text-right"
                      style="font-size: large !important"
                    >
                      {{ index + 1 }}
                    </div>
                    <v-spacer />
                    <v-img
                      class="rounded-lg mx-3"
                      width="64"
                      :src="trackObj.track.album.images[0].url"
                    ></v-img>
                  </template>
                </v-card-item>
              </v-card>
            </template>
          </v-hover>
          <!-- <v-card v-show="isSearching">
            <v-card-item class="py-5">
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  :size="50"
                  color="indigo"
                  indeterminate
                ></v-progress-circular>
              </div>
            </v-card-item>
          </v-card> -->
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
let likedSong = ref([]);

onMounted(async () => {
  const url = "https://api.spotify.com/v1/me/tracks";
  const payload = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
  };
  fetch(url, payload)
    .then(async (body) => {
      if (body.status == 200) {
        return body.json();
      } else if (body.status == 401) {
        await authStore.refreshAccessToken();
        fetch(url, payload)
          .then((body) => body.json())
          .then((data) => {
            likedSong = data.items;
          });
      }
    })
    .then((data) => {
      likedSong = data.items;
      console.log(likedSong);
    });
});
</script>
