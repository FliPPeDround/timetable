import Vue from 'vue'
import Vuex from 'vuex'
import {
	ParamUtils,
	EncodeUtil,
} from "../pages/log_on/kingosoft-api.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		usrId: '',
		usrPw: '',
		userInfo:[],
		log_msg:'',
		timetableList: [],
		timetable_show:false
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			uni.setStorage({
				key:'hasLogin',
				data:state.hasLogin
			})
			var loginParams1 = ParamUtils.getLoginParams('13589', 'MI 8', 'android', '10', state.userId, state.userPw);
			var map1 = EncodeUtil.encodeing(loginParams1, '00000');
			var map1 = Array.from(map1).reduce((obj, [key, value]) =>
				Object.assign(obj, {
					[key]: value
				}), {});
			uni.request({
				url: 'http://api.xiqueer.com/manager//wap/wapController.jsp',
				data: map1,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (res) => {
					console.log(res.data.msg)
					if (res.data.xqdlzh == state.userId) {
						state.log_msg = res.data.msg
						state.userInfo = res.data
						uni.switchTab({
							url: '/pages/timeTable/index'
						});
					} else {
						state.log_msg = res.data.msg
					}
				}
			})
		},
		getTimetable_data(state, week) {
			var week = week.toString()
			var userJSON = state.userInfo
			var courseParams = ParamUtils.getCourseParams("", "", week, "20200", userJSON);
			var courseMap = EncodeUtil.encodeing(courseParams, userJSON['token']);
			var courseMap = Array.from(courseMap).reduce((obj, [key, value]) =>
				Object.assign(obj, {
					[key]: value
				}), {});
			uni.request({
				url: 'http://api.xiqueer.com/manager//wap/wapController.jsp',
				data: courseMap,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				success: (resmap) => {
					var resdata = resmap.data;
					let weekData = {}
					for (let key in resdata) {
						if (key.startsWith("week")) {
							weekData[key] = resdata[key]
						}
					}
					for (let key in weekData) {
						for (let i = 0; i < weekData[key].length; i++) {
							weekData[key] = weekData[key].map(course => {
								return {
									jcxx: course.jcxx,
									kcmc: course.kcmc,
									skdd: course.skdd,
									wkdy: key
								}
							})
						}
					}
					state.timetableList = weekData
					state.timetableList = true
				}
			})
		}
	},
})

export default store
