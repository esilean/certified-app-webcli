import consts from '../../consts'
import jwt_decode from 'jwt-decode'

function getUserKey() {
    //console.log('Obter Cookie')
    return localStorage.getItem(consts.USER_KEY)
}

function getUserKeyDecoded() {
    var decoded = jwt_decode(getUserKey())
    return decoded
}

export function getUserName() {
    return getUserKeyDecoded().name
}