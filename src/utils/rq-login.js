import {request} from "./request";
//发送验证码
export function getcode(info){
    return request({
        method:'get',
        url:'/api/user/sendMessage',
        params:{
            phone:info.phone,
        },
    })
}
//手机号登入
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
//账号密码登入
export function getacclogInTo(from){
    return request({
        method:'post',
        url:'/api/user/loginByAccount',
        data:{
            account:from.account,
            password:from.password,
        },
        type:"form"
    })
}
