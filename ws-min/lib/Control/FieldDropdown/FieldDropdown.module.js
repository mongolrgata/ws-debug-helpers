$ws.declareModule({namespace:"SBIS3.CORE",name:"FieldDropdown",imports:["SBIS3.CORE.FieldAbstract"]},function(b){var a=1;$ws.proto.FieldDropdown=b.extend({$protected:{_recordSet:null,_initialFilter:{},_options:{allowEmpty:false,emptyValue:"",filterParams:{},dataSource:false,valueRender:"",displayColumn:"",data:"",width:"100px",mode:"",itemValueColumn:"",wordWrap:false,firstYear:2008,lastYear:0,tooltip:""},_enum:"",_desiredDefaultValue:"",_dSetReady:"",_valueSet:false,_optCont:null,_lastQueryFilter:undefined,_emptyInit:false,_fKeyType:""},$constructor:function(){this._publish("onAfterLoad","onBeforeLoad");this._createLoadingIndicator();this._dSetReady=this._prepareDeferredChain();this._initialFilter=$ws.core.merge({},this._options.filterParams);this._lastQueryFilter=this._initialFilter;var f=this._options.data,k=typeof(f)=="object"&&!Object.isEmpty(f),n=this;if(k){var m=f.keys;for(var g=0,d=m.length;g<d;g++){if(m[g]===null){this._options.allowEmpty=true;break;}}}this._container.attr("title",this._options.tooltip);this._container.css("width",this._options.width+"px").find(".ws-field").addClass("ws-field-dropdown");this._inputControl.css("width",this._options.width+"px");if($ws._const.theme){var c=this._container,e=['<div class="custom-select">','<div class="custom-select-text">Загрузка...</div>','<div class="custom-select-arrow"></div>',"</div>"],p=['<div class="custom-options-container not-hovered" dropdown-owner-name="'+(this._options.name||"")+'">',"</div>"],o=this._inputControl[0].childNodes,j=function(){if($ws._const.browser.isMobileSafari){return;}$(document).bind("keydown."+n.getId(),function(s){if(~$.inArray(s.which||s.keyCode,[$ws._const.key.tab,$ws._const.key.esc])){n._hideOptions();}});var q=c.find(".custom-select"),r=q.offset(),l=n._optCont.width()+a*2,i=n._optCont.height()+a*2;r.top+=q.parent().height();r["min-width"]=q.parent().width();$ws.helpers.positionInWindow(r,l,i);n._optCont.css(r);n._optCont.toggle();n._container.trigger("wsSubWindowOpen");},h=function(q){var l=n._optCont.find("[value='"+q.value+"']").html()||"&nbsp;",i=c.find(".custom-select-text");if(q.value==="null"&&(l.replace(/^\s+|\s+$/g,"")===""||l==="&nbsp;")){i.addClass("ws-dropdown-placeholder").text(n._options.tooltip);}else{i.removeClass("ws-dropdown-placeholder").html(l);}n._optCont.find("div").removeClass("selected-option").each(function(){if($(this).attr("value")==q.value){$(this).addClass("selected-option");}});};c.find(".ws-field").append(e.join(""));this._optCont=$(p.join(""));$("body").append(this._optCont);this._optCont.mousedown(function(i){i.stopImmediatePropagation();}).bind("mouseover mouseout",function(i){n._optCont.toggleClass("not-hovered",i.type=="mouseout");}).bind("mousewheel",function(i){i.stopPropagation();return true;});c.find(".custom-select").mousedown(function(i){if(/block/.test(n._optCont.css("display"))){i.stopImmediatePropagation();}}).click(function(){if(!c.hasClass("ws-disabled")){n._inputControl.focus();j();}}).css("line-height",this._getLineHeight());$(document).bind("mousedown."+this.getId()+" wsmousedown."+this.getId(),function(){if(n._optCont){n._hideOptions();}});n._container.bind("keydown",function(i){if(i.which==$ws._const.key.esc&&n._optCont&&/block/.test(n._optCont.css("display"))){n._hideOptions();i.stopImmediatePropagation();}});this._inputControl.blur(function(){if(!n.isActive()){n._hideOptions();}});this._inputControl.bind("change.themed keypress keyup",function(){h(this);});this.subscribe("onAfterLoad",function(w,q,v){var u=v.k,s=v.v,x=v.r;n._optCont.find(".custom-select-option").unbind("click").remove();for(var t=0,r=u.length;t<r;t++){n._optCont.append(n._createCustomRow(u[t],x[t]||s[t]));}n._optCont.find(".custom-select-option:odd").addClass("ws-item-odd");n._applyFontProperties();n._dSetReady.addCallback(function(i){h(n._inputControl[0]);return i;});});}},_initComplete:function(){var c=this;$ws.proto.FieldDropdown.superclass._initComplete.apply(this,arguments);this._dSetReady.addBoth(function(d){c._notify("onReady");return d;});},_hideOptions:function(){if(/block/.test(this._optCont.css("display"))){this._optCont.hide();this._container.trigger("wsSubWindowClose");}$(document).unbind("keypress."+this.getId());},_createCustomRow:function(e,g){var f=g instanceof jQuery,c=f?g:$("<div></div>"),d=this;c.addClass("custom-select-option").attr("value",e+"").click(function(){d._curval=$(this).attr("value");d._inputControl.val(d._curval);d._inputControl.change();d._inputControl.focus();d._hideOptions();});if(!f){c.css({whiteSpace:d._options.wordWrap?"normal":"nowrap"}).html($ws.helpers.escapeHtml(""+(g===null?"":g))||"&nbsp;");}return c;},_getLineHeight:function(){return this._container.height()-2+"px";},_createMarkup:function(d){var c=$ws.proto.FieldDropdown.superclass._createMarkup.apply(this,arguments);return this._extendMarkup(c,'<select name="{{=it.name}}" title="{{=it.tooltip}}" {{? it.width}}style="width:{{=it.width}};"{{?}}></select>');},_bindInternals:function(){this._inputControl=this._container.find("select");},init:function(){var f=this._options.data,c=new Date(),e=c.getFullYear();if(this._options.mode=="year"){if(!this._options.lastYear){this._options.lastYear=e;}if(this._options.firstYear>=this._options.lastYear){this._options.lastYear=this._options.firstYear;}}if(this._options.mode!==""){if(this._options.mode==="month"){f={keys:[0,1,2,3,4,5,6,7,8,9,10,11],values:["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"]};this._desiredDefaultValue=c.getMonth();}else{if(this._options.mode==="year"){f={keys:[],values:[]};for(var d=this._options.firstYear;d<=this._options.lastYear;d++){f.keys.push(d);f.values.push(d);}this._desiredDefaultValue=this._options.firstYear;if(e<=this._options.lastYear&&e>=this._options.firstYear){this._desiredDefaultValue=e;}}else{throw new Error("Wrong predefined type specified for FieldDropdown: "+this._options.mode);}}this._dSetReady.callback(f);}else{if(typeof(this._options.dataSource)=="object"&&!Object.isEmpty(this._options.dataSource)){this._prepareRecordSet();}else{if(typeof(f)=="object"&&!Object.isEmpty(f)){this._dSetReady.callback(f);}else{this._emptyInit=true;}}}$ws.proto.FieldDropdown.superclass.init.apply(this,arguments);this._dSetReady.addCallback(function(){this._initialValueSetted=true;}.bind(this));},_markInitialValueSetted:function(){},setEmptyValue:function(c){if(this._options.allowEmpty){this._inputControl.find("option[value='null']").text(c);}},setFirstYear:function(c){this.setYears(c,this._options.lastYear);},setLastYear:function(c){this.setYears(this._options.firstYear,c);},setYears:function(h,f){if(this._options.mode=="year"){var g={keys:[],values:[]},e=this.getValue(),c=this;if(isNaN(h)){h=this._options.firstYear;}else{this._options.firstYear=h;}if(isNaN(f)){f=this._options.lastYear;}else{this._options.lastYear=f;}for(var d=h;d<=f;d++){g.keys.push(d);g.values.push(d);}this._inputControl.children().remove();this._dSetReady=this._prepareDeferredChain();this._dSetReady.addCallback(function(i){if(Array.indexOf(i.k,c._castValue(e))!==-1){c.setValue(e);}else{var j;j=i.v[0];if(j!==undefined||e!==j){c.setValue(j);c._notify("onChange",j);}}return i;});this._dSetReady.callback(g);}},getDisplayColumn:function(){return this._options.displayColumn;},getItemValueColumn:function(){return this._options.itemValueColumn;},setDisplayColumn:function(c){this._options.displayColumn=c;},setItemValueColumn:function(c){this._options.itemValueColumn=c;},setData:function(d){var e=d;if(typeof d!=="object"){throw new TypeError("В метод setData можно передать либо простой JavaScript-объект либо RecordSet");}if(d instanceof $ws.proto.RecordSet){if(this.getDisplayColumn()===""){throw new TypeError("Невозможно установить данные через RecordSet т.к. не задана отображаемая колонка записи. Задайте отображаемую конолку через setDisplayColumn.");}}this._inputControl.children().remove();this._createLoadingIndicator();this._dSetReady=this._prepareDeferredChain();this._initialValueSetted=true;if(!(d instanceof $ws.proto.RecordSet)){if(d.keys instanceof Array&&d.values instanceof Array){if(d.keys.length!==d.values.length){throw ("setData, keys and values have different length");}}else{e={keys:[],values:[]};for(var c in d){if(d.hasOwnProperty(c)){e.keys.push(c);e.values.push(d[c]);}}}}if(this._recordSet!==null){this._recordSet=null;}this._dSetReady.callback(e);},_applyFontProperties:function(){if(this._optCont){var c=this._inputControl,d={fontFamily:c.css("font-family"),fontSize:c.css("font-size"),fontWeight:c.css("font-weight"),fontStyle:c.css("font-style"),textAlign:c.css("text-align"),color:c.css("color"),textDecoration:c.css("text-decoration")};this._container.find(".custom-select-text").css(d);this._optCont.css(d);}},setEnabled:function(c){if(this._options.allowChangeEnable||c===this._options.enable){$ws.proto.FieldDropdown.superclass.setEnabled.apply(this,arguments);this._applyFontProperties();}},setActive:function(c){if(!c&&this._optCont&&/block/.test(this._optCont.css("display"))){this._optCont.hide();this._container.trigger("wsSubWindowClose");}$ws.proto.FieldDropdown.superclass.setActive.apply(this,[c,undefined,$ws._const.browser.isMobileSafari]);},_prepareRecordSet:function(){if(this._recordSet===null){var c=this,d=$ws.core.merge({handlers:{onAfterLoad:function(h,g,e,f){if(e){c._dSetReady.callback(g);}else{if(!(f instanceof HTTPError)||f.httpError!==0){c._dSetReady.errback(f);}}}}},this._options.dataSource);d.context=this.getLinkedContext();d.filterParams=$ws.core.merge(d.filterParams||{},this._options.filterParams);this._notify("onBeforeLoad");$ws.core.attachInstance("Source:RecordSet",d).addCallbacks(function(e){c._recordSet=e;if(c._options.dataSource.firstRequest===false){c._dSetReady.callback(e);}return e;},function(f){c._dSetReady.errback(f);return f;});}},_optionTemplate:function(c,d){return'<option value="'+c+'" >'+((String.trim(""+d)===""||d===null)?"&nbsp;":d)+"</option>";},_renderOrNot:function(c){return typeof this._options.valueRender=="function"?this._options.valueRender.apply(this,c):"";},_prepareDeferredChain:function(){var c=this;return new $ws.proto.Deferred().addBoth(function(d){c._inputControl.find(".ws-loading-line").remove();return d;}).addCallback(function(f){var o={k:[],v:[],r:[]};if(f instanceof $ws.proto.RecordSet){var h,m;if(c._options.allowEmpty){o.k.push(null);o.v.push(c._options.emptyValue);o.r.push(c._renderOrNot([null]));}f.rewind();while((h=f.next())!==false){if(h.hasColumn(c._options.displayColumn)){m=h.get(c._options.displayColumn);}var n=(c._options.itemValueColumn&&h.hasColumn(c._options.itemValueColumn))?h.get(c._options.itemValueColumn):h.getKey();m=m===null?"null":m;o.k.push(n);o.v.push(m);o.r.push(c._renderOrNot([h]));}}else{o.k=f.keys;o.v=f.values;o.r=[];if(typeof c._options.valueRender=="function"){for(var g=0,e=f.values.length;g<e;g++){o.r[g]=c._renderOrNot([f.keys[g],f.values[g]]);}}var d;if((d=Array.indexOf(o.k,"null"))>0){o.k.splice(d,1);var k=o.v.splice(d,1);var j=o.r.splice(d,1);o.k.unshift("null");o.v.unshift(k[0]);o.r.unshift(j[0]);}}c._fKeyType=typeof(o.k[c._options.allowEmpty?1:0]);return o;}).addCallback(function(g){c._options.data=g;if(c._options.value!==""){c._desiredDefaultValue=c._options.value;}for(var f=0,d=g.k.length;f<d;f++){var h=g.r[f]||g.v[f];var e=g.k[f];if(f===0){if(c._desiredDefaultValue===""&&c._options.value===""){c._desiredDefaultValue=e;if(isNaN(c._desiredDefaultValue)){c._desiredDefaultValue=e;}}}h=h instanceof jQuery?h.text():h;c._inputControl.append(c._optionTemplate(e,h));}c._defaultValue=c._desiredDefaultValue;return g;}).addCallbacks(function(d){c._notify("onAfterLoad",true,d);return d;},function(d){c._notify("onAfterLoad",false,d);c._showError(d);return d;});},_onValueChangeHandler:function(){var c=this._inputControl.val();if(this._enum instanceof $ws.proto.Enum){this._enum.set((c=="null"||c===null)?"null":parseInt(c,10));}$ws.proto.FieldDropdown.superclass._onValueChangeHandler.apply(this,arguments);this._valueSet=true;},setQuery:function(e,d){var c=this;this._lastQueryFilter=e;d=d===undefined?true:d;if(d){this._inputControl.children().remove();this._createLoadingIndicator();}if(this._recordSet!==null){this._dSetReady=this._prepareDeferredChain();this._dSetReady.addCallback(function(g){if(d){var f=c.getValue();if(Array.indexOf(g.k,c._castValue(f))!==-1){c.setValue(f);}else{var h;h=g.k[0];if(h!==undefined||f!==h){c.setValue(h);c._notify("onChange",h);}}}return g;});this._recordSet.setQuery(this._prepareFilter(e),true);}else{throw new Error("Setting a query to FieldDropdown which has empty dataSource configuration");}},reload:function(){this.setQuery(this._lastQueryFilter);},_prepareFilter:function(c){for(var d in c){if(c.hasOwnProperty(d)&&c[d]===undefined){c[d]=this._initialFilter[d];}}return c;},_onContextValueReceived:function(d){var c=this;if(d instanceof $ws.proto.Enum){if(this._dSetReady.isReady()){if(this._enum!==""){if(this._enum.getCurrentValue()!==d.getCurrentValue()){if(d.hashCode()!==this._enum.hashCode()){throw new Error("Another Enum came from context, not the same as before (different available values)");}else{this._setValueInternal(d.getCurrentValue());this._notify("onChange",d);this._notifyOnValueChange(d);}}}else{throw new Error("FieldDropdown is already filled with data and Enum is came from context.");}}else{this._insertEnum(d);}}else{this._dSetReady.addCallback(function(f){if(d!==undefined){if(!(d===null&&!c._options.allowEmpty)&&(d!==c._notFormatedVal()||c._valueSet===false&&d!==c._desiredDefaultValue)){var e=!c._valueSet;c._setValueInternal(d);if(!e){c._notify("onChange",d);c._notifyOnValueChange(d);}}}if(c._valueSet===false){c.setValue(c._desiredDefaultValue,true,true);}return f;});}},_insertEnum:function(g){var e=this,f=g.getValues(),h=g.getCurrentValue(),c={keys:[],values:[]};for(var d in f){if(f.hasOwnProperty(d)){if(d===null){this._options.allowEmpty=true;}c.keys.push(d===null?"null":d);c.values.push(f[d]);}}this._enum=new $ws.proto.Enum(g.toObject());this._desiredDefaultValue=h===null?"null":h;this._dSetReady.callback(c).addCallback(function(i){e._setValueInternal(e._desiredDefaultValue);return i;});},_defaultValueHandler:function(){var c=this;this._dSetReady.addCallback(function(d){if(c._valueSet===false&&c._desiredDefaultValue===""){$ws.proto.FieldDropdown.superclass._defaultValueHandler.apply(c,[]);}return d;});},_curValue:function(){return this._notFormatedVal();},_castValue:function(c){if(c===null){return c;}switch(this._fKeyType){case"string":c=""+c;break;case"number":c=Number(c);break;}return c;},getStringValue:function(){var e=this._inputControl.val()===""?this._curval:this._inputControl.val();e=e==="null"?null:e;if(e!==null){e=this._castValue(e);}if(this._options.data.v){var c=Array.indexOf(this._options.data.k,e),d;d=this._options.data.r[c]||this._options.data.v[c];return d instanceof jQuery?d.text():d;}else{return""+e;}},getSelectedRecord:function(){var d=this._recordSet;if(!d){return undefined;}if(!this._options.itemValueColumn){return d.contains(this._curValue())?d.getRecordByPrimaryKey(this._curValue()):undefined;}else{var e=undefined,c=this;d.each(function(f){if(f.get(c._options.itemValueColumn)==c._curValue()){e=f;return false;}});return e;}},_createLoadingIndicator:function(){this._inputControl.append('<option class="ws-loading-line" value="">Загрузка&hellip;</option>');},_notFormatedVal:function(){if(this._enum instanceof $ws.proto.Enum){return new $ws.proto.Enum(this._enum.toObject());}var c=this._inputControl.val()===""?this._curval:this._inputControl.val();if(c==="null"){c=this._curval||"null";}if(c==="null"){return null;}else{if(c===undefined||c===""){return undefined;}else{var d=Number(c);return isNaN(d)?c:d;}}},_getElementToFocus:function(){return this._inputControl;},_setValueInternal:function(e){if(e===undefined){return;}if(e instanceof $ws.proto.Enum){if(!this._dSetReady.isReady()){this._insertEnum(e);}e=e.getCurrentValue();}if(this._enum instanceof $ws.proto.Enum){this._enum.set(e);}this._curval=e===null?"null":e;var d=this._inputControl.val();var c=d==this._curval;this._inputControl.val(this._curval);if(d!=this._inputControl.val()||c){this._valueSet=true;this._inputControl.trigger("change.themed");}},_showError:function(c){this._inputControl.children().remove().end().append('<option value="">'+c.message+"</option>");},setReadOnly:function(){var c=this;c._inputControl.bind("keypress.readonly, keyup.readonly, keydown.readonly, change.readonly",function(d){if(d.which!=$ws._const.key.tab&&d.which!=$ws._const.key.esc){c._inputControl.val(c._curval);d.stopImmediatePropagation();}});},destroy:function(){this._dSetReady=null;this._enum=null;if(this._optCont){if(/block/.test(this._optCont.css("display"))){this._container.trigger("wsSubWindowClose");}this._optCont.empty().remove();}$(document).unbind("."+this.getId());$ws.proto.FieldDropdown.superclass.destroy.apply(this,arguments);},getValueDeferred:function(){return this._dSetReady;},_initDefaultValue:function(){},_updateOddClasses:function(){if($ws._const.theme){this._optCont.find(".ws-item-odd").removeClass("ws-item-odd");this._optCont.find(".custom-select-option:odd").addClass("ws-item-odd");}},insertOption:function(c,e,d){if(this._emptyInit&&!this._dSetReady.isReady()){this._emptyInit=false;this._dSetReady.callback({keys:[],values:[]});}this._dSetReady.addCallback(function(){var l=this._renderOrNot([c,e]),f,k=this._options.data;if(d!==undefined){for(var h=0;h<k.k.length;++h){if(k.k[h]==d){f=h;break;}}}var j=$(this._optionTemplate(c,l||e)),g;if($ws._const.theme){g=this._createCustomRow(c,l||e);}if(f!==undefined){k.k.splice(f,0,c);k.v.splice(f,0,e);k.r.splice(f,0,l);j.insertBefore(this._inputControl.children().eq(f));if(g){g.insertBefore(this._optCont.children().eq(f));}}else{k.k.push(c);k.v.push(e);k.r.push(l);j.appendTo(this._inputControl);if(g){g.appendTo(this._optCont);}}this._updateOddClasses();}.bind(this));},removeOption:function(c){this._dSetReady.addCallback(function(){var e=this._options.data;for(var d=0;d<e.k.length;++d){if(c==e.k[d]){e.k.splice(d,1);e.r.splice(d,1);e.v.splice(d,1);this._inputControl.children().eq(d).remove();if($ws._const.theme){this._optCont.children().eq(d).remove();this._updateOddClasses();}return;}}}.bind(this));},toggleOptionsToContainer:function(c){this._optCont.appendTo(c?this._container:$("body"));},_modifyValue:function(c){this._dSetReady.addCallback(function(){var h=this._options.data.k,g=this.getValue(),d;for(var f=0;f<h.length;++f){if(h[f]==g){d=f;break;}}if(d!==undefined){var e=h[d+c];if(e!==undefined){this.setValue(e);}}}.bind(this));},setNextValue:function(){this._modifyValue(1);},setPrevValue:function(){this._modifyValue(-1);},getKeys:function(){return[].concat(this._options.data.k);},getValues:function(){return[].concat(this._options.data.v);},getValueByKey:function(e){var f=this._options.data.k,c=this._options.data.v,d=Array.indexOf(f,e);return c[d];},getKeyByValue:function(c){return this._options.data.k[Array.indexOf(this._options.data.v,c)];},_redraw:function(){}});return $ws.proto.FieldDropdown;});