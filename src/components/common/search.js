//@flow
import React, { Component, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import './search.css'

const Search = () => {

  const [searchEngine, setSearchEngine] = useState('Яндекс');
  const [text, setText] = useState('');

  function onKeyPress(e: any) {
    if (e.key === 'Enter') {
      doSearch();
    }
  }

  function doSearch() {

    let url;
    if (searchEngine === 'Яндекс') {
      url = `https://www.yandex.ru/search/?text=${text}&site=forum.mista.ru`;

    } else if (searchEngine === 'Google') {
      url = `https://www.google.ru/search?q=${text}+site:forum.mista.ru`
    }

    window.open(url);

    setText('');

  }

  return (
    <InputGroup size="sm">
      <InputGroup.Prepend>
        <DropdownButton id="search-engine" title="" size="sm" style={{ marginRight: "2px" }} className='button' variant="light">
          <Dropdown.Item eventKey="Яндекс" onSelect={() => setSearchEngine("Яндекс")}>Яндекс</Dropdown.Item>
          <Dropdown.Item eventKey="Google" onSelect={() => setSearchEngine("Google")}>Google</Dropdown.Item>
        </DropdownButton>
      </InputGroup.Prepend>
      <FormControl
        type="text"
        placeholder={`${searchEngine}: поиск`}
        style={{ marginRight: "4px", paddingRight: "27px" }}
        className='input'
        onKeyPress={onKeyPress}
        onChange={e => setText(e.target.value)}
        value={text}
      />
      <InputGroup.Append style={{ marginLeft: "-25px", marginTop: "auto", marginBottom: "auto", cursor: "pointer" }} onClick={doSearch}>
        <i className="fa fa-search input" style={{ zIndex: 1000 }} />
      </InputGroup.Append>
    </InputGroup>
  )

}

export default (Search: any);