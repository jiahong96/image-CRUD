import AuthService from '@/api/AuthService'

export default {
  login ({commit}, {email, password}) {
    return new Promise ((resolve, reject) => {
      AuthService.login({username: email, password})
        .then((response) => {
          console.log(response.data)
          const token = response.data.jwt_token
          const user = response.data.data

          localStorage.setItem('jwt_token', token)
          localStorage.setItem('user', JSON.stringify(user))
          commit('setUserIdentity', {token, user})
          resolve(response)
        })
        .catch ((error) => {          
          reject(error)
        })
    })  
    
  }
}