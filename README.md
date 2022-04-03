# React.Mista [![Build Status](https://api.travis-ci.org/a-sitnikov/react.mista.svg?branch=master)](https://travis-ci.org/a-sitnikov/react.mista)

Клиент для форума [Миста](https://forum.mista.ru)<br>
Для получения данных используется [API](https://wiki.mista.ru/doku.php?id=life:forum:ajax-api)<br>

## Дополнительные функции
* Адаптивный дизайн - работает как на ПК так и на мобильном
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
* Бойлерплейт:  [Create React App](https://github.com/facebookincubator/create-react-app)
* Управление состоянием: [Redux / Thunk](https://github.com/reduxjs/redux-thunk)
* Статическая типизация: TypeScript
* Компоненты: [Bootstrap](https://react-bootstrap.github.io/)
* Тестирование: Jest / [Enzyme](https://airbnb.io/enzyme/)

Демо версию проекта можно посмотреть на [github.pages](https://a-sitnikov.github.io/react.mista/)