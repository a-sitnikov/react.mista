//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import type { State } from 'src/reducers'
import type { OptionsState } from 'src/reducers/options'

import './options.css'

class Options extends Component<OptionsState> {

    state: any;
    setState;
    closeForm;
    onTabClick;
    form: Array<any>;

    constructor(props) {
        super(props);
        this.closeForm = this.closeForm.bind(this);
        this.onTabClick = this.onTabClick.bind(this);

        this.state = {
            activeTab: 'Общие'
        };

        this.form = [
            {
                tab: 'Общие', 
                rows: [
                    ['theme']
                ]
            },
            {
                tab: 'Тултипы',
                rows: [

                ]
            }
        ]
    }

    closeForm(){
        const { dispatch } = this.props;
        dispatch({
            type: 'CLOSE_OPTIONS'
        })
    }

    onTabClick(e){
        this.setState({
            activeTab: e.target.textContent
        });
    }

    render() {

        const { options } = this.props;
        if (!options.show)
            return null;

        let tabs = [];
        for (let tab of this.form) {
            let classes = classNames("tab", {
                active: tab.tab === this.state.activeTab
            });
            tabs.push(<div key={tab.tab} className={classes} onClick={this.onTabClick}>{tab.tab}</div>);
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
                    </div>
                    <div className="button-row">
                        <button id="applyOptions" className="button" style={{margin: "5px", height: "30px"}}>OK</button>
                        <button id="cancelOptions" className="button" style={{margin: "5px", float: "left", height: "30px"}} onClick={this.closeForm}>Отмена</button>
                        <button id="defaultOptions" className="button" style={{margin: "5px", float: "right",  height: "30px"}}>Сбросить настройки</button>
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