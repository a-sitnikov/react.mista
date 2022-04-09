import { FC, ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { Form, FormControl, Button } from 'react-bootstrap'

import RadioOption from './radio_option'
import StringOption from './string_option'

import { saveOptions } from 'src/data/options/actions'

import { defaultOptionsState } from 'src/data/options'
import { formTabs, formParams } from './formscheme'
import Tab from './tab'

import './options.css'
import { RootState, useAppDispatch } from 'src/data/store'

const mapState = (state: RootState) => {
  return {
    options: state.options
  };
}

const connector = connect(mapState);
const Options: FC<ConnectedProps<typeof connector>> = (props): ReactElement => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    items: props.options.items
  })

  const closeForm = () => {
    navigate('/#');
  }

  const resetOptions = () => {
    setState({
      ...state,
      items: Object.assign({}, defaultOptionsState.items)
    })
  }

  const applyOptions = () => {

    dispatch(saveOptions(state.items));
    closeForm();
  }

  const onChange = (e, name, value) => {

    let items = Object.assign({}, state.items);
    items[name] = value;
    setState({
      ...state,
      items
    })
  }

  let tabs = [];
  for (let tab of formTabs) {

    let rows = [];
    for (let i in tab.rows) {

      const row = tab.rows[i];
      let rowElem = [];
      for (let name of row) {

        const item = formParams[name];
        if (!item) continue;

        const value = state.items[name];

        if (item.type === 'radio') {
          rowElem.push(
            <RadioOption
              key={name}
              name={name}
              label={item.label}
              values={item.values}
              value={value}
              oneLine={item.oneLine}
              onChange={onChange}
            />
          );
        } else if (item.type === 'number') {

          if (item.label)
            rowElem.push(
              <label
                htmlFor={name}
                key={name + '_label'}
                style={{ fontWeight: "inherit" }}>
                {item.label}
              </label>
            );

          rowElem.push(
            <div className='options-number' key={name}>
              <FormControl
                type="number"
                min={item.min}
                max={item.max}
                value={value}
                onChange={(e) => onChange(e, name, e.target.value)}
                
                className='input'
                size="sm"
              >
              </FormControl>
              {item.postfix &&
                <span key={name + '_postfix'} style={{ marginLeft: "5px", flex: "0 0 auto", }}>{item.postfix}</span>}
            </div>
          );

        } else if (item.type === 'string') {
          rowElem.push(
            <StringOption
              key={name}
              name={name}
              label={item.label}
              postfix={item.postfix}
              value={value}
              onChange={onChange}
            />
          );
        } else if (item.type === 'checkbox') {
          rowElem.push(
            <Form.Check
              id={name}
              type="checkbox"
              label={item.label}
              key={name}
              name={name}
              checked={String(value) === 'true'}
              onChange={(e) => onChange(e, name, e.target.checked)}
              style={{ flex: "0 0 auto", margin: "0px" }}
            />
          );
        }
      }

      rows.push(
        <div key={i} className="options-row">
          {rowElem}
        </div>
      );

    }

    tabs.push(
      <Tab key={tab.tabName} name={tab.tabName}>
        {rows}
      </Tab>
    );
  }

  return (
    <div className="options-form">
      <div className="options-header" style={{ cursor: "default" }}>
        <b>Настройки</b>
      </div>
      {tabs}
      <div className="button-row">
        <Button
          id="applyOptions"
          size="sm"
          variant="light"
          style={{ margin: "5px" }}
          className='button'
          onClick={applyOptions}>
          OK
        </Button>
        <Button
          id="cancelOptions"
          size="sm"
          variant="light"
          style={{ margin: "5px", float: "left" }}
          className='button'
          onClick={closeForm}>
          Отмена
        </Button>
        <Button
          id="defaultOptions"
          size="sm"
          variant="light"
          style={{ margin: "5px", float: "right" }}
          className='button'
          onClick={resetOptions}>
          Сбросить настройки
        </Button>
      </div>
    </div>
  )
}

export default connector(Options);