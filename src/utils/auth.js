import Cookies from 'js-cookie'
import {getUser} from './rq-my'

const TokenKey = 'HuoYi-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,{ expires: 2})

}

export function removeToken() {
  return Cookies.remove(TokenKey)
}




