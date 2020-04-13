import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import AuthOrApp from './authOrApp'

toast.configure({
    autoClose: 3500,
})
export default props => (
    <BrowserRouter>
        <Switch>
            <Route path='/' component={AuthOrApp} />
            <Redirect from='*' to='/' />
        </Switch>
    </BrowserRouter>
)