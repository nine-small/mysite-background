import {
  loginApi,
  // logout,
  getInfo
} from '@/api/user'
// import {
//   getToken,
//   setToken,
//   removeToken
// } from '@/utils/auth'
// import {
//   resetRouter
// } from '@/router'

const getDefaultState = () => {
  return {
    token: '',
    name: '徐丽',
    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F02%2F20160802001436_CtfiH.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639918437&t=4ed1f6ab3913aeafe3bcccfdac0f7451',
    user: null,
  }
}

const state = getDefaultState()

const mutations = {
  // RESET_STATE: (state) => {
  //   Object.assign(state, getDefaultState())
  // },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER: (state, payload) => {
    state.user = payload
  },

}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(resp => {
        const {
          data
        } = resp;
        if (data) {
          commit('SET_USER', data)
          resolve()
        } else {
          reject(resp)
        }
      }, err => {
        reject(err)
      })
    })
  },

  // get user info
  getInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', localStorage.getItem('TOKEN'))
      getInfo().then(response => {
        const {
          data
        } = response
        if (!data) {
          reject(JSON.parse(response).msg)
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // logout({
  //   commit,
  //   state
  // }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       removeToken() // must remove  token  first
  //       resetRouter()
  //       commit('RESET_STATE')
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  // resetToken({
  //   commit
  // }) {
  //   return new Promise(resolve => {
  //     removeToken() // must remove  token  first
  //     commit('RESET_STATE')
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
