<template>
	<view class="home-wrapper">
		<view class="home-wrapper-top">
			<view>
				
			</view>
		</view>
		<view class="home-wrapper-bottom">
			<view class="home-wrapper-bottom-banner">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.home-wrapper{
		height: 100%;
		overflow: hidden;
		.home-wrapper-top{
			height: 60%;
					// background-color: aqua;
		}
		.home-wrapper-bottom{
			height: 40%;
			background-color: #228dd5;
			border-radius: 25px 0 0 0;
			position: relative;
			.home-wrapper-bottom-banner{
				height: 70%;
				border-radius: 25px 0 0 0;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				background: #f3f3f3;
			}
		}
	}
</style>
