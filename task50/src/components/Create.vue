<template>
  <div>
    <input type="text" class="title" placeholder="这里是标题" v-model="title">
  </div>
</template>

<script>
export default {
	data () {
		return {
			title: ''
		}
	}	
}
</script>

<style>
.title{
	width: 90%;
	font-size: 1rem;
	color: #555;
	font-weight: bold;
	margin: 0 auto;
	text-align: center;
}
</style>
