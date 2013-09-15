$ws.declareModule({namespace:"SBIS3.CORE",name:"Switcher",imports:["SBIS3.CORE.SwitcherAbstract"]},function(a){$ws.proto.Switcher=a.extend({$protected:{_options:{colorStyle:"gray"}},$constructor:function(){if($ws._const.browser.isIE7){this._container.addClass("ws-switcher-ie7");}},_onClickHandler:function(){$ws.proto.Switcher.superclass._onClickHandler.apply(this,arguments);if(this.isEnabled()){this._toggleByUser();}},_getMarkupTemplate:function(){return'<span class="ws-switcher-left"></span><span class="ws-switcher-right"></span><span class="ws-switcher-text"><span class="ws-switcher-text-off{{? it.colorStyle === \'gray\' }} ws-switcher-text-gray{{?}}">{{=it.textOff}}</span><span class="ws-switcher-text-on">{{=it.textOn}}</span></span>';},_bindBlocks:function(){this._togglerLeft=this._container.find(".ws-switcher-left");this._togglerRight=this._container.find(".ws-switcher-right");this._textContainer=this._container.find(".ws-switcher-text");this._textOffContainer=this._container.find(".ws-switcher-text-off");this._textOnContainer=this._container.find(".ws-switcher-text-on");},_toggleClasses:function(b){this._togglerLeft.toggleClass("ws-switcher-left-toggled",b);this._togglerRight.toggleClass("ws-switcher-right-toggled",b);this._textOffContainer.toggleClass("ws-switcher-text-toggled",b);},setEnabled:function(b){$ws.proto.Switcher.superclass.setEnabled.apply(this,arguments);this._togglerLeft.toggleClass("ws-disabled",!b);this._togglerRight.toggleClass("ws-disabled",!b);this._textContainer.toggleClass("ws-disabled",!b);this._textOffContainer.toggleClass("ws-disabled",!b);},_getContainerHTML:function(){if(!$ws.proto.Switcher.__markupTemplate){$ws.proto.Switcher.__markupTemplate=doT.template(this._getMarkupTemplate());}return $ws.proto.Switcher.__markupTemplate(this._options);}});return $ws.proto.Switcher;});