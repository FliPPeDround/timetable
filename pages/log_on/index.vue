<template>
	<view class="content">
		<view class="logo-pic">
			<image src="/pic/yan.png" mode="aspectFit"></image>
		</view>
		<view class="log-main">
			<view class="log-msg">
				<view class="log-id">
					<text>账号</text><input type="number" placeholder="请输入教务处账号" v-model="id" />
				</view>
				<view class="log-pw">
					<text>密码</text><input type="text" placeholder="请输入密码" password="true" v-model="pw" />
				</view>
				<view class="id-help" @tap="popup_help_open">
					<text class="help-logo">?</text><text>帮助</text>
				</view>
			</view>
			<view class="log-button">
				<button type="primary" size="default" @tap="log_on_xiqueer">确认绑定</button>
			</view>
		</view>
		<uni-popup ref="popup_help" type="dialog">
			<view class="popup_main">
				<view class="popup_title">
					<text>帮助</text>
				</view>
				<view class="popup_msg">
					<text class="tips-qus" space="ensp">1. 账号和密码是什么？</text>
					<text class="tips-msg" space="ensp">账号: 学校教务处账号(同喜鹊儿app账号，同学号)</text>
					<text class="tips-msg" space="ensp">密码: 学校教务处密码(同喜鹊儿app密码)</text>
					<text class="tips-qus" space="ensp">2. 忘记密码？</text>
					<text class="tips-msg">寻求辅导员帮助</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup_logon" type="dialog">
			<view class="popup_logon_main">
				<view class="popup_logon_title">
					<text>提醒</text>
				</view>
				<view class="popup_logon_msg">
					<text>{{ popup_logon_msg }}</text>
				</view>
				<view class="popup_logon_button" @tap="popup_logon_close">
					<text>确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		ParamUtils,
		EncodeUtil,
	} from "./kingosoft-api.js"
	export default {
		data() {
			return {
				id: '',
				pw: '',
				popup_logon_msg: '',
				timetable_list: [],
			}
		},

		methods: {
			popup_help_open() {
				this.$refs.popup_help.open()
			},
			popup_logon_close() {
				this.$refs.popup_logon.close()
			},
			log_on_xiqueer() {
				if (this.id.length == 0 || this.pw.length == 0) {
					this.$refs.popup_logon.open()
					this.popup_logon_msg = '账号及密码不能为空'
					return
				}
				this.$store.state.userId = this.id
				this.$store.state.userPw = this.pw
				this.$store.commit('login')
				if (this.$store.state.log_msg != "通过身份验证！") {
					this.$refs.popup_logon.open()
					this.popup_logon_msg = this.$store.state.log_msg
				}
			}
		},
	}
</script>

<style>
	page {
		background-color: #f4f4f4;
		height: 100%
	}

	text {
		display: block
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%
	}

	.logo-pic {
		height: 20%;
		padding-left: 20rpx;
		background-image: linear-gradient(#66D6E2, #45E2AD);
	}

	.log-main {
		height: 80%;
		display: flex;
		flex-direction: column;
		padding-top: 150rpx;
		justify-content: space-between
	}

	.log-msg {
		margin-top: 10%;
	}

	.log-id {
		background-color: #ffffff;
		display: flex;
		padding: 30rpx 20rpx;
		margin: 0 35rpx;
		margin-bottom: 40rpx;
		align-items: center;
	}

	.log-id text {
		height: 35rpx;
		line-height: 35rpx;
		padding-right: 20rpx;
		margin-right: 20rpx;
		border-right: #b1b1b1 0.5px solid;
	}

	.log-id input {
		width: 80%;
	}

	.log-pw {
		background-color: #ffffff;
		display: flex;
		padding: 30rpx 20rpx;
		margin: 0 35rpx;
		align-items: center;
	}

	.log-pw text {
		height: 35rpx;
		line-height: 35rpx;
		padding-right: 20rpx;
		margin-right: 20rpx;
		border-right: #b1b1b1 0.5px solid;

	}

	.log-pw input {
		width: 80%;
	}

	.id-help {
		color: #b1b1b1;
		display: flex;
		flex-direction: row-reverse;
		margin: 45rpx 35rpx 0 0;
	}

	.log-button button {
		margin: 35rpx;
		background-color: #45E2AD;
	}

	.popup_main {
		display: flex;
		flex-direction: column;
		width: 580rpx;
		height: 500rpx;
		background-color: white;
		border-radius: 18rpx
	}

	.popup_title {
		text-align: center;
		font-weight: 17;
		font-size: 35rpx;
		padding: 25rpx 0;
		border-bottom: 1px solid #dcdcdc
	}

	.popup_msg {
		padding: 0 30rpx;
	}

	.tips-qus {
		color: #b1b1b1;
		padding: 30rpx 0;
	}

	.tips-msg {
		text-indent: 2em;
		font-size: 30rpx;
		font-weight: lighter
	}

	.popup_logon_main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 580rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		border-radius: 18rpx
	}

	.popup_logon_title {
		text-align: center;
		font-weight: bolder;
		font-size: 30rpx;
		padding-top: 40rpx;
	}

	.popup_logon_msg {
		text-align: center;
		padding-bottom: 16rpx;
	}

	.popup_logon_button {
		border-top: 1px solid #dcdcdc;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		font-weight: bold;
		color: #0058b6;
	}

	.popup_logon_button text {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}

	.popup_logon_button:active {
		background-color: #e6e6e6;
	}

	.help-logo {
		font-size: 20rpx;
		margin-top: 7rpx;
		margin-left: 15rpx;
		background-color: #cccccc;
		border-radius: 25px;
		width: 30rpx;
		height: 30rpx;
		color: #f4f4f4;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
