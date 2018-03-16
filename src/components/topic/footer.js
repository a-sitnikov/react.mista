import React, { Component } from 'react'
import { fetchTopic } from '../../actions/topic'

const Pages = (props) => {

    const { info, currentPage } = props;
    const maxPage = Math.min(Math.ceil(info.answers_count / 100), 10);

    let pages = [];

    if (currentPage > 1) {
        const prevPage = currentPage - 1;
        const href = `topic.php?id=${info.id}&page=${prevPage}`;
        pages.push(<a id="go_back" key="prev" href={href} title="Назад" className="prev-next-pagelink" data-page={prevPage} style={{ margin: "5px" }}><big>◄</big></a>);
    }

    for (let i = 1; i <= maxPage; i++) {
        if (currentPage === i)
            pages.push(<span key={i} className="curpage" style={{ margin: "5px" }}><b>{i}</b></span>);
        else {
            const href = `topic.php?id=${info.id}&page=${i}`
            pages.push(<a key={i} href={href} title={`Страница ${i}`} data-page={i} style={{ margin: "5px" }}>{i}</a>);
        }
    }

    if (currentPage < maxPage) {
        const nextPage = currentPage + 1;
        const href = `topic.php?id=${info.id}&page=${nextPage}`;
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
    }

    onRefreshClick() {
        const { params, dispatch } = this.props;
        dispatch(fetchTopic(params));
    }

    render() {

        const { info, currentPage } = this.props;

        let pages;
        if (info.answers_count > 100)
            pages = <Pages info={info} currentPage={currentPage} />

        return (
            <table id="under_messages" className="center-97">
                <tbody>
                    <tr>
                        <td className="ta-left va-top" style={{ width: "50%" }}>
                            <br />
                            {pages}
                            <br />
                            <button id="bookmark" className="sendbutton">Закладка</button>
                        </td>
                        <td className="ta-right va-middle" style={{ height: "30px" }}>
                            <span className="return-string">
                                <a rel="nofollow" href="index.php">Список тем форума</a>
                            </span>
                            <br />
                            <button id="refresh_button" type="button" className="sendbutton" onClick={this.onRefreshClick}>Обновить ветку</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Footer;