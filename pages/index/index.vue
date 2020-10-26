<template>
	<view class="content">
		<uni-popup ref="popup" type="dialog">
			<view class="popup_main">
				<view class="popup_title">
					<text>提示</text>
				</view>
				<view class="popup_msg">
					<text>你还未绑定教务账号无法获取课表，是否确定绑定？</text>
				</view>
				<view class="popup_button">
					<view class="left_button" @tap="popup_close">
						<text>取消</text>
					</view>
					<view class="right_button" >
						<navigator url="../log_on/index">确定</navigator>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timetable_list:[]
			}
		},
		onShow() {
			if (!this.$store.state.hasLogin){
				this.$refs.popup.open()
			}else{
				this.$refs.popup.close()
				console.log(this.$store.state.timetableInfo)
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.popup_main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 580rpx;
		height: 300rpx;
		background-color: white;
		border-radius: 18rpx
	}
	.popup_title {
		text-align: center;
		font-weight: bold;
		 font-size: 35rpx;
		padding-top: 30rpx;
	}
	.popup_msg {
		text-align: center;
		padding: 0 30rpx;
		
	}
	.popup_button {
		display: flex;	
		height: 80rpx;
		border-top:1px solid #dcdcdc
	}
	.left_button {
		display: flex;
		justify-content:center;
		align-items: center;
		flex-grow: 1;
		border-right:1px solid #dcdcdc;
	}
	.left_button text{
		font-weight:bold;
	}
	.left_button:active{
		background-color: #c8c8c8;
	}
	.right_button {
		flex-grow: 1;
	}
	.right_button:active{
		background-color: #dedede;
	}
	.right_button navigator{
		display: flex;
		justify-content:center;
		align-items: center;
		height: 100%;
		width: 100%;
		font-weight:bold;
		color: #0058b6;
	}
	.right_button :active{
		background-color: #dedede;
	}
</style>
