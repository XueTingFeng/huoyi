import {request} from "./request";
//请求星标任务接口
export function getStarTask() {
  return request({
    url: '/api/user/findUserStarTaskByUserId',
     params: {
       userId: '1'
     }
  })
}
//星标项目
export function getStarPro() {
  return request({
    url: '/api/user/findUserStarProjects',
    params:{
      id: '1'
     }

  })
}
//星标人员
export function getStarPerson() {
  return request({
    url: '/api/user/findUserStarPeopleByUserId',
     params:{
       userId: '1'
     }
  })
}
//成员任务
export function getUserTasks() {
  return request({
    url: '/api/user/findUserTasksByUserId',
     params:{
       userId: '1'
     }
  })
}
//团队信息
export function getTeam(){
  return request({
    url: '/api/team/findTeams',
    // params:{
    //   userId: '1'
    // }
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
  export function getStarProInfo() {
    return request({
      url: '/api/project/findProjectInfoById',
       params:{
         id: '1'
       }
    })
}


