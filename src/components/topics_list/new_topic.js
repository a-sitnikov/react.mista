import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSectionsIfNeeded } from '../../actions/sections'
import SectionSelect from './section_select'

class NewTopic extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSectionsIfNeeded());
    }
    
    render() {

        const { sections } = this.props;
 
        let groupsElem = [];
        for (let forum in sections.tree) {
            groupsElem.push(<option key={forum} value={forum.toLowerCase()}>{forum}</option>);
        }

        return (
            <div id="F" className="newtopic" style={{ marginLeft: '3%', float: 'left ', position: 'relative' }}>
                <p><b>Новая тема:</b></p>
                <form name="newtopic_form" id="newtopic_form" method="POST">
                    <select name="target_forum" id="target_forum" className="fieldbasic">
                        {groupsElem}
                    </select>
                    <SectionSelect defaultValue="Секция" className="fieldbasic" id="target_section" name="target_section" style={{ width: "40.4em" }}/>
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
    
    return {
        sections: state.sections
    }
}

export default connect(mapStateToProps)(NewTopic);