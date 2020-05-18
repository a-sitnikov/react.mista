//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, ButtonGroup, Checkbox } from 'react-bootstrap'

import type { DefaultProps } from 'src/index'

import './text_editor.css'

type TextEditorProps = {
    placeholder: string,
    showVoting: boolean,
    isVoting: boolean,
    text: string,
    isFetching: boolean,
    formRef: any,
    formName: string,
    onChange?: (e: any, text: string) => void,   
}

type Props = TextEditorProps & DefaultProps;

class TextEditor extends Component<Props> {

    onButtonCode1c;
    onVotingChange;
    onChange;
    onKeyPress;
    textArea;

    constructor(props) {
        super(props);
        this.onButtonCode1c = this.onButtonCode1c.bind(this);
        this.onVotingChange = this.onVotingChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onButtonCode1c(e) {

        e.preventDefault();

        var openTag = '[1C]\n';
        var closeTag = '\n[/1C]';

        var textArea = this.textArea;

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

    onVotingChange(e) {
        const { dispatch } = this.props;
        dispatch({
            type: 'SHOW_VOTING',
            data: e.target.checked
        })
    }

    onChange(e) {
        const { dispatch, formName } = this.props;
        dispatch({
            type: formName + '_TEXT',
            text: e.target.value
        })
    }

    onKeyPress(e) {
        const { formRef } = this.props;

        if (e.key === 'Enter' && e.ctrlKey) {
            if (formRef) {
                formRef.current.dispatchEvent(new Event("submit"));
            }
        }
    }

    render() {

        const { placeholder, showVoting, isVoting, isFetching, text } = this.props;

        return (
            <div>
                <FormControl 
                    componentClass="textarea" 
                    placeholder={placeholder} 
                    cols="70" rows="3"
                    value={text}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                    inputRef={ref => { this.textArea = ref; }}
                    className="text-editor"
                />
                <div className="flex-row">
                    <ButtonGroup>
                        <Button onClick={this.onButtonCode1c} style={{marginRight: "5px"}} bsSize="sm">Код 1С</Button>
                        <Button
                            bsSize="sm"
                            disabled={isFetching}
                            type="submit"
                            >
                            {isFetching ? 'Отправляется' : 'Отправить'}
                        </Button>
                    </ButtonGroup>
                    {showVoting &&
                        <Checkbox 
                            checked={isVoting} 
                            onChange={this.onVotingChange} 
                            style={{margin: "auto 0px auto auto"}} >
                            Голосование
                        </Checkbox>
                    }
                </div>
            </div>
        )

    }
}

export default connect()(TextEditor);