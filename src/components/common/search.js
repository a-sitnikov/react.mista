//@flow
import React, { Component } from 'react'
import { Button, FormGroup, FormControl, InputGroup, Glyphicon, DropdownButton, Dropdown, MenuItem} from 'react-bootstrap'

type Props = {};

class Search extends Component<Props> {

    state: any;
    doSearch: () => void;
    onKeyPress: (e: any) => void;
    onSearchEngineChange: (e: any) => void;
    onSearchTextChange: (e: any) => void;

    constructor(props: Props) {
        super(props);
        this.doSearch = this.doSearch.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onSearchEngineChange = this.onSearchEngineChange.bind(this);
        this.onSearchTextChange = this.onSearchTextChange.bind(this);

        this.state = {
            searchEngine: 'Яндекс',
            text: ''
        }
    }

    doSearch() {
        
        let url;
        let text = this.state.text;
        console.log(this.state)

        if (this.state.searchEngine === 'Яндекс') {
            url = `https://www.yandex.ru/search/?text=${text}&site=mista.ru`;

        } else if (this.state.searchEngine === 'Google') {
            url = `https://www.google.ru/search?q=${text}+site:mista.ru`
        }    

        window.open(url);
        
        this.setState({
            ...this.state,
            text: ''
        });        
    }

    onSearchEngineChange(eventKey: string) {
        this.setState({
            ...this.state,
            searchEngine: eventKey
        })
    }
    
    onSearchTextChange(e: any) {
        this.setState({
            ...this.state,
            text: e.target.value
        })
    }

    onKeyPress(e: any) {
        if (e.key === 'Enter') {
            this.doSearch();
        }        
    }

    render() {

        return (
            <FormGroup bsSize="sm" style={{display: "flex"}}>
                <DropdownButton title="" bsSize="sm" style={{marginRight: "2px"}}>
                    <MenuItem eventKey="Яндекс" onSelect={this.onSearchEngineChange}>Яндекс</MenuItem>
                    <MenuItem eventKey="Google" onSelect={this.onSearchEngineChange}>Google</MenuItem>
                </DropdownButton>               
                <FormControl 
                    type="text" 
                    placeholder={`${this.state.searchEngine}: поиск`} 
                    style={{flex: "1", marginRight: "4px", paddingRight: "27px"}}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onSearchTextChange}
                    value={this.state.text}
                />
                <div style={{marginLeft: "-25px", marginTop: "auto", marginBottom: "auto", cursor: "pointer"}} onClick={this.doSearch}>
                    <Glyphicon glyph="search"/>
                </div>
            </FormGroup>
        )
    }
}

export default Search;