import toast from '../../../components/toastr'

import api from '../../../services/api'
import { getToken } from '../../../utils/cookies'

export function load(dispatch, customerId) {

    api.get(`customerstage/${customerId}/current`, { headers: { 'Authorization': getToken() } }
    ).then(response => {

        let payload = response.data

        // se ainda nao cadastrou, cadastra a etapa inicial 1
        if (payload == null) {
            begin(dispatch, customerId, 1)
        } else {
            dispatch({ type: 'STAGE_LOADED', payload })
        }
    }).catch(err => {
        toast.error("Erro ao carregar a primeira etapa.")
    })
}

export function update(dispatch, customerStageId, data) {

    api.put(`customerstage/${customerStageId}`, data, { headers: { 'Authorization': getToken() } }
    ).then(response => {
        dispatch({ type: 'STAGE_LOADED', payload: response.data })
    }).catch(err => {
        toast.error("Erro ao atualizar etapa.")
    })
}

export function updateResult(dispatch, customerStageId) {

    api.get(`customerstage/${customerStageId}/result`, { headers: { 'Authorization': getToken() } }
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

export function begin(dispatch, customerId, stageId) {

    api.get(`stages/${stageId}`, { headers: { 'Authorization': getToken() } }
    ).then(response => {

        if (response.data) {
            const { questions_qty, duration_min, grade_perc_min } = response.data
            const data = {
                questions_qty,
                duration_min,
                grade_perc_min,
            }

            api.post(`customerstage/${customerId}/${stageId}`, data, { headers: { 'Authorization': getToken() } }
            ).then(response => {
                dispatch({ type: 'STAGE_LOADED', payload: response.data })
            }).catch(err => {
                toast.error("Erro ao gerar etapa.")
            })
        }

    }).catch(err => {
        toast.error("Erro ao obter dados da primeira etapa.")
    })





}