export const INITIAL_STATE = {
    customerStage: {},
    loaded: false,
    customerStageOneSelected: {}
}

export function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'STAGE_LOADED':
            return { ...state, loaded: true, customerStage: action.payload }
        case 'STAGE_ONE_SELECTED':
            return { ...state, customerStageOneSelected: action.payload }
        default:
            return state
    }
}
