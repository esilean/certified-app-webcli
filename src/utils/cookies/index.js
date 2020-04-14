import consts from '../../consts'
import jwt_decode from 'jwt-decode'

function getUserKey() {
    return localStorage.getItem(consts.USER_KEY)
}

function getUserKeyDecoded() {
    const token = getUserKey()
    let decoded = ''
    if (token)
        decoded = jwt_decode(token)

    return decoded
}

export function getCustomerName() {
    return getUserKeyDecoded().name
}

export function getCustomerId() {
    return getUserKeyDecoded().id
}