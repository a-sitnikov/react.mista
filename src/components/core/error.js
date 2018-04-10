//@flow
import React from 'react'

import './error.css'

type Props = {
    text: ?string
}

const ErrorElem = (props: Props) => {
    if (!props.text)
        return null;

    return (
        <p className="error">{props.text}</p>
    )    
}

export default ErrorElem;