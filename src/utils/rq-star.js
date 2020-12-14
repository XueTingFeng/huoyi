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
//请求星标人员
export function getStarPerson() {
  return request({
    url: 'api/user/findUserStarPeopleByUserId',
    params:{
      userId:'1',
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
       userId: '1'
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

