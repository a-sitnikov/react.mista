//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { ResponseSection } from 'src/api'

import type { DefaultProps } from 'src/components'
import type { State } from 'src/reducers'
import type { SectionsState } from 'src/reducers/sections'
import type { NewTopicState } from 'src/reducers/new_topic'

import { fetchSectionsIfNeeded } from 'src/actions/sections'
import { postNewTopicIfNeeded } from 'src/actions/new_topic'
import type { NewTopicAction, postNewTopicParams } from 'src/actions/new_topic'

import SectionSelect from './section_select'
import TextEditor from '../core/text_editor'
import ErrorElem from '../core/error'

type NewTopicProps = {
    sections: SectionsState, 
    newTopic: NewTopicState,
    onPostSuccess?: () => void
};

type Props = NewTopicProps & DefaultProps;

class NewTopic extends Component<Props> {

    onSectionChange: (e: any, section: ResponseSection) => void;
    onTextChange: (e: any, text: string) => void;
    onSend: (e: any, text: string) => void;
    onSubjectChange: (e: any) => void;
    onPostSuccess: () => void;
    currentSection: ResponseSection | null;

    constructor(props) {
        super(props);
        this.onSectionChange = this.onSectionChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubjectChange = this.onSubjectChange.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onPostSuccess = this.onPostSuccess.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSectionsIfNeeded());
    }

    onSectionChange(e, section) {
        const { dispatch } = this.props;
        this.currentSection = section;

        const action: NewTopicAction = {
            type: 'NEW_TOPIC_SECTION',
            section
        };

        dispatch(action);
    }

    onSend(e, text) {
        const { dispatch, newTopic } = this.props;

        let action: NewTopicAction;
        if (!this.currentSection) {
            action = {
                type: 'POST_NEW_TOPIC_ERROR',
                error: 'Не выбрана секция'
            };
            dispatch(action);
            return;
        }

        let subject = this.refs.subject.value; 
        if (!subject) {
            action = {
                type: 'POST_NEW_TOPIC_ERROR',
                error: 'Не указана тема'
            };
            dispatch(action);
            return;            
        }

        if (!text) {
            action = {
                type: 'POST_NEW_TOPIC_ERROR',
                error: 'Не указано сообщение'
            };
            dispatch(action);
            return;

        }
        
        let params: postNewTopicParams = {
            subject,
            text,
            section: this.currentSection.id,
            forum: this.currentSection.forum,
            isVoting: newTopic.isVoting,
            votingItems: [],
            onSuccess: this.onPostSuccess
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

    onTextChange(e, text) {

        const { dispatch } = this.props;
        dispatch({
            type: 'NEW_TOPIC_TEXT',
            text
        });

    }
    
    onSubjectChange(e) {
 
        const { dispatch } = this.props;
        dispatch({
            type: 'NEW_TOPIC_SUBJECT',
            text: e.target.value
        });
       
    }


    onPostSuccess() {

        const { dispatch } = this.props;
        dispatch({
            type: 'NEW_TOPIC_CLEAR',
            text: ''
        });

        if (this.props.onPostSuccess) {
            this.props.onPostSuccess();
        }
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
            <div id="F" className="newtopic" style={{ marginLeft: '3%', marginBottom: "10px", position: 'relative' }}>
                <p><b>Новая тема:</b></p>
                <div style={{ display: "flex" }}>
                    <div id="newtopic_form" style={{ flex: 0, marginRight: "10px" }}>
                        <ErrorElem text={newTopic.error} />
                        <select name="target_forum" id="target_forum" className="field" value={newTopic.forum} readOnly={true} ref="forum">
                            {groupsElem}
                        </select>
                        <SectionSelect
                            defaultValue="Секция"
                            id="target_section"
                            name="target_section"
                            className="field"
                            style={{ width: "40.4em" }}
                            onChange={this.onSectionChange}
                        />
                        <br />
                        <input placeholder="Тема" id="topic_text" name="topic_text" maxLength="90"
                            className="field"
                            style={{ width: "44em", type: "text" }}
                            onChange={this.onSubjectChange}
                            value={newTopic.subject}
                            ref='subject'
                        />
                        <br />
                        <TextEditor
                            placeholder="Сообщение"
                            showVoting={true}
                            isVoting={newTopic.isVoting}
                            onSend={this.onSend}
                            onChange={this.onTextChange} 
                            text={newTopic.text} 
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