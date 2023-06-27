import { ReactElement, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import './search.css'

const Search = (): ReactElement => {

  const [searchEngine, setSearchEngine] = useState('Яндекс');
  const [text, setText] = useState('');

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      doSearch();
    }
  }

  const doSearch = () => {

    let url: string;
    if (searchEngine === 'Яндекс') 
      url = `https://www.yandex.ru/search/?text=${text}&site=forum.mista.ru`;

    else if (searchEngine === 'Google') 
      url = `https://www.google.ru/search?q=${text}+site:forum.mista.ru`

    window.open(url);
    setText('');
  }

  return (
    <InputGroup size="sm">
      <DropdownButton 
        id="search-engine" 
        title="" 
        size="sm" 
        style={{ marginRight: "2px" }} 
        className='button' 
        variant="light"
        onSelect={eventKey => setSearchEngine(eventKey)}
        >
        <Dropdown.Item eventKey="Яндекс">Яндекс</Dropdown.Item>
        <Dropdown.Item eventKey="Google">Google</Dropdown.Item>
      </DropdownButton>
      <FormControl
        type="text"
        placeholder={`${searchEngine}: поиск`}
        style={{ marginRight: "4px", paddingRight: "27px" }}
        className='input'
        onKeyPress={onKeyPress}
        onChange={e => setText(e.target.value)}
        value={text}
      />
      <InputGroup.Text style={{ marginLeft: "-35px", marginTop: "auto", marginBottom: "auto", cursor: "pointer" }} onClick={doSearch}>
        <i className="fa fa-search input" style={{ zIndex: 1000 }} />
      </InputGroup.Text>
    </InputGroup>
  )

}

export default Search;