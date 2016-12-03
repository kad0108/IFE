import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Create from './components/Create'

Vue.use(VueRouter);

var router = new VueRouter({
	routes: [
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
