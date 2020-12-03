import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// step1: 引入 ViewUI
import ViewUI from 'view-design'
// step2: 引入 css 
import 'view-design/dist/styles/iview.css'

import '@/assets/iconfont/iconfont.css' // icon css.
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import '@/assets/styles/index.scss' // global css






Vue.use(PerfectScrollbar)
// step3:声明使用 ViewUI
Vue.use(ViewUI)
import { parseTime } from '@/utils'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
import Tree from '@/components/tree'
Vue.component('ly-tree', Tree)
import Json from './Json' //测试用数据
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}
// 挂载全局方法
Vue.prototype.$mock = json //测试接口
Vue.prototype.parseTime = parseTime
Vue.config.productionTip = false
Date.prototype.format = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
