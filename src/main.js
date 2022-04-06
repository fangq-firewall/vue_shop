import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './plugins/element.js'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

//导入全局样式表
import './assets/css/global.css'

//导入字体图标
import './assets/fonts/iconfont.css'

axios.interceptors.request.use(config => {
    // console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config

})
Vue.prototype.$http = axios
    //发起请求前配置请求头，添加token
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')