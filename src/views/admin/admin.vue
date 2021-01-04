<template>
<div class="adminBg">
<!-- <div class="box"></div>-->
  <Menu active-name="1-1" :open-names="['1']" style="background-color: #0F182A">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-analytics" />
        项目
      </template>

        <MenuItem name="1-1"  >项目信息</MenuItem>
        <MenuItem name="1-2">新增项目</MenuItem>

    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-filing" />
        Navigation Two
      </template>
      <MenuItem name="2-1">Option 5</MenuItem>
      <MenuItem name="2-2">Option 6</MenuItem>
      <Submenu name="3">
        <template slot="title">Submenu</template>
        <MenuItem name="3-1">Option 7</MenuItem>
        <MenuItem name="3-2">Option 8</MenuItem>
      </Submenu>
    </Submenu>
    <Submenu name="4">
      <template slot="title">
        <Icon type="ios-cog" />
        Navigation Three
      </template>
      <MenuItem name="4-1">Option 9</MenuItem>
      <MenuItem name="4-2">Option 10</MenuItem>
      <MenuItem name="4-3">Option 11</MenuItem>
      <MenuItem name="4-4">Option 12</MenuItem>
    </Submenu>
  </Menu>

<adminpro class="rightBg"></adminpro>






</div>
</template>

<script>
import adminpro from "../../components/admingcp/adminpro";
export default {
  name: "admin",
  components: {
    adminpro,
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