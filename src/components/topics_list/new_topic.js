//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormGroup } from 'react-bootstrap'

import type { ResponseSection } from 'src/api'

import type { DefaultProps } from 'src/components'
import type { State } from 'src/reducers'
import type { SectionsState } from 'src/reducers/sections'
import type { NewTopicState } from 'src/reducers/new_topic'

import { postNewTopicIfNeeded } from 'src/actions/new_topic'
import type { NewTopicAction, postNewTopicParams } from 'src/actions/new_topic'

import SectionSelect from './section_select'
import TextEditor from '../common/text_editor'
import ErrorElem from '../common/error'

import './new_topic.css'

type StateProps = {
  sections: SectionsState,
  newTopic: NewTopicState,
}

type NewTopicProps = {
  onSubmitSuccess?: () => void
};

type Props = NewTopicProps & StateProps & DefaultProps;

class NewTopic extends Component<Props> {

  currentSection: ?ResponseSection;

  onSectionChange = (e: any, section: ResponseSection) => {
    const { dispatch } = this.props;
    this.currentSection = section;

    const action: NewTopicAction = {
      type: 'NEW_TOPIC_SECTION',
      section
    };

    dispatch(action);
  }

  onSubmit = (e) => {

    e.preventDefault();
    const { dispatch, newTopic } = this.props;

    let action: NewTopicAction;
    if (!this.currentSection) {
      action = {
        type: 'POST_NEW_TOPIC_ERROR',
        error: 'Не выбрана секция'
      };
      dispatch(action);
      return;
    }

    let subject = newTopic.subject;
    if (!subject) {
      action = {
        type: 'POST_NEW_TOPIC_ERROR',
        error: 'Не указана тема'
      };
      dispatch(action);
      return;
    }

    if (!newTopic.text) {
      action = {
        type: 'POST_NEW_TOPIC_ERROR',
        error: 'Не указано сообщение'
      };
      dispatch(action);
      return;

    }

    let params: postNewTopicParams = {
      subject,
      text: newTopic.text,
      section: this.currentSection.id,
      forum: this.currentSection.forum,
      isVoting: newTopic.isVoting,
      votingItems: [],
      onSuccess: this.onSubmitSuccess
    };

    if (newTopic.isVoting) {
      params.votingItems = [];
      for (let i = 1; i <= 10; i++) {
        let val = this.refs[`vote${i}`].value;
        if (val) {
          params.votingItems.push(val);
        }
      }
    }

    dispatch(postNewTopicIfNeeded(params));
  }

  onSubjectChange = (e) => {

    const { dispatch } = this.props;
    dispatch({
      type: 'NEW_TOPIC_SUBJECT',
      text: e.target.value
    });

  }


  onSubmitSuccess = () => {

    const { dispatch } = this.props;
    dispatch({
      type: 'NEW_TOPIC_CLEAR',
      text: ''
    });

    if (this.props.onSubmitSuccess) {
      this.props.onSubmitSuccess();
    }
  }

  render() {

    const { sections, newTopic } = this.props;

    let groupsElem = [];
    for (let forum in sections.tree) {
      groupsElem.push(<option key={forum} value={forum.toLowerCase()}>{forum}</option>);
    }

    let votingOptions = [];

    if (newTopic.isVoting) {
      votingOptions.push(<div key="p">Варианты:</div>);
      for (let i = 1; i <= 10; i++) {
        votingOptions.push(
          <InputGroup key={i} size="sm" style={{ marginBottom: "3px", width: "100%" }}>
            <InputGroup.Prepend>
              <InputGroup.Text
                style={{ width: "40px" }} className='input'>
                {`${i}.`}
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              maxLength="50"
              ref={`vote${i}`}
              className='input'
            />
          </InputGroup>
        );
      }
    }

    return (
      <form className="new-topic-container" onSubmit={this.onSubmit}>
        <div id="newtopic_form" className="new-topic-text">
          <div><b>Новая тема:</b></div>
          {newTopic.error && <ErrorElem text={newTopic.error} />}
          <div className="flex-row" style={{ marginBottom: "3px" }}>
            <Form.Control as="select"
              size="sm"
              readOnly={true}
              value={newTopic.forum}
              style={{ flex: "0 1 90px" }}
              className='input'
            >
              {groupsElem}
            </Form.Control>
            <SectionSelect
              defaultValue="Секция"
              id="target_section"
              size="sm"
              style={{ flex: "1 1 auto" }}
              onChange={this.onSectionChange}
            />
          </div>
          <Form.Control
            type="text"
            size="sm"
            value={newTopic.subject}
            onChange={this.onSubjectChange}
            style={{ marginBottom: "3px" }}
            className='input'
            placeholder="Тема"
            maxLength="90"
          />
          <TextEditor
            placeholder="Сообщение"
            showVoting={true}
            isVoting={newTopic.isVoting}
            text={newTopic.text}
            isFetching={newTopic.isFetching}
            formName="NEW_TOPIC"
          />
        </div>
        <FormGroup className="new-topic-voting">
          {votingOptions}
        </FormGroup>
      </form>
    )
  }
}

const mapStateToProps = (state: State): StateProps => {

  return {
    sections: state.sections,
    newTopic: state.newTopic
  }
}

export default (connect(mapStateToProps)(NewTopic): any );