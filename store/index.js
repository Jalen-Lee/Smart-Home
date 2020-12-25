import Vue from 'vue'
import Vuex from 'vuex'
import livingRoom from './modules/living-room.js'
import kitchen from './modules/kitchen.js'
import bathRoom from './modules/bath-room.js'
Vue.use(Vuex)

const state = {
	userId: 200028164,//账号ID
	deviceId: '200063478',//设备ID
	deviceNo: 'M98V35PL6YW66I33',//设备序列号
	access_token: '',
	token_type: '',
	refresh_token: '',
	expires_in: '',
	clientId:'',
	clientSecret:'',
	userInfo: {
		/*
		msg: ""
		flag: "00"
		clientId: "15d5cc203396495e8056ab1747340861"
		address: "电子科技大学中山学院厚德楼B栋703"
		contactName: "李小龙"
		mobile: "13724932914"
		amt: null
		clientSecret: "bafc0c0f787a4e359ec0979f4426c221"
		userName: "13724932914"
		userId: 200028164
		email: ""
		*/
	},//用户个人信息
}

const getters = {
	
}

const mutations = {
	SET_ACCOUNT_INFO(state,payload){
		const {access_token,token_type,refresh_token,expires_in,clientId,clientSecret} = payload
		state.access_token = access_token
		state.token_type = token_type
		state.refresh_token = refresh_token
		state.expires_in = expires_in
		state.clientId = clientId
		state.clientSecret = clientSecret
		console.log("accountInfo已存入",state)
	},
	SET_USER_INFO(state,payload){
		state.userInfo = payload
	}
}

const actions = {
	
}


const store = new Vuex.Store({
  modules: {
	livingRoom,kitchen,bathRoom
  },
  state,
  mutations,
  actions,
  getters
})

export default store