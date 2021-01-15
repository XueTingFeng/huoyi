<template>
	<div class="page">
    <Form ref="formInline" :model="formItem" inline :label-width="70" class="form">
    </Form>

    <div class="mflex xtitle"><img :src="require('@/assets/images/home/star.png')" v-model="modal">星标项目
      <div>
        <Form ref="formInline" :model="formItem" inline :label-width="70" class="form">
          <div class="lfloat">
            <FormItem label="团队">
              <Select v-model="formItem.dept" style="width: 150px;" @change="teamchange">
                <Option value="全部" @click.native="allTeam" style="color: black">全部</Option>
                <Option :value="item.teamId" v-for="(item) in team" @click.native="chooseTeam(item)">{{item.teamName}}</Option>
              </Select>
            </FormItem>
            <FormItem label="地区">
              <Select v-model="formItem.area" style="width: 150px;">
                <Option value="全部" @click.native="allPlace" style="color: black">全部</Option>
                <Option value="" v-for="(item) in region" @click.native="choosePlace(item)">{{item.placeName}}</Option>
              </Select>
            </FormItem>
            <FormItem label="优先级">
              <Select v-model="formItem.level" style="width: 150px;">
                <Option @click.native="allstarProPriority">全部</Option>
                <Option @click.native="choosePriority1">1星</Option>
                <Option @click.native="choosePriority2">2星</Option>
                <Option @click.native="choosePriority3">3星</Option>
                <Option @click.native="choosePriority4">4星</Option>
                <Option @click.native="choosePriority5">5星</Option>
              </Select>
            </FormItem>
            <Button type="primary" @click="handleSubmit">确定</Button>
          </div>
        </Form>
      </div>

    </div>

    <div class="grid">
      <div class="ucard red-lbd" @click="openPro(item)" :class="['red-lbd','yel-lbd','blu-lbd'][index%3]" v-for="(item,index) in starPro" :key="index">
        <div class="uflex">

          <!--星标项目：项目标题-->
          <div class="btxt">{{item.name}}</div>
          <img class="img" @click.stop="cancelPro(item)" :src="require('@/assets/images/home/Collection.png')">
        </div>

        <!--星标项目星星：iview的rate评分ui-->
        <Rate disabled show-text v-model="item.priority"  custom-icon="iconfont hy-star">
          <span class="mr8">发起人</span>

          <!--星标项目：发起人姓名-->
          <span  class="username">{{item.initiatorName}}</span>
        </Rate>

        <!--        星标项目：进度条-->
        <Progress :percent="parseInt(item.nodeOrder)/parseInt(item.nodeSum)*100" :stroke-width="8">
          <span>{{item.nodeOrder}}/{{item.nodeSum}}</span>
        </Progress>

        <div class="uflex mtb10">
          <!--星标项目：日期：几个月以前-->
          <div class="col3 obtn uels">{{parseTime(item.release_time)}}</div>
          <!--星标项目：地区-->
          <div class="col3 sbtn uels">{{item.place}}</div>
          <!--星标项目：执行者-->
          <div class="col3 sbtn uels">{{item.principal}}</div>
        </div>

        <div class="flex" v-for="(item) in item.pjDynamic">
          <!--星标项目：项目动态-->
          <div class="key">{{item.name}}:</div>
          <div class="flex1 uels">{{item.dynamicContent}}</div>
          <div>09.28 12:00</div>
        </div>

      </div>


    </div>

    <div class="more" @click="getMore()">查看更多<Icon type="md-arrow-dropdown" size="24"/></div>




    <div class="mflex xtitle" style="position: relative;left: -8px; margin-top: 20px"><img :src="require('@/assets/images/home/star.png')">星标任务
      <Form ref="formInline" :model="formItem" inline :label-width="70" class="form">
        <div class="rfloat">
