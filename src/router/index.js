import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/home', component: Home },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next()
        //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr)
        return next('/login')
    next()

})


export default router