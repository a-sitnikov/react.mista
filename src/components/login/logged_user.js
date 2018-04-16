//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doLogout } from 'src/actions/login'

import type { DefaultProps } from 'src/components'

type LoggedUserProps = {
    userId: string,
    userName: string    
}

type Props = LoggedUserProps & DefaultProps;

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
    
    render() {

        const { userId, userName } = this.props;
        return (
            <div style={{float: "left"}}>
                Привет, <a id="me" rel="nofollow" href={`${window.hash}/users.php?id=${userId}`}>{userName}</a>
                <span style={{margin: "5px"}}>|</span>
                <a href="users.php?action=edit">Личные настройки</a>
                <span style={{margin: "5px"}}>|</span>
                <a href="users.php?&amp;action=exit" onClick={this.onLogout}>Выход</a>
                <br />
                <span className="find-my-topics-messages">
                    <noindex>
                        <a rel="nofollow" href={`${window.hash}/index.php?user_id=${userId}`}>Мои темы</a>
                    </noindex>
                </span>
                <span style={{margin: "5px"}}>|</span>
                <span className="find-my-topics-messages">
                    <noindex>
                        <a rel="nofollow" href={`${window.hash}/index.php?mytopics=1`}>Темы с моим участием</a>
                    </noindex>
                </span>
            </div>
        )
    }
}

export default connect()(LoggedUser);