<script>
	import {getAccessToken,refreshAccessToken} from '@/api/accessToken/index.js'
	import {getUserInfo} from '@/api/userInfo/index.js'
	import {getSingleDeviceDatas} from '@/api/device/index.js'
	export default {
		globalData: {  

		},
		onLaunch: function() {
			// uni.getStorage({
			// 	key: 'ACCOUNT_INFO',
			// 	success: (res)=>{
			// 		console.log("storage中有accountInfo",JSON.parse(res.data));
			// 		this.$store.commit('SET_ACCOUNT_INFO',JSON.parse(res.data))
			// 		getUserInfo().then(res=>{
			// 			console.log("获取用户信息",res)
			// 			this.$store.commit('SET_USER_INFO',res)
			// 		}).catch(err=>{})
					
			// 		getSingleDeviceDatas().then(res=>{
			// 			console.log("获取单个设备信息",res)
			// 		})
			// 	},
			// 	fail: ()=>{
			// 		console.log("storage中没有accountInfo");
			// 		getAccessToken().then(res=>{
			// 			uni.setStorage({
			// 			    key: 'ACCOUNT_INFO',
			// 			    data: JSON.stringify(res),
			// 			});
			// 			this.$store.commit('SET_ACCOUNT_INFO',res)
			// 		}).catch(err=>{})
			// 	}
			// });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		height: 100%;
	}
</style>
