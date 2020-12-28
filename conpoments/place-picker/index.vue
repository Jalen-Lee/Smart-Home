<template>
	<view class="place-picker-wrap">
		<scroll-view 
			:scroll-x="true" 
			class="place-picker"
			:enable-flex="true"
			:scroll-into-view = "activedId"
			:scroll-with-animation="true"
		>
			<view 
				:id="item.id" 
				class="place-item"
				:class="activedId == item.id ? 'place-item-active':''"
				v-for="item in pickerList" :key="item.id"
				@click="handlePick(item.id)"
			>
					<text class="iconfont" :class="item.icon"></text>
					<text class="label">{{item.label}}</text>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		name:"place-picker",
		data() {
			return {
				activedId: 'p1',
				pickerList:[
					{
						id:"p1",
						icon:'icon-keting1',
						label:'客厅'
					},
					{
						id:"p2",
						icon:'icon-woshi1',
						label:'卧室'
					},
					{
						id:"p3",
						icon:'icon-shufang--',
						label:'书房'
					},
					{
						id:"p4",
						icon:'icon-yushi',
						label:'浴室'
					},
					{
						id:"p5",
						icon:'icon-weibiaoti411',
						label:'厨房'
					},
				],
			};
		},
		methods:{
			handlePick(id){
				this.activedId = id
				this.$emit('pick',id)
			}
		}
	}
</script>

<style lang="scss">
	.place-picker-wrap{
		width: 100%;
		height: 230rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.place-picker{
			width: 100%;
			height: 200rpx;
			display: flex;
			overflow: hidden;
			.place-item{
				justify-content: center;
				align-items: center;
				width: 200rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				background-color: #fbfbfb;
				border-radius: 12rpx;
				flex-grow: 1;
				flex-shrink: 0;
				&:not(:last-child){
					margin-right: 20rpx;
				}
				.iconfont{
					font-size: 100rpx;
					color: #4b90f7;
				}
				.label{
					font-size: 32rpx;
					font-weight: 600;
				}
				
			}
			.place-item-active{
				background-color: #4b90f7;
				.iconfont{
					color: #ffffff;
				}
				.label{
					color: #ffffff;
				}
			}
		}

	}
</style>
