import http from '@/utils/request/index.js'
import store from '@/store/index.js'

/* 
 * @URI: http://api.tlink.io/api/device/getSingleDeviceDatas
 * @INFO: 获取单个设备的传感器数据
 */
export async function getSingleDeviceDatas(){
	return http.request({
		method: 'POST',
		url: '/api/device/getSingleDeviceDatas',
		data: {
			"userId": store.state.userId,//用户Id必传参数
			"deviceNo": store.state.deviceNo,//设备序列号 设备Id序列号二选一
			"currPage": 1,  //当前页 必选参数
			"pageSize": 20 //每页返回的记录数，必选擦数，最多不能超过1000
		},
		custom:{
			auth: true
		}
	})
}

/* 
 * @URI: http://api.tlink.io/api/device/switcherController
 * @INFO: 单个开关型传感器数据下行
 * @param: sensorId传感器id，switcher开关值
 */
export async function switcherController(sensorId,switcher){
	return http.request({
		method:'POST',
		url:'/api/device/switcherController',
		data:{
		  userId: store.state.userId,//用户Id 必选
		  deviceNo: store.state.deviceNo,//设备序列号，必选
		  sensorId,//对应的传感器Id 必选
		  switcher,//发送的开关值。0表示关 1表示开
		},
		custom:{
			auth:true
		}
	})
}

/* 
 * @URI: http://api.tlink.io/api/device/deviceWrite
 * @INFO: 单个数值型传感器数据下行
 * @param: sensorId传感器id，value传感器值
 */
export async function deviceWrite(sensorId,value){
	return http.request({
		method:'POST',
		url:'/api/device/deviceWrite',
		data:{
		  userId: store.state.userId,//用户Id 必选参数
		  deviceNo: store.state.deviceNo,//设备序列号 必选参数
		  sensorId, //对应的传感器Id 必选
		  value,//发送的数据 必选
		},
		custom:{
			auth:true
		}
	})
}

/* 
 * @URI: http://api.tlink.io/api/device/getSensorHistroy
 * @INFO: 获取设备传感器历史数据
 * @param: sensorId传感器id，config查询参数
 */
export async function getSensorHistroy(sensorId,config){
	return http.request({
		method:'POST',
		url:'/api/device/getSensorHistroy',
		data:{
			userId: store.state.userId,  //用户Id
			sensorId, //传感器Id
			startDate: config.startDate, //开始时间
			endDate: config.endDate || Date.now(), //结束时间
			pagingState:"",//下一页参数 为空表示首页
			pageSize: config.pageSize || 100 //返回的数据条数
		},
		custom:{
			auth:true
		}
	})
}