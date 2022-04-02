import React, { FC, ReactElement } from 'react'

import { useAppDispatch } from 'src/data/store';
import { togglePreview } from 'src/data/topicslist/actions';

type IProps = {
  topicId: number,
  expanded: boolean
};

const PreviewLink: FC<IProps> = ({ topicId, expanded }): ReactElement => {

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(togglePreview(topicId));
  }

  const text = expanded ? '-' : '+';
  return (
    <div className="cell-preview-link" onClick={onClick}>
      <span>{text}</span>
    </div>
  )

}

export default PreviewLink;