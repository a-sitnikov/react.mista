import React, { Component } from 'react'
import { fetchNewMessagesIfNeeded } from '../../actions/topic'
import { addBookmark } from '../../actions/bookmark'
import { maxPage } from '../../utils'

const Pages = (props) => {

    const { info } = props;
    const maxPage = Math.min(Math.ceil(info.answers_count / 100), 10);

    let currentPage = props.currentPage;
    if (currentPage === 'last20')
        currentPage = maxPage
    else
        currentPage = +currentPage;

    let pages = [];

    if (currentPage > 1) {
        const prevPage = currentPage - 1;
        const href = `${window.hash}/topic.php?id=${info.id}&page=${prevPage}`;
        pages.push(<a id="go_back" key="prev" href={href} title="Назад" className="prev-next-pagelink" data-page={prevPage} style={{ margin: "5px" }}><big>◄</big></a>);
    }

    for (let i = 1; i <= maxPage; i++) {
        if (currentPage === i)
            pages.push(<span key={i} className="curpage" style={{ margin: "5px" }}><b>{i}</b></span>);
        else {
            const href = `${window.hash}/topic.php?id=${info.id}&page=${i}`
            pages.push(<a key={i} href={href} title={`Страница ${i}`} data-page={i} style={{ margin: "5px" }}>{i}</a>);
        }
    }

    if (currentPage < maxPage) {
        const nextPage = currentPage + 1;
        const href = `${window.hash}/topic.php?id=${info.id}&page=${nextPage}`;
        pages.push(<a id="go_back" key="next" href={href} title="Назад" className="prev-next-pagelink" data-page={nextPage} style={{ margin: "5px" }}><big>►</big></a>);
    }

    return (
        <span className="pages">
            {pages}
        </span>
    )

}

class Footer extends Component {

    constructor(props) {
        super(props);

        this.onRefreshClick = this.onRefreshClick.bind(this);
        this.onBookmarkClick = this.onBookmarkClick.bind(this);
    }

    onBookmarkClick() {
        const { info, dispatch } = this.props;
        dispatch(addBookmark(info));
    }

    onRefreshClick() {
        
        const { info, dispatch } = this.props;
        
        dispatch(fetchNewMessagesIfNeeded({
            id: info.id,
            last: parseInt(info.answers_count, 10)
        }));

    }

    render() {

        const { info, params, bookmark } = this.props;

        let pages;
        if (info.answers_count > 100)
            pages = <Pages info={info} currentPage={params.page} />

        let updateButton;
        if (params.page === maxPage(info.answers_count) || params.page === 'last20')    
            updateButton = <button id="refresh_button" type="button" className="sendbutton" onClick={this.onRefreshClick}>Обновить ветку</button>

        return (
            <table id="F" className="center-97">
                <tbody>
                    <tr>
                        <td className="ta-left va-top" style={{ width: "50%" }}>
                            {pages}
                            <br />
                            <button id="bookmark" className="sendbutton" onClick={this.onBookmarkClick} disabled={bookmark.isFetching ? 'true' : ''}>{bookmark.isFetching ? 'Подождите...' : 'Закладка'}</button>
                        </td>
                        <td className="ta-right va-middle" style={{ height: "30px" }}>
                            <span className="return-string">
                                <a rel="nofollow" href="/">Список тем форума</a>
                            </span>
                            <br />
                            {updateButton}
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Footer;