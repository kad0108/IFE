<template>
	<div class="check">
		<h1 class="title">{{survey.title}}</h1>
		<hr>
		<div class="question-wrap">
			<echarts v-for="(form,index) in survey.form" v-bind:form="form" v-bind:index="index" v-bind:fillnum="survey.fillnum"></echarts>
		</div>
	</div>
</template>
<script>
import store from '../store'
import Echarts from './Echarts'
export default{
	data () {
		return {
			path: '',
			survey: {},
		}
	},
	created () {
		this.path = this.$route.path.replace(/[^0-9]/ig, '');
		let formList = store.fetch().formList;
		if(formList[this.path]){
			this.survey = formList[this.path];
		}else{
			this.$router.push({name: 'error'});
		}
	},
	components: {
		Echarts
	}
}
</script>
<style>
/* 问卷标题 */
.check .title{
	width: 90%;
	height: 3rem;
	line-height: 3rem;
	border: none;
	font-size: 1.2rem;
	color: #555;
	font-weight: bold;
	margin: 0 auto;
	text-align: center;
	margin-bottom: 1.5rem;
	cursor: default;
}
.check .title:hover{
	background-color: #fef1e8;
}
/* 水平线 */
.check hr{
	border: 1px solid #ccc;
	width: 93%;
	margin: 0 auto;
}
</style>