import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { store } from '../store'

import axios from 'axios'
import api from '../../../services/api'
import { update } from '../actions'


import Footer from '../../../components/sections/Footer'

import '../styles.css'

export default props => {

    const history = useHistory()

    const globalState = useContext(store)
    const { dispatch, state } = globalState
    const { customerStage } = state

    const [questionAnsweredsIds, setQuestionsAnsweredIds] = useState([]) // para saber quantas questoes foram respondidas
    const [order, setOrder] = useState(1)
    const [currentStageOne, setCurrentStageOne] = useState({ questions: {} })

    const qtyQuestions = (customerStage && customerStage.customerStageOnes) ? customerStage.customerStageOnes.length : 0
    const nextVisible = (currentStageOne.answer_id !== null) && qtyQuestions > order
    const previousVisible = order > 1


    //handle totals
    useEffect(() => {
        if (customerStage && customerStage.id > 0 && customerStage.customerStageOnes) {
            const questionsAnswered = customerStage.customerStageOnes.filter(one => one.answer_id !== null)
            setQuestionsAnsweredIds(questionsAnswered)
            setOrder(questionsAnswered.length + 1)
        }

    }, [customerStage])

    //handle load current question on stageone
    useEffect(() => {
        async function loadQuestion() {
            if (customerStage && customerStage.id > 0 && order > 0 && customerStage.date_end === null) {
                const response = await api.get(`customerstageone/${customerStage.id}/${order}`, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } })
                if (response.data != null) {
                    setCurrentStageOne(response.data)
                }
            }
        }

        loadQuestion()
    }, [customerStage, order])

    async function handleCustomerResult() {

        // tem que acertar mais de X!!!!



        const data = {
            date_end: new Date(),
            approved: 0,
        }

        update(dispatch, customerStage.id, data)
    }

    function handleNext() {

        setOrder(order + 1)

        //é o fim?
        if (order === qtyQuestions) {
            handleCustomerResult()
        }
    }

    function handlePrevious() {
        if (order > 1)
            setOrder(order - 1)
    }

    async function handleSelectedAnswer(customerStageOneId, question, answer) {

        //valida se nao é golpe
        if (customerStage.date_end !== null)
            history.replace('/end')
        else {

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


    return (
        <>
            <div className="content-wrapper">
                <section className="content">
                    <div className="content-stage">
                        <div className="m-3">
                            <div className="stage-question">
                                <i className="fa fa-list"></i>{' '} Pergunta {order}
                            </div>
                            <div className="stage-question-title">
                                {currentStageOne.questions.title}
                            </div>
                            {currentStageOne.questions.description && (
                                <div className="stage-question-description">
                                    {currentStageOne.questions.description}
                                </div>
                            )}
                            <div className="stage-question-resp">
                                {currentStageOne.questions.image_url && (
                                    <div className="stage-question-resp-img">
                                        <img src={currentStageOne.questions.image_url} alt='' className='img-fluid' />
                                    </div>
                                )}
                                <div className="stage-question-resp-answers">
                                    <ul>
                                        {currentStageOne.questions.answers && (currentStageOne.questions.answers.map(ans => {
                                            return (
                                                <li key={ans.id}><button type="button" onClick={() => handleSelectedAnswer(currentStageOne.id, currentStageOne.questions, ans)} className={`btn btn-block btn-outline-secondary btn-md text-left ${(currentStageOne.answer_id === ans.id) ? 'active' : ''}`}>{ans.name}</button></li>
                                            )
                                        }))}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer onClickNext={handleNext} nextVisible={nextVisible} onClickPrevious={handlePrevious} previousVisible={previousVisible} qtyQuestions={qtyQuestions} qtyAnswered={questionAnsweredsIds.length} order={order} />
        </>
    )
}

