import React, { Component } from 'react'
import { connect } from 'react-redux'

class TextEditor extends Component {

    constructor(props) {
        super(props);
        this.onButtonCode1c = this.onButtonCode1c.bind(this);
        this.onSpellCheck = this.onSpellCheck.bind(this);
        this.onSendClick = this.onSendClick.bind(this);
        this.onVotingChange = this.onVotingChange.bind(this);
    }

    onSpellCheck() {
        /*
        const speller = new window.Speller({ url:"/speller", lang:"ru", options:Speller.IGNORE_URLS });
        const text = this.refs.text.value
        speller.check([ text ]);
        */
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

    render() {

        const { placeholder, showVoting, isFetching } = this.props;

        const cpellCheckStyle = {
            backgroundImage: "url('http://speller.yandex.net/speller/1.0/spell.gif')",
            height: "19px",
            width: "20px",
            backgroundSize: "contain",
            marginRight: "5px"
        };

        const buttonStyle = {
            height: "19px",
            marginRight: "5px"
        }

        let voting;
        if (showVoting)
            voting = (
                <div style={{ float: "right" }}>
                    <input name="voting" id="voting" value="1" type="checkbox" onChange={this.onVotingChange} ref="voting" />
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
                    className="fieldbasic"
                    style={{ width: "45em" }}
                    ref="text"
                />
                <div>
                    <button name="cmdSpell" type="button" className="sendbutton" style={cpellCheckStyle} onClick={this.onSpellCheck}>&nbsp;</button>
                    <button name="code1C" type="button" className="sendbutton" style={buttonStyle} onClick={this.onButtonCode1c}>Код 1С</button>
                    <button
                        name="Submit"
                        type="button"
                        className="sendbutton"
                        id="Submit"
                        style={buttonStyle}
                        onClick={this.onSendClick}
                        disabled={isFetching}>
                        {isFetching ? 'Отпарвляется' : 'Отправить'}
                    </button>
                    {voting}
                </div>
            </div>
        )

    }
}

export default connect(state => { })(TextEditor);