//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as API from 'src/api'

import MsgText from '../topic/row/msg_text'
import UserInfo from '../topic/row/user_info';

import TooltipWindow from './tooltip_window'
import TooltipHeader from './tooltip_header'
import TooltipBody from './tooltip_body'
import './tooltip.css'

import type { DefaultProps } from 'src/components'
import type { TooltipItemState } from 'src/data/tooltips/reducer'
import type { TooltipKeys } from 'src/data/tooltips/actions'

type TooltipProps = {
  tooltip: TooltipItemState,
  info: any,
  items: any,
  item0: any
}

type Props = TooltipProps & DefaultProps;
type State = {
  data: any,
  text: string,
  number: number
}

class Tooltip extends Component<Props, State> {

  data: any;
  text: string;
  fetchData: any;

  constructor(props) {
    super(props);

    const { tooltip, info, items, item0 } = props;
    const { keys } = tooltip;

    let text = '';
    let data;
    if (keys.topicId === info.id) {
      if (keys.number === 0)
        data = item0;
      else
        data = items.find(item => item.n === String(keys.number));

      if (data)
        text = data.text;
    }

    this.state = {
      data,
      text,
      number: keys.number
    }
  }

  fetchData = async (number: number) => {

    if (number < 0) return;

    let data;
    let text = '';
    const topicId = this.props.tooltip.keys.topicId;

    try {
      data = await API.getMessage(topicId, number);
      if (data)
        text = data.text;
      else
        text = `Сообщение не найдено ${number}`;

    } catch (e) {
      text = e.message;
    }

    this.setState({ data, text, number });
  }

  onScroll = (delta) => {

    const { keys } = this.props.tooltip;
    if (keys.type !== 'TOPIC_PREVIEW') return;
    if (delta > 0) {
      this.fetchData(this.state.number + 1)
    } else {
      this.fetchData(this.state.number - 1)
    }
  }

  componentDidMount() {

    if (!this.state.data)
      this.fetchData(this.state.number);

  }

  render() {
    const { keys } = this.props.tooltip;

    if (!this.state.text)
      return null;

    let header;
    if (!this.state.data) {
      header = <b>Заголовок</b>
    } else {
      header = <UserInfo data={this.state.data} isAuthor={false} isTooltip={true}/>
    }

    if (keys.type === 'TOPIC' || keys.type === 'TOPIC_PREVIEW')
      return (
        <TooltipWindow tooltip={this.props.tooltip} onScroll={this.onScroll}>
          <TooltipHeader>
            {header}
          </TooltipHeader>
          <TooltipBody>
            <MsgText
              data={this.state.data}
              html={this.state.text}
              topicId={keys.topicId}
              style={{ maxHeight: "min(550px, 80vh)", overflowY: "auto" }}
            />
          </TooltipBody>
        </TooltipWindow>
      )
    else
      return null;
  }
}
const mapStateToProps = (state) => {

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

export default (connect(mapStateToProps)(Tooltip): any );