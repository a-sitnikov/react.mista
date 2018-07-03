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
    editorType: string,
    onChange?: (e: any, text: string) => void,   
    onSend: (e: any, text: string) => void   
}

type Props = TextEditorProps & DefaultProps;

class TextEditor extends Component<Props> {

    onButtonCode1c;
    onSendClick;
    onVotingChange;
    onChange;
    onKeyPress;
    textArea;

    constructor(props) {
        super(props);
        this.onButtonCode1c = this.onButtonCode1c.bind(this);
        this.onSendClick = this.onSendClick.bind(this);
        this.onVotingChange = this.onVotingChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onSendClick(e) {
        if (this.props.onSend) {
            const text = this.props.text;
            this.props.onSend(e, text);
        }
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

        const { dispatch, editorType } = this.props;
        dispatch({
            type: editorType + '_TEXT',
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
        if (this.props.onChange) {
            const text = e.target.value;
            this.props.onChange(e, text);
        }
    }

    onKeyPress(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            if (this.props.onSend) {
                this.props.onSend(e, this.props.text);
            }
        }
    }

    render() {

        const { placeholder, showVoting, isVoting, isFetching, text } = this.props;

        let voting;
        if (showVoting)
            voting = (
                <Checkbox 
                    checked={isVoting} 
                    onChange={this.onVotingChange} 
                    style={{margin: "auto 0px auto auto"}} >
                    Голосование
                </Checkbox>
            )

        return (
            <div>
                <FormControl 
                    componentClass="textarea" 
                    placeholder={placeholder} 
                    cols="70" rows="12"
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
                            onClick={this.onSendClick}>
                            {isFetching ? 'Отправляется' : 'Отправить'}
                        </Button>
                    </ButtonGroup>
                    {voting}
                </div>
            </div>
        )

    }
}

export default connect()(TextEditor);