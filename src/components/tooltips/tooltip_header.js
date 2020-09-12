import React from 'react'

const TooltipHeader = ({children, closeWindow}) => {
    return (
        <div className="tooltip-header">
            {children}
            <div className="tooltip-close" onClick={closeWindow} onTouchEnd={closeWindow}>
                <span className="tooltip-close-x">x</span>
            </div>
        </div>
    )
}

export default TooltipHeader;