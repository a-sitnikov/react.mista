import React from 'react'

const TooltipHeader = ({children, onCloseClick}) => {
    return (
        <div className="tooltip-header">
            {children}
            <div className="tooltip-close" onClick={onCloseClick}>
                <span className="tooltip-close-x">x</span>
            </div>
        </div>
    )
}

export default TooltipHeader;