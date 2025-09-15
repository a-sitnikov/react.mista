import { domain, domainApi } from "src/api";
import Separator from "../common/separator";

const NavBarFooter: React.FC = () => {
  return (
    <footer className="flex navbar-footer">
      <a href={`${domain}/help/rules.html`}>Правила</a>
      <Separator />
      <a href={`${domain}/help/about.html`}>Описание</a>
      <Separator />
      <a href={`${domain}/vital/search`}>Поиск</a>
      <Separator />
      <a rel="nofollow" href={`${domain}/vital/sections`}>
        Секции
      </a>
      <Separator />
      <a rel="nofollow" href={`${domainApi}/rating.php`}>
        Рейтинг
      </a>
      <Separator />
      <a href="http://kb.mista.ru">Книга знаний</a>
      <Separator />
      <a href="http://wiki.mista.ru">Вики-миста (КЗ2)</a>
      <Separator />
      <a href={`${domainApi}/archive.php`}>Архив</a>
      <Separator />
      <a href={`${domainApi}/moders.php`}>Модераторы</a>
      <Separator />
      <a href={`${domainApi}/users_gallery.php`}>Галерея</a>
      <Separator />
      <a href={`${domainApi}/ban_list.php`}>Баны</a>
      <Separator />
      <span>18+</span>
    </footer>
  );
};

export default NavBarFooter;
