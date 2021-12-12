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
                prepend-icon="mdi-email-outline"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                prepend-icon="mdi-lock"
              />
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" type="submit">User Login</v-btn>
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
  layout: "loginLayout",
  data() {
    return {
      email: "",
      password: "",
      token: null,
      user_id: null,
      error: null,
      success: null,
    };
  },
  methods: {
    // setUser (user) {
    //   console.log(this);
    //   this.$store.commit('users/setUser', user);
    // },
    async userLogin() {
      try {
        let res = await this.$auth.loginWith("local", {
          params: { email: "chivalry@gmail.com", password: "123456" },
        });
        console.log(res);
        let user = res.data.response;
        let user_id = user.user_id;
        let token = user.token;
        // let expires = user.expires;

        let res2 = await this.$axios.$get(`https://t2meet.bubbleapps.io/version-test/api/1.1/obj/user/${user_id}`);
        let user_details = res2.response;
        console.log("details",user_details);
        let user_final = {...user_details, user_id}
        console.log(user_final)

        await this.$auth.$storage.setUniversal('user', user_final)

        // console.log("user layout");
        // console.log(this.$auth.$storage.user);
        await this.$auth.$storage.setUniversal('loggedIn', true)
        // console.log("token",this.$auth.$state.user)
        if(this.$auth.$state.user.Tags && this.$auth.$state.user.Tags.length === 0) {
          console.log("here here")
          this.$router.push({ path: `/tags` });
        } else {
          this.$router.push({ path: `/` });
        }

      } catch (err) {
        console.log(err);
      }
    },
    async logout() {
      await this.$auth.logout('local',{params: {user_id: this.$auth.$state.user.userId}})
      .then(res => {
        this.$auth.$storage.setUniversal('loggedIn', false)
        this.$auth.$storage.setUniversal('user',false)
        // this.$auth.$storage.setUser(null)
        // this.$auth.strategies.local.options.endpoints.user.headers['Authorization'] = null
      }).catch(e => {
        this.error = e.response.data.error + "";
      });
    }
  }
};
</script>
