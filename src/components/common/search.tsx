import { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import './search.css'

const Search = (): React.ReactElement => {

  const [searchEngine, setSearchEngine] = useState('Яндекс');
  const [text, setText] = useState('');

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      doSearch();
    }
  }

  const doSearch = () => {

    let url: string;
    switch (searchEngine) {
      case 'Яндекс': 
        url = `https://www.yandex.ru/search/?text=${text}&site=forum.mista.ru`;
        break;
      case 'Google': 
        url = `https://www.google.ru/search?q=${text}+site:forum.mista.ru`;
        break;
    }

    window.open(url);
    setText('');
  }

  return (
    <InputGroup size="sm">
      <DropdownButton 
        id="search-engine" 
        title="" 
        size="sm" 
        variant="light"
        onSelect={eventKey => setSearchEngine(eventKey)}
        >
        <Dropdown.Item eventKey="Яндекс">Яндекс</Dropdown.Item>
        <Dropdown.Item eventKey="Google">Google</Dropdown.Item>
      </DropdownButton>
      <FormControl
        type="text"
        placeholder={`${searchEngine}: поиск`}
        className='search-input input'
        onKeyUp={onKeyUp}
        onChange={e => setText(e.target.value)}
        value={text}
      />
      <InputGroup.Text className="search-button" onClick={doSearch}>
        <i className="fa fa-search input" style={{ zIndex: 1000 }} />
      </InputGroup.Text>
    </InputGroup>
  )

}

export default Search;