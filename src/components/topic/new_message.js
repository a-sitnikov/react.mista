import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextEditor from '../text_editor'

class NewMessage extends Component {

    constructor(props) {
        super(props);
        this.onSend = this.onSend.bind(this);
    }

    onSend(e, text) {

        const { dispatch } = this.props;
        dispatch({});

    }

    render() {

        const { info, login } = this.props;

        let votingElem;
        if (info.is_voting) {

            let votingOptions = [];
            for (let i = 1; i <= info.voting.length; i++) {

                const item = info.voting[i - 1];
                if (!item.select)
                    continue;

                votingOptions.push(
                    <div>
                        <input id={`voting_select${i}`} name="voting_select" value={i} type="radio" />
                        <label for={`voting_select${i}`}>{`${i}. ${item.select}`}</label>
                    </div>
                );
            }


            votingElem = (
                <fieldset id="voting">
                    <legend>Ваш выбор:
                    <small><a href="" id="voting_clear" style={{marginLeft:"5px"}} onClick="">очистить</a></small>
                    </legend>
                    {votingOptions}
                    <br />
                    Обоснуйте свой выбор!
                </fieldset>
            );

        }

        return (
            <div>
                <p className="newmessage">Добавить сообщение в тему:</p>
                <div className="flex-row">
                    <div style={{ flex: 0, marginRight: "20px" }}>
                        <label htmlFor="user_name" style={{ display: "block", marginBottom: "10px" }}>Имя*:</label>
                        <label htmlFor="message_text">Сообщение*:</label>
                    </div>
                    <div style={{ flex: 0, marginRight: "15px" }}>
                        <input
                            name="user_name"
                            id="user_name"
                            size="30" maxLength="20"
                            value={login.username}
                            readOnly={true}
                            type="text"
                            className="fieldbasic"
                            style={{ marginBottom: "10px" }}
                        />
                        <TextEditor onSend={this.onSend} />
                    </div>
                    <div style={{ flex: "0 0 30%" }}>
                        {votingElem}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        login: state.login
    };

}

export default connect(mapStateToProps)(NewMessage);