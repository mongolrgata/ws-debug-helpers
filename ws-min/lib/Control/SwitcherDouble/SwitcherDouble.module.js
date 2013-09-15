$ws.declareModule({namespace:"SBIS3.CORE",name:"SwitcherDouble",imports:["SBIS3.CORE.SwitcherAbstract"]},function(a){$ws.proto.SwitcherDouble=a.extend({$protected:{_options:{value:false,textOff:"",textOn:"",colorStyle:"gray"},_toggler:undefined,_textContainer:undefined},$constructor:function(){this._initEvents();},_initEvents:function(){this._toggler.bind("click",this._userAction.bind(this,this._toggleByUser));this._textOffContainer.bind("click",this._userAction.bind(this,this._keyLeft));this._textOnContainer.bind("click",this._userAction.bind(this,this._keyRight));},_userAction:function(b){if(this.isEnabled()){b.call(this);}},_getMarkupTemplate:function(){return'<span class="ws-switcher-text-off ws-switcher-double-text">{{=it.textOff}}</span><span class="ws-switcher-toggler"></span><span class="ws-switcher-text-on ws-switcher-double-text">{{=it.textOn}}</span>';},_bindBlocks:function(){this._toggler=this._container.find(".ws-switcher-toggler");this._textOffContainer=this._container.find(".ws-switcher-text-off");this._textOnContainer=this._container.find(".ws-switcher-text-on");},_toggleClasses:function(b){this._textOffContainer.toggleClass("ws-switcher-double-text-off",b);this._textOnContainer.toggleClass("ws-switcher-double-text-off",!b);this._toggler.toggleClass("ws-switcher-toggler-on",b);},setEnabled:function(b){$ws.proto.SwitcherDouble.superclass.setEnabled.apply(this,arguments);this._textOffContainer.toggleClass("ws-disabled",!b);this._textOnContainer.toggleClass("ws-disabled",!b);this._toggler.toggleClass("ws-disabled",!b);},_getContainerHTML:function(){if(!$ws.proto.SwitcherDouble.__markupTemplate){$ws.proto.SwitcherDouble.__markupTemplate=doT.template(this._getMarkupTemplate());}return $ws.proto.SwitcherDouble.__markupTemplate(this._options);},_redraw:function(b){$ws.proto.SwitcherDouble.superclass._redraw.apply(this,arguments);if(!b){this._initEvents();}}});return $ws.proto.SwitcherDouble;});