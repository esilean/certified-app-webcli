import 'rc-progress/assets/index.css'

import React, { useState, useEffect } from 'react'
import { Line } from 'rc-progress';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import Timer from '../../components/timer'
import moment from 'moment'

import './styles.css'

export default ({ onExpire, dateIni, duration_min, onClickNext, nextVisible, onClickPrevious, previousVisible, qtyQuestions, qtyAnswered }) => {

    const [expiryTimestamp, setExpiryTimestamp] = useState()

    const total = (qtyAnswered / qtyQuestions * 100.00)

    useEffect(() => {

        if (dateIni) {

            var dateAdded = moment(dateIni).add(duration_min, 'minutes')
            var date = new Date(Date.parse(dateAdded));

            setExpiryTimestamp(date)
        }

    }, [dateIni, duration_min])


    function handleNext() {
        onClickNext()
    }

    function handlePrevious() {
        onClickPrevious()
    }

    return (

        <footer className="navbar fixed-bottom shadow-lg p-3 primary-color" style={{ minHeight: '110px' }}>
            <div className="content-footer">
                <div className="content-footer-button">
                    {previousVisible && (<button onClick={() => handlePrevious()} className="footer-button"> <GoArrowLeft />{' '}anterior</button>)}
                </div>
                <div className="content-footer-progress">
                    <div className="text-center">
                        {expiryTimestamp && (<Timer onExpire={onExpire} expiryTimestamp={expiryTimestamp} textColor={'white'} />)}
                    </div>
                    <div className="text-center">
                        {(qtyQuestions > 0) && (<small style={{ color: 'white' }}>{qtyAnswered} de {qtyQuestions} perguntas respondidas</small>)}
                    </div>
                    {(qtyQuestions > 0) && (<Line percent={total} strokeWidth="1.1" trailWidth="0.5" strokeColor={'#beff00'} />)}

                </div>
                <div className="content-footer-button">
                    {nextVisible && (<button onClick={() => handleNext()} className="footer-button">próxima{' '}<GoArrowRight /></button>)}
                </div>
            </div>
        </footer>

    )
}