import {request} from "./request";
//查询当前用户
export function getUserInfo(){
    return request({
        method:'get',
        url:'/api/user/findUserByToken',
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
            type:'1',
        }
    })
}
//筛选团队项目请求
export function screeningTeam(info/*,user*/){
    return request({
        url:'api/team/findProjectByTeamId',
        params:{
            teamId:info.teamId,
            place:info.placeId,
            priority:info.priority,
            keyword:info.keyword,
            /*userId:user.userId*/
        },
    })
}
//查找所有团队成员
export function getTeamMember(teamId/*,user*/){
    return request({
        url:'/api/team/findTeamMembersByTeamId',
        params:{
            teamId:teamId,
            /*userId:user.userId,*/
        },
    })
}
//查找项目信息
export function getProjectInfo(info/*,user*/){
    return request({
        url:'/api/project/findProjectInfoById',
        params:{
            pj_id:info.pj_id,
            /*user_id:user.userId,*/
        },
    })
}
//查询团队所有项目
export function getTeamProject(id/*,user*/){
    return request({
        url:'api/team/findProjectByTeamId',
        params:{
            teamId :id,
            place:'',
            priority:'',
            keyword:'',
            /*userId:user.userId,*/
        },
    })
}
//添加项目
export function addProject(addData){
    return request({
        method:"post",
        url:'/api/project/addProject',
        data:{
            //必填
            projectName:addData.projectName,
            nodeId:addData.nodeId,
            endTime:new Date(addData.endTime).format("yyyy-MM-dd hh:mm:ss"),
            placeId:addData.placeId,
            initiator:addData.initiator,
            teamId:addData.teamId,
            priority:addData.priority,
            // completeTime:'',
            principal:addData.principal,
            typeId:addData.typeId,
//非必填
            remarks:addData.remarks,
            tags:'',
            executors:addData.executors,
            releaseTime:''
        },
        // headers:{
        //   'Content-Type': 'application/x-www-form-urlencoded',
        // }
        type:"form"
    })
}
//更新项目
export function upTeamProjectInfo(item){
    return request({
        method:'post',
        url:'/api/project/updateProject',
        data:{
            projectId:item.projectId,
            executors:item.user_id,
        },
        type:"form"
    })
}
//添加项目任务
export function addTask(item){
    return request({
        method:'post',
        url:'/api/project/addProjectTask',
        data:{
            /*user_id:item.user_id,*/
            pj_id:item.pj_id,
            name: item.name,
            end_time:new Date(item.end_time).format("yyyy-MM-dd hh:mm:ss"),
            priority:item.priority,
            member_id:item.member_id,
            state: '0'
        },
        type:"form"
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
//取消项目星标
export function cancelStar(id/*,user*/){
    return request({
        method:'get',
        url:'/api/user/deleteUserStar',
        params:{
            type :2,
            fkId:id,
            /*userId:user.userId,*/
        },
    })
}
//取消任务星标
export function cancelTaskStar(id/*,user*/){
    return request({
        method:'get',
        url:'/api/user/deleteUserStar',
        params:{
            type :3,
            fkId:id,
            /*userId:user.userId,*/
        },
    })
}
//取消人员星标
export function cancelPersonnelStar(id/*,user*/){
    return request({
        method:'get',
        url:'/api/user/deleteUserStar',
        params:{
            type :1,
            fkId:id,
            /*userId:user.userId,*/
        },
    })
}
//添加项目星标
export function addStar(id/*,user*/){
    return request({
        method:'post',
        url:'/api/user/addUserStar',
        data:{
            type :2,
            fkId:id,
           /* userId:user.userId,*/
        },
        type:"form"
    })
}
//添加任务星标
export function addTaskStar(id/*,user*/){
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
//添加人员星标
export function addPersonnelStar(id/*,user*/){
    return request({
        method:'post',
        url:'/api/user/addUserStar',
        data:{
            type :1,
            fkId:id,
            /*userId:user.userId,*/
        },
        type:"form"
    })
}
//查询项目任务
export function getProTask(/*user,*/proId,keyword){
    return request({
        method:'get',
        url:'/api/project/findProjectTaskByProjectId',
        params:{
            projectId:proId,
            /*userId:user.userId,*/
            executor:keyword.practitioners,
            sponsor:'',
            keyword:keyword.keyword,
        },
    })
}