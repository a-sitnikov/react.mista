import { FC, ReactElement, useEffect } from 'react'
import CSS from 'csstype'
import Form from 'react-bootstrap/Form'

import { useAppDispatch, useAppSelector } from 'src/store'
import { getSectionsIfNeeded, ISectionItem } from 'src/store'

export type IProps = {
  id: string,
  defaultValue: string,
  selected?: string,
  style?: CSS.Properties,
  size?: 'sm' | 'lg',
  onChange?: (e: React.ChangeEvent<HTMLElement>, value: ISectionItem) => void
}

const Sections: FC<IProps> = (props): ReactElement => {

  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.sections.items);
  const tree = useAppSelector(state => state.sections.tree);

  useEffect(() => {
    dispatch(getSectionsIfNeeded());
  }, [dispatch]);

  const onSelect: (e: React.ChangeEvent<HTMLElement>) => void = (e: any) => {

    const { onChange } = props;

    if (onChange) {
      const code = e.currentTarget.value;
      const arr = items.filter(item => item.code === code);
      if (arr.length > 0)
        onChange(e, arr[0]);
      else
        onChange(e, null);
    }
  }

  let sectionsElem = [];
  for (let forum in tree) {

    let group =
      <optgroup key={forum} label={forum}>
        {tree[forum].map((item) => (
          <option key={item.id} value={item.code}>
            {item.name}
          </option>
        ))}
      </optgroup>

    sectionsElem.push(group);
  }
  
  const { id, defaultValue, selected, style, size } = props;

  return (
    <Form.Select
      aria-label="Секция"
      onChange={onSelect}
      value={selected}
      style={style}
      className='input'
      size={size}
      id={id}
    >
      <option value="">{defaultValue}</option>
      {sectionsElem}
    </Form.Select>
  )
}

export default Sections;