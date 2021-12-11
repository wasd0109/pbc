<template>
  <div>
    <v-toolbar dark class=" dp-sp-none">
      <v-toolbar-title class="headline text-uppercase md-5">
        <nuxt-link to="/" class="container-logo font-weight-bold black--text">
          <v-app-bar-title>T2Meet</v-app-bar-title>
          <h1 style="display:none">
            T2Meet - Events for Tokyo Tech Students
          </h1>
        </nuxt-link>

      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="teal--text text-capitalize mr-3"
        @click.stop="logout()"
        exact
        >logout</v-btn
      >
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      error: null,
      success: null
    };
  },
  methods: {
    linkTo(address) {
      this.$router.push({ path: `/${address}` });
    },
    async logout() {
      console.log("abc");
      console.log("auth user")
      console.log(this.$auth.$state.user);

      if(this.$auth.$state.user) {
        await this.$auth.logout('local',{params: {user_id: this.$auth.$state.user.user_id}}).catch(e => {
        console.log(e);
        });
      }
      this.$router.push({path: '/login'});
    }
  }
};
</script>
