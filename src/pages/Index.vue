<template>
  <v-layout>
    <v-main>
      <v-navigation-drawer permanent floating color="#13192B">
        <v-list density="compact" nav>
          <v-list-item
            color="#fff"
            prepend-icon="mdi-home"
            title="Home"
            value="home"
            @click="setComponent(Home)"
          >
          </v-list-item>
          <v-list-item
            color="#fff"
            prepend-icon="mdi-heart"
            title="Liked Song"
            value="liked-song"
            @click="setComponent(LikedSong)"
          >
          </v-list-item>
          <v-list-item
            color="#fff"
            prepend-icon="mdi-album"
            title="Album"
            value="album"
            @click="setComponent(Album)"
          >
          </v-list-item>
          <v-list-item
            color="#fff"
            prepend-icon="mdi-bookmark"
            title="Playlist"
            value="playlist"
            @click="setComponent(Playlist)"
          >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <div>
        <component :is="currentComponent"></component>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import Album from "@/components/Album.vue";
import Home from "@/components/Home.vue";
import LikedSong from "@/components/LikedSong.vue";
import Playlist from "@/components/Playlist.vue";
import { ref } from "vue";

// TODO: ref -> shallowRef or markRaw if they are not reactive

const currentComponent = ref(Home);

const setComponent = (componentName) => {
  currentComponent.value = componentName;
};
</script>
