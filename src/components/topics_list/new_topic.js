import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSectionsIfNeeded } from '../../actions/sections'
import { postNewTopicIfNeeded } from '../../actions/new_topic'
import SectionSelect from './section_select'
import TextEditor from '../text_editor'

class NewTopic extends Component {

    constructor(props) {
        super(props);
        this.onSend = this.onSend.bind(this);
        this.inputs = {};
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSectionsIfNeeded());
    }

    onSend(e, text) {
        const { dispatch } = this.props;

        const params = {
            text
        };

        dispatch(postNewTopicIfNeeded(params));
    }

    render() {

        const { sections, newTopic } = this.props;

        let groupsElem = [];
        for (let forum in sections.tree) {
            groupsElem.push(<option key={forum} value={forum.toLowerCase()}>{forum}</option>);
        }

        let votingOptions = [];

        if (newTopic.isVoting) {
            votingOptions.push(<p key="p">Варианты:</p>);
            for (let i = 1; i <= 10; i++) {
                votingOptions.push(
                    <div key={i}>
                        <label htmlFor={`select${i}`} style={{ width: "25px", display: "inline-block" }}>{`${i}.`}</label>
                        <input name={`select${i}`} size="30" maxLength="50" className="fieldbasic" type="text" ref={`vote${i}`} />
                    </div>
                );
            }
        }

        return (
            <div id="F" className="newtopic" style={{ marginLeft: '3%',/* float: 'left ',*/ position: 'relative' }}>
                <p><b>Новая тема:</b></p>
                <div style={{ display: "flex" }}>
                    <div id="newtopic_form" style={{ felex: 0, marginRight: "10px" }}>
                        <select name="target_forum" id="target_forum" className="fieldbasic" ref="forum">
                            {groupsElem}
                        </select>
                        <SectionSelect
                            defaultValue="Секция"
                            id="target_section"
                            name="target_section"
                            className="fieldbasic"
                            style={{ width: "40.4em" }}
                        />
                        <br />
                        <input placeholder="Тема" id="topic_text" name="topic_text" maxLength="90"
                            className="fieldbasic"
                            style={{ width: "44em", type: "text" }}
                            ref={el => this.inputs.topic_text = el}
                        />
                        <br />
                        <TextEditor
                            placeholder="Сообщение"
                            showVoting={true}
                            onSend={this.onSend}
                            isFetching={newTopic.isFetching}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        {votingOptions}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        sections: state.sections,
        login: state.login,
        newTopic: state.newTopic
    }
}

export default connect(mapStateToProps)(NewTopic);