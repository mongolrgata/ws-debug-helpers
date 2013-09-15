$ws.proto.DataViewAbstract.HistoryPlugin=$ws.proto.DataViewAbstract.extendPlugin({$protected:{_options:{display:{},_menuButtons:{history:["Показать историю изменений (Ctrl+Н)","sprite:icon-16 icon-History icon-primary","history"]}}},$condition:function(){return this._options.display.showHistory===true;},$constructor:function(){$ws.single.CommandDispatcher.declareCommand(this,"history",this.showHistoryForActiveRecord);this._keysWeHandle[$ws._const.key.h]=true;this._notify("onNewAction",{title:"История записи (Ctrl+H)",icon:$ws._const.theme?"sprite:icon-16 icon-History icon-primary":"history.png",name:"history",callback:"history"});},showHistory:function(c,e){$ws.core.setCursor(false);this._useKeyboard=true;var b=$ws.core.merge({},this._initialSource),d={readerType:b.readerType||"ReaderUnifiedSBIS",filterParams:e?e:{},hierarchyField:"",readerParams:b.readerParams,firstRequest:true,usePages:"full",rowsPerPage:100},a=this;d.filterParams["ИдО"]=c;d.readerParams.queryName="История";$ws.core.attachInstance("Source:RecordSet",d).addCallback(function(f){$ws.core.attachInstance("SBIS3.CORE.Dialog",{template:"historyDialog",handlers:{onReady:function(){this.getChildControlByName("ws-browser-history").subscribe("onReady",function(){var g=this;if(f.getRecordCount()===0){f.subscribe("onAfterLoad",function(){g.setData(f);});}else{this.setData(f);}});},onAfterShow:function(){$ws.core.setCursor(true);},onAfterClose:$.proxy(a._mouseMonitor,a)}});}).addErrback(function(){$ws.core.setCursor(true);});},showHistoryForActiveRecord:function(){this.showHistory(this.getActiveRecord().getKey());},_keyboardHover:function(b,a){if(this.isActive()&&this._isCtrl(b)&&b.which===$ws._const.key.h){this.showHistoryForActiveRecord();return false;}return a;},_initActionsFlags:function(){this._actions=this._actions||{};this._actions.history=$.proxy(this.showHistoryForActiveRecord,this);}});