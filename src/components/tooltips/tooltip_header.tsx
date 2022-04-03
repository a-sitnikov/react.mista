import { FC, ReactElement } from 'react'

type IProps ={
    closeWindow?: (e: any) => any
}

const TooltipHeader: FC<IProps> = ({children, closeWindow}): ReactElement => {
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