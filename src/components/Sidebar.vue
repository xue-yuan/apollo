<template>
  <v-navigation-drawer permanent floating color="#13192B">
    <v-list density="compact" nav>
      <v-list-item
        color="#fff"
        prepend-icon="mdi-home"
        title="Home"
        value="home"
      >
      </v-list-item>
      <v-list-item
        color="#fff"
        prepend-icon="mdi-heart"
        title="Liked Song"
        value="liked-song"
      >
      </v-list-item>
      <v-list-item
        color="#fff"
        prepend-icon="mdi-bookmark"
        title="Playlist"
        value="playlist"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
