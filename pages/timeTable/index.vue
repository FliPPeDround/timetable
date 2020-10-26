<template>
	<view class="content">
		<uni-popup ref="popup_login" type="dialog">
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
					<view class="right_button">
						<navigator url="../log_on/index" open-type="redirect">确定</navigator>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup_get" type="dialog">
			<view class="popup_main">
				<view class="popup_title">
					<text>提示</text>
				</view>
				<view class="popup_msg">
					<text>登录成功，是否获取课表？</text>
				</view>
				<view class="popup_button">
					<view class="left_button" @tap="popup_close">
						<text>取消</text>
					</view>
					<view class="right_button" @tap="get_thisWeek">
						<text>确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="time-table width-100-bfb flex flex-direction" style="height: 100vh">
			<view class="">
				<view class="cu-bar bg-white text-primary">
					<view class="action" @tap="previousWeek">
						<text class="cuIcon-back" style="margin-right: unset;"></text>
						<text class="text-bold text-lg">上一周</text>
					</view>
					<text class="content text-bold">{{ time }}</text>
					<view class="action" @tap="nextWeek">
						<text class="text-bold text-lg">下一周</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="flex text-center page-bg-white margin-bottom-sm">
					<view class="cu-item flex-sub" v-for="(item, index) in timeList" :key="index" @tap="tabSelect" :data-id="index">
						<view class="margin-tb text-lg" style="color: #B1B1B1;">{{ item.week }}</view>
						<view class="text-bold text-lg time radio-circle" :class="index + 1 === week ? 'text-white page-bg-primary radio-circle' : ''">{{ item.time }}</view>
						<text class="text-gray" style="font-size: 80rpx;line-height: 20rpx;" v-if="index + 1 === week">·</text>
					</view>
				</view>
			</view>
			<view v-for="(value, name) in list" :key="name" v-if=" name == 'week'+week " class="flex-sub">
				<view class="" v-for="(items, i) in value" :key="i" v-if="value.length !== 0">
					<view class="cu-card article" :class="isCard ? 'no-card' : ''">
						<view class="cu-item padding-bottom-xs margin-bottom-xs cu-shadow">
							<view class="cu-list menu-avatar">
								<view class="cu-item flex justify-between margin-lr text-xl height-50 ">
									<view class="text-lg">
										<text class="cuIcon-time text-orange"></text>
										<text class="margin-lr-xs text-bold">{{ items.jcxx }}</text>
									</view>
								</view>
							</view>
							<view class="text-lg">
								<view style="height: 60rpx;">
									<text class="title padding-right-unset">课程：</text>
									<text>{{ items.kcmc }}</text>
								</view>
								<view>
									<text class="title padding-right-unset">教室：</text>
									<text>{{ items.skdd }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex justify-center" style="margin-top: 260rpx;">
					<image src="./not.png" v-if="value.length == 0" mode="" class="" style="width: 100px;
    height: 80px;"></image>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		formatDayTime,
		getweek
	} from './common.js';


	const oneDayTimeStamp = 86400000; // 一天的时间戳
	const now = new Date();
	const todayDayTimeStamp = now.getTime(); //今天的时间戳
	var getDay = now.getDay(); // 今天的星期
	export default {
		// name: 'time-table',
		data() {
			return {
				week: new Date().getDay(), // 今天的星期
				timeList: [{
						time: '1',
						week: '一'
					},
					{
						time: '2',
						week: '二'
					},
					{
						time: '3',
						week: '三'
					},
					{
						time: '4',
						week: '四'
					},
					{
						time: '5',
						week: '五'
					},
					{
						time: '6',
						week: '六'
					},
					{
						time: '7',
						week: '日'
					}
				],
				list: [],
				num: 0, // 记录周数，下一周加一，上一周减一, 0:本周
				isCard: false, // 卡片是否铺满全屏
				time: now.toISOString().slice(0, 10),
				mondayDayTimeStamp: 0, // 星期一的时间戳
				sundayDayTimeStamp: 0, // 星期天的时间戳,
				weekShow: false,
				hasLogin: false,
			};
		},
		onShow() {
			if(getDay == 0){
				getDay = 7;
				this.week = 7
				}
			uni.getStorage({
				key: 'hasLogin',
				success: res => {
					this.hasLogin = res.data;
				},
				complete: () => {
					if (!this.hasLogin) {
						this.$refs.popup_login.open()
					}else{
						if(!this.$store.state.timetable_show){
							this.$refs.popup_get.open()
						}
					}
					
				}
			});

		},
		methods: {
			popup_close() {
				this.$refs.popup_login.close()
			},
			get_thisWeek() {
				this.$store.commit('getTimetable_data', this.num+getweek())
				this.$refs.popup_get.close()
				this.thisWeek()
			},
			tabSelect(e) {
				this.week = +e.currentTarget.dataset.id + 1;
				this.time = formatDayTime(this.mondayDayTimeStamp + oneDayTimeStamp * (this.week - 1));
				console.log('星期' + this.week);
				console.log(this.time);
			},
			previousWeek() {
				console.log('上一周');
				this.week = 1;
				this.num = this.num - 1;
				console.log(this.num)
				if (this.num === 0) this.num === -1;
				if (this.num >= 0) {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num); // 上星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num); //上星期天的时间戳
				} else {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(
						this.num)); // 上星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(
						this.num)); //上星期天的时间戳
				}
				this.dayList();
				this.time = formatDayTime(this.mondayDayTimeStamp);
				this.$store.commit('getTimetable_data', this.num+getweek())
				this.list = this.$store.state.timetableList
			},
			nextWeek() {
				console.log('下一周');
				this.week = 1;
				this.num = this.num + 1;
				console.log(this.num)
				if (this.num === 0) this.num === 1;
				if (this.num <= 0) {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp * (7 * Math.abs(
						this.num)); // 下星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp * (7 * Math.abs(
						this.num)); //下星期天的时间戳
				} else {
					this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp * (7 * this.num); // 下星期一的时间戳
					this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp * (7 * this.num); //下星期天的时间戳
				}
				this.dayList();
				this.time = formatDayTime(this.mondayDayTimeStamp);
				this.$store.commit('getTimetable_data', this.num+getweek())
				this.list = this.$store.state.timetableList
			},
			thisWeek() {
				console.log('本周');
				console.log(this.week);
				console.log(getDay);
				this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1); // 星期一的时间戳
				this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp; //星期天的时间戳
				this.dayList();
				this.$store.commit('getTimetable_data', this.num+getweek())
				console.log(this.$store.state.timetableList)
			},
			dayList() {
				// 获取本周日期
				for (let i = 0; i < 7; i++) {
					if (this.num == 0) {
						i + 1 === getDay ? (this.timeList[i].time = '今') : (this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp +
							i * oneDayTimeStamp).substring(8));
					} else {
						this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(8);
					}
				}
			}
		},
		onUnload() {}
	};
