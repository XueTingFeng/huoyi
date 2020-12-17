import {request} from "./request";

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
    url: 'api/user/findUserTasksByUserId',
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
      teamId: '1'
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
      status:'2',
      member_id:addMyTask.member_id,
      state: '0'
    },
    type:"form"
  })
}

export function postMyTaskStatus(myTaskId) {
  return request({
    url: '/api/project/updateProjectTask',
    method: 'post',
    data: {
      task_id: myTaskId,
      status: '3'
    },
    type:"form"
  })
}