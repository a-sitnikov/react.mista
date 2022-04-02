//@flow
import React, { Component, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, FormControl, Button } from 'react-bootstrap'

import RadioOption from './radio_option'
import StringOption from './string_option'

import { saveOptions } from 'src/data/options/actions'

import { IOptionsState, defaultOptionsState } from 'src/data/options'
import { form, optionsParams } from './formscheme'
import Tab from './tab'

import './options.css'
import { RootState } from 'src/data/store'

export const withNavigate = (Component: any): any => {
  return (props: any) => {
    const navigate = useNavigate();
    return <Component navigate={navigate} {...props} />;
  };
};

class Options extends Component {

  optionsParams: any;
  state: any;
  form: any;

  constructor(props) {
    super(props);

    this.state = {
      items: props.options.items
    };
  }  

  closeForm = () => {
    const { navigate } = this.props;
    navigate('/#');
  }

  resetOptions = () => {
    this.setState({
      ...this.state,
      items: Object.assign({}, defaultOptionsState.items)
    })
  }

  applyOptions = () => {

    const { dispatch } = this.props;
    dispatch(saveOptions(this.state.items));
    this.closeForm();
  }

  onTabClick = (e) => {
    this.setState({
      ...this.state,
      activeTab: e.target.textContent
    });
  }

  onChange = (e, name, value) => {

    let items = Object.assign({}, this.state.items);
    items[name] = value;
    this.setState({
      ...this.state,
      items
    })
  }

  render() {

    let tabs = [];
    for (let tab of form) {

      let rows = [];
      for (let i in tab.rows) {

        const row = tab.rows[i];
        let rowElem = [];
        for (let name of row) {

          const item = optionsParams[name];
          if (!item) continue;

          const value = this.state.items[name];

          if (item.type === 'radio') {
            rowElem.push(
              <RadioOption
                key={name}
                name={name}
                label={item.label}
                values={item.values}
                value={value}
                oneLine={item.oneLine}
                onChange={this.onChange}
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
              <FormControl
                key={name}
                type="number"
                min={item.min}
                max={item.max}
                value={value}
                onChange={(e) => this.onChange(e, name, e.target.value)}
                style={{ flex: "0 0 100px", marginLeft: "5px" }}
                className='input'
                size="sm"
              >
              </FormControl>
            );

            if (item.postfix) {
              rowElem.push(
                <span key={name + '_postfix'} style={{ marginLeft: "5px", flex: "0 0 auto", }}>{item.postfix}</span>
              )
            };

          } else if (item.type === 'string') {
            rowElem.push(
              <StringOption
                key={name}
                name={name}
                label={item.label}
                postfix={item.postfix}
                value={value}
                onChange={this.onChange}
              />
            );
          } else if (item.type === 'checkbox') {
            rowElem.push(
              <Form.Check
                type="checkbox"
                label={item.label}
                key={name}
                name={name}
                checked={String(value) === 'true'}
                onChange={(e) => this.onChange(e, name, e.target.checked)}
                style={{ flex: "0 0 auto", margin: "0px", width: "100%" }}
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
            onClick={this.applyOptions}>
            OK
                        </Button>
          <Button
            id="cancelOptions"
            size="sm"
            variant="light"
            style={{ margin: "5px", float: "left" }}
            className='button'
            onClick={this.closeForm}>
            Отмена
                        </Button>
          <Button
            id="defaultOptions"
            size="sm"
            variant="light"
            style={{ margin: "5px", float: "right" }}
            className='button'
            onClick={this.resetOptions}>
            Сбросить настройки
                        </Button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state: RootState) => {

  return {
    options: state.options
  };

}

export default connect(mapStateToProps)(withNavigate(Options));