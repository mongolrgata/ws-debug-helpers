$ws.declareModule({namespace:"SBIS3.CORE",name:"OperationsPanel",imports:["SBIS3.CORE.AreaAbstract","SBIS3.CORE.DataViewAbstract","SBIS3.CORE.Button","SBIS3.CORE.Menu","SBIS3.CORE.LoadingIndicator"]},function(b,d,a,c,e){$ws._const.OperationsPanel={panelText:"Массовые операции",widthShadow:315,iconWidth:30,secondBarrier:10000,order:["print","save","delete","sum"],orderMark:["selectAll","selectCurrentPage","removeSelection","invertSelection","showSelection"],buttonsWithMenu:{save:{title:"Сохранить",imgSrc:$ws._const.wsRoot+"sprite:icon-24 icon-Save icon-hover",name:"save",img:$ws._const.wsRoot+"sprite:icon-24 icon-Save icon-primary",tooltip:"Сохранить...",saveToPDF:{imgSrc:"sprite:icon-24 icon-PDF icon-primary"},saveToExcel:{imgSrc:"sprite:icon-24 icon-Excel icon-primary"}},print:{title:"Распечатать",imgSrc:$ws._const.wsRoot+"sprite:icon-24 icon-Print icon-hover",name:"print",img:$ws._const.wsRoot+"sprite:icon-24 icon-Print icon-primary",tooltip:"Распечатать..."}},panelButtons:{mass:{"delete":{name:"delete",tooltip:"Удалить все",img:$ws._const.wsRoot+"sprite:icon-24 action-hover icon-Erase icon-error"},allRecords:{name:"allRecords",parentName:"print",tooltip:"Все документы",img:$ws._const.wsRoot+"sprite:icon-24 icon-Print icon-primary"},list:{name:"list",parentName:"print",tooltip:"Список",img:$ws._const.wsRoot+"sprite:icon-24 icon-Print icon-primary"},sum:{name:"sum",tooltip:"Просуммировать все",img:$ws._const.wsRoot+"sprite:icon-24 icon-Sum icon-primary"},saveToPDF:{name:"saveToPDF",parentName:"save",tooltip:"Список в PDF",img:$ws._const.wsRoot+"sprite:icon-24 icon-Save icon-primary"},saveToExcel:{name:"saveToExcel",parentName:"save",tooltip:"Список в Excel",img:$ws._const.wsRoot+"sprite:icon-24 icon-Save icon-primary"}},selected:{sum:{name:"sum",tooltip:"Просуммировать отмеченные",img:$ws._const.wsRoot+"sprite:icon-24 icon-Sum icon-primary"},"delete":{name:"delete",tooltip:"Удалить отмеченные",img:$ws._const.wsRoot+"sprite:icon-24 icon-Erase action-hover icon-error"},allRecords:{name:"allRecords",parentName:"print",tooltip:"Отмеченные",img:$ws._const.wsRoot+"sprite:icon-24 icon-Print icon-primary"},list:{name:"list",parentName:"print",tooltip:"Список отмеченных",img:$ws._const.wsRoot+"sprite:icon-24 icon-Print icon-primary"},saveToPDF:{name:"saveToPDF",parentName:"save",tooltip:"Список отмеченных в PDF",img:$ws._const.wsRoot+"sprite:icon-24 icon-Save icon-primary"},saveToExcel:{name:"saveToExcel",parentName:"save",tooltip:"Список отмеченных в Excel",img:$ws._const.wsRoot+"sprite:icon-24 icon-Save icon-primary"},mark:{selectAll:{caption:"Все записи",id:"selectAll"},selectCurrentPage:{caption:"Всю страницу",id:"selectCurrentPage"},removeSelection:{caption:"Снять",id:"removeSelection"},invertSelection:{caption:"Инвертировать",id:"invertSelection"},showSelection:{caption:"Выбрать отмеченные",id:"showSelection"}}}}};$ws.single.DependencyResolver.register("SBIS3.CORE.OperationsPanel",function(f){var g={};if(f){g["/lib/Control/Plugins/Print-plugin.js"]=1;}return Object.keys(g);});$ws.proto.OperationsPanel=b.extend({$protected:{_currentView:undefined,_panelBlock:undefined,_actions:{mass:{},selected:{}},_dReady:undefined,_panelState:false,_isOpen:false,_menu:{},_buttons:{mass:{},selected:{}},_isShowSelection:false,_isUseSaveSelectedColumns:true,_options:{linkedView:"",massOperations:{},selectedOperations:{},markOperations:{},sumFields:[],maxRecordsCount:500},_panelOpenContainer:null,_panelButtonsContainer:null,_markContainer:null,_massContainer:null,_selectedContainer:null,_textContainer:null,_saveIndicator:undefined,_recordsCount:null},$constructor:function(g){var f=['<span class="ws-operations-panel-open ws-operations-panel-key" title="Массовые операции с таблицей"></span>','<div class="ws-browser-operations-panel ws-hidden"><span class="ws-operations-panel-shadow"></span>','<div class="ws-operations-panel-content">','<span class="ws-operations-panel-close ws-operations-panel-key"></span>','<span class="ws-operations-panel-text">'+$ws._const.OperationsPanel.panelText+"</span></div>",'<span class="ws-operations-panel-separator ws-hidden"></span><span class="ws-operations-panel-selection-count ws-hidden"></span>','<span class="ws-operations-panel-show-all ws-hidden">Показать все</span></div>'].join("");this._container.addClass("ws-operations-panel").prepend(f);this._container.find(".ws-operations-panel-key").bind("click",$.proxy(this.panelKeyClickHandler,this));this._container.find(".ws-operations-panel-show-all").bind("click",$.proxy(this._showAllRecords,this));this._setPressHandler(this._container.find(".ws-operations-panel-open"));this._setPressHandler(this._container.find(".ws-operations-panel-close"));this._panelOpenContainer=this._container.find(".ws-operations-panel-open");this._panelButtonsContainer=this._container.find(".ws-browser-operations-panel");this._dReady=new $ws.proto.Deferred();},init:function(){var f=this;this._initPanel();$ws.proto.OperationsPanel.superclass.init.apply(this,arguments);if(this._options.linkedView===""){this._dChildReady.done().getResult().addCallback(function(){f._notify("onReady");f._dReady.callback();}).addErrback(function(g){$ws.core.alert(g.message);});}},setLinkedView:function(f){if($ws.single.ControlStorage.contains(f)){this._options.linkedView=f;this._dChildReady=new $ws.proto.ParallelDeferred();this._initPanel();this._setPositionShadow();}},setMassOperations:function(f){if(f){this._setOperations(f,"mass");}},setSelectedOperations:function(f){if(f){this._setOperations(f,"selected");}},setMarkOperations:function(f){if(f){this._setOperations(f,"mark");}},_setOperations:function(f,g){if(!Object.isEmpty(f||{})){switch(g){case"mass":this._options.massOperations=f;break;case"selected":this._options.selectedOperations=f;break;case"mark":this._options.markOperations=f;}}},_setPressHandler:function(f){if(f&&"jquery" in f){f.mousedown(function(){$(this).addClass("ws-mousedown");}).mouseup(function(){$(this).removeClass("ws-mousedown");}).mouseout(function(){$(this).removeClass("ws-mousedown");});}},addUserOperations:function(g,j){if(g instanceof Array){for(var h=0,f=g.length;h<f;h++){if(g[h] instanceof Object&&g[h].name){switch(j){case"mass":this._addUserOperation(this._options.massOperations,g[h]);break;case"selected":this._addUserOperation(this._options.selectedOperations,g[h]);}}}}},_addUserOperation:function(h,f){if(h.userOperations===undefined){h.userOperations={};}h.userOperations[f.name]={action:f.action,tooltip:f.tooltip,img:f.img,caption:f.caption};if(!(Object.isEmpty(f.menu||{}))){var g={title:f.title,imgSrc:f.imgSrc,menu:f.menu};$.extend(h.userOperations[f.name],g);}},isOpen:function(){return this._isOpen;},_clearPanelButtons:function(){if(this._massContainer){this._massContainer.html("");}if(this._selectedContainer){this._selectedContainer.html("");}if(this._markContainer){this._markContainer.remove();this._markContainer=null;}this._destroyMenu();this._destroyButtons();},_initPanel:function(){if(this._options.linkedView!==""){var f=this;$ws.single.ControlStorage.waitChild(f._options.linkedView).addCallback(function(j){if(f._currentView){f._clearPanelButtons();}f._currentView=j;f._currentView.setUseDefaultPrint();f._currentView.subscribe("onDestroy",$.proxy(f._clearPanelButtons,f));if(!f._currentView.getActions()["printRecord"]){if(f._options.massOperations.print){delete f._options.massOperations.print["menu"]["allRecords"];}if(f._options.selectedOperations.print){delete f._options.selectedOperations.print["menu"]["allRecords"];}}f._initActions();if(!f._panelBlock){f._panelBlock=$(['<div class="ws-operations-panel-block">','<div class="ws-operations-panel-buttons ws-mass-operations"></div>','<div class="ws-operations-panel-buttons ws-selected-operations ws-hidden"></div>'].join("")).appendTo($(".ws-operations-panel-content"));}if(!f._massContainer){f._massContainer=f._container.find(".ws-mass-operations");}if(!f._selectedContainer){f._selectedContainer=f._container.find(".ws-selected-operations");}if(!f._textContainer){f._textContainer=f._container.find(".ws-operations-panel-text");}f._checkToDrawOperations();if(!Object.isEmpty(f._options.markOperations)){var h=[];f._markContainer=$(['<div class="ws-operations-panel-mark ws-hidden" id="'+f.getId()+'-mark">',"<span>Отметка</span>",'<span class="ws-operations-panel-menu-indicator"></span></div>'].join(""));f._panelBlock.prepend(f._markContainer);f._markContainer.bind("click",$.proxy(f,"_onClickMenuHandler","mark"));for(var g in f._options.markOperations){if(f._options.markOperations.hasOwnProperty(g)){(function(){var i=g;if($ws._const.OperationsPanel.panelButtons.selected.mark.hasOwnProperty(i)){h.push({caption:$ws._const.OperationsPanel.panelButtons.selected.mark[i].caption,id:$ws._const.OperationsPanel.panelButtons.selected.mark[i].id,name:$ws._const.OperationsPanel.panelButtons.selected.mark[i].id,handlers:{onActivated:function(){f._checkRecordsCount().addCallback(function(){f._actions.selected[i]();});}}});}else{if(!Object.isEmpty(f._options.markOperations[i])){h.push({caption:f._options.markOperations[i].title,id:i,handlers:{onActivated:function(){f._checkRecordsCount().addCallback(function(){if(typeof(f._options.markOperations[i].action)==="function"){f._options.markOperations[i].action.apply(f._currentView);}});}}});}}})();}}h=f._regularizeButtons(h,true);h.unshift({caption:"Отметка",id:"mark-caption"});f._addMenuForButton("mark",h);}if((f._options.massOperations.save||f._options.selectedOperations.save)&&!Object.isEmpty(f._container.find(".ws-panel-form")||{})){f._container.append(['<form enctype="multipart/form-data" target="ws-panel-frame" ','action="'+$ws._const.defaultServiceUrl+'?raw_file_result" method="POST" class="ws-panel-form ws-hidden">','<input type="hidden" name="Запрос">','</form><iframe class="ws-hidden" name="ws-panel-frame"></iframe>'].join(""));}f._currentView.subscribe("onChangeSelection",$.proxy(f._onChangeSelectionHandler,f));f._currentView.subscribe("onAfterRender",$.proxy(f._onAfterRenderHandler,f));f._currentView.subscribe("onAfterLoad",function(){f._recordsCount=f._currentView.getRecordSet().getRecords().length;if(!f._currentView.isMinimized()){f._isShowSelection=false;f._hideShowSelectionBlock();}if(f.isOpen()&&!(f._currentView.getSelection(true).length>0)&&!f._isShowSelection){f.panelKeyClickHandler();f._hideShowSelectionBlock();}});});}},_destroyMenu:function(){for(var f in this._menu){if(this._menu.hasOwnProperty(f)){this._menu[f].destroy();delete this._menu[f];}}},_destroyButtons:function(){for(var g in this._buttons){if(this._buttons.hasOwnProperty(g)){for(var f in this._buttons[g]){if(this._buttons[g].hasOwnProperty(f)){this._buttons[g][f].destroy();delete this._buttons[g][f];}}}}},_onAfterRenderHandler:function(){var f=this._currentView.getSelection(true).length;if(f>0){if(!this.getPanelState()){this._changeState(true,f);this._panelState=true;}else{this._textContainer.text("Отмечено "+f);}if(!this.isOpen()){this.panelKeyClickHandler();}}else{if(this.getPanelState()){this._changeState();this._panelState=false;}}},_hideShowSelectionBlock:function(){this._container.find(".ws-operations-panel-separator").addClass("ws-hidden");this._container.find(".ws-operations-panel-selection-count").addClass("ws-hidden");this._container.find(".ws-operations-panel-show-all").addClass("ws-hidden");this._setPositionShadow();},_showAllRecords:function(){this._isShowSelection=false;this._currentView.showSelection(false);this._hideShowSelectionBlock();},_changeState:function(f,h){var g="ws-hidden";if(!f){if(this._markContainer){this._markContainer.addClass(g);}this._selectedContainer.addClass(g);this._massContainer.removeClass(g);this._textContainer.text($ws._const.OperationsPanel.panelText);}else{if(this._markContainer){this._markContainer.removeClass(g);}this._selectedContainer.removeClass(g);this._massContainer.addClass(g);this._textContainer.text("Отмечено "+h);}this._setPositionShadow();},_onChangeSelectionHandler:function(){var f=this._currentView.getSelection(true).length;if(this._isShowSelection){var g=this._container.find(".ws-operations-panel-selection-count");this._changeState();this._container.find(".ws-operations-panel-separator").removeClass("ws-hidden");g.text("Отобрано "+this._currentView.getRecordSet().getRecordCount());g.removeClass("ws-hidden");this._container.find(".ws-operations-panel-show-all").removeClass("ws-hidden");this._setPositionShadow();}if(!this.isOpen()&&f>0){this.panelKeyClickHandler();}else{if(this.isOpen()&&f===0){if(!this._isShowSelection){this._hidePanel();}this._changeState();}}if(f>0){this._panelState=true;this._changeState(true,f);}else{this._panelState=false;}},_onClickMenuHandler:function(f,g){var h;if(g&&this._menu[f]&&this._menu[f].isMenu()){h=this._container.find("#"+this.getId()+"-"+f).offset();h.top-=2;this._menu[f].show(g,h,!!(f==="mark"));}},_checkToDrawOperations:function(){var f=this;if(!Object.isEmpty(this._options.massOperations||{})){this._drawButtons(this._getButtons(this._options.massOperations,"mass"),".ws-mass-operations","mass");}if(!Object.isEmpty(this._options.selectedOperations||{})){this._drawButtons(this._getButtons(this._options.selectedOperations,"selected"),".ws-selected-operations","selected");}this._dChildReady.done().getResult().addCallback(function(){if(!f._dReady.isReady()){f._notify("onReady");f._dReady.callback();}}).addErrback(function(g){$ws.core.alert(g.message);});},_initActions:function(){var g=this,f=this._currentView.getActions();if(!Object.isEmpty(this._options.selectedOperations||{})){this._actions.selected["delete"]=f["delete"]&&this._options.selectedOperations["delete"]&&function(){g._checkRecordsCount().addCallback(function(){g._deleteSelectedRecords();});};this._actions.selected["sum"]=this._options.selectedOperations.sum&&function(){g._checkRecordsCount().addCallback(function(){g._sumSelectedRecords();});};this._actions.selected["allRecords"]=f.printRecord&&this._options.selectedOperations.print&&this._options.selectedOperations.print.menu&&this._options.selectedOperations.print.menu.allRecords&&function(){g._checkRecordsCount().addCallback(function(){g._printReport(false,true);});};this._actions.selected["list"]=this._options.selectedOperations.print&&this._options.selectedOperations.print.menu&&this._options.selectedOperations.print.menu.list&&function(){g._checkRecordsCount().addCallback(function(){g._printReport(true,true);});};this._actions.selected["saveToPDF"]=this._options.selectedOperations.save&&this._options.selectedOperations.save.menu&&this._options.selectedOperations.save.menu.saveToPDF&&function(){g._checkRecordsCount().addCallback(function(){g._saveToFile("pdf",undefined,false,true,true);});};this._actions.selected["saveToExcel"]=this._options.selectedOperations.save&&this._options.selectedOperations.save.menu&&this._options.selectedOperations.save.menu.saveToExcel&&function(){g._checkRecordsCount().addCallback(function(){g._getFile("excel",undefined,undefined,g._currentView.getSelection(true),false,undefined,true);});};}if(!Object.isEmpty(this._options.markOperations||{})){this._actions.selected["selectAll"]=this._options.markOperations.selectAll&&function(){g._checkRecordsCount().addCallback(function(){g._currentView.selectAll();});};this._actions.selected["selectCurrentPage"]=this._options.markOperations.selectCurrentPage&&function(){g._checkRecordsCount().addCallback(function(){g._currentView.selectCurrentPage();});};this._actions.selected["removeSelection"]=this._options.markOperations.removeSelection&&function(){g._checkRecordsCount().addCallback(function(){g._currentView.removeSelection();});};this._actions.selected["invertSelection"]=this._options.markOperations.invertSelection&&function(){g._checkRecordsCount().addCallback(function(){g._currentView.invertSelection();});};this._actions.selected["showSelection"]=this._options.markOperations.showSelection&&function(){g._checkRecordsCount().addCallback(function(){g._isShowSelection=true;g._currentView.showSelection();});};}if(!Object.isEmpty(this._options.massOperations||{})){this._actions.mass["delete"]=f["delete"]&&this._options.massOperations["delete"]&&function(){g._checkRecordsCount().addCallback(function(){g._isShowSelection?g._deleteSelectedRecords():g._currentView.deleteRecordsByFilter().addCallback(function(h){if(h&&g.isOpen()){g.panelKeyClickHandler();}});});};this._actions.mass["sum"]=this._options.massOperations.sum&&function(){g._checkRecordsCount().addCallback(function(){g._isShowSelection?g._sumSelectedRecords():g._sumRecords();});};this._actions.mass["saveToPDF"]=this._options.massOperations.save&&this._options.massOperations.save.menu&&this._options.massOperations.save.menu.saveToPDF&&function(){g._checkRecordsCount().addCallback(function(){g._saveToFile("pdf",undefined,true,false,true);});};this._actions.mass["saveToExcel"]=this._options.massOperations.save&&this._options.massOperations.save.menu&&this._options.massOperations.save.menu.saveToExcel&&function(){g._checkRecordsCount().addCallback(function(){g._getFile("excel",undefined,undefined,g._currentView.getRecordSet().getRecords(),true,undefined,true);});};this._actions.mass["allRecords"]=f.printRecord&&this._options.massOperations.print&&this._options.massOperations.print.menu&&this._options.massOperations.print.menu.allRecords&&function(){g._checkRecordsCount().addCallback(function(){g._validateRecordCount("Что напечатать").addCallback(function(){g._printReport(false,false);});});};this._actions.mass["list"]=this._options.massOperations.print&&this._options.massOperations.print.menu&&this._options.massOperations.print.menu.list&&function(){g._checkRecordsCount().addCallback(function(){g._validateRecordCount("Что напечатать").addCallback(function(){g._printReport(true,false);});});};}},_deleteSelectedRecords:function(){var g=this._isShowSelection?this._currentView.getRecordSet().getRecords():this._currentView.getSelection(),f=this;f._currentView.deleteSelectedRecords(g).addCallback(function(h){if(h){f._hidePanel();f._changeState();if(f._isShowSelection){f._hideShowSelectionBlock();f._isShowSelection=false;}}});},_hidePanel:function(){this.panelKeyClickHandler();this._isOpen=false;},_validateRecordCount:function(k){var h=this,j=new $ws.proto.Deferred(),g=h._currentView.getRecordSet().getPageSize(),i=h._currentView.getRecordSet().getRecords().length,f;if(h._currentView.getPagingMode()&&!(i<g)){f=new $ws.proto.Context().setPrevious(this.getLinkedContext());f.setValue("recordsCount",g);$ws.core.attachInstance("SBIS3.CORE.Dialog",{template:"validateCountDialog",resizable:false,context:f,handlers:{onAfterLoad:function(){var m=this.getChildControlByName("recordsCount"),l=this;this.getChildControlByName("okButton").subscribe("onActivated",function(){if(l.validate()){var n=m.getValue();if(n>h._options.maxRecordsCount){$ws.helpers.question("Операция займет продолжительное время. Провести операцию?").addCallback(function(p){var o=i;if(p){o=n;h._recordsCount=o;j.callback();}else{j.errback();}});}else{h._recordsCount=n;j.callback();}l.close();}});this.getChildControlByName("radioButtons").subscribe("onChange",function(p,n){var o=n.toString();if(o!=="countRecords"&&m.isVisible()){m.hide();}switch(n.toString()){case"countRecords":m.setValue(i);m.show();break;case"allRecords":m.setValue($ws._const.OperationsPanel.secondBarrier);break;case"currentPage":m.setValue(g);}});},onAfterShow:function(){this.setTitle(k);this.moveWindowToCenter();}}});}else{h._recordsCount=i;j.callback();}return j;},_attachDialog:function(f,i,j,g,k){var h=this;$ws.core.attachInstance("SBIS3.CORE.Dialog",{template:i,resizable:true,handlers:{onAfterLoad:function(){var l=this.getChildControlByName(j);if(f){if(g){l.setContent(h._prepareHTMLForRecord(g));}}else{l.setContent(h._prepareHTMLForColumns());if(k&&!Object.isEmpty(k)){this.getChildControlByName("okButton").subscribe("onClick",function(){var o=[],p=$.makeArray(this.getParent()._container.find(".ws-select-columns-tr-checked"));for(var n=0,m=p.length;n<m;n++){o.push($(p[n]).find("td:first-child").text());}h._getFile("excel",undefined,undefined,k.data,k.isReportsForList,undefined,false,true,o);});}this._container.find(".ws-select-columns-checkbox").bind("click",function(){var o=$(this),n=o.closest("tr"),m="ws-select-columns-checked",p="ws-select-columns-tr-checked";if(o.hasClass(m)){o.removeClass(m);n.removeClass(p);}else{o.addClass(m);n.addClass(p);}});}},onAfterShow:function(){this.moveWindowToCenter();}}});},_sumRecords:function(){var f=this,g=new $ws.proto.BLObject("Сумма"),h=f._currentView.getDataSource().readerParams.queryName;$ws.core.attachInstance("SBIS3.CORE.LoadingIndicator",{message:"Суммирование записей...",name:"ws-panel-indicator"}).addCallback(function(i){g.call("ПоМетоду",f._makeArgsForSum(h!==undefined?h:"Список",f._currentView.getQuery(),f._options.sumFields),$ws.proto.BLObject.RETURN_TYPE_RECORD).addCallback(function(j){i.hide();i.destroy();f._attachDialog(true,"sumDialog","ws-dataview-sum",j);});});},_sumSelectedRecords:function(){var g=this._isShowSelection?this._currentView.getRecordSet().getRecords():this._currentView.getSelection(true),f=this;$ws.core.attachInstance("SBIS3.CORE.LoadingIndicator",{message:"Суммирование записей...",name:"ws-panel-indicator"}).addCallback(function(j){if(g.length>0){var m=new $ws.proto.BLObject("Сумма"),l=new $ws.proto.RecordSet({readerType:"ReaderUnifiedSBIS",readerParams:{adapterType:"TransportAdapterStatic",adapterParams:{data:{s:$ws.single.SerializatorSBIS.serialize(g[0]).s,d:[]}}}});for(var k=0,h=g.length;k<h;k++){l.appendRecord(g[k]);}m.call("ПоВыборке",{"Записи":$ws.single.SerializatorSBIS.serialize(l),"Поля":f._options.sumFields},$ws.proto.BLObject.RETURN_TYPE_RECORD).addCallback(function(i){j.hide();j.destroy();f._attachDialog(true,"sumDialog","ws-dataview-sum",i);});}});},getPanelState:function(){return this._panelState;},_setBackGround:function(){this._container.css("z-index",0);},_setForeGround:function(){this._container.css("z-index",10000);},_changeClass:function(){if(!this.isOpen()){this._setBackGround();}this._panelOpenContainer.toggleClass("ws-hidden");this._panelButtonsContainer.toggleClass("ws-hidden");setTimeout($.proxy(this._setPositionShadow,this),50);},_setPositionShadow:function(){this._panelButtonsContainer.find(".ws-operations-panel-shadow").css("background-position",this._panelButtonsContainer.width()-$ws._const.OperationsPanel.widthShadow+3+"px 0");},panelKeyClickHandler:function(){this._panelButtonsContainer.animate({left:this.isOpen()?-this._panelButtonsContainer.outerWidth():0},150);if(this.isOpen()){setTimeout($.proxy(this._changeClass,this),150);}else{this._changeClass();}this._isOpen=!this.isOpen();if(this.isOpen()){this._setForeGround();}},_addMenuForButton:function(g,j,i){var f=this,h="ws-operations-panel-menu";if(i){h+=" ws-with-icon";}this._dChildReady.push($ws.core.attachInstance("SBIS3.CORE.Menu",{id:f.getId()+"-menu-"+g,data:j,cssClassName:h}).addCallback(function(k){f._menu[g]=k;}));},_getItemMenu:function(f,o,n,p){var l=this,m;switch(o){case"userOperations":if(f[n].menu&&!Object.isEmpty(f[n].menu||{})){var h=[];for(var g in f[n].menu){if(f[n].menu.hasOwnProperty(g)){h.push({caption:f[n].menu[g].title,addClass:"ws-operations-panel-submenu",id:g,name:g,handlers:{onActivated:$.proxy(this,"_callUserHandler",f[n].menu[g].action,p)}});}}}m=h;break;case"print":m=this._preparePrintSubMenu(!(n==="allRecords"));break;case"save":m=this._prepareSaveSubMenu(n,p);}return{caption:f[n].title!==undefined?f[n].title:($ws._const.OperationsPanel.panelButtons[p].hasOwnProperty(n)?$ws._const.OperationsPanel.panelButtons[p][n].tooltip:""),id:n,addClass:n==="saveToPDF"||n==="saveToExcel"?"ws-menu-item-icon":"",imgSrc:n==="saveToPDF"||n==="saveToExcel"?$ws._const.OperationsPanel.buttonsWithMenu.save[n].imgSrc:undefined,renderStyle:"ws-render-menuStyle",subMenu:m,handlers:{onActivated:this._actions[p].hasOwnProperty(n)?this._actions[p][n]:$.proxy(this,"_callUserHandler",f[n].action,p)}};},_callUserHandler:function(h,g){var f=this;this._checkRecordsCount().addCallback(function(){var i=[];if(g==="selected"){i.push(f._currentView.getSelection(true));}h.apply(f._currentView,i);});},_getButtons:function(f,r){var q=f||[],t=[],m,l,s;for(var n in q){if(q.hasOwnProperty(n)){if($ws._const.OperationsPanel.panelButtons[r].hasOwnProperty(n)&&this._actions[r].hasOwnProperty(n)){t.push($ws._const.OperationsPanel.panelButtons[r][n]);}else{var o=n==="userOperations";for(m in q[n]){if(q[n].hasOwnProperty(m)&&(!o||(o&&q[n][m].img))){var h=o?q[n][m].menu:q[n].menu,g=r+"-"+(o?m:n);if(h&&!Object.isEmpty(h||{})){var p=[];p.push({caption:o?q[n][m].title:$ws._const.OperationsPanel.buttonsWithMenu[n].title,imgSrc:o?(q[n][m].imgSrc?q[n][m].imgSrc:q[n][m].img.replace("icon-primary","")+"icon-hover"):$ws._const.OperationsPanel.buttonsWithMenu[n].imgSrc,addClass:"ws-menu-item-icon"});for(s in h){if(h.hasOwnProperty(s)){if(s==="userOperations"){for(l in h[s]){if(h[s].hasOwnProperty(l)){p.push(this._getItemMenu(h[s],n,l,r));}}}else{p.push(this._getItemMenu(h,n,s,r));}}}this._addMenuForButton(g,p,true);t.push({name:o?m:$ws._const.OperationsPanel.buttonsWithMenu[n].name,img:o?q[n][m].img:$ws._const.OperationsPanel.buttonsWithMenu[n].img,tooltip:o?q[n][m].tooltip:$ws._const.OperationsPanel.buttonsWithMenu[n].tooltip,handlers:{onActivated:$.proxy(this,"_onClickMenuHandler",g)},hasMenu:true});}else{if(typeof(q[n][m].action)==="function"){q[n][m]["userButton"]=true;q[n][m]["name"]=m;q[n][m].action=$.proxy(this,"_callUserHandler",q[n][m].action,r);t.push(q[n][m]);}}}}}}}return t;},_regularizeButtons:function(n,h){var g=[],f=h?$ws._const.OperationsPanel.orderMark:$ws._const.OperationsPanel.order,m=function(l){for(var i=0,o=n.length;i<o;i++){if(n[i].name===l||n[i].parentName===l){g.push(n[i]);n.splice(i,1);break;}}};for(var k=0,j=f.length;k<j;k++){m(f[k]);}return g.concat(n);},hideOperations:function(f){this._changeDisplayOperations(f,true);},showOperations:function(f){this._changeDisplayOperations(f);},_getButtonWidthByCaption:function(g){var i=document.createElement("div"),f=this.getContainer(),h=0;i.style.cssText="width:auto;position:relative;display:table;white-space:nowrap";i.innerHTML=g;f[0].appendChild(i);h=i.offsetWidth+1;f[0].removeChild(i);return h;},setCaption:function(g,f,i){if(g){i=i||"selected";var h;h=this._buttons[i]?this._buttons[i][g]:undefined;if(h){h.setCaption(f);var j=this._getButtonWidthByCaption(f);if(h.hasImage()){j+=$ws._const.OperationsPanel.iconWidth;}h.getContainer().width(j);this._setPositionShadow();}}},_changeDisplayOperations:function(m,k){if(m instanceof Array){var g=this.getPanelState()?this._selectedContainer:this._massContainer;for(var j=0,f=m.length;j<f;j++){var h=g.find("."+m[j]);k?h.addClass("ws-hidden"):h.removeClass("ws-hidden");}this._setPositionShadow();}},_drawButtons:function(n,m,k){var h=this,f=this._regularizeButtons(n);for(var j=0,g=f.length;j<g;j++){(function(){var o=j;if(!Object.isEmpty(f[j])){var p=h.getId()+"-"+k+"-"+f[j].name,q=f[j].handlers?{}:{handlers:{onActivated:function(){h._checkRecordsCount().addCallback(function(){if(f[o]["userButton"]){f[o].action.apply(h._currentView);}else{h._actions[k][f[o].name]();}});}}};var r="auto";if(f[j]["userButton"]===true){r=h._getButtonWidthByCaption(f[j].tooltip||"");if(f[j].img){r+=$ws._const.OperationsPanel.iconWidth;}}var l=$.extend(q,f[j],{element:p,parent:h,width:r,renderStyle:"asLink",caption:f[j].caption,imgAlign:"left",arg:j}),i=$(['<div class="ws-button-container ',f[j].name,(f[j].caption?"ws-hidden":""),(f[j].hasMenu?" ws-with-menu":""),'"><div id="',p,'"></div>',(f[j].hasMenu?'<span class="ws-operations-panel-menu-indicator"></span>':"")].join(""));if(f[j].hasMenu){i.find(".ws-operations-panel-menu-indicator").bind("click",function(v){var t=$(this).prev().attr("id").split("-"),s="";for(var u=1;u<t.length;u++){if(s!==""){s+="-";}s+=t[u];}h._onClickMenuHandler(s,v);}).hover(function(){var s=$(this).prev().find(".ws-button-image");s.addClass("icon-hover");s.removeClass("icon-primary");},function(){var s=$(this).prev().find(".ws-button-image");s.removeClass("icon-hover");s.addClass("icon-primary");});}h._panelBlock.find(".ws-operations-panel-buttons"+m).append(i);h._dChildReady.push($ws.core.attachInstance("SBIS3.CORE.Button",l).addCallback(function(s){h._buttons[k][s.getName()]=s;return s;}));}})();}},_prepareHTMLForRecord:function(h){var l=h.getColumns(),g='<table class="ws-dataview-sum-table">';for(var k=0,f=l.length;k<f;k++){var j=h.get(l[k]);switch(h.getColumnType(l[k])){case"Деньги":j=$ws.render.defaultColumn.money(j);break;case"oid":case"int2":case"int4":case"int8":case"Число целое":j=$ws.render.defaultColumn.integer(j);break;default:break;}g+=['<tr class="ws-sum-tr">','<td class="ws-sum-left">'+l[k]+"</td>",'<td class="ws-sum-right">'+j+"</td>","</tr>"].join("");}g+="</table>";return g;},_prepareHTMLForColumns:function(){var j=this._getColumns(),g,f;if(j&&(f=j.length)>0){g='<table class="ws-select-columns-table">';for(var h=0;h<f;h++){g+=['<tr class="ws-sum-tr ws-select-columns-tr-checked">','<td class="ws-sum-left">'+j[h]+"</td>",'<td class="ws-sum-right"><span class="ws-select-columns-checkbox ws-select-columns-checked"></span></td>',"</tr>"].join("");}g+="</table>";}return g;},_makeArgsForSum:function(f,h,g){return{"ИмяМетода":this._currentView.getDataSource().readerParams.linkedObject+"."+f,"Фильтр":this._currentView.getRecordSet().getReader().prepareFilter(h),"Поля":g};},_getParameter:function(h,g){if(h){var f=h.split("-");return f[f.length-(g?1:2)];}return undefined;},useSaveSelectedColumns:function(f){this._isUseSaveSelectedColumns=!!f;},_prepareSaveSubMenu:function(f,n){if(f==="saveToPDF"||f==="saveToExcel"){var k=f==="saveToPDF",o=n==="mass",g=!o,m=this._preparePrintSubMenu(o,true,k),p=this,h;if(!m){m=[];}h=m.length;if(h>0||(f==="saveToExcel"&&this._isUseSaveSelectedColumns)){if(h>1||(f==="saveToExcel"&&this._isUseSaveSelectedColumns)){for(var j=0;j<h;j++){m[j].handlers={onActivated:function(l,i){p._checkRecordsCount().addCallback(function(){if(g){p._saveToFile(p._getParameter(l,true),p._getParameter(l),i.addClass.indexOf("ws-report-for-list")!==-1?true:o,g);}else{p._validateRecordCount("Что сохранить в "+p._getParameter(l,true).toUpperCase()).addCallback(function(){p._saveToFile(p._getParameter(l,true),p._getParameter(l),o,g);});}});}};}if(!k&&this._isUseSaveSelectedColumns){if(h===0){m.push({caption:"Как на экране",addClass:"ws-operations-panel-submenu",id:"screen-view-excel",name:"screen-view",handlers:{onActivated:function(i){p._checkRecordsCount().addCallback(function(){var l=p._getParameter(i,true),q=!o?p._currentView.getSelection(true):p._currentView.getRecordSet().getRecords();p._getFile(l,undefined,undefined,q,o,undefined,true);});}}});}m.push({caption:"Выбранные столбцы",addClass:"ws-operations-panel-submenu",id:"selected-columns-"+(m.length+1)+"-excel",name:"selected-columns",handlers:{onActivated:function(){p._checkRecordsCount().addCallback(function(){var i=!o?p._currentView.getSelection(true):p._currentView.getRecordSet().getRecords(),l={data:i,isReportsForList:o};p._attachDialog(false,"selectColumnsDialog","ws-operations-panel-select-columns",undefined,l);});}}});}}else{if(k){if(n==="mass"){p._actions.mass["saveToPDF"]=p._options.massOperations.save&&p._options.massOperations.save.menu&&p._options.massOperations.save.menu.saveToPDF&&function(){p._checkRecordsCount().addCallback(function(){p._validateRecordCount("Что сохранить в PDF").addCallback(function(){p._saveToFile("pdf",m[0].caption,true,false,false);});});};}else{p._actions.selected["saveToPDF"]=p._options.selectedOperations.save&&p._options.selectedOperations.save.menu&&p._options.selectedOperations.save.menu.saveToPDF&&function(){p._checkRecordsCount().addCallback(function(){var i=m[0].addClass.indexOf("ws-report-for-list")!==-1;p._saveToFile("pdf",m[0].caption,i,true,false);});};}}else{if(!this._isUseSaveSelectedColumns){if(n==="mass"){p._actions.mass["saveToExcel"]=p._options.massOperations.save&&p._options.massOperations.save.menu&&p._options.massOperations.save.menu.saveToExcel&&function(){p._checkRecordsCount().addCallback(function(){p._validateRecordCount("Что сохранить в EXCEL").addCallback(function(){p._saveToFile("excel",m[0].caption,true,false,false);});});};}else{p._actions.selected["saveToExcel"]=p._options.selectedOperations.save&&p._options.selectedOperations.save.menu&&p._options.selectedOperations.save.menu.saveToExcel&&function(){p._checkRecordsCount().addCallback(function(){var i=m[0].addClass.indexOf("ws-report-for-list")!==-1;p._saveToFile("excel",m[0].caption,i,true,false);});};}}}return undefined;}return m;}}return undefined;},_preparePrintSubMenu:function(w,g,t){var u=this._currentView.getReports(w),q=[],x=this,y=typeof(t)==="boolean"?(t?"pdf":"excel"):"",f=[];if(!u||(u.length<=1&&!g)){return undefined;}for(var p=0,h=u.length;p<h;p++){f.push(0);}if(g&&!w){var o=this._currentView.getReports(true);for(var n=0,v=o.length;n<v;n++){f.push(1);}u=u.concat(o);}for(var r=0,s=u.length;r<s;r++){var m={caption:u[r],addClass:"ws-operations-panel-submenu"+(!!f[r]?" ws-report-for-list":""),id:u[r]+"-"+(y?y:r),name:u[r],handlers:{onActivated:function(i){x._checkRecordsCount().addCallback(function(){x._validateRecordCount("Что напечатать").addCallback(function(){x._printReport(w,x._currentView.getSelection(true).length>0,x._getParameter(i));});});}}};q.push(m);}return q;},_serializeRecords:function(g){var k={s:[],d:[]},j,f;if(g&&(f=g.length)>0){for(var h=0;h<f;h++){if(g[h] instanceof $ws.proto.Record){if(h===0){j=g[h].toJSON();k.s=j.s;k.d.push(j.d);}else{k.d.push(g[h].getDataRow());}}}}return k;},_getColumns:function(){var f=[],h=this._currentView.getColumns();for(var g=0;g<h.length;g++){if(h[g].field){f.push(h[g].field);}}return f;},_getFile:function(h,i,o,v,r,s,f,q,g){var j=this._currentView.getDataSource().readerParams,k=j?j.queryName:"Список",u=i?i:(q?"Выбранные столбцы":"Как на экране"),w=h==="pdf"?"PDF":"Excel",m=h==="pdf"?"Сохранить":(i?"СохранитьПоHTML":(r&&!f?"Сохранить":"СохранитьВыборочно")),n=this._currentView.getQuery(),l=(""+Math.random()).substr(2)*1,p=this,t;if(h==="excel"&&!i){if(r&&!f){t={"ИмяМетода":j?j.linkedObject+"."+k:"","Фильтр":$ws.helpers.prepareFilter(n),"Сортировка":$ws.helpers.prepareSorting(n)};}else{t={"Записи":v?(v instanceof Array?this._serializeRecords(v):v):this._currentView.getRecordSet()};}t["Поля"]=g&&g.length>0?g:this._getColumns();}if(t&&!Object.isEmpty(t)){t["Название"]=u;t.fileDownloadToken=l;}if(h==="pdf"||(h==="excel"&&i!==undefined)){o=this._currentView.getTransform(i,w,o,r);s.prepareReport(v,o,this._currentView.isHierarchyMode()?this._currentView.getCurrentRootNode():undefined).addCallback(function(x){p._checkSaveIndicator(w,m,{html:x,"Название":u,fileDownloadToken:l},h);});}else{if(t&&!Object.isEmpty(t)&&w&&m){this._checkSaveIndicator(w,m,t,h);}}},_checkSaveIndicator:function(i,h,j,f){var g=this;if($ws.single.ControlStorage.containsByName("ws-panel-indicator")){g._sendRequest(i,h,j);}else{$ws.core.attachInstance("SBIS3.CORE.LoadingIndicator",{message:"Подождите, идет выгрузка данных в "+f.toUpperCase(),name:"ws-panel-indicator"}).addCallback(function(k){g._saveIndicator=k;g._sendRequest(i,h,j);});}},_sendRequest:function(g,f,i){var h=this._container.find(".ws-panel-form");if(h[0].length>0){h.find("[name=Запрос]").val(JSON.stringify({jsonrpc:"2.0",method:g+"."+f,params:i,protocol:3,id:(""+Math.random()).substr(2)}));h.submit();this._checkFileDownload(i.fileDownloadToken);}},_checkFileDownload:function(g){var f=this,h="fileDownloadToken_"+g,i;i=setInterval(function(){var j=$.cookie(h);if(parseInt(j,10)===g){clearInterval(i);f._saveIndicator.hide();f._saveIndicator.destroy();f._saveIndicator=undefined;$.cookie(h,null);}},1000);},_saveToFile:function(r,p,n,f,l,m){var j=this._currentView.getReportPrinter(),i=this._currentView.getRecordSet().getRecords(),k=l&&!f?i:this._currentView.getSelection(),h=l?"default-list-transform.xsl":this._currentView.getCurrentTransform(p,n),g="",q=this,o=function(){q._getFile(r,p,h,this.getRecords(),n,j,l,m);};$ws.core.attachInstance("SBIS3.CORE.LoadingIndicator",{message:"Сохранение записей...",name:"ws-panel-indicator"}).addCallback(function(s){q._saveIndicator=s;if(j===undefined){j=new $ws.proto.ReportPrinter({columns:q._currentView.getColumnMap(),titleColumn:q._currentView.isHierarchyMode()?q._currentView.getTitleName():undefined});}if(f!==true&&!l){g=q._isShowSelection?i:q._currentView.getPrepareReportDataResult(p,n,k,false);}else{g=k;}if(g!==false){if(g instanceof $ws.proto.Deferred){g.addCallback(function(t){t=q._parseArray(t);if(t instanceof Array&&t.length>0){if(!f){t=q.getNeededRecords(t);}q._getFile(r,p,h,t,n,j,l,m);}else{q._getRecords(q._recordsCount,o);}}).addErrback(function(t){$ws.core.setCursor(true);$ws.core.alert(t.message,t.details,"error");});}else{g=q._parseArray(g);if(g instanceof Array&&g.length>0){if(!f){g=q.getNeededRecords(g);}q._getFile(r,p,h,g,n,j,l,m);}else{q._getRecords(q._recordsCount,o);}}}else{$ws.core.setCursor(true);}});},_parseArray:function(f){if(f instanceof $ws.proto.Record){return[f];}if(f instanceof $ws.proto.RecordSet){return f.getRecords();}return f;},_getRecords:function(h,i){if(typeof(parseInt(h,10))==="number"){var g=$ws.core.merge({},this._currentView.getDataSource()),f=this;g.usePages="parts";g.rowsPerPage=h;g.firstRequest=true;g.handlers=g.handlers||{};if(typeof(i)==="function"){g.handlers.onAfterLoad=function(){if(this.hasNextPage()&&f._recordsCount===$ws._const.OperationsPanel.secondBarrier){$ws.core.alert("Операция будет проведена только над первыми"+$ws._const.OperationsPanel.secondBarrier+"записями").addCallback(function(){i.apply(this);});}else{i.apply(this);}};}$ws.core.attachInstance("Source:RecordSet",g);}},_printReport:function(k,f,p){var j=this._currentView.getReports(k),h=this._currentView.getRecordSet(),g=j?j.length:0,o,q=this,m=function(l,s,r){l.hide();l.destroy();s.apply(this,r);};if(g==1||p||(g===0&&k)){o=new e({message:"Печать записей...",name:"ws-panel-indicator"});if(g===1||p){var n=p?p:j[0];if(f){m.apply(q._currentView,[o,q._currentView.printReport,[n,k,q._currentView.getSelection(),true]]);}else{var i=function(l){q._currentView.printReport(n,k,l,undefined,true);};if(h.getRecords().length<q._recordsCount){q._getRecords(q._recordsCount,function(){m.apply(q,[o,i,[q.getNeededRecords(this.getRecords())]]);});}else{m.apply(q,[o,i,[q.getNeededRecords(h.getRecords())]]);}}}else{if(g===0&&k){if(f){m.apply(q._currentView,[o,q._currentView.printReport,[undefined,k,q._currentView.getSelection(),true]]);}else{q._getRecords(q._recordsCount,function(){m.apply(q._currentView,[o,q._currentView.printReport,[undefined,true,this.getRecords()]]);});}}}}},getNeededRecords:function(f){if(f instanceof Array&&f.length>this._recordsCount){return f.slice(0,this._recordsCount);}return f;},_needResizer:function(){return false;},_checkRecordsCount:function(){var f=new $ws.proto.Deferred();if(this._currentView.getRecordSet().getRecords().length>0){f.callback();}else{f.errback();}return f;},destroy:function(){this._currentView=null;this._panelOpenContainer=null;this._panelButtonsContainer=null;this._massContainer=null;this._markContainer=null;this._selectedContainer=null;this._textContainer=null;this._panelBlock=null;this._destroyMenu();this._destroyButtons();$ws.proto.OperationsPanel.superclass.destroy.apply(this,arguments);}});return $ws.proto.OperationsPanel;});