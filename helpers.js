/**
 * Created with JetBrains WebStorm.
 * User: mongolrgata
 * Date: 28.07.13
 * Time: 22:40
 */

(function () {
    "use strict";

    /**
     * TODO описание
     * @param {Object} object объект
     * @param {String} propertyName имя свойства
     * @param {*} value значение свойства
     */
    function defineStealthProperty(object, propertyName, value) {
        if (propertyName in object) {
            console.warn('Попытка %s свойство %s.%s', object.hasOwnProperty(propertyName) ? 'переопределить' : 'перекрыть', object.toString(), propertyName);
        }

        Object.defineProperty(object, propertyName, {configurable : true, enumerable : false, writable : true, value : value});
    }

    defineStealthProperty(Object.prototype, 'getPrototypeChain', function () {
        var
            self = this,
            res = [self];

        while (self) {
            res.unshift(self = Object.getPrototypeOf(self));
        }

        return res;
    });

    defineStealthProperty(Array.prototype, 'toConsole', function () {
        // TODO
    });

    /**
     * Определение метода toString для всех классов платформы,
     * чтобы в консоли Firebug выводились их имена, а не просто Object {...}
     *
     * setInterval потому, что модули платформы грузятся по необходимости, а не все сразу
     */
    setInterval(function defineToString() {
        if (typeof($ws) !== 'undefined' && $ws.proto) {
            for (let className in $ws.proto) {
                if ($ws.proto.hasOwnProperty(className) && typeof($ws.proto[className]) === 'function') {
                    if (!$ws.proto[className].prototype.hasOwnProperty('toString')) {
                        let objectClassName = '[object ' + className + ']';

                        $ws.proto[className].prototype.toString = function () {
                            return objectClassName;
                        }
                    }
                }
            }
        }

        return defineToString;
    }.call(), 1000);

    /**
     * TODO описание
     */
    setInterval(function updateClassHierarchy() {
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

        // TODO сохранение в localStorage

        return updateClassHierarchy;
    }.call(), 20000);

    /**
     * Разделение полного имени метода БЛ на имя объекта и имя метода
     * @param {String} fullMethodName полное имя метода БЛ (вместе с именем объекта через точку)
     * @returns {{objectName: {String}, methodName: {String}}}
     */
    function splitMethodName(fullMethodName) {
        var splitName = fullMethodName.split('.');
        return {objectName : splitName[0], methodName : splitName[1]};
    }

    /** @lends window */
    var helpersMap = {
        /**
         * Получение контрола по имени или идентификатору (с приоритетом по имени). Не кидает исключение, если контрол не найден
         * @param controlNameOrId имя или идентификатор контрола
         * @returns {undefined|$ws.proto.Control}
         */
        damnControl : function damnControl(controlNameOrId) {
            if ($ws.single.ControlStorage.containsByName(controlNameOrId))
                return $ws.single.ControlStorage.getByName(controlNameOrId);
            if ($ws.single.ControlStorage.contains(controlNameOrId))
                return $ws.single.ControlStorage.get(controlNameOrId);
        },

        /**
         * Вызов метода БЛ
         * @param {String} fullMethodName полное имя метода БЛ
         * @param {Object} [params={}] аргументы
         * @param {'asis'|'record'|'recordset'} [type='asis'] тип результата
         * @param args
         * @returns {$ws.proto.Deferred}
         */
        BLObjectC : function BLObjectC(fullMethodName, params, type, ...args) {
            var splitName = splitMethodName(fullMethodName);
            return $ws.proto.ClientBLObject.prototype.call.apply(new $ws.proto.BLObject(splitName.objectName), [splitName.methodName, params || {}, $ws.proto.BLObject['RETURN_TYPE_' + (type || 'ASIS').toUpperCase()]].concat(args));
        },

        /**
         * Вызов списочного метода БЛ
         * @param {String} fullMethodName полное имя списочного метода БЛ
         * @param {Object} [params={}] фильтр
         * @param args
         * @returns {$ws.proto.Deferred}
         */
        BLObjectQ : function BLObjectQ(fullMethodName, params, ...args) {
            var splitName = splitMethodName(fullMethodName);
            return $ws.proto.ClientBLObject.prototype.query.apply(new $ws.proto.BLObject(splitName.objectName), [splitName.methodName, params || {}].concat(args));
        },

        /**
         * Выбор контрола мышкой (подобно Firebug)
         */
        selectControlGUI : function selectControlGUI() {
            var storage = $ws.single.ControlStorage.getControls();

            for (let key in storage) {
                if (storage.hasOwnProperty(key) && typeof(storage[key].getContainer) === 'function') {
                    let
                        control = storage[key],
                        controlContainer = control.getContainer();

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

                                    // TODO сохранение выбранного контрола в глобальную переменную lastSelectedControl (или типа того)
                                    console.log(control, '"' + control.getName() + '"');
                                }
                            }
                        ).addClass('ws-debug-helpers div-cover')
                    );
                }
            }
        },

        /**
         * Вывод в консоль оповещений о наступлении какого-либо события у контрола
         * @param {String} [controlNameOrId] имя или идентификатор контрола
         */
        logControlEventsGUI : function (controlNameOrId) {
            if (arguments.length === 0) {
                if ((controlNameOrId = prompt('Введите имя или идентификатор контрола')) === null) {
                    return;
                }
            }

            var
                control = damnControl(controlNameOrId),
                controlEvents = control._events; // TODO Dr. HAX негодует

            for (let eventName in controlEvents) {
                if (controlEvents.hasOwnProperty(eventName)) {
                    control.subscribe(eventName, function (eventObject) {
                        // TODO доработать формат
                        console.log(this.getName(), eventObject._eventName); // TODO Dr. HAX негодует
                    });
                }
            }
        }
    };

    var global = (0 || eval)('this');
    for (let name in helpersMap) {
        if (helpersMap.hasOwnProperty(name)) {
            defineStealthProperty(global, name, helpersMap[name]);
        }
    }

    $(document).ready(function () {
        // TODO ну ты понел
        console.log('Свистелки и перделки загружены');
    });
})();
