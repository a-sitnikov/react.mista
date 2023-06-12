import React, { FC, ReactElement, useCallback, useEffect, useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { useLocation } from "react-router-dom";
import { getTopicIfNeeded, getNewMessagesIfNeeded, clearTopicMessages } from 'src/data/topic/actions'
import { newMessageText } from 'src/data/newmessage/actions'

import Error from 'src/components/common/error'
import Pages from 'src/components/common/pages'
import Header from './header'
import TopicInfo from './topic_info'
import Row from './row'
import Footer from './footer'
import NewMessage from './new_message';
import { getMaxPage, extractTextFromHTML } from 'src/utils';
import { RootState, useAppDispatch } from 'src/data/store';

import './topic.css'

var scrolledToHash: boolean;

const mapState = (state: RootState) => {

  const {
    isFetching,
    lastUpdated,
    info,
    item0,
    items,
    error
  } = state.topic;

  return {
    login: state.login,
    info,
    item0,
    items,
    isFetching,
    lastUpdated,
    error,
    options: state.options.items
  }
}

const getPageNumber = (locationPage: string | string[]): number | "last20" => {
  if (!locationPage) return 1;
  if (locationPage === "last20") return "last20";
  if (isNaN(+locationPage)) return 1;
  return +locationPage;
}

const connector = connect(mapState);
const Topic: FC<ConnectedProps<typeof connector>> = ({ login, items, item0, info, error }): ReactElement => {

  const dispatch = useAppDispatch()
  const location = useLocation();

  let locationParams = new URLSearchParams(location.search);
  const topicId = +locationParams.get('id');
  const page = getPageNumber(locationParams.get('page'));
  const maxPage = getMaxPage(info.count);
  
  const isLastPageRef = useRef(false);
  isLastPageRef.current = (page === 'last20' || page === maxPage);

  const updateNewMessages = useCallback(() => {
    if (isLastPageRef.current)
      dispatch(getNewMessagesIfNeeded());
  }, [dispatch])

  const onPostNewMessageSuccess = () => {
    updateNewMessages();
    dispatch(newMessageText(''));
  }

  useEffect(() => {
    if (info.title)
      document.title = extractTextFromHTML(info.title);
  }, [info.title]);

  useEffect(() => {
    dispatch(getTopicIfNeeded(topicId, page));
  }, [dispatch, topicId, page]);

  useEffect(() => {

    const timer = window.setInterval(updateNewMessages, 60 * 1000);

    const clearStore = () => {
      dispatch(clearTopicMessages());
      scrolledToHash = undefined;
      if (timer) clearInterval(timer);
    }
    return clearStore;

  }, [dispatch, updateNewMessages]);

  useEffect(() => {
    if (!scrolledToHash &&
      location.hash &&
      items.length > 0) {
      const nodeHash = document.getElementById(location.hash.slice(1));
      if (nodeHash)
        setTimeout(() => window.scrollTo(0, nodeHash.offsetTop), 1);
      scrolledToHash = true;
    }
  });

  return (
    <div style={{ marginBottom: "5px" }}>
      <Header />
      {error && <Error text={error} />}
      <div className="topic-table">
        <TopicInfo />
        <Row key='0' data={item0} />
        {items.map((item, i) => (
          <Row key={item.n} data={item} />
        ))}
        {(maxPage > 1 || page === "last20") &&
          <div className="tf">
            <Pages maxPage={maxPage} last20 />
          </div>
        }
      </div>
      <Footer page={page} />
      {login.logged &&
        <NewMessage onSubmitSuccess={onPostNewMessageSuccess} />
      }
    </div>
  )

}

export default connector(Topic);