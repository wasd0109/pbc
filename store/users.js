export const state = () => ({
  currentUser: {
    userId: null
  }
})

export const mutations = {
  setUser(state, id) {
    state.currentUser.userId = id
  }
}



