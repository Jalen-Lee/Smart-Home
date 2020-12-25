import request from '@/node_modules/luch-request/src/lib/luch-request.js'
import store from '@/store/index.js'

const http = new request()

/* 
 * 修改全局配置
 * config 为默认全局
 */ 
http.setConfig((config) => { 
    config.baseURL = 'http://api.tlink.io/'
    return config
})




/*请求拦截器*/
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  //如果该请求需要携带token
  if (config.custom.auth) {
	config.header = {
		...config.header,
		Authorization: 'Bearer ' + store.state.access_token,
		tlinkAppId: store.state.clientId
	}
  }

 
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})

/*响应拦截器*/
http.interceptors.response.use((response) => { 
	
  console.log("响应",response)
  return response.data
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(response)
  return Promise.reject(response)
})




export default http