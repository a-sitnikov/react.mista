//@flow
import React, { Component, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import queryString from 'query-string'

import Login from '../login'
import Sections from './sections'
import { fetchSectionsIfNeeded } from 'src/data/sections/actions'

const Header = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const params = queryString.parse(location.search);

  useEffect(() => {
    dispatch(fetchSectionsIfNeeded());
  }, [dispatch]);  

  const onSectionChange = (e, value) => {
    if (value)
      navigate(`/index.php?section=${value.shortn}`);
    else
      navigate(`/`);
  }

  return (
    <div className="flex-row">
      <div className="header-left">
        <Login />
      </div>
      <div className="header-right">
        <Sections
          defaultValue="--Все секции--"
          selected={params.section || ""}
          onChange={onSectionChange}
          size="sm"
        />
      </div>
    </div>
  )

}

export default connect()(Header);