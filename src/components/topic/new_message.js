//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Radio } from 'react-bootstrap'

import TextEditor from 'src/components/common/text_editor'
import { postNewMessageIfNeeded } from 'src/actions/new_message'

import type { State } from 'src/reducers'
import type { NewMessageState } from 'src/reducers/new_message'

import type { ResponseInfo } from 'src/api'
import type { DefaultProps } from 'src/index'

type NewMessageProps = {
    onSubmitSuccess?: () => void
}

type StateProps = {
    info: ResponseInfo,
    newMessage: NewMessageState
}

type Props = NewMessageProps & StateProps & DefaultProps;

class NewMessage extends Component<Props> {

    clearVoting;
    setVotingOption;
    onSubmit;
    onSubmitSuccess;
    state: any;
    formRef: any;

    constructor(props) {
        super(props);
        this.clearVoting = this.clearVoting.bind(this);
        this.setVotingOption = this.setVotingOption.bind(this);
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { voting: undefined };

        // $FlowFixMe
        this.formRef = React.createRef();
    }

    onSubmit(e) {
        e.preventDefault();

        const { dispatch, info, newMessage } = this.props;
        
        let params = {
            text: newMessage.text,
            topicId: info.id,
            onSuccess: this.onSubmitSuccess,
            voting_select: undefined
        };

        if (this.state.voting) {
            params.voting_select = this.state.voting;
        }

        dispatch(postNewMessageIfNeeded(params));
    }

    onSubmitSuccess() {

        const { dispatch } = this.props;

        dispatch({
            type: 'NEW_MESSAGE_TEXT',
            text: ''
        });
        
        this.setState({
            ...this.state,
            voting: undefined
        });
        
        if (this.props.onSubmitSuccess) {
            this.props.onSubmitSuccess();
        }
    }

    clearVoting(e) {

        e.preventDefault();

        this.setState({
            ...this.state,
            voting: undefined
        })

    }

    setVotingOption(i) {
        this.setState({
            ...this.state,
            voting: i
        })
    }

    render() {

        const { info, newMessage } = this.props;

        let votingElem;
        if (info.is_voting && info.voting) {

            let votingOptions = [];
            for (let i = 1; i <= info.voting.length; i++) {

                const item = info.voting[i - 1];
                if (!item.select)
                    continue;

                votingOptions.push(
                    <Radio key={i} name="voting" checked={this.state.voting === i} onChange={() => this.setVotingOption(i)}>{`${i}. ${item.select}`}</Radio>
                );
            }


            votingElem = (
                <FormGroup>
                    <legend>
                        <small>Ваш выбор:
                        <a href="" id="voting_clear" style={{ marginLeft: "5px" }} onClick={this.clearVoting}>очистить</a>
                        </small>
                    </legend>                
                    {votingOptions}
                    Обоснуйте свой выбор!
                </FormGroup>
            );

        }

        return (
            <form style={{marginTop: "5px"}} onSubmit={this.onSubmit} ref={this.formRef}> 
                <p className="bold">Добавить сообщение в тему:</p>
                <div className="new-message-container">
                    <div className="new-message-text">
                        <TextEditor 
                            onSend={this.onSend} 
                            isFetching={newMessage.isFetching} 
                            text={newMessage.text} 
                            placeholder="Сообщение"
                            formName="NEW_MESSAGE"
                            formRef={this.formRef}
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
        info: state.topic.info,
        newMessage: state.newMessage
    };

}

export default connect(mapStateToProps)(NewMessage);