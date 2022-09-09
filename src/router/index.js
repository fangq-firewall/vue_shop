import Vue from 'vue'
import Router from 'vue-router'

//import Login from '../components/Login'
//import Home from '../components/Home'
//import Welcome from '../components/Welcome'
const Kaggle = () => import('../views/kaggle')
const Login = () => import('../components/Login')
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Home')
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Welcome')

//import User from '../components/users/User'
//import Rights from '../components/power/rights'
//import Roles from '../components/power/roles'
const User = () => import(/* webpackChunkName:"user_rights_roles" */ '../components/users/User')
const Rights = () => import(/* webpackChunkName:"user_rights_roles" */ '../components/power/rights')
const Roles = () => import(/* webpackChunkName:"user_rights_roles" */ '../components/power/roles')

//import Cate from '../components/goods/Cate'
//import Params from '../components/goods/Params'
const Cate = () => import(/* webpackChunkName:"cate_params" */ '../components/goods/Cate')
const Params = () => import(/* webpackChunkName:"cate_params" */ '../components/goods/Params')
//import List from '../components/goods/List'
//import Add from '../components/goods/Add'
const List = () => import(/* webpackChunkName:"list_add" */ '../components/goods/List')
const Add = () => import(/* webpackChunkName:"list_add" */ '../components/goods/Add')
//import Order from '../components/order/Order'
//import Report from '../components/report/Report'
const Order = () => import(/* webpackChunkName:"order_report" */ '../components/order/Order')
const Report = () => import(/* webpackChunkName:"order_report" */ '../components/report/Report')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/kaggle' },
    { path: '/kaggle', component: Kaggle },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: User },
        { path: '/categories', component: Cate },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/params', component: Params },
        { path: '/goods', component: List },
        { path: '/goods/add', component: Add },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.path == '/kaggle' || 'login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/kaggle')
  }
  next()
})

export default router
