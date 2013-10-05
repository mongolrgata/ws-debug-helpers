### helpers.js ###
1.  `selectControlGUI`  
    Добавить сохранение последнего выбранного контрола в глобальную переменную.
2.  `_extend(foo, before)`  
    Ещё раз подумать над реализацией «функции-расширитель» (название временное).
3.  `$ws.single.ControlStorage.store` и `$ws.single.ControlStorage.remove`  
    Изменить поведение функций таким образом, чтобы контролы дополнительно сохранялись
    в ещё одной структуре типа массив (чтобы решить проблему повторяющихся идентификаторов).
4.  `Array.prototype.toConsole`  
    Сделать?
5.  Установка «таймеров»  
    Запретить повторную установку интервала.
6.  `damnControls` и `selectControlGUI`  
    Определить общий формат вывода в консоль.
8.  `wsProtoClassTree`
    Сохранение результата в `localStorage`.
10. `_findObjectPath`
    Попробовать заменить массив `was` на некий хеш.
11. `wsSingleControlStorageExtend`
    Проверить применение «функции-расширитель» (название временное),
    в параметр-функцию `before` при её вызове сейчас не передается никаких параметров

### offset vs. position ###
-   переместить в `polygon`
-   выводить координаты элемента рядом с ним (`$(elem).offset()` и `$(elem).position()`)
-   реализовать перетаскивание элемента: [Draggable div without jQuery UI](http://stackoverflow.com/questions/8569095/draggable-div-without-jquery-ui).

### polygon ###
-   создание `iframe` с любым демо из `polygon`.

### hover-menu ###
-   привести в порядок.
