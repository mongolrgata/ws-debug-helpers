/**
 * Created with JetBrains WebStorm.
 * User: mongolrgata
 * Date: 28.07.13
 * Time: 22:40
 */

(function () {
    "use strict";

    function stealthPropertyConfiguration(value) {
        return {configurable : true, enumerable : false, writable : true, value : value};
    }

    Object.defineProperty(Object.prototype, 'getPrototypeChain', stealthPropertyConfiguration(
        function () {
            var
                self = this,
                res = [self];
            while (self) {
                res.unshift(self = Object.getPrototypeOf(self));
            }
            return res;
        })
    );

    Object.defineProperty(Array.prototype, 'toConsole', stealthPropertyConfiguration(
        function () {
            // TODO
        })
    );

    /**
     * Определение метода toString для всех классов платформы,
     * чтобы в консоли Firebug выводились их имена, а не просто Object{...}
     *
     * setInterval потому, что модули платформы грузятся по необходимости, а не все сразу
     */
    setInterval(function defineToString() {
        if ($ws && $ws.proto) {
            for (let className in $ws.proto) {
                if ($ws.proto.hasOwnProperty(className) && !$ws.proto[className].prototype.hasOwnProperty('toString')) {
                    let objectClassName = '[object ' + className + ']';

                    $ws.proto[className].prototype.toString = function () {
                        return objectClassName;
                    }
                }
            }
        }

        return defineToString;
    }.call(), 2000);

    /**
     * Разделение полного имени метода на имя обекта БЛ и имя метода
     * @param {String} fullMethodName полное имя метода (вместе с именем объекта БЛ через точку)
     * @returns {{objectName: {String}, methodName: {String}}}
     */
    function splitMethodName(fullMethodName) {
        var splitName = fullMethodName.split('.');
        return {
            objectName : splitName[0],
            methodName : splitName[1]
        }
    }

    var helpersMap = {
        /**
         * Получение контрола по имени или идентификатору (с приоритетом по имени). Не кидает исключения, если контрол не найден
         * @param controlNameOrId имя или идентификатор
         * @returns {undefined|$ws.proto.Control}
         */
        damnControl : function (controlNameOrId) {
            if ($ws.single.ControlStorage.containsByName(controlNameOrId))
                return $ws.single.ControlStorage.getByName(controlNameOrId);
            if ($ws.single.ControlStorage.contains(controlNameOrId))
                return $ws.single.ControlStorage.get(controlNameOrId);
        },

        /**
         * Вызов метода БЛ
         * @param {String} fullMethodName полное имя метода (вместе с именем объекта БЛ через точку)
         * @param {Object} [params={}] аргументы
         * @param {'asis'|'record'|'recordset'} [type='asis'] тип результата
         * @param args
         * @returns {$ws.proto.Deferred}
         */
        BLObjectC : function (fullMethodName, params, type, ...args) {
            var splitName = splitMethodName(fullMethodName);
            return $ws.proto.ClientBLObject.prototype.call.apply(new $ws.proto.BLObject(splitName.objectName), [splitName.methodName, params || {}, $ws.proto.BLObject['RETURN_TYPE_' + (type || 'ASIS').toUpperCase()]].concat(args));
        },

        /**
         * Вызов списочного метода БЛ
         * @param {String} fullMethodName полное имя списочного метода (вместе с именем объекта БЛ через точку)
         * @param {Object} [params={}] фильтр
         * @param args
         * @returns {$ws.proto.Deferred}
         */
        BLObjectQ : function (fullMethodName, params, ...args) {
            var splitName = splitMethodName(fullMethodName);
            return $ws.proto.ClientBLObject.prototype.query.apply(new $ws.proto.BLObject(splitName.objectName), [splitName.methodName, params || {}].concat(args));
        },

        controlSelectGUI : function () {
            var storage = $ws.single.ControlStorage.getControls();

            for (let key in storage) {
                if (storage.hasOwnProperty(key) && typeof(storage[key].getContainer) === 'function') {
                    let
                        control = storage[key],
                        controlContainer = control.getContainer();

                    controlContainer.append($('<div/>').css({
                        position : 'absolute',
                        bottom   : 0,
                        left     : 0,
                        right    : 0,
                        top      : 0
                    }).mouseover(
                        function () {
                            $(this).css('background', 'rgba(255,0,0,0.5)');
                        }
                    ).mouseout(
                        function () {
                            $(this).css('background', 'transparent');
                        }
                    ).click(
                        function (event) {
                            event.stopPropagation();
                            $('.div-cover').remove();
                            console.log(control);
                        }
                    ).addClass('div-cover'));
                }
            }
        }
    };

    var global = (0 || eval)('this');
    for (let name in helpersMap) {
        if (helpersMap.hasOwnProperty(name))
            global[name] = helpersMap[name];
    }

    $(document).ready(function () {
        // TODO
    });
})();
