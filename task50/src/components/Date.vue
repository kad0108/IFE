<template>
	<div class="date-wrap">
		<input type="text" v-on:focus="isShow = true" v-model="formatDate">
		<div class="date" v-if="isShow">
			<div class="year-month">
				<span v-if="!isDisable" class="switch pre-month" v-on:click="preMonth"></span>
				<span class="ymtext">{{date.year}}年{{date.month+1}}月</span>
				<span class="switch next-month" v-on:click="nextMonth"></span>
			</div>
			<div class="week">
				<ul>
					<li v-for="w in week">{{w}}</li>
				</ul>
			</div>
			<div class="day">
				<ul>
					<li v-for="item in range" v-on:click="setDate(item)" v-bind:class="{chosen: ifChosen(item)}">{{item}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data () {
		let today = new Date()
		return {
			isShow: false,
			isDisable: true,
			curDate: {// 初始化日期
				year: today.getFullYear(),
				month: today.getMonth(),
				week: today.getDay(),
				day: today.getDate(),
			},
			date: {// 当前选中日期
				year: today.getFullYear(),
				month: today.getMonth(),
				day: today.getDate(),
			},
			week: ['日','一','二','三','四','五','六'],
			range: [],
			formatDate: '',
		}
	},
	created () {
		this.getRange();
		this.formatDate = this.format(this.date);
	},
	methods: {
		getRange () {
			this.range = [];
			let days = this.getDays();
			let fw = new Date(this.date.year, this.date.month, 1).getDay();
			for(let i = 0; i < fw; i++){
				this.range.push('');
			}
			for(let i = 1; i <= days; i++){
				if(this.date.year > this.curDate.year || this.date.month > this.curDate.month){
					this.range.push(i);
				}else{
					if(i >= this.curDate.day) this.range.push(i);
					else this.range.push('');
				}
			}
		},
		ifChosen (item) {
			var obj = {
				year: this.date.year,
				month: this.date.month,
				day: item
			}
			if(this.format(obj) == this.formatDate) return true;
			else return false;
		},
		setDate (day) {
			this.date.day = day;
			this.formatDate = this.format(this.date);
			this.isShow = false;
			this.$emit('getDate', this.formatDate);
		},
		preMonth () {
			this.date.month--;
			if(this.date.month < 0) {
				this.date.month = 11;
				this.date.year--;
			}
			this.disablePreBtn();
			this.getRange();
		},
		nextMonth () {
			this.date.month++;
			if(this.date.month > 11){
				this.date.month = 0;
				this.date.year++;
			}
			this.disablePreBtn();
			this.getRange();
		},
		disablePreBtn () {
			if(this.curDate.year >= this.date.year && this.curDate.month >= this.date.month){
				this.isDisable = true;
			}else{
				this.isDisable = false;
			}
		},
		getDays () {
			return new Date(this.date.year, this.date.month+1, 0).getDate();
		},
		format (date) {
			return date.year + '-' + this.preZero(date.month+1) + '-' + this.preZero(date.day);
		},
		preZero (num) {
			num = Number(num);
			return num < 10 ? ('0' + num) : num;
		}
	},
}
</script>
<style>
.date-wrap{
	display: inline-block;
}
.date-wrap input{
	width: 10rem;
	height: 2rem;
	border-radius: .2rem;
	padding-left: .5rem;
	border: 1px solid #888;
	cursor: pointer;
}
.date-wrap .date{
	position: absolute;
	z-index: 2;
	width: 15rem;
	font-size: 1rem;
	border: 1px solid #888;
	background-color: #fff;
	border-radius: .2;
	box-shadow: 0 .05em .25em rgba(0,0,0,.5);
	user-select: none;
}
.date-wrap .year-month{
	position: relative;
	text-align: center;
	background-color: #ee7419;
	height: 2.6rem;
	line-height: 2.6rem;
	color: #fff;
}
.date-wrap .ymtext{
	cursor: default;
}
.date-wrap .switch{
	position: absolute;
	cursor: pointer;
	border: 7px solid transparent;
	top: .8rem;
}
.date-wrap .switch:hover{
	opacity: .8;
}
.date-wrap .pre-month{
	border-right-color: #fff;
	left: 1rem;
}
.date-wrap .next-month{
	border-left-color: #fff;
	right: 1rem;
}
.date-wrap .day ul{
	text-align: left;
	padding: .4rem;
}
.date-wrap .date ul li{
	width: 2rem;
	display: inline-block;
	list-style: none;
	border-radius: 5px;
	cursor: pointer;
	text-align: center;
	line-height: 2rem;
}
.date-wrap .date ul li:hover{
	background-color: #ee7419;
	border-radius: 5px;
	color: #fff;
}
.date-wrap .week{
	border-bottom: 1px solid #ccc;
}
.date-wrap .chosen{
	background-color: #ee7419;
	color: #fff;
}
</style>