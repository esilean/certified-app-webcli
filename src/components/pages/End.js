import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in'

import { getEmbedURL } from '../../utils/js/urlvideo'

import Footer from '../sections/Footer'
import './styles.css'

export default ({ customerStage, beginNextState }) => {

    const [content, setContent] = useState({})

    useEffect(() => {

        if (customerStage.stage) {
            if (customerStage.approved) {
                setContent({
                    title: customerStage.stage.title_end,
                    url: customerStage.stage.video_url_end,
                    description: customerStage.stage.description_end,
                    buttonText: `Preparar Etapa ${customerStage.stage_id + 1}`
                })
            } else {
                setContent({
                    title: customerStage.stage.title_end_fail,
                    url: customerStage.stage.video_url_end_fail,
                    description: customerStage.stage.description_end_fail,
                    buttonText: `Refazer Etapa ${customerStage.stage_id}`
                })
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerStage.stage])


    function handleNextAction() {

        if (customerStage.approved)
            beginNextState(customerStage.stage_id + 1)
        else
            beginNextState(customerStage.stage_id)
    }

    return (
        <>
            <div className="content-wrapper fixed-bottom-margin">
                <section className="content">
                    <div className="content-stage content-state-body-iniend">
                        <FadeIn delay={300} transitionDuration={800}>
                            <div className="stage-title">
                                <p className="h4 text-uppercase">{content.title}</p>
                            </div>
                            {
                                content.url && content.url !== '' && (
                                    <div className="stage-video">
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <iframe title="Vídeo da Página Inicial" className="embed-responsive-item" src={getEmbedURL(content.url)} allowFullScreen />
                                        </div>
                                    </div>
                                )
                            }
                            <div className="stage-description">
                                <p className="text-center" style={{ whiteSpace: 'pre-line' }}>
                                    {content.description}
                                </p>
                            </div>
                            <div className="stage-button">
                                <button type="button" onClick={() => handleNextAction()}>{content.buttonText}</button>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            </div>
            <Footer />
        </>

    )
}