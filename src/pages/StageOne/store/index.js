import React, { createContext, useReducer } from 'react'
import { reducer, INITIAL_STATE } from '../reducer'

const store = createContext(INITIAL_STATE)
const { Provider } = store

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }