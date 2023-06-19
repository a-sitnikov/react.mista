import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux'

import { fetchTopicMessage } from 'src/api/topicMessages';

import MsgText from '../topic/row/msg_text'
import UserInfo from '../topic/row/user_info';

import TooltipWindow from './tooltip_window'
import TooltipHeader from './tooltip_header'
import TooltipBody from './tooltip_body'

import './tooltip.css'
import { RootState } from 'src/store/store';
import { ITopicMessage } from 'src/store/topic';
import { ITooltipItem } from 'src/store/tooltips';

type IProps = {
  tooltip: ITooltipItem,
  info: any,
  items: any,
  item0: any
}

const mapState = (state: RootState) => {

  const {
    info,
    items,
    item0
  } = state.topic;

  return {
    info,
    items,
    item0
  }
}

const connector = connect(mapState);
const Tooltip: FC<ConnectedProps<typeof connector> & IProps> = (props): ReactElement | null => {

  const { tooltip, info, items, item0 } = props;
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

export default connector(Tooltip);