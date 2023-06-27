import { FC, ReactElement, useState, useCallback } from 'react'
import { FormGroup, Form } from 'react-bootstrap'

import TextEditor from 'src/components/common/text_editor'
import { newMessageText, postNewMessage } from 'src/data/newmessage/actions'
import { useAppDispatch, useAppSelector } from 'src/store'

import { PostNewmessageParams } from 'src/data/newmessage/actions'

type IProps = {
  onSubmitSuccess?: () => void
}

const NewMessage: FC<IProps> = ({ onSubmitSuccess }): ReactElement => {

  const [voting, setVoting] = useState<number | undefined>();
  const dispatch = useAppDispatch();

  const info = useAppSelector(state => state.topic.info);
  const newMessage = useAppSelector(state => state.newMessage);

  const onSubmit = (e: any) => {

    e.preventDefault();
    e.stopPropagation();

    let params: PostNewmessageParams = {
      text: newMessage.text,
      topicId: String(info?.id),
      onSuccess: afterSubmit,
      voting_select: undefined
    };

    if (voting) {
      params.voting_select = voting;
    }

    dispatch(postNewMessage(params));
  }

  const afterSubmit = () => {

    dispatch(newMessageText(''));

    setVoting(undefined);

    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  }

  const clearVoting = (e: React.MouseEvent<HTMLElement>) => {

    e.preventDefault();
    setVoting(undefined);

  }

  const setVotingOption = (i: number) => {
    setVoting(i);
  }

  const onTextChange = useCallback((text: string) => {
    //dispatch(newTopicActions.changeText(text));
  }, []);

  let votingElem: ReactElement;
  if (info?.isVoting && info?.voting) {

    let votingOptions = [];
    for (let i = 1; i <= info.voting.length; i++) {

      const item = info.voting[i - 1];
      if (!item.text)
        continue;

      votingOptions.push(
        <Form.Check
          type="radio"
          key={i}
          name="voting"
          checked={voting === i}
          onChange={() => setVotingOption(i)}
          label={`${i}. ${item.text}`}
        />
      );
    }


    votingElem = (
      <FormGroup>
        <legend>
          <small>Ваш выбор:
            <span id="voting_clear" style={{ marginLeft: "5px", cursor: "pointer" }} onClick={clearVoting}>очистить</span>
          </small>
        </legend>
        {votingOptions}
        Обоснуйте свой выбор!
      </FormGroup>
    );

  }

  return (
    <form style={{ marginTop: "5px" }} onSubmit={onSubmit}>
      <div className="bold">Добавить сообщение в тему:</div>
      <div className="new-message-container">
        <div className="new-message-text">
          <TextEditor
            isFetching={newMessage.isFetching}
            text={newMessage.text}
            placeholder="Сообщение"
            onChange={onTextChange}
          />
        </div>
        <div className="new-message-voting">
          {votingElem}
        </div>
      </div>
    </form>
  )

}

export default NewMessage;