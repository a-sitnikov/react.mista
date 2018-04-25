//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { DefaultProps } from 'src/index'

type TextEditorProps = {
    placeholder: string,
    showVoting: boolean,
    isVoting: boolean,
    text: string,
    isFetching: boolean,
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
    refs: {text: any, voting: any};

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
            const text = this.refs.text.value;
            this.props.onSend(e, text);
        }
    }

    onButtonCode1c(e) {

        e.preventDefault();

        var openTag = '[1C]\n';
        var closeTag = '\n[/1C]';

        var textArea = this.refs.text;

        var start = textArea.selectionStart;
        var end = textArea.selectionEnd;

        var oldText = textArea.value;
        var len = oldText.length;
        var selectedText = oldText.substring(start, end);
        var replacement = openTag + selectedText + closeTag;
        var newText = oldText.substring(0, start) + replacement + oldText.substring(end, len);

        textArea.value = newText;

    }

    onVotingChange(e) {
        const { dispatch } = this.props;
        dispatch({
            type: 'SHOW_VOTING',
            data: this.refs.voting.checked
        })
    }

    onChange(e) {
        if (this.props.onChange) {
            const text = this.refs.text.value;
            this.props.onChange(e, text);
        }
    }

    onKeyPress(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            if (this.props.onSend) {
                const text = this.refs.text.value;
                this.props.onSend(e, text);
            }
        }
    }

    render() {

        const { placeholder, showVoting, isVoting, isFetching, text } = this.props;

        let voting;
        if (showVoting)
            voting = (
                <div style={{ float: "right" }}>
                    <input name="voting" id="voting" checked={isVoting} type="checkbox" onChange={this.onVotingChange} ref="voting" />
                    <label htmlFor="voting" >Голосование</label>
                </div>
            )

        return (
            <div>
                <textarea
                    placeholder={placeholder}
                    name="message_text"
                    id="message_text"
                    cols="70" rows="12"
                    ref="text"
                    value={text}
                    className="field"
                    style={{ width: "45em" }}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                />
                <div>
                    <button name="code1C" type="button" className="button" onClick={this.onButtonCode1c}>Код 1С</button>
                    <button
                        name="Submit"
                        type="button"
                        id="Submit"
                        disabled={isFetching}
                        className="button"
                        onClick={this.onSendClick}>
                        {isFetching ? 'Отпарвляется' : 'Отправить'}
                    </button>
                    {voting}
                </div>
            </div>
        )

    }
}

export default connect()(TextEditor);