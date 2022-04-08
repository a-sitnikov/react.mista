import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';

import TopicsList from './topics_list'
import Topic from './topic'
import Options from './options'
import { clearTooltipsIfNeeded } from 'src/data/tooltips/actions'

import { useAppDispatch } from 'src/data/store';

const AppRoutes = (): ReactElement => {

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(clearTooltipsIfNeeded());
  }

  return (
    <div onClick={onClick} style={{ flex: "auto" }}>
      <Container>
        <Routes>
          <Route path='/' element={<TopicsList />} />
          <Route path='/index.php' element={<TopicsList />} />
          <Route path='/topic.php' element={<Topic />} />
          <Route path='/options.php' element={<Options />} />
        </Routes>
      </Container>
    </div>
  )
}

export default AppRoutes;