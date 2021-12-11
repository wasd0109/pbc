<template>
  <v-app>
    <Navigation />

    <v-main>
      <Nuxt />
    </v-main>

    <v-bottom-navigation app>
      <v-btn to="/" nuxt>
        Dashboard
        <v-icon>mdi-home</v-icon></v-btn
      >
      <!-- <v-btn to="/events" nuxt
        >Event List
        <v-icon>mdi-calendar</v-icon>
      </v-btn> -->
      <v-btn to="/regEvents" nuxt
        >Registered
        <v-icon>mdi-calendar-check</v-icon>
      </v-btn>
      <v-btn to="/search" nuxt
        >Search
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style>
a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>

<script>
import Navigation from '@/components/Navigation';
export default {
  // middleware: ['auth'],
  components: {
    Navigation
  }
};
</script>


