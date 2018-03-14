import React from 'react'

const NavBarFooter = (props) => {

    const style = {margin: "5px"};

    return (
        <table id="footer">
            <tbody>
                <tr>
                    <td><p className="navigation-link">
                        <a href="rules.php">Правила</a>
                        <span style={style}>|</span>
                        <a href="about.php">Описание</a>
                        <span style={style}>|</span>
                        <b><a href="ad.php">Реклама на сайте</a>  </b>
                        <span style={style}>|</span>
                        <a href="find.php">Поиск</a>
                        <span style={style}>|</span>
                        <noindex>
                            <a rel="nofollow" href="sections_list.php" >Секции</a>
                            <span style={style}>|</span>
                            <a rel="nofollow" href="rating.php">Рейтинг</a>
                            <span style={style}>|</span>
                            <a href="http://kb.mista.ru">Книга знаний</a>
                            <span style={style}>|</span>
                            <a href="http://wiki.mista.ru">Вики-миста (КЗ2)</a>
                            <span style={style}>|</span>
                            <a rel="nofollow" href="http://m.mista.ru/">Мобильная</a>
                            <span style={style}>|</span>
                            <a href="archive.php">Архив</a>
                            <span style={style}>|</span>
                            <a href="moders.php">Модераторы</a>
                            <span style={style}>|</span>
                            <a href="users_gallery.php">Галерея</a>
                            <span style={style}>|</span>
                            <span>18+</span>
                        </noindex>
                    </p>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default NavBarFooter;