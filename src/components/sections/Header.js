import React, { } from 'react'
import { useHistory } from 'react-router-dom'

import consts from '../../consts'

import logo from '../../assets/brand/logo.png'
import './styles.css'


export default ({ customerStage }) => {

    const history = useHistory()

    function signOut() {
        localStorage.removeItem(consts.USER_KEY)
        history.replace('/')
    }

    return (
        <header className="navbar fixed-top shadow-lg p-3 primary-color">
            <div className="content-header">
                <div>
                    <img src={logo} alt="O Corpo Explica" height='100' />
                </div>
                <div className="content-header-title">
                    <h4>{customerStage.stage.name}</h4>
                </div>
                <div className="header-button-signout">
                    <a className="nav-link" title='Sair do Sistema' href="/#/" onClick={e => signOut()} role="button">
                        <i className="fa fa-sign-out"></i>
                    </a>

                </div>
            </div>
        </header>
    )
}