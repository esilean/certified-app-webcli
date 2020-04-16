import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import dateExpired from '../../../utils/js/dateExpired'

import { store } from '../../../components/pages/store'

import axios from 'axios'
import api from '../../../services/api'
import { updateResult } from '../../../components/pages/action'

import Footer from '../../../components/sections/Footer'

export default props => {

    const history = useHistory()

    const globalState = useContext(store)
    const { dispatch, state } = globalState
    const { customerStage } = state

    const [questionAnsweredsIds, setQuestionsAnsweredIds] = useState([]) // para saber quantas questoes foram respondidas
    const [order, setOrder] = useState(1)
    const [currentStageOne, setCurrentStageOne] = useState({ question: {} })
    const [inOutClass, setInOutClass] = useState('')

    const qtyQuestions = customerStage.customerStageOnes.length
    const nextVisible = (currentStageOne.answer_id !== null) && qtyQuestions > order
    const previousVisible = order > 1
    const dateIni = (customerStage) ? customerStage.date_ini : ''
    const duration_min = (customerStage) ? customerStage.duration_min : 0

    //handle totals
    useEffect(() => {
        if (customerStage && customerStage.id > 0 && customerStage.customerStageOnes) {
            const questionsAnswered = customerStage.customerStageOnes.filter(one => one.answer_id !== null)
            setQuestionsAnsweredIds(questionsAnswered)
            setOrder(questionsAnswered.length + 1)
        }

    }, [customerStage, qtyQuestions])

    //handle load current question on stageone
    useEffect(() => {
        let timeOutClass = 0
        async function loadQuestion() {
            if (customerStage && customerStage.id > 0 && order > 0 && customerStage.date_end === null) {
                const response = await api.get(`customerstageone/${customerStage.id}/${order}`, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
                if (response.data != null) {
                    setCurrentStageOne(response.data)
                    timeOutClass = setTimeout(() => {
                        setInOutClass('')
                    }, 1500);
                }
            }
        }

        loadQuestion()

        return () => {
            clearTimeout(timeOutClass)
        }
    }, [customerStage, order])

    function handleCustomerResult() {
        updateResult(dispatch, customerStage.id)
    }

    function handleOnExpire() {
        handleCustomerResult()
    }

    function handleNext() {
        setInOutClass('')
        //é o fim?
        if (order >= qtyQuestions) {
            handleCustomerResult()
        } else {
            setOrder(order + 1)
            setInOutClass('fade-in')
        }

    }

    function handlePrevious() {
        setInOutClass('')
        if (order > 1) {
            setInOutClass('fade-in')
            setOrder(order - 1)

        }
    }

    async function handleSelectedAnswer(customerStageOneId, question, answer) {


        // se ja foi atualizado envia para rota final
        if (customerStage.date_end !== null)
            history.replace('/end')
        else {

            // verifica se ja expirou e chama o calculo do resultado
            // + 1 verificacao alem do timer que ja valida, caso ocorra algum problema no caminho!
            let seconds = dateExpired(customerStage.date_ini, duration_min)
            if (seconds <= 0) {
                handleCustomerResult()
            } else {
                // vai para a proxima pergunta


                const data = {
                    answer_id: answer.id,
                    value: question.value
                }

                const response = await api.put(`customerstageone/${customerStageOneId}`, data, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
                if (response.data !== null) {
                    const questionAnsweredIdExists = questionAnsweredsIds.filter(id => id === question.id)
                    if (questionAnsweredIdExists.length === 0)
                        setQuestionsAnsweredIds([...questionAnsweredsIds, question.id])

                    handleNext()
                }
            }
        }
    }

    return (
        <>
            <div className="content-wrapper">
                <section className="content">
                    <div className={`content-stage ${inOutClass}`}>
                        <div className="m-3">
                            <div className="stage-question-title">
                                {order}) {currentStageOne.question.title}
                            </div>
                            {currentStageOne.question.description && (
                                <div className="stage-question-description">
                                    {currentStageOne.question.description}
                                </div>
                            )}
                            <div className="stage-question-resp">
                                {currentStageOne.question.image_url && (
                                    <div className="stage-question-resp-img">
                                        <img src={currentStageOne.question.image_url} alt='' className='img-fluid' />
                                    </div>
                                )}
                                <div className="stage-question-resp-answers">
                                    <ul>
                                        {currentStageOne.question.answers && (currentStageOne.question.answers.map(ans => {
                                            return (
                                                <li key={ans.id}><button type="button" onClick={() => handleSelectedAnswer(currentStageOne.id, currentStageOne.question, ans)} className={`btn btn-block btn-outline-secondary btn-md text-left ${(currentStageOne.answer_id === ans.id) ? 'active' : ''}`}>{ans.name}</button></li>
                                            )
                                        }))}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer
                onExpire={handleOnExpire}
                dateIni={dateIni}
                duration_min={duration_min}
                onClickNext={handleNext}
                nextVisible={nextVisible}
                onClickPrevious={handlePrevious}
                previousVisible={previousVisible}
                qtyQuestions={qtyQuestions}
                qtyAnswered={questionAnsweredsIds.length}
                order={order} />
        </>
    )
}

