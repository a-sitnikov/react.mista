import React, { Component } from 'react'
import { childrenToText } from 'src/utils'
import './code1c.css'
    
function highLightSyntax(text) {

    const keywords = new Set(
        "|if|если|then|тогда|elsif|иначеесли|else|иначе|endif|конецесли|do|цикл|for|для|to|по|each|каждого|in|из|while|пока|enddo|конеццикла|procedure|процедура|endprocedure|конецпроцедуры|function|функция|endfunction|конецфункции|var|перем|export|экспорт|goto|перейти|and|и|or|или|not|не|val|знач|break|прервать|continue|продолжить|return|возврат|try|попытка|except|исключение|endtry|конецпопытки|raise|вызватьисключение|false|ложь|true|истина|undefined|неопределено|null|new|новый|execute|выполнить|"
            .split('|')
    );

    const Спецсиволы = new Set("():;.,=+-*<>?[]%/".split(''));
    const НачалоТега = "<span class=";
    const КонецТега = "</span>";

    const мЦветФона = "bg>";
    const мЦветЧисла = "num>";
    const мЦветСтроки = "str>";
    //const мЦветПараметра = "par>";
    const мЦветКомментария = "com>";
    const мЦветСпецСимвола = "sp>";
    const мЦветПрепроцессора = "pr>";
    const мЦветКлючевогоСлова1 = "key>";


    let СтрокаРезультат;
    let УстановленЦвет;
    let ПоследнийЦвет;

    let ВСтроке = false;
    let Токен = "";

    function ПустаяСтрока(Строка) {
        return Строка.trim() === '';
    }

    function Сред(Строка, Нач, Длина) {
        return Строка.substr(Нач - 1, Длина);
    }

    function Прав(Строка, Длина) {
        return Строка.substr(-Длина);
    }

    function isKeyword(token) {
        return keywords.has(token.toLowerCase());
    }

    function ДобавитьЧастьСтроки1С(Часть, Цвет) {

        if (Часть === " " || ПоследнийЦвет === Цвет) {
            СтрокаРезультат = СтрокаРезультат + Часть;
        } else {
            if (УстановленЦвет) {
                СтрокаРезультат = СтрокаРезультат + КонецТега;
                УстановленЦвет = false;
            };

            СтрокаРезультат = СтрокаРезультат + НачалоТега + Цвет + Часть;
            УстановленЦвет = true;
            ПоследнийЦвет = Цвет;
        };
    }

    function РазукраситьСтроку(СтрокаКода) {

        //  https://infostart.ru/profile/34707/public/
        let ВСтрокеСкобка = false;
        let ВСтрокеТильда = false;
        let НачалоСтроки = 1;
        let ТокенДоТочки = true;
        // Заменяем 8 символьную табуляцию на 4 символьную пробелами

        // Последовательно перебираются все символы строки кода
        let Поз = 1;
        for (Поз = 1; Поз <= СтрокаКода.length; Поз++) {

            let ТекущийСимвол = СтрокаКода.charAt(Поз - 1);
            if (ВСтроке) {

                // Операции встрече символа "кавычка"
                if (ТекущийСимвол === '"') {
                    // Нашли парную кавычку - окрашиваем как строку
                    ДобавитьЧастьСтроки1С(Сред(СтрокаКода, НачалоСтроки, Поз - НачалоСтроки + 1), мЦветСтроки);
                    ВСтроке = false;
                    Токен = "";
                    ТокенДоТочки = true;
                } else {
                    Токен = Токен + ТекущийСимвол;
                };

            } else if (ВСтрокеСкобка) {

                // Операции встрече символа "кавычка" литерал
                if (ТекущийСимвол === "'") {
                    // Нашли парную скобку - окрашиваем как комментарий
                    ДобавитьЧастьСтроки1С(Сред(СтрокаКода, НачалоСтроки, Поз - НачалоСтроки + 1), мЦветСтроки);
                    ВСтрокеСкобка = false;
                    Токен = "";
                    ТокенДоТочки = true;
                } else {
                    Токен = Токен + ТекущийСимвол;
                };

            } else if (ТекущийСимвол === " ") {
                // Операции при встрече символа табуляции или пробела
                if (!ПустаяСтрока(Токен)) {
                    // Пробел после токена, значит
                    // токен - ключевое слово...
                    if (ВСтрокеТильда) {
                        ДобавитьЧастьСтроки1С(Токен + " ", мЦветСтроки);
                        ВСтрокеТильда = false;

                    } else if (isKeyword(Токен.trim())) {
                        ДобавитьЧастьСтроки1С(Токен + " ", мЦветКлючевогоСлова1);

                    } else if (!isNaN(parseInt(Токен, 10))) {
                        ДобавитьЧастьСтроки1С(Токен + " ", мЦветЧисла);

                    } else {
                        ДобавитьЧастьСтроки1С(Токен + " ", мЦветФона);
                    };
                    Токен = "";
                } else {
                    СтрокаРезультат = СтрокаРезультат + " ";
                };
                ТокенДоТочки = true;

            } else if (Спецсиволы.has(ТекущийСимвол)) {

                // Встретился один из специальных символов
                if (!ПустаяСтрока(Токен)) {
                    // Чтобы избежать окраски метода объекта с совпадающим именем
                    // с одним из ключевых слов, проверяем текущий символ на "."
                    if (ВСтрокеТильда) {

                        ДобавитьЧастьСтроки1С(Токен, мЦветСтроки);
                        ВСтрокеТильда = false;
                        ТокенДоТочки = (ТекущийСимвол !== ".");

                    } else if (ТокенДоТочки && isKeyword(Токен)) {
                        ДобавитьЧастьСтроки1С(Токен, мЦветКлючевогоСлова1);
                        ТокенДоТочки = (ТекущийСимвол !== ".");

                    } else {
                        // Не ключевое слово - значит число
                        if (!isNaN(parseInt(Токен, 10))) {
                            ДобавитьЧастьСтроки1С(Токен, мЦветЧисла);

                        } else {
                            ДобавитьЧастьСтроки1С(Токен, мЦветФона);
                        };
                        ТокенДоТочки = (ТекущийСимвол !== ".");
                    };
                    Токен = "";
                };
                // Один из специальных символов
                if (ТекущийСимвол === "." && ПоследнийЦвет === мЦветЧисла) {
                    // Продолжение числа
                    ДобавитьЧастьСтроки1С(ТекущийСимвол, мЦветЧисла);
                    continue;

                } else if (ТекущийСимвол === "=" && Сред(СтрокаКода, Поз - 1, 1) === "<") {
                    // Знак "меньше или равно" - вторая ошибка движка Инфостарт
                    ПоследнийЦвет = undefined;

                } else if (ТекущийСимвол === "/" && Сред(СтрокаКода, Поз + 1, 1) === "/") {
                    // Проверяется на комментарий
                    ДобавитьЧастьСтроки1С(Прав(СтрокаКода, СтрокаКода.length - Поз + 1), мЦветКомментария);
                    return;
                };
                ДобавитьЧастьСтроки1С(ТекущийСимвол, мЦветСпецСимвола);

            } else if (ТекущийСимвол === '"' || ТекущийСимвол === "|") {

                // Операции встрече символа "кавычка"
                // Первая кавычка, запоминаем позицию и взводим флаг нахождения в строке
                if (ПустаяСтрока(Токен)) {
                    НачалоСтроки = Поз;
                    ВСтроке = true;
                } else {
                    // Ошибка синтаксиса
                    ДобавитьЧастьСтроки1С(Токен + ТекущийСимвол, мЦветСтроки);
                    Токен = "";
                };
                ТокенДоТочки = true;

            } else if (ТекущийСимвол === "'") {

                // Операции встрече символа "кавычка" литерал
                // Первая кавычка, запоминаем позицию и взводим флаг нахождения в строке
                if (ПустаяСтрока(Токен)) {
                    НачалоСтроки = Поз;
                    ВСтрокеСкобка = true;
                } else {
                    // Ошибка синтаксиса
                    ДобавитьЧастьСтроки1С(Токен + ТекущийСимвол, мЦветСтроки);
                    Токен = "";
                };
                ТокенДоТочки = true;

            } else if (ТекущийСимвол === "#" || (ТекущийСимвол === "&" && ПустаяСтрока(СтрокаРезультат))) {

                // Встретился символ препроцессора
                ДобавитьЧастьСтроки1С(Прав(СтрокаКода, СтрокаКода.length - Поз + 1), мЦветПрепроцессора);
                Поз = СтрокаКода.lenth;
                break;

            } else if (ТекущийСимвол === "~") {
                Токен = Токен + ТекущийСимвол;
                ВСтрокеТильда = true;
            } else {
                // Остальные символы
                Токен = Токен + ТекущийСимвол;
            }
        }

        if (ВСтроке) {

            // Многострочная строка
            ДобавитьЧастьСтроки1С(Сред(СтрокаКода, НачалоСтроки, Поз - НачалоСтроки + 1), мЦветСтроки);

        } else if (ВСтрокеСкобка) {

            // Незавершенный литерал
            ДобавитьЧастьСтроки1С(Сред(СтрокаКода, НачалоСтроки, Поз - НачалоСтроки + 1), мЦветСтроки);

        } else if (!ПустаяСтрока(Токен)) {

            // Анализируем последний токен строки кода
            if (isKeyword(Токен)) {
                ДобавитьЧастьСтроки1С(Токен, мЦветКлючевогоСлова1);

            } else if (!isNaN(parseInt(Токен, 10))) {
                ДобавитьЧастьСтроки1С(Токен, мЦветЧисла);

            } else {
                ДобавитьЧастьСтроки1С(Токен, мЦветФона);
            };

        };

    }

    ВСтроке = false;
    Токен = "";
    УстановленЦвет = false;
    ПоследнийЦвет = undefined;
    СтрокаРезультат = '';

    let result = [];

    for (let СтрокаКода of text.split('\n')) {

        if (ПустаяСтрока(СтрокаКода)) {
            result.push('');
            continue;
        }

        СтрокаРезультат = '';
        РазукраситьСтроку(СтрокаКода);
        if (УстановленЦвет && !ВСтроке) {
            СтрокаРезультат += '</span>';
            УстановленЦвет = false;
            Токен = '';
        } else if (!ВСтроке) {
            Токен = '';
        }

        result.push(СтрокаРезультат);
    }

    return result.join('\n');
}

