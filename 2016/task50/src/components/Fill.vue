<template>
	<div class="fill">
		<h1 class="title">{{title}}</h1>
		<hr>
		<div class="question-wrap">
			<div class="question" v-for="(item, id) in form">
				<li class="question-title">
    				<span>Q{{id+1}}.</span>
    				<span class="question-title">{{item.title}}</span>
    			</li>
    			<li>
    				<ol v-if="item.type === 'textarea'">
    					<li>
    						<textarea class="textarea" v-model="item.content"></textarea>
    					</li>
    					<li class="required" v-if="item.required.length">*此题必填</li>
    				</ol>
    				<ol v-else>
    					<li v-for="(option, index) in item.options" class="options">
    						<input v-if="item.type==='radio'" type="radio" v-model="item.chosen" v-bind:value="index">
    						<input v-else type="checkbox" v-model="item.chosen" v-bind:value="index">
    						<span>{{option.name}}</span>
    					</li>
    				</ol>
    			</li>
			</div>
		</div>
		<button class="btn" v-on:click="submit">提交问卷</button>
		<Modal v-bind:ifShowModal="ifShowModal" v-on:hideModal="hideModal" v-bind:hint="hint"></Modal>
	</div>
</template>
<script>
import store from '../store'
import Modal from './Modal'
export default{
	data () {
		return {
			path: '',
			title: '',
			formList: '',
			form: [],
			ifShowModal: false,
			hint: '',
		}
	},
	created () {
		this.path = this.$route.path.replace(/[^0-9]/ig, '');
		this.formList = store.fetch().formList;
		if(this.formList[this.path]){
			this.title = this.formList[this.path].title;
			this.form = this.formList[this.path].form;
		}else{
			this.$router.push({name: 'error'});
		}
	},
	methods: {
		submit () {
			this.hint = 'fill';
			this.ifShowModal = true;
		},
		setForm () {
			this.form.forEach(function(item, i){ // item是每道题
				if(item.type === 'textarea'){
					if(item.content.trim() !== '') item.num++;
					item.content = '';
				}else{
					if(item.type === 'radio' && item.chosen !== -1) {
						item.options[item.chosen].num++;
					}
					for(var j = 0; j < item.chosen.length; j++){
						item.options[item.chosen[j]].num++;
					}
					item.type === 'radio' ? item.chosen = -1 : item.chosen = [];
				}
			})
			this.formList[this.path].fillnum++;
		},
		hideModal (state) {
			this.ifShowModal = false;
			if(state !== 'cancel'){
				this.setForm();
				// 不加settimeout会在执行保存数据前直接跳走
				setTimeout( () => {this.$router.push({name: 'list'});}, 0);
			}
		}
	},
	watch: {
		formList: {
			deep: true,
			handler (formList) {
				store.save({
					formList: formList
				})
			}
		}
	},
	components: {
		Modal
	}
}
</script>
<style>
/* 问卷标题 */
.fill .title{
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
.fill .title:hover{
	background-color: #fef1e8;
}
/* 水平线 */
.fill hr{
	border: 1px solid #ccc;
	width: 93%;
	margin: 0 auto;
}
.fill ol li{
	display: flex;
	-webkit-align-items: center;
}
.fill ol li span{
	margin-left: .5rem;
}
</style>