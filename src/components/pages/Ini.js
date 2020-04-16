import React, { } from 'react'

import Footer from '../sections/Footer'
import './styles.css'

export default ({ customerStage, begin }) => {


    return (
        <>
            <div className="content-wrapper">
                <section className="content">
                    <div className="content-stage">
                        <div>
                            {customerStage.stage.title_ini}
                        </div>

                        <div>
                            {customerStage.stage.description_ini}
                        </div>

                        <div>
                            {customerStage.stage.video_url_ini}
                        </div>
                        <div>
                            <button type="button" onClick={() => begin()}>Iniciar</button>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>

    )
}