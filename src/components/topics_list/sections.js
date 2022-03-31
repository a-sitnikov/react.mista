//@flow
import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'

import { getSectionsIfNeeded } from 'src/data/sections/actions'

import type { ResponseSection, ResponseSections } from 'src/api'

import type { DefaultProps } from 'src/components'
import type { State } from 'src/reducers'
import { useAppDispatch } from 'src/data/store'

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

const Sections = (props) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSectionsIfNeeded());
  }, [dispatch]);

  const onSelect: (e: SyntheticEvent<HTMLSelectElement>) => void = (e: SyntheticEvent<HTMLSelectElement>) => {

    const { items, onChange } = props;

    if (onChange) {
      const code = e.currentTarget.value;
      const arr = items.filter(val => val.code === code);
      if (arr.length > 0)
        onChange(e, arr[0]);
      else
        onChange(e, null);
    }
  }

  const { id, tree, defaultValue, selected, style, size } = props;

  let sectionsElem = [];
  for (let forum in tree) {

    let group =
      <optgroup key={forum} label={forum}>
        {tree[forum].map((item, i) => (
          <option key={item.id} value={item.code}>
            {item.name}
          </option>
        ))}
      </optgroup>

    sectionsElem.push(group);
  }

  return (
    <Form.Control as="select"
      onChange={onSelect}
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

const mapStateToProps = (state: State): StateProps => {

  const { items, tree } = state.sections;

  return {
    items,
    tree
  }
}

export { Sections };
export default connect(mapStateToProps)(Sections);