//@flow
import React from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'

import TopicNameCell from './topic_name_cell';
import LinkToPost from '../../extensions/link_to_post'
import { today } from 'src/utils'

import type { ResponseTopicsListItem } from 'srcapi'

import type { State } from 'src/reducers'

import { defaultLoginState } from 'src/reducers/login'
import type { LoginState } from 'src/reducers/login'
import type { DefaultProps } from 'src/components/index'

type RowProps = {
    columns: any,
    data: ResponseTopicsListItem,
    preview: ?number    
}

type StateProps = {
    login: LoginState
}

type Props = RowProps & StateProps & DefaultProps;

const Row = (props: Props) => {

    const { columns, data, preview } = props;

    let cells = [];
    for (let i in columns) {

        let value;
        let column = columns[i];

        if (column.name === 'Раздел') {
            value = <td key={i} className={column.className}>{data.forum}</td>

        } else if (column.name === 'Re') {
            value = (
                <td key={i} className={column.className}>
                    <LinkToPost topicId={data.id} number={data.answ} style={{color: "black"}} isPreview={true}/>
                </td>
            )    

        } else if (column.name === 'Тема') {
            value = <TopicNameCell key={i} column={column} data={data} preview={preview}/>

        } else if (column.name === 'Автор') {
            value = <td key={i} className={column.className}>{data.user0}</td>

        } else if (column.name === 'Обновлено') {

            let text = [];

            let time = new Date(data.utime * 1000);
            if (today(time)) {
                text.push(dateFormat(time, 'HH:MM'));
                text.push(data.user);
            } else {
                text.push(dateFormat(time, 'dd.mm.yy'));
            }

            value = <td key={i} className={column.className}>{text.join(' ')}</td>
        }

        cells.push(value);
    }

    return (
        <tr>
            {cells}
        </tr>
    )

}

const mapStateToProps = (state: State): StateProps => {

    return {
        login: state.login || defaultLoginState
    }
}

export default connect(mapStateToProps)(Row);