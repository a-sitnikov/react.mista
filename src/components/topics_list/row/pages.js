import React from 'react'
import { Link } from 'react-router-dom'

import { getMaxPage } from 'src/utils'


const Pages = (props) => {

    const { answ, topicId } = props;

    let pages = [];
    if (answ > 100) {
        let maxPage = getMaxPage(answ);
        for (let i = 1; i <= maxPage; i++) {
            let href = `/topic.php?id=${topicId}&page=${i}`;
            let text;
            if (i > 3 && i < maxPage)
                text = '•';
            else
                text = i;
            pages.push(<Link key={i}  className="agh" style={{ margin: "3px" }} to={href}>{text}</Link>);
        }
    }

    if (answ > 20) {
        let href = `/topic.php?id=${topicId}&page=last20#F`;
        pages.push(<Link key="last20" className="agh" style={{ margin: "3px" }} to={href}>»</Link>);
    }

    return (
        <span className="topic-pages">
            {pages}
        </span>
    )
}

export default Pages;