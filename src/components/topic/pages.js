//@flow
import * as React from 'react'
import './pages.css'

type Props = {
    maxPage: number,
    id: number,
    currentPage: string
}

const Pages = (props: Props) => {

    const { maxPage, id } = props;
    if (maxPage === 1) 
        return null;

    let currentPage = props.currentPage;

    let pages = [];

    if (currentPage === 'last20') {
        const prevPage = maxPage;
        const href = `${window.hash}/topic.php?id=${id}&page=${prevPage}`;
        pages.push(<a id="go_back" key="prev" href={href} title="Назад" className="page"><big>◄</big></a>);
        
    } else if (+currentPage > 1) {
        const prevPage = +currentPage - 1;
        const href = `${window.hash}/topic.php?id=${id}&page=${prevPage}`;
        pages.push(<a id="go_back" key="prev" href={href} title="Назад" className="page"><big>◄</big></a>);
    }

    for (let i = 1; i <= maxPage; i++) {
        if (+currentPage === i)
            pages.push(<span key={i} className="curpage">{i}</span>);
        else {
            const href = `${window.hash}/topic.php?id=${id}&page=${i}`
            pages.push(<a key={i} href={href} title={`Страница ${i}`} className="page">{i}</a>);
        }
    }

    if (currentPage === 'last20')
        pages.push(<span key='last20' className="curpage" style={{ margin: "5px" }}>»</span>);
    else
        pages.push(<a key='last20' href={`${window.hash}/topic.php?id=${id}&page=last20`} title={`Последние 20`} className="page">»</a>);

    if (+currentPage < maxPage) {
        const nextPage = currentPage + 1;
        const href = `${window.hash}/topic.php?id=${id}&page=${nextPage}`;
        pages.push(<a id="go_back" key="next" href={href} title="Назад" className="page" data-page={nextPage}><big>►</big></a>);
    }

    return (
        <span>
            {pages}
        </span>
    )

}

export default Pages;