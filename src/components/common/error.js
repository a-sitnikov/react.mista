//@flow
import React from 'react'

import './error.css'

const ErrorElem = ({ text }): any => {
  if (!text)
    return null;

  return (
    <div className="error" dangerouslySetInnerHTML={{ __html: text }}></div>
  )
}

export default ErrorElem;