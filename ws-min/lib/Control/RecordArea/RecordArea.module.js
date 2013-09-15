$ws.declareModule({namespace:"SBIS3.CORE",name:"RecordArea",imports:["SBIS3.CORE.TemplatedArea","SBIS3.CORE.DialogRecord"]},function(a,b){$ws.proto.RecordArea=a.extend({$protected:{_options:{readOnly:false,isNewRecord:false,reports:{}},_pending:[],_waiting:[],_record:null,_recordSaved:false,_loadingIndicator:undefined,_saving:false,_reportPrinter:null,_printMenu:null,_printMenuIsShow:false,_lastMenuItemList:[],_window:{remove:function(){},hide:function(){},_titleBar:false}},$constructor:function(){this._publish("onBeforeDelete","onRecordDeleted","onBeforeSave","onSave","onSuccess","onFail","onRecordUpdate","onAfterClose","onBeforeClose","onBeforeShowPrintReports","onPrepareReportData","onSelectReportTransform");if(this.getReports().length!==0){this._reportPrinter=new $ws.proto.ReportPrinter({});}$ws.single.CommandDispatcher.declareCommand(this,"ok",function(){b.prototype.ok.apply(this,[]);});$ws.single.CommandDispatcher.declareCommand(this,"close",function(){b.prototype.close.apply(this,[]);});$ws.single.CommandDispatcher.declareCommand(this,"cancel",function(){b.prototype.cancel.apply(this,[]);});$ws.single.CommandDispatcher.declareCommand(this,"save",function(c,d){b.prototype.save.apply(this,[c,d]);});$ws.single.CommandDispatcher.declareCommand(this,"delete",function(){b.prototype.delRecord.apply(this,arguments);});$ws.single.CommandDispatcher.declareCommand(this,"print",function(c){b.prototype.print.apply(this,[c]);});$ws.single.CommandDispatcher.declareCommand(this,"printReport",function(c){b.prototype.printReport.apply(this,[c]);});},isRecordSaved:function(){return this._recordSaved;},updateRecord:function(){return b.prototype.updateRecord.apply(this,[]);},addPendingOperation:function(){return b.prototype.addPendingOperation.apply(this,arguments);},waitAllPendingOperations:function(){return b.prototype.waitAllPendingOperations.apply(this,arguments);},_checkPendingOperations:function(){return b.prototype._checkPendingOperations.apply(this,arguments);},save:function(){return b.prototype.save.apply(this,arguments);},_processError:function(c){b.prototype._processError.apply(this,[c]);},close:function(){b.prototype.close.apply(this,arguments);},_dialogRecordSuperClassClose:function(){b.prototype._dialogRecordSuperClassClose.apply(this,arguments);},ok:function(){b.prototype.ok.apply(this,arguments);},_setEnabledForChildControls:function(){b.prototype._setEnabledForChildControls.apply(this,arguments);},_showLoadingIndicator:function(){b.prototype._showLoadingIndicator.apply(this,arguments);},_hideLoadingIndicator:function(){b.prototype._hideLoadingIndicator.apply(this,arguments);},isAllReady:function(){return b.prototype.isAllReady.apply(this,arguments);},getChildControls:function(){return b.prototype.getChildControls.apply(this,arguments);},getReports:function(){return b.prototype.getReports.apply(this,arguments);},_printMenuItemsIsChanged:function(){return b.prototype._printMenuItemsIsChanged.apply(this,arguments);},_createPrintMenu:function(c){return b.prototype._createPrintMenu.apply(this,arguments);},showReportList:function(c){return b.prototype.showReportList.apply(this,arguments);},printReport:function(c){return b.prototype.printReport.apply(this,arguments);},_showReport:function(c,e,d){return b.prototype._showReport.apply(this,arguments);},print:function(c){return b.prototype.print.apply(this,arguments);},getTitle:function(){return document.title;},_hideWindow:function(){},getRecord:function(){return this.getLinkedContext().getRecord();},setReadOnly:function(){b.prototype.setReadOnly.apply(this,arguments);},isNewRecord:function(){return b.prototype.isNewRecord.apply(this,arguments);}});return $ws.proto.RecordArea;});