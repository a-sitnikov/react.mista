import React, { Component } from 'react'

import TextEditor from '../text_editor'

class NewMessage extends Component {

    constructor(props) {
        super(props);
        this.onSend = this.onSend.bind(this);
    }

    onSend(e, text) {
        
    }

    render() {

        return (
            <div>
                <p className="newmessage">Добавить сообщение в тему:</p>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 0, marginRight: "20px" }}>
                        <label htmlFor="user_name" style={{display: "block", marginBottom: "10px"}}>Имя*:</label>
                        <label htmlFor="message_text">Сообщение*:</label>
                    </div>
                    <div style={{ flex: 0 }}>
                        <input
                            name="user_name"
                            id="user_name"
                            size="30" maxLength="20"
                            value="Вафель"
                            readOnly={true}
                            type="text"
                            className="fieldbasic"
                            style={{marginBottom: "10px"}}
                        />
                        <TextEditor onSend={this.onSend}/>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewMessage;