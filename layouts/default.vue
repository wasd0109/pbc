<template>
  <v-app>
    <Navigation />

    <v-main>
      <Nuxt />
    </v-main>
    <v-footer app>
      <v-bottom-navigation>
        <v-btn to="/" nuxt>
          Dashboard
          <v-icon>mdi-home</v-icon></v-btn
        >
        <v-btn to="/regEvents" nuxt
          >Registered
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
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


