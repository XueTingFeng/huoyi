import axios from 'axios'
import { Modal } from 'view-design'
import store from '@/store'
import { getToken } from '@/utils/auth'

export function request(config){
	//创建axios实例
	const service = axios.create({
	// axios中请求配置有baseURL选项，表示请求URL公共部分

	baseURL: 'https://huoyi.pblog.top',
	withCredentials: true, // 开启跨域
	timeout: 5000, // 请求超时时间
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	},

})

// request拦截器
	service.interceptors.request.use(config => {
		// 是否需要设置 token
		const isToken = (config.headers || {}).isToken === false
		if (getToken() && !isToken) {
			config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
		}
		return config
	}, error => {

		Promise.reject(error)
	})

// 响应拦截器
	service.interceptors.response.use(res => {
			const code = res.status
			if (code !== 200) {
				Modal.error({
					title: '提示',
					content: 'msg'
				});
				return Promise.reject('error')
			} else {
				return res.data
			}
		},
		error => {
			console.log('err' + error)
			let {message} = error;
			if (message == "Network Error") {
				message = "后端接口连接异常";
			} else if (message.includes("timeout")) {
				message = "系统接口请求超时";
			} else if (message.includes("Request failed with status code")) {
				message = "系统接口" + message.substr(message.length - 3) + "异常";
			}
			Modal.error({
				title: '提示',
				content: 'msg'
			});
			return Promise.reject(error)

		}
	)
	return service(config)
}


