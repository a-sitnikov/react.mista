import React, { FC, ReactElement, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { useLocation } from "react-router-dom";
import queryString from 'query-string'
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

import './topic.css'
import { RootState, useAppDispatch } from 'src/data/store';

var scrolledToHash;
var timer;

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
  
  let locationParams = queryString.parse(location.search);
  let page = getPageNumber(locationParams.page);
  const maxPage = getMaxPage(info.count);

  const updateTopic = () => {

    if (locationParams.id !== String(info.id))
      item0 = null;

    dispatch(getTopicIfNeeded(locationParams, item0));
  }

  const onPostNewMessageSuccess = () => {

    const isLastPage = (page === 'last20' || page === maxPage);

    if (isLastPage)
      dispatch(getNewMessagesIfNeeded({
        id: info.id,
        last: info.count
      }));

      dispatch(newMessageText(''));
  }
  
  useEffect(() => {
    if (info.title)
      document.title = extractTextFromHTML(info.title);
  }, [info.title]);

  useEffect(() => {
    updateTopic();
  }, [dispatch, locationParams.id, page]);
    
  useEffect(() => {
    
    const clearStore = () => {
      dispatch(clearTopicMessages());
      scrolledToHash = undefined;
    }
    return clearStore;

  }, [dispatch]);

  useEffect(() => {
    if (!scrolledToHash &&
      location.hash &&
      items.length > 0) {
      let nodeHash = document.getElementById(location.hash.slice(1));
      if (nodeHash)
        setTimeout(() => window.scrollTo(0, nodeHash.offsetTop), 1);
      scrolledToHash = true;
    }  
  });  

  return (
    <div style={{ marginBottom: "5px" }}>
      {error && <Error text={error} />}
      <Header/>
      <div className="topic-table">
        <TopicInfo />
        <Row key='0' data={item0} />
        {items.map((item, i) => (
          <Row key={item.n} data={item} />
        ))}
        {(maxPage > 1 || page === "last20") &&
          <div className="tf">
            <Pages baseUrl='topic.php' locationParams={locationParams} maxPage={maxPage} last20 />
          </div>
        }
      </div>
      <Footer locationParams={locationParams} />
      {login.logged &&
        <NewMessage onSubmitSuccess={onPostNewMessageSuccess} />
      }
    </div>
  )

}

export default connector(Topic);