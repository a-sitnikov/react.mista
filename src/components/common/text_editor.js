//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, ButtonGroup, Form } from 'react-bootstrap'

import type { DefaultProps } from 'src/index'

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

        var textArea = this.textArea.current;

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
            text: newText
        })

    }

    onVotingChange = (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'SHOW_VOTING',
            data: e.target.checked
        })
    }

    onChange = (e) => {
        const { dispatch, formName } = this.props;
        dispatch({
            type: formName + '_TEXT',
            text: e.target.value
        })
    }

    onKeyPress = (e) => {

        if (e.key === 'Enter' && e.ctrlKey) {
            let parent =  this.textArea.current.parentNode;
            while (parent.tagName.toUpperCase() !== "FORM") {
                parent = parent.parentNode;
            }
            parent.dispatchEvent(new Event("submit"));
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
                    className="text-editor"
                />
                <div className="flex-row">
                    <ButtonGroup>
                        <Button 
                            size="sm"
                            variant="light" 
                            onClick={this.onButtonCode1c} 
                            style={{marginRight: "5px"}}
                            >Код 1С</Button>
                        <Button
                            size="sm"
                            variant="light"
                            disabled={isFetching}
                            type="submit"
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
                            style={{margin: "auto 0px auto auto"}} />
                    }
                </div>
            </div>
        )

    }
}

export default connect()(TextEditor);