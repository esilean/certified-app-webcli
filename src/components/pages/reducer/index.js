export const INITIAL_STATE = {
    customerStage: {
        stage: { 
            name: ''
        },
        customerStageOnes: []
    },
    loaded: false,
}

export function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'STAGE_LOADED':
            return { ...state, loaded: true, customerStage: action.payload }
        default:
            return state
    }
}
