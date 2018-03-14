import React from 'react'
import classNames from 'classnames'
import { today, timeStr, dateTimeStr } from '../../utils'

const TopicNameCell = (props) => {

    const { column, data } = props;

    let href = `topic.php?id=${data.id}`;
    let classes = classNames('agb', { 'longtopics': data.answ >= 100 });

    let isVoting;
    if (data.is_voting === 1) {
        isVoting = <span className="agh">[±]</span>
    }

    let sectionHref = `index.php?section=${data.sect2}`;
    let section = [];
    if (data.sect1) {
        section.push(<span key="0" className="agh">&nbsp;&nbsp;/&nbsp;</span>);
        section.push(<a key="1" rel="nofollow" className="sectionlink-gray" href={sectionHref} target="_blank">{data.sect1}</a>);
    }

    let closed;
    if (data.closed)
        closed = <span className="moder-action">Ø</span>

    return (
        <td className={column.className}>
            <a href={href} className={classes} style={{ marginRight: "5px" }} target="_blank" dangerouslySetInnerHTML={{ __html: data.text }}></a>
            {isVoting}
            <Pages answ={data.answ} topicId={data.id} />
            {closed}
            {section}
        </td>
    )
}

const Pages = (props) => {

    const { answ, topicId } = props;

    let pages = [];
    if (answ > 100) {
        let count = Math.min(Math.ceil(answ / 100), 10);
        for (let i = 1; i <= count; i++) {
            let href = `topic.php?id=${topicId}&page=${i}`;
            let text;
            if (i > 3 && i < count)
                text = '•';
            else
                text = i;
            pages.push(<a key={i} className="agh" style={{ margin: "3px" }} href={href}>{text}</a>);
        }
    }

    if (answ > 20) {
        let href = `topic.php?id=${topicId}&page=last20F`;
        pages.push(<a key="last20F" className="agh" style={{ margin: "3px" }} href={href}>»</a>);
    }

    return (
        <span>
            {pages}
        </span>
    )
}

const Row = (props) => {

    const { columns, data } = props;

    let cells = [];
    for (let i in columns) {

        let value;
        let column = columns[i];

        if (column.name === 'Раздел') {
            value = <td key={i} className={column.className}>{data.forum}</td>

        } else if (column.name === 'Re') {
            value = <td key={i} className={column.className}>{data.answ}</td>

        } else if (column.name === 'Тема') {
            value = <TopicNameCell key={i} column={column} data={data} />

        } else if (column.name === 'Автор') {
            value = <td key={i} className={column.className}>{data.user0}</td>

        } else if (column.name === 'Обновлено') {
            
            let text = [];
            
            let time = new Date(data.utime*1000);
            if (today(time)) {
                text.push(timeStr(time));
                text.push(data.user);
            } else {   
                text.push(dateTimeStr(time));
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

export default Row;