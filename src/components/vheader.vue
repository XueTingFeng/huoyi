<template>
	<div class="header">
		<div class="logo"><img :src="require('../assets/images/home/logomdpi.png')"><img :src="require('../assets/images/home/huoyimdpi.png')"></div>
		<div class="mflex">
			<div class="uflex menu">
				<div @click="inback()" class="menu-item">
					<img :src="require('../assets/images/home/square.png')" style="width: 24px;height: 24px;">
				</div>|
				<div @click="tabs('/msg')" class="menu-item">
					<Badge v-if="msgNum>0" :count="msgNum" type="primary">
						<img :src="!cur?require('@/assets/images/home/Message-active.png'):require('@/assets/images/home/Message-unactive.png')">
					</Badge>
					<img v-else :src="!cur?require('@/assets/images/home/Message-active.png'):require('../assets/images/home/Message-unactive.png')">
				</div>|
				<div @click="tabs('/home')" class="menu-item">
					<img :src="cur?require('@/assets/images/home/home-active.png'):require('../assets/images/home/home-unactive.png')">
				</div>
			</div>
			<Avatar shape="square" :src="user.avatar" />
			
			<!-- <Dropdown>
			    <Avatar shape="square" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424617736,2740514216&fm=26&gp=0.jpg" />
				<DropdownMenu slot="list">
					<DropdownItem @click.native="logout">退出登录</DropdownItem>
				</DropdownMenu>
			</Dropdown> -->
		</div>
	</div>
</template>

<script>	
import { removeToken } from '@/utils/auth'
import {getUser} from "@/utils/rq-my";


export default {
	data() {
		return {
			msgNum:2,
			cur:true,

      user :{
			  userId:'',
			  userName:'',
        avatar:'',
        status:0,
        saturation:0
      }
		};
	},
	created() {
		if(this.$route.path=='/msg'){
			this.cur = false
		}else{
			this.cur = true
		} 
		this.$nextTick(() => {
			this.getMsgNum()
		});
    this.getUser()


	},
	methods: {
     getUser(user){
       getUser(user).then(res => {
         user.id = res.data.userId
         user.name = res.data.userName
         user.avatar = res.data.avatar
         user.status = res.data.status
         user.saturation = res.data.saturation
       })
     },
		getMsgNum(){
			
		},
		inback(){
			
			this.$Modal.confirm({
				title: '确定后进入后台管理？',
				onOk: () => {
					removeToken()
					//location.href = '/'
				}
			});
		},
		tabs(url){
			if(url==='/msg'){
				this.msgNum = 0
				this.cur = false
			}else{
				this.cur = true
			}
			this.$router.push({
				path: url
			});
		},
		async logout() {
			this.$Modal.confirm({
				title: '确定注销并退出系统吗？',
				onOk: () => {
					removeToken()
					location.href = '/'
				}
			});
		}
	},
	watch:{
	    $route:{
	      handler(val,oldval){
	        console.log(val);//新路由信息
	        console.log(oldval);//老路由信息
					if(val.path=='/msg'){
						this.cur = false
					}else{
						this.cur = true
					}
	      },
	      // 深度观察监听
	      deep: true
	    }
	  } 
};
</script>

<style lang="scss" scoped>
.header {
	height: 64px;
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #0c1321;
	.logo {
		img{
			vertical-align: middle;
			&:first-child{
				margin-right: 5px;
			}
		}
	}
	.menu{
		height: 64px;
		margin: 0 30px;
		color: #131D31;
		.menu-item{
			height: 100%;padding: 0 20px;display: flex;align-items: center;color: #313849;cursor: pointer;
			::v-deep  .ivu-badge-count{
				height: 18px;
				line-height: 18px;
				min-width: 18px;
				padding:0;
				box-shadow:none
			}
			img{
				width: 30px;
				height: 30px;
				//transform: scale(1.5);
			}
		}
		.active{color: #2d8cf0;border-bottom: 2px solid #2d8cf0;}
	}
}
</style>
