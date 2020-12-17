import {request} from "./request";
export function getcode(info){
    return request({
        method:'get',
        url:'/api/user/sendMessage',
        params:{
            phone:info.phone,
        },
    })
}
export function getlogInTo(info){
    return request({
        method:'get',
        url:'/api/user/loginByPhone',
        params:{
            phone:info.phone,
            code:info.code,
            username:info.userName

        },
    })
}
