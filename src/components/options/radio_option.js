//@flow
import React, { Component } from 'react'

type RadioOptionProps = {
    name: string,
    label: string,
    value: string,
    values: Array<{name: string, descr: string}>,
    onChange: any,
    oneLine: boolean
}

class RadioOption extends Component<RadioOptionProps> {
    
    onChange: (e: any) => void;

    constructor(props: RadioOptionProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e: any) {
        const { name } = this.props;
        this.props.onChange(e, name, e.target.value);
    }

    render() {

        const { name, label, values, oneLine } = this.props;

        let valuesElem = [];
        for (let i=0; i<values.length; i++) {
            let item = values[i];
            valuesElem.push(
                <label key={i} htmlFor={item.name} style={{marginRight: "5px"}}>
                    <input type="radio" name={name} value={item.name} checked={item.name === this.props.value} onChange={this.onChange}/>
                    {item.descr}
                </label>
                );    
        }

        return (
            <span>
                <span>{label}</span>
                {oneLine ? null : <br/>}   
                {valuesElem}
            </span>
        );
    }
}

export default RadioOption;