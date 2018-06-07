//@flow
import React, { Component } from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap'

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
            searchEngine: 'yandex',
            text: ''
        }
    }

    doSearch() {
        
        let url;
        let text = this.state.text;
        console.log(this.state)

        if (this.state.searchEngine === 'yandex') {
            url = `https://www.yandex.ru/search/?text=${text}&site=mista.ru`;

        } else if (this.state.searchEngine === 'google') {
            url = `https://www.google.ru/search?q=${text}+site:mista.ru`
        }    

        window.open(url);
        
        this.setState({
            ...this.state,
            text: ''
        });        
    }

    onSearchEngineChange(e: any) {
        this.setState({
            ...this.state,
            searchEngine: e.target.value
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
                <FormControl componentClass="select" style={{flex: "0 0 90px", marginRight: "4px"}} onChange={this.onSearchEngineChange}>
                    <option value="yandex">Яндекс</option>
                    <option value="google">Google</option>
                </FormControl>
                <FormControl 
                    type="text" 
                    placeholder="Поиск по сайту" 
                    style={{flex: "1", marginRight: "4px"}}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onSearchTextChange}
                    value={this.state.text}
                />
                <Button type="submit" bsSize="sm" onClick={this.doSearch}>Найти</Button>
            </FormGroup>
        )
    }
}

export default Search;