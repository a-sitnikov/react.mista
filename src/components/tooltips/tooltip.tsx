import { FC, ReactElement, useCallback, useEffect, useState } from 'react';

import { fetchTopicMessage } from 'src/api';

import MsgText from 'src/pages/topic/row/msg_text'
import UserInfo from 'src/pages/topic/row/user_info';

import TooltipWindow from './tooltip_window'
import TooltipHeader from './tooltip_header'
import TooltipBody from './tooltip_body'

import './tooltip.css'
import { useAppSelector } from 'src/store';
import { ITopicMessage, ITooltipItem } from 'src/store';

type IProps = {
  tooltip: ITooltipItem
}

const Tooltip: FC<IProps> = (props): ReactElement | null => {

  const { info, items, item0 } = useAppSelector(state => state.topic);
  const { tooltip } = props;
  const { keys } = tooltip;

  let text = '';
  let data: ITopicMessage | undefined;
  if (keys.topicId === info.id) {
    if (keys.number === 0)
      data = item0;
    else
      data = items.find((item: ITopicMessage) => item.n === keys.number);

    if (data)
      text = data.text;
  }

  const [state, setState] = useState({
    data,
    text
  })

  const fetchData = useCallback(async () => {

    if (state.data) return;

    let data: ITopicMessage;
    let text = '';

    try {
      data = await fetchTopicMessage(keys.topicId, keys.number);
      if (data)
        text = data.text;
      else
        text = `Сообщение не найдено ${keys.number}`;

    } catch (e) {
      text = (e as Error).message;
    }

    setState({ data, text });
  }, [keys.topicId, keys.number, state.data])

  useEffect(() => {
      fetchData();
  }, [fetchData])

  if (!state.text)
    return null;

  let header: ReactElement;
  if (!state.data) {
    header = <b>Заголовок</b>
  } else {
    header = <UserInfo data={state.data} isAuthor={false} isYou={false} isTooltip={true} />
  }

  return (
    <TooltipWindow tooltip={props.tooltip}>
      <TooltipHeader>
        {header}
      </TooltipHeader>
      <TooltipBody>
        <MsgText
          data={state.data}
          n={state.data?.n}
          vote={state.data?.vote}
          html={state.text}
          topicId={keys.topicId}
          style={{ maxHeight: "min(550px, 80vh)", overflowY: "auto" }}
        />
      </TooltipBody>
    </TooltipWindow>
  )

}

export default Tooltip;