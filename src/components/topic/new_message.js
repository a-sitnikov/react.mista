import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextEditor from '../core/text_editor'
import { postNewMessageIfNeeded } from '../../actions/new_message'

class NewMessage extends Component {

    constructor(props) {
        super(props);
        this.onSend = this.onSend.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearVoting = this.clearVoting.bind(this);
        this.setVotingOption = this.setVotingOption.bind(this);
        this.onPostSuccess = this.onPostSuccess.bind(this);

        this.state = { voting: undefined };
    }

    onSend(e, text) {

        const { dispatch } = this.props;

        const params = {
            text,
            userid: this.props.login.userid,
            userName: this.props.login.username,
            topicId: this.props.info.id,
            onSuccess: this.onPostSuccess
        };

        dispatch(postNewMessageIfNeeded(params));

    }

    onPostSuccess() {

        const { dispatch } = this.props;

        dispatch({
            type: 'NEW_MESSAGE_TEXT',
            text: ''
        });

        if (this.props.onPostSuccess) {
            this.props.onPostSuccess();
        }
    }

    onChange(e, text) {

        const { dispatch } = this.props;
        dispatch({
            type: 'NEW_MESSAGE_TEXT',
            text
        });

    }

    clearVoting(e) {

        e.preventDefault();

        this.setState({
            ...this.state,
            voting: undefined
        })

    }

    setVotingOption(e) {
        this.setState({
            ...this.state,
            voting: e.target.value
        })
    }

    render() {

        const { info, login, newMessage } = this.props;

        if (!login.userid)
            return null;

        let votingElem;
        if (info.is_voting) {

            let votingOptions = [];
            for (let i = 1; i <= info.voting.length; i++) {

                const item = info.voting[i - 1];
                if (!item.select)
                    continue;

                votingOptions.push(
                    <div key={i}>
                        <input id={`voting_select${i}`} name="voting_select" value={i} type="radio" onChange={this.setVotingOption} checked={this.state.voting === String(i) ? true : false} />
                        <label htmlFor={`voting_select${i}`}>{`${i}. ${item.select}`}</label>
                    </div>
                );
            }


            votingElem = (
                <fieldset id="voting" value="1">
                    <legend>Ваш выбор:
                    <small><a href="" id="voting_clear" style={{ marginLeft: "5px" }} onClick={this.clearVoting}>очистить</a></small>
                    </legend>
                    {votingOptions}
                    <br />
                    Обоснуйте свой выбор!
                </fieldset>
            );

        }

        return (
            <form>
                <p className="newmessage">Добавить сообщение в тему:</p>
                <div className="flex-row">
                    <div style={{ flex: 0, marginRight: "20px" }}>
                        <label htmlFor="user_name" style={{ display: "block", marginBottom: "10px" }}>Имя*:</label>
                        <label htmlFor="message_text">Сообщение*:</label>
                    </div>
                    <div style={{ flex: 0, marginRight: "15px" }}>
                        <input
                            name="user_name"
                            component="input"
                            value={login.username}
                            id="user_name"
                            size="30" maxLength="20"
                            readOnly={true}
                            type="text"
                            className="fieldbasic"
                            style={{ marginBottom: "10px" }}
                        />
                        <TextEditor onSend={this.onSend} isFetching={newMessage.isFetching} onChange={this.onChange} text={newMessage.text} />
                    </div>
                    <div style={{ flex: "0 0 30%" }}>
                        {votingElem}
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => {

    return {
        login: state.login,
        info: state.topic.info,
        newMessage: state.newMessage
    };

}

export default connect(mapStateToProps)(NewMessage);