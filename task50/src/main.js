import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Create from './components/Create'

Vue.use(VueRouter);

const Newbtn = { 
	template: '\
		<router-link :to="{name: \'create\'}" class="create">\
			&nbsp;新建问卷\
		</router-link>\
	' 
}

var router = new VueRouter({
	routes: [
		{path: '/', component: Newbtn },
		{path: 'create', name: 'create', component: Create}
	]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
