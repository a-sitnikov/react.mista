import { FC, ReactElement, useCallback, useState, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormGroup } from 'react-bootstrap'

import { useActionCreators, useAppDispatch, useAppSelector } from 'src/store'

import Sections from './sections'
import TextEditor from 'src/components/common/text_editor'
import ErrorElem from 'src/components/common/error'

import './new_topic.css'
import { ISectionItem, newTopicActions, postNewTopicIfNeeded } from 'src/store'

type IProps = {
  onSubmitSuccess?: any
};

const NewTopic: FC<IProps> = ({ onSubmitSuccess }): ReactElement => {

  const sections = useAppSelector(state => state.sections);
  const newTopic = useAppSelector(state => state.newTopic);

  const [currentSection, setSection] = useState(null);
  const [votes, setVotes] = useState(Array(10).fill(""));

  const formRef = useRef(null);
  const dispatch = useAppDispatch();
  const actions = useActionCreators(newTopicActions);

  const onSectionChange = (e: React.SyntheticEvent, section: ISectionItem) => {
    setSection(section);
    actions.changeSection(section);
  }

  const onVoteTextChange = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let votesCopy = votes.slice();
    votesCopy[i] = e.target.value;
    setVotes(votesCopy);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!currentSection) {
      actions.setError('Не выбрана секция');
      return;
    }

    let subject = newTopic.subject;
    if (!subject) {
      actions.setError('Не указана тема');
      return;
    }

    if (!newTopic.text) {
      actions.setError('Не указано сообщение');
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

  const onSubjectChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    actions.changeSubject(e.target.value);
  }, [actions]);
  
  const onTextChange = useCallback((text: string) => {
    actions.changeText(text);
  }, [actions]);

  const onShowVotingChange = useCallback((show: boolean) => {
    actions.showVoting(show);
  }, [actions]);

  const this_onSubmitSuccess = () => {

    actions.clear();

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
            aria-label={`Вариант ${i}`}
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
    <form className="new-topic-container" onSubmit={onSubmit} ref={formRef}>
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
          aria-label="Тема"
          placeholder="Тема"
          size="sm"
          value={newTopic.subject}
          onChange={onSubjectChange}
          style={{ marginBottom: "3px" }}
          className='input'
          maxLength={90}
        />
        <TextEditor
          placeholder="Сообщение"
          showVoting={true}
          isVoting={newTopic.isVoting}
          text={newTopic.text}
          isFetching={newTopic.status === "loading"}
          onChange={onTextChange}
          onShowVotingChange={onShowVotingChange}
          formRef={formRef}
        />
      </div>
      <FormGroup className="new-topic-voting">
        {votingOptions}
      </FormGroup>
    </form>
  )
}

export default NewTopic;