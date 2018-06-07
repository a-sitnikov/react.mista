//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doLogout } from 'src/actions/login'
import { showOptions } from 'src/actions/options'

import type { DefaultProps } from 'src/components'

type LoggedUserProps = {
    userId: string,
    userName: string    
}

type Props = LoggedUserProps & DefaultProps;

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

    render() {

        const { userId, userName } = this.props;
        return (
            <div style={{float: "left"}}>
                Привет, <a className="bold" rel="nofollow" href={`https://www.forum.mista.ru/users.php?id=${userId}`}>{userName}</a>
                <span style={{margin: "5px"}}>|</span>
                <a rel="nofollow" href={`${window.hash}/index.php?user_id=${userId}`}>Мои темы</a>
                <span style={{margin: "5px"}}>|</span>
                <a rel="nofollow" href={`${window.hash}/index.php?mytopics=1`}>Темы с моим участием</a>
            </div>
        )
    }
}

export default connect()(LoggedUser);