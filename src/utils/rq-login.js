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
//找回密码
export function retrievePassword(info){
    return request({
        method:'get',
        url:'/api/user/sendMessage',
        params:{
            account:info.account,
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
//查找用户通过账号
export function accountUser(info){
    return request({
        method:'get',
        url:'/api/user/findUserByAccount',
        params:{
            account:info.account,
        },
    })
}
//获取临时授权码
export function getAuthorizationCode(account,code){
    return request({
        method:'get',
        url:'/api/user/getRetrievePasswordAuthCode',
        params:{
            account:account,
            code:code,
        },
    })
}
//找回密码
export function getPassword(authCode,pass){
    return request({
        method:'post',
        url:'/api/user/retrievePassword',
        data:{
            authCode:authCode,
            password:pass.password,
            againPassword:pass.qdpassword,
        },
        type:"form"
    })
}
