import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import { store } from './store'

import Header from '../../components/sections/Header'
import Ini from '../../components/pages/Ini'
import End from '../../components/pages/End'
import Loading from '../../components/pages/Loading'
import Question from './components/Question'

import { getCustomerId } from '../../utils/cookies'
import { load, begin } from './actions'

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
            if (customerStage) {
                if (customerStage.id > 0 && customerStage.date_end !== null) {
                    history.replace('/end')
                } else {
                    history.replace('/questions')
                }
            }
            else { //mostra pagina inicial
                history.replace('/begin')
            }
        }

    }, [customerStage, history, loaded])

    function handleBegin() {
        begin(dispatch, getCustomerId(), 1)
        history.push('/questions')
    }



    return (

        <div className="wrapper">
            <Header stageId={1} />

            <Switch>
                <Route exact path='/' component={Loading} />
                <Route path='/begin' render={() => <Ini begin={handleBegin} />} />
                <Route path='/questions' render={() => <Question />} />
                <Route path='/end' render={() => <End />} />
                <Redirect from='*' to='/' />
            </Switch>

        </div>

    )
}