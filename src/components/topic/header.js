// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import Login from '../login'

type Props = {
  info: { forum: string }
}

const Header = ({ info }) => {

  const forums = {
    '1c': '1С:Предприятие',
    'life': 'О жизни',
    'it': 'Информационные технологии',
    'job': 'Работа'
  };

  return (

    <div className="flex-row">
      <div className="header-left">
        <Login />
      </div>
      <div className="header-right">
        <span id="forum_string" className="bold120">
          <a rel="nofollow" href={`${window.hash}/index.php?forum=${info.forum}`} style={{ textDecoration: "none" }}>{forums[info.forum]}</a>
        </span>
      </div>
    </div>
  )
}

const mapStateToProps = state => {

  const {
    info
  } = state.topic || {
    info: {
      forum: ''
    }
  }

  return {
    info
  }
}

export default (connect(mapStateToProps)(Header): any );