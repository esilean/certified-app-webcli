import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

export default props => {

    return (
        <div className="wrapper">
            <div className="content-wrapper" style={{ minHeight: '328px' }}>
                <Switch>
                    <Route exact path='/'><div>...Hello from the otherside!</div></Route>
                    <Redirect from='*' to='/' />
                </Switch>
            </div>
        </div >

    )
}