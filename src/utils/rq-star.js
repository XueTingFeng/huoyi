import {request} from "./request";
//查询当前用户
export function getUserInfo(){
  return request({
    method:'get',
    url:'/api/user/findUserByToken',
  })
}
//请求星标任务接口
export function getStarTask(/*user*/) {
  return request({
    url: '/api/user/findUserStarTaskByUserId',
     params: {
       /*userId: user.userId*/
     }
  })
}
//星标项目
export function getStarPro(/*user*/) {
  return request({
    url: '/api/user/findUserStarProjects',
    params:{
      /*id:user.userId,*/
     }
  })
}
//请求星标人员
export function getStarPerson(/*user*/) {
  return request({
    url: 'api/user/findUserStarPeopleByUserId',
    params:{
      /*userId:user.userId,*/
    }
  })
}

//请求团队
export function getTeam() {
  return request({
    url: '/api/team/findTeams',
    params: {
      type: '1',
    }
  })
}

//成员任务
export function getUserTasks(user) {
  return request({
    url: '/api/user/findUserTasksByUserId',
     params:{
       userId:user.userId,
     }
  })
}

//地区
export function getRegion() {
  return request({
    url: '/api/place/findPlaces',
    // params:{
    //   userId: '1'
    // }
  })
}
  //星标项目弹窗
  export function getStarProInfo(info/*,user*/) {
    return request({
      url: '/api/project/findProjectInfoById',
      params:{
        pj_id:info.pj_id,
       /* user_id:user.userId,*/
      },
    })
}
//筛选星标项目请求
export function screeningStro(stardata){
  return request({
    url:'/api/user/findUserStarProjects',
    params:{
      id:'1',
      teamId:stardata.dept,
      place:'',
      priority:'',
      keyword:'',
    },
  })
}
//取消星标项目
export function cancelStarPro(id/*,user*/){
  return request({
    method:'get',
    url:'/api/user/deleteUserStar',
    params:{
      type :'2',
      fkId:id,
      /*userId:user.userId,*/
    },
  })
}
//添加星标任务
export function addStarTask(id/*,user*/){
  return request({
    method:'post',
    url:'/api/user/addUserStar',
    data:{
      type :3,
      fkId:id,
      /*userId:user.userId,*/
    },
    type:"form"
  })
}
//取消星标任务
export function cancelStarTask(id/*,user*/){
  return request({
    method:'get',
    url:'/api/user/deleteUserStar',
    params:{
      type :'3',
      fkId:id,
      /*userId:user.userId,*/
    },
  })
}
//取消星标人员
export function cancelStarUser(id/*,user*/){
  return request({
    method:'get',
    url:'/api/user/deleteUserStar',
    params:{
      type :'1',
      fkId:id,
      /*userId:user.userId,*/
    },
  })
}
//查询项目用户
export function getProUser(project){
  return request({
    method:'get',
    url:'/api/project/findProjectMemberByProjectId',
    params:{
      projectId:project,
    },
  })
}


