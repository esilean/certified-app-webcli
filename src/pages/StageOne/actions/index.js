import toast from '../../../components/toastr'

import axios from 'axios'
import api from '../../../services/api'

export function load(dispatch, customerId, stageId) {

    api.get(`customerstage/${customerId}/${stageId}`, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
    ).then(response => {
        dispatch({ type: 'STAGE_LOADED', payload: response.data })
    }).catch(err => {
        toast.error("Erro ao carregar a primeira etapa.")
    })
}

export function begin(dispatch, customerId, stageId) {

    const data = {
        date_ini: new Date(),
        qty_questions: 5
    }

    api.post(`customerstage/${customerId}/${stageId}`, data, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
    ).then(response => {
        dispatch({ type: 'STAGE_LOADED', payload: response.data })
    }).catch(err => {
        toast.error("Erro ao gerar a primeira etapa.")
    })
}

export function update(dispatch, id, data) {

    api.put(`customerstage/${id}`, data, { headers: { 'Authorization': axios.defaults.headers.common['Authorization'] } }
    ).then(response => {
        dispatch({ type: 'STAGE_LOADED', payload: response.data })
    }).catch(err => {
        toast.error("Erro ao finalizar etapa.")
    })


}