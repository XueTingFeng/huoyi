import Cookies from 'js-cookie'
import {getUser} from './rq-my'

const TokenKey = 'HuoYi-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)

}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function autoLogin() {
  let token = getToken();
  if(token!=null){
return getUser(token)
  }else{
    return null;
  }
}

