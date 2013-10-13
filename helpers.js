/**
 * Created with JetBrains WebStorm.
 * User: mongolrgata
 * Date: 28.07.13
 * Time: 22:40
 */

;
(function () {
    "use strict";

    if (window.wsDebugHelpers && window.wsDebugHelpers.ready) {
        _showReadyMessage();
        return;
    }

    //region Приватные функции
    /**
     * TODO описание
     * @param {jQuery} $node
     * @returns {number}
     * @private
     */
    function _maxZIndex($node) {
        return 100500;
    }

    /**
     * TODO описание
     * @private
     */
    function _showReadyMessage() {
        $(document).ready(function () {
            var
                $body = $('body'),
                $divMessageBox = $('<div/>').css({
                    position   : 'fixed',
                    top        : '16px',
                    left       : '16px',
                    padding    : '16px',
                    zIndex     : _maxZIndex($body) + 1,
                    font       : 'normal normal normal 16px Segoe UI, sans-serif',
                    background : 'indigo',
                    boxShadow  : '0 0 16px rgba(0,0,0,0.5)',
                    color      : 'white'
                }),
                $a = $('<a target="_blank" href="https://github.com/mongolrgata/ws-debug-helpers/blob/master/README.md#%D0%94%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D0%BE">ЧЗХ?</a>').css({
                    fontWeight : 'bold',
                    color      : 'white'
                });

            $body.append(
                $divMessageBox.append(
                    'Свистелки и перделки загружены. ',
                    $a
                )
            );

            $divMessageBox.hover(
                function () {
                    $divMessageBox.stop(true).animate({opacity : 1}, 0);
                },
                function () {
                    $divMessageBox.stop(true).delay(800).animate({opacity : 0}, 1600, function () {
                        $divMessageBox.remove();
                    });
                }
            ).trigger('mouseleave');
        });
    }

    /**
     * Определение «родных» свойств у объекта (с конфигурацией как у стандартного свойства)
     * @param object
     * @param properties
     * @private
     */
    function _defineStealthProperties(object, properties) {
        for (let propertyName in properties) {
            if (properties.hasOwnProperty(propertyName)) {
                var defineType = 'определить';
                if (propertyName in object)
                    defineType = object.hasOwnProperty(propertyName) ? 'переопределить' : 'перекрыть';

                try {
                    Object.defineProperty(object, propertyName, {configurable : true, enumerable : false, writable : true, value : properties[propertyName]});
                } catch (e) {
                    console.exception(e);
                    continue;
                }

                if (object[propertyName] !== properties[propertyName]) {
                    console.warn('Не удалось %s свойство %s', defineType, propertyName);
                }
            }
        }
    }

    /**
     * Получение списка контролов
     * @returns {$ws.proto.Control[]}
     * @private
     */
    function _getControlList() {
        var
            storage = $ws.single.ControlStorage.getControls(),
            result = [];

        for (let id in storage) {
            if (storage.hasOwnProperty(id)) {
                result.push(storage[id]);
            }
        }

        return result;
    }

    /**
     * Разделение полного имени метода БЛ на имя объекта и имя метода
     * @param {string} fullMethodName полное имя метода БЛ (вместе с именем объекта через точку)
     * @returns {{objectName: string, methodName: string}}
     * @private
     */
    function _splitMethodName(fullMethodName) {
        var splitName = fullMethodName.split('.');
        return {objectName : splitName[0], methodName : splitName[1]};
    }

    /**
     * Обёртка над setInterval, переданная функция вызывается сразу после установки интервала
     * @param {Function} foo
     * @param {number} delay
     * @returns {number}
     * @private
     */
    function _setIntervalImmediate(foo, delay) {
        var proxy = function () {
            foo.call(this, id);
        };

        // Важно, что сначала устанавливается интервал, и только потом вызывается функция;
        // это соответствует циклу обычного setInterval
        var id = setInterval(proxy, delay);
        proxy();

        return id;
    }

    /**
     * TODO описание
     * @param {Function} foo
     * @param {Function} before
     * @returns {Function}
     * @private
     */
    function _extend(foo, before) {
        return function () {
            before();
            return foo.apply(this, arguments);
        }
    }

    /**
     * «Анонимизация» функции (без повторной анонимизации)
     * @param {Function} foo
     * @returns {Function}
     * @private
     */
    function _anonymize(foo) {
        return function () {
            return foo.isAnonymous() ? foo : foo.apply(this, arguments);
        }
    };
    //endregion

    //region Добавление новых свойств и методов к стандартным объектам JavaScript
    _defineStealthProperties(Object.prototype,
        /** @lends Object.prototype */
        {
            /**
             * Получение цепочки прототипов объекта
             * @returns {Array}
             */
            getPrototypeChain : function getPrototypeChain() {
                var
                    self = this,
                    res = [self];

                while (self) {
                    res.unshift(self = Object.getPrototypeOf(self));
                }

                return res;
            },

            /**
             * Поиск некоторого пути до объекта относительно объекта <code>rootObject</code> обходом в глубину.
             * @param {Object} [rootObject=window]
             * @returns {string[]}
             */
            getPath : function getPath(rootObject) {
                var
                    self = this,
                    was = [], // массив посещённых узлов
                    result = null;

                (function dfs(root) {
                    if (root === self) {
                        result = [];
                        return;
                    }

                    was.push(root);

                    var propertyList = Object.getOwnPropertyNames(root);

                    for (let i = 0, n = propertyList.length; i < n; i++) {
                        var property, node;

                        try {
                            property = propertyList[i];
                            node = root[property];
                        }
                        catch (e) {
                            continue; // не удалось получить доступ к свойству
                        }

                        if (!(typeof node === 'object' && node !== null || node instanceof Object))
                            continue; // узел не является объектом

                        if (was.indexOf(node) !== -1)
                            continue; // узел уже был посещён

                        dfs(node);

                        if (result !== null) {
                            result.unshift(property);
                            return;
                        }
                    }
                })(rootObject || window);

                return result;
            }
        }
    );

    _defineStealthProperties(Array.prototype,
        /** @lends Array.prototype */
        {
            /**
             * Вывод массива в консоль
             */
            toConsole : function toConsole() {

            },

            joinPath : function joinPath() {
                return '["' + this.join('"]["') + '"]';
            }
        }
    );

    _defineStealthProperties(String.prototype,
        /** @lends String.prototype */
        {
            /**
             * Выравнивание строки по левому краю
             * @param {number} width целевая ширина строки
             * @param {string} [fillChar] символ-заполнитель
             * @returns {string}
             */
            lJust : function lJust(width, fillChar) {
                fillChar = (fillChar || ' ').charAt(0);
                return this + new Array(Math.max(0, width - this.length + 1)).join(fillChar);
            },

            /**
             * Выравнивание строки по правому краю
             * @param {number} width целевая ширина строки
             * @param {string} [fillChar] символ-заполнитель
             * @returns {string}
             */
            rJust : function rJust(width, fillChar) {
                fillChar = (fillChar || ' ').charAt(0);
                return new Array(Math.max(0, width - this.length + 1)).join(fillChar) + this;
            },

            /**
             * Выравнивание строки по центру
             * @param {number} width целевая ширина строки
             * @param {string} [fillChar] символ-заполнитель
             * @returns {string}
             */
            center : function center(width, fillChar) {
                fillChar = (fillChar || ' ').charAt(0);
                return this.rJust((+width + this.length) >> 1, fillChar).lJust(width, fillChar);
            }
        }
    );

    _defineStealthProperties(Function.prototype,
        /** @lends Function.prototype */
        {
            /**
             * Проверка функции на анонимность
             * @returns {boolean}
             */
            isAnonymous : function isAnonymous() {
                if ('name' in this) {
                    return this.name === '';
                }

                return ('' + this).match(/function (.*?)\(/)[1] === '';
            }
        }
    );

    _defineStealthProperties(window,
        /** @lends window */
        {
            /**
             * Получение контрола по имени или идентификатору (с приоритетом по имени).
             * Не кидает исключение, если контрол не найден
             * @param {string} controlNameOrId имя или идентификатор контрола
             * @returns {undefined|$ws.proto.Control}
             */
            damnControl : function damnControl(controlNameOrId) {
                if ($ws.single.ControlStorage.containsByName(controlNameOrId))
                    return $ws.single.ControlStorage.getByName(controlNameOrId);
                if ($ws.single.ControlStorage.contains(controlNameOrId))
                    return $ws.single.ControlStorage.get(controlNameOrId);
            },

            /**
             * Вывод списка всех контролов в консоль
             */
            damnControls : function damnControls() {
                var
                    controlList = _getControlList(),
                    data = [];

                for (let i = 0, n = controlList.length; i < n; ++i) {
                    let control = controlList[i];

                    data.push({
                        control   : control,
                        name      : control.getName(),
                        container : control.getContainer()
                    });
                }

                console.clear();
                console.table(data, [
                    {property : 'control', label : 'Контрол'},
                    {property : 'name', label : 'Имя'},
                    {property : 'container', label : 'Контейнер'}
                ]);
            },

            /**
             * Вызов метода БЛ
             * @param {string} fullMethodName полное имя метода БЛ
             * @param {Object} [params={}] аргументы
             * @param {'asis'|'record'|'recordset'} [type='asis'] тип результата
             * @param {...*} [args]
             * @returns {$ws.proto.Deferred}
             */
            BLObjectC : function BLObjectC(fullMethodName, params, type, ...args) {
                var splitName = _splitMethodName(fullMethodName);
                return $ws.proto.ClientBLObject.prototype.call.apply(
                    new $ws.proto.BLObject(splitName.objectName),
                    [
                        splitName.methodName,
                        params || {},
                        $ws.proto.BLObject['RETURN_TYPE_' + (type || 'ASIS').toUpperCase()]
                    ].concat(args)
                );
            },

            /**
             * Вызов списочного метода БЛ
             * @param {string} fullMethodName полное имя списочного метода БЛ
             * @param {Object} [params={}] фильтр
             * @param {...*} [args]
             * @returns {$ws.proto.Deferred}
             */
            BLObjectQ : function BLObjectQ(fullMethodName, params, ...args) {
                var splitName = _splitMethodName(fullMethodName);
                return $ws.proto.ClientBLObject.prototype.query.apply(
                    new $ws.proto.BLObject(splitName.objectName),
                    [
                        splitName.methodName,
                        params || {}
                    ].concat(args)
                );
            },

            /**
             * Выбор контрола мышкой (подобно Firebug)
             */
            selectControlGUI : function selectControlGUI() {
                var controlList = _getControlList();

                for (let i = 0, n = controlList.length; i < n; ++i) {
                    let control = controlList[i];

                    if (typeof control.getContainer === 'function') {
                        let controlContainer = control.getContainer();

                        controlContainer.append(
                            $('<div/>').css(
                                {
                                    position : 'absolute',
                                    bottom   : 0,
                                    left     : 0,
                                    right    : 0,
                                    top      : 0
                                }
                            ).bind(
                                {
                                    mouseenter : function () {
                                        $(this).css('background', 'rgba(255,0,0,0.5)');
                                    },

                                    mouseleave : function () {
                                        $(this).css('background', 'transparent');
                                    },

                                    click : function (event) {
                                        event.stopPropagation();
                                        $('.ws-debug-helpers.div-cover').remove();

                                        console.log(control, '"' + control.getName() + '"', control.getContainer());
                                    }
                                }
                            ).addClass('ws-debug-helpers div-cover')
                        );
                    }
                }
            },

            /**
             * TODO описание
             */
            selectControlGUI_experimental : function selectControlGUI_experimental() {
                var controlList = _getControlList();

                for (let i = 0, n = controlList.length; i < n; ++i) {
                    let control = controlList[i];

                    if (typeof control.getContainer === 'function') {
                        let controlContainer = control.getContainer();

                        controlContainer.append(
                            $('<div/>').css(
                                {
                                    position   : 'absolute',
                                    left       : 0,
                                    top        : 0,
                                    width      : '10px',
                                    height     : '10px',
                                    background : 'rgba(255,0,0,0.2)'
                                }
                            ).bind(
                                {
                                    click : function () {
                                        console.log(control, '"' + control.getName() + '"', control.getContainer());
                                    }
                                }
                            )
                        );
                    }
                }
            },

            /**
             * Вывод в консоль оповещений о наступлении какого-либо события у контрола
             * @param {string} [controlNameOrId] имя или идентификатор контрола
             */
            logControlEventsGUI : function logControlEventsGUI(controlNameOrId) {
                if (arguments.length === 0) {
                    if ((controlNameOrId = prompt('Введите имя или идентификатор контрола')) === null) {
                        return;
                    }
                }

                var
                    control = damnControl(controlNameOrId),
                    controlEvents = control._events; // Dr. HAX негодует

                for (let eventName in controlEvents) {
                    if (controlEvents.hasOwnProperty(eventName)) {
                        control.subscribe(eventName, function (eventObject) {
                            console.log(this.getName(), eventObject._eventName); // Dr. HAX негодует
                        });
                    }
                }
            },

            wsDebugHelpers : {
                ready : true
            }
        }
    );
    //endregion

    //region Установка «таймеров»
    /**
     * TODO описание
     */
    _setIntervalImmediate(function wsSingleControlStorageExtend(id) {
        if (typeof $ws === 'undefined' || !$ws.single || !$ws.single.ControlStorage)
            return;

        var controlList = _getControlList();

        $ws.single.ControlStorage.store = _extend($ws.single.ControlStorage.store, function (control) {
            controlList.push(control);
        });

        $ws.single.ControlStorage.remove = _extend($ws.single.ControlStorage.remove, function (control) {
            for (let i = 0, n = controlList.length; i < n; ++i) {
                if (control === controlList[i]) {
                    controlList.splice(i, 1);
                    break;
                }
            }
        });

        clearInterval(id);
    }, 200);

    /**
     * Анонимизация функции конструктора и определение метода toString для всех классов платформы,
     * чтобы в консоли Firebug выводились их имена, а не просто Object {...}
     *
     * _setIntervalImmediate потому, что модули платформы грузятся по необходимости, а не все сразу
     */
    _setIntervalImmediate(function wsProtoClassName() {
        if (typeof $ws === 'undefined' || !$ws.proto)
            return;

        for (let className in $ws.proto) {
            if ($ws.proto.hasOwnProperty(className) && typeof $ws.proto[className] === 'function') {
                if (typeof $ws.proto[className].prototype.constructor === 'function') {
                    $ws.proto[className].prototype.constructor = _anonymize($ws.proto[className].prototype.constructor);
                }

                if (!$ws.proto[className].prototype.hasOwnProperty('toString')) {
                    let objectClassName = '[object ' + className + ']';

                    $ws.proto[className].prototype.toString = function () {
                        return objectClassName;
                    }
                }
            }
        }
    }, 1000);

    /**
     * Генерация дерева наследования классов платформы
     */
    _setIntervalImmediate(function wsProtoClassTree() {
        if (typeof $ws === 'undefined' || !$ws.proto)
            return;

        var classHierarchy = {};

        for (let classNameA in $ws.proto) {
            if ($ws.proto.hasOwnProperty(classNameA) && typeof $ws.proto[classNameA] === 'function') {
                classHierarchy[classNameA] = [];

                for (let classNameB in $ws.proto) {
                    if ($ws.proto.hasOwnProperty(classNameB) && typeof $ws.proto[classNameB] === 'function') {
                        if ($ws.proto[classNameA].prototype instanceof $ws.proto[classNameB]) {
                            classHierarchy[classNameA].push(classNameB);
                        }
                    }
                }
            }
        }
    }, 20000);
    //endregion

    _showReadyMessage();
})();
