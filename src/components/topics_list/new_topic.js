//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, InputGroup } from 'react-bootstrap'

import type { ResponseSection } from 'src/api'

import type { DefaultProps } from 'src/components'
import type { State } from 'src/reducers'
import type { SectionsState } from 'src/reducers/sections'
import type { NewTopicState } from 'src/reducers/new_topic'

import { postNewTopicIfNeeded } from 'src/actions/new_topic'
import type { NewTopicAction, postNewTopicParams } from 'src/actions/new_topic'

import SectionSelect from './section_select'
import TextEditor from '../common/text_editor'
import ErrorElem from '../common/error'

import './new_topic.css'

type StateProps = {
    sections: SectionsState, 
    newTopic: NewTopicState,
}    

type NewTopicProps = {
    onSubmitSuccess?: () => void
};

type Props = NewTopicProps & StateProps & DefaultProps;

class NewTopic extends Component<Props> {

    onSectionChange: (e: any, section: ResponseSection) => void;
    onTextChange: (e: any, text: string) => void;
    onSend: (e: any, text: string) => void;
    onSubjectChange: (e: any) => void;
    onSubmit: () => void;
    onSubmitSuccess: () => void;
    currentSection: ?ResponseSection;
    formRef: any;

    constructor(props) {
        super(props);
        this.onSectionChange = this.onSectionChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSubjectChange = this.onSubjectChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);

        // $FlowFixMe
        this.formRef = React.createRef();
    }

    componentDidMount() {
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

    onSubmit(e) {
        
        e.preventDefault();

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

        if (!newTopic.text) {
            action = {
                type: 'POST_NEW_TOPIC_ERROR',
                error: 'Не указано сообщение'
            };
            dispatch(action);
            return;

        }
        
        let params: postNewTopicParams = {
            subject,
            text: newTopic.text,
            section: this.currentSection.id,
            forum: this.currentSection.forum,
            isVoting: newTopic.isVoting,
            votingItems: [],
            onSuccess: this.onSubmitSuccess
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


    onSubmitSuccess() {

        const { dispatch } = this.props;
        dispatch({
            type: 'NEW_TOPIC_CLEAR',
            text: ''
        });

        if (this.props.onSubmitSuccess) {
            this.props.onSubmitSuccess();
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
                        <InputGroup style={{marginBottom: "3px", width: "100%"}}>
                            <InputGroup.Addon style={{width:"45px"}}>{`${i}.`}</InputGroup.Addon>
                            <FormControl type="text" size="30" maxLength="50" ref={`vote${i}`} style={{color: "black"}}/>
                        </InputGroup>    
                    </div>
                );
            }
        }

        return (
            <form className="new-topic-container" ref={this.formRef} onSubmit={this.onSubmit}>
                <div id="newtopic_form"  className="new-topic-text">
                    <p><b>Новая тема:</b></p>
                    {newTopic.error && <ErrorElem text={newTopic.error} />}
                    <div className="flex-row" style={{ marginBottom: "3px" }}>
                        <FormControl 
                            componentClass="select"
                            readOnly={true} 
                            value={newTopic.forum}
                            style={{ flex: "0 1 90px", color: "black" }}
                        >
                            {groupsElem}                       
                        </FormControl>
                        <SectionSelect
                            defaultValue="Секция"
                            id="target_section"
                            style={{ flex: "1 1 auto" }}
                            onChange={this.onSectionChange}
                        />
                    </div>
                    <FormControl
                        type="text"
                        value={newTopic.subject}
                        onChange={this.onSubjectChange}
                        style={{ type: "text", width: "100%", boxSizing: "border-box", marginBottom: "3px", color: "black" }}
                        placeholder="Тема"
                        maxLength="90"
                    />                        
                    <TextEditor
                        placeholder="Сообщение"
                        showVoting={true}
                        isVoting={newTopic.isVoting}
                        onSend={this.onSend}
                        onChange={this.onTextChange} 
                        text={newTopic.text} 
                        isFetching={newTopic.isFetching}
                        formName="NEW_TOPIC"
                        formRef={this.formRef}
                    />
                </div>
                <FormGroup className="new-topic-voting">
                    {votingOptions}
                </FormGroup>
            </form>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    return {
        sections: state.sections,
        newTopic: state.newTopic
    }
}

export default connect(mapStateToProps)(NewTopic);