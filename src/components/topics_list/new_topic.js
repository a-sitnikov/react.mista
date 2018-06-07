//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormControl } from 'react-bootstrap'

import type { ResponseSection } from 'src/api'

import type { DefaultProps } from 'src/components'
import type { State } from 'src/reducers'
import type { SectionsState } from 'src/reducers/sections'
import type { NewTopicState } from 'src/reducers/new_topic'

import { fetchTopicsListIfNeeded } from 'src/actions/topics_list'
import { fetchSectionsIfNeeded } from 'src/actions/sections'
import { postNewTopicIfNeeded } from 'src/actions/new_topic'
import type { NewTopicAction, postNewTopicParams } from 'src/actions/new_topic'

import SectionSelect from './section_select'
import TextEditor from '../common/text_editor'
import ErrorElem from '../common/error'

type StateProps = {
    sections: SectionsState, 
    newTopic: NewTopicState,
    isFetching: boolean,
}    

type NewTopicProps = {
    locationParams: {},
    onPostSuccess?: () => void
};

type Props = NewTopicProps & StateProps & DefaultProps;

class NewTopic extends Component<Props> {

    onSectionChange: (e: any, section: ResponseSection) => void;
    onTextChange: (e: any, text: string) => void;
    onSend: (e: any, text: string) => void;
    onSubjectChange: (e: any) => void;
    onPostSuccess: () => void;
    onRefreshClick: () => void;
    currentSection: ResponseSection | null;

    constructor(props) {
        super(props);
        this.onSectionChange = this.onSectionChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubjectChange = this.onSubjectChange.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onPostSuccess = this.onPostSuccess.bind(this);
        this.onRefreshClick = this.onRefreshClick.bind(this);
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

    onRefreshClick() {
        const { dispatch, locationParams } = this.props;       
        dispatch(fetchTopicsListIfNeeded(locationParams));
    }
    
    render() {

        const { sections, newTopic, isFetching } = this.props;

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
                <div style={{ display: "flex" }}>
                    <div id="newtopic_form" style={{ flex: "0 1 60%", marginRight: "10px" }}>
                        <p><b>Новая тема:</b></p>
                        <ErrorElem text={newTopic.error} />
                        <div className="flex-row" style={{ marginBottom: "3px" }}>
                            <FormControl 
                                componentClass="select"
                                readOnly={true} 
                                value={newTopic.forum}
                                bsSize="sm"
                                style={{ flex: "0 1 70px" }}
                            >
                                {groupsElem}                       
                            </FormControl>
                            <SectionSelect
                                defaultValue="Секция"
                                id="target_section"
                                name="target_section"
                                style={{ flex: "1 1 auto" }}
                                onChange={this.onSectionChange}
                            />
                        </div>
                        <FormControl
                            type="text"
                            value={newTopic.subject}
                            onChange={this.onSubjectChange}
                            style={{ type: "text", width: "100%", boxSizing: "border-box", marginBottom: "3px" }}
                            placeholder="Тема"
                            maxLength="90"
                            bsSize="sm"
                        />                        
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
                    <div style={{ marginLeft: "auto"}}>
                        <button id="refresh_button" type="button" className="button" onClick={this.onRefreshClick} disabled={isFetching}>{isFetching ? 'Обновляется': 'Обновить список'}</button>
                    </div>    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    return {
        sections: state.sections,
        login: state.login,
        newTopic: state.newTopic,
        isFetching: state.topicsList.isFetching
    }
}

export default connect(mapStateToProps)(NewTopic);