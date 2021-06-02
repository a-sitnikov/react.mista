//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, Form } from 'react-bootstrap'

import TextEditor from 'src/components/common/text_editor'
import { postNewMessage } from 'src/actions/new_message'

import type { State } from 'src/reducers'
import type { NewMessageState } from 'src/reducers/new_message'

import type { ResponseInfo } from 'src/api'
import type { DefaultProps } from 'src/components'

type NewMessageProps = {
  onSubmitSuccess?: () => void
}

type StateProps = {
  info: ResponseInfo,
  newMessage: NewMessageState
}

type Props = NewMessageProps & StateProps & DefaultProps;
type ComponentState = {
  voting?: number
}

class NewMessage extends Component<Props, ComponentState> {

  constructor(props) {
    super(props);
    this.state = { voting: undefined };
  }

  onSubmit = (e) => {

    e.preventDefault();
    e.stopPropagation();

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

    dispatch(postNewMessage(params));
  }

  onSubmitSuccess = () => {

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

  clearVoting = (e) => {

    e.preventDefault();

    this.setState({
      ...this.state,
      voting: undefined
    })

  }

  setVotingOption = (i) => {
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
          <Form.Check
            type="radio"
            key={i}
            name="voting"
            checked={this.state.voting === i}
            onChange={() => this.setVotingOption(i)}
            label={`${i}. ${item.select}`}
          />
        );
      }


      votingElem = (
        <FormGroup>
          <legend>
            <small>Ваш выбор:
              <span href="" id="voting_clear" style={{ marginLeft: "5px", cursor: "pointer" }} onClick={this.clearVoting}>очистить</span>
            </small>
          </legend>
          {votingOptions}
          Обоснуйте свой выбор!
        </FormGroup>
      );

    }

    return (
      <form style={{ marginTop: "5px" }} onSubmit={this.onSubmit}>
        <div className="bold">Добавить сообщение в тему:</div>
        <div className="new-message-container">
          <div className="new-message-text">
            <TextEditor
              isFetching={newMessage.isFetching}
              text={newMessage.text}
              placeholder="Сообщение"
              formName="NEW_MESSAGE"
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

export default (connect(mapStateToProps)(NewMessage): any );