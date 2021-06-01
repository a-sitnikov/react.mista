//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'

import { fetchSectionsIfNeeded } from 'src/actions/sections'

import type { ResponseSection, ResponseSections } from 'src/api'

import type { DefaultProps } from 'src/components'
import type { State } from 'src/reducers'

type SectionSelectProps = {
    defaultValue: string,
    selected: string,
    className: string,
    id: string,
    style?: {},
    size: ?string,
    onChange: (e: any, section: ResponseSection | null) => void
}

type StateProps = {
    items: ResponseSections,
    tree: {}
}

type Props = SectionSelectProps & StateProps & DefaultProps;

export class SectionSelect extends Component<Props> {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSectionsIfNeeded());
    }

    onSelect = (e: any) => {

        const { items, onChange } = this.props;

        if (onChange) {
            const shortn = e.target.value;
            const arr = items.filter(val => val.shortn === shortn);
            if (arr.length > 0) 
                onChange(e, arr[0]);
            else    
                onChange(e, null);
        }    
    }

    render() {

        const { id, tree, defaultValue, selected, style, size } = this.props;
        
        let sectionsElem = [];
        for (let forum in tree) {

            let group =
                <optgroup key={forum} label={forum}>
                    {tree[forum].map((item, i) => (
                        <option key={item.id} value={item.shortn}>
                            {item.fulln}
                        </option>
                    ))}
                </optgroup>

            sectionsElem.push(group);
        }

        return  (
            <Form.Control as="select" 
                onChange={this.onSelect}
                value={selected}
                style={style}
                className='input'
                size={size}
                id={id}
            >
                <option value="">{defaultValue}</option>
                {sectionsElem}
            </Form.Control>    
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    const { items, tree } = state.sections;

    return {
        items,
        tree
    }
}

export default ( connect(mapStateToProps)(SectionSelect): any );