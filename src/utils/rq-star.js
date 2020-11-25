import {request} from "./request";
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
      userId:'1',
    }
  })
}
//请求团队
export function getTeam() {
  return request({
    url: '/api/team/findTeams',
    params:{
      userId:'1',
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