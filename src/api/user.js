import request from '@/utils/request'
import store from '@/store'
import router from '@/router'

export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

export function logout() {
  store.commit('user/SET_USER',null);
  store.commit('user/SET_TOKEN','');
  localStorage.removeItem("TOKEN")
  router.push('/login')
}
