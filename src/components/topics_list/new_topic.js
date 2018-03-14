import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSections } from '../../actions/sections'

class NewTopic extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSections());
    }
    
    render() {

        const { sections } = this.props;
 
        let sectionsElem = [];
        for (let i in sections) {

            let section = sections[i];

            let group =
                <optgroup key={i} label={section.name}>
                    {section.items.map((item, j) => (
                        <option key={100*i + j} value={item.value}>
                            {item.name}
                        </option>
                    ))}
                </optgroup>

            sectionsElem.push(group);
        }

        return (
            <div id="F" className="newtopic" style={{ marginLeft: '3%', float: 'left ', position: 'relative' }}>
                <p><b>Новая тема:</b></p>
                <form name="newtopic_form" id="newtopic_form" method="POST">
                    <select name="target_forum" id="target_forum" className="fieldbasic">
                        {sections.map((item, i) => (
                            <option key={i} value={item.name.toLowerCase()}>{item.name}</option>
                        ))}
                    </select>
                    <select className="fieldbasic" id="target_section" name="target_section" style={{ width: "40.4em" }}>
                        <option value="" defaultValue="">Секция</option>
                        {sectionsElem}
                    </select>
                    <br />
                    <input placeholder="Тема" className="fieldbasic" id="topic_text" name="topic_text" maxLength="90" style={{ width: "44em", type: "text" }} />
                    <br />
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td className="ta-left" style={{ width: "100px" }}>
                                    <textarea placeholder="Сообщение" name="message_text" id="message_text" cols="70" rows="12" className="fieldbasic" style={{ width: "45em"}} />
                                    <br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    
    const { items } = state.sections || [];

    return {
        sections: items
    }
}

export default connect(mapStateToProps)(NewTopic);