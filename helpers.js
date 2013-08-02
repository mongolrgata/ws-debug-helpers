/**
 * Created with JetBrains WebStorm.
 * User: mongolrgata
 * Date: 28.07.13
 * Time: 22:40
 */

(function () {
    "use strict";

    function stealthConfiguration(value) {
        return {configurable : true, enumerable : false, writable : true, value : value};
    }

    Object.defineProperty(Object.prototype, 'getPrototypeChain', stealthConfiguration(
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

    var helpersMap = {
        /**
         * @param controlNameOrId имя или идентификатор
         * @returns {$ws.proto.Control}
         */
        damnControl : function (controlNameOrId) {
            if ($ws.single.ControlStorage.containsByName(controlNameOrId)) {
                return $ws.single.ControlStorage.getByName(controlNameOrId);
            }
            if ($ws.single.ControlStorage.contains(controlNameOrId)) {
                return $ws.single.ControlStorage.get(controlNameOrId);
            }
        },

        /**
         * Вызов метода БЛ
         * @param {string} fullMethodName полное имя метода (вместе с именем объекта БЛ через точку)
         * @param {Object} [params={}] аргументы
         * @param {'asis'|'record'|'recordset'} [type='asis'] тип результата
         * @param args
         * @returns {$ws.proto.Deferred}
         */
        BLObjectC : function (fullMethodName, params, type, ...args) {
            var splitName = fullMethodName.split('.');
            return $ws.proto.ClientBLObject.prototype.call.apply(new $ws.proto.BLObject(splitName[0]), [splitName[1], params || {}, $ws.proto.BLObject['RETURN_TYPE_' + (type || 'ASIS').toUpperCase()]].concat(args));
        },

        /**
         * Вызов списочного метода БЛ
         * @param {string} fullMethodName полное имя списочного метода (вместе с именем объекта БЛ через точку)
         * @param {Object} [params={}] фильтр
         * @param args
         * @returns {$ws.proto.Deferred}
         */
        BLObjectQ : function (fullMethodName, params, ...args) {
            var splitName = fullMethodName.split('.');
            return $ws.proto.ClientBLObject.prototype.query.apply(new $ws.proto.BLObject(splitName[0]), [splitName[1], params || {}].concat(args));
        }
    };

    var global = (0 || eval)('this');
    for (let name in helpersMap) {
        if (helpersMap.hasOwnProperty(name)) {
            global[name] = helpersMap[name];
        }
    }
})();
