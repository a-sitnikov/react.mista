//@flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, FormControl, Button } from 'react-bootstrap'

import RadioOption from './radio_option'
import StringOption from './string_option'

import { saveOptions } from 'src/actions/options'

import type { State } from 'src/reducers'
import type { OptionsState } from 'src/reducers/options'
import { defaultOptionsState } from 'src/reducers/options'
import type { DefaultProps } from 'src/components'

import './options.css'

type Props = OptionsState & DefaultProps;

class Options extends Component<Props> {

  optionsParams: any;
  state: any;
  form: any;

  constructor(props) {
    super(props);

    this.state = {
      items: props.options.items
    };

    this.optionsParams = {
      'theme': {
        type: 'radio',
        label: 'Цветовая палитра:',
        oneLine: true,
        values: [
          { name: 'yellow', descr: 'Золотая' },
          { name: 'lightgray', descr: 'Серая' },
          { name: 'dark', descr: 'Темная' }
        ]
      },
      'topicsPerPage': {
        type: 'number',
        label: 'Тем на странице (max 99):',
        min: 1,
        max: 99
      },
      'autoRefreshTopicsList': {
        type: 'checkbox',
        label: 'Автообновление списка тем'
      },
      'autoRefreshTopicsListInterval': {
        type: 'number',
        label: '',
        min: 60,
        max: 1000000,
        postfix: 'сек'
      },
      'autoRefreshTopic': {
        type: 'checkbox',
        label: 'Автообновление темы'
      },
      'autoRefreshTopicInterval': {
        type: 'number',
        label: '',
        min: 60,
        max: 1000000,
        postfix: 'сек'
      },
      //Tooltips   
      'showTooltips': {
        type: 'checkbox',
        label: 'Показывать тултипы, задержка'
      },
      'tooltipDelay': {
        type: 'number',
        max: 1000000,
        label: '',
        postfix: 'мс'
      },
      'showTooltipOnTopicsList': {
        type: 'checkbox',
        label: 'Показывать тултипы на главной странице, при наведении на кол-во ответов'
      },
      'showTooltipOnPostLink': {
        type: 'checkbox',
        label: 'Показывать тултип ссыки на другую ветку'
      },
      //links   
      'showYoutubeVideoTitle': {
        type: 'checkbox',
        label: 'Показывать наименования роликов youtube'
      },
      'replaceCatalogMista': {
        type: 'checkbox',
        label: 'Обратно заменять catalog.mista.ru на infostart.ru'
      },
      'fixBrokenLinks': {
        type: 'checkbox',
        label: 'Чинить поломанные ссылки (с русскими символами)'
      },
    }

    this.form = [
      {
        tabName: 'Общие',
        rows: [
          ['theme'],
          ['topicsPerPage'],
          ['autoRefreshTopicsList', 'autoRefreshTopicsListInterval'],
          ['autoRefreshTopic', 'autoRefreshTopicInterval'],
        ]
      },
      {
        tabName: 'Тултипы',
        rows: [
          ['showTooltips', 'tooltipDelay'],
          ['showTooltipOnTopicsList'],
          ['showTooltipOnPostLink']
        ]
      },
      {
        tabName: 'Ссылки',
        rows: [
          ['showYoutubeVideoTitle'],
          ['replaceCatalogMista'],
          ['fixBrokenLinks'],
        ]
      }
    ]

  }

  closeForm = () => {
    const { history } = this.props;
    history.push('/' + window.hash);
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
    for (let tab of this.form) {

      let rows = [];
      for (let i in tab.rows) {

        const row = tab.rows[i];
        let rowElem = [];
        for (let name of row) {

          const item = this.optionsParams[name];
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
        <div key={tab.tabName}>
          <div className="tab-header">
            {tab.tabName}
          </div>
          <div className="tab-content">
            {rows}
          </div>
        </div>
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

const mapStateToProps = (state: State) => {

  return {
    options: state.options
  };

}

export default (connect(mapStateToProps)(withRouter(Options)): any );