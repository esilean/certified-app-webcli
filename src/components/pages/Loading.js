import React from 'react'

import Loading from '../../assets/loading.gif'
import './styles.css'

export default props => {

    return (
        <div className="content-wrapper">
            <section className="content">
                <div className="content-stage-loading">
                    <img src={Loading} alt=''></img>
                </div>
            </section>
        </div>
    )
}