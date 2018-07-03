//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextEditor from 'src/components/common/text_editor'
import { postNewMessageIfNeeded } from 'src/actions/new_message'

import type { State } from 'src/reducers'
import type { LoginState } from 'src/reducers/login'
import type { NewMessageState } from 'src/reducers/new_message'

import type { ResponseInfo } from 'src/api'
import type { DefaultProps } from 'src/index'

type NewMessageProps = {
    onPostSuccess?: () => void
}

type StateProps = {
    login: LoginState,
    info: ResponseInfo,
    newMessage: NewMessageState
}

type Props = NewMessageProps & StateProps & DefaultProps;

class NewMessage extends Component<Props> {

    onSend;
    onChange;
    clearVoting;
    setVotingOption;
    onPostSuccess;
    state: any;

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

        let params = {
            text,
            userid: this.props.login.userid,
            userName: this.props.login.username || '',
            topicId: this.props.info.id,
            onSuccess: this.onPostSuccess,
            voting_select: undefined
        };

        if (this.state.voting) {
            params.voting_select = this.state.voting;
        }

        dispatch(postNewMessageIfNeeded(params));

    }

    onPostSuccess() {

        const { dispatch } = this.props;

        dispatch({
            type: 'NEW_MESSAGE_TEXT',
            text: ''
        });
        
        this.setState({
            ...this.state,
            voting: undefined
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
        if (info.is_voting && info.voting) {

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
            <form style={{marginTop: "5px"}}> 
                <p className="bold">Добавить сообщение в тему:</p>
                <div className="new-message-container">
                    <div className="new-message-text">
                        <TextEditor 
                            onSend={this.onSend} 
                            isFetching={newMessage.isFetching} 
                            onChange={this.onChange} 
                            text={newMessage.text} 
                            placeholder="Сообщение"
                            editorType="NEW_MESSAGE"
                        />
                    </div>
                    <div className="new-message-voting">
                        {votingElem}
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    return {
        login: state.login,
        info: state.topic.info,
        newMessage: state.newMessage
    };

}

export default connect(mapStateToProps)(NewMessage);