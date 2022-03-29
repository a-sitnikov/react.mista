//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'react-bootstrap'

import { doLogout } from 'src/data/login/actions'
import { domain } from 'src/api'

import type { DefaultProps } from 'src/components'

type LoggedUserProps = {
    userId: string,
    userName: string    
}

type Props = LoggedUserProps & DefaultProps;

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref} 
    style={{ cursor: "pointer" }} 
    className='link'
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </span>
));

class LoggedUser extends Component<Props> {

    onLogout = (event: any) => {

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
                    <Dropdown.Toggle as={CustomToggle} bsRole="toggle">{userName} ▼</Dropdown.Toggle>
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

export default ( connect()(LoggedUser): any );