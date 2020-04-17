import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'


import { store } from '../../components/pages/store'

import Header from '../../components/sections/Header'
import Ini from '../../components/pages/Ini'
import End from '../../components/pages/End'
import Loading from '../../components/pages/Loading'
import QuestionOne from './components/QuestionOne'

import { getCustomerId } from '../../utils/cookies'
import { load, begin, update } from '../../components/pages/action'

import './styles.css'

export default props => {

    const history = useHistory()

    const globalState = useContext(store)
    const { dispatch, state } = globalState
    const { loaded, customerStage } = state

    useEffect(() => {
        load(dispatch, getCustomerId())
    }, [dispatch])

    useEffect(() => {
        //verificar se carregou
        if (loaded) {

            //tem stage one?
            if (customerStage && customerStage.date_ini !== null) {

                if (customerStage.date_end !== null) {
                    history.replace('/end')
                } else {
                    if (customerStage.stage_id === 1)
                        history.replace('/qone')
                    else if (customerStage.stage_id === 2)
                        history.replace('/qtwo')
                    else
                        history.replace('/')
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

        if (customerStage.stage.id === 1)
            history.replace('/qone')
        else if (customerStage.stage.id === 2)
            history.replace('/qtwo')
    }

    function beginNextState(stageId) {
        begin(dispatch, getCustomerId(), stageId)
    }

    return (
        <div className="wrapper wrapper-cssanimation">
            <Header customerStage={customerStage} />
            <Switch>
                <Route exact path='/' component={Loading} />
                <Route path='/begin' render={() => <Ini begin={handleBegin} customerStage={customerStage} />} />
                <Route path='/qone' render={() => <QuestionOne />} />
                <Route path='/qtwo' render={() => <div />} />
                <Route path='/end' render={() => <End beginNextState={beginNextState} customerStage={customerStage} />} />
                <Redirect from='*' to='/' />
            </Switch>
        </div>
    )
}