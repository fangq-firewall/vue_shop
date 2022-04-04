import Vue from 'vue'

import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

//全局挂在vue上
Vue.prototype.$message = Message