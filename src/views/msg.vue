<template>
	<div class="page">
		<Row :gutter="16" type="flex" justify="start">
			<Col span="8">
			<div class="mcard">
				<div class="mheader">
					<div class="uflex">
						<div class="item" @click="swtClass(0)" :class="{active:cur===0}">未读</div>
						<div class="item" @click="swtClass(1)" :class="{active:cur===1}">已读</div>
						<div class="item" @click="swtClass(2)" :class="{active:cur===2}">全部通知</div>
					</div>
					<div class="icons">
						<Icon type="ios-funnel" class="mr10" size="24"/>
						<span @click="toHome()"><Icon type="md-close" size="24"/></span>
						
					</div>
				</div>
				<div class="mbody">
					<div class="msg-item" v-for="(item, index) in notice" :key="index" @click="open(item)">
						<div class="checkbox"></div>
						<div class="flex1">
							<div class="uflex">
								<div>{{item.title}}</div>
								<div class="mflex opt umt">
									<Icon @click.stop="done"  type="md-checkmark" size="24"/>
									<Icon @click.stop="close" class="ml5" type="md-close" size="24"/>
								</div>
							</div>
							<div class="mgtb">
								<span class="mr10">{{item.createBy}}</span>
								指派给了你
							</div>
							<div class="time">{{parseTime(item.createTime)}}</div>
						</div>
					</div>
				</div>
			</div>
			</Col>
			<Col v-show="show" span="16">
				<div class="mcard">
					<div class="mheader">
							<div class="uflex">
								<div class="item">
									<Icon type="ios-arrow-back" size="24"/>
									返回上级
								</div>
								<div class="item active">数据化项目</div>
							</div>
							<div class="icons">
								<Icon @click="toHome()" type="md-close" size="24"/>
							</div>
						</div>
						<div class="mbody">
							<div class="btit uels">{{vo.title}}</div>
							<div class="uflex mtl">
								<div class="label mflex">
									<img class="micon" :src="require('@/assets/images/detail/Node.png')">状态
								</div>
								<div class="flex1">发布成功</div>
							</div>
							<div class="uflex mtl">
								<div class="label mflex">
									<img class="micon" :src="require('@/assets/images/detail/Person.png')">执行者
								</div>
								<div class="flex1 uels"><div class="checkbox sm"></div><span>张明成</span></div>
							</div>
							<div class="uflex mtl">
								<div class="label mflex">
									<img class="micon" :src="require('@/assets/images/detail/Time.png')">时间
								</div>
								<div class="flex1">设置截止时间</div>
							</div>
							<div class="uflex mtl">
								<div class="label mflex">
									<img class="micon" :src="require('@/assets/images/detail/Team.png')">项目
								</div>
								<div class="flex1">数字化项目</div>
							</div>
							<div class="uflex mtl">
								<div class="label mflex">
									<img class="micon" :src="require('@/assets/images/detail/Remarks.png')">备注
								</div>
								<div class="flex1">待添加</div>
							</div>
							<div class="uflex mtl">
								<div class="label mflex">
									<img class="micon" :src="require('@/assets/images/detail/priority.png')">优先级
								</div>
								<div class="flex1">
									<span class="cbod">较低</span>
								</div>
							</div>
							<div class="uflex mtl">
								<div class="label mflex">
									<img class="micon" :src="require('@/assets/images/detail/Label.png')">标签
								</div>
								<div class="flex1">添加标签</div>
							</div>
							<div class="uflex mtl">
								<div class="label mflex">
									<img class="micon" :src="require('@/assets/images/detail/Plan.png')">计划上线时间
								</div>
								<div class="flex1">待添加</div>
							</div>
							<div class="label mflex mtl">
								<img style="margin-left: -7px;" :src="require('@/assets/images/detail/Task.png')">任务
							</div>
							<div class="wbod">
								<Icon type="md-add" size="24"/>添加任务
							</div>
							<div class="label mflex mtl">
								<img class="micon" :src="require('@/assets/images/detail/Milestone.png')">关联内容
							</div>
							<div class="wbod">
								<Icon type="md-add" size="24"/>添加文件
							</div>
							<div class="foot">
								<div class="btxt">@提及他人，按Ctrl+Enter 快速发布</div>
								<Button type="primary" class="rfloat">发布</Button>
							</div>
						</div>
						
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				notice:[],
				vo:{},
				cur:0
			}
		},
		created() {
			this.$nextTick(() => {
				this.getList()
			})
		},
		methods: {
			getList(){
				this.$mock('notice').then(res => {
					this.notice = res
				}).catch()
			},
			swtClass(i){
				this.cur = i
			},
			open(data){
				this.vo = data
				this.show = true
			},
			done(){
				this.$Message.info('已读消息!')
			},
			close(){
				this.$Message.info('关闭!')
			},
			toHome(){
				this.$router.push({path: "/"});
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{padding-top: 40px;width: 80%;margin: auto;}
.active{color: #006FFF;}
.mcard{
	background-color: #0C1321;
	border-radius: 15px;
}

.icons .ivu-icon{cursor: pointer;}
.mheader{padding:15px 20px;display: flex;justify-content: space-between;border-bottom: 1px solid #324364;}
.mbody{height: 690px;padding-bottom: 20px;}
.foot{border-top: 1px solid #324364;padding: 20px 30px;}
.item{cursor: pointer;}
.item+.item{margin-left: 30px;}
/*消息*/
.msg-item {
	display: flex;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid #324364;
	cursor: pointer;
}

.checkbox {
	display: inline-block;
	width: 25px;
	height: 25px;
	border-radius: 5px;
	background-color: #141E33;
	margin-right: 15px;
	vertical-align: middle;
}	
.sm{
	width: 20px;
	height: 20px;
	margin-right: 8px;
}
.mr10 {
	margin-right: 10px;
}

.mgtb {
	margin-top: 3px;
	margin-bottom: 8px;
}
.time {
	font-size: 10px;
}
.btit{font-size: 18px;padding-left: 30px;padding-top: 15px;}
.cbod{border: 1px solid #FEFEFE;border-radius: 4px;padding: 4px 12px;}
.wbod{display: flex;align-items: center;border: 1px solid #FEFEFE;border-radius: 4px;padding: 10px 20px;margin: 10px 30px 10px 70px;}
</style>
