<template>
  <div>
    <input type="text" class="title" placeholder="这里是标题" v-model="title">
    <hr>
    <div class="question-wrap">
    	<div class="question" v-for="(item, id) in form">
    		<ul>
    			<li class="question-title">
    				<span>Q{{id+1}}</span>
    				<input type="text" v-if="item.type !== 'textarea'" v-model="item.title" class="question-title" onfocus="this.select()">
    				<span v-else class="question-title">{{item.type | typeContent}}</span>
    			</li>
    			<ol v-if="item.type === 'textarea'">
    				<li>
    					<textarea class="textarea" v-model="item.title"></textarea>
    				</li>
    				<li class="must">
    					<input type="checkbox" id="must" v-model="isMust">
    					<label for="must">此题是否必填</label>
    				</li>
    			</ol>
    			<ol v-else>
    				<li v-for="(option, index) in item.options" class="options">
	    				<span v-bind:class="item.type"></span>
	    				<input type="text" v-model="option.text" onfocus="this.select()">
	    				<span class="delOption" v-on:click="delOption(id, index)">x</span>
	    			</li>
	    			<li class="addOption" v-on:click="addOption(id)">+</li>
    			</ol>
    			<li class="operate">
    				<span v-on:click="up(id)">上移</span>
    				<span v-on:click="down(id)">下移</span>
    				<span v-on:click="reuse(id)">复用</span>
    				<span v-on:click="del(id)">删除</span>
    			</li>
    		</ul>
    	</div>
    </div>
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
    		<datec v-on:getDate="getDate"></datec>
    	</span>
    	<button class="btn" v-on:click="save">保存问卷</button>
    	<button class="btn" v-on:click="publish">发布问卷</button>
    	<modal v-if="ifShowModal" v-on:hideModal="hideModal" v-bind:hint="hint"></modal>
    </div>
  </div>
</template>

<script>
import store from '../store.js'
import Datec from './Date'
import Modal from './Modal'
export default {
	data () {
		let suvData = store.fetch();
		return {
			title: '',
			showType: false,
			userId: suvData.id,
			formList: suvData.formList || [],
			form: [],
			isMust: [],
			datec: '',
			hint: '',
			ifShowModal: false,
		}
	},
	components: {
		Datec,
		Modal
	},
	methods: {
		newForm (type) {
			if(type === 'textarea'){
				this.form.push({
					title: '',
					type: type,
					isMust: this.isMust.length ? true : false,
					content: ''
				})
			}else{
				this.form.push({
					title: this.getTitle(type),
					type: type,
					options: [
						{text: '选项1'},
						{text: '选项2'},
					]
				});
			}
			this.isShow();
		},
		getTitle (type) {
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
		},
		up (id) {
			if(id != 0){
				let data = this.form[id];
				this.form.splice(id, 1);
				this.form.splice(id-1, 0, data);
			}
		},
		down (id) {
			if(id != this.form.length-1){
				let data = this.form[id];
				this.form.splice(id, 1);
				this.form.splice(id+1, 0, data);
			}
		},
		reuse (id) {
			let oldData = this.form[id];
			let newData = {};
			for(let key in oldData){
				if(oldData[key] instanceof Array){
					var newOptions = [];
					oldData[key].forEach(function(oldOption){
						let newOption = {};
						for(let k in oldOption){
							newOption[k] = oldOption[k];
						}
						newOptions.push(newOption);
					})
					newData[key] = newOptions;
				}
				else newData[key] = oldData[key];
			}
			this.form.splice(id+1, 0, newData);
		},
		del (id) {
			this.form.splice(id, 1);
		},
		addOption (id) {
			let options = this.form[id].options;
			options.push({text: '选项' + (options.length+1)});
		},
		delOption (id, index) {
			this.form[id].options.splice(index, 1);
		},
		getDate (date) {
			this.datec = date;
		},
		save () {
			this.formList.push({
				title: this.title,
				state: 'draft',
				start: Date(),
				end: this.datec,
				form: this.form,
			});
			this.hint = 'save';
			this.ifShowModal = true;
		},
		publish () {
			if(!this.title || !this.form.length || !this.datec) {
				this.hint = 'error';
				this.ifShowModal = true;
			}else{
				this.formList.push({
					title: this.title,
					state: 'draft',
					start: 'publish',
					start: Date(),
					end: this.datec,
					form: this.form,
				});
				this.hint = 'oublish';
				this.ifShowModal = true;
			}
		},
		hideModal () {
			this.ifShowModal = false;
		},
		isShow () {
			this.showType = !this.showType;
		},
	},
	computed: {
		
	},
	watch: {
		formList: {
			deep: true,
			handler () {
				store.save({
					userId: this.userId,
					formList: this.formList
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
/* 问题模块 */
.question-wrap{
	width: 90%;
	margin: 2rem auto;
	font-size: 1rem;
}
/* 单个问题 */
.question{
	padding: 1rem 1.5rem;
	text-align: left;
}
.question:hover{
	background-color: #fef1e8;
}
.question:hover input{
	background-color: #fef1e8;
}
.question:hover .operate{
	visibility: visible;
}
.question input{
	border: none;
	padding-left: .2rem;
}
.question input::-webkit-input-placeholder{
	color: black;
}
.question span{
	cursor: default;
}
li{
	list-style: none;
	line-height: 1.6rem;
}
li input{
	height: 1.6rem;
	font-size: 1rem;
}
.delOption{
	visibility: hidden;
	cursor: pointer;
}
.options{
	margin-left: 2rem;
}
.options:hover .delOption{
	visibility: visible;
}
.addOption{
	width: 50%;
	text-align: center;
	border: 1px dashed #888;
	cursor: pointer;
	margin-left: 2rem;
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
.operate{
	text-align: right;
	font-size: 1rem;
	visibility: hidden;
}
.operate span{
	cursor: pointer;
	margin-right: .5rem;
}
.radio{
	display: inline-block;
	width: .7rem;
	height: .7rem;
	border: 1px solid black;
	border-radius: 50%;
	box-shadow: 0 .05em .25em rgba(0,0,0,.5);
}
.checkbox{
	display: inline-block;
	width: .7rem;
	height: .7rem;
	border: 1px solid black;
	box-shadow: 0 .05em .25em rgba(0,0,0,.5);
}
.textarea{
	width: 90%;
	max-width: 90%;
	height: 5rem;
	margin-left: 2rem;
}
.must{
	display: flex;
	align-items: center;
	margin-left: 2rem;
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
