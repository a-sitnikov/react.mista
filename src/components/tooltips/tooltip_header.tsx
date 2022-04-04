import { FC, ReactElement } from 'react'

type IProps = {
  closeWindow?: (e: any) => any
}

const TooltipHeader: FC<IProps> = ({ children, closeWindow }): ReactElement => {
  return (
    <div className="tooltip-header">
      {children}
      <div className="tooltip-close" onClick={closeWindow} onTouchEnd={closeWindow}>
        <i className="fa fa-angle-right" aria-hidden="true"></i>
        <i className="fa fa-angle-left" aria-hidden="true" style={{ marginLeft: "-2px" }}></i>
      </div>
    </div>
  )
}

export default TooltipHeader;