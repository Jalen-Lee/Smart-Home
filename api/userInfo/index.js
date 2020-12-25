import http from '@/utils/request/index.js'

import store from '@/store/index.js'



/* 
 * @URI: http://api.tlink.io/api/user/getUserInfo 
 * @INFO: 获取用户信息
 */
export async function getUserInfo(){
	return http.request({
		method:'POST',
		url:'/api/user/getUserInfo',
		custom:{
			auth: true
		},
		data:{
			userId:store.state.userId
		},
	})
}