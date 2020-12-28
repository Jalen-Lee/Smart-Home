import Vue from 'vue'
import Vuex from 'vuex'
import livingRoom from './modules/living-room.js'
import kitchen from './modules/kitchen.js'
import bathRoom from './modules/bath-room.js'
import {getAccessToken,refreshAccessToken} from '@/api/accessToken/index.js'
import {getSingleDeviceDatas,sendDataPoint,deviceWrite} from '@/api/device/index.js'
Vue.use(Vuex)

const state = {
	//用户ID
	userId: 200028164,
	//设备ID
	deviceId: '200063478',
	//设备序列号
	deviceNo: 'UOWJ1448J2CDVZ2W',
	//账号token
	access_token: '',
	//token类型
	token_type: '',
	//用于重置账号token的token
	refresh_token: '',
	//token有效期
	expires_in: '',
	//账号clientID
	clientId:'',
	//账号clientSecret
	clientSecret:'',
	//用户个人信息
	userInfo: {},
	//在线设备数
	totalSensors: 0,
	//普通传感器数据
	commonData: [],
	//客厅传感器数据
	livingRoomData: [],
	//卧室传感器数据
	bedroomData: [],
	//厨房传感器数据
	kitchenData: [],
	//书房传感器数据
	bookroomData: [],
	//浴室传感器数据
	bathroomData:[],
	//是否开启轮询
	hasPolling: false,
	//轮询间隔时间，单位ms
	pollingDelay: 5000,
}

const getters = {
	
}

const mutations = {
	//统一设置账号信息
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
	//设置用户信息
	SET_USER_INFO(state,payload){
		state.userInfo = payload
	},
	//设置在线设备数
	SET_TOTAL_SENSOR(state,payload){
		state.totalSensors = payload
	},
	//设置普通传感器数据
	SET_COMMON_DATA(state,payload){
		state.commonData = payload
	},
	//设置客厅传感器数据
	SET_LIVINGROOM_DATA(state,payload){
		state.livingRoomData = payload
	},
	//设置厨房传感器数据
	SET_KITCHEN_DATA(state,payload){
		state.kitchenData = payload
	},
	//设置卧室传感器数据
	SET_BEDROOM_DATA(state,payload){
		state.bedroomData = payload
	},
	//设置浴室传感器数据
	SET_BATHROOM_DATA(state,payload){
		state.bathroomData = payload
	},
	//设置书房传感器数据
	SET_BOOKROOM_DATA(state,payload){
		state.bookroomData = payload
	},
	//设置是否开启轮询
	SET_POLLING(state,payload){
		state.hasPolling = payload
	}
}

const actions = {
	//登录
	login({commit,state,dispatch}){
		return new Promise((resolve,reject)=>{
			getAccessToken().then(res=>{
				commit('SET_ACCOUNT_INFO',res)
				dispatch('getDeviceData').then(res=>{
					resolve(state)
				}).catch(err=>{
					reject(err)
				})
			}).catch(err=>{
				reject(err)
			})
		})
	},
	//获取设备的所有传感器数据
	getDeviceData({commit,state}){
		return new Promise((resolve,reject)=>{
			getSingleDeviceDatas()
			.then(res=>{
				let commonData = [],livingRoomData = [],bedroomData = [],kitchenData = [],bookroomData = [],bathroomData = []
				const sensorsList = res.device.sensorsList
				sensorsList.forEach(i=>{
					if(i.sensorName.includes("客厅"))
						livingRoomData.push(i)
					else if(i.sensorName.includes("卧室"))
						bedroomData.push(i)
					else if(i.sensorName.includes("书房"))
						bookroomData.push(i)
					else if(i.sensorName.includes("卫浴"))
						bathroomData.push(i)
					else if(i.sensorName.includes("厨房"))
						kitchenData.push(i)
					else
						commonData.push(i)
				})
				commit('SET_TOTAL_SENSOR',sensorsList.length)
				commit('SET_COMMON_DATA',commonData)
				commit('SET_LIVINGROOM_DATA',livingRoomData)
				commit('SET_KITCHEN_DATA',kitchenData)
				commit('SET_BEDROOM_DATA',bedroomData)
				commit('SET_BATHROOM_DATA',bathroomData)
				commit('SET_BOOKROOM_DATA',bookroomData)
				console.log("传感器数据获取成功")
				resolve(state)
			}).catch(err=>{
				console.log("传感器数据获取失败")
				reject(err)
			})
		})
	},
	//数据上报至控制中心和下发至设备
	sendSensorData({commit,state,dispatch},payload){
		return new Promise((resolve,reject)=>{
			const data = payload[0]
			let sensorId = data.sensorsId, value = ''
			if(data.hasOwnProperty('switcher')){
				value = `{"sensorId":${sensorId},"switch":${data.switcher}}`
			}else{
				value = data.value
			}
			//既进行数据上报至控制中心，又将传感器数据下发至设备
			const httpList = [sendDataPoint(payload),deviceWrite(sensorId,value)]
			Promise.all(httpList).then(res=>{
				console.log("传感器数据上报成功")
				resolve(state)
			}).catch(err=>{
				console.log("传感器数据上报失败")
				reject(err)
			})
		})
	}
	
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