import 'rc-progress/assets/index.css'

import React from 'react'
import { Line } from 'rc-progress';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'

import './styles.css'

export default ({ onClickNext, nextVisible, onClickPrevious, previousVisible, qtyQuestions, qtyAnswered }) => {

    const total = (qtyAnswered / qtyQuestions * 100.00)

    function handleNext() {
        onClickNext()
    }

    function handlePrevious() {
        onClickPrevious()
    }

    return (

        <footer className="navbar fixed-bottom shadow-lg p-3 primary-color">
            <div className="content-footer">
                <div className="content-footer-button">
                    {previousVisible && (<button onClick={() => handlePrevious()} className="footer-button"> <GoArrowLeft />{' '}anterior</button>)}
                </div>
                <div className="content-footer-progress">
                    <div className="text-center">
                        <small style={{ color: 'white' }}>{qtyAnswered} de {qtyQuestions} perguntas respondidas</small>
                    </div>
                    <Line percent={total} strokeWidth="1.1" trailWidth="0.5" strokeColor={'#beff00'} />
                </div>
                <div className="content-footer-button">
                    {nextVisible && (<button onClick={() => handleNext()} className="footer-button">próxima{' '}<GoArrowRight /></button>)}
                </div>
            </div>
        </footer>

    )
}