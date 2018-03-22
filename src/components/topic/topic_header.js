import React from 'react'

const Header = (props) => {

    const { info } = props;

    let yandexUrl = "https://www.yandex.ru/yandsearch?rpt=rad&text=" + encodeURIComponent(info.text);
    return (
        <tr>
            <td id="topic-moder-tools">
                <div className="moder-action">
                    <div>
                        {/*<a href="add_voting.php?topic_id=815217" title="Добавить голосование">vote</a> &nbsp;&nbsp;*/}
                    </div>
                </div>
            </td>
            <td className="leftbottomgray ta-center" style={{backgroundColor: "#FDFDFD"}}>
                <table className="va-middle ta-center" style={{width:"100%", border: "0", backgroundColor: "#FDFDFD", padding: "0px", margin: "0px"}}>
                    <tbody>
                        <tr>
                            <td id="td_topic_text">
                                <h1 className="topic-title " dangerouslySetInnerHTML={{ __html: info.text }}></h1>
                                <div className="moder-action"></div>
                            </td>
                            <td className="ta-center va-middle" style={{width:"20px", backgroundColor: "#FDFDFD", whiteSpace: "nowrap"}}>
                                <a rel="nofollow" href={yandexUrl} title="Искать в Яндексе" target="_blank" className="yandex">Я</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    )

}

export default Header;