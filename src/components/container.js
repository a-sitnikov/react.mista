import { Routes, Route } from 'react-router-dom'
import React, { Component } from 'react';

import TopicsList from './topics_list'
import Topic from './topic'
import Options from './options'
import { clearTooltipsIfNeeded } from 'src/data/tooltips/actions'

import { useAppDispatch } from 'src/data/store';

const Container = () => {

  const dispatch = useAppDispatch();

  const onClick = (e: SyntheticEvent<HTMLElement>) => {
    dispatch(clearTooltipsIfNeeded());
  }

  return (
    <div onClick={onClick} style={{ flex: "auto" }}>
      <div className="container">
        <Routes>
          <Route path='/' element={<TopicsList />} />
          <Route path='/index.php' element={<TopicsList />} />
          <Route path='/topic.php' element={<Topic />} />
          <Route path='/options.php' element={<Options />} />
        </Routes>
      </div>
    </div>
  )
}

export default Container;