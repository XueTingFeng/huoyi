<template>
	<div class="page">
		<Form ref="formInline" :model="formItem" inline :label-width="70" class="form">
			<FormItem>
				<span class="next" @click="toNext(0)"><Icon type="md-arrow-dropleft" size="24"/></span>
				<span class="inext mlr">{{deptName}}</span>
				<span class="next" @click="toNext(1)"><Icon type="md-arrow-dropright" size="24"/></span>
				<img class="man pointer" @click="open" :src="require('@/assets/images/home/member.png')">
			</FormItem>
			<div class="rfloat">
				<FormItem label="地区">
					<Select v-model="formItem.area" style="width: 150px;">
            <Option value="全部" @click.native="Place" style="color: black">全部</Option>
            <Option value="" v-for="(item,index) in region" @click.native="choosePlace(item)" style="color: black">{{item.placeName}}</Option>
<!--						<Option value="台州 椒江">台州 椒江</Option>-->
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
            <Option value="全部" @click.native="choosePriority">全部</Option>
						<Option value="非常紧急" @click.native="choosePriority">非常紧急</Option>
						<Option value="紧急" @click.native="choosePriority">紧急</Option>
						<Option value="正常" @click.native="choosePriority">正常</Option>
					</Select>
				</FormItem>
				<FormItem label="关键字">
					<Input class="search" suffix="md-search" placeholder="搜索" style="width: auto" v-model="screeningInfo.keyword"/>
				</FormItem>
				<Button type="primary" @click="handleSubmit()">确定</Button>
			</div>
		</Form>
		<div class="grid flexNode">
			<div class="col5" style="" v-for="(item,index) in node">
				<div class="uflex mtm">
					<div class="btxt"><!--产品(任务)计划-->{{item.node_name}}</div>
          <span class="ml">{{item.project.length}}</span>
					<div class="addbtn" @click="openAdd(item,index)">
            <Tooltip content="新建项目" placement="bottom">
              +
            </Tooltip>
          </div>
				</div>
			</div>
<!--			<div class="col5">-->
<!--				<div class="uflex mtm">-->
<!--					<div class="btxt">前期设计<span class="ml">{{list2.length}}</span></div>-->
<!--					<div class="addbtn" @click="openAdd">+</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="col5">-->
<!--				<div class="uflex mtm">-->
<!--					<div class="btxt">正在研发<span class="ml">{{list3.length}}</span></div>-->
<!--					<div class="addbtn" @click="openAdd">+</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="col5">-->
<!--				<div class="uflex mtm">-->
<!--					<div class="btxt">测试<span class="ml">{{list4.length}}</span></div>-->
<!--					<div class="addbtn" @click="openAdd">+</div>-->
<!--				</div>-->
<!--			</div>-->
<!--			<div class="col5">-->
<!--				<div class="uflex mtm">-->
<!--					<div class="btxt">准备发布<span class="ml">{{list5.length}}</span></div>-->
<!--					<div class="addbtn" @click="openAdd">+</div>-->
<!--				</div>-->
<!--			</div>-->
		</div>
		<div class="grid flexNode">
			<div class="col5" v-for="(item1,index1) in list">
				<perfect-scrollbar>
<!--          <draggable id="list1" :list="list" class="list-group" draggable=".ucard" group="a" @end="end(item1)">-->
					<div class="ucard red-lbd" style="width: 236px;height: 180px" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list[index1].project" :key="index">
            <div class="uflex">
							<div class="btxt">{{item.name}}</div>
							<div>
                <Tooltip content="星标" placement="bottom">
                  <img v-show="item.isStar==1" class="img" @click.stop="cancel(item)" :src="require('@/assets/images/home/Collection.png')">
                  <img v-show="!item.isStar==1" class="img" @click.stop="star(item)" :src="require('@/assets/images/home/Collection-1(1).png')">
                </Tooltip>
<!--								<img class="img" @click.stop="cancel(item.pj_id)" :src="require('@/assets/images/home/Collection.png')">-->
							</div>
						</div>
						<Rate disabled show-text v-model="item.priority"  custom-icon="iconfont hy-star">
							<span class="mr8">发起人</span>
							<span>{{item.initiatorName}}</span>
						</Rate>
						<Progress :percent="parseInt(item.nodeOrder)/parseInt(item.nodeSum)*100" :stroke-width="8">
								<span>{{item.nodeOrder}}/{{item.nodeSum}}</span>
						</Progress>
<!--            <Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">-->
<!--              <span>{{item.progress}}</span>-->
<!--            </Progress>-->
						<div class="uflex mtb10">
							<div class="col3 obtn uels">
                <Tooltip content="截止时间" placement="bottom">
                  {{parseTime(item.release_time)}}
                </Tooltip>
              </div>
							<div class="col3 sbtn uels">
                <Tooltip content="地区" placement="bottom">
                {{item.place}}
                </Tooltip>
              </div>
							<div class="col3 sbtn uels">
                <Tooltip content="负责人" placement="bottom">
                  {{item.principal}}
                </Tooltip>
              </div>
						</div>
						<div class="flex" v-for="(Proitem,Pro) in item.dynamics">
							<div class="key"><!--周杰：-->{{Proitem.member_name}}:</div>
							<div class="flex1 uels"><!--项目中间对接进行中-->{{Proitem.dynamic_content}}</div>
							<div><!--09.28 12:00-->{{Proitem.release_time.slice(10)}}</div>
						</div>
<!--						<div class="flex">-->
<!--							<div class="key uels">&lt;!&ndash;张美兰：&ndash;&gt;{{item.pjDynamic[1].name}}:</div>-->
<!--							<div class="flex1 uels">&lt;!&ndash;项目增加望申请延迟1天&ndash;&gt;{{item.pjDynamic[1].dynamicContent}}</div>-->
<!--							<div>&lt;!&ndash;10.11 12:00&ndash;&gt;{{item.pjDynamic[1].release_time.slice(10)}}</div>-->
<!--						</div>-->
          </div>
<!--          </draggable>-->
				</perfect-scrollbar>
			</div>
