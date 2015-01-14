System.registerModule("../helpers.js", [], function(require) {
  "use strict";
  var __moduleName = "../helpers.js";
  ;
  (function() {
    "use strict";
    function _defineStealthProperties(object, properties) {
      for (var propertyName in properties)
        if (!$traceurRuntime.isSymbolString(propertyName)) {
          if (properties.hasOwnProperty(propertyName)) {
            var defineType = 'определить';
            if ($traceurRuntime.toProperty(propertyName) in object)
              defineType = object.hasOwnProperty(propertyName) ? 'переопределить' : 'перекрыть';
            try {
              Object.defineProperty(object, propertyName, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: properties[$traceurRuntime.toProperty(propertyName)]
              });
            } catch (e) {
              console.exception(e);
              continue;
            }
            if (object[$traceurRuntime.toProperty(propertyName)] !== properties[$traceurRuntime.toProperty(propertyName)]) {
              console.warn('Не удалось %s свойство %s', defineType, propertyName);
            }
          }
        }
    }
    function _getControlList() {
      var storage = $ws.single.ControlStorage.getControls(),
          result = [];
      for (var id in storage)
        if (!$traceurRuntime.isSymbolString(id)) {
          if (storage.hasOwnProperty(id)) {
            result.push(storage[$traceurRuntime.toProperty(id)]);
          }
        }
      return result;
    }
    function _splitMethodName(fullMethodName) {
      var splitName = fullMethodName.split('.');
      return {
        objectName: splitName[0],
        methodName: splitName[1]
      };
    }
    function _setIntervalImmediate(foo, delay) {
      var proxy = function() {
        foo.call(this, id);
      };
      var id = setInterval(proxy, delay);
      proxy();
      return id;
    }
    function _anonymize(foo) {
      return function() {
        return foo.isAnonymous() ? foo : foo.apply(this, arguments);
      };
    }
    _defineStealthProperties(Object.prototype, {
      getPrototypeChain: function getPrototypeChain() {
        var self = this,
            res = [self];
        while (self) {
          res.unshift(self = Object.getPrototypeOf(self));
        }
        return res;
      },
      getPath: function getPath(rootObject) {
        var self = this,
            was = [],
            result = null;
        (function dfs(root) {
          if (root === self) {
            result = [];
            return;
          }
          was.push(root);
          var propertyList = Object.getOwnPropertyNames(root);
          for (var i = 0,
              n = propertyList.length; i < n; i++) {
            var property,
                node;
            try {
              property = propertyList[$traceurRuntime.toProperty(i)];
              node = root[$traceurRuntime.toProperty(property)];
            } catch (e) {
              continue;
            }
            if (!((typeof node === 'undefined' ? 'undefined' : $traceurRuntime.typeof(node)) === 'object' && node !== null || node instanceof Object))
              continue;
            if (was.indexOf(node) !== -1)
              continue;
            dfs(node);
            if (result !== null) {
              result.unshift(property);
              return;
            }
          }
        })(rootObject || window);
        return result;
      }
    });
    _defineStealthProperties(Array.prototype, {
      toConsole: function toConsole() {},
      joinPath: function joinPath() {
        return '["' + this.join('"]["') + '"]';
      }
    });
    _defineStealthProperties(String.prototype, {
      lJust: function lJust(width, fillChar) {
        fillChar = (fillChar || ' ').charAt(0);
        return this + new Array(Math.max(0, width - this.length + 1)).join(fillChar);
      },
      rJust: function rJust(width, fillChar) {
        fillChar = (fillChar || ' ').charAt(0);
        return new Array(Math.max(0, width - this.length + 1)).join(fillChar) + this;
      },
      center: function center(width, fillChar) {
        fillChar = (fillChar || ' ').charAt(0);
        return this.rJust((+width + this.length) >> 1, fillChar).lJust(width, fillChar);
      }
    });
    _defineStealthProperties(Function.prototype, {isAnonymous: function isAnonymous() {
        if ('name' in this) {
          return this.name === '';
        }
        return ('' + this).match(/function (.*?)\(/)[1] === '';
      }});
    _defineStealthProperties(window, {
      damnControl: function damnControl(controlNameOrId) {
        if ($ws.single.ControlStorage.containsByName(controlNameOrId))
          return $ws.single.ControlStorage.getByName(controlNameOrId);
        if ($ws.single.ControlStorage.contains(controlNameOrId))
          return $ws.single.ControlStorage.get(controlNameOrId);
      },
      damnControls: function damnControls() {
        var controlList = _getControlList(),
            data = [];
        for (var i = 0,
            n = controlList.length; i < n; ++i) {
          var control = controlList[$traceurRuntime.toProperty(i)];
          data.push({
            control: control,
            name: control.getName(),
            container: control.getContainer()
          });
        }
        console.clear();
        console.table(data, [{
          property: 'control',
          label: 'Контрол'
        }, {
          property: 'name',
          label: 'Имя'
        }, {
          property: 'container',
          label: 'Контейнер'
        }]);
      },
      BLObjectC: function BLObjectC(fullMethodName, params, type) {
        for (var args = [],
            $__0 = 3; $__0 < arguments.length; $__0++)
          args[$traceurRuntime.toProperty($__0 - 3)] = arguments[$traceurRuntime.toProperty($__0)];
        var splitName = _splitMethodName(fullMethodName);
        return $ws.proto.ClientBLObject.prototype.call.apply(new $ws.proto.BLObject(splitName.objectName), [splitName.methodName, params || {}, $ws.proto.BLObject[$traceurRuntime.toProperty('RETURN_TYPE_' + (type || 'ASIS').toUpperCase())]].concat(args));
      },
      BLObjectQ: function BLObjectQ(fullMethodName, params) {
        for (var args = [],
            $__1 = 2; $__1 < arguments.length; $__1++)
          args[$traceurRuntime.toProperty($__1 - 2)] = arguments[$traceurRuntime.toProperty($__1)];
        var splitName = _splitMethodName(fullMethodName);
        return $ws.proto.ClientBLObject.prototype.query.apply(new $ws.proto.BLObject(splitName.objectName), [splitName.methodName, params || {}].concat(args));
      },
      selectControlGUI: function selectControlGUI() {
        var controlList = _getControlList();
        var $__2 = function(i, n) {
          var control = controlList[$traceurRuntime.toProperty(i)];
          if (typeof control.getContainer === 'function') {
            var controlContainer = control.getContainer();
            controlContainer.append($('<div/>').css({
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0
            }).bind({
              mouseenter: function() {
                $(this).css('background', 'rgba(255,0,0,0.5)');
              },
              mouseleave: function() {
                $(this).css('background', 'transparent');
              },
              click: function(event) {
                event.stopPropagation();
                $('.ws-debug-helpers.div-cover').remove();
                console.log(control, '"' + control.getName() + '"', control.getContainer());
              }
            }).addClass('ws-debug-helpers div-cover'));
          }
        };
        for (var i = 0,
            n = controlList.length; i < n; ++i) {
          $__2(i, n);
        }
      },
      selectControlGUI_experimental: function selectControlGUI_experimental() {
        var controlList = _getControlList();
        var $__3 = function(i, n) {
          var control = controlList[$traceurRuntime.toProperty(i)];
          if (typeof control.getContainer === 'function') {
            var controlContainer = control.getContainer();
            controlContainer.append($('<div/>').css({
              position: 'absolute',
              left: 0,
              top: 0,
              width: '10px',
              height: '10px',
              background: 'rgba(255,0,0,0.2)'
            }).bind({click: function() {
                console.log(control, '"' + control.getName() + '"', control.getContainer());
              }}));
          }
        };
        for (var i = 0,
            n = controlList.length; i < n; ++i) {
          $__3(i, n);
        }
      },
      logControlEventsGUI: function logControlEventsGUI(controlNameOrId) {
        if (arguments.length === 0) {
          if ((controlNameOrId = prompt('Введите имя или идентификатор контрола')) === null) {
            return;
          }
        }
        var control = damnControl(controlNameOrId),
            controlEvents = control._eventBusChannel._events;
        for (var eventName in controlEvents)
          if (!$traceurRuntime.isSymbolString(eventName)) {
            if (controlEvents.hasOwnProperty(eventName)) {
              control.subscribe(eventName, function(eventObject) {
                console.log(this.getName(), eventObject._eventName);
              });
            }
          }
      }
    });
    _setIntervalImmediate(function wsProtoClassName() {
      if (typeof $ws === 'undefined' || !$ws.proto)
        return;
      var $__4 = function(className) {
        if ($ws.proto.hasOwnProperty(className) && typeof $ws.proto[$traceurRuntime.toProperty(className)] === 'function') {
          if (typeof $ws.proto[$traceurRuntime.toProperty(className)].prototype.constructor === 'function') {
            $ws.proto[$traceurRuntime.toProperty(className)].prototype.constructor = _anonymize($ws.proto[$traceurRuntime.toProperty(className)].prototype.constructor);
          }
          if (!$ws.proto[$traceurRuntime.toProperty(className)].prototype.hasOwnProperty('toString')) {
            var objectClassName = '[object ' + className + ']';
            $ws.proto[$traceurRuntime.toProperty(className)].prototype.toString = function() {
              return objectClassName;
            };
          }
        }
      };
      for (var className in $ws.proto)
        if (!$traceurRuntime.isSymbolString(className)) {
          $__4(className);
        }
    }, 1000);
    _setIntervalImmediate(function wsProtoClassTree() {
      if (typeof $ws === 'undefined' || !$ws.proto)
        return;
      var classHierarchy = {};
      for (var classNameA in $ws.proto)
        if (!$traceurRuntime.isSymbolString(classNameA)) {
          if ($ws.proto.hasOwnProperty(classNameA) && typeof $ws.proto[$traceurRuntime.toProperty(classNameA)] === 'function') {
            classHierarchy[$traceurRuntime.toProperty(classNameA)] = [];
            for (var classNameB in $ws.proto)
              if (!$traceurRuntime.isSymbolString(classNameB)) {
                if ($ws.proto.hasOwnProperty(classNameB) && typeof $ws.proto[$traceurRuntime.toProperty(classNameB)] === 'function') {
                  if ($ws.proto[$traceurRuntime.toProperty(classNameA)].prototype instanceof $ws.proto[$traceurRuntime.toProperty(classNameB)]) {
                    classHierarchy[$traceurRuntime.toProperty(classNameA)].push(classNameB);
                  }
                }
              }
          }
        }
    }, 20000);
    window.wsDebugHelpers.showReadyMessage();
  })();
  return {};
});
System.get("../helpers.js" + '');
