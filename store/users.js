export const state = () => ({
  user: null,
  isLoggedIn: process.server ? "" : !!localStorage.getItem("authTokenUser")
});

export const getters = {
  user(state) {
    if (!state.user) return;
    return state.user;
  },
  isLoggedIn(state) {
    if (!state.isLoggedIn) return;
    return state.isLoggedIn;
  }
};

export const mutations = {
  async setUser(state, user) {
    state.user = user;
  },
  async login(state) {
    let user_id = state.user.user_id;
    let res2 = await this.$axios.$get(`https://t2meet.bubbleapps.io/version-test/api/1.1/obj/user/${user_id}`);
    let user_final = {...res2.response, user_id};
    await this.$auth.$storage.setUniversal('user', user_final, true)
    await this.$auth.$storage.setState('loggedIn', true)
    state.isLoggedIn = true;
  },
  async logout(state) {
    window.localStorage.clear();
    this.$axios.setToken(false);
    state.isLoggedIn = false;
    this.$auth.$storage.setState('loggedIn', false)
    this.$auth.$storage.setUser(null)
    this.$auth.strategies.local.options.endpoints.user.headers['Authorization'] = null
  }
};
