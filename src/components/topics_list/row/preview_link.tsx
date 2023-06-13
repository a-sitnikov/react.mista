import React, { FC, ReactElement, useCallback } from 'react'

import { useAppDispatch } from 'src/data/store';
import  topicListSlice  from 'src/data/topicslist/reducer';

type IProps = {
  topicId: number,
  expanded: boolean
};

const PreviewLink: FC<IProps> = ({ topicId, expanded }): ReactElement => {

  const dispatch = useAppDispatch();

  const onClick = useCallback(() => {
    dispatch(topicListSlice.actions.togglePreview({topicId, msgNumber: 0}));
  }, [dispatch, topicId]);

  const text = expanded 
    ? <i className="fa fa-minus-square-o agh" aria-hidden="true"></i> 
    : <i className="fa fa-plus-square-o agh" aria-hidden="true"></i>;
  return (
    <div className="cell-preview-link" onClick={onClick}>
      <span>{text}</span>
    </div>
  )

}

export default PreviewLink;