<!--			<div class="col5">-->
<!--				<perfect-scrollbar>-->
<!--					<div class="ucard red-lbd" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list2" :key="index">-->
<!--						<div class="uflex">-->
<!--							<div class="btxt">{{item.title}}</div>-->
<!--							<div>-->
<!--								<img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">-->
<!--							</div>-->
<!--						</div>-->
<!--						<Rate disabled show-text v-model="item.star"  custom-icon="iconfont hy-star">-->
<!--							<span class="mr8">发起人</span>-->
<!--							<span>{{item.creator}}</span>-->
<!--						</Rate>-->
<!--						<Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">-->
<!--								<span>{{item.progress}}</span>-->
<!--						</Progress>-->
<!--						<div class="uflex mtb10">-->
<!--							<div class="col3 obtn uels">{{parseTime(item.date)}}</div>-->
<!--							<div class="col3 sbtn uels">{{item.area}}</div>-->
<!--							<div class="col3 sbtn uels">{{item.optman}}</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="key">周杰：</div>-->
<!--							<div class="flex1 uels">项目中间对接进行中</div>-->
<!--							<div>09.28 12:00</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="key uels">张美兰：</div>-->
<!--							<div class="flex1 uels">项目增加望申请延迟1天</div>-->
<!--							<div>10.11 12:00</div>-->
<!--						</div>-->
<!--					</div>-->
<!--				</perfect-scrollbar>-->
<!--			</div>-->
<!--			<div class="col5">-->
<!--				<perfect-scrollbar>-->
<!--					<div class="ucard red-lbd" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list3" :key="index">-->
<!--						<div class="uflex">-->
<!--							<div class="btxt">{{item.title}}</div>-->
<!--							<div>-->
<!--								<img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">-->
<!--							</div>-->
<!--						</div>-->
<!--						<Rate disabled show-text v-model="item.star"  custom-icon="iconfont hy-star">-->
<!--							<span class="mr8">发起人</span>-->
<!--							<span>{{item.creator}}</span>-->
<!--						</Rate>-->
<!--						<Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">-->
<!--								<span>{{item.progress}}</span>-->
<!--						</Progress>-->
<!--						<div class="uflex mtb10">-->
<!--							<div class="col3 obtn uels">{{parseTime(item.date)}}</div>-->
<!--							<div class="col3 sbtn uels">{{item.area}}</div>-->
<!--							<div class="col3 sbtn uels">{{item.optman}}</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="key">周杰：</div>-->
<!--							<div class="flex1 uels">项目中间对接进行中</div>-->
<!--							<div>09.28 12:00</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="key uels">张美兰：</div>-->
<!--							<div class="flex1 uels">项目增加望申请延迟1天</div>-->
<!--							<div>10.11 12:00</div>-->
<!--						</div>-->
<!--					</div>-->
<!--				</perfect-scrollbar>-->
<!--			</div>-->
<!--			<div class="col5">-->
<!--				<perfect-scrollbar>-->
<!--					<div class="ucard red-lbd" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list4" :key="index">-->
<!--						<div class="uflex">-->
<!--							<div class="btxt">{{item.title}}</div>-->
<!--							<div>-->
<!--								<img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">-->
<!--							</div>-->
<!--						</div>-->
<!--						<Rate disabled show-text v-model="item.star"  custom-icon="iconfont hy-star">-->
<!--							<span class="mr8">发起人</span>-->
<!--							<span>{{item.creator}}</span>-->
<!--						</Rate>-->
<!--						<Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">-->
<!--								<span>{{item.progress}}</span>-->
<!--						</Progress>-->
<!--						<div class="uflex mtb10">-->
<!--							<div class="col3 obtn uels">{{parseTime(item.date)}}</div>-->
<!--							<div class="col3 sbtn uels">{{item.area}}</div>-->
<!--							<div class="col3 sbtn uels">{{item.optman}}</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="key">周杰：</div>-->
<!--							<div class="flex1 uels">项目中间对接进行中</div>-->
<!--							<div>09.28 12:00</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="key uels">张美兰：</div>-->
<!--							<div class="flex1 uels">项目增加望申请延迟1天</div>-->
<!--							<div>10.11 12:00</div>-->
<!--						</div>-->
<!--					</div>-->
<!--				</perfect-scrollbar>-->
<!--			</div>-->
<!--			<div class="col5">-->
<!--				<perfect-scrollbar>-->
<!--					<div class="ucard red-lbd" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list5" :key="index">-->
<!--						<div class="uflex">-->
<!--							<div class="btxt">{{item.title}}</div>-->
<!--							<div>-->
<!--								<img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">-->
<!--							</div>-->
<!--						</div>-->
<!--						<Rate disabled show-text v-model="item.star"  custom-icon="iconfont hy-star">-->
<!--							<span class="mr8">发起人</span>-->
<!--							<span>{{item.creator}}</span>-->
<!--						</Rate>-->
<!--						<Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">-->
<!--								<span>{{item.progress}}</span>-->
<!--						</Progress>-->
<!--						<div class="uflex mtb10">-->
<!--							<div class="col3 obtn uels">{{parseTime(item.date)}}</div>-->
<!--							<div class="col3 sbtn uels">{{item.area}}</div>-->
<!--							<div class="col3 sbtn uels">{{item.optman}}</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="key">周杰：</div>-->
<!--							<div class="flex1 uels">项目中间对接进行中</div>-->
<!--							<div>09.28 12:00</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="key uels">张美兰：</div>-->
<!--							<div class="flex1 uels">项目增加望申请延迟1天</div>-->
<!--							<div>10.11 12:00</div>-->
<!--						</div>-->
<!--					</div>-->
<!--				</perfect-scrollbar>-->
<!--			</div>-->
		</div>
		<!-- 添加弹窗 -->
		<Modal v-model="addModal" scrollable title="创建新项目">
			<div class="mg20">
				<div class="bold">项目名称</div>
				<Input class="mt5" v-model="addteamdata.projectName" size="large" placeholder="输入名称以新建项目" />
				<div class="uflex mt15 ml">
					<div class="label">
						<img class="uicon" :src="require('@/assets/images/detail/priority.png')">优先级
					</div>
					<div class="flex1"><Rate v-model="addteamdata.priority" custom-icon="iconfont hy-star"></Rate></div>
				</div>
				<div class="uflex mt15 ml">
					<div class="label">
						<img class="uicon" :src="require('@/assets/images/detail/Plan.png')">项目创建时间
					</div>
					<div class="flex1">{{vo.createTime}}
						<!-- <DatePicker v-model="vo.time" type="datetime" class="search" placeholder="时间"></DatePicker> -->
					</div>
				</div>
				<div class="uflex mt15 ml">
					<div class="label">
						<img class="uicon" :src="require('@/assets/images/detail/Time.png')">计划截止时间
					</div>
					<div class="flex1">
						<DatePicker v-model="addteamdata.endTime" format="yyyy-MM-dd" type="date" class="search" placeholder="计划截止时间"></DatePicker>
					</div>
				</div>
				<div class="uflex mt15 ml">
					<div class="label">
						<Icon type="ios-pin-outline" size="24" style="margin-left: -4px;margin-right: 5px;"/>地区
					</div>
					<div class="flex1 down">
						<Dropdown placement="right-start">
							<span class="cbod">{{addteamdata.region}}</span>
							<DropdownMenu slot="list" style="padding: 6px 10px;">
								<Button type="default" ghost long @click="">搜索</Button>
								<RadioGroup v-model="addteamdata.placeId" vertical>
									<DropdownItem @click.native="checkPlace(item)" v-for="(item, index) in region" :key="index">
										<Radio :label="item.placeId">{{item.placeName}}</Radio>
									</DropdownItem>
								</RadioGroup>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
				<div class="uflex mt15 ml">
					<div class="label">
						<img class="uicon" :src="require('@/assets/images/detail/Person.png')">负责人
					</div>
					<div class="flex1 down">
						<Dropdown placement="right-start">
							<span class="cbod">{{addteamdata.username}}</span>
							<DropdownMenu slot="list" style="padding: 6px 10px;">
								<Button type="default" ghost long @click="">搜索</Button>
								<RadioGroup v-model="addteamdata.principal" vertical>
									<DropdownItem @click.native="checkProPerson(item)" v-for="(item, index) in teammember" :key="index">
										<Radio :label="item.memberId">{{item.userName}}</Radio>
									</DropdownItem>
								</RadioGroup>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
				<div class="uflex mt15 ml" style="align-items: flex-start;">
					<div class="label">
						<img class="uicon" :src="require('@/assets/images/detail/Remarks.png')">备注
					</div>
					<div class="flex1">
						<Input v-model="addteamdata.remarks" type="textarea" :rows="2" placeholder="添加备注" />
					</div>
				</div>
				<div v-show="show">
					<div class="item-li drop">
						<Dropdown placement="top-start">
							<span class="ml20"><!--数字化团队-->{{addProInfo.teamName}}<Icon type="ios-arrow-down" size="22"/></span>
							<DropdownMenu slot="list" style="padding: 6px 10px;">
                <perfect-scrollbar>
								<div style="text-align: center;">选择位置</div>
								<div style="height: 75px;">
									<div class="uflex mt10" v-for="(item,index) in dept">
										<span>团队</span>
										<span @click="onTeam(item,index)"><!--数字化团队-->{{item.teamName}}<Icon type="ios-arrow-forward"></Icon></span>
									</div>
								</div>

<!--								<div style="text-align: center;">-->
<!--									<Button type="primary" @click="search">确定</Button>-->
<!--								</div>	-->
                </perfect-scrollbar>
							</DropdownMenu>
						</Dropdown>
            <Dropdown placement="top-start">
              <span class="ml20"><!--数字化团队-->{{addProInfo.typeName}}<Icon type="ios-arrow-down" size="22"/></span>
              <DropdownMenu slot="list" style="padding: 6px 10px;">
                <perfect-scrollbar>
                <div style="text-align: center;">选择位置</div>
                <div style="height: 75px;">
                  <div class="uflex mt10" v-for="(item,index) in types">
                    <span>类型</span>
                    <span @click="onType(item)"><!--数字化团队-->{{item.typeName}}<Icon type="ios-arrow-forward"></Icon></span>
                  </div>
                </div>