class Code extends Component {

    constructor(props) {
        super(props);

        this.onShowClick = this.onShowClick.bind(this);
        this.state = {hidden: true};

        const { children } = props;
        if (children) {

            console.log(children);
            const textArr = childrenToText(children);

            this.text = textArr.join('');
            
            // replace double new-lines
            this.text = this.text
                .replace(/\n<br>/g, '\n')
                .replace(/<br>\n/g, '\n')
                .replace(/\r<br>/g, '\n')
                .replace(/<br>\r/g, '\n')
                .replace(/<br>/g, '\n');

            console.log(this.text);
            this.text = highLightSyntax(this.text);
        }
    }

    onShowClick() {
        this.setState({
            hidden: !this.state.hidden
        })
    }

    render() {

        let buttonText;
        let linesCount = 0;
        if (this.text)
            linesCount = this.text.split("\n").length;

        if (this.state.hidden)
            buttonText = `Показать: ${linesCount} строк`;
        else
            buttonText = 'Скрыть';

        let buttonShow;
        if (linesCount > 7)
            buttonShow = (
                <div className="expand-button-div">
                    <span className="expand-button-span" onClick={this.onShowClick}>{buttonText}</span>
                </div>    
            );

        let preStyle =  { 
        } 
        
        if (this.state.hidden && linesCount > 7) {
            preStyle.overflow = "hidden";
            preStyle.height   = "135px";
        } else {
            preStyle.overflow = "visible";
            preStyle.height   = "auto";
        }    

        return (
            <div style={{marginTop: "5px"}}>
                <pre className="code-pre" style={preStyle} dangerouslySetInnerHTML={{ __html: this.text }}>
                </pre>
                {buttonShow}
            </div>
        )
    }

}

export default Code;