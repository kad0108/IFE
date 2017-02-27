<template>
  <div>
    <input type="text" class="title" placeholder="这里是标题" v-model="title">
    <hr>
    <question v-bind:form="form"></question>
    <div class="addPro">
    	<transition>
    		<div v-if="showType" class="pro-types">
	    		<button class="btn" v-on:click="newForm('radio')">
	    			<i class="iconfont">&#xe71e;</i>单选题
	    		</button>
	    		<button class="btn" v-on:click="newForm('checkbox')">
	    			<i class="iconfont">&#xe71a;</i>多选题
	    		</button>
	    		<button class="btn" v-on:click="newForm('textarea')">
	    			<i class="iconfont">&#xe600;</i>文本题
	    		</button>
	    	</div>
    	</transition>
    	<div class="addPro-btn" v-on:click="isShow"><i class="iconfont">&#xe727;</i>&nbsp;添加问题</div>
    </div>
    <hr>
    <div class="footer">
    	<span class="setDate">
    		<label for="date">问卷截止日期</label>
    		<datec v-on:getDate="getDate" v-bind:datec="datec"></datec>
    	</span>
    	<button class="btn" v-on:click="draft">保存问卷</button>
    	<button class="btn" v-on:click="publish">发布问卷</button>
    	<modal v-bind:ifShowModal="ifShowModal" v-on:hideModal="hideModal" v-bind:hint="hint"></modal>
    </div>
  </div>
</template>

<script>
import store from '../store.js'
import Datec from './Date'
import Modal from './Modal'
import Question from './Question'

// filter type
function getTitle (type) {
	switch(type) {
		case 'radio':
			return '单选题';
			break;
		case 'checkbox':
			return '多选题';
			break;
		case 'textarea':
			return '文本题';
			break;
	}
}

export default {
	data () {
		return {
			path: '',
			title: '',
			showType: false,
			formList: [],
			form: [],
			isMust: [],
			datec: '',
			hint: '',
			ifShowModal: false,
		}
	},
	components: {
		Datec,
		Modal,
		Question
	},
	created () {
		this.path = this.$route.path.replace(/[^0-9]/ig, '');
		this.formList = store.fetch().formList || [];
		if(this.path){
			this.form = this.formList[this.path].form;
			this.title = this.formList[this.path].title || '';
			this.datec = this.formList[this.path].end || '';
		}
	},
	methods: {
		// 显示问题类型
		isShow () {
			this.showType = !this.showType;
		},
		// 添加问题
		newForm (type) {
			if(type === 'textarea'){
				this.form.push({
					title: '',
					type: type,
					required: [],
					content: '',
					num: 0,
				})
			}else if(type === 'radio'){
				this.form.push({
					title: getTitle(type),
					type: type,
					options: [
						{ name: '选项1', num: 0 },
						{ name: '选项2', num: 0 }
					],
					chosen: -1, //这儿初始化为''空字符串就会导致在使用v-model时第一个选项总会被选中
				});
			}else if(type === 'checkbox'){
				this.form.push({
					title: getTitle(type),
					type: type,
					options: [
						{ name: '选项1', num: 0 },
						{ name: '选项2', num: 0 }
					],
					chosen: [],
				});
			}
			this.isShow();
		},
		
		// 获取子组件传递过来的日期数据
		getDate (date) {
			this.datec = date;
		},
		// 保存问卷
		draft () {
			this.hint = 'draft';
			this.ifShowModal = true;
		},
		// 发布问卷
		publish () {
			if(!this.title || !this.form.length || !this.datec) {
				this.hint = 'error';
				this.ifShowModal = true;
			}else{
				this.hint = 'publish';
				this.ifShowModal = true;
			}
		},
		// 添加form数据
		setForm (state) {
			if(this.path){
				this.formList[this.path].title = this.title;
				this.formList[this.path].state = state;
				this.formList[this.path].start = Date.now();
				this.formList[this.path].end = this.datec;
				this.formList[this.path].form = this.form;
			}else{
				this.formList.push({
					title: this.title,
					state: state,
					start: Date.now(),
					end: this.datec,
					form: this.form,
					fillnum: 0,
				});
			}
		},
		// 隐藏modal
		hideModal (state) {
			this.ifShowModal = false;
			if(state !== 'cancel' && state !== 'error'){
				this.setForm(state);
				setTimeout( () => {this.$router.push({name: 'list'})}, 0);
				// let self = this;
				// setTimeout(function(){
				// 	self.$router.push({name: 'list'});
				// }, 0);
			}
		},
	},
	computed: {
		
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
	}
}
</script>

<style>
/* 问卷标题 */
.title{
	width: 90%;
	height: 3rem;
	border: none;
	font-size: 1.2rem;
	color: #555;
	font-weight: bold;
	margin: 0 auto;
	text-align: center;
	margin-bottom: 1.5rem;
}
.title:hover{
	background-color: #fef1e8;
}
/* 水平线 */
hr{
	border: 1px solid #ccc;
	width: 93%;
	margin: 0 auto;
}

/* 添加问题 */
.pro-types{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 5rem;
	border: 1px solid #ccc;
	border-bottom: none;
	margin: 0 auto;
}
.addPro{
	width: 90%;
	margin: 2rem auto;
}
.addPro-btn{
	cursor: pointer;
	height: 5rem;
	background-color: #eee;
	color: #888;
	font-size: 1rem;
	border: 1px solid #ccc;
	line-height: 5rem;
	text-align: center;
}
.addPro-btn:hover{
	opacity: .8
}
/* 底部栏 */
.footer{
	margin: 2rem auto;
	text-align: center;
	color: #888;
	font-size: 1rem;
}
.setDate{
	margin-right: 5rem;
}

</style>
