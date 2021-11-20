export default {
  setUserIdentity (state, { token, user }) {
    state.token = token
    state.user = user
  }
}