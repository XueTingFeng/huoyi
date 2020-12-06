<template>
	<div class="page">
		<Form ref="formInline" :model="formItem" inline :label-width="70" class="form">
			<div class="rfloat">
				<FormItem label="团队">
					<Select v-model="formItem.dept" style="width: 150px;" @change="teamchange">
						<Option :value="item.teamId" v-for="(item,index) in team">{{item.teamName}}</Option>
<!--						<Option value="软件部">软件部</Option>-->
					</Select>
				</FormItem>
				<FormItem label="地区">
					<Select v-model="formItem.area" style="width: 150px;">
						<Option value="reg.placeid" v-for="(reg,index) in region">{{reg.placeName}}</Option>
<!--						<Option value="台州 黄岩">台州 黄岩</Option>-->
<!--						<Option value="台州 路桥">台州 路桥</Option>-->
<!--						<Option value="台州 临海">台州 临海</Option>-->
<!--						<Option value="台州 温岭">台州 温岭</Option>-->
<!--						<Option value="台州 玉环">台州 玉环</Option>-->
<!--						<Option value="台州 天台">台州 天台</Option>-->
<!--						<Option value="台州 仙居">台州 仙居</Option>-->
<!--						<Option value="台州 三门">台州 三门</Option>-->
					</Select>
				</FormItem>
				<FormItem label="优先级">
					<Select v-model="formItem.level" style="width: 150px;">
						<Option value="非常紧急">非常紧急</Option>
						<Option value="紧急">紧急</Option>
						<Option value="正常">正常</Option>
					</Select>
				</FormItem>
				<FormItem label="关键字">
					<Input class="search" v-model="formItem.title" @keyup.enter.native="handleSubmit()" suffix="ios-search" placeholder="搜索"/>
				</FormItem>
				<Button type="primary" @click="handleSubmit()">确定</Button>
			</div>
		</Form>

    <div class="mflex xtitle"><img :src="require('@/assets/images/home/star.png')" v-model="modal">星标项目</div>
    <div class="grid">
      <div class="ucard red-lbd" @click="openPro(item)" :class="['red-lbd','yel-lbd','blu-lbd'][index%3]" v-for="(item,index) in starPro" :key="index">
        <div class="uflex">

          <!--星标项目：项目标题-->
          <div class="btxt">{{item.name}}</div>
          <img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">
        </div>

        <!--星标项目星星：iview的rate评分ui-->
        <Rate disabled show-text v-model="item.priority"  custom-icon="iconfont hy-star">
          <span class="mr8">发起人</span>

          <!--星标项目：发起人姓名-->
          <span  class="username">{{item.initiator}}</span>
        </Rate>

        <!--        星标项目：进度条-->
        <Progress :percent="parseInt(item.nodeOrder)/parseInt(item.nodeSum)*100" :stroke-width="8">
          <span>{{item.progress}}</span>
        </Progress>

        <div class="uflex mtb10">
          <!--星标项目：日期：几个月以前-->
          <div class="col3 obtn uels">{{parseTime(item.release_time)}}</div>
          <!--星标项目：地区-->
          <div class="col3 sbtn uels">{{item.place}}</div>
          <!--星标项目：执行者-->
          <div class="col3 sbtn uels">{{item.principal}}</div>
        </div>

        <div class="flex">
          <!--星标项目：项目动态-->
          <div class="key">周杰：</div>
          <div class="flex1 uels">项目中间对接进行中</div>
          <div>09.28 12:00</div>
        </div>
        <div class="flex">
          <div class="key uels">张美兰：</div>
          <div class="flex1 uels">项目增加望申请延迟1天</div>
          <div>10.11 12:00</div>
        </div>
      </div>



    </div>

    <div class="more" @click="getMore()">查看更多<Icon type="md-arrow-dropdown" size="24"/></div>

    <div class="mflex xtitle" style="position: relative;left: -8px;"><img :src="require('@/assets/images/home/star.png')">星标任务</div>
    <div class="grid">
      <div class="ucard flex " :class="['red-bd','blu-bd'][index%2]" v-for="(item,index) in starTask" :key="index" >
        <div class="lfbox">
          <Icon type="md-arrow-dropdown" size="24"/>

          <!--星标任务：侧面的任务状态-->
          <div class="state">{{item.status}}</div>
        </div>
        <div class="flex1">
          <div class="uflex">

            <!--星标任务:标题-->
            <div >{{item.name}}</div>
            <img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">
          </div>
          <Rate disabled show-text v-model="item.priority"  custom-icon="iconfont hy-star">
            <span class="mr8">发起人</span>

            <!--星标任务：发起人-->
            <span>{{item.sponsor}}</span>
          </Rate>


          <div class="mflex mt5">

            <!--星标任务：截至时间.split(" ",10)-->
            <div class="obtn uels">{{item.endTime.split(" ")[0]}}</div>

            <!--星标任务：执行人-->
            <div class="sbtn pd15 uels" v-for="(item,index) in proExecutor" :key="index">{{item.username}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--星标人员-->
    <div class="mflex xtitle"><img :src="require('@/assets/images/home/star.png')">星标人员</div>
    <div class="grid">
      <div class="ucard pointer" @click="open" v-for="(item,index) in starPerson" :key="index">

        <!--星标人员：判断外出-->
        <div v-if="item.status" class="abs">
          <Icon type="ios-briefcase-outline" size="22"/>
          <span>外出中...</span>
        </div>
        <div class="uflex baseline">

          <!--星标人员：忙碌度-->
          <Rate class="rates" v-model="item.saturation" disabled icon="ios-square" />
          <div class="mt10">
            <Badge>

              <!--星标人员：头像-->
              <Avatar shape="square" :src="item.avatar" size="54" />
              <div class="round" slot="count">
                <div class="ins"></div>
              </div>
            </Badge>

            <!--星标人员：姓名-->
            <div class="text">{{item.userName}}</div>
          </div>
          <div class="textr">

            <!--星标人员：判断组长-->
            <span v-if="item.isLeader" class="group">组长</span>
            <img class="img" @click.stop="cancel(item.userId)" :src="require('@/assets/images/home/Collection.png')">
          </div>
        </div>

        <!--星标人员：参与的项目-->
        <div class="flex" v-for="(value,index) in item.project">
          <div class="w50 uels"><!--项目1-->{{value.name}}</div>
          <div class="flex1 uels"><!--调整产能参数结构-->{{value.taskName}}</div>
          <div><!--截至10.11 12:00-->{{value.taskEndTime}}</div>
        </div>
        <!--				<div class="flex">-->
        <!--					<div class="w50 uels">项目2</div>-->
        <!--					<div class="flex1 uels">新能企业走访调查</div>-->
        <!--					<div>截至10.11 12:00</div>-->
        <!--				</div>-->
      </div>



    </div>
    <!-- 星标项目弹窗 -->
    <Modal v-model="modal" class="modal" scrollable :title="proInfoName" :footer-hide="true" width="1200">
      <div class="mdflex">
        <div class="lbox">
          <div class="grid">
            <div class="col2 rbord">
              <div class="flex mb10">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Node.png')">节点</div>
                <div class="flex1 uels">{{node}}</div>
              </div>
              <div class="flex mb10">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Time.png')">截止时间</div>
                <div class="flex1 uels">{{end_time}}</div>
              </div>
              <div class="flex mb10">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Remarks.png')">备注</div>
                <div class="flex1 uels">{{remarks}}</div>
              </div>
              <div class="flex mb10">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Label.png')">标签</div>
                <div class="flex1 uels">{{tag}}</div>
              </div>
              <div class="flex">
                <div class="col2 mflex"><Icon type="ios-pin-outline" size="24" style="margin-left: -4px;margin-right: 5px;"/>地区</div>
                <div class="flex1 uels">{{place}}</div>
              </div>
            </div>
            <div class="col2">
              <div class="flex mb10 ml">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Initiate.png')">发起者</div>
                <div class="flex1 uels"><div class="checkbox"></div><span>{{proInfoInitiatorName}}</span></div>
              </div>
              <div class="flex mb10 ml">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Team.png')">团队</div>
                <div class="flex1 uels">{{proInfoTeam}}</div>
              </div>
              <div class="flex mb10 ml">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/priority.png')">优先级</div>
                <div class="flex1 uels" style="margin-top: -5px;">

                  <!--弹窗：项目优先级-->
                  <Rate disabled v-model="proInfoPriority" custom-icon="iconfont hy-star"></Rate>
                </div>
              </div>
              <div class="flex mb10 ml">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Plan.png')">计划完成时间</div>
                <div class="flex1 uels">{{complete_time}}</div>
              </div>
              <div class="flex mb10 ml">
                <div class="col2"><img class="micon" :src="require('@/assets/images/detail/Person.png')">负责人</div>
                <div class="flex1 uels">{{proInfoPrincipal}}</div>
              </div>
            </div>
          </div>


          <Form ref="formInline" :model="formItem" inline :label-width="70" class="form mt5">
            <div class="lfloat mflex">
              <img class="img" :src="require('@/assets/images/detail/Task.png')"><span class="mr8">任务</span> 0 / 2
            </div>
            <div class="rfloat">
              <FormItem label="执行者">
                <Input class="mdinput" size="small" placeholder="执行者" style="width: 100px" />
              </FormItem>
              <FormItem label="关键字">
                <Input class="mdinput" size="small" search @on-search="search" suffix="ios-search" placeholder="搜索" style="width: 100px" />
              </FormItem>
            </div>
          </Form>





          <perfect-scrollbar>


            <div class="wbox">
            <div class="ucard flex" v-for="(item,index) in proInfoTask" :key="index">
              <div class="lfbox">
                <Icon type="md-arrow-dropdown" size="24"/>
                <div class="state">{{item.status}}</div>
              </div>
              <div class="flex1 mg30">
                <div class="uflex">
                  <div>{{item.name}}</div>

                </div>
                								<Rate disabled show-text v-model="item.priority"  custom-icon="iconfont hy-star">
                									<span class="mr8">发起人</span>
                									<span>{{item.sponsor}}</span>
                								</Rate>

                <div class="flex mt5">
                  <div class="obtn uels redbtn pd15">{{item.endTime}}截止</div>
                  <div class="sbtn pd15 uels mlr" v-for="(item,index) in proExecutor" :key="index">{{item.username}}</div>
                </div>
              </div>
              <img class="img mr20" :src="require('@/assets/images/home/Collection.png')">
            </div>


          </div>
          </perfect-scrollbar>








            <div class="addbox mflex"><Icon type="md-add" size="24"/>添加任务</div>
          <div class="mflex mtb10" style="margin-top: 20px;">
            <img class="micon" :src="require('@/assets/images/detail/Milestone.png')">节点里程碑
          </div>
          <div class="mflex mstep">
            <Tooltip placement="top-start">
              <img class="step-icon" :src="require('@/assets/images/detail/Complete.png')">
              <div slot="content">
                <div class="flex mb10">
                  <div class="w70">执行者</div>
                  <div class="flex1 uels">沈达一</div>
                </div>
                <div class="flex mb10">
                  <div class="w70">状态</div>
                  <div class="flex1 uels">产品研发</div>
                </div>
                <div class="flex mb10">
                  <div class="w70">所需文件</div>
                  <div class="mflex flex1 uels">
                    <Input class="mr8 wbold" size="small" placeholder="产品计划书">
                      <Icon custom="iconfont hy-download" slot="suffix" />
                    </Input>
                    <Icon type="ios-checkmark-circle" size="24" color="#006FFF"/>
                  </div>
                </div>
              </div>
            </Tooltip>
            <div class="flex1 live"></div>
            <Tooltip placement="top-start">
              <img class="step-icon" :src="require('@/assets/images/detail/No.png')">
              <div slot="content">
                <div class="flex mb10">
                  <div class="w70">执行者</div>
                  <div class="flex1 uels">沈达一</div>
                </div>
                <div class="flex mb10">
                  <div class="w70">状态</div>
                  <div class="flex1 uels">产品研发</div>
                </div>
                <div class="flex mb10">
                  <div class="w70">时间</div>
                  <div class="flex1 uels">2020年9月29日</div>
                </div>
                <div class="flex mb10">
                  <div class="w70">所需文件</div>
                  <div class="flex1 uels"><Icon custom="iconfont hy-no" size="24" /></div>
                </div>
              </div>
            </Tooltip>

            <div class="flex1 live"></div>
            <Tooltip placement="top-start">
              <img class="step-icon" :src="require('@/assets/images/detail/not-unactive.png')">
              <div slot="content">
                <div class="flex mb10">
                  <div class="w70">执行者</div>
                  <div class="flex1 uels">沈达一</div>
                </div>
                <div class="flex mb10">
                  <div class="w70">状态</div>
                  <div class="flex1 uels">产品研发</div>
                </div>
                <div class="flex mb10">
                  <div class="w70">时间</div>
                  <div class="flex1 uels">2020年9月29日</div>
                </div>
                <div class="flex mb10" style="align-items: flex-start;">
                  <div class="w70">所需文件</div>
                  <div class="flex1 uels">
                    <div>测试报告1</div>
                    <div>测试报告2</div>
                  </div>
                </div>
                <div class="mflex" style="margin-left: 45px;">
                  <Icon class="mr8" style="margin-top: -8px;" custom="iconfont hy-duowenjianjia" />
                  <Upload
                      multiple
                      action="//jsonplaceholder.typicode.com/posts/">
                    <Input class="wbold pointer" size="small" placeholder="上传文件">
                      <Icon type="md-add" slot="prefix" size="20"/>
                    </Input>
                  </Upload>
                </div>
              </div>
            </Tooltip>
            <div class="flex1 unlive"></div>
            <img class="step-icon" style="cursor: default;" :src="require('@/assets/images/detail/No-unactive.png')">
          </div>
          <div class="uflex mt5" >

            <div v-for="(item,index) in proInfoNode" :key="index">{{item.node_name}}</div>
<!--            <div>产品研发</div>-->
<!--            <div>测试</div>-->
<!--            <div>发布跟踪</div>-->
          </div>
        </div>
        <div class="rbox">
          <div class="rhead">
            <div class="btxt">参与者<span class="num">2</span></div>

            <div class="mflex mt5">
              <Avatar  v-for="(item,index) in proInfoUser" :key="index" shape="square" class="mr8" src="item.avatar" />
<!--              <Avatar shape="square" class="mr8" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />-->
              <span class="plus"><Icon type="md-add" size="24"/></span>
            </div>
          </div>
          <div class="rbody">
            <Form ref="formInline" :model="formItem" inline :label-width="70" class="form">
              <div class="lfloat mflex btxt">
                <span class="mr8">所有动态</span>

                <Poptip placement="bottom-start" v-model="visible" width="400">
                  <img class="img mt5 pointer" :src="require('@/assets/images/detail/File.png')">
                  <div class=" " slot="content">
                    <div class="theader">
                      <span>保存到文件夹</span>
                      <Icon type="md-close" size="24" class="pointer" @click="visible = false"/>
                    </div>
                    <div class="tbody">
                      <ly-tree></ly-tree>
                    </div>
                  </div>
                </Poptip>
              </div>
              <div class="rfloat">
                <FormItem label="执行者">
                  <Input class="mdinput" size="small" placeholder="执行者" style="width: 100px" />
                </FormItem>
                <FormItem label="关键字">
                  <Input class="mdinput" size="small" search @on-search="search" suffix="ios-search" placeholder="搜索" style="width: 100px" />
                </FormItem>
              </div>
            </Form>
            <div class="uflex">
              <div class="mflex flex1 uels">
                <img class="micon" :src="require('@/assets/images/detail/Dynamic.png')">沈达一
                <span class="ml20 ml">在项目</span>
                <span class="ml">数字化项目</span>
                <span class="ml">下创建了任务</span>
              </div>
              <div class="uflex">今天10:00</div>
            </div>
            <div class="uflex blue-txt">设备机台制作二维码，先出设计</div>




            <div class="uflex mt15" v-for="(item,index) in proInfoAct" :key="index">
              <div class="mflex flex1 uels">
                <span class="ml20">{{item.member_name}}</span>
                <span class="ml">{{item.dynamic_content}}</span>
<!--                <span class="ml">张明成</span>-->
              </div>
              <div class="uflex">{{item.release_time}}</div>
            </div>


<!--            <div class="uflex mt15">-->
<!--              <div class="mflex flex1 uels">-->
<!--                <span class="ml20">沈达一</span>-->
<!--                <span class="ml">更新任务状态为发布成功</span>-->
<!--              </div>-->
<!--              <div class="uflex">今天10:01</div>-->
<!--            </div>-->
          </div>
          <div class="foot">
            <div class="btxt">@提及他人，按Ctrl+Enter 快速发布</div>
            <Button type="primary" @click="release" class="rfloat">发布</Button>
          </div>
        </div>
      </div>
    </Modal>
		<!-- 星标人员弹窗 -->
		<Modal v-model="empModal" scrollable title="成员任务" :footer-hide="true" width="900">
			<div class="modal">
				<div class="grid">
					<div class="col3">
						<div class="uflex mtm">
							<div class="btxt">进行中<span class="ml">6</span></div>
						</div>
					</div>
					<div class="col3">
						<div class="uflex mtm">
							<div class="btxt">未开始<span class="ml">6</span></div>
						</div>
					</div>
					<div class="col3">
						<div class="uflex mtm">
							<div class="btxt">待接收<span class="ml">6</span></div>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="col3" v-for="(tasks,index) in userTasks">
						<perfect-scrollbar>
							<div class="ucard flex red-bd" v-for="(task,value) in userTasks[index]">
								<div class="lfbox">
									<Icon type="md-arrow-dropdown" size="24"/>
									<div class="state">{{ (task.status==0)?("未接收"):((task.status==1)?("未开始"):("进行中"))}}</div>
								</div>
								<div class="flex1">
									<div class="uflex">
										<div><!--项目99-->{{task.name}}</div>
										<img class="img" :src="require('@/assets/images/home/Collection.png')">
									</div>
<!--									<Rate disabled v-model="valueText" custom-icon="iconfont hy-star"></Rate>-->
                  <Rate disabled show-text v-model="task.priority"  custom-icon="iconfont hy-star"></Rate>
									<div class="flex mt5">
										<div class="obtn uels"><!--10月10号截止-->{{task.endTime.split(" ")[0]}}</div>
										<div class="sbtn pd15 uels"><!--周文杰-->{{task.sponsor}}</div>
									</div>
								</div>
								
							</div>

						</perfect-scrollbar>
					</div>

				
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getPage } from "@/api/data";
  import {
    getStarTask,
    getStarPro,
    getStarPerson,
    getUserTasks,
    getRegion,
    getTeam,
    screeningStro,
      getStarProInfo
  } from "../utils/rq-star";
  export default {
		data() {
			return {
				params:{
					page:0,
					limit:10
				},
				formItem: {
					dept: '硬件部',
					area:'',
					level:'非常紧急',
					title:''
				},
				starPro:[],
        executor: [],
        initiator: [],
        name:[],

				starTask:[],
        status: [],
        sponsor: [],
        principal: [],
        endTime: [],

				starPerson:[],
        userTasks:[],
        team:[],
        region:[],
				proInfo:{},


        node:[],
        end_time:[],
        remarks:[],
        tag:[],
        place:[],

        proInfoName:[],
        proInfoTask:[],
        proInfosponsor:[],
        proInfoTeam:[],
        proInfoPriority:[],
        complete_time:[],
        proInfoPrincipal:[],
        proInfoNode:[],
        proInfoUser:[],
        proInfoAct:[],
        proExecutor:[],

        valueText: 3,
				modal: false,
				empModal: false,
				visible: false,
				isEdit: false,
			}
		},
		created() {
			this.$nextTick(() => {
				// this.loadData()
			});

			//获取星标任务多个数据
			 getStarTask().then( res => {
			   // console.log(res)
         this.starTask = res.data

         //获取星标任务状态，判断状态
         for(let i=0;i<this.starTask.length;i++){

           let task = this.starTask[i];
           //console.log(task);
           if(task.status===0){
             this.starTask[i].status='未开始'
           }else if(task.status===1){
             this.starTask[i].status='进行中'
           }else if(task.status===2){
             this.starTask[i].status='待接收'
           }else if(task.status===3){
             this.starTask[i].status='已完成'
           }
         }


       })

      getStarPro().then(res => {
        this.starPro = res.data
        this.name=res.data.name
      })
      //axios获取星标人员
      getStarPerson().then(res => {
        this.starPerson=res.data
      })

      //获取团队
      getTeam().then(res => {
        this.team=res.data
      })
      //获取地区
      getRegion().then(res => {
        this.region=res.data
      })
		},

    methods: {
			// 初始化数据
			// loadData() {
			// 	// this.getStarPro()
			// 	this.getStarTask()
			// 	// this.getStarPerson()
			// },
			//点击查看更多
			getMore(){
				this.params.page +=1
				this.$mock('starPro').then(res => {
					let data = res.slice(this.params.page*10,this.params.page+20)
					if(data&&data.length>0){
						this.starPro = this.starPro.concat(data)
					}else{
						this.$Message.info('没有更多数据了!')
					}
				}).catch()
			},
      teamchange(){
			  console.log('dgadsf')
      },
			//条件查询确定按钮事件
			handleSubmit(){
				this.params.page =1
				this.starPro = []
				//this.getStarPro()
        screeningStro(this.formItem).then(res => {
					// let newData=res.filter(item=>{
            let newData=res.data.filter(item=>{
						if(this.formItem.title&&!this.formItem.area){
							return item.title.indexOf(this.formItem.title)>-1
						}else if(!this.formItem.title&&this.formItem.area){
							return item.area===this.formItem.area
						}else if(!this.formItem.title&&this.formItem.area){
							return item.title.indexOf(this.formItem.title)>-1&&item.area===this.formItem.area
						}else{
							return item
						}
					})
					this.starPro = newData.slice(0,10)||[]
				}).catch()
			},
			cancel(id){
				this.$Modal.confirm({
					title: '确认取消？',
					onOk: () => {
						this.$Message.info('点击取消!')
					}
				});
			},
			// 星标项目弹窗
			openPro(info){
				this.proInfo = info
				this.modal = true
        getStarProInfo().then(res => {
          this.proInfoName = res.data[0].name
          this.node = res.data[0].node
          this.end_time = res.data[0].end_time
          this.remarks = res.data[0].remarks
          this.tag = res.data[0].tag
          this.place = res.data[0].place

          this.proInfoTask = res.data[1]
          this.proInfoInitiatorName = res.data[0].initiatorName
          this.proInfoTeam = res.data[0].team
          this.proInfoPriority = res.data[0].priority
          this.complete_time = res.data[0].complete_time
          this.proInfoPrincipal = res.data[0].principal
          this.proInfoNode = res.data[3]
          this.proInfoUser = res.data[2]
          this.proInfoAct = res.data[4]

          this.proExecutor = res.data[1].executor

          for(let i=0;i<this.proInfoTask.length;i++){

            let task = this.proInfoTask[i];
            //console.log(task);
            if(task.status===0){
              this.proInfoTask[i].status='未开始'
            }else if(task.status===1){
              this.proInfoTask[i].status='进行中'
            }else if(task.status===2){
              this.proInfoTask[i].status='待接收'
            }else if(task.status===3){
              this.proInfoTask[i].status='已完成'
            }
          }
        })


			},
			// 星标人员弹窗
			open(){
				this.empModal = true
        //axios获取成员任务
        getUserTasks().then(res => {
          this.userTasks=res.data
        })
			},
			search(){
				console.log('搜索')
			},

			release(){
				console.log('release')
				this.modal = false
			},
			renderContent (h, { root, node, data }) {
				return h('span', {
						style: {
								display: 'inline-block',
								width: '100%'
						}
				}, [
						h('span', [
								h('Icon', {
										props: {
												type: 'ios-paper-outline'
										},
										style: {
												marginRight: '8px'
										}
								}),
								h('span', data.title)
						]),
						h('span', {
								style: {
										display: 'inline-block',
										float: 'right'
								}
						}, this.isEdit?[
								h('Icon', {
										props: {
												type: 'ios-paper-outline'
										},
										style: {
												marginRight: '8px'
										}
								}),
								h('input', ''),
								h('Icon', {
										props: {
												type: 'md-close'
										},
										style: {
												marginRight: '8px'
										},
										on: {
												click: () => { this.append(data) }
										}
								}),
								h('Icon', {
										props: {
												type: 'md-checkmark'
										},
										style: {
												marginRight: '8px'
										},
										on: {
												click: () => { this.remove(root, node, data) }
										}
								})
						]:[])
				]);

			},
		}
	}
