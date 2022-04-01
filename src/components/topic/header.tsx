import React, { FC, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from 'src/data/store'
import Login from 'src/components/login'

const mapState = (state: RootState) => {
  return {
    info: state.topic.info,
    login: state.login
  }  
}
const connector = connect(mapState);

const Header: FC<ConnectedProps<typeof connector>> =  ({ info, login }): ReactElement => {

  const forums = {
    '1c': '1С:Предприятие',
    'life': 'О жизни',
    'it': 'Информационные технологии',
    'job': 'Работа'
  };

  return (

    <div className="flex-row">
      <div className="header-left">
        <Login/>
      </div>
      <div className="header-right">
        <span id="forum_string" className="bold120">
          <a rel="nofollow" href={`#/index.php?forum=${info.forum}`} style={{ textDecoration: "none" }}>{forums[info.forum]}</a>
        </span>
      </div>
    </div>
  )
}

export default connector(Header);