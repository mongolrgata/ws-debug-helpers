/**
 * Created with JetBrains WebStorm.
 * User: mongolrgata
 * Date: 28.07.13
 * Time: 22:40
 */

/**
 * Вызов метода БЛ
 * @param {string} fullMethodName полное имя метода (вместе с именем объекта БЛ через точку)
 * @param {Object} [params={}] аргументы
 * @param {'asis'|'record'|'recordset'} [type='asis'] тип результата
 * @param args
 * @returns {$ws.proto.Deferred}
 */
function BLObjectC(fullMethodName, params, type, ...args) {
    var splitName = fullMethodName.split('.');
    return $ws.proto.ClientBLObject.prototype.call.apply(new $ws.proto.BLObject(splitName[0]), [splitName[1], params || {}, $ws.proto.BLObject['RETURN_TYPE_' + (type || 'ASIS').toUpperCase()]].concat(args));
}

/**
 * Вызов списочного метода БЛ
 * @param {string} fullMethodName полное имя списочного метода (вместе с именем объекта БЛ через точку)
 * @param {Object} [params={}] фильтр
 * @param args
 * @returns {$ws.proto.Deferred}
 */
function BLObjectQ(fullMethodName, params, ...args) {
    var splitName = fullMethodName.split('.');
    return $ws.proto.ClientBLObject.prototype.query.apply(new $ws.proto.BLObject(splitName[0]), [splitName[1], params || {}].concat(args));
}
