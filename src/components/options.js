//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { State } from 'src/reducers'
import type { OptionsState } from 'src/reducers/options'

import './options.css'

class Options extends Component<OptionsState> {

    constructor(props) {
        super(props);
    }

    render() {

        const { options } = this.props;
        if (!options.show)
            return null;

        return (
            <div id="mista-script-overlay" class="options-form-overlay">
                <div id="mista-script" class="options-form">
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