<!--                <div style="text-align: center;">-->
<!--                  <Button type="primary" @click="search">确定</Button>-->
<!--                </div>-->
                </perfect-scrollbar>
              </DropdownMenu>
            </Dropdown>
						<Dropdown placement="top-start">
							<span class="ml20"><!--产品(任务)计划-->{{addProInfo.nodeName}}<Icon type="ios-arrow-down" size="22"/></span>
							<DropdownMenu slot="list" style="padding: 6px 10px;">
                <perfect-scrollbar>
								<div style="text-align: center;">选择状态</div>
								<div style="height: 75px;">
									<div class="uflex mt10" v-for="(item,index) in nodes">
										<span>节点</span>
										<span @click="onNode(item)"><!--产品研发-->{{item.nodeName}}<Icon type="ios-arrow-forward"></Icon></span>
									</div>
								</div>

<!--								<div style="text-align: center;">-->
<!--									<Button type="primary" @click="search">确定</Button>-->
<!--								</div>	-->
                </perfect-scrollbar>
              </DropdownMenu>
						</Dropdown>
					</div>
					<div class="item-li">
						<div class="uflex">
							<div class="label">
								<img class="uicon" :src="require('@/assets/images/detail/Label.png')">标签
							</div>
              <div class="flex1">
                <Input v-model="addteamdata.tags" type="textarea" :rows="2" placeholder="添加标签" @keyup.enter="addLabel"/>
              </div>
<!--              <input type="text" value="添加标签" @keyup.enter="addLabel(value)">-->
<!--							<div class="flex1">添加标签</div>-->
						</div>
					</div>
					<div class="item-li">
						<div class="btxt">参与者<span class="num">{{adduser.length}}</span></div>
						<div class="mflex mt10">
              <Avatar shape="square" class="mr8" :src="item" v-for="(item,index) in adduser.avatar"/>
<!--							<Avatar shape="square" class="mr8" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />-->
<!--							<Avatar shape="square" class="mr8" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />-->
							<span class="plus"><Icon type="md-add" size="24" @click="addParticipants"/></span>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer">
				<div v-show="!show" class="more" @click="show=!show">
					<Icon type="ios-arrow-down" size="22"/>更多
				</div>
				<Button type="default" ghost @click="save">完成并创建下一个</Button>
				<Button type="primary" @click="finish">完成</Button>
			</div>
		</Modal>
		<!-- 项目弹窗 -->
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
								<div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Time.png')">计划截止时间</div>
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
								<div class="flex1 uels"><div class="checkbox"></div><span><!--张明成-->{{projectInfo.initiatorName}}</span></div>
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
					<Form ref="formInline" :model="proPopWinTask" inline :label-width="70" class="form mt5">
						<div class="lfloat mflex">
							<img class="img" :src="require('@/assets/images/detail/Task.png')"><span class="mr8">任务</span> {{unfinishedTask}} / {{taskInfo.length}}
						</div>
						<div class="rfloat">
							<FormItem label="执行者">
								<Input class="mdinput" size="small" placeholder="执行者" v-model="proPopWinTask.practitioners" style="width: 100px" />
							</FormItem>
							<FormItem label="关键字">
								<Input class="mdinput" size="small" v-model="proPopWinTask.keyword" search @on-search="search" suffix="ios-search" placeholder="搜索" style="width: 100px" />
							</FormItem>
						</div>
					</Form>
          <perfect-scrollbar>
					<div class="wbox">
						<div class="ucard flex" v-for="(item,index) in taskInfo">
							<div class="lfbox">
								<Icon type="md-arrow-dropdown" size="24"/>
								<div class="state"><!--进行中-->{{(item.status==0)?("未接收"):((item.status==1)?("未开始"):(item.status==2)?("进行中"):("已完成"))}}</div>
							</div>
							<div class="flex1 mg30">
								<div class="uflex">
									<div><!--设备机台制作二维码，先出设计-->{{item.name}}</div>

								</div>
								<Rate disabled show-text v-model="item.priority"  custom-icon="iconfont hy-star">
									<span class="mr8">发起人</span>
									<span><!--张新城-->{{item.sponsor}}</span>
								</Rate>
<!--								<Progress :percent="6/8*100" :stroke-width="8">-->
<!--									<span>6/8</span>-->
<!--								</Progress>-->
								<div class="flex mt5">
									<div class="obtn uels redbtn pd15"><!--10月10号截止-->{{item.endTime.split(" ")[0]}}</div>
									<div class="sbtn pd15 uels mlr" v-for="(renwu,index1) in item.executor"><!--周文杰-->{{renwu.username}}</div>
								</div>
							</div>
              <img v-show="item.isStar==1" class="img" @click.stop="cancelProTask(item)" :src="require('@/assets/images/home/Collection.png')">
              <img v-show="!item.isStar==1" class="img" @click.stop="starProTask(item)" :src="require('@/assets/images/home/Collection-1(1).png')">
						</div>

<!--						<div class="ucard flex">-->
<!--							<div class="lfbox">-->
<!--								<Icon type="md-arrow-dropdown" size="24"/>-->
<!--								<div class="state">进行中</div>-->
<!--							</div>-->
<!--							<div class="flex1 mg30">-->
<!--								<div class="uflex">-->
<!--									<div>设备机台制作二维码，先出设计</div>-->
<!--									-->
<!--								</div>-->
<!--								<Rate disabled show-text v-model="valueText"  custom-icon="iconfont hy-star">-->
<!--									<span class="mr8">发起人</span>-->
<!--									<span>张新城</span>-->
<!--								</Rate>-->
<!--&lt;!&ndash;								<Progress :percent="6/8*100" :stroke-width="8">&ndash;&gt;-->
<!--&lt;!&ndash;									<span>6/8</span>&ndash;&gt;-->
<!--&lt;!&ndash;								</Progress>&ndash;&gt;-->
<!--								<div class="flex mt5">-->
<!--									<div class="obtn uels redbtn pd15">10月10号截止</div>-->
<!--									<div class="sbtn pd15 uels mlr">周文杰</div>-->
<!--								</div>-->
<!--							</div>-->
<!--							<img class="img mr20" :src="require('@/assets/images/home/Collection.png')">-->
<!--						</div>-->

					</div>
          </perfect-scrollbar>
            <div class="addbox mflex" @click="addTeamTask()"><Icon type="md-add" size="24"/>添加任务</div>

					<div class="mflex mtb10" style="margin-top: 20px;">
						<img class="micon" :src="require('../assets/images/detail/Milestone.png')">节点里程碑
					</div>
					<div class="mflex mstep">
            <template v-for="(item,index) in milestone">
						<Tooltip placement="top-start">
							<img class="step-icon" :src="require('../assets/images/detail/Complete.png')">
							<div slot="content">
<!--								<div class="flex mb10">-->
<!--									<div class="w70">执行者</div>-->
<!--									<div class="flex1 uels">&lt;!&ndash;沈达一&ndash;&gt;{{}}</div>-->
<!--								</div>-->
<!--								<div class="flex mb10">-->
<!--									<div class="w70">状态</div>-->
<!--									<div class="flex1 uels">&lt;!&ndash;产品研发&ndash;&gt;{{}}</div>-->
<!--								</div>-->
                <div class="flex mb10">
                  <div class="w70">时间</div>
                  <div class="flex1 uels">2020年9月29日</div>
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
						<div class="flex1 live" v-if="!(index==(milestone.length-1))"></div>
            </template>
