'use strict'
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const port = process.env.port || 80 // 端口
const name = '内部项目管理可视化系统' // 网页标题
module.exports = {

    /* 部署应用包的基本URL */
    publicPath: "./",

    /* 生产环境构建文件的目录 defalut: dist */
    outputDir: "dist",

    /* 放置生成的静态文件目录（js css img） */
    assetsDir: "static",

    /* 是否保存时 lint 代码 */
    lintOnSave: process.env.NODE_ENV === "production",

    /* 是否使用编译器 default: false */
    runtimeCompiler: true,


    /* 生产环境的source map 可以将其设置为 false 以加速生产环境构建。*/
    productionSourceMap: false,

    configureWebpack: {
		name: name,
        resolve: {
            alias: {
				'@': resolve('src'),
                'assets': resolve('@/assets'),
                'components': resolve('@/components'),
                'views': resolve('@/views'),
            }
        }
    },

    // css相关配置
    css: {

        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,

        // 开启 CSS source maps?
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {}
    },

    devServer: {
    	open: true, //配置自动启动浏览器
    	host: 'localhost', //IP
    	port: 8081, //端口号
    	https: false,
    	hotOnly: false,
    	proxy: { // 配置跨域，打包后无效
    		"/api": {
    			target: 'http://huoyi.pblog.top',
    			changeOrigin: true, //是否允许跨越
    			ws: true, //是否代理websockets
              pathRewrite: {
                '^/api': '' //重写接口
              }
    		}
    	}, // 配置跨域处理
    	disableHostCheck: true,
    	before: app => {}
    }
};