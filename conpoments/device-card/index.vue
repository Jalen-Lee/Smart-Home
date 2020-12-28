<template>
	<view class="device-card-wrapper">
		<view class="header">
			<text class="title">{{title}}</text>
			<view><!-- <u-loading mode="flower"></u-loading> --></view>
		</view>
		<view class="main">
			<text 
				class="sensor-icon iconfont"
				:class="sensorIcon"
			></text>
			<text class="sensor-name">{{sensorName}}</text>
			<text class="sensor-status">{{sensorStatus}}</text>
			<template v-if="sensor.sensorTypeId === 1">
				<u-number-box v-model="sensorValue" :min="35" :max="45"></u-number-box>
			</template>
			<template v-else-if="sensor.sensorTypeId === 2">
				<u-switch v-model="sensorValue"></u-switch>
			</template>
		</view>
		<view class="footer">
			{{sensorUpdateTime}}
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import uSlider from "uview-ui/components/u-slider/u-slider.vue";
	import uSwitch from "uview-ui/components/u-switch/u-switch.vue";
	import uNumberBox from 'uview-ui/components/u-number-box/u-number-box.vue'
	export default {
		name:"device-card",
		components:{uSlider,uSwitch,uNumberBox},
		data(){
			return {
				sensorValue: null
			}
		},
		computed:{
			title(){
				return this.sensor.sensorName.split('-')[0] 
			},
			sensorIcon(){
				const name = this.sensor.sensorName.split('-').pop()
				switch(name){
					case '空调':
						return 'icon-kongtiao'
					case '吊灯':
						return 'icon-jiazhuangdiaodengdengpaofaguangmingliangxianxing'
					case '窗帘':
						return 'icon-chuanglian'
					case '扫地机器人':
						return 'icon-saodijiqiren1'
					case '洗衣机': 
						return 'icon-xiyiji'
					case '电饭煲':
						return 'icon-dianfanbao'
					case '微波炉':
						return 'icon-czIcon-microwaveOven'
					case '空气净化器':
						return 'icon-kongqijinghuaqi'
					case '智能插座':
						return 'icon-wifizhinengchazuo'
					case '浴缸注水':
						return 'icon-weiyu'
					case '浴缸水温':
						return 'icon-shuiwen'
					case '可燃气体浓度':
						return 'icon-keranqiti'
					default:
						return 'icon-cpu'
				}
			},
			sensorName(){
				return this.sensor.sensorName.split('-').pop()
			},
			sensorStatus(){
				if(typeof this.sensorValue === "boolean")
					return this.sensorValue ? "开":"关"
				else{
					return this.sensorValue
				}
			},
			sensorUpdateTime(){
				return this.sensor.updateDate
			}
		},
		methods:{
			
		},
		props:{
			sensor:{
				type:Object,
			}
		},
		watch:{
			sensorValue(newVal,oldVal){
				if(newVal !== oldVal && oldVal !==null){
					// console.log("设置传感器值",newVal)
					const sensorDatas = []
					if(this.sensor.sensorTypeId === 2){
						sensorDatas.push({
						  sensorsId: this.sensor.id,
						  switcher: newVal?'1':'0'
						})
					}else{
						sensorDatas.push({
						  sensorsId: this.sensor.id,
						  value: newVal
						})
					}
					this.$store.dispatch('sendSensorData',sensorDatas).then(res=>{
						this.$refs.uToast.show({
							title: '数据上报成功',
							type: 'success',
							position:"top"
						})
					}).catch(err=>{
						this.$refs.uToast.show({
							title: '数据上报失败',
							type: 'error',
							position:"top"
						})
					})
				}
			}
		},
		mounted(){
			if(this.sensor.sensorTypeId === 1){
				this.sensorValue = this.sensor.value
			}else{
				this.sensorValue = Boolean(parseInt(this.sensor.switcher))
			}
		}
	}
</script>

<style lang="scss">
	.device-card-wrapper{
		width: calc((100vw - 60rpx) / 2 - 20rpx);
		height: 500rpx;
		display: flex;
		flex-direction: column;
		border-radius: 12rpx;
		background-color: #ffffff;
		margin-top: 20rpx;
		margin-right: 20rpx;
		padding: 16rpx;
		.header{
			width: 100%;
			height: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title{
				color: #c9ccd3;
				font-size: 24rpx;
			}
		}
		.main{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.sensor-icon{
				color: #407ee5;
				font-size: 120rpx;
			}
			.sensor-name{
				color: #142035;
				font-size: 36rpx;
				margin-top: 20rpx;
			}
			.sensor-status{
				color: #c9ccd3;
				font-size: 24rpx;
				margin-top: 20rpx;
				margin-bottom: 20rpx;
			}
		}
		.footer{
			width: 100%;
			height: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #c9ccd3;
			font-size: 24rpx;
		}
	}
</style>
