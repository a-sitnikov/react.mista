import { ReactElement } from 'react';

import { useAppSelector } from 'src/store'
import Login from 'src/components/login'
import { Link } from 'react-router-dom';

const forums = {
  '1c': '1С:Предприятие',
  'life': 'О жизни',
  'it': 'Информационные технологии',
  'job': 'Работа'
};

const Header =  (): ReactElement => {

  const info = useAppSelector(state => state.topic.info);

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

export default Header;