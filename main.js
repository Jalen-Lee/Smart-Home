import Vue from 'vue'
import App from './App'
import http from '@/utils/request/index.js'
import store from '@/store/index.js'

Vue.config.productionTip = false
Vue.prototype.$http = http
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
