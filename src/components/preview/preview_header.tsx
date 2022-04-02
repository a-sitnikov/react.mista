import { FC, ReactElement } from 'react'

import './topic_preview.css'

type IProps = {
  onFirst: any,
  onLast: any,
  onPrev: any,
  onNext: any
}

const PreviewHeader: FC<IProps> = ({ onFirst, onPrev, onNext, onLast }): ReactElement => {

  return (
    <div className="topic-preview-header">
      <div className="topic-preview-button flex-small" onClick={onFirst} title="К первому">
        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
      </div>
      <div className="topic-preview-button flex-large" onClick={onPrev} title="К предыдущему">
        <i className="fa fa-angle-left" aria-hidden="true"></i>
      </div>
      <div className="topic-preview-button flex-large" onClick={onNext} title="К следующему">
        <i className="fa fa-angle-right" aria-hidden="true"></i>
      </div>
      <div className="topic-preview-button flex-small" onClick={onLast} title="К последнему"> 
        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
      </div>
    </div>
  )

}

export default PreviewHeader;