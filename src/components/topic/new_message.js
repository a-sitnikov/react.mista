import React, { Component } from 'react'

class NewMessage extends Component {

    render() {

        const userNameStyle = {
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII')"
        };

        const cpellCheckStyle = {
            backgroundImage: "url('http://speller.yandex.net/speller/1.0/spell.gif')",
            height: "19px",
            width: "20px",
            backgroundSize: "contain",
            marginRight: "5px"
        };

        return (
            <table style={{width: "100%", tableLayout: "fixed"}}>
                <colgroup>
                    <col style={{width: "100px"}}/>
                    <col style={{width: "260px"}}/>
                    <col style={{width: "50px"}}/>
                    <col style={{width: "200px"}}/>
                    <col style={{width: "300px"}}/>
                </colgroup>
                <tbody>
                    <tr>
                        <td colSpan="5" className="va-top">
                            <span className="newmessage">Добавить сообщение в тему:</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="va-top">Имя*:</td>
                        <td className="va-top">
                            <input name="user_name" id="user_name" disabled="" className="fieldbasic" size="30" maxLength="20" value="Вафель" readOnly={true} style={userNameStyle} type="text"/>
                        </td>
                        <td className="va-top"></td>
                        <td className="va-top"></td>
                        <td className="va-top">&nbsp;</td>
                    </tr>
                    <tr>
                        <td className="va-top">Сообщение*:</td>
                        <td colSpan="3">
                            <div style={{width: "100%"}}>
                                <textarea name="message_text" id="message_text" cols="60" rows="12" className="fieldbasic"></textarea>
                            </div>  
                            <input name="action" id="action" value="new" type="hidden"/>
                            <input name="topic_id" id="topic_id" value="815275" type="hidden"/>
                            <input name="rnd" id="rnd" value="9801612272" type="hidden"/>
                        </td>
                        <td className="ta-left va-top" style={{padding: "5px"}}>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>
                            <button name="cmdSpell" type="button" className="sendbutton" style={cpellCheckStyle}>&nbsp;
                            </button>
                            <input name="Submit" className="sendbutton" id="submit_message" value="Отправить" type="submit"/>
                        </td>
                        <td>&nbsp;</td>
                        <td className="ta-right">
                        &nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>            
        )
    }
}    

export default NewMessage;