import http from '@/utils/request/index.js'
import store from '@/store/index.js'


/* 
 * @URI: http://api.tlink.io/oauth/token?grant_type=password&username=账号&password=密码
 * @INFO: 获取accessToken
 */
export async function getAccessToken(){
	return http.request({
		method: 'POST', 
		url: '/oauth/token',
		header:{
			Authorization:"Basic MTVkNWNjMjAzMzk2NDk1ZTgwNTZhYjE3NDczNDA4NjE6YmFmYzBjMGY3ODdhNGUzNTllYzA5NzlmNDQyNmMyMjE="
		},
		params: { 
		  grant_type: 'password',
		  username:"13724932914",
		  password:"abc15817815573"
		},
	})
}


/* 
 * @URI: http://api.tlink.io/oauth/token?grant_type=refresh_token&refresh_token=b8afe27a***5d1c9&client_id=20***80&client_secret=6f6***faf
 * @INFO: 刷新accessToken
 */
export async function refreshAccessToken(){
	return http.request({
		method:'POST',
		url: '/oauth/token',
		params: {
		  grant_type: 'refresh_token',
		  refresh_token: store.state.refresh_token,
		  client_id: store.state.clientId,
		  client_secret: store.state.clientSecret
		},
	})
}



