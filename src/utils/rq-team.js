import {request} from "./request";
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
export function screeningTeam(info){
    return request({
        url:'api/team/findProjectByTeamId',
        params:{
            teamId:'1',
            place:info.area,
            priority:'',
            keyword:'',
        },
    })
}
//查找所有团队成员
export function getTeamMember(){
    return request({
        url:'/api/team/findTeamMembersByTeamId',
        params:{
            teamId:'1',
        },
    })
}
//查找项目信息
export function getProjectInfo(info){
    return request({
        url:'/api/project/findProjectInfoById',
        params:{
            pj_id:info.pj_id,
            user_id:'1',
        },
    })
}
//查询团队所有项目
export function getTeamProject(){
    return request({
        url:'api/team/findProjectByTeamId',
        params:{
            teamId :'1',
            place:'',
            priority:'',
            keyword:'',
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
            initiator:/*addData.initiator*/'1',
            teamId:addData.teamId,
            priority:addData.priority,
            // completeTime:'',
            principal:'1'/*addData.principal*/,
            typeId:addData.typeId/*addData.teamId*/,
//非必填
            remarks:addData.remarks,
            tags:'',
            executors:'',
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
            user_id:'1',
            pj_id:item.pj_id,
            name: item.name,
            end_time:new Date(item.end_time).format("yyyy-MM-dd hh:mm:ss"),
            priority:item.priority,
            status:item.status,
            member_id:item.member_id,
            state: '0'
        },
        type:"form"
    })
}