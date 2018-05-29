//@flow
import React, { Component } from 'react'

type NumberOptionProps = {
    name: string,
    label: string,
    value: string,
    onChange: any,
    min: number,
    max: number,
    postfix: ?string
}

class NumberOption extends Component<NumberOptionProps> {
    
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { name } = this.props;
        this.props.onChange(e, name, e.target.value);
    }

    render() {

        const { name, value, label, min, max, postfix } = this.props;

        return (
            <label htmlFor={name} style={{marginRight: "5px"}}>
                <span style={{marginRight: "5px"}}>{label}</span>
                <input type="number" name={name} value={+value} onChange={this.onChange} min={min} max={max}/>
                {postfix !== undefined ? 
                    <span style={{marginLeft: "5px"}}>{postfix}</span>
                : null}
            </label>
        );
    }
}

export default NumberOption;