<!--						<Tooltip placement="top-start">-->
<!--							<img class="step-icon" :src="require('@/assets/images/detail/No.png')">-->
<!--							<div slot="content">-->
<!--								<div class="flex mb10">-->
<!--									<div class="w70">执行者</div>-->
<!--									<div class="flex1 uels">沈达一</div>-->
<!--								</div>-->
<!--								<div class="flex mb10">-->
<!--									<div class="w70">状态</div>-->
<!--									<div class="flex1 uels">产品研发</div>-->
<!--								</div>-->
<!--								<div class="flex mb10">-->
<!--									<div class="w70">时间</div>-->
<!--									<div class="flex1 uels">2020年9月29日</div>-->
<!--								</div>-->
<!--								<div class="flex mb10">-->
<!--									<div class="w70">所需文件</div>-->
<!--									<div class="flex1 uels"><Icon custom="iconfont hy-no" size="24" /></div>-->
<!--								</div>-->
<!--							</div>-->
<!--						</Tooltip>-->
<!--						-->
<!--						<div class="flex1 live"></div>-->
<!--						<Tooltip placement="top-start">-->
<!--							<img class="step-icon" :src="require('@/assets/images/detail/not-unactive.png')">-->
<!--							<div slot="content">-->
<!--								<div class="flex mb10">-->
<!--									<div class="w70">执行者</div>-->
<!--									<div class="flex1 uels">沈达一</div>-->
<!--								</div>-->
<!--								<div class="flex mb10">-->
<!--									<div class="w70">状态</div>-->
<!--									<div class="flex1 uels">产品研发</div>-->
<!--								</div>-->
<!--								<div class="flex mb10">-->
<!--									<div class="w70">时间</div>-->
<!--									<div class="flex1 uels">2020年9月29日</div>-->
<!--								</div>-->
<!--								<div class="flex mb10" style="align-items: flex-start;">-->
<!--									<div class="w70">所需文件</div>-->
<!--									<div class="flex1 uels">-->
<!--										<div>测试报告1</div>-->
<!--										<div>测试报告2</div>-->
<!--									</div>-->
<!--								</div>-->
<!--								<div class="mflex" style="margin-left: 45px;">-->
<!--									<Icon class="mr8" style="margin-top: -8px;" custom="iconfont hy-duowenjianjia" />-->
<!--									<Upload-->
<!--											multiple-->
<!--											action="//jsonplaceholder.typicode.com/posts/">-->
<!--											<Input class="wbold pointer" size="small" placeholder="上传文件">-->
<!--												<Icon type="md-add" slot="prefix" size="20"/>-->
<!--											</Input>-->
<!--									</Upload>-->
<!--								</div>-->
<!--							</div>-->
<!--						</Tooltip>-->
<!--						<div class="flex1 unlive"></div>-->
<!--						<img class="step-icon" style="cursor: default;" :src="require('@/assets/images/detail/No-unactive.png')">-->
					</div>
					<div class="uflex mt5">
            <div v-for="(miles,index) in milestone">{{miles.node_name}}</div>
<!--						<div>产品计划</div>-->
<!--						<div>产品研发</div>-->
<!--						<div>测试</div>-->
<!--						<div>发布跟踪</div>-->
					</div>
				</div>
				<div class="rbox">
					<div class="rhead">
						<div class="btxt">参与者<span class="num">{{projectPartInfo.length}}</span></div>
						<div class="mflex mt5">
              <Avatar shape="square" class="mr8" :src=item.avatar v-for="(item,index) in projectPartInfo"/>
<!--							<Avatar shape="square" class="mr8" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />-->
<!--							<Avatar shape="square" class="mr8" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />-->
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
								<img class="micon" :src="require('@/assets/images/detail/Dynamic.png')"><!--沈达一-->{{item.name}}
								<span class="ml20 ml">在项目</span>
								<span class="ml"><!--数字化项目-->{{projectInfo.name}}</span>
								<span class="ml">下创建了任务</span>
							</div>
							<div class="uflex"><!--今天10:00-->{{item.release_time}}</div>
						</div>
						<div class="uflex blue-txt"><!--设备机台制作二维码，先出设计-->{{item.task_name}}</div>
            </perfect-scrollbar>
            </template>

<!--						<div class="uflex mt15">-->
<!--							<div class="mflex flex1 uels">-->
<!--								<span class="ml20">沈达一</span>-->
<!--								<span class="ml">指派给了</span>-->
<!--								<span class="ml">张明成</span>-->
<!--							</div>-->
<!--							<div class="uflex">今天10:01</div>-->
<!--						</div>-->
<!--						<div class="uflex mt15">-->
<!--							<div class="mflex flex1 uels">-->
<!--								<span class="ml20">沈达一</span>-->
<!--								<span class="ml">更新任务状态为发布成功</span>-->
<!--							</div>-->
<!--							<div class="uflex">今天10:01</div>-->
<!--						</div>-->
					</div>
					<div class="foot">
						<div class="btxt">@提及他人，按Ctrl+Enter 快速发布</div>
						<Button type="primary" @click="release" class="rfloat">发布</Button>
					</div>
				</div>
			</div>
		</Modal>

		<!-- 团队成员弹窗 -->
			<Modal v-model="modal" scrollable title="团队成员" :footer-hide="true" width="900">
				<div class="grid modal">
					<div class="ucard boder" v-for="(item,index) in teammember">
						<div class="uflex baseline">
							<Rate class="rates" v-model="valueText" disabled icon="ios-square" />
							<div class="mt15">
								<Badge>
									<Avatar shape="square" :src=item.avatar size="54" />
									<div class="round" slot="count">
										<div class="ins"></div>
									</div>
								</Badge>
								<div class="text"><!--张美兰-->{{item.userName}}</div>
							</div>
							<div class="textr">
								<span class="group" v-if="item.isLeader==1">组长</span>
                <Tooltip content="星标" placement="bottom">
                  <img v-show="item.isStar==1" class="img" @click.stop="cancelPersonnel(item)" :src="require('@/assets/images/home/Collection.png')">
                  <img v-show="!item.isStar==1" class="img" @click.stop="starPersonnel(item)" :src="require('@/assets/images/home/Collection-1(1).png')">
                </Tooltip>
							</div>
						</div>
						<div class="flex" v-for="(project1) in item.project">
							<div class="w50 uels"><!--项目1-->{{project1.name}}</div>
							<div class="flex1 uels"><!--调整产能参数结构-->{{project1.taskName}}</div>
							<div><!--截至10.11 12:00-->{{project1.taskEndTime}}</div>
						</div>
<!--						<div class="flex">-->
<!--							<div class="w50 uels">&lt;!&ndash;项目2&ndash;&gt;{{item.project}}</div>-->
<!--							<div class="flex1 uels">&lt;!&ndash;新能企业走访调查&ndash;&gt;{{item.project}}</div>-->
<!--							<div>&lt;!&ndash;截至10.11 12:00&ndash;&gt;{{item.project.taskEndTime.split("")[0]}}</div>-->
<!--						</div>-->
					</div>

<!--					<div class="ucard boder">-->
<!--						<div class="uflex baseline">-->
<!--							<Rate class="rates" v-model="valueText" disabled icon="ios-square" />-->
<!--							<div class="mt15">-->
<!--								<Badge>-->
<!--									<Avatar shape="square" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" size="54" />-->
<!--									<div class="round" slot="count">-->
<!--										<div class="ins"></div>-->
<!--									</div>-->
<!--								</Badge>-->
<!--								<div class="text">张美兰</div>-->
<!--							</div>-->
<!--							<div class="textr">-->
<!--								<img class="img" :src="require('@/assets/images/home/Collection.png')">-->
<!--							</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="w50 uels">项目1</div>-->
<!--							<div class="flex1 uels">调整产能参数结构</div>-->
<!--							<div>截至10.11 12:00</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="w50 uels">项目2</div>-->
<!--							<div class="flex1 uels">新能企业走访调查</div>-->
<!--							<div>截至10.11 12:00</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					-->
<!--					<div class="ucard boder">-->
<!--						<div class="uflex baseline">-->
<!--							<Rate class="rates" v-model="valueText" disabled icon="ios-square" />-->
<!--							<div class="mt15">-->
<!--								<Badge>-->
<!--									<Avatar shape="square" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" size="54" />-->
<!--									<div class="round" slot="count">-->
<!--										<div class="ins"></div>-->
<!--									</div>-->
<!--								</Badge>-->
<!--								<div class="text">张美兰</div>-->
<!--							</div>-->
<!--							<div class="textr">-->
<!--								<img class="img" :src="require('@/assets/images/home/Collection.png')">-->
<!--							</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="w50 uels">项目1</div>-->
<!--							<div class="flex1 uels">调整产能参数结构</div>-->
<!--							<div>截至10.11 12:00</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="w50 uels">项目2</div>-->
<!--							<div class="flex1 uels">新能企业走访调查</div>-->
<!--							<div>截至10.11 12:00</div>-->
<!--						</div>-->
<!--					</div>-->
<!--					-->
<!--					<div class="ucard boder">-->
<!--						<div class="uflex baseline">-->
<!--							<Rate class="rates" v-model="valueText" disabled icon="ios-square" />-->
<!--							<div class="mt15">-->
<!--								<Badge>-->
<!--									<Avatar shape="square" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" size="54" />-->
<!--									<div class="round" slot="count">-->
<!--										<div class="ins"></div>-->
<!--									</div>-->
<!--								</Badge>-->
<!--								<div class="text">张美兰</div>-->
<!--							</div>-->
<!--							<div class="textr">-->
<!--								<img class="img" :src="require('@/assets/images/home/Collection.png')">-->
<!--							</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="w50 uels">项目1</div>-->
<!--							<div class="flex1 uels">调整产能参数结构</div>-->
<!--							<div>截至10.11 12:00</div>-->
<!--						</div>-->
<!--						<div class="flex">-->
<!--							<div class="w50 uels">项目2</div>-->
<!--							<div class="flex1 uels">新能企业走访调查</div>-->
<!--							<div>截至10.11 12:00</div>-->
<!--						</div>-->
<!--					</div>-->


				</div>

			</Modal>
