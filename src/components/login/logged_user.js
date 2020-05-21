//@flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dropdown } from 'react-bootstrap'

import { doLogout } from 'src/actions/login'
import { domain } from 'src/api'

import type { DefaultProps } from 'src/components'

type LoggedUserProps = {
    userId: string,
    userName: string    
}

type Props = LoggedUserProps & DefaultProps;

class CustomToggle extends React.Component<any> {
    
  handleClick = e => {
    this.props.onClick(e);
  }

  render() {
    return (
      <span style={{ cursor: "pointer", color: "#00C" }} onClick={this.handleClick}>
        {this.props.children}
      </span>
    );
  }
}

class LoggedUser extends Component<Props> {

    onLogout;

    constructor(props: Props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }
    
    onLogout(event: any) {

        event.preventDefault();

        const { dispatch } = this.props;
        dispatch(doLogout());  
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
                        <Dropdown.Item eventKey="profile" href={`${domain}/users.php?id=${userId}`}>Профиль</Dropdown.Item>
                        <Dropdown.Item eventKey="myTopics" href={`${window.hash}/index.php?user_id=${userId}`}>Мои темы</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="options" href={`${window.hash}/options.php`}>Настройки</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="exit">Выход</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default connect()(withRouter(LoggedUser));