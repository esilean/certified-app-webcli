import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from '../../components/toastr'

import AuthInput from './components/inputAuth'

import './styles.css'
import consts from '../../consts'
import logoImg from '../../assets/brand/logo.png'

import api from '../../services/api'

export default props => {
    const history = useHistory();

    async function handleLogin(values) {

        try {

            const response = await api.post('cli/login', values)
            localStorage.setItem(consts.USER_KEY, response.data.token)

            //toast.info(`Bem vindo ${response.data.name}!`, { autoClose: 2000 })
            history.replace('/')

        } catch (err) {
            toast.error('Usuário e/ou senha incorretos.')
        }
    }

    //form validation control
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur'
    })

    return (
        <div className="login-page">
            <div className="container">
                <div className="justify-content-center row">
                    <div className="col-md-8">
                        <div className="card-group">

                            <div className="primary-color py-5 d-md-down-none card">
                                <div className="text-center card-body">
                                    <img src={logoImg} alt="Logo" height="150" className="img-fluid" />
                                </div>
                            </div>

                            <div className="p-4 card">
                                <div className="card-body login-card-body">
                                    <p className="login-box-msg">LOGIN</p>

                                    <form onSubmit={handleSubmit(handleLogin)}>
                                        <div className="input-group mb-3">
                                            <AuthInput
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                register={register({ required: true })}
                                                icon="envelope"
                                                err={errors.email}
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <AuthInput
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                register={register({ required: true })}
                                                icon="lock"
                                                err={errors.password}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-8">
                                                &nbsp;
                                            </div>
                                            <div className="col-4">
                                                <button type="submit" className="btn primary-color secondary-text-color btn-block">Entrar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}