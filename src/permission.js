import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist
// 路由守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  if (to.meta.auth) {
    // 需要鉴权
    // 有用户信息
    if (store.getters.user) {
      next()
    } else {
      // 没有用户信息
      const token = localStorage.getItem('TOKEN')
      if (token) {
        // 有token,那么就验证这个token是否正确
        store.dispatch('user/getInfo').then((data) => {
          store.commit('user/SET_USER',data)
          next()
        }).catch((resp) => {
          Message.warning(resp)
          next(`/login?redirect=${to.path}`)
        })
      } else {
        // 没有token
        next(`/login?redirect=${to.path}`)
      }
    }
    // 不需要鉴权
  } else {
    if (to.path === '/login') {
      if (store.getters.user) {
        // 已经登录，跳转到主页
        next('/')
      } else {
        // 没有登录，放行
        next()
      }

    } else {
      // 直接放行
      next()
    }
  }
  NProgress.done()
  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

// router.afterEach(() => {
// finish progress bar
// NProgress.done()
// })
