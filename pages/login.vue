<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <v-card v-if="$auth.$state.loggedIn" max-width="450" class="mx-auto">
          <v-alert type="error" :value="!!error">{{ error }}</v-alert>
          <v-card-text>
            Logged in as {{ $auth.$state.user.user_id }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="logout">Log Out</v-btn>
          </v-card-actions>
        </v-card>
        <v-card else max-width="450" class="mx-auto" outlined>
          <v-alert type="error" :value="!!error">{{ error }}</v-alert>
          <v-alert type="success" :value="!!success">{{ success }}</v-alert>
          <v-card-title class="justify-center pt-12 pb-6 font-weight-bold">
            Log In
          </v-card-title>
          <v-form @submit.prevent="userLogin">
            <v-card-text>
              <v-text-field
                v-model="email"
                label="Email Address"
                outlined
                prepend-icon="email"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                prepend-icon="mdi-eye-off"
              />
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" type="submit">userLogin</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {

  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      token: null,
      user_id: null,
      error: null,
      success: null
    };
  },
  methods: {
    setUser (id) {
      console.log(this);
      this.$store.commit('users/setUser', id);
    },
    async userLogin() {
      try {
        let res = await this.$auth.loginWith('local', { params: {email: "chivalry@gmail.com", password: "123456"}} )
        this.setUser(res.data.response.user_id);
        console.log(res)
        // this.$auth.$storage.setUniversal('user', res.data.response, true) // setting user in Vuex, cookies and localstorage
        await this.$auth.setUser(res.data.response)
        await this.$auth.$storage.setState('loggedIn', true)
        this.$router.push({ path: `/` });
      } catch (err) {
        console.log(err)
      }
    },
    async logout() {
      await this.$auth.logout('local',{params: {user_id: this.$store.state.currentUser.userId}}).catch(e => {
        this.success = null;
        this.error = e.response.data.error + "";
      });
    }
  }
};
</script>
