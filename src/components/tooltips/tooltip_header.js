import React from 'react'

const TooltipHeader = ({children, onClose}) => {
    return (
        <div className="tooltip-header">
            {children}
            <div className="tooltip-close" onClick={onClose}>
                <span className="tooltip-close-x">x</span>
            </div>
        </div>
    )
}

export default TooltipHeader;