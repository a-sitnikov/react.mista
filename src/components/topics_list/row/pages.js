import React from 'react'

import { getMaxPage } from '../../../utils'


const Pages = (props) => {

    const { answ, topicId } = props;

    let pages = [];
    if (answ > 100) {
        let maxPage = getMaxPage(answ);
        for (let i = 1; i <= maxPage; i++) {
            let href = `${window.hash}/topic.php?id=${topicId}&page=${i}`;
            let text;
            if (i > 3 && i < maxPage)
                text = '•';
            else
                text = i;
            pages.push(<a key={i} className="agh" style={{ margin: "3px" }} href={href}>{text}</a>);
        }
    }

    if (answ > 20) {
        let href = `${window.hash}/topic.php?id=${topicId}&page=last20#F`;
        pages.push(<a key="last20" className="agh" style={{ margin: "3px" }} href={href}>»</a>);
    }

    return (
        <span>
            {pages}
        </span>
    )
}

export default Pages;