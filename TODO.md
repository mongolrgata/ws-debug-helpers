helpers.js
---
1.  `selectControlGUI`  
    Добавить сохранение последнего выбранного контрола в глобальную переменную.
2.  `_extend(foo, before)`  
    Ещё раз подумать над реализацией «функции-расширитель» (название временное).
3.  `$ws.single.ControlStorage.store` и `$ws.single.ControlStorage.remove`  
    Изменить поведение функций таким образом, чтобы контролы дополнительно сохранялись
    в ещё одной структуре типа массив (чтобы решить проблему повторяющихся идентификаторов).
4.  `Array.prototype.toConsole`  
    Сделать?
6.  `damnControls` и `selectControlGUI`  
    Определить общий формат вывода в консоль.
7.  `wsProtoClassTree`  
    Сохранение результата в `localStorage`.
8.  `_objectPath`  
    Попробовать заменить массив `was` на некий хеш.
9.  `wsSingleControlStorageExtend`  
    Проверить применение «функции-расширитель» (название временное),
    в параметр-функцию `before` при её вызове сейчас не передается никаких параметров.
10. `$divMessage`
    Добавить крестик закрывающий сообщение
11. `_maxZIndex`
    Сделать поиск элемента в ноде с максимальным zIndex.
12. `Object.prototype.getPath`
    Сделать. Решить проблему зависимости от _defineStealthProperties.
13. `Array.prototype.joinPath`
    Склеивать свойства-идентификаторы через точку.

offset vs. position
---
-   переместить в `polygon`
-   выводить координаты элемента рядом с ним (`$(elem).offset()` и `$(elem).position()`)
-   реализовать перетаскивание элемента: [Draggable div without jQuery UI](http://stackoverflow.com/questions/8569095/draggable-div-without-jquery-ui)

polygon
---
-   создание `iframe` с любым демо из `polygon`

hover-menu
---
-   привести в порядок
