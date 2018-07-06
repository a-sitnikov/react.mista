//@flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Checkbox, FormControl, Button } from 'react-bootstrap'

import RadioOption from './radio_option'
import StringOption from './string_option'

import { saveOptions } from 'src/actions/options'

import type { State } from 'src/reducers'
import type { OptionsState } from 'src/reducers/options'
import { defaultOptionsState } from 'src/reducers/options'

import './options.css'

class Options extends Component<OptionsState> {

    optionsParams: any;
    state: any;
    setState;
    closeForm;
    applyOptions;
    resetOptions;
    onChange;
    onTabClick;
    form: any;

    constructor(props) {
        super(props);
        this.closeForm    = this.closeForm.bind(this);
        this.applyOptions = this.applyOptions.bind(this);
        this.resetOptions = this.resetOptiopns.bind(this);
        this.onChange     = this.onChange.bind(this);
        this.onTabClick   = this.onTabClick.bind(this);

        this.state = {
            items: props.options.items
        };
        
        this.optionsParams = {
            'theme': {
                type: 'radio', 
                label: 'Цветовая палитра:', 
                oneLine: true,
                values: [
                    {name: 'theme-yellow', descr: 'Золотая'}, 
                    {name: 'theme-lightgray', descr: 'Серая'}
                    ]
            },
            'topicsPerPage': {
                type: 'number',
                label: 'Тем на странице (max 99):',
                min: 1,
                max: 99
            },
            'autoRefreshTopicsList': {
                type: 'checkbox',
                label: 'Автообновление списка тем'
            },
            'autoRefreshTopicsListInterval': {
                type: 'number',
                label: '',
                min: 60,
                max: 1000000,
                postfix: 'сек'
            },                                   
            'autoRefreshTopic': {
                type: 'checkbox',
                label: 'Автообновление темы'
            },
            'autoRefreshTopicInterval': {
                type: 'number',
                label: '',
                min: 60,
                max: 1000000,
                postfix: 'сек'
            },               
            'showTooltips': {
                type: 'checkbox',
                label: 'Показывать тултипы, задержка'
            },
            'tooltipsDelay': {
                type: 'number',
                max: 1000000,
                label: '',
                postfix: 'мс'
            }                                    
        }
        
        this.form = [
            {
                tabName: 'Общие', 
                rows: [ 
                    ['theme'],
                    ['autoRefreshTopicsList', 'autoRefreshTopicsListInterval'],
                    ['autoRefreshTopic', 'autoRefreshTopicInterval'],
                ]  
            },
            {
                tabName: 'Тултипы',
                rows: [
                    ['showTooltips', 'tooltipsDelay'],
                    ['showTooltipsOnTopicsList'],
                    ['showTooltipsOnPostLink']
                ]    
            }
        ]

    }

    closeForm(){
        const { history } = this.props;
        history.push('/' + window.hash);
    }
    
    resetOptiopns(){
        this.setState({
            items: Object.assign({}, defaultOptionsState.items)
        })
    }

    applyOptions(){

        const { dispatch } = this.props;
        dispatch(saveOptions(this.state.items));
        this.closeForm();       
    }

    onTabClick(e){
        this.setState({
            activeTab: e.target.textContent
        });
    }

    onChange(e, name, value) {

        let items = Object.assign({}, this.state.items);
        items[name] = value;
        this.setState({
            ...this.state,
            items
        })
    }

    render() {

        let tabs = [];
        for (let tab of this.form) {
            
            let rows = [];
            for (let i in tab.rows) {
                
                const row = tab.rows[i];
                let rowElem = [];
                for (let name of row) {

                    const item = this.optionsParams[name];
                    if (!item) continue;

                    const value = this.state.items[name];

                    if (item.type === 'radio') {
                        rowElem.push(
                            <RadioOption 
                                key={name} 
                                name={name} 
                                label={item.label} 
                                values={item.values} 
                                value={value}
                                oneLine={item.oneLine}
                                onChange={this.onChange}
                            />
                        );
                    } else if (item.type === 'number') {
                        rowElem.push(
                            <FormControl
                                key={name}
                                type="number"
                                min={item.min}
                                max={item.max}
                                value={value}
                                onChange={this.onChange}
                                style={{flex: "0 0 100px", marginLeft: "5px"}}
                                bsSize="sm"
                            >
                            </FormControl>
                        );
                        
                        if (item.postfix) {
                            rowElem.push(
                                <span key={name + '_postfix'} style={{marginLeft: "5px", flex: "0 0 auto",}}>{item.postfix}</span>
                            )    
                        };

                    } else if (item.type === 'string') {
                        rowElem.push(
                            <StringOption 
                                key={name} 
                                name={name} 
                                label={item.label} 
                                postfix={item.postfix}
                                value={value}
                                onChange={this.onChange}
                            />
                        );
                    } else if (item.type === 'checkbox') {
                        rowElem.push(
                            <Checkbox 
                                key={name}
                                name={name} 
                                checked={Boolean(value)}
                                onChange={(e) => this.onChange(e, name, e.target.checked)}
                                style={{flex: "0 0 auto", margin: "0px"}}
                            >
                                {item.label}
                            </Checkbox>
                        );
                    }
                }

                rows.push(
                    <div key={i} className="options-row">
                        {rowElem}
                    </div>
                    );

            }

            tabs.push(
                <div key={tab.tabName}>
                    <div className="tab-header">
                        {tab.tabName}
                    </div>
                    <div className="tab-content">                    
                        {rows}
                    </div>
                </div>
            );
        }


        return (
                <div className="options-form">
                    <div className="options-header" style={{cursor: "default"}}>
                        <b>Настройки</b>
                    </div>
                    {tabs}
                    <div className="button-row">
                        <Button id="applyOptions" bsSize="sm" style={{margin: "5px", height: "30px"}} onClick={this.applyOptions}>OK</Button>
                        <Button id="cancelOptions" bsSize="sm" style={{margin: "5px", float: "left", height: "30px"}} onClick={this.closeForm}>Отмена</Button>
                        <Button id="defaultOptions" bsSize="sm" style={{margin: "5px", float: "right",  height: "30px"}} onClick={this.resetOptions}>Сбросить настройки</Button>
                    </div>                    
                </div>
        )
    }

}    

const mapStateToProps = (state: State): OptionsState => {

    return {
        options: state.options
    };

}

export default connect(mapStateToProps)(withRouter(Options));