import {request} from "./request";
//查询当前用户
export function getUserInfo(){
  return request({
    method:'get',
    url:'/api/user/findUserByToken',
  })
}
//请求星标任务接口
export function getStarTask(user) {
  return request({
    url: '/api/user/findUserStarTaskByUserId',
     params: {
       userId: user.userId
     }
  })
}
//星标项目
export function getStarPro(user) {
  return request({
    url: '/api/user/findUserStarProjects',
    params:{
      id:user.userId,
     }
  })
}
//请求星标人员
export function getStarPerson(user) {
  return request({
    url: 'api/user/findUserStarPeopleByUserId',
    params:{
      userId:user.userId,
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
export function getUserTasks() {
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
  export function getStarProInfo(pj_id) {
    return request({
      url: '/api/project/findProjectInfoById',
       params:{
         user_id: '1',
          pj_id: pj_id
       }
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
export function cancelStarPro(id,user){
  return request({
    method:'get',
    url:'/api/user/deleteUserStar',
    params:{
      type :'2',
      fkId:id,
      userId:user.userId,
    },
  })
}
//取消星标任务
export function cancelStarTask(id,user){
  return request({
    method:'get',
    url:'/api/user/deleteUserStar',
    params:{
      type :'3',
      fkId:id,
      userId:user.userId,
    },
  })
}
//取消星标人员
export function cancelStarUser(id,user){
  return request({
    method:'get',
    url:'/api/user/deleteUserStar',
    params:{
      type :'1',
      fkId:id,
      userId:user.userId,
    },
  })
}