<!--    添加用户弹窗-->
    <Modal v-model="participants" scrollable title="团队成员" :footer-hide="true" width="900">
      <div class="grid modal">
        <div class="ucard boder" v-for="(item,index) in teammember" @click="addUser(item)">
          <div class="uflex baseline">
            <Rate class="rates" v-model="valueText" disabled icon="ios-square" />
            <div class="mt15">
              <Badge>
                <Avatar shape="square" :src=item.avatar size="54" />
                <div class="round" slot="count">
                  <div class="ins"></div>
                </div>
              </Badge>
              <div class="text"><!--张美兰-->{{item.userName}}</div>
            </div>
            <div class="textr">
              <span class="group" v-if="item.isLeader==1">组长</span>
              <img class="img" :src="require('@/assets/images/home/Collection.png')">
            </div>
          </div>
          <div class="flex" v-for="(project1) in item.project">
            <div class="w50 uels"><!--项目1-->{{project1.name}}</div>
            <div class="flex1 uels"><!--调整产能参数结构-->{{project1.taskName}}</div>
            <div><!--截至10.11 12:00-->{{project1.taskEndTime}}</div>
          </div>
        </div>
      </div>
    </Modal>
<!--添加参与者弹窗-->
    <Modal v-model="addProjectUser" scrollable title="团队成员" :footer-hide="true" width="900">
      <div class="grid modal">
        <div class="ucard boder" v-for="(item,index) in teammember" @click="addProUser(item)">
          <div class="uflex baseline">
            <Rate class="rates" v-model="valueText" disabled icon="ios-square" />
            <div class="mt15">
              <Badge>
                <Avatar shape="square" :src=item.avatar size="54" />
                <div class="round" slot="count">
                  <div class="ins"></div>
                </div>
              </Badge>
              <div class="text"><!--张美兰-->{{item.userName}}</div>
            </div>
            <div class="textr">
              <span class="group" v-if="item.isLeader==1">组长</span>
              <img class="img" :src="require('@/assets/images/home/Collection.png')">
            </div>
          </div>
          <div class="flex" v-for="(project1) in item.project">
            <div class="w50 uels"><!--项目1-->{{project1.name}}</div>
            <div class="flex1 uels"><!--调整产能参数结构-->{{project1.taskName}}</div>
            <div><!--截至10.11 12:00-->{{project1.taskEndTime}}</div>
          </div>
        </div>
      </div>
    </Modal>
<!--    添加任务弹窗-->
    <Modal v-model="addTaskWin" scrollable title="创建新任务">
      <div class="flex">
<!--        <div class="lfbox down">-->
<!--          <Dropdown placement="right-start" >-->
<!--            <Icon type="md-arrow-dropdown" size="24"/>-->
<!--            <DropdownMenu slot="list">-->
<!--              <DropdownItem @click.native="dropdown('待接收')" >待接收</DropdownItem>-->
<!--            </DropdownMenu>-->
<!--          </Dropdown>-->

<!--          <div class="state">{{state}}</div>-->
<!--        </div>-->
        <Input v-model="addMyTask.name" type="textarea" :rows="3" placeholder="输入产品需求内容......" />
      </div>
      <div class="uflex mtl">
        <div class="label">
          <img class="uicon" :src="require('@/assets/images/detail/Team.png')">当前项目
        </div>
        <div class="flex1"><!--<Input  class="search" placeholder="所属项目"/>-->

          <Dropdown placement="right-start">
            <span class="cbod">{{projectName}}</span>
<!--            <DropdownMenu slot="list" style="padding: 6px 10px;">-->
<!--              <RadioGroup v-model="addMyTask.pj_id" vertical>-->
<!--                <DropdownItem @click.native="checkPerson(item)" v-for="(item, index) in list" :key="index">-->
<!--                  <Radio :label="item.pj_id">{{item.name}}</Radio>-->
<!--                </DropdownItem>-->
<!--              </RadioGroup>-->
<!--            </DropdownMenu>-->
          </Dropdown>

        </div>
      </div>
      <div class="uflex mtl">
        <div class="label">
          <img class="uicon" :src="require('@/assets/images/detail/Plan.png')">设置截止时间
        </div>
        <div class="flex1"><DatePicker v-model="addMyTask.end_time" type="date" class="search" placeholder="截止时间"></DatePicker></div>
      </div>
      <div class="uflex mtl">
        <div class="label">
          <img class="uicon" :src="require('@/assets/images/detail/priority.png')">优先级
        </div>
        <div class="flex1"><Rate v-model="addMyTask.priority" custom-icon="iconfont hy-star"></Rate></div>
      </div>
      <div class="uflex mtl">
        <div class="label">
          <img class="uicon" :src="require('@/assets/images/detail/Person.png')">执行人
        </div>
        <div class="flex1 down">
          <Dropdown placement="right-start">
            <span class="cbod">{{addMyTask.username}}</span>
            <DropdownMenu slot="list" style="padding: 6px 10px;">
              <Button type="default" ghost long @click="search">搜索</Button>
              <RadioGroup v-model="addMyTask.member_id" vertical>
                <DropdownItem @click.native="checkTaskPerson(item)" v-for="(item,index) in proInFo" :key="index">
                  <Radio :label="item.pjMemberId">{{item.username}}</Radio>
                </DropdownItem>
              </RadioGroup>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div slot="footer">
        <Button type="default" ghost @click="save">完成并创建下一个</Button>
        <Button type="primary" @click="finishTask">完成</Button>
      </div>
    </Modal>

	</div>
</template>