</script>

<style lang="scss" scoped>
	@import './colorUi/main.css';
	@import './colorUi/icon.css'; // 图标样式

	.time-table {
		.content {
			background-color: #ffffff;
		}

		.title {
			line-height: 76rpx !important;
		}

		.time {
			width: 50rpx;
			height: 50rpx;
			line-height: 50rpx;
			margin: 0 auto;
		}
	}

	.width-100-bfb {
		width: 100%;
	}

	.text-primary {
		color: #409eff;
	}

	.margin-bottom-sm {
		margin-bottom: 20rpx !important;
	}

	.padding-bottom-xs {
		padding-bottom: 10rpx !important;
	}

	.margin-bottom-xs {
		margin-bottom: 5px !important;
	}

	.cu-shadow {
		box-shadow: rgba(43, 111, 179, 0.15) 0px 0px 8px 0px;
	}

	.height-50 {
		height: 100rpx !important;
	}

	.padding-right-unset {
		padding-right: unset !important;
	}

	.radio-circle {
		border-radius: 100%;
	}

	.page-bg-primary {
		background: #409eff !important;
		color: #ffffff;
	}

	.justify-between {
		justify-content: space-between !important;
	}

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
		border-top: 1px solid #dcdcdc
	}

	.left_button {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		border-right: 1px solid #dcdcdc;
	}

	.left_button text {
		font-weight: bold;
	}

	.left_button:active {
		background-color: #c8c8c8;
	}

	.right_button {
		flex-grow: 1;
	}

	.right_button:active {
		background-color: #dedede;
	}

	.right_button navigator {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		font-weight: bold;
		color: #0058b6;
	}

	.right_button :active {
		background-color: #dedede;
	}
</style>
