//@flow
import React, { Component } from 'react'

type CheckboxOptionProps = {
    name: string,
    label: string,
    value: string,
    onChange: any,
}

class CheckboxOption extends Component<CheckboxOptionProps> {
    
    onChange: (e: any) => void;

    constructor(props: CheckboxOptionProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e: any) {
        const { name } = this.props;
        this.props.onChange(e, name, String(e.target.checked));
    }

    render() {

        const { name, value, label } = this.props;
        return (
            <label htmlFor={name} style={{marginRight: "5px"}}>
                <input type="checkbox" name={name} checked={value === 'true'} onChange={this.onChange}/>
                <span>{label}</span>
            </label>
        );
    }
}

export default CheckboxOption;