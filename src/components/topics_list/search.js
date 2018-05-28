//@flow
import React, { Component } from 'react'

import './search.css'

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

        if (this.state.searchEngine === 'yandex') {
            url = `https://www.yandex.ru/search/?text=${text}&site=forum.mista.ru`;

        } else if (this.state.searchEngine === 'google') {
            url = `https://www.google.ru/search?q=${text}+site:forum.mista.ru`
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
            <div name="find_form" style={{ width: "100%" }}>
                <span className="agh mr5">Поиск</span>
                <select className="field" value={this.state.searchEngine} style={{width: "100px", borderRight: "none"}} onChange={this.onSearchEngineChange}>
                    <option>google</option>
                    <option>yandex</option>
                </select>
                <input 
                    className="field search-text" 
                    type="text" 
                    value={this.state.text}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onSearchTextChange}
                />
                <button className="search-button" onClick={this.doSearch}>Найти</button>
            </div>
        )
    }
}

export default Search;