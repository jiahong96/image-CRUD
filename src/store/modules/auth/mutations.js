export default {
  setUserIdentity (state, { token, user }) {
    state.token = token
    state.user = user
  },
  logout (state) {
    state.token = null
    state.user = null
  }
}