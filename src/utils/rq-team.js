import {request} from "./request";
import {data} from "@/mock/tree.api";
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
export function screeningTeam(){
    return request({
        url:'api/team/findProjectByTeamId',
        params:{
            teamId:'1',
            place:'',
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
export function getProjectInfo(){
    return request({
        url:'/api/project/findProjectInfoById',
        params:{
            pj_id:'1',
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
            nodeId:'1',
            endTime:new Date(addData.endTime).format("yyyy-MM-dd hh:mm:ss"),
            placeId:addData.placeId,
            initiator:/*addData.initiator*/'1',
            teamId:'1',
            priority:addData.priority,
            // completeTime:'',
            principal:'1'/*addData.principal*/,
            typeId:'1',
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