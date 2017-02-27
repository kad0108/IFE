<template>
  <div>
    <navi></navi>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navi from './components/Nav'
export default {
  components: {
    Navi
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei";
  box-sizing: border-box;
}
body{
  overflow-y: scroll;
  background-color: #ddd;
}
.container{
  width: 80%;
  margin: 6.5rem auto;
  padding: 2rem 0;
  border-radius: .2rem;
  box-shadow: 0 .05em .25em rgba(0,0,0,.5);
  background-color: #fff;
  text-align: center;
}
.create{
  cursor: pointer;
  display: inline-block;
  margin: 2rem 0;
  padding: .5rem 1.5rem;
  font-size: 1.6rem;
  background-color: #ee7416;
  box-shadow: 0 .05em .25em rgba(0,0,0,.5);
  text-shadow: 0 -.05em .05em rgba(0,0,0,.5);
  color: #fff;
  border-radius: .2rem;
  text-decoration: none;
}
.create:before{
  content: '\+';
}
.btn{
  cursor: pointer;
  padding: 0 .5rem;
  margin: 0 .5rem;
  height: 2rem;
  border: 1px solid #ccc;
  border-radius: .2rem;
  box-shadow: 0 .05em .25em rgba(0,0,0,.5);
  color: #888;
  font-size: 1rem;
  background-color: #fff;
}
.btn:hover{
  background-color: #ee7419;
  color: #fff;
  border-color: #ee7419; 
}
</style>
