export default {
  token: localStorage.getItem('jwt_token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
}