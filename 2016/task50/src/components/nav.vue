<template>
  <div class="header">
  	<router-link tag="div" class="logo" :to="{name: 'home'}"> 问卷管理</router-link>
  	<router-link class="mylist" :to="{name: 'list'}">我的问卷</router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.header{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	-webkit-user-select: none;
	z-index: 1;
	color: #fff;
	height: 3rem;
	background-color: #ee7419;
	/* 弹性盒子子元素居中对齐 */
	display: flex;
	-webkit-align-items: center;
}
.logo{
	display: inline-block;
	margin-left: 10%;
	font-size: 1.2rem;
	display: inline-block;
	cursor: pointer;
}
.logo:before{
	display: inline-block;
	content: '?';
	width: 1.4rem;
	height: 1.4rem;
	background-color: #fff;
	border-radius: 50%;
	color: #ee7419;
	text-align: center;
	line-height: 1.5rem;
}
.mylist{
	cursor: pointer;
	margin-left: 5%;
	color: #fff;
	font-size: 1rem;
	font-weight: bold;
	text-decoration: none;
	width: 6rem;
	height: 100%;
	line-height: 3rem;
	text-align: center;
	text-shadow: 0 -.05rem .05rem rgba(0,0,0,.5);
}
.mylist:hover{
	background-color: rgb(255, 140, 25);
}
</style>
