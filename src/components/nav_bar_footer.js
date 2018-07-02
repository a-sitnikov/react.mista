import React from 'react'

const NavBarFooter = (props) => {

    return (
        <footer className="flex-row navbar-footer">
            <a href="https://www.forum.mista.ru/rules.php">Правила</a>
            <span className="separator">|</span>
            <a href="https://www.forum.mista.ru/about.php">Описание</a>
            <span className="separator">|</span>
            <b><a href="https://www.forum.mista.ru/ad.php">Реклама на сайте</a>  </b>
            <span className="separator">|</span>
            <a href="https://www.forum.mista.ru/find.php">Поиск</a>
            <span className="separator">|</span>
            <noindex>
                <a rel="nofollow" href="https://www.forum.mista.ru/sections_list.php" >Секции</a>
                <span className="separator">|</span>
                <a rel="nofollow" href="https://www.forum.mista.ru/sections_list.php">Рейтинг</a>
                <span className="separator">|</span>
                <a href="http://kb.mista.ru">Книга знаний</a>
                <span className="separator">|</span>
                <a href="http://wiki.mista.ru">Вики-миста (КЗ2)</a>
                <span className="separator">|</span>
                <a rel="nofollow" href="http://m.mista.ru/">Мобильная</a>
                <span className="separator">|</span>
                <a href="https://www.forum.mista.ru/archive.php">Архив</a>
                <span className="separator">|</span>
                <a href="https://www.forum.mista.ru/moders.php">Модераторы</a>
                <span className="separator">|</span>
                <a href="https://www.forum.mista.ru/users_gallery.php">Галерея</a>
                <span className="separator">|</span>
                <span>18+</span>
            </noindex>
        </footer>
    )
}

export default NavBarFooter;