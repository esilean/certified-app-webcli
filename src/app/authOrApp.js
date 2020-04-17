import '../utils/templates/dependencies'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import consts from '../consts'
import api from '../services/api'

import If from '../utils/if'
import Logon from '../pages/Logon'
import App from './app'

import { StateProvider as StageProvider } from '../components/pages/store'

export default props => {

    const [validToken, setValidToken] = useState(false)

    const token = localStorage.getItem(consts.USER_KEY)
    useEffect(() => {

        function validateToken() {

            api.post('cli/vtoken', { token }
            ).then(response => {
                setValidToken(response.data.valid)
            }).catch(err => {
                setValidToken(false)
                localStorage.removeItem(consts.USER_KEY)
                toast.error("Erro ao validar seu email...", { autoClose: 5000 })

            })
        }

        validateToken()


    }, [token])

    return (
        <>
            <If test={validToken}>
                <StageProvider>
                    <App />
                </StageProvider>
            </If>
            <If test={!validToken}>
                <Logon />
            </If>
        </>
    )


}