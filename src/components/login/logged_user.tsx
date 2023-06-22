import React, { FC, ReactElement } from 'react'
import { Dropdown } from 'react-bootstrap'

import { doLogout } from 'src/store'
import { domain } from 'src/api'

import { useAppDispatch } from 'src/store'

type IProps = {
  userId: number,
  userName: string
}

type HTMLProps = React.HTMLProps<HTMLSpanElement>
const CustomToggle = React.forwardRef<HTMLSpanElement, HTMLProps>(({ children, onClick }, ref) => (
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

const LoggedUser: FC<IProps> = ({ userId, userName }): ReactElement => {

  const dispatch = useAppDispatch();

  const onLogout = (event: any) => {
    event.preventDefault();
    dispatch(doLogout());
  }

  const onMenuSelect = (eventKey: any, event: any): any => {
    if (eventKey === 'exit') {
      onLogout(event);
    }
  }

  return (
    <div style={{ float: "left" }}>
      <Dropdown id="dropdown-custom-menu" onSelect={onMenuSelect}>
        <span>Привет, </span>
        <Dropdown.Toggle as={CustomToggle}>{userName} ▼</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="profile" href={`${domain}/users.php?id=${userId}`}>Профиль</Dropdown.Item>
          <Dropdown.Item eventKey="myTopics" href={`#/index.php?user_id=${userId}`}>Мои темы</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="options" href={`#/options.php`}>Настройки</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="exit">Выход</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default LoggedUser;