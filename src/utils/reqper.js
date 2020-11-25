import {request} from "./request";

export function getStarPerson() {
    return request({
        url: 'api/user/findUserStarPeopleByUserId',
        params:{
            // userid:'',
        }
    })
}