import {request} from "./request";
import {star} from "../views/star"
//请求星标任务接口
export function getStarTask() {
  return request({
    url: '/api/user/findUserStarTaskByUserId'
  })
}

export function getStarPro() {
  return request({
    url: '/api/user/findUserStarProjects'
  })
}
//请求星标人员
export function getStarPerson() {
  return request({
    url: 'api/user/findUserStarPeopleByUserId',
    params:{
      userId:'1',
    }
  })
}
//请求地区
export function getRegion() {
  return request({
    url: '/api/place/findPlaces',
    params:{
      // userId:'1',
    }
  })
}
//请求团队
export function getTeam() {
  return request({
    url: '/api/team/findTeams',
    params:{
      // userId:'1',
    }
  })
}
//请求成员任务
export function getUserTasks() {
  return request({
    url: 'api/user/findUserTasksByUserId',
    params: {
      userId:'1',
    }
  })
}

export function handleSubmit(){
  return request({
    url:'/api/project/findUserStarProjectInfo',
    data:'formItem.title',
    params:{
      id:'1',

    }
  })
}