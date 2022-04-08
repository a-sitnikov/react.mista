import React, { FC, ReactElement, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl, FormGroup } from 'react-bootstrap'

import { RootState, useAppDispatch } from 'src/data/store'
import { newTopicClear, newTopicSection, newTopicSubject, postNewTopicError, postNewTopicIfNeeded } from 'src/data/newtopic/actions'

import Sections from './sections'
import TextEditor from '../common/text_editor'
import ErrorElem from '../common/error'

import './new_topic.css'
import { ISectionItem } from 'src/data/sections'

type IProps = {
  onSubmitSuccess?: any
};

const mapState = (state: RootState) => {

  return {
    sections: state.sections,
    newTopic: state.newTopic
  }
}

const connector = connect(mapState);
const NewTopic: FC<ConnectedProps<typeof connector> & IProps> = ({ sections, newTopic, onSubmitSuccess }): ReactElement => {

  const dispatch = useAppDispatch();
  const [currentSection, setSection] = useState(null);

  const [votes, setVotes] = useState(Array(10).fill(""));

  const onSectionChange = (e: any, section: ISectionItem) => {
    setSection(section);
    dispatch(newTopicSection(section));
  }

  const onVoteTextChange = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let votesCopy = votes.slice();
    votesCopy[i] = e.target.value;
    setVotes(votesCopy);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!currentSection) {
      dispatch(postNewTopicError('Не выбрана секция'));
      return;
    }

    let subject = newTopic.subject;
    if (!subject) {
      dispatch(postNewTopicError('Не указана тема'));
      return;
    }

    if (!newTopic.text) {
      dispatch(postNewTopicError('Не указано сообщение'));
      return;

    }

    let params = {
      subject,
      text: newTopic.text,
      section: currentSection.id,
      forum: currentSection.forum,
      isVoting: newTopic.isVoting,
      votingItems: [],
      onSuccess: this_onSubmitSuccess
    };

    if (newTopic.isVoting) {
      params.votingItems = [];
      for (let i = 1; i <= 10; i++) {
        let val = votes[i - 1];
        if (val) {
          params.votingItems.push(val);
        }
      }
    }

    dispatch(postNewTopicIfNeeded(params));
  }

  const onSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(newTopicSubject(e.target.value));
  }

  const this_onSubmitSuccess = () => {

    dispatch(newTopicClear());

    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  }
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
          <InputGroup.Text
            style={{ width: "40px" }}
            className='input'
          >
            {`${i}.`}
          </InputGroup.Text>
          <Form.Control
            type="text"
            maxLength={50}
            className='input'
            value={votes[i - 1]}
            onChange={onVoteTextChange(i - 1)}
          />
        </InputGroup>
      );
    }
  }

  return (
    <form className="new-topic-container" onSubmit={onSubmit}>
      <div id="newtopic_form" className="new-topic-text">
        <div><b>Новая тема:</b></div>
        {newTopic.error && <ErrorElem text={newTopic.error} />}
        <div className="flex-row" style={{ marginBottom: "3px" }}>
          <Form.Select
            disabled
            size="sm"
            value={newTopic.forum}
            style={{ flex: "0 1 90px" }}
            className='input'
          >
            {groupsElem}
          </Form.Select>
          <Sections
            id="target_section"
            defaultValue="Секция"
            selected={newTopic.section?.code}
            size="sm"
            style={{ flex: "1 1 auto" }}
            onChange={onSectionChange}
          />
        </div>
        <Form.Control
          type="text"
          size="sm"
          value={newTopic.subject}
          onChange={onSubjectChange}
          style={{ marginBottom: "3px" }}
          className='input'
          placeholder="Тема"
          maxLength={90}
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

export default connector(NewTopic);