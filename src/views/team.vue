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
						<Option value="台州 椒江">台州 椒江</Option>
						<Option value="台州 黄岩">台州 黄岩</Option>
						<Option value="台州 路桥">台州 路桥</Option>
						<Option value="台州 临海">台州 临海</Option>
						<Option value="台州 温岭">台州 温岭</Option>
						<Option value="台州 玉环">台州 玉环</Option>
						<Option value="台州 天台">台州 天台</Option>
						<Option value="台州 仙居">台州 仙居</Option>
						<Option value="台州 三门">台州 三门</Option>
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
					<Input class="search" suffix="md-search" placeholder="搜索" style="width: auto" />
				</FormItem>
				<Button type="primary" @click="handleSubmit()">确定</Button>
			</div>
		</Form>
		<div class="grid">
			<div class="col5">
				<div class="uflex mtm">
					<div class="btxt">产品(任务)计划<span class="ml">{{list1.length}}</span></div>
					<div class="addbtn" @click="openAdd">+</div>
				</div>
			</div>
			<div class="col5">
				<div class="uflex mtm">
					<div class="btxt">前期设计<span class="ml">{{list2.length}}</span></div>
					<div class="addbtn" @click="openAdd">+</div>
				</div>
			</div>
			<div class="col5">
				<div class="uflex mtm">
					<div class="btxt">正在研发<span class="ml">{{list3.length}}</span></div>
					<div class="addbtn" @click="openAdd">+</div>
				</div>
			</div>
			<div class="col5">
				<div class="uflex mtm">
					<div class="btxt">测试<span class="ml">{{list4.length}}</span></div>
					<div class="addbtn" @click="openAdd">+</div>
				</div>
			</div>
			<div class="col5">
				<div class="uflex mtm">
					<div class="btxt">准备发布<span class="ml">{{list5.length}}</span></div>
					<div class="addbtn" @click="openAdd">+</div>
				</div>
			</div>
		</div>
		<div class="grid">
			<div class="col5">
				<perfect-scrollbar>
					<div class="ucard red-lbd" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list1" :key="index">
						<div class="uflex">
							<div class="btxt">{{item.title}}</div>
							<div>
								<img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">
							</div>
						</div>
						<Rate disabled show-text v-model="item.star"  custom-icon="iconfont hy-star">
							<span class="mr8">发起人</span>
							<span>{{item.creator}}</span>
						</Rate>
						<Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">
								<span>{{item.progress}}</span>
						</Progress>
						<div class="uflex mtb10">
							<div class="col3 obtn uels">{{parseTime(item.date)}}</div>
							<div class="col3 sbtn uels">{{item.area}}</div>
							<div class="col3 sbtn uels">{{item.optman}}</div>
						</div>
						<div class="flex">
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
				</perfect-scrollbar>
			</div>
			<div class="col5">
				<perfect-scrollbar>
					<div class="ucard red-lbd" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list2" :key="index">
						<div class="uflex">
							<div class="btxt">{{item.title}}</div>
							<div>
								<img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">
							</div>
						</div>
						<Rate disabled show-text v-model="item.star"  custom-icon="iconfont hy-star">
							<span class="mr8">发起人</span>
							<span>{{item.creator}}</span>
						</Rate>
						<Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">
								<span>{{item.progress}}</span>
						</Progress>
						<div class="uflex mtb10">
							<div class="col3 obtn uels">{{parseTime(item.date)}}</div>
							<div class="col3 sbtn uels">{{item.area}}</div>
							<div class="col3 sbtn uels">{{item.optman}}</div>
						</div>
						<div class="flex">
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
				</perfect-scrollbar>
			</div>
			<div class="col5">
				<perfect-scrollbar>
					<div class="ucard red-lbd" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list3" :key="index">
						<div class="uflex">
							<div class="btxt">{{item.title}}</div>
							<div>
								<img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">
							</div>
						</div>
						<Rate disabled show-text v-model="item.star"  custom-icon="iconfont hy-star">
							<span class="mr8">发起人</span>
							<span>{{item.creator}}</span>
						</Rate>
						<Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">
								<span>{{item.progress}}</span>
						</Progress>
						<div class="uflex mtb10">
							<div class="col3 obtn uels">{{parseTime(item.date)}}</div>
							<div class="col3 sbtn uels">{{item.area}}</div>
							<div class="col3 sbtn uels">{{item.optman}}</div>
						</div>
						<div class="flex">
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
				</perfect-scrollbar>
			</div>
			<div class="col5">
				<perfect-scrollbar>
					<div class="ucard red-lbd" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list4" :key="index">
						<div class="uflex">
							<div class="btxt">{{item.title}}</div>
							<div>
								<img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">
							</div>
						</div>
						<Rate disabled show-text v-model="item.star"  custom-icon="iconfont hy-star">
							<span class="mr8">发起人</span>
							<span>{{item.creator}}</span>
						</Rate>
						<Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">
								<span>{{item.progress}}</span>
						</Progress>
						<div class="uflex mtb10">
							<div class="col3 obtn uels">{{parseTime(item.date)}}</div>
							<div class="col3 sbtn uels">{{item.area}}</div>
							<div class="col3 sbtn uels">{{item.optman}}</div>
						</div>
						<div class="flex">
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
				</perfect-scrollbar>
			</div>
			<div class="col5">
				<perfect-scrollbar>
					<div class="ucard red-lbd" @click="openPro(item)" :class="['yel-lbd','blu-lbd'][Math.floor(Math.random() * 1)]" v-for="(item,index) in list5" :key="index">
						<div class="uflex">
							<div class="btxt">{{item.title}}</div>
							<div>
								<img class="img" @click.stop="cancel(item.id)" :src="require('@/assets/images/home/Collection.png')">
							</div>
						</div>
						<Rate disabled show-text v-model="item.star"  custom-icon="iconfont hy-star">
							<span class="mr8">发起人</span>
							<span>{{item.creator}}</span>
						</Rate>
						<Progress :percent="parseInt(item.progress.split('/')[0])/parseInt(item.progress.split('/')[1])*100" :stroke-width="8">
								<span>{{item.progress}}</span>
						</Progress>
						<div class="uflex mtb10">
							<div class="col3 obtn uels">{{parseTime(item.date)}}</div>
							<div class="col3 sbtn uels">{{item.area}}</div>
							<div class="col3 sbtn uels">{{item.optman}}</div>
						</div>
						<div class="flex">
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
				</perfect-scrollbar>
			</div>
		</div>
		<!-- 添加弹窗 -->
		<Modal v-model="addModal" scrollable title="创建新项目">
			<div class="mg20">
				<div class="bold">项目名称</div>
				<Input class="mt5" v-model="vo.title" size="large" placeholder="输入标题以新建项目" />
				<div class="uflex mt15 ml">
					<div class="label">
						<img class="uicon" :src="require('@/assets/images/detail/priority.png')">优先级
					</div>
					<div class="flex1"><Rate v-model="vo.rate" custom-icon="iconfont hy-star"></Rate></div>
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
						<img class="uicon" :src="require('@/assets/images/detail/Time.png')">计划上线时间
					</div>
					<div class="flex1">
						<DatePicker v-model="vo.onlineTime" format="yyyy-MM-dd HH:mm" type="datetime" class="search" placeholder="计划上线时间"></DatePicker>						
					</div>
				</div>
				<div class="uflex mt15 ml">
					<div class="label">
						<Icon type="ios-pin-outline" size="24" style="margin-left: -4px;margin-right: 5px;"/>地区
					</div>
					<div class="flex1 down">
						<Dropdown placement="right-start">
							<span class="cbod">{{vo.area}}</span>
							<DropdownMenu slot="list" style="padding: 6px 10px;">
								<Button type="default" ghost long @click="search">搜索</Button>
								<RadioGroup v-model="vo.area" vertical>
									<DropdownItem @click.native="checkPerson(item)" v-for="(item, index) in areas" :key="index">
										<Radio :label="item">{{item}}</Radio>
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
							<span class="cbod">{{vo.person}}</span>
							<DropdownMenu slot="list" style="padding: 6px 10px;">
								<Button type="default" ghost long @click="search">搜索</Button>
								<RadioGroup v-model="vo.person" vertical>
									<DropdownItem @click.native="checkPerson(item)" v-for="(item, index) in persons" :key="index">
										<Radio :label="item">{{item}}</Radio>
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
						<Input v-model="vo.content" type="textarea" :rows="2" placeholder="添加备注" />
					</div>
				</div>
				<div v-show="show">
					<div class="item-li drop">
						<Dropdown placement="top-start">
							<span class="ml20">数字化团队<Icon type="ios-arrow-down" size="22"/></span>
							<DropdownMenu slot="list" style="padding: 6px 10px;">
								<div style="text-align: center;">选择位置</div>
								<div style="height: 75px;">
									<div class="uflex mt10">
										<span>团队</span>
										<span>数字化团队<Icon type="ios-arrow-forward"></Icon></span>
									</div>
								</div>
								
								<div style="text-align: center;">
									<Button type="primary" @click="search">确定</Button>
								</div>	
							</DropdownMenu>
						</Dropdown>
						<Dropdown placement="top-start">
							<span class="ml20">产品(任务)计划<Icon type="ios-arrow-down" size="22"/></span>
							<DropdownMenu slot="list" style="padding: 6px 10px;">
								<div style="text-align: center;">选择状态</div>
								<div style="height: 75px;">
									<div class="uflex mt10">
										<span>节点</span>
										<span>产品研发<Icon type="ios-arrow-forward"></Icon></span>
									</div>
								</div>
								
								<div style="text-align: center;">
									<Button type="primary" @click="search">确定</Button>
								</div>	
							</DropdownMenu>
						</Dropdown>
						
					</div>
					<div class="item-li">
						<div class="uflex">
							<div class="label">
								<img class="uicon" :src="require('@/assets/images/detail/Label.png')">标签
							</div>
							<div class="flex1">添加标签</div>
						</div>
					</div>
					<div class="item-li">
						<div class="btxt">参与者<span class="num">2</span></div>
						<div class="mflex mt10">
							<Avatar shape="square" class="mr8" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />
							<Avatar shape="square" class="mr8" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />
							<span class="plus"><Icon type="md-add" size="24"/></span>
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
		<Modal v-model="proModal" class="modal" scrollable :title="proInfo.title" :footer-hide="true" width="1200">
			<div class="mdflex">
				<div class="lbox">
					<div class="grid">
						<div class="col2 rbord">
							<div class="flex mb10">
								<div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Node.png')">节点</div>
								<div class="flex1 uels">产品研发</div>
							</div>
							<div class="flex mb10">
								<div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Time.png')">时间</div>
								<div class="flex1 uels">设置截止时间</div>
							</div>
							<div class="flex mb10">
								<div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Remarks.png')">备注</div>
								<div class="flex1 uels">待添加</div>
							</div>
							<div class="flex mb10">
								<div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Label.png')">标签</div>
								<div class="flex1 uels">添加标签</div>
							</div>
							<div class="flex">
								<div class="col2 mflex"><Icon type="ios-pin-outline" size="24" style="margin-left: -4px;margin-right: 5px;"/>地区</div>
								<div class="flex1 uels">台州路桥</div>
							</div>
						</div>
						<div class="col2">
							<div class="flex mb10 ml">
								<div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Initiate.png')">发起者</div>
								<div class="flex1 uels"><div class="checkbox"></div><span>张明成</span></div>
							</div>
							<div class="flex mb10 ml">
								<div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Team.png')">团队</div>
								<div class="flex1 uels">数字化团队</div>
							</div>
							<div class="flex mb10 ml">
								<div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/priority.png')">优先级</div>
								<div class="flex1 uels" style="margin-top: -5px;">
									<Rate disabled v-model="valueText" custom-icon="iconfont hy-star"></Rate>
								</div>
							</div>
							<div class="flex mb10 ml">
								<div class="col2 mflex"><img class="micon" :src="require('@/assets/images/detail/Plan.png')">计划完成时间</div>
								<div class="flex1 uels">待添加</div>
							</div>
							<div class="flex mb10 ml">
								<div class="col2"><img class="micon" :src="require('@/assets/images/detail/Person.png')">负责人</div>
								<div class="flex1 uels">李达</div>
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
					<div class="wbox">
						<div class="ucard flex">
							<div class="lfbox">
								<Icon type="md-arrow-dropdown" size="24"/>
								<div class="state">进行中</div>
							</div>
							<div class="flex1 mg30">
								<div class="uflex">
									<div>设备机台制作二维码，先出设计</div>
									
								</div>
								<Rate disabled show-text v-model="valueText"  custom-icon="iconfont hy-star">
									<span class="mr8">发起人</span>
									<span>张新城</span>
								</Rate>
								<Progress :percent="6/8*100" :stroke-width="8">
									<span>6/8</span>
								</Progress>
								<div class="flex mt5">
									<div class="obtn uels redbtn pd15">10月10号截止</div>
									<div class="sbtn pd15 uels mlr">周文杰</div>
								</div>
							</div>
							<img class="img mr20" :src="require('@/assets/images/home/Collection.png')">
						</div>
						<div class="ucard flex">
							<div class="lfbox">
								<Icon type="md-arrow-dropdown" size="24"/>
								<div class="state">进行中</div>
							</div>
							<div class="flex1 mg30">
								<div class="uflex">
									<div>设备机台制作二维码，先出设计</div>
									
								</div>
								<Rate disabled show-text v-model="valueText"  custom-icon="iconfont hy-star">
									<span class="mr8">发起人</span>
									<span>张新城</span>
								</Rate>
								<Progress :percent="6/8*100" :stroke-width="8">
									<span>6/8</span>
								</Progress>
								<div class="flex mt5">
									<div class="obtn uels redbtn pd15">10月10号截止</div>
									<div class="sbtn pd15 uels mlr">周文杰</div>
								</div>
							</div>
							<img class="img mr20" :src="require('@/assets/images/home/Collection.png')">
						</div>
						
						<div class="addbox mflex"><Icon type="md-add" size="24"/>添加任务</div>
					</div>
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
					<div class="uflex mt5">
						<div>产品计划</div>
						<div>产品研发</div>
						<div>测试</div>
						<div>发布跟踪</div>
					</div>
				</div>
				<div class="rbox">
					<div class="rhead">
						<div class="btxt">参与者<span class="num">2</span></div>
						<div class="mflex mt5">
							<Avatar shape="square" class="mr8" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />
							<Avatar shape="square" class="mr8" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />
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
						<div class="uflex mt15">
							<div class="mflex flex1 uels">
								<span class="ml20">沈达一</span>
								<span class="ml">指派给了</span>
								<span class="ml">张明成</span>
							</div>
							<div class="uflex">今天10:01</div>
						</div>
						<div class="uflex mt15">
							<div class="mflex flex1 uels">
								<span class="ml20">沈达一</span>
								<span class="ml">更新任务状态为发布成功</span>
							</div>
							<div class="uflex">今天10:01</div>
						</div>
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
					<div class="ucard boder">
						<div class="uflex baseline">
							<Rate class="rates" v-model="valueText" disabled icon="ios-square" />
							<div class="mt15">
								<Badge>
									<Avatar shape="square" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" size="54" />
									<div class="round" slot="count">
										<div class="ins"></div>
									</div>
								</Badge>
								<div class="text">张美兰</div>
							</div>
							<div class="textr">
								<span class="group">组长</span>
								<img class="img" :src="require('@/assets/images/home/Collection.png')">
							</div>
						</div>
						<div class="flex">
							<div class="w50 uels">项目1</div>
							<div class="flex1 uels">调整产能参数结构</div>
							<div>截至10.11 12:00</div>
						</div>
						<div class="flex">
							<div class="w50 uels">项目2</div>
							<div class="flex1 uels">新能企业走访调查</div>
							<div>截至10.11 12:00</div>
						</div>
					</div>
					
					<div class="ucard boder">
						<div class="uflex baseline">
							<Rate class="rates" v-model="valueText" disabled icon="ios-square" />
							<div class="mt15">
								<Badge>
									<Avatar shape="square" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" size="54" />
									<div class="round" slot="count">
										<div class="ins"></div>
									</div>
								</Badge>
								<div class="text">张美兰</div>
							</div>
							<div class="textr">
								<img class="img" :src="require('@/assets/images/home/Collection.png')">
							</div>
						</div>
						<div class="flex">
							<div class="w50 uels">项目1</div>
							<div class="flex1 uels">调整产能参数结构</div>
							<div>截至10.11 12:00</div>
						</div>
						<div class="flex">
							<div class="w50 uels">项目2</div>
							<div class="flex1 uels">新能企业走访调查</div>
							<div>截至10.11 12:00</div>
						</div>
					</div>
					
					<div class="ucard boder">
						<div class="uflex baseline">
							<Rate class="rates" v-model="valueText" disabled icon="ios-square" />
							<div class="mt15">
								<Badge>
									<Avatar shape="square" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" size="54" />
									<div class="round" slot="count">
										<div class="ins"></div>
									</div>
								</Badge>
								<div class="text">张美兰</div>
							</div>
							<div class="textr">
								<img class="img" :src="require('@/assets/images/home/Collection.png')">
							</div>
						</div>
						<div class="flex">
							<div class="w50 uels">项目1</div>
							<div class="flex1 uels">调整产能参数结构</div>
							<div>截至10.11 12:00</div>
						</div>
						<div class="flex">
							<div class="w50 uels">项目2</div>
							<div class="flex1 uels">新能企业走访调查</div>
							<div>截至10.11 12:00</div>
						</div>
					</div>
					
					<div class="ucard boder">
						<div class="uflex baseline">
							<Rate class="rates" v-model="valueText" disabled icon="ios-square" />
							<div class="mt15">
								<Badge>
									<Avatar shape="square" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" size="54" />
									<div class="round" slot="count">
										<div class="ins"></div>
									</div>
								</Badge>
								<div class="text">张美兰</div>
							</div>
							<div class="textr">
								<img class="img" :src="require('@/assets/images/home/Collection.png')">
							</div>
						</div>
						<div class="flex">
							<div class="w50 uels">项目1</div>
							<div class="flex1 uels">调整产能参数结构</div>
							<div>截至10.11 12:00</div>
						</div>
						<div class="flex">
							<div class="w50 uels">项目2</div>
							<div class="flex1 uels">新能企业走访调查</div>
							<div>截至10.11 12:00</div>
						</div>
					</div>
					
					
				</div>
				
			</Modal>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				curTime:'',
				formItem: {
					area:'',
					level:'非常紧急'
				},
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				list5:[],
				index:0,
				dept: ['数字化团队','硬件部 团队1','硬件部 团队2','软件部 团队1','软件部 团队2'],
				deptName:'数字化团队',
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
			}
		},
		created() {
			this.$nextTick(() => {
				this.getStarPro()
			})
		},
		methods: {
			getStarPro(){
				this.$mock('starPro').then(res => {
					this.list1=res.filter(item=>item.status.id===1)
					this.list2=res.filter(item=>item.status.id===2)
					this.list3=res.filter(item=>item.status.id===3)
					this.list4=res.filter(item=>item.status.id===4)
					this.list5=res.filter(item=>item.status.id===5)
				}).catch()
			},
			// 项目弹窗
			openPro(info){
				this.proInfo = info
				this.proModal = true
			},
			//条件查询确定按钮事件
			handleSubmit(){
				this.list1=[]
				this.list2=[]
				this.list3=[]
				this.list4=[]
				this.list5=[]
				//this.getStarPro()
				this.$mock('starPro').then(res => {
					let newData=res.filter(item=>{
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
					this.list1=newData.filter(item=>item.status.id===1)
					this.list2=newData.filter(item=>item.status.id===2)
					this.list3=newData.filter(item=>item.status.id===3)
					this.list4=newData.filter(item=>item.status.id===4)
					this.list5=newData.filter(item=>item.status.id===5)
				}).catch()
			},
			
			// 团队成员弹窗
			open(){
				this.modal = true
			},
			openAdd(){
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
			search(){
				
			},
			save(){},
			finish(){
				this.addModal = false
			},
			cancel(id){
				this.$Modal.confirm({
					title: '确认取消？',
					onOk: () => {
						this.$Message.info('点击取消!')
					}
				});
			},
			toNext(i){
				if(i===0){//上一个
					if(this.index!=0){
						this.index=this.index-1
						this.deptName = this.dept[this.index]
					}
				}else{//下一个
					if(this.index!=this.dept.length-1){
						this.index=this.index+1
						this.deptName = this.dept[this.index]
					}
				}
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
.wbox{border: 1px solid #E6E6E9;border-radius: 8px;}
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
</style>
