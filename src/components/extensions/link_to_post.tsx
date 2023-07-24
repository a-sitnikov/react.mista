import { FC, ReactElement, useRef, useState, useEffect } from 'react'

import { getMaxPage, childrenToText } from 'src/utils';
import { fetchTopicInfo } from 'src/api'
import { useActionCreators, useAppSelector } from 'src/store';
import { ITooltipKeys, tooltipsActions } from 'src/store';

type IProps = {
  topicId: number,
  number: number,
  style?: {},
  children?: React.ReactNode
}

const LinkToPost: FC<IProps> = (props): ReactElement => {

  const timerRef = useRef(null);
  const actions = useActionCreators(tooltipsActions);

  const currentTopicId = useAppSelector(state => state.topic.info?.id);
  const tooltipDelay = useAppSelector(state => +state.options.items.tooltipDelay);

  let initialText = '';
  if (!props.children)
    initialText = String(props.number);
  else
    initialText = childrenToText(props.children).join('');
  
  const [text, setText] = useState(initialText);

  useEffect(() => {

    let isMounted = true;

    if (!initialText.startsWith("http")) {
      setText(initialText);
      return;
    }

    const run = async () => {
      const { title } = await fetchTopicInfo(props.topicId);
      if (isMounted)
        setText(title);
    }

    run();

    return () => { isMounted = false };

  }, [initialText, props.topicId]);

  const onMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    e.persist();
    timerRef.current = window.setTimeout(() => showToolTip(e), tooltipDelay);
  }

  const onMouseOut = () => {
    if (timerRef.current)
      clearTimeout(timerRef.current);
  }

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (timerRef.current)
      clearTimeout(timerRef.current);
    showToolTip(e);
  }

  const showToolTip = (e: React.MouseEvent<HTMLElement>) => {

    const { topicId, number } = props;

    const coords = {
      x: e.pageX,
      y: e.pageY - 50 // remove navbar margin-top
    }

    const keys: ITooltipKeys = {
      topicId: +topicId,
      number: +number
    }

    actions.show({ keys, coords });

  }

  if ((props.topicId === currentTopicId) || !isNaN(+text))
    return (
      <span
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
        className='link'
        style={{ ...props.style }}
      >{text}</span>
    )
  else {
    const page = getMaxPage(props.number);

    let pageParam = '';
    if (page > 1)
      pageParam = `&page=${page}`;

    return (
      <span>
        <a href={`#/topic.php?id=${props.topicId}${pageParam}#${props.number}`}
          style={{ ...props.style }}
        >{text}</a>{' '}
        (<span onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onClick={onClick}
          className='link'
        >{props.number}</span>)
      </span>
    )
  }
}

export default LinkToPost;