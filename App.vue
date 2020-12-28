<script>
	import loadFont from '@/utils/loadFont/index.js'
	export default {
		data:{
			//轮询定时器ID
			intervalID: '',
		},
		methods:{
			init(){
				
			}
		},
		onLaunch: function() {
			//加载字体
			loadFont()
			this.$store.dispatch('login').then(res=>{
				console.log("登录成功")
			})
		},
		onShow: function() {
			console.log("page show")
			// this.$store.commit('SET_POLLING',true)
		},
		onHide: function() {
			console.log("page hide")
			// this.$store.commit('SET_POLLING',false)
		},
		watch:{
			'$store.state.hasPolling':{
			  handler: function(newVal){
				  if(this.$store.state.hasPolling){
					  console.log("开始轮询")
					  this.intervalID = setInterval(()=>{
					  	console.log("轮询发生")
					  	this.$store.dispatch('getDeviceData')
					  },5000)
				  }else{
					  console.log("停止轮询")
					  clearInterval(this.intervalID)
				  }
			  },
			  immediate: true
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import './style/normalize.scss';
	@import './static/iconfont/iconfont';
	page{
		height: 100%;
		overflow: scroll;
	}
</style>
