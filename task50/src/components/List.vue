<template>
	<div>
		<table class="list">
			<thead>
				<tr>
					<th>标题</th>
					<th>截止时间</th>
					<th>状态</th>
					<th>
						操作
						<router-link tag="button" class="btn" :to="{name: 'create'}">新建问卷</router-link>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in formList">
					<td>{{item.title}}</td>
					<td>{{item.end}}</td>
					<td>{{item.state | stateContent}}</td>
					<td>
						<router-link tag="button" class="btn" :to="{name: 'edit', params: {id: index}}" v-if="item.state=='draft'">编辑问卷</router-link>
						<router-link tag="button" class="btn" :to="{name: 'fill', params: {id: index}}" v-if="item.state=='publish'">填写问卷</router-link>
						<!-- <router-link tag="button" class="btn" :to="{name: 'check', params: {id: index}}" v-if="item.state!='draft'">查看数据</router-link> -->
						<button class="btn" v-on:click="delSurvey(index)">删除问卷</button>
					</td>
				</tr>
			</tbody>
		</table>
		<modal v-bind:ifShowModal="ifShowModal" v-bind:del="del" v-on:hideModal="hideModal" v-bind:hint="hint"></modal>
	</div>
</template>
<script>
import store from '../store'
import filter from '../filter'
import Modal from './Modal'
export default {
	data () {
		return {
			formList: store.fetch().formList,
			hint: '',
			index: -1,
			ifShowModal: false,
		}
	},
	components: {
		Modal,
	},
	methods: {
		delSurvey (index) {
			this.index = index;
			this.ifShowModal = true;
			this.hint = 'delete';
		},
		del () {
			this.formList.splice(this.index, 1);
		},
		hideModal (state) {
			this.ifShowModal = false;
		}
	},
	watch: {
		formList: {
			handler (formList) {
				store.save({
					formList: formList
				})
			},
			deep: true,
		}
	},
	filters: filter
}
</script>
<style>
.list{
	margin: 0 auto;
	width: 96%;
	line-height: 1.5rem;
	color: #555;
}
.list thead tr{
	font-size: 1.2rem;
}
.list thead tr th:nth-child(1){
	width: 25%;
}
.list thead tr th:nth-child(2){
	width: 20%;
}
.list thead tr th:nth-child(3){
	width: 10%;
}
.list thead tr th:nth-child(4){
	width: 45%;
}
.list tbody tr td{
	border-bottom: 1px solid #ccc;
	font-size: 1rem;
	height: 3rem;
	line-height: 3rem;
}
</style>