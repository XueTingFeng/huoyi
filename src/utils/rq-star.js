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
    }
  })
}