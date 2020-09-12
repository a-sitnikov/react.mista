import React from 'react'

const TooltipBody = ({children, onTouchMove}) => {
    
    var startX = 0;

    function onTouchStart(e) {
        startX = e.nativeEvent.changedTouches[0].clientX;
    }
    
    function onTouchEnd(e) {
        let endX = e.nativeEvent.changedTouches[0].clientX;
        onTouchMove(endX - startX);
    }

    return (
        <div className="tooltip-text" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {children}
        </div>
    )
}

export default TooltipBody;