//@flow
import React, { Component, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import './search.css'

type Props = {};


class Search extends Component<Props> {

    state: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            searchEngine: 'Яндекс',
            text: ''
        }
    }

    doSearch = () => {
        
        let url;
        let text = this.state.text;

        if (this.state.searchEngine === 'Яндекс') {
            url = `https://www.yandex.ru/search/?text=${text}&site=forum.mista.ru`;

        } else if (this.state.searchEngine === 'Google') {
            url = `https://www.google.ru/search?q=${text}+site:forum.mista.ru`
        }    

        window.open(url);
        
        this.setState({
            ...this.state,
            text: ''
        });        
    }

    onSearchEngineSelect = (eventKey: string) => {
        this.setState({
            ...this.state,
            searchEngine: eventKey
        })
    }
    
    onSearchTextChange = (e: any) => {
        this.setState({
            ...this.state,
            text: e.target.value
        })
    }

    onKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            this.doSearch();
        }        
    }

    render() {

        return (
            <InputGroup size="sm">
                <InputGroup.Prepend>   
                    <DropdownButton id="search-engine" title="" size="sm" style={{marginRight: "2px"}} className='button' variant="light">
                        <Dropdown.Item eventKey="Яндекс" onSelect={this.onSearchEngineSelect}>Яндекс</Dropdown.Item>
                        <Dropdown.Item eventKey="Google" onSelect={this.onSearchEngineSelect}>Google</Dropdown.Item>
                    </DropdownButton> 
                </InputGroup.Prepend>   
                <FormControl 
                    type="text" 
                    placeholder={`${this.state.searchEngine}: поиск`} 
                    style={{marginRight: "4px", paddingRight: "27px"}}
                    className='input'
                    onKeyPress={this.onKeyPress}
                    onChange={this.onSearchTextChange}
                    value={this.state.text}
                />
                <InputGroup.Append style={{marginLeft: "-25px", marginTop: "auto", marginBottom: "auto", cursor: "pointer"}} onClick={this.doSearch}>
                    <i className="fa fa-search input" style={{zIndex: 1000}}/>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}

export default ( Search: any );