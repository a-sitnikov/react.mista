//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { State } from 'src/reducers'
import type { OptionsState } from 'src/reducers/options'

import './options.css'

class Options extends Component<OptionsState> {

    closeForm;

    constructor(props) {
        super(props);
        this.closeForm = this.closeForm.bind(this);
    }

    closeForm(){
        const { dispatch } = this.props;
        dispatch({
            type: 'CLOSE_OPTIONS'
        })
    }

    render() {

        const { options } = this.props;
        if (!options.show)
            return null;

        return (
            <div>
                <div id="mista-script-overlay" class="options-form-overlay">
                </div>    
                <div id="mista-script" class="options-form">
                    <span id="closeOptions" class="close-button" onClick={this.closeForm}>
                        <b> x </b>
                    </span>                
                    <div class="options-header" style={{cursor: "default"}}>
                        <b>Настройки React.Mista</b>
                    </div>
                    <div className="tabs">
                    </div>
                    <div id="tab_content">
                    </div>
                    <div className="button-row">
                        <button id="applyOptions" className="sendbutton" style={{margin: "5px", height: "30px"}}>OK</button>
                        <button id="cancelOptions" className="sendbutton" style={{margin: "5px", float: "left", height: "30px"}}>Отмена</button>
                        <button id="defaultOptions" className="sendbutton" style={{margin: "5px", float: "right",  height: "30px"}}>Сбросить настройки</button>
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