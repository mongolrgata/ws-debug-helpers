Доступно
---
#### Object.prototype ####
*   `getPrototypeChain` ( )  
    Получение цепочки прототипов объекта.

#### String.prototype ####
*   `lJust` ( _width_ **[** , _fillChar_ **]** )  
    Выравнивание строки по левому краю.
*   `rJust` ( _width_ **[** , _fillChar_ **]** )  
    Выравнивание строки по правому краю.
*   `center` ( _width_ **[** , _fillChar_ **]** )  
    Выравнивание строки по центру.

#### Function.prototype ####
*   `isAnonymous` ( )  
    Проверка функции на анонимность.

#### window ####
*   `damnControl` ( _controlNameOrId_ )  
    Получение контрола по имени или идентификатору (с приоритетом по имени).
*   `damnControls` ( )  
    Вывод списка всех контролов в консоль.
*   `BLObjectC` ( _fullMethodName_ **[** , _params_, _type_, _...args_ **]** )  
    Вызов метода БЛ.
*   `BLObjectQ` ( _fullMethodName_ **[** , _params_, _...args_ **]** )  
    Вызов списочного метода БЛ.
*   `logControlEventsGUI` ( )  
    Вывод в консоль оповещений о наступлении какого-либо события у контрола.

Ожидается
---
#### Array.prototype ####
*   `toConsole` ( )  
    Вывод массива в консоль.

#### window ####
*   `selectControlGUI` ( )  
    Выбор контрола.
