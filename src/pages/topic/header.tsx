import { FC, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from 'src/store'
import Login from 'src/components/login'
import { Link } from 'react-router-dom';

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
          <Link to={`/index.php?forum=${info.forum}`} style={{ textDecoration: "none" }}>{forums[info.forum]}</Link>
        </span>
      </div>
    </div>
  )
}

export default connector(Header);