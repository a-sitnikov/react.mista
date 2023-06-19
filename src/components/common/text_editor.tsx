import React, { FC, ReactElement, useRef } from 'react'
import { FormControl, Button, ButtonGroup, Form } from 'react-bootstrap'

import './text_editor.css'
import { useAppDispatch } from 'src/store/store'
import { newTopicActions } from 'src/store/new_topic'

type IProps = {
  placeholder: string,
  showVoting?: boolean,
  isVoting?: boolean,
  text: string,
  isFetching: boolean,
  formName: string,
}

const TextEditor: FC<IProps> = ({ formName, placeholder, showVoting, isVoting, isFetching, text }): ReactElement => {

  const dispatch = useAppDispatch();
  const textAreaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const onButtonCode1c = (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const openTag = '[1C]\n';
    const closeTag = '\n[/1C]';

    const textAreaNode = textAreaRef.current;

    const start = textAreaNode.selectionStart;
    const end = textAreaNode.selectionEnd;

    const oldText = textAreaNode.value;
    const len = oldText.length;
    const selectedText = oldText.substring(start, end);
    const replacement = openTag + selectedText + closeTag;
    let newText = oldText.substring(0, start) + replacement + oldText.substring(end, len);

    dispatch({
      type: formName + '_TEXT',
      payload: {
        text: newText
      }
    })

  }

  const onVotingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(newTopicActions.showVoting(e.currentTarget.checked))
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: formName + '_TEXT',
      payload: {
        text: e.currentTarget.value
      }
    })
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

    if (e.key === 'Enter' && e.ctrlKey) {
      let parent = e.currentTarget.parentElement;
      while (parent && parent.tagName.toUpperCase() !== "FORM") {
        parent = parent.parentElement;
      }
      if (parent)
        parent.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  }

  return (
    <div>
      <FormControl
        as="textarea"
        placeholder={placeholder}
        cols={70} rows={3}
        value={text}
        onChange={onChange}
        onKeyPress={onKeyPress}
        ref={textAreaRef}
        className="text-editor input"
      />
      <div className="flex-row">
        <ButtonGroup>
          <Button
            size="sm"
            variant="light"
            onClick={onButtonCode1c}
            style={{ marginRight: "5px" }}
            className='button'
          >Код 1С</Button>
          <Button
            size="sm"
            variant="light"
            disabled={isFetching}
            type="submit"
            className='button'
          >
            {isFetching ? 'Отправляется' : 'Отправить'}
          </Button>
        </ButtonGroup>
        {showVoting &&
          <Form.Check
            id="show_voting"
            type="checkbox"
            checked={isVoting}
            onChange={onVotingChange}
            label="Голосование"
            style={{ margin: "auto 0px auto auto" }} />
        }
      </div>
    </div>
  )

}

export default TextEditor;