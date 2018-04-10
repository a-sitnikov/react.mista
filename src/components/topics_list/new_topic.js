//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { ResponseSection } from '../../api'

import type { DefaultProps } from '../../components'
import type { State } from '../../reducers'
import type { SectionsState } from '../../reducers/sections'
import type { NewTopicState } from '../../reducers/new_topic'

import { fetchSectionsIfNeeded } from '../../actions/sections'
import { postNewTopicIfNeeded } from '../../actions/new_topic'
import type { postNewTopicParams } from '../../actions/new_topic'

import SectionSelect from './section_select'
import TextEditor from '../core/text_editor'
import ErrorElem from '../core/error'

type NewTopicProps = {
    sections: SectionsState, 
    newTopic: NewTopicState
};

type Props = NewTopicProps & DefaultProps;

class NewTopic extends Component<Props> {

    onSectionChange: (e: any, section: ResponseSection) => void;
    onSend: (e: any, text: string) => void;
    currentSection: ResponseSection | null;

    constructor(props) {
        super(props);
        this.onSectionChange = this.onSectionChange.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSectionsIfNeeded());
    }

    onSectionChange(e, section) {
        this.currentSection = section;
        const { dispatch } = this.props;
        dispatch({
            type: 'NEW_TOPIC_FORUM',
            data: section.forum
        });
    }

    onSend(e, text) {
        const { dispatch, newTopic } = this.props;

        if (!this.currentSection) {
            dispatch({
                type: 'POST_NEW_TOPIC_ERROR',
                error: 'Не выбрана секция'
            });
            return;
        }

        let subject = this.refs.subject.value; 
        if (!subject) {
            dispatch({
                type: 'POST_NEW_TOPIC_ERROR',
                error: 'Не указана тема'
            });
            return;
        }

        if (!text) {
            dispatch({
                type: 'POST_NEW_TOPIC_ERROR',
                error: 'Не указано сообщение'
            });
            return;
        }
        
        let params: postNewTopicParams = {
            subject,
            text,
            section: this.currentSection.id,
            forum: this.currentSection.forum,
            isVoting: newTopic.isVoting,
            votingItems: []
        };

        if (newTopic.isVoting) {
            params.votingItems = [];
            for (let i = 1; i <= 10; i++) {
                let val = this.refs[`vote${i}`].value;
                if (val) {
                    params.votingItems.push(val);
                }
            }           
        }

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
            <div id="F" className="newtopic" style={{ marginLeft: '3%', position: 'relative' }}>
                <p><b>Новая тема:</b></p>
                <div style={{ display: "flex" }}>
                    <div id="newtopic_form" style={{ felex: 0, marginRight: "10px" }}>
                        <ErrorElem text={newTopic.error} />
                        <select name="target_forum" id="target_forum" className="fieldbasic" value={newTopic.forum} readOnly={true} ref="forum">
                            {groupsElem}
                        </select>
                        <SectionSelect
                            defaultValue="Секция"
                            id="target_section"
                            name="target_section"
                            className="fieldbasic"
                            style={{ width: "40.4em" }}
                            onChange={this.onSectionChange}
                        />
                        <br />
                        <input placeholder="Тема" id="topic_text" name="topic_text" maxLength="90"
                            className="fieldbasic"
                            style={{ width: "44em", type: "text" }}
                            ref='subject'
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

const mapStateToProps = (state: State): NewTopicProps => {

    return {
        sections: state.sections,
        login: state.login,
        newTopic: state.newTopic
    }
}

export default connect(mapStateToProps)(NewTopic);