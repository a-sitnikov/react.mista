import React, { FC, ReactElement, useEffect } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'

import { getSectionsIfNeeded } from 'src/data/sections/actions'

import { RootState, useAppDispatch } from 'src/data/store'

import type { ISectionItem, ISectionsList, ISectionsTree } from 'src/data/sections'

interface IProps {
  id: string,
  items: ISectionsList,
  tree?: ISectionsTree,
  defaultValue: string,
  selected: string,
  style?: {},
  size?: 'sm' | 'lg',
  onChange: (e: any, value: ISectionItem) => void
}

const Sections: FC<IProps> = (props): ReactElement => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSectionsIfNeeded());
  }, [dispatch]);

  const onSelect: (e: any) => void = (e: any) => {

    const { items, onChange } = props;

    if (onChange) {
      const code = e.currentTarget.value;
      const arr = items.filter(item => item.code === code);
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

const mapStateToProps = (state: RootState) => {

  const { items, tree } = state.sections;

  return {
    items,
    tree
  }
}

export { Sections };
export default connect(mapStateToProps)(Sections);