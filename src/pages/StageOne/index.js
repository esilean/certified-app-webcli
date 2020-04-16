import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import { store } from '../../components/pages/store'

import Header from '../../components/sections/Header'
import Ini from '../../components/pages/Ini'
import End from '../../components/pages/End'
import Loading from '../../components/pages/Loading'
import Question from './components/Question'

import { getCustomerId } from '../../utils/cookies'
import { load, update } from '../../components/pages/action'

import './styles.css'

export default props => {

    const history = useHistory()

    const globalState = useContext(store)
    const { dispatch, state } = globalState
    const { loaded, customerStage } = state


    useEffect(() => {
        load(dispatch, getCustomerId(), 1)
    }, [dispatch])

    useEffect(() => {
        //verificar se carregou
        if (loaded) {
            //tem stage one?
            if (customerStage && customerStage.date_ini !== null) {

                if (customerStage.date_end !== null) {
                    history.replace('/end')
                } else {

                    history.replace('/questions')
                }
            }
            else { //mostra pagina inicial
                history.replace('/begin')
            }
        }

    }, [dispatch, customerStage, history, loaded])

    function handleBegin() {

        const data = {
            date_ini: new Date(),
        }
        update(dispatch, customerStage.id, data)
        history.replace('/questions')
    }

    return (

        <div className="wrapper">
            <Header customerStage={customerStage} />
            <Switch>
                <Route exact path='/' component={Loading} />
                <Route path='/begin' render={() => <Ini begin={handleBegin} customerStage={customerStage} />} />
                <Route path='/questions' render={() => <Question />} />
                <Route path='/end' render={() => <End />} />
                <Redirect from='*' to='/' />
            </Switch>
        </div>

    )
}