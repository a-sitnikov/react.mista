import { domain } from "src/api";
import Separator from "../common/separator";

const NavBarFooter: React.FC = () => {
  return (
    <footer className="flex navbar-footer">
      <a href={`${domain}/rules.php`}>Правила</a>
      <Separator />
      <a href={`${domain}/about.php`}>Описание</a>
      <Separator />
      <a href={`${domain}/find.php`}>Поиск</a>
      <Separator />
      <a rel="nofollow" href={`${domain}/sections_list.php`}>
        Секции
      </a>
      <Separator />
      <a rel="nofollow" href={`${domain}/rating.php`}>
        Рейтинг
      </a>
      <Separator />
      <a href="http://kb.mista.ru">Книга знаний</a>
      <Separator />
      <a href="http://wiki.mista.ru">Вики-миста (КЗ2)</a>
      <Separator />
      <a href={`${domain}/archive.php`}>Архив</a>
      <Separator />
      <a href={`${domain}/moders.php`}>Модераторы</a>
      <Separator />
      <a href={`${domain}/users_gallery.php`}>Галерея</a>
      <Separator />
      <a href={`${domain}/ban_list.php`}>Баны</a>
      <Separator />
      <span>18+</span>
    </footer>
  );
};

export default NavBarFooter;
