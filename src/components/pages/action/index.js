import toast from '../../../components/toastr'

import axios from 'axios'
import api from '../../../services/api'

export function load(dispatch, customerId, stageId) {

    api.get(`customerstage/${customerId}/${stageId}`, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
    ).then(response => {

        let payload = response.data

        // se ainda nao cadastrou, cadastra a etapa inicial
        if (payload == null) {
            api.get('stages/1', { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
            ).then(response => {

                if (response.data) {
                    const { questions_qty, duration_min, grade_perc_min } = response.data
                    const data = {
                        questions_qty,
                        duration_min,
                        grade_perc_min,
                    }

                    begin(dispatch, customerId, stageId, data)
                }

            }).catch(err => {
                toast.error("Erro ao obter dados da primeira etapa.")
            })
        } else {
            dispatch({ type: 'STAGE_LOADED', payload })
        }
    }).catch(err => {
        toast.error("Erro ao carregar a primeira etapa.")
    })
}

export function update(dispatch, customerStageId, data) {

    api.put(`customerstage/${customerStageId}`, data, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
    ).then(response => {
        dispatch({ type: 'STAGE_LOADED', payload: response.data })
    }).catch(err => {
        toast.error("Erro ao atualizar etapa.")
    })
}

export function updateResult(dispatch, customerStageId) {

    api.get(`customerstage/${customerStageId}/result`, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
    ).then(response => {

        const data = {
            approved: response.data.approved,
            date_end: new Date(),
        }

        update(dispatch, customerStageId, data)

    }).catch(err => {
        toast.error("Erro ao calcular resultado da etapa.")
        dispatch({ type: 'STAGE_LOADED', payload: { stage: {}, customerStageOnes: [] } })
    })
}

function begin(dispatch, customerId, stageId, data) {

    api.post(`customerstage/${customerId}/${stageId}`, data, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
    ).then(response => {
        dispatch({ type: 'STAGE_LOADED', payload: response.data })
    }).catch(err => {
        toast.error("Erro ao gerar etapa.")
    })
}