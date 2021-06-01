//@flow
import React from 'react'

import './error.css'

type Props = {
    text: ?string
}

const ErrorElem = (props: Props): any => {
    if (!props.text)
        return null;

    return (
        <div className="error" dangerouslySetInnerHTML={{__html: props.text}}></div>
    )    
}

export default ErrorElem;