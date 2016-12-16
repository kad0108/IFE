import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Create from './components/Create'
import List from './components/List'
import Error from './components/Error'
import Fill from './components/Fill'
import Check from './components/Check'

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
		{path: '/', name: 'home', component: Newbtn },
		{path: '/create', name: 'create', component: Create},
		{path: '/list', name: 'list', component: List},
		{path: '/edit/:id', name: 'edit', component: Create},
		{path: '/fill/:id', name: 'fill', component: Fill},
		{path: '/check/:id', name: 'check', component: Check},
		{path: '/404', name: 'error', component: Error},
		{path: '*', redirect: '/404'},
	]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