<script>
import {
  getTeamMember,
  getRegion,
  screeningTeam,
  getProjectInfo,
  getTeam,
  getTeamProject,
  addProject,
  upTeamProjectInfo,
  addTask,
  getUserInfo,
  getProUser,
  cancelStar,
  addStar,
  cancelTaskStar,
  addTaskStar,
  cancelPersonnelStar,
  addPersonnelStar,
  getProTask,
} from "../utils/rq-team";
  export default {
		data() {
			return {
			  //判断项目或任务
        state:'',
			  sfStar:false,
			  i:0,
        //类型
        types:[],
        //节点
        nodes:[],
			  //团队成员信息
			  teammember:{},
        //地区
        region:[],

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
        //节点
        node:{},
        //添加项目
        addteamdata:{
          projectName:'',
          nodeId:'',
          endTime:'',
          placeId:'',
          initiator:'',
          teamId:'',
          priority:'',
          completeTime:'',
          principal:'',
          typeId:'',
          //非必填
          remarks:'',
          tags:'',
          executors:'',
          releaseTime:'',
          //
          username:'',
          region:'',
        },
        //添加项目团队信息
        addProInfo:{
			  teamId:'',
        teamName:'',
        typeId:'',
        typeName:'',
        nodeId:'',
        nodeName:'',
      },
        //添加项目任务
        addMyTask: {
          user_id:'',
          pj_id:'',
          name: '',
          end_time:'',
          priority:'',
          status:'',
          member_id:'',
          state: '',
          username:'',
        },
				curTime:'',
        //项目弹窗-任务搜索
        proPopWinTask:{
          practitioners:'',
          keyword:'',
        },
				formItem: {
					area:'',
					level:'非常紧急'
				},
        list:[],
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				list5:[],
				index:0,
				// dept: ['数字化团队','硬件部 团队1','硬件部 团队2','软件部 团队1','软件部 团队2'],
				// deptName:'数字化团队',
        dept: [],
        deptName:'',
        deptId:'',
				modal: false,
				addModal: false,
				proModal: false,
				visible: false,
				show:false,
				vo:{
					title:'',
					createTime:'',
					onlineTime:'',
					rate:5,
					area:'台州 椒江',
					person:'赵迁',
					remark:''
				},
				proInfo:{},
				areas:['台州 椒江','台州 温州','台州 黄岩','台州 温岭'],
				persons: ['赵迁', '钱隼', '孙俪', '李轴'],
				valueText:3,

        participants:false,
        adduser:{
			    avatar:[],
          memberId:[],
        },
        addProjectUser:false,
        projectUser:'',
        //项目弹窗添加参与者
        upProInfo: {
          projectId:'',
          user_id:'',
        },
        addTaskWin:false,
        //筛选信息
        screeningInfo:{
          teamId:'',
          placeId:'',
          priority:'',
          keyword:'',
        },
        //当前用户信息
        userInFo:{
          userId:'',
          userName:'',
          avatar:'',
          status:0,
          saturation:0,
          teamMemberId:'',
        },
        //项目用户信息
        proInFo:{
          userId:'',
          username:'',
          pjMemberId:'',
        },

      }
		},
		created() {
      // this.$nextTick(() => {
      // })
      //当前用户信息
      getUserInfo().then(res=>{
        this.userInFo=res.data
        //获取地区
        getRegion().then(res => {
          this.region=res.data
        })
        //获取团队
        getTeam().then(res =>{
          this.deptName=res.data[0].teamName
          this.deptId=res.data[0].teamId
          this.screeningInfo.teamId=res.data[0].teamId
          this.addProInfo.teamName=res.data[0].teamName
          this.addteamdata.teamId=res.data[0].teamId
          this.addProInfo.typeName=res.data[0].types[0].typeName
          this.addteamdata.typeId=res.data[0].types[0].typeId
          this.addProInfo.nodeName=res.data[0].types[0].nodes[0].nodeName
          this.addteamdata.nodeId=res.data[0].types[0].nodes[0].nodeId
          this.dept=res.data
          this.types=this.dept[0].types
          this.nodes=this.dept[0].types[0].nodes
          //获取团队所属项目
          getTeamProject(this.deptId/*,this.userInFo*/).then(res=>{
            this.node=res.data
            this.list=res.data
          })
          //获取团队成员
          getTeamMember(this.deptId/*,this.userInFo*/).then(res=>{
            this.teammember=res.data
          })
        })

      })
      // blueName()
		},
		methods: {
		  //蓝名
      // blueName(){
      // this.listmatch(/\{[^\}]+\}/)[0]
      // },
			// getStarPro(){
			// 	this.$mock('starPro').then(res => {
			// 		this.list1=res.filter(item=>item.status.id===1)
			// 		this.list2=res.filter(item=>item.status.id===2)
			// 		this.list3=res.filter(item=>item.status.id===3)
			// 		this.list4=res.filter(item=>item.status.id===4)
			// 		this.list5=res.filter(item=>item.status.id===5)
			// 	}).catch()
			// },
      //筛选选择地区点击全部
      Place(){
        this.screeningInfo.placeId=''
      },
      //筛选选择地区
      choosePlace(item){
        this.screeningInfo.placeId=item.placeId
      },
      //筛选优先级
      choosePriority(){
        if (this.formItem.level=='非常紧急'){
          this.screeningInfo.priority=2
        }else if(this.formItem.level=='紧急'){
          this.screeningInfo.priority=1
        }else if (this.formItem.level=='正常'){
          this.screeningInfo.priority=0
        }else if (this.formItem.level=='全部'){
          this.screeningInfo.priority=''
        }
      },
			// 项目弹窗
			openPro(info){
				this.proInfo = info
        this.projectId=info.pj_id
        this.projectName=info.name
				this.proModal = true
        getProjectInfo(info/*,this.userInFo*/).then(res => {
          this.projectInfo=res.data[0]
          this.taskInfo=res.data[1]
          this.unfinishedTask=this.taskInfo.length
          for (this.i=0;this.i<this.taskInfo.length;this.i++){
            if (res.data[1][this.i].status==3){
              this.unfinishedTask=this.unfinishedTask-1
            }
          }
          this.projectPartInfo=res.data[2]
          this.milestone=res.data[3]
          this.dynamic=res.data[4]
          this.folderInfo=res.data[5]
          for (this.i=0;this.i<this.projectPartInfo.length;this.i++){
            if (this.i==this.projectPartInfo.length){
              this.upProInfo.user_id=this.upProInfo.user_id+res.data[2][this.i].user_id
            }else{
              this.upProInfo.user_id=this.upProInfo.user_id+','+res.data[2][this.i].user_id
            }
          }
          this.upProInfo.projectId=this.dynamic.pj_id
        })
			},
			//条件查询确定按钮事件
      handleSubmit(){
        // this.list1=[]
        // this.list2=[]
        // this.list3=[]
        // this.list4=[]
        // this.list5=[]
        //this.getStarPro()
        screeningTeam(this.screeningInfo,this.userInFo).then(res => {
          this.node=res.data
          this.list=res.data
          // let newData=res.data.filter(item=>{
          //   if(this.formItem.title&&!this.formItem.area){
          //     return item.title.indexOf(this.formItem.title)>-1
          //   }else if(!this.formItem.title&&this.formItem.area){
          //     return item.area===this.formItem.area
          //   }else if(!this.formItem.title&&this.formItem.area){
          //     return item.title.indexOf(this.formItem.title)>-1&&item.area===this.formItem.area
          //   }else{
          //     return item
          //   }
          // })
          //   this.list1=newData.filter(item=>item.status.id===1)
          //   this.list2=newData.filter(item=>item.status.id===2)
          //   this.list3=newData.filter(item=>item.status.id===3)
          //   this.list4=newData.filter(item=>item.status.id===4)
          //   this.list5=newData.filter(item=>item.status.id===5)
          }).catch()
      },
			// handleSubmit(){
			// 	this.list1=[]
			// 	this.list2=[]
			// 	this.list3=[]
			// 	this.list4=[]
			// 	this.list5=[]
			// 	//this.getStarPro()
			// 	this.$mock('starPro').then(res => {
			// 		let newData=res.filter(item=>{
			// 			if(this.formItem.title&&!this.formItem.area){
			// 				return item.title.indexOf(this.formItem.title)>-1
			// 			}else if(!this.formItem.title&&this.formItem.area){
			// 				return item.area===this.formItem.area
			// 			}else if(!this.formItem.title&&this.formItem.area){
			// 				return item.title.indexOf(this.formItem.title)>-1&&item.area===this.formItem.area
			// 			}else{
			// 				return item
			// 			}
			// 		})
			// 		this.list1=newData.filter(item=>item.status.id===1)
			// 		this.list2=newData.filter(item=>item.status.id===2)
			// 		this.list3=newData.filter(item=>item.status.id===3)
			// 		this.list4=newData.filter(item=>item.status.id===4)
			// 		this.list5=newData.filter(item=>item.status.id===5)
			// 	}).catch()
			// },

			// 团队成员弹窗
			open(){
			  getTeamMember(this.deptId/*,this.userInFo*/).then(res => {
			    this.teammember = res.data
        }),
				this.modal = true
			},
      //添加项目
			openAdd(item){
        this.addteamdata.projectName=''
        this.addteamdata.priority=''
        this.addteamdata.endTime=''
        this.addteamdata.region=this.region[0].placeName
        this.addteamdata.placeId=this.region[0].placeId
        this.addteamdata.remarks=''
        this.addteamdata.tags=''

        this.addteamdata.principal=this.userInFo.userId
			  this.addProInfo.nodeName=item.node_name
        this.addteamdata.nodeId=item.node_id
        this.addteamdata.initiator=this.userInFo.userId
        // this.addteamdata.region=this.region[0].placeName
        this.addteamdata.username=this.userInFo.userName
        this.adduser.avatar=[];
        this.adduser.memberId=[];
        this.adduser.avatar.push(this.userInFo.avatar)
        this.adduser.memberId.push(this.userInFo.teamMemberId)
				const date = new Date()
				const year = date.getFullYear()
				const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
				const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
				const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
				const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
				const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
				this.vo.createTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
				this.addModal = true
			},
      //添加任务
      addTeamTask(){
        getProUser(this.projectId).then(res=>{
          this.proInFo=res.data
        })
        this.addTaskWin=true
      },
      //添加参与者弹窗
      addParticipants(){
        this.participants=true
      },
      //选择团队
      onTeam(item,index){
        this.addProInfo.teamName=item.teamName
        this.addteamdata.teamId=item.teamId
        this.addProInfo.typeName=this.dept[index].types[0].typeName
        this.addteamdata.typeId=this.dept[index].types[0].typeId
        this.addProInfo.nodeName=this.dept[index].types[0].nodes[0].nodeName
        this.addteamdata.nodeId=this.dept[index].types[0].nodes[0].nodeId
        this.types=this.dept[index].types
        this.nodes=this.dept[index].types[0].nodes
      },
      //选择类型
      onType(item){
        this.addProInfo.typeName=item.typeName
        this.addteamdata.typeId=item.typeId
      },
      //选择节点
      onNode(item){
        this.addProInfo.nodeName=item.nodeName
        this.addteamdata.nodeId=item.nodeId
      },
      //添加项目标签回车事件
      addLabel(){

      },
      //添加参与者
      addUser(item){
        if(!(this.addteamdata.executors.indexOf(item.memberId)!=-1)){
          if(this.addteamdata.executors.length==0){
            this.addteamdata.executors=item.memberId
          }else{
            this.addteamdata.executors=this.addteamdata.executors+','+item.memberId
          }

          this.adduser.avatar.push(item.avatar)
          this.adduser.memberId.push(item.memberId)
          this.addProjectUser=false
        }
        this.participants=false
      },
      //项目弹窗添加参与者弹窗
      addproUser(){
        this.addProjectUser=true
      },
      //项目弹窗添加参与者
      addProUser(item){

        for (this.i=0;this.i<=this.projectPartInfo.length;this.i++){
          if (item.userid=this.projectPartInfo[this.i].user_id){
            this.addProjectUser=false

          }else{
            this.upProInfo.user_id=this.upProInfo.user_id+','+item.userid
            upTeamProjectInfo(this.upProInfo)
            this.addProjectUser=false
          }
        }
        upTeamProjectInfo(this.upProInfo)
        // upTeamProjectInfo(this.upProInfo).then(res=>{
        // })
      },

			search(){
        getProTask(/*this.userInFo,*/this.projectId,this.proPopWinTask).then(res=>{
          this.taskInfo=res.data
          this.unfinishedTask=this.taskInfo.length
          for (this.i=0;this.i<this.taskInfo.length;this.i++){
            if (res.data[1][this.i].status==3){
              this.unfinishedTask=this.unfinishedTask-1
            }
          }
        })
			},
      //完成并创建下一个
			save(){
        this.adduser={
          avatar:[],
          memberId:[],
        }
      },
      //完成添加项目
			finish(){
        if (this.addteamdata.projectName==''){
          this.$Modal.confirm({
            title: '项目名称未填写',
            onOk: () =>{
              this.addModal = true
            }
          })
        }else if (this.addteamdata.nodeId==''){
          this.$Modal.confirm({
            title: '节点未选择',
            onOk: () =>{
              this.addModal = true
            }
          })
        }else if (this.addteamdata.endTime==''){
          this.$Modal.confirm({
            title: '截止时间未选择',
            onOk: () =>{
              this.addModal = true
            }
          })
        }else if (this.addteamdata.placeId==''){
          this.$Modal.confirm({
            title: '地区未选择',
            onOk: () =>{
              this.addModal = true
            }
          })
        }else if (this.addteamdata.initiator==''){
          this.$Modal.confirm({
            title: '没有发布者',
            onOk: () =>{
              this.addModal = true
            }
          })
        }else if (this.addteamdata.teamId==''){
          this.$Modal.confirm({
            title: '团队未选择',
            onOk: () =>{
              this.addModal = true
            }
          })
        }else if (this.addteamdata.priority==''){
          this.$Modal.confirm({
            title: '优先级未选择',
            onOk: () =>{
              this.addModal = true
            }
          })
        }else if (this.addteamdata.principal==''){
          this.$Modal.confirm({
            title: '负责人未添加',
            onOk: () =>{
              this.addModal = true
            }
          })
        }else if (this.addteamdata.typeId==''){
          this.$Modal.confirm({
            title: '项目类型未选择',
            onOk: () =>{
              this.addModal = true
            }
          })
        }else{
          addProject(this.addteamdata).then(res => {
            if (res.code==200){
              getTeamProject(this.deptId/*,this.userInFo*/).then(res=>{
                this.node=res.data
                this.list=res.data
              })
            }
          })
        }
				this.addModal = false
        this.adduser={
          avatar:[],
          memberId:[],
        }
			},
      //完成添加项目任务
      finishTask(){
        this.addMyTask.pj_id=this.projectId
        this.addMyTask.user_id=this.userInFo.userId
        if (this.addMyTask.name==''){
          this.$Modal.confirm({
            title: '产品需求未填写',
            onOk: () =>{
              this.addTaskWin = true
            }
          })
        }else if (this.addMyTask.priority==''){
          this.$Modal.confirm({
            title: '优先级未选择',
            onOk: () =>{
              this.addTaskWin = true
            }
          })
        }else if (this.addMyTask.end_time==''){
          this.$Modal.confirm({
            title: '截止时间未确定',
            onOk: () =>{
              this.addTaskWin = true
            }
          })
        }else if (this.addMyTask.member_id==''){
          this.$Modal.confirm({
            title: '执行人未选择',
            onOk: () =>{
              this.addTaskWin = true
            }
          })
        }else{
          addTask(this.addMyTask).then(res=>{
            if (res.code==200){
              getProjectInfo(this.proInfo/*,this.userInFo*/).then(res=>{
                if (res.code==200){
                  console.log("123123")
                  this.taskInfo=res.data[1]
                }
              })
            }
          })
        }
        this.addTaskWin=false
      },
      //完成并创建下一个任务
      saveTask(){

      },
      //选择地区
      checkPlace(item){
			  this.addteamdata.region=item.placeName
      },
      //选择项目负责人
      checkProPerson(item){
        this.addteamdata.username=item.userName
      },
      //选择任务执行人
      checkTaskPerson(item){
        this.addMyTask.username=item.username
      },
      //取消项目星标
			cancel(item){
				this.$Modal.confirm({
					title: '确认取消星标？',
					onOk: () => {
            cancelStar(item.pj_id/*,this.userInFo*/).then(res=>{
              if (res.code==200){
                getTeamProject(this.deptId/*,this.userInFo*/).then(res=>{
                this.node=res.data
                this.list=res.data
              })
              }
            })
						// this.$Message.info('点击取消!')
					}
				});
			},
      //取消项目任务星标
      cancelProTask(item){
        this.$Modal.confirm({
          title: '确认取消星标？',
          onOk: () => {
            cancelTaskStar(item.taskId/*,this.userInFo*/).then(res=>{
              getProjectInfo(this.proInfo/*,this.userInFo*/).then(res=>{
                if (res.code==200){
                  this.taskInfo=res.data[1]
                }
              })
            })
            // this.$Message.info('点击取消!')
          }
        });
      },
      //取消人员星标
      cancelPersonnel(item){
        this.$Modal.confirm({
          title: '确认取消星标？',
          onOk: () => {
            cancelPersonnelStar(item.userId/*,this.userInFo*/).then(res=>{
              if (res.code==200){
                getTeamMember(this.deptId/*,this.userInFo*/).then(res=>{
                  this.teammember=res.data
                })
              }
            })
            // this.$Message.info('点击取消!')
          }
        });
      },
      //添加项目星标
      star(item){
        this.$Modal.confirm({
          title:'确认添加星标？',
          onOk:()=>{
            addStar(item.pj_id/*,this.userInFo*/).then(res=>{
              if (res.code==200){
                getTeamProject(this.deptId/*,this.userInFo*/).then(res=>{
                this.node=res.data
                this.list=res.data
              })}
            })
          }
        })
      },
      //添加项目任务星标
      starProTask(item){
        this.$Modal.confirm({
          title:'确认添加星标？',
          onOk:()=>{
            addTaskStar(item.taskId/*,this.userInFo*/).then(res=>{
              getProjectInfo(this.proInfo/*,this.userInFo*/).then(res=>{
                if (res.code==200){
                  this.taskInfo=res.data[1]
                }
              })
            })
          }
        })
      },
      //添加人员星标
      starPersonnel(item){
        this.$Modal.confirm({
          title:'确认添加星标？',
          onOk:()=>{
            addPersonnelStar(item.userId/*,this.userInFo*/).then(res=>{
              if (res.code==200){
                getTeamMember(this.deptId/*,this.userInFo*/).then(res=>{
                this.teammember=res.data
              })
              }
            })
          }
        })
      },
			toNext(i){
				if(i==0){//上一个
					if(this.index!=0){
						this.index=this.index-1
						this.deptName = this.dept[this.index].teamName
            this.deptId = this.dept[this.index].teamId
            this.screeningInfo.teamId = this.dept[this.index].teamId
            getTeamProject(this.deptId/*,this.userInFo*/).then(res=>{
              this.node=res.data
              this.list=res.data
            })
					}
				}else{//下一个
					if(this.index!=this.dept.length-1){
						this.index=this.index+1
						this.deptName = this.dept[this.index].teamName
            this.deptId = this.dept[this.index].teamId
            this.screeningInfo.teamId = this.dept[this.index].teamId
            getTeamProject(this.deptId/*,this.userInFo*/).then(res=>{
              this.node=res.data
              this.list=res.data
            })
					}
				}
			},
      end(item) {

      },
			release(){
				this.modal = false
			},
			currentTime() {
				let yy = new Date().getFullYear();
				let mm = new Date().getMonth()+1;
				let dd = new Date().getDate();
				let hh = new Date().getHours();
				let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
				return yy+'-'+mm+'-'+dd+' '+hh+':'+mf;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grid>.ucard{
		width: calc(100% / 3 - 10px);
		margin-left: 15px;
	}
	.grid>.ucard:nth-child(3n+1){margin-left: 0;}
.ivu-rate,.ivu-progress{display: block;}
::v-deep .red-lbd .ivu-progress-bg {background-color: #FF005E;}
::v-deep .yel-lbd .ivu-progress-bg {background-color: #FCA13E;}
::v-deep .blu-lbd .ivu-progress-bg {background-color: #006FFF;}
::v-deep .ivu-rate-text{float: right;margin-top: 5px;margin-left:0}
::v-deep .ivu-progress-text{float: right;color: #fff;}
::v-deep .ivu-rate-star-chart{margin-right: 0;}
::v-deep .ivu-rate-star-full .ivu-icon {color: #fff;}
::v-deep .ivu-rate-star-zero .ivu-icon {color: #494E59;}
::v-deep .rates .ivu-rate-star-full .ivu-icon {color: #FCA13E;vertical-align: baseline;}
::v-deep .rates .ivu-rate-star-zero .ivu-icon {color: #4E3F36;vertical-align: baseline;}
::v-deep .down .ivu-select-dropdown{margin-left: 10px;margin-top: -3px;background-color: #0F182A;border: 1px solid #BBBBBB;text-align: left;}

::v-deep .drop .ivu-select-dropdown{width: 200px;height: 160px;background-color: #0F182A;border: 1px solid #BBBBBB;text-align: left;}

::v-deep .input .ivu-input{background-color: #0F182A;color: #fff;text-align: left;}
::v-deep .search .ivu-input{background-color: #0F182A;border: none;color: #fff;}
::v-deep .ivu-form .ivu-form-item-label{color: #fff;}
::v-deep .form .ivu-form-item{margin-bottom: 0;}
::v-deep .ivu-modal-content{background-color:#0C1321;color: #fff;}
::v-deep .ivu-modal-header {border-bottom: 1px solid #324364;}
::v-deep textarea.ivu-input{background-color: #0F182A;}
::v-deep .ivu-modal-header-inner{color: #fff}
::v-deep .ivu-modal-close .ivu-icon-ios-close{color: #fff}
::v-deep .ivu-modal-body {padding: 0;}
::v-deep .ivu-modal-footer {border-top:none}
::v-deep .ivu-modal-body .ivu-input{background-color: #0F182A;}
.rates{display: inline-block}
::v-deep .rates .ivu-icon-ios-square{font-size: 12px;vertical-align: text-top;}
::v-deep .ivu-rate-star-chart{margin-right: 1px;}
 .flex1 .ivu-select-dropdown {
    width: 216px;
}
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
.col5 .ps {
  height: calc(100vh - 152px);
}
.col3 .ps {
  height: 440px;
}
.man{vertical-align: middle;margin-left: 20px;}
.next{vertical-align: middle;background-color: #0C1321;border-radius: 8px;padding: 10px 6px 6px;cursor: pointer;}
.inext{
	background-color: #0C1321;border-radius: 8px;padding: 8px 20px;font-weight: 700;
}
.boder{border: 1px solid #324364;}

.uicon {
	width: 18px;
	height: 18px;
	margin-right: 10px;
	vertical-align: middle;
}
::v-deep .ivu-select-arrow,::v-deep .ivu-input-suffix i{color: #fff;}
.cbod{border: 1px solid #FEFEFE;border-radius: 4px;padding: 4px 12px;cursor: pointer;}
.more{
	display: flex;
	float: left;
	padding-top: 6px;
	margin-left: 15px;
	cursor: pointer;
	.ivu-icon{
		margin-right: 5px;
	}
}
.item-li{
	padding: 20px 15px 10px;
	border-bottom: 1px solid #9C9EA3 ;
	.ml20 .ivu-icon{vertical-align: bottom;margin-left: 2px;}
}
.num{margin-left: 10px;font-weight: 700;}
.plus{padding: 4px;border-radius: 5px;background-color: #141E33;}
.rbord{border-right: 1px solid #324364;}
.form{height: 40px;}
.foot{height: 95px;border-top: 1px solid #324364;padding: 20px 30px;background-color: #0C1321;}
.mdflex{
	display: flex;
}
.mdflex .lbox{padding: 15px;flex: 1;border-right: 1px solid #2E3E5E;background-color: #0C1321;}
.mdflex .rbox{flex: 1;background-color: #0F182A;}
::v-deep .ivu-progress-inner {background-color: #141E33;}
.checkbox {
	display: inline-block;
	width: 25px;
	height: 25px;
	border-radius: 5px;
	background-color: #324364;
	margin-right: 15px;
	vertical-align: middle;
}
.wbox{border: 1px solid #E6E6E9;border-radius: 8px;height: 250px;}
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
.modal {
    padding: 20px 30px 30px;
}
/*步骤图片*/
.step-icon{
	width: 35px;
	height: 35px;
	margin: 0 3px;
	cursor: pointer;
}
.live{height: 2px;background-color: #006FFF;}
.unlive{height: 2px;background-color: #324364;}
::v-deep .ivu-time-picker-cells-cell,::v-deep .ivu-date-picker-header,::v-deep .ivu-date-picker-cells span em{color: #0F182A;}

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
::v-deep .ivu-tree-title{color: #fff;}

.theader{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	border-bottom: 1px solid #82868D;
}
.tbody{padding: 10px 20px;height: 300px;overflow: auto;}
.tfooter{
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
	padding: 5px 20px;
	cursor: pointer;
}
.flexNode{
  display: flex;
  flex-wrap: nowrap;
}
</style>
