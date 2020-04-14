import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../services/api'
import axios from 'axios'

import consts from '../../consts'

import logo from '../../assets/brand/logo.png'
import './styles.css'


export default props => {

    const history = useHistory()

    const [title, setTitle] = useState('')

    useEffect(() => {
        async function loadStage() {
            try {

                const response = await api.get(`stages/${props.stageId}`, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
                setTitle(response.data.name)

            } catch (error) {
            }
        }

        loadStage()
    }, [props.stageId])

    function signOut() {
        localStorage.removeItem(consts.USER_KEY)
        history.push('/')
    }

    return (
        <header className="navbar fixed-top shadow-lg p-3 primary-color">
            <div className="content-header">
                <div>
                    <img src={logo} alt="O Corpo Explica" height='100' />
                    <button type="button" onClick={() => signOut()}>SAIR</button>
                </div>
                <div className="content-header-title">
                    <h4>{title}</h4>
                </div>
            </div>
        </header>
    )
}