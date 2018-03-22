import React, { Component } from 'react'
import { doLogout } from '../../actions/login'

class LoggedUser extends Component {

    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }
    
    onLogout(event) {

        event.preventDefault();

        const { dispatch } = this.props;
        dispatch(doLogout());  
    }
    
    render() {

        const { userId, userName } = this.props;
        return (
            <td id="user-td">
                Привет, <a id="me" rel="nofollow" href={`users.php?id=${userId}`}>{userName}</a>
                <span style={{margin: "5px"}}>|</span>
                <a href="users.php?action=edit">Личные настройки</a>
                <span style={{margin: "5px"}}>|</span>
                <a href="users.php?&amp;action=exit" onClick={this.onLogout}>Выход</a>
                <br />
                <span className="find-my-topics-messages">
                    <noindex>
                        <a rel="nofollow" href={`index.php?user_id=${userId}`}>Мои темы</a>
                    </noindex>
                </span>
                <span style={{margin: "5px"}}>|</span>
                <span className="find-my-topics-messages">
                    <noindex>
                        <a rel="nofollow" href={`mytopics.php?user_id=${userId}`}>Темы с моим участием</a>
                    </noindex>
                </span>
            </td>
        )
    }
}

export default LoggedUser;