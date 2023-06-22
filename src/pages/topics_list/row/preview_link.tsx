import { FC, ReactElement } from 'react'

import { useAppDispatch } from 'src/store';
import { topicsListActions } from 'src/store';

type IProps = {
  topicId: number,
  expanded: boolean
};

const PreviewLink: FC<IProps> = ({ topicId, expanded }): ReactElement => {

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(topicsListActions.togglePreview({topicId, msgNumber: 0}));
  };

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