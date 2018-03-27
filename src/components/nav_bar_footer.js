import React from 'react'

const NavBarFooter = (props) => {

    return (
        <div id="footer" className="flex-row" style={{ borderTop: "1px solid #ccc", padding: "5px 0px 5px 0px" }}>
            <div className="navigation-link" style={{ flex: 1 }}>
                <a href="rules.php">Правила</a>
                <span className="separator">|</span>
                <a href="about.php">Описание</a>
                <span className="separator">|</span>
                <b><a href="ad.php">Реклама на сайте</a>  </b>
                <span className="separator">|</span>
                <a href={`${window.hash}/find.php`}>Поиск</a>
                <span className="separator">|</span>
                <noindex>
                    <a rel="nofollow" href={`${window.hash}/sections_list.php`} >Секции</a>
                    <span className="separator">|</span>
                    <a rel="nofollow" href={`${window.hash}/rating.php`}>Рейтинг</a>
                    <span className="separator">|</span>
                    <a href="http://kb.mista.ru">Книга знаний</a>
                    <span className="separator">|</span>
                    <a href="http://wiki.mista.ru">Вики-миста (КЗ2)</a>
                    <span className="separator">|</span>
                    <a rel="nofollow" href="http://m.mista.ru/">Мобильная</a>
                    <span className="separator">|</span>
                    <a href="archive.php">Архив</a>
                    <span className="separator">|</span>
                    <a href="moders.php">Модераторы</a>
                    <span className="separator">|</span>
                    <a href="users_gallery.php">Галерея</a>
                    <span className="separator">|</span>
                    <span>18+</span>
                </noindex>
            </div>

        </div>
    )
}

export default NavBarFooter;