/* 登录 */
const login = {
	"user": {
	  "userId": 2,
	  "username": "admin",
	  "nickName": "管理员",
	  "phone": "13965884236",
	  "email": "785745628@qq.com",
	  "avatar": 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg',
	  "state": 0
	},
  "token": "Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.O7M0YWC5jYEQK-OBlNqdBWuTXrEc3B63uJNHJVq"
}
/* 获取用户信息 */
const userInfo = {
  "code": 0,
  "msg": "",
  "data": {
    "userId": 2,
    "username": "admin",
    "nickName": "管理员",
    "phone": "13965884236",
    "email": "785745628@qq.com",
    "state": 0
  }
}
/*星标项目*/
const starPro = [
    {"id": 1,"title": "项目1","status": {id:1,name:'产品(任务)计划'},"star": 5,"creator": "周杰","progress": "4/8","date": "2020-09-10","area": "台州 路桥","optman": "何峰添","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
    {"id": 2,"title": "项目2","status": {id:2,name:'前期设计'},"star": 4,"creator": "张深一","progress": "6/8","date": "2020-09-23","area": "台州 黄岩","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 3,"title": "项目3","status": {id:2,name:'前期设计'},"star": 5,"creator": "张深一","progress": "4/8","date": "2020-09-10","area": "台州 椒江","optman": "何峰添","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 4,"title": "项目4","status": {id:2,name:'前期设计'},"star": 4,"creator": "戴傲天","progress": "5/8","date": "2020-10-23","area": "台州 路桥","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 5,"title": "项目5","status": {id:2,name:'准备发布'},"star": 5,"creator": "柳建成","progress": "4/8","date": "2020-11-01","area": "台州 仙居","optman": "何峰添","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 6,"title": "项目6","status": {id:5,name:'前期设计'},"star": 4,"creator": "张深一","progress": "6/8","date": "2020-06-23","area": "台州 黄岩","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 7,"title": "项目7","status": {id:2,name:'前期设计'},"star": 5,"creator": "周杰","progress": "4/8","date": "2020-08-10","area": "台州 温岭","optman": "何峰添","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 8,"title": "项目8","status": {id:1,name:'产品(任务)计划'},"star": 4,"creator": "张深一","progress": "6/8","date": "2020-09-23","area": "台州 临海","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 9,"title": "项目9","status": {id:1,name:'产品(任务)计划'},"star": 5,"creator": "周杰","progress": "4/8","date": "2020-05-10","area": "台州 三门","optman": "何峰添","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 10,"title": "项目10","status": {id:1,name:'产品(任务)计划'},"star": 4,"creator": "张深一","progress": "6/8","date": "2020-09-23","area": "台州 黄岩","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 11,"title": "报警信息新页面21","status": {id:3,name:'正在研发'},"star": 5,"creator": "周杰","progress": "4/8","date": "2020-09-10","area": "台州 路桥","optman": "何峰添","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 12,"title": "项目12","status": {id:5,name:'准备发布'},"star": 4,"creator": "张深一","progress": "6/8","date": "2020-01-23","area": "台州 黄岩","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 13,"title": "项目13","status": {id:4,name:'测试'},"star": 4,"creator": "张深一","progress": "6/8","date": "2020-09-23","area": "台州 玉环","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 14,"title": "vue U框架评估81","status": {id:3,name:'正在研发'},"star": 5,"creator": "周杰","progress": "4/8","date": "2020-08-10","area": "台州 路桥","optman": "何峰添","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 15,"title": "项目15","status": {id:4,name:'测试'},"star": 4,"creator": "张深一","progress": "6/8","date": "2020-09-23","area": "台州 黄岩","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 16,"title": "vue U框架评估82","status": {id:4,name:'测试'},"star": 4,"creator": "张深一","progress": "6/8","date": "2020-04-23","area": "台州 天台","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 17,"title": "项目17","status": {id:3,name:'正在研发'},"star": 5,"creator": "周杰","progress": "4/8","date": "2020-09-10","area": "台州 路桥","optman": "何峰添","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
		{"id": 18,"title": "vue U框架评估22","status": {id:5,name:'准备发布'},"star": 4,"creator": "张深一","progress": "6/8","date": "2020-03-23","area": "台州 仙居","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"}
	]
/* 星标任务 */
const starTask = [
    {
      "id": 1,
      "title": "vue U框架评估",
      "star": 4,
      "creator": "周杰",
      "state": {
        "id": 4,
        "name": "进行中"
      },
      "progress": "1/4",
      "endTime": "10月7号截止",
      "optman": "沈达一"
    },
    {
      "id": 2,
      "title": "报警信息新页面",
      "star": 4,
      "creator": "张雨城",
      "state": {
        "id": 4,
        "name": "进行中"
      },
      "progress": "1/4",
      "endTime": "10月10号截止",
      "optman": "沈达一"
    },
    {
      "id": 3,
      "title": "PAD软件",
      "star": 4,
      "creator": "钱任书",
      "state": {
        "id": 4,
        "name": "进行中"
      },
      "progress": "1/4",
      "endTime": "10月10号截止",
      "optman": "沈达一"
    },
    {
      "id": 4,
      "title": "待生产任务排序",
      "star": 4,
      "creator": "钱任书",
      "state": {
        "id": 4,
        "name": "进行中"
      },
      "progress": "4/8",
      "endTime": "10月10号截止",
      "optman": "沈达一"
    },
    {
      "id": 5,
      "title": "redis可视化网页开发",
      "star": 4,
      "creator": "钱任书",
      "state": {
        "id": 4,
        "name": "进行中"
      },
      "progress": "4/8",
      "endTime": "10月10号截止",
      "optman": "沈达一"
    },
    {
      "id": 5,
      "title": "3.0 mina切换netty",
      "star": 4,
      "creator": "钱任书",
      "state": {
        "id": 4,
        "name": "进行中"
      },
      "progress": "4/8",
      "endTime": "10月10号截止",
      "optman": "沈达一"
    },
    {
      "id": 5,
      "title": "Sim卡管理",
      "star": 4,
      "creator": "钱任书",
      "state": {
        "id": 4,
        "name": "进行中"
      },
      "progress": "4/8",
      "endTime": "10月10号截止",
      "optman": "沈达一"
    },
    {
      "id": 5,
      "title": "报警信息新页面",
      "star": 4,
      "creator": "钱任书",
      "state": {
        "id": 4,
        "name": "进行中"
      },
      "progress": "4/8",
      "endTime": "10月10号截止",
      "optman": "沈达一"
    }
  ]
/*星标人员*/
const starPerson = [
    {"id": 1,"isLeader": true,"out": true,"star": 5,"head": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg","name": "张美兰"},
    {"id": 2,"isLeader": true,"out": false,"star": 3,"head": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg","name": "柳建成"},
	{"id": 3,"isLeader": false,"out": false,"star": 3,"head": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg","name": "钱深"},
	{"id": 4,"isLeader": false,"out": false,"star": 2,"head": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg","name": "何峰添"},
]
/*我的*/
const myData = [
  {"id": 1,"status": {id:1,name:'进行中'},"pause":false,"title": 'vue UI框架评估',"star": 5,"creator": "张雨凡","progress": "4/8","date": "12月10号","optman": "沈达一"},
  {"id": 2,"status": {id:1,name:'进行中'},"pause":false,"title": '3.0 mina切换netty',"star": 4,"creator": "张雨凡","progress": "4/8","date": "12月7号","optman": "沈达一"},
	{"id": 3,"status": {id:1,name:'进行中'},"pause":true,"title": 'vue UI框架评估',"star": 4,"creator": "张雨凡","progress": "4/8","date": "12月7号","optman": "沈达一"},
	{"id": 4,"status": {id:2,name:'未开始'},"pause":false,"title": 'pda扫码优化',"star": 2,"creator": "张雨凡","progress": "0/8","date": "10月1号","optman": "沈达一"},
	{"id": 5,"status": {id:2,name:'未开始'},"pause":false,"title": '报警信息新页面',"star": 1,"creator": "张雨凡","progress": "0/8","date": "11月10号","optman": "李春兰"},
	{"id": 6,"status": {id:2,name:'未开始'},"pause":false,"title": 'sim卡管理',"star": 2,"creator": "张雨凡","progress": "0/8","date": "12月7号","optman": "赵可馨"},
	{"id": 7,"status": {id:3,name:'待接收'},"pause":false,"title": '设备整车巡检估',"star": 2,"creator": "张雨凡","progress": "0/2","date": "10月10号","optman": "沈达一"},        
  {"id": 8,"status": {id:4,name:'已完成'},"pause":false,"title": '设备整车巡检估',"star": 2,"creator": "张雨凡","progress": "2/2","date": "10月10号","optman": "沈达一"},
  {"id": 9,"status": {id:4,name:'已完成'},"pause":false,"title": 'redis可视化网页开发',"star": 3,"creator": "张雨凡","progress": "4/4","date": "10月10号","optman": "沈达一"},
  {"id": 10,"status": {id:4,name:'已完成'},"pause":false,"title": '故障报表',"star":4,"creator": "张雨凡","progress": "8/8","date": "12月7号","optman": "沈达一"}
]
/*我参与项目*/
const myPro = [
  {"id": 1,"title": "项目1","star": 5,"creator": "周杰","progress": "4/8","date": "2020-09-10","area": "台州 路桥","optman": "何峰添","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
	{"id": 6,"title": "项目6","star": 4,"creator": "张深一","progress": "6/8","date": "2020-06-23","area": "台州 黄岩","optman": "张美兰","man1":"周杰","content1":"项目中间对接进行中","time1": "09.28 12:00","man2":"张美兰","content2":"项目增加望申请延迟1天","time2": "10.11 12:00"},
]
/* 通知信息 */
const notice = [
	{id:1,title:'设备机台制作二维码，先出设计',createBy:'沈达一',createTime:'2020-11-09 10:26:32'},
	{id:2,title:'平台时间轴样式更改',createBy:'张芹汐',createTime:'2020-11-09 09:46:39'}
]
export default {
	login,
	userInfo,
	starPro,
	starTask,
	starPerson,
	myData,
	myPro,
	notice
}