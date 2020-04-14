import React from 'react'

import './styles.css'

export default props => {

    function begin() {
        props.begin()
    }

    return (
        <div className="container-page">
            <button type="button" onClick={() => begin()}>Iniciar</button>
        </div>
    )
}