import consts from '../../consts'
import jwt_decode from 'jwt-decode'

export function getToken() {
    return localStorage.getItem(consts.USER_KEY)
}

function getTokenDecoded() {
    const token = getToken()
    let decoded = ''
    if (token)
        decoded = jwt_decode(token)

    return decoded
}

export function getCustomerName() {
    return getTokenDecoded().name
}

export function getCustomerId() {
    return getTokenDecoded().id
}