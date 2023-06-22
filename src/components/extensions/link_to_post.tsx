//TODO: Refactor
import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { getMaxPage, childrenToText } from 'src/utils';
import { fetchTopicInfo } from 'src/api'
import { RootState } from 'src/store';
import { ITooltipKeys, tooltipsActions } from 'src/store/slices/tooltips';

type IProps = {
  topicId: string,
  number: number,
  style: {}
}

const mapState = (state: RootState) => {

  const {
    items, info
  } = state.topic;

  return {
    items,
    info,
    tooltipDelay: state.options.items['tooltipDelay']
  }
}

const connector = connect(mapState);
class LinkToPost extends Component<ConnectedProps<typeof connector> & IProps, { text: string }> {

  timer: number;

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
      fetchTopicInfo(+topicId)
        .then(response => {
          this.setState({
            text: response.title
          })
        });

    }
  }

  onMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    e.persist();
    const { tooltipDelay } = this.props;
    this.timer = window.setTimeout(() => this.showToolTip(e), +tooltipDelay);
  }

  onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    clearTimeout(this.timer);
    this.showToolTip(e);
  }

  onMouseOut = () => {
    clearTimeout(this.timer);
  }

  showToolTip = (e: React.MouseEvent<HTMLElement>) => {
    const { topicId, number, dispatch } = this.props;

    const coords = {
      x: e.pageX,
      y: e.pageY - 50 // remove navbar margin-top
    }

    const keys: ITooltipKeys = {
      topicId: +topicId,
      number: +number
    }
    dispatch(tooltipsActions.show({keys, coords}));    
    // dispatch(showTooltip(
    //   keys,
    //   coords
    // ));
  }

  render() {

    const { topicId, number, style, info } = this.props;
    const page = getMaxPage(number);

    let pageParam = '';
    if (page > 1)
      pageParam = `&page=${page}`;

    let a;
    if ((info && (+topicId === info.id)) || !isNaN(+this.state.text))
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
          <a href={`#/topic.php?id=${topicId}${pageParam}#${number}`}
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

export default connector(LinkToPost);