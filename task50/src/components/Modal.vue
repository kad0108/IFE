<template>
	<div class="modal">
		<div class="mask" v-on:click="hide"></div>
		<div class="dialog">
			<div class="headline">提示</div>
			<div class="body">{{hint | hintContent}}</div>
			<button v-on:click="hide" class="btn">确定</button>
		</div>
	</div>
</template>
<script>
import filter from '../filter'
export default {
	props: ['hint'],
	data () {
		return {
		}
	},
	methods: {
		hide () {
			this.$emit('hideModal');
			this.$router.push({path: 'list'});
		}
	},
	filters: filter,
}
</script>
<style>
.modal {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	right: 0;
	left: 0;
	right: 0;
}
.modal .mask{
	z-index: 1;
	background: rgba(0, 0, 0, .4);
	width: 100%;
	height: 100%;
}
.modal .dialog{
	width: 25rem;
	height: 17rem;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
	overflow: hidden;
	border: 1px solid #888;
	box-shadow: 0 .05em .25em rgba(0,0,0,.5);
	background-color: #fff;
	border-radius: 4px;
}
.modal .headline{
	position: relative;
	width: 100%;
	height: 3.5rem;
	line-height: 3.5rem;
	background-color: #ee7419;
	color: #fff;
	text-align: left;
	padding-left: 2rem;
	cursor: default;
	font-size: 1.2rem;
}
.modal .body{
	position: relative;
	padding: 2rem 2rem;
	font-size: 1.2rem;
}
.modal .btn{
	position: absolute;
	right: 2rem;
	bottom: 2rem;
}
</style>