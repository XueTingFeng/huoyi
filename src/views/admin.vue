<template>
<div class="adminBg">
<!-- <div class="box"></div>-->
  <Menu   style="background-color: #0F182A">

    <Submenu name="0">
      <template slot="title">
        <Icon type="ios-analytics" />
        用户管理
      </template>

      <router-link to="/admin/adminuser"><MenuItem name="0-1">用户信息</MenuItem></router-link>
      <router-link to="/admin/adminstar"><MenuItem name="0-2">星标</MenuItem></router-link>

    </Submenu>

    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-analytics" />
        项目管理
      </template>

        <router-link to="/admin/adminpro"><MenuItem name="1-1">项目信息</MenuItem></router-link>
      <router-link to="/admin/admintask"><MenuItem name="1-2">任务信息</MenuItem></router-link>

    </Submenu>


    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-filing" />
        团队管理
      </template>
      <router-link to="/admin/adminteam"><MenuItem name="2-1">团队信息</MenuItem></router-link>
    </Submenu>


    <Submenu name="3">
      <template slot="title">
        <Icon type="ios-cog" />
        标准项目类型
      </template>
      <router-link to="/admin/adminProStandard"><MenuItem name="3-1">标准项目类型信息</MenuItem></router-link>

    </Submenu>



    <Submenu name="4">
      <template slot="title">
        <Icon type="ios-cog" />
        权限管理
      </template>
      <router-link to="/admin/adminrole"><MenuItem name="4-1">用户角色</MenuItem></router-link>
      <router-link to="/admin/adminroleAuthority"><MenuItem name="4-2">角色权限</MenuItem></router-link>
      <router-link to="/admin/adminAuthority"><MenuItem name="4-3">权限</MenuItem></router-link>

    </Submenu>
  </Menu>


<router-view class="rightBg"></router-view>





</div>
</template>

<script>

export default {
  name: "admin",
  components: {

  },
  data(){
    return {

    }
  },
  methods:{

  }
}
</script>

<style scoped>
.adminBg {
  width: 100%;
  height: 100%;
  float: left;
  display: flex;
}

.box {
  width: 300px;
  height: 300px;
  background-color: #fff;

}

.rightBg{
  float: right;
  flex: 1;
}
</style>