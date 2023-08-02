# React.Mista

Клиент для форума [Миста](https://forum.mista.ru)<br>
Для получения данных используется [API](https://wiki.mista.ru/doku.php?id=life:forum:ajax-api)<br>

## Дополнительные функции
* Адаптивный дизайн - работает как на ПК так и на мобильном
* Темная тема
* Тултипы (отображение текста поста)
  * При наведении на номер поста в ответе
  * Тултип ссылки на другую ветку форума
* Предпросмотр постов на главной странице
  * Открытие 0 / последнего поста
  * Перемещение по постам вперед/назад
* Обработка ссылок
  * Починка битых ссылок
  * Получение залголовка для ютюб видео
  * Замена ссылок обратно на infostart.ru
* Подсвечивание автора и себя
* Сохранение всех настроек

## Используемые технологии:
* Язык: TypeScript
* Бойлерплейт:  [Create React App](https://github.com/facebookincubator/create-react-app)
* Управление состоянием: [Redux](https://redux.js.org/)
* Компоненты: [Bootstrap](https://react-bootstrap.github.io/)
* Настройка Webpack: [Craco](https://craco.js.org/)
* Тестирование: Jest / React Testing Library
* [Storybook](https://storybook.js.org/)

Рабочую версию проекта можно посмотреть на [github.pages](https://a-sitnikov.github.io/react.mista/)<br>
[Storybook](https://64ca3f44dd931147ddba3ee9-ghjjzmgfpn.chromatic.com/) проекта<br>
P.S. В данный момент на сайте mista.ru не поддреживается выполнение запросов с других аресов (CORS) 
поэтому функционал написания сообщений и постов не работает