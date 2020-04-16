import '../utils/templates/dependencies'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

import consts from '../consts'
import api from '../services/api'

import If from '../utils/if'
import Logon from '../pages/Logon'
import StageOne from '../pages/StageOne'

import { StateProvider as StageOneProvider } from '../components/pages/store'

export default props => {

    const [validToken, setValidToken] = useState(false)
    const [stageId, setStageId] = useState(1)


    const token = localStorage.getItem(consts.USER_KEY)
    useEffect(() => {

        function validateToken() {

            api.post('cli/vtoken', { token }
            ).then(response => {
                setValidToken(response.data.valid)
                axios.defaults.headers.common['Authorization'] = token
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

                <If test={stageId === 1}>
                    <StageOneProvider>
                        <StageOne />
                    </StageOneProvider>
                </If>

                <If test={stageId !== 1 && stageId !== 2 && stageId !== 3 && stageId !== 4}>
                    NOT FOUND!
                </If>
            </If>
            <If test={!validToken}>
                <Logon />
            </If>
        </>
    )


}