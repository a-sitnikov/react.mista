//@flow
import React, { Component } from 'react'

type StringOptionProps = {
    name: string,
    label: string,
    value: string,
    onChange: any,
    postfix: ?string
}

class StringOption extends Component<StringOptionProps> {
    
    onChange: (e: any) => void;

    constructor(props: StringOptionProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e: any) {
        const { name } = this.props;
        this.props.onChange(e, name, e.target.value);
    }

    render() {

        const { name, value, label, postfix } = this.props;

        return (
            <label htmlFor={name} style={{marginRight: "5px"}}>
                <span style={{marginRight: "5px"}}>{label}</span>
                <input type="string" name={name} value={value} onChange={this.onChange}/>
                {postfix !== undefined ? 
                    <span style={{marginLeft: "5px"}}>{postfix}</span>
                : null}
            </label>
        );
    }
}

export default StringOption;