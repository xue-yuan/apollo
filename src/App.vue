<template>
  <v-layout>
    <!-- <v-app-bar color="#673AB7" elevation="2" scroll-behavior="elevate">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          elevation="0"
        ></v-app-bar-nav-icon>
      </template>
      <template v-slot:append>
        <v-btn
          :icon="darkMode ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
          @click="toggleTheme"
          elevation="0"
        ></v-btn>
        <v-btn icon="mdi-dots-vertical" elevation="0"></v-btn>
      </template>
      <v-app-bar-title>Apollo</v-app-bar-title>
    </v-app-bar> -->
    <!-- <v-navigation-drawer v-model="drawer" temporary>
      <v-list density="compact" nav>
        <router-link to="/test">
          <v-list-item
            prepend-icon="mdi-instagram"
            title="Instapost"
            value="instapost"
          >
          </v-list-item
        ></router-link>
        <router-link to="/">
          <v-list-item
            prepend-icon="mdi-spotify"
            title="Spotify"
            value="spotify"
          >
          </v-list-item
        ></router-link>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <Sidebar></Sidebar> -->

    <v-navigation-drawer permanent floating color="#13192B">
      <v-list density="compact" nav>
        <v-list-item
          color="#fff"
          prepend-icon="mdi-home"
          title="Home"
          value="home"
          @click="() => jump('/home')"
        >
        </v-list-item>
        <v-list-item
          color="#fff"
          prepend-icon="mdi-heart"
          title="Liked Song"
          value="liked-song"
          @click="() => jump('/liked-song')"
        >
        </v-list-item>
        <v-list-item
          color="#fff"
          prepend-icon="mdi-bookmark"
          title="Playlist"
          value="playlist"
          @click="() => jump('/test')"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-layout color="#181E30">
        <router-view></router-view>
      </v-layout>
      <!-- <Snackbar
        :text="snackbar.text"
        :color="snackbar.color"
        :show="snackbar.show"
        :timeout="3000"
      /> -->
    </v-main>
  </v-layout>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// import { ref } from "vue";
// import { useTheme } from "vuetify";

// const theme = useTheme();

// let darkMode = ref(theme.global.name.value === "light" ? false : true);
// let drawer = ref(false);

// const updateTheme = (updatedTheme) => {
//   theme.global.name.value = updatedTheme;
//   darkMode.value = theme.global.name.value === "dark" ? true : false;
// };

// const toggleTheme = () => {
//   darkMode.value = !darkMode.value;
//   theme.global.name.value = darkMode.value ? "dark" : "light";
// };

const jump = (page) => {
  router.push(page);
};
</script>

<style>
.no-active-style {
  color: inherit;
  background: none;
}
</style>
