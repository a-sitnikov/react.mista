//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { showTooltip } from '../../data/tooltips/actions'

import { getMaxPage, childrenToText } from 'src/utils';
import { fetchTopicInfo } from 'src/api/topicinfo'

import type { State } from 'src/reducers'
import type { DefaultProps } from 'src/components'
import type { ResponseInfo, ResponseMessages } from 'src/api'

type LinkToPostProps = {
  topicId: string,
  number: number,
  isPreview: boolean,
  style: {}
}

type StateProps = {
  info: ResponseInfo,
  items: ResponseMessages,
  tooltipDelay: string
}

type Props = LinkToPostProps & StateProps & DefaultProps;

class LinkToPost extends Component<Props, { text: string }> {

  timer;

  constructor(props) {
    super(props);

    const { children, number } = this.props;
    if (children)
      this.state = { text: childrenToText(children).join('') };
    else
      this.state = { text: String(number) };
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (!props.children) {
      this.setState({ text: String(props.number) });
    }
  }

  componentDidMount() {

    if (this.state.text.startsWith("http")) {

      const { topicId } = this.props;
      fetchTopicInfo(topicId)
        .then(response => {
          this.setState({
            text: response.text
          })
        });

    }
  }

  onMouseOver = (event) => {
    event.persist();
    const { tooltipDelay } = this.props;
    this.timer = setTimeout(() => this.showToolTip(event), +tooltipDelay);
  }

  onClick = (event) => {
    event.stopPropagation();
    clearTimeout(this.timer);
    this.showToolTip(event);
  }

  onMouseOut = (event) => {
    clearTimeout(this.timer);
  }

  showToolTip = (e) => {
    const { topicId, number, dispatch, isPreview } = this.props;

    const coords = {
      x: e.pageX,
      y: e.pageY - 50 // remove navbar margin-top
    }

    const keys = {
      type: isPreview ? 'TOPIC_PREVIEW' : 'TOPIC',
      topicId,
      number: +number
    }
    dispatch(showTooltip(
      keys,
      coords
    ));
  }

  render() {

    const { topicId, number, style, info } = this.props;
    const page = getMaxPage(number);

    let pageParam = '';
    if (page > 1)
      pageParam = `&page=${page}`;

    let a;
    if (info && topicId === info.id || !isNaN(this.state.text))
      a = (
        <span
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          onClick={this.onClick}
          className='link'
          style={{ ...style }}
        >{this.state.text}</span>
      )
    else
      a = (
        <span>
          <a href={`${window.hash}/topic.php?id=${topicId}${pageParam}#${number}`}
            style={{ ...style }}
          >{this.state.text}</a>{' '}
                    (<span onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            onClick={this.onClick}
            className='link'
          >{number}</span>)
        </span>
      )

    return a;
  }
}

const mapStateToProps = (state: State): StateProps => {

  const {
    items, info
  } = state.topic;

  return {
    items,
    info,
    tooltipDelay: state.options.items['tooltipDelay']
  }
}

export default (connect(mapStateToProps)(LinkToPost): any );