//@flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dropdown, MenuItem } from 'react-bootstrap'

import { doLogout } from 'src/actions/login'
import { showOptions } from 'src/actions/options'

import type { DefaultProps } from 'src/components'

type LoggedUserProps = {
    userId: string,
    userName: string    
}

type Props = LoggedUserProps & DefaultProps;

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

class LoggedUser extends Component<Props> {

    onLogout;
    showOptions;

    constructor(props: Props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.showOptions = this.showOptions.bind(this);
    }
    
    onLogout(event: any) {

        event.preventDefault();

        const { dispatch } = this.props;
        dispatch(doLogout());  
    }

    showOptions(event: any) {

        event.preventDefault();

        const { dispatch } = this.props;
        dispatch(showOptions());  
    }

    onMenuSelect = (eventKey: any, event: Object): any => {

        if (eventKey === 'exit') {
           this.onLogout(event);
        }

    }

    render() {

        const { userId, userName } = this.props;
        return (
            <div style={{float: "left"}}>
                <Dropdown id="dropdown-custom-menu" onSelect={this.onMenuSelect}>
                    <span>Привет, </span>
                    <CustomToggle bsRole="toggle">{userName} ▼</CustomToggle>
                    <Dropdown.Menu>
                        <MenuItem eventKey="profile" href={`https://www.forum.mista.ru/users.php?id=${userId}`}>Профиль</MenuItem>
                        <MenuItem eventKey="myTopics" href={`${window.hash}/index.php?user_id=${userId}`}>Мои темы</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="options" href={`${window.hash}/options.php`}>Настройки</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="exit">Выход</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default connect()(withRouter(LoggedUser));