<!--          <Tooltip placement="top-start" content="筛选任务所在项目">-->
<!--          <FormItem label="执行人">-->
<!--            <Select v-model="formItem.dept" style="width: 150px;" @change="teamchange">-->
<!--              <Option :value="pro_1"></Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
<!--          </Tooltip>-->
          <FormItem label="优先级">
            <Select v-model="formItem.level" style="width: 150px;">
              <Option @click.native="chooseStartask1">1星</Option>
              <Option @click.native="chooseStartask2">2星</Option>
              <Option @click.native="chooseStartask3">3星</Option>
              <Option @click.native="chooseStartask4">4星</Option>
              <Option @click.native="chooseStartask5">5星</Option>
            </Select>
          </FormItem>
          <Button type="primary" @click="chooseStartask">确定</Button>
        </div>
      </Form>
    </div>
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
            <img class="img" @click.stop="cancelTask(item)" :src="require('@/assets/images/home/Collection.png')">
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
            <div class="sbtn pd15 uels" >{{item.executor[0].username}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--星标人员-->
    <div class="mflex xtitle" style="margin-top: 20px;"><img :src="require('@/assets/images/home/star.png')">星标人员
      <Form ref="formInline" :model="formItem" inline :label-width="70" class="form">
        <div class="rfloat">
          <FormItem label="状态">
            <Select v-model="formItem.area" style="width: 150px;">
              <Option value="1">正常</Option>
              <Option value="0">外出</Option>
            </Select>
          </FormItem>
          <FormItem label="忙碌度">
            <Select v-model="formItem.level" style="width: 150px;">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </FormItem>
          <Button type="primary" @click="">确定</Button>
        </div>
      </Form>
    </div>
    <div class="grid">
      <div class="ucard pointer" @click="open(item)" v-for="(item,index) in starPerson" :key="index">

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
            <img class="img" @click.stop="cancelPersonnel(item)" :src="require('@/assets/images/home/Collection.png')">
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
    <Modal v-model="proModal" class="modal" scrollable :title="projectInfo.name" :footer-hide="true" width="1200">
      <div class="mdflex">
        <div class="lbox">
          <div class="grid">
            <div class="col2 rbord">
              <div class="flex mb10">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Node.png')">节点</div>
                <div class="flex1 uels"><!-- 产品研发 -->{{projectInfo.node}}</div>
              </div>
              <div class="flex mb10">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Time.png')">计划完成时间</div>
                <div class="flex1 uels"><!-- 设置截止时间 -->{{projectInfo.end_time}}</div>
              </div>
              <div class="flex mb10">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Remarks.png')">备注</div>
                <div class="flex1 uels"><!--待添加-->{{projectInfo.remarks}}</div>
              </div>
              <div class="flex mb10">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Label.png')">标签</div>
                <div class="flex1 uels"><!--添加标签-->{{projectInfo.tag}}</div>
              </div>
              <div class="flex">
                <div class="col2 mflex"><Icon type="ios-pin-outline" size="24" style="margin-left: -4px;margin-right: 5px;"/>地区</div>
                <div class="flex1 uels"><!--台州路桥-->{{projectInfo.place}}</div>
              </div>
            </div>
            <div class="col2">
              <div class="flex mb10 ml">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Initiate.png')">发起者</div>
                <div class="flex1 uels"><span><!--张明成-->{{projectInfo.initiatorName}}</span></div>
              </div>
              <div class="flex mb10 ml">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Team.png')">团队</div>
                <div class="flex1 uels"><!--数字化团队-->{{projectInfo.team}}</div>
              </div>
              <div class="flex mb10 ml">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/priority.png')">优先级</div>
                <div class="flex1 uels" style="margin-top: -5px;">
                  <Rate disabled v-model="projectInfo.priority" custom-icon="iconfont hy-star"></Rate>
                </div>
              </div>
              <div class="flex mb10 ml">
                <div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Plan.png')">项目创建时间</div>
                <div class="flex1 uels"><!--添加-->{{projectInfo.releaseTime}}</div>
              </div>
              <div class="flex mb10 ml">
                <div class="col2"><img class="micon" :src="require('@/assets/images/detail/Person.png')">负责人</div>
                <div class="flex1 uels"><!--李达-->{{projectInfo.principal}}</div>
              </div>
            </div>
          </div>
          <Form ref="formInline" :model="formItem" inline :label-width="70" class="form mt5">
            <div class="lfloat mflex">
              <img class="img" :src="require('@/assets/images/detail/Task.png')"><span class="mr8">任务</span> {{unfinishedTask}} / {{taskInfo.length}}
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
              <div class="ucard flex" v-for="(item,index) in StarProTask">
                <div class="lfbox">
                  <Icon type="md-arrow-dropdown" size="24"/>
                  <div class="state"><!--进行中-->{{(item.status==0)?("未接收"):((item.status==1)?("未开始"):(item.status==2)?("待接收"):("已完成"))}}</div>
                </div>
                <div class="flex1 mg30">
                  <div class="uflex">
                    <div><!--设备机台制作二维码，先出设计-->{{item.name}}</div>

                  </div>
                  <Rate disabled show-text v-model="valueText"  custom-icon="iconfont hy-star">
                    <span class="mr8">发起人</span>
                    <span><!--张新城-->{{item.sponsor}}</span>
                  </Rate>
                  <div class="flex mt5">
                    <div class="obtn uels redbtn pd15"><!--10月10号截止-->{{item.endTime}}</div>
                    <div class="sbtn pd15 uels mlr" v-for="(renwu,index1) in item.executor"><!--周文杰-->{{renwu.username}}</div>
                  </div>
                </div>
                <img v-show="item.isStar==1" class="img" @click.stop="cancelProTask(item)" :src="require('@/assets/images/home/Collection.png')">
                <img v-show="!item.isStar==1" class="img" @click.stop="starProTask(item)" :src="require('@/assets/images/home/Collection-1(1).png')">
              </div>
            </div>
          </perfect-scrollbar>
          <div class="addbox mflex" @click="addTeamTask()"><Icon type="md-add" size="24"/>添加任务</div>

          <div class="mflex mtb10" style="margin-top: 20px;">
            <img class="micon" :src="require('@/assets/images/detail/Milestone.png')">节点里程碑
          </div>
          <div class="mflex mstep">
            <template v-for="(item,index) in milestone">
              <Tooltip placement="top-start">
                <img v-show="item.st_project_file.status ==1" class="step-icon" :src="require('../assets/images/detail/Complete.png')">
                <img v-show="item.st_project_file.status ==0" class="step-icon" :src="require('../assets/images/detail/Complete-unactive.png')">
                <div slot="content">
                  <div class="flex mb10">
                    <div class="w70">时间</div>
                    <div class="flex1 uels">{{item.upload_time}}</div>
                  </div>
                  <div class="flex mb10">
                    <div class="w70">所需文件</div>
                    <div class="mflex flex1 uels">
                      <Input class="mr8 wbold" size="small" :placeholder="item.st_project_file.file_name">
                        <Icon custom="iconfont hy-download" slot="suffix" />
                      </Input>

                    </div>
                  </div>


                  <div class="flex mb10">
                    <div class="w70">上传文件</div>
                    <!--                  <Upload action="/api/project/uploadProjectFile?">-->
                    <!--                    <Button icon="ios-cloud-upload-outline">选择文件</Button>-->
                    <!--                  </Upload>-->
                    <Upload
                        multiple
                        action="http://huoyi.pblog.top/api/project/uploadProjectFile"
                        :data="fileData"
                        on-error>
                      <Input class="wbold pointer" size="small" placeholder="选择文件">
                        <Icon type="md-add" slot="prefix" size="20"/>
                      </Input>
                    </Upload>
                  </div>

                </div>
              </Tooltip>
              <div class="flex1 live" v-if="!(index==(milestone.length-1))"></div>
            </template>
          </div>
          <div class="uflex mt5">
            <div v-for="(miles,index) in milestone">{{miles.node_name}}</div>
          </div>
        </div>
        <div class="rbox">
          <div class="rhead">
            <div class="btxt">参与者<span class="num">{{taskInfo.length}}</span></div>
            <div class="mflex mt5">
              <Tooltip v-for="(item,index) in taskInfo" :content="item.username">
                <Avatar shape="square" class="mr8" :src=item.avatar />
              </Tooltip>

              <span class="plus"><Icon type="md-add" size="24" @click="addproUser"/></span>
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
            <template v-for="(item,index) in dynamic">
              <perfect-scrollbar>
                <div class="uflex">
                  <div class="mflex flex1 uels">
                    <img class="micon" :src="require('@/assets/images/detail/Dynamic.png')"><!--沈达一-->{{item.member_name}}
                    <span class="ml20 ml"></span>
                    <span class="ml"><!--数字化项目-->{{item.dynamic_content}}</span>
                    <span class="ml"></span>
                  </div>
                  <div class="uflex"><!--今天10:00-->{{item.release_time}}</div>
                </div>
                <div class="uflex blue-txt"><!--设备机台制作二维码，先出设计-->{{item.task_name}}</div>
              </perfect-scrollbar>
            </template>
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
							<div class="btxt">待接收<span class="ml">{{userTasks2.length}}</span></div>
						</div>
					</div>
					<div class="col3">
						<div class="uflex mtm">
							<div class="btxt">进行中<span class="ml">{{userTasks1.length}}</span></div>
						</div>
					</div>
					<div class="col3">
						<div class="uflex mtm">
							<div class="btxt">未开始<span class="ml">{{userTasks0.length}}</span></div>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="col3">
						<perfect-scrollbar>
							<div class="ucard flex red-bd" v-for="(task,value) in userTasks2">
								<div class="lfbox">
									<Icon type="md-arrow-dropdown" size="24"/>
									<div class="state">{{ (task.status==0)?("未接收"):((task.status==1)?("未开始"):("进行中"))}}</div>
								</div>
								<div class="flex1">
									<div class="uflex">
										<div><!--项目99-->{{task.name}}</div>
                    <img v-show="task.isStar==1" class="img" @click.stop.native="cancelTask(task)" :src="require('@/assets/images/home/Collection.png')">
                    <img v-show="!task.isStar==1" class="img" @click.stop.native="addTaskStar(task)" :src="require('@/assets/images/home/Collection-1(1).png')">
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

          <div class="col3">
            <perfect-scrollbar>
              <div class="ucard flex red-bd" v-for="(task,value) in userTasks1">
                <div class="lfbox">
                  <Icon type="md-arrow-dropdown" size="24"/>
                  <div class="state">{{ (task.status==0)?("未接收"):((task.status==1)?("未开始"):("进行中"))}}</div>
                </div>
                <div class="flex1">
                  <div class="uflex">
                    <div><!--项目99-->{{task.name}}</div>
                    <img v-show="task.isStar==1" class="img" @click.stop.native="cancelTask(task)" :src="require('@/assets/images/home/Collection.png')">
                    <img v-show="!task.isStar==1" class="img" @click.stop.native="addTaskStar(task)" :src="require('@/assets/images/home/Collection-1(1).png')">
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

          <div class="col3">
            <perfect-scrollbar>
              <div class="ucard flex red-bd" v-for="(task,value) in userTasks0">
                <div class="lfbox">
                  <Icon type="md-arrow-dropdown" size="24"/>
                  <div class="state">{{ (task.status==0)?("未接收"):((task.status==1)?("未开始"):("进行中"))}}</div>
                </div>
                <div class="flex1">
                  <div class="uflex">
                    <div><!--项目99-->{{task.name}}</div>
                    <img v-show="task.isStar==1" class="img" @click.stop.native="cancelTask(task)" :src="require('@/assets/images/home/Collection.png')">
                    <img v-show="!task.isStar==1" class="img" @click.stop.native="addTaskStar(task)" :src="require('@/assets/images/home/Collection-1(1).png')">
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
    getStarProTask,
    getStarPerson,
    getUserTasks,
    getRegion,
    getTeam,
    screeningStarPro,
    getStarProInfo,
    getUserInfo,
    cancelStarPro,
    cancelStarTask,
    cancelStarUser,
    addStarTask,
    screeningStarTask,
    StarProDynamic,
    postFile
  } from "../utils/rq-star";
  import {getProjectInfo, getTeamProject} from "@/utils/rq-team";
  import {screeningTeam} from "../utils/rq-team";
  export default {
		data() {
			return {
        fileData: {
          projectId: '442bd0c050ae11ebb00300163e1d3071',
          type: 1
        },
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

        //项目id
        projectId:'',
        //所属项目
        projectName:'',
        //项目弹窗未完成个数
        unfinishedTask:0,
        //项目信息
        projectInfo:[],
        //任务信息
        taskInfo:[],
        //项目参与者信息
        projectPartInfo:[],
        //里程碑
        milestone:[],
        //动态信息
        dynamic:[],
        //文件夹信息
        folderInfo:[],
				starTask:[],
        //status: [],
        sponsor: [],
        principal: [],
        endTime: [],

				starPerson:[],
        userTasks0:[],
        userTasks1:[],
        userTasks2:[],
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
        proModal: false,
				modal: false,
				empModal: false,
				visible: false,
				isEdit: false,
        //当前用户信息
        userInFo:{
          userId:'',
          userName:'',
          avatar:'',
          status:0,
          saturation:0,
          teamMemberId:'',
        },

        //筛选信息
        screeningInfo:{
          teamId:'',
          placeId:'',
          priority:'',
          keyword:'',
        },

        screeningtaskInfo:{
          teamId:'',
          placeId:'',
          priority:'',
          keyword:'',
        },
        StarProTask:[],
			}
		},
		created() {
      //获取当前用户
      getUserInfo().then(res=>{
        this.userInFo=res.data

        this.getStarTask()
        this.getStarPro()
        this.getStarPerson()

        //获取团队
        getTeam().then(res => {
          this.team=res.data
        })
        //获取地区
        getRegion().then(res => {
          this.region=res.data
        })
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

      postFile(info) {
        postFile(info).then(res => {

        })
      },
      //获取星标项目
      getStarPro() {
        getStarPro(this.userInFo).then(res => {
          this.starPro = res.data.list

        })
      },
      getStarTask() {
        //获取星标任务多个数据
        getStarTask(this.userInFo).then( res => {
          // console.log(res)
          this.starTask = res.data.list

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
      },
      getStarPerson() {
        //axios获取星标人员
        getStarPerson(this.userInFo).then(res => {
          this.starPerson=res.data.list
        })
      },

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
        screeningStarPro(this.screeningInfo).then(res => {
          this.starPro=res.data
        }).catch()
			},

      cancelPro(item){
        this.$Modal.confirm({
          title: '确认取消星标？',
          onOk: () => {
            cancelStarPro(item.pj_id,this.userInFo).then(res=>{
              if (res.code==200){
                getStarPro(this.userInFo).then(res => {
                this.starPro = res.data.list
              })
              }
            })
            // this.$Message.info('点击取消!')
          }
        });
      },
      //添加任务星标
      addTaskStar(item){
        this.$Modal.confirm({
          title: '确认添加星标？',
          onOk: () => {
            addStarTask(item.taskId,this.userInFo).then(res=>{

            })
            // this.$Message.info('点击取消!')
          }
        });
      },
      cancelTask(item){
        this.$Modal.confirm({
          title: '确认取消星标？',
          onOk: () => {
            cancelStarTask(item.taskId,this.userInFo).then(res=>{

                getStarTask(this.userInFo).then( res => {
                  // console.log(res)
                  this.starTask = res.data
                  //获取星标任务状态，判断状态
                  for(let i=0;i<this.starTask.length;i++){
                    let task = this.starTask[i];
                    //console.log(task);
                    if(task.status===0){
                      this.starTask[i].status='待接收'
                    }else if(task.status===1){
                      this.starTask[i].status='未开始'
                    }else if(task.status===2){
                      this.starTask[i].status='进行中'
                    }else if(task.status===3){
                      this.starTask[i].status='已完成'
                    }
                  }
                })

            })
            // this.$Message.info('点击取消!')
          }
        });
      },
      cancelPersonnel(item){
        this.$Modal.confirm({
          title: '确认取消星标？',
          onOk: () => {
            cancelStarUser(item.userId,this.userInFo).then(res=>{
              getStarPerson(this.userInFo).then(res => {
                this.starPerson=res.data
              })
            })
            // this.$Message.info('点击取消!')
          }
        });
      },
      // 项目弹窗
      openPro(info){
        this.proInfo = info
        this.projectId=info.pj_id
        this.projectName=info.name
        this.proModal = true
        getStarProInfo(info,this.userInFo).then(res => {
          this.projectInfo=res.data[0]
          this.taskInfo=res.data[1]
          this.unfinishedTask=this.taskInfo.length
          // for (this.i=0;this.i<=this.taskInfo.length;this.i++){
          //   if (res.data[1][this.i].status==3){
          //     this.unfinishedTask=this.unfinishedTask-1
          //   }
          // }
          //this.projectPartInfo=res.data[2]
          this.milestone=res.data[2]
          //this.folderInfo=res.data[5]
          // for (this.i=0;this.i<=this.projectPartInfo.length;this.i++){
          //   if (this.i=this.projectPartInfo.length){
          //     this.upProInfo.user_id=this.upProInfo.user_id+this.projectPartInfo[this.i].user_id
          //   }else{
          //     this.upProInfo.user_id=this.upProInfo.user_id+','+this.projectPartInfo[this.i].user_id
          //   }
          // }
          // this.upProInfo.projectId=this.dynamic.pj_id
          getStarProTask(info,this.userInFo).then(res => {
               this.StarProTask = res.data.list
          })
        })

        StarProDynamic(info).then(res => {
              this.dynamic = res.data.list
        })
      },
      //项目弹窗添加参与者弹窗
      addproUser(){
        this.addProjectUser=true
      },

			// 星标人员弹窗
			open(item){
				this.empModal = true
        //axios获取成员任务
        getUserTasks(item).then(res => {
          this.userTasks0=res.data[0]
          this.userTasks1=res.data[1]
          this.userTasks2=res.data[2]

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

      allTeam() {
        this.screeningInfo.teamId = ''
      },
      chooseTeam(item) {
        this.screeningInfo.teamId = item.teamId
      },

      allPlace() {
        this.screeningInfo.placeId = ''
      },

      choosePlace(item) {
        this.screeningInfo.placeId = item.placeId
      },

      choosePriority1() {
        this.screeningInfo.priority = '1'
      },
      choosePriority2() {
        this.screeningInfo.priority = '2'
      },
      choosePriority3() {
        this.screeningInfo.priority = '3'
      },
      choosePriority4() {
        this.screeningInfo.priority = '4'
      },
      choosePriority5() {
        this.screeningInfo.priority = '5'
      },

      allstarProPriority() {
        this.screeningInfo.priority = ''
      },
      chooseStartask1() {
        this.screeningtaskInfo.priority = '1'
      },
      chooseStartask2() {
        this.screeningtaskInfo.priority = '2'
      },
      chooseStartask3() {
        this.screeningtaskInfo.priority = '3'
      },
      chooseStartask4() {
        this.screeningtaskInfo.priority = '4'
      },
      chooseStartask5() {
        this.screeningtaskInfo.priority = '5'
      },

      chooseStartask() {
        screeningStarTask(this.screeningtaskInfo).then(res => {
          this.starTask = res.data
        })
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
.wbox{border-radius: 8px;height: 250px}
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
