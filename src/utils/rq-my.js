import {request} from "./request";
import Cookies from 'js-cookie'

//请求用户项目
export function getMyProject() {
  return request({
    url: '/api/user/findUserJoinProject',
    params: {
      id: '1'
    }
  })
}

//请求用户任务
export function getMyTask() {
  return request({
    url: '/api/user/findUserTasksByUserId',
    params: {
      userId: '1',
      type: '0'
    }
  })
}

//请求我派发的视图
export function getDistributeTask() {
  return request({
    url: '/api/user/findUserTasksByUserId',
    params: {
      userId: '1',
      type: '1'
    }
  })
}

//请求团队成员
export function getTeamMembers() {
  return request({
    url: '/api/team/findTeamMembersByTeamId',
    params: {
      teamId: '1',
      userId: '1'
    }
  })
}
//post请求
export function postMyTask(addMyTask) {
  return request({
    url: '/api/project/addProjectTask',
    method: 'post',
    data: {
      user_id:'1',
      pj_id:addMyTask.pj_id,
      name: addMyTask.name,
      end_time:new Date(addMyTask.end_time).format("yyyy-MM-dd hh:mm:ss"),
      priority:addMyTask.priority,
      member_id:addMyTask.member_id,
      state: '0'
    },
    type:"form"
  })
}

export function postMyTaskStatus(taskId,status) {
  return request({
    url: '/api/project/updateProjectTask',
    method: 'post',
    data: {
      task_id: taskId,
      status: status
    },
    type:"form"
  })
}

// // 根據token請求用戶信息
// const token = 'HuoYi-Token'
// export function getUser() {
//   return request({
//     url: '/api/user/findUserByToken',
//     params: {
//       token: Cookies.get(token)
//     }
//   })
// }