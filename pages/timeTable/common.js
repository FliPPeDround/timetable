	export const formatDayTime = (val) => {
		if (val) {
			let date = new Date(val);
			let Y = date.getFullYear();
			let M = date.getMonth() + 1;
			let D = date.getDate();

			if (M < 10) {
				M = '0' + M;
			}
			if (D < 10) {
				D = '0' + D;
			}

			return Y + '-' + M + '-' + D;
		} else {
			return '';
		}
	}

	export const getweek =()=> {
		var days = new Date().getTime() - new Date('2020/09/07').getTime()
		var time = parseInt(days / (1000 * 60 * 60 * 24))
		var week = Math.ceil(time / 7)
		if (time == 0) {
			return 1
		}
		return week
	}
