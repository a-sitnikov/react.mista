import React, { ReactElement } from 'react'
import { domain } from 'src/api'

const NavBarFooter = (): ReactElement => {

    return (
        <footer className="flex-row navbar-footer">
            <a href={`${domain}/rules.php`}>Правила</a>
            <span className="separator">|</span>
            <a href={`${domain}/about.php`}>Описание</a>
            <span className="separator">|</span>
            <b><a href={`${domain}/ad.php`}>Реклама на сайте</a>  </b>
            <span className="separator">|</span>
            <a href={`${domain}/find.php`}>Поиск</a>
            <span className="separator">|</span>
            <a rel="nofollow" href={`${domain}/sections_list.php`}>Секции</a>
            <span className="separator">|</span>
            <a rel="nofollow" href={`${domain}/rating.php`}>Рейтинг</a>
            <span className="separator">|</span>
            <a href="http://kb.mista.ru">Книга знаний</a>
            <span className="separator">|</span>
            <a href="http://wiki.mista.ru">Вики-миста (КЗ2)</a>
            <span className="separator">|</span>
            <a rel="nofollow" href="http://m.mista.ru/">Мобильная</a>
            <span className="separator">|</span>
            <a href={`${domain}/archive.php`}>Архив</a>
            <span className="separator">|</span>
            <a href={`${domain}/moders.php`}>Модераторы</a>
            <span className="separator">|</span>
            <a href={`${domain}/users_gallery.php`}>Галерея</a>
            <span className="separator">|</span>
            <span>18+</span>
        </footer>
    )
}

export default NavBarFooter;