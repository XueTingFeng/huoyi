import {request} from "./request";

//获取用户信息
export function getUserInfo(){
  return request({
    method:'get',
    url:'/api/user/findUserByToken',
  })
}

//修改用户状态
export function postUserInfo(userId,status){
  return request({
    method:'post',
    url:'/api/user/updateUserInfo',
    data: {
      userId: userId,
      status: status
    },
    type: "form"
  })
}

//请求用户项目
export function getMyProject() {
  return request({
    url: '/api/user/findUserJoinProject',
    params: {

    }
  })
}

//请求用户任务
export function getMyTask(user) {
  return request({
    url: '/api/user/findUserTasksByUserId',
    params: {
      userId: user.userId,
      type: '0'
    }
  })
}

//请求我派发的视图
export function getDistributeTask(user) {
  return request({
    url: '/api/user/findUserTasksByUserId',
    params: {
      userId: user.userId,
      type: '1',
      pageSize: '10',

    }
  })
}

//请求项目成员
export function getProMembers(projectId) {
  return request({
    url: '/api/project/findProjectMemberByProjectId',
    params: {
      projectId: projectId
    }
  })
}
//post请求
export function postMyTask(addMyTask) {
  return request({
    url: '/api/project/addProjectTask',
    method: 'post',
    data: {
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
      status: status,
    },
    type:"form"
  })
}

export function postMyTaskState(taskId,state) {
  return request({
    url: '/api/project/updateProjectTask',
    method: 'post',
    data: {
      task_id: taskId,
      state: state,
    },
    type:"form"
  })
}

//添加星标
export function addStar(userId,type,fkId) {
  return request({
    url: '/api/user/addUserStar',
    method: 'post',
    data: {
      userId:userId,
      type:type,
      fkId:fkId
    },
    type:"form"
  })
}

//删除星标
export function delStar(type,userId,fkId) {
  return request({
    url: '/api/user/deleteUserStar',
    method: 'get',
    params: {
      type:type,
      userId:userId,
      fkId:fkId
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