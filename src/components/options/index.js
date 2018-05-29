//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import RadioOption from './radio_option'
import NumberOption from './number_option'
import CheckboxOption from './checkbox_option'

import { saveOptions, closeOptions } from 'src/actions/options'

import type { State } from 'src/reducers'
import type { OptionsState } from 'src/reducers/options'
import { defaultOptionsState } from 'src/reducers/options'

import './options.css'

class Options extends Component<OptionsState> {

    state: any;
    setState;
    closeForm;
    applyOptions;
    resetOptions;
    onChange;
    onTabClick;
    form: Array<any>;

    constructor(props) {
        super(props);
        this.closeForm    = this.closeForm.bind(this);
        this.applyOptions = this.applyOptions.bind(this);
        this.resetOptions = this.resetOptiopns.bind(this);
        this.onChange     = this.onChange.bind(this);
        this.onTabClick   = this.onTabClick.bind(this);

        this.state = {
            activeTab: 'Общие',
            items: props.options.items
        };
        this.form = [
            {
                tabName: 'Общие', 
                rows: [
                    [{
                        name: 'theme', 
                        type: 'radio', 
                        label: 'Цветовая палитра:', 
                        oneLine: true,
                        values: [
                            {name: 'theme-yellow', descr: 'Золотая'}, 
                            {name: 'theme-lightgray', descr: 'Серая'}
                            ]
                    }],
                    [{
                        name: 'showTitle', 
                        type: 'checkbox', 
                        label: 'Показывать заголовок форума', 
                    }],
                    [{
                        name: 'topicsPerPage',
                        type: 'number',
                        label: 'Тем на странице (max 99):',
                        min: 1,
                        max: 99
                    }],
                    [{
                        name: 'autoRefreshTopicsList',
                        type: 'checkbox',
                        label: 'Автообновление списка тем'
                    }, {
                        name: 'autoRefreshTopicsListInterval',
                        type: 'number',
                        label: '',
                        min: 60,
                        max: 1000000,
                        postfix: 'сек'
                    }],
                    [{
                        name: 'autoRefreshTopic',
                        type: 'checkbox',
                        label: 'Автообновление темы'
                    }, {
                        name: 'autoRefreshTopicInterval',
                        type: 'number',
                        label: '',
                        min: 60,
                        max: 1000000,
                        postfix: 'сек'
                   }]
                ]
            },
            {
                tabName: 'Тултипы',
                rows: [

                ]
            }
        ]

    }

    closeForm(){
        const { dispatch } = this.props;
        dispatch(closeOptions());
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

        const { options } = this.props;
        if (!options.show)
            return null;

        let tabs = [];
        let tab_cont = [];
        for (let tab of this.form) {
            
            let classes = classNames("tab", {
                active: tab.tabName === this.state.activeTab
            });
            tabs.push(<div key={tab.tabName} className={classes} onClick={this.onTabClick}>{tab.tabName}</div>);

            let classesTabCont = classNames("tab-cont", {
                active: tab.tabName === this.state.activeTab
            });

            let rows = [];
            for (let i in tab.rows) {
                
                const row = tab.rows[i];
                let rowElem = [];
                for (let j in row) {

                    const item = row[j];
                    if (item.type === 'radio') {
                        rowElem.push(
                            <RadioOption 
                                key={j} 
                                name={item.name} 
                                label={item.label} 
                                values={item.values} 
                                value={this.state.items[item.name]}
                                oneLine={item.oneLine}
                                onChange={this.onChange}
                            />
                        );
                    } else if (item.type === 'number') {
                        rowElem.push(
                            <NumberOption 
                                key={j} 
                                name={item.name} 
                                label={item.label} 
                                value={this.state.items[item.name]} 
                                min={item.min}
                                max={item.max}
                                postfix={item.postfix}
                                onChange={this.onChange}
                            />
                        );
                    } else if (item.type === 'checkbox') {
                        rowElem.push(
                            <CheckboxOption 
                                key={j} 
                                name={item.name} 
                                label={item.label} 
                                value={this.state.items[item.name]} 
                                onChange={this.onChange}
                            />
                        );
                    }
                }

                rows.push(
                    <div key={i} className="options-row">
                        {rowElem}
                    </div>
                    );

            }

            tab_cont.push(<div key={tab.tabName} className={classesTabCont}>{rows}</div>);
        }


        return (
            <div>
                <div id="mista-script-overlay" className="options-form-overlay">
                </div>    
                <div id="mista-script" className="options-form">
                    <span id="closeOptions" className="close-button" onClick={this.closeForm}>
                        <b> x </b>
                    </span>                
                    <div className="options-header" style={{cursor: "default"}}>
                        <b>Настройки React.Mista</b>
                    </div>
                    <div className="tabs">
                    {tabs}
                    </div>
                    <div id="tab_content">
                    {tab_cont}
                    </div>
                    <div className="button-row">
                        <button id="applyOptions" className="button" style={{margin: "5px", height: "30px"}} onClick={this.applyOptions}>OK</button>
                        <button id="cancelOptions" className="button" style={{margin: "5px", float: "left", height: "30px"}} onClick={this.closeForm}>Отмена</button>
                        <button id="defaultOptions" className="button" style={{margin: "5px", float: "right",  height: "30px"}} onClick={this.resetOptions}>Сбросить настройки</button>
                    </div>                    
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

export default connect(mapStateToProps)(Options);