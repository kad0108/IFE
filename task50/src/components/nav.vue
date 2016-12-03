<template>
  <div class="header">
  	<span class="logo">问卷管理</span>
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
	height: 3.5rem;
	background-color: #ee7419;
	/* 弹性盒子子元素居中对齐 */
	display: flex;
	-webkit-align-items: center;
}
.logo{
	margin-left: 10%;
	font-size: 1.4rem;
	display: inline-block;
	cursor: default;
}
.logo:before{
	content: '?';
	width: 10px;
	height: 10px;
	background-color: #fff;
	/*border-radius: 50%;*/
	color: #ee7419;
}
</style>
