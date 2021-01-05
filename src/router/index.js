import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index.vue'
import { getToken } from '@/utils/auth'
Vue.use(VueRouter)

//解决多次点击重复路由报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}

const routes = [{
		path: '/',
		name: 'index',
		component: Index,
		redirect: 'home',
		children: [{
			path: 'home',
			name: 'home',
			redirect: 'home/star',
			component: (resolve) => require(['@/views/home'], resolve),
			children: [{
				path: 'star',
				name: 'star',
				component: (resolve) => require(['@/views/star'], resolve),
			},{
				path: 'team',
				name: 'team',
				component: (resolve) => require(['@/views/team'], resolve),
			},{
				path: 'my',
				name: 'my',
				component: (resolve) => require(['@/views/my'], resolve),
			}]
		}, {
			path: 'msg',
			name: 'msg',
			component: (resolve) => require(['@/views/msg'], resolve),
		},{
			path: 'admin',
			name: 'admin',
			component: (resolve) => require(['@/views/admin'], resolve),
			children: [{
				path: 'adminuser',
				name: 'adminuser',
				component: resolve => require(['@/components/adminuser'],resolve)
				},{
				path: 'adminstar',
				name: 'adminstar',
				component: resolve => require(['@/components/adminstar'],resolve)
			},{
			     path: 'adminpro',
				 name: 'adminpro',
				 component: (resolve) => require(['@/components/adminpro'], resolve),
			 }, {
				path: 'admintask',
				name: 'admintask',
				component: (resolve) => require(['@/components/admintask'], resolve),
				},{
				path: 'adminteam',
				name: 'adminteam',
				component: resolve => require(['@/components/adminteam'],resolve)
			},{
				path: 'adminProStandard',
				name: 'adminProStandard',
				component: resolve => require(['@/components/adminProStandard'],resolve)
			},{
				path: 'adminrole',
				name: 'adminrole',
				component: resolve => require(['@/components/adminrole'],resolve)
			},{
				path: 'adminroleAuthority',
				name: 'adminroleAuthority',
				component: resolve => require(['@/components/adminroleAuthority'],resolve)
			},{
				path: 'adminAuthority',
				name: 'adminAuthority',
				component: resolve => require(['@/components/adminAuthority'],resolve)
			}]
		}]
	},
	{
		path: '/login',
		name: 'login',
		component: (resolve) => require(['@/views/login'], resolve)
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	scrollBehavior: () => ({y: 0}),
	routes
})

export default router

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
	if (getToken()) {
		if (to.path === '/login') {
			next({path: '/'})
		} else {
			next()
		}
	} else {
		// 没有token
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next()
		} else {
			 next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
		}
	}
})

router.afterEach(() => {

})