</script>

<style lang="scss" scoped>
.grid>.ucard{
	width: calc(20% - 12px);
	margin-left: 15px;
}
.grid>.ucard:nth-child(5n+1){margin-left: 0;}
.form{height: 40px;}
.ivu-rate,.ivu-progress{display: block;text-align: left;}
::v-deep .red-lbd .ivu-progress-bg {background-color: #FF005E;}
::v-deep .yel-lbd .ivu-progress-bg {background-color: #FCA13E;}
::v-deep .blu-lbd .ivu-progress-bg {background-color: #006FFF;}
::v-deep .red-bd .ivu-progress-bg {background-color: #fff;}
::v-deep .blu-bd .ivu-progress-bg {background-color: #fff;}

::v-deep .ivu-rate-text{float: right;margin-left:0;margin-top: 5px;}
::v-deep .ivu-progress-text{float: right;color: #fff;}
::v-deep .ivu-rate-star-chart{margin-right: 0;}
::v-deep .ivu-rate-star-full .ivu-icon {color: #fff;}
::v-deep .ivu-rate-star-zero .ivu-icon {color: #494E59;}
::v-deep .rates .ivu-rate-star-full .ivu-icon {color: #FCA13E;}
::v-deep .rates .ivu-rate-star-zero .ivu-icon {color: #4E3F36;}
::v-deep .ivu-progress-inner {background-color: #141E33;}

::v-deep .input .ivu-input{background-color: #0F182A;color: #fff;text-align: left;}
::v-deep .search .ivu-input{background-color: #0F182A;border: none;color: #fff;}
::v-deep .mdinput .ivu-input{background-color: #141E33;border-color: #324364;color: #fff;}

::v-deep .ivu-form .ivu-form-item-label{color: #fff;}
::v-deep .form .ivu-form-item{margin-bottom: 0;}
.square,.rates{display: inline-block}
::v-deep .square .ivu-icon-ios-square{font-size: 16px;}
::v-deep .square .ivu-rate-star-chart{margin-right: 2px;}
::v-deep .rates .ivu-icon-ios-square{font-size: 12px;vertical-align: text-top;}
::v-deep .rates .ivu-rate-star-chart{margin-right: 1px;}
::v-deep .wbold .ivu-input{border: 1px solid #2C3B59;border-radius: 3px;background-color: #0C1321;}
.more{
	float: right;
	position:relative; right:50%;bottom: 8px;
	text-align: center;
	padding: 2px 27px 0 35px;
	background-color: #0C1321;
	border-radius: 6px;
	cursor: pointer;
	z-index: 99;
}
.more .ivu-icon{vertical-align: -6px;}
.baseline{align-items: flex-start;}
.group{
	padding: 0 8px;
	margin-right: 4px;
	border-radius: 10px;
	color: #006FFF;
	border: 1px solid #006FFF;
}
::v-deep .baseline .ivu-badge-count{top:42px;right: 2px;}
.round{
	width: 14px;
	height: 14px;
	padding: 2px;
	border-radius: 50%;
	background-color: #fff;
}
.round .ins{
	width: 10px;
	height: 10px;
	border-radius: 50%;
	border: 2px solid #8CF2BB;
}
::v-deep .ivu-tree-title{color: #fff;}
::v-deep .ivu-modal-content{background-color:#0C1321;color: #fff;}
::v-deep .ivu-modal-header {border-bottom: 1px solid #324364;}
::v-deep .ivu-modal-body {padding: 0;}
::v-deep .ivu-modal-header-inner{color: #fff}
::v-deep .ivu-modal-close .ivu-icon-ios-close{color: #fff}
.modal{padding: 20px 30px 30px;}
.col3 .ps {
  height: 465px;
}
.rbord{border-right: 1px solid #324364;}
.foot{height: 95px;border-top: 1px solid #324364;padding: 20px 30px;background-color: #0C1321;}
.num{margin-left: 10px;font-weight: 700;}
.mdflex{
	display: flex;
}
.mdflex .lbox{padding: 15px;flex: 1;border-right: 1px solid #2E3E5E;background-color: #0C1321;}
.mdflex .rbox{flex: 1;background-color: #0F182A;}
::v-deep .ivu-tree-title-selected,::v-deep .ivu-tree-title:hover {
    background-color: #0B1C38;
}
.checkbox {
	display: inline-block;
	width: 25px;
	height: 25px;
	border-radius: 5px;
	background-color: #324364;
	margin-right: 15px;
	vertical-align: middle;
}	
.wbox{border: 1px solid #E6E6E9;border-radius: 8px;height: 250px}
.wbox .ucard{border-bottom: 1px solid #324364;margin-bottom:0}
.addbox{padding: 10px 20px;cursor: pointer;}
::v-deep .wbox .ivu-progress-inner {background-color: #141e33;}
::v-deep .wbox .ivu-progress-bg {background-color: #fff;}
.rhead{
	padding: 10px 20px;
	border-bottom: 1px solid #324364;
}
.rbody{padding: 5px 20px;height: 500px;}
.plus{padding: 4px;border-radius: 5px;background-color: #141E33;}
/*步骤图片*/
.step-icon{
	width: 35px;
	height: 35px;
	margin: 0 3px;
	cursor: pointer;
}
.live{height: 2px;background-color: #006FFF;}
.unlive{height: 2px;background-color: #324364;}
::v-deep .ivu-tooltip-inner {
	max-width: 340px;
	background-color: #0c1321;
	border-radius: 10px;
	border: 1px solid #2c3c5a;
}
.blue-txt{color: #006FFF;border-left: 6px solid #fff;margin-left: 75px;margin-top: 5px;}
::v-deep .ivu-select-arrow,::v-deep .ivu-input-suffix i{color: #fff;}
::v-deep .ivu-poptip-body{background-color: #0C1321;padding: 0;}
::v-deep .ivu-poptip-arrow{display: none;}
::v-deep .ivu-tree-title{
		width: 100%;
}
.theader{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	border-bottom: 1px solid #82868D;
}
.tbody{height: 300px;overflow: auto;}
/* .tfooter{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	border-top: 1px solid #82868D;
}
.new{
	display: flex;
	align-items: center;
	border: 1px solid #DEDFE1;
	border-radius: 3px;
	padding: 5px 15px;
	cursor: pointer;
} */
</style>
