//@flow
import React, { Component } from 'react'

type RadioOptionProps = {
    name: string,
    label: string,
    value: string,
    values: Array<{name: string, descr: string}>
}

class RadioOption extends Component<RadioOptionProps> {
    
    render() {

        const { name, label, value, values } = this.props;

        let valuesElem = [];
        for (let i=0; i<values.length; i++) {
            let item = values[i];
            valuesElem.push(
                <label key={i} htmlFor={item.name} style={{marginRight: "5px"}}>
                    <input type="radio" name={name} id={item.name} value={item.name} checked={item.name === value}/>
                    {item.descr}
                </label>
                );    
        }

        return (
            <span>
                <span>{label}</span>
                <br/>   
                {valuesElem}
            </span>
        );
    }
}

export default RadioOption;