import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in'

import { getEmbedURL } from '../../utils/js/urlvideo'

import Footer from '../sections/Footer'
import './styles.css'

export default ({ customerStage, begin }) => {

    const [description, setDescription] = useState('')

    useEffect(() => {

        if (customerStage.stage.description_ini) {

            let desc = customerStage.stage.description_ini
            desc = desc.replace('{{qtde_perguntas}}', customerStage.questions_qty)
            desc = desc.replace('{{duracao_etapa}}', customerStage.duration_min)
            desc = desc.replace('{{nota_minima}}', customerStage.grade_perc_min)
            setDescription(desc)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerStage.stage.description_ini])

    return (
        <>

            <div className="content-wrapper fixed-bottom-margin">
                <section className="content">
                    <div className="content-stage content-state-body-iniend">
                        <FadeIn delay={300} transitionDuration={800}>
                            <div className="stage-title">
                                <p className="h4 text-uppercase">{customerStage.stage.title_ini}</p>
                            </div>
                            {
                                customerStage.stage.video_url_ini && customerStage.stage.video_url_ini !== '' && (
                                    <div className="stage-video">
                                        <div className="embed-responsive embed-responsive-16by9">
                                            <iframe title="Vídeo da Página Inicial" className="embed-responsive-item" src={getEmbedURL(customerStage.stage.video_url_ini)} allowFullScreen />
                                        </div>
                                    </div>
                                )
                            }
                            <div className="stage-description">
                                <p className="text-center" style={{ whiteSpace: 'pre-line' }}>
                                    {description}
                                </p>
                            </div>
                            <div className="stage-button">
                                <button type="button" onClick={() => begin()}>Iniciar Etapa</button>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            </div>

            <Footer />
        </>

    )
}