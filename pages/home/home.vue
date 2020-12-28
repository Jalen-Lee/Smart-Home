<template>
	<view class="home-wrapper">
		<u-navbar 
			:is-back="false"
			:background="navbarBackground"
			>
				<view class="navbar-content">
					<view class="navbar-content-title">吾家</view>
					<view></view>
				</view>
		</u-navbar>
		<view class="home-wrapper-content">
			<view class="content-header">
				<view class="content-header-left">
					<view class="tips">Hi，主人！</view>
					<view class="config-info">
						<view class="config-info-item">
							<text class="value">{{totalActiveSensor}}</text>
							<text class="label">在线设备</text>
						</view>
						<view class="config-info-item">
							<text class="value">{{indoorTemperture}}</text>
							<text class="label">室内温度</text>
						</view>
						<view class="config-info-item">
							<text class="value">{{indoorHumidity}}</text>
							<text class="label">空气湿度</text>
						</view>
						<view class="config-info-item">
							<text class="value">{{indoorAQI}}</text>
							<text class="label">空气指数</text>
						</view>
					</view>
				</view>
				<view class="content-header-right">
<!-- 					<u-circle-progress
						width="200"
						bg-color="transparent"
						border-width = "16"
						active-color="#3d7ff5" 
						duration="0"
						:percent="80">
						<view class="progress-content">
							<view class="grade">优良</view>
							<view class='label'>家居指数</view>
						</view>
					</u-circle-progress> -->
				</view>
			</view>
			<view class="content-main">
				<u-section title="场景" sub-title="查看更多"></u-section>
				<view class="place-picker-container">
					<place-picker @pick="handlePlacePick"></place-picker>
				</view>
				<u-section title="设备" sub-title="查看更多"></u-section>
				<view class="sensor-list-container">
					<device-card 
						v-for="item in currentSensorList"  
						:key="item.id"
						:sensor="item"
					></device-card>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import placePicker from '@/conpoments/place-picker/index.vue'
	import deviceCard from '@/conpoments/device-card/index.vue'
	import uCircleProgress from 'uview-ui/components/u-circle-progress/u-circle-progress.vue'
	export default {
		components:{placePicker,deviceCard,uCircleProgress},
		data() {
			return {
				pickedPlaceId: 'p1',
				//顶部导航栏样式
				navbarBackground:{
					backgroundColor:'#fbfbfb'
				}
			};
		},
		computed:{
			//当前场景显示的传感器数据
			currentSensorList(){
				switch(this.pickedPlaceId){
					case 'p1':
						return this.$store.state.livingRoomData
					case 'p2':
						return this.$store.state.bedroomData
					case 'p3':
						return this.$store.state.bookroomData
					case 'p4':
						return this.$store.state.bathroomData
					case 'p5':
						return this.$store.state.kitchenData
				}
			},
			totalActiveSensor(){
				return this.$store.state.totalSensors
			},
			//室内温度
			indoorTemperture(){
				if(this.$store.state.commonData.length){
					const sensor = this.$store.state.commonData.find(i=>{
						return i.sensorName.includes("温度")
					})
					return sensor.value + sensor.unit
				}
			},
			//室内湿度
			indoorHumidity(){
				if(this.$store.state.commonData.length){
					const sensor = this.$store.state.commonData.find(i=>{
						return i.sensorName.includes("湿度")
					})
					return sensor.value + sensor.unit
				}
			},
			//室内空气指数
			indoorAQI(){
				if(this.$store.state.commonData.length){
					const sensor = this.$store.state.commonData.find(i=>{
						return i.sensorName.includes("空气污染指数")
					})
					return sensor.value + sensor.unit
				}
			}
		},
		methods:{
			handlePlacePick(id){
				this.pickedPlaceId = id
			}
		},
		created() {
			
		}
	}
</script>

<style lang="scss">
	.home-wrapper{
		width: 100%;
		height: 100%;
		background-color: #f3f4f6;
		overflow: scroll;
		.navbar-content{
			display: flex;
			flex: 1;
			justify-content: space-between;
			align-items: center;
			padding: 0 12rpx;
			&-title{
				font-family: 'cefbw05 Vera Serif Bold';
				font-size: 60rpx;
			}
		}
		&-content{
			.content-header{
				height: 260rpx;
				padding: 30rpx;
				border-radius: 0 0 50rpx 50rpx;
				background-color: #fbfbfb;
				display: flex;
				justify-content: space-between;
				align-items: center;
				&-left{
					height: 100%;
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-between;
					padding: 16rpx 0;
					.tips{
						font-size: 40rpx;
						font-weight: 800;
					}
					.config-info{
						display: flex;
						width: 100%;
						justify-content: space-between;
						.config-info-item{
							display: flex;
							flex-direction: column;
							// margin-right: 20rpx;
							.value{
								color: #142035;
								font-size: 36rpx;
								font-weight: 800;
							}
							.label{
								color: #7e8798;
								font-size: 24rpx;
							}
						}
					}
				}
				&-right{
					height: 200rpx;
					width: 200rpx;
					.progress-content{
						display: flex;
						justify-content: center;
						flex-direction: column;
						align-items: center;
						.grade{
							font-size: 32rpx;
						}
						.label{
							font-size: 24rpx;
						}
					}
						
				}
			}
			.content-main{
				width: 100%;
				padding: 30rpx;
				.place-picker-container{
					width: 100%;
					margin: 16rpx 0;
				}
				.sensor-list-container{
					margin: 20rpx 0;
					width: calc(100vw - 60rpx);
					display: flex;
					flex-wrap: wrap;
				}
			}
		}
		
	}
</style>
