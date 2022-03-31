//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, ButtonGroup, Form } from 'react-bootstrap'

import type { DefaultProps } from 'src/components'

import './text_editor.css'

type TextEditorProps = {
  placeholder: string,
  showVoting: boolean,
  isVoting: boolean,
  text: string,
  isFetching: boolean,
  formName: string,
  onChange?: (e: any, text: string) => void,
}

type Props = TextEditorProps & DefaultProps;

class TextEditor extends Component<Props> {

  textArea;

  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

  onButtonCode1c = (e) => {

    e.preventDefault();

    var openTag = '[1C]\n';
    var closeTag = '\n[/1C]';

    var textArea: any = this.textArea.current;

    var start = textArea.selectionStart;
    var end = textArea.selectionEnd;

    var oldText = textArea.value;
    var len = oldText.length;
    var selectedText = oldText.substring(start, end);
    var replacement = openTag + selectedText + closeTag;
    var newText = oldText.substring(0, start) + replacement + oldText.substring(end, len);

    const { dispatch, formName } = this.props;
    dispatch({
      type: formName + '_TEXT',
      payload: {
        text: newText
      }
    })

  }

  onVotingChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'SHOW_VOTING',
      payload: {
        show: e.currentTarget.checked
      }
    })
  }

  onChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const { dispatch, formName } = this.props;
    dispatch({
      type: formName + '_TEXT',
      payload: {
        text: e.currentTarget.value
      }  
    })
  }

  onKeyPress = (e: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {

    if (e.key === 'Enter' && e.ctrlKey) {
      let parent = e.currentTarget.parentElement;
      while (parent && parent.tagName.toUpperCase() !== "FORM") {
        parent = parent.parentElement;
      }
      if (parent)
        parent.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }

  }

  render() {

    const { placeholder, showVoting, isVoting, isFetching, text } = this.props;

    return (
      <div>
        <FormControl
          as="textarea"
          placeholder={placeholder}
          cols="70" rows="3"
          value={text}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          ref={this.textArea}
          className="text-editor input"
        />
        <div className="flex-row">
          <ButtonGroup>
            <Button
              size="sm"
              variant="light"
              onClick={this.onButtonCode1c}
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
              type="checkbox"
              checked={isVoting}
              onChange={this.onVotingChange}
              label="Голосование"
              style={{ margin: "auto 0px auto auto" }} />
          }
        </div>
      </div>
    )

  }
}

export default (connect()(TextEditor): any );