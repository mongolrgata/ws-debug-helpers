(function(){var d=BOOMR.plugins.WS.startSpan("AllTime",{stacked:true});var h=true;var c=false;function b(i){$ws.core.setCursor(true);$ws.core.alert(i.message);return i;}function g(i){$ws.single.CommandDispatcher.declareCommand(i,"close",i.close?i.close:function(){window.close();});}function e(k,m,j,n,l,p){var i=new $ws.proto.ReportPrinter({columns:n,titleColumn:l}),o=$ws.proto.Abstract.prototype._notify.apply(p,["onSelectReportTransform",p.idR,k,m,p.list]);i.prepareReport(k,o||m,j).addCallback(function(q){return $ws.core.ready.addCallback(function(){return $ws.single.ControlStorage.waitChildByName("ws-dataview-print-report").addCallback(function(r){r.subscribe("onContentSet",function(){$ws.core.setCursor(true);});r.setHTML(q);});});}).addErrback(b);}function a(k,j,i,p,m){var o=i!==undefined&&i instanceof $ws.proto.Record,n=typeof j=="string"?$("#"+j):j,l=n.attr("hasMarkup");if(o&&i.getKey()!==null){$ws.single.HashManager.set("usedId",i.getKey(),true);}$ws.core.attachTemplate(k,l||$ws._const.fasttemplate,l?n.get(0).outerHTML:"").addCallback(function(u){var t=new $ws.proto.Context(),q=g;if(c){if(p.idR&&!p.list){if(p.keys.length>0){var v=new $ws.proto.ParallelDeferred(),s=[];$ws.core.attachInstance("Source:RecordSet",$ws.core.merge({readerType:"ReaderUnifiedSBIS",firstRequest:false},p.dS)).addCallback(function(w){for(var y=0,x=p.keys.length;y<x;y++){v.push(w.readRecord(p.keys[y]).addCallback(function(z){s.push(z);}));}v.done();v.getResult().addCallback(function(){var z=$ws.proto.Abstract.prototype._notify.apply(p,["onPrepareReportData",p.idR,s]);if(z instanceof $ws.proto.Deferred){z.addCallback(function(A){if(A instanceof $ws.proto.Record||A instanceof $ws.proto.RecordSet||A instanceof Array){s=A;}e(s,p.xsl,p.root,p.cols,p.tCol,p);}).addErrback(function(A){b(A);});}else{if(z instanceof $ws.proto.Record||z instanceof $ws.proto.RecordSet||z instanceof Array){s=z;}e(s,p.xsl,p.root,p.cols,p.tCol,p);}}).addErrback(function(z){b(z);});});}}else{$ws.core.attachInstance("Source:RecordSet",$ws.core.merge({readerType:"ReaderUnifiedSBIS"},p.dS)).addCallback(function(w){w.subscribe("onAfterLoad",function(){e(w,p.xsl,p.root,p.cols,p.tCol,p);});});}}if(o){t.setContextData(i);q=function(w){g(w);if(w.isNewRecord()){w.subscribe("onRecordUpdate",function(x,y){if($ws.single.HashManager.get("usedId")===undefined&&y!==null){$ws.single.HashManager.set("usedId",y,true);}});w.subscribe("onBeforeClose",function(x){if(!this.isRecordSaved()){this.getRecord().destroy().addBoth(function(){if(x.getResult()!==false){w.destroy(true);}});}});}w.destroy=function(A){if(A===true||!(w.isNewRecord()&&!this.isRecordSaved())){if(!m){if(!p.history&&!!window.opener){var x=false;try{x=window.opener.$ws;}catch(z){}if(x){try{var y=x.single.ControlStorage.get(p.id);if(!y.isReadOnly()){y.reload();}}catch(z){}window.opener.focus();window.close();return;}}if(window.previousPageURL===undefined){window.close();}else{window.location.href=window.previousPageURL;}}else{$ws.core.bootup(m);}}};};}function r(){if(h){BOOMR.page_ready();}d.stop();}if(u.isPage()){$ws.core.attachInstance("SBIS3.CORE."+(p?"RecordArea":"TemplatedArea"),{template:u,horizontalAlignment:"Stretch",verticalAlignment:"Stretch",autoWidth:true,autoHeight:true,context:t,element:j,isNewRecord:p&&(p.pk===undefined||p.copy===true),enable:p&&p.readOnly!==undefined?!p.readOnly:true,page:true,reports:p&&p.reports||{},handlers:{onBeforeShowPrintReports:p?p._events.onBeforeShowPrintReports:[],onSelectReportTransform:p?p._events.onSelectReportTransform:[],onPrepareReportData:p?p._events.onPrepareReportData:[],onReady:r}}).addCallback(q);}else{n.empty();$ws.core.attachInstance("SBIS3.CORE.Dialog",{context:t,template:u,enable:p&&p.readOnly!==undefined?!p.readOnly:true,handlers:{onReady:r}}).addCallback(q);}});}function f(p){var m=new $ws.proto.ParallelDeferred();for(var o in p._events){if(!p._events.hasOwnProperty(o)){continue;}var k=p._events[o];for(var n=0,j=k.length;n<j;n++){(function(q,l){m.push($ws.core.getHandler(k[l]).addCallback(function(i){p._events[q][l]=i;}));})(o,n);}}return m.done().getResult();}$ws.core.bootup=function(k,i,j,l){if(arguments.length===0||(arguments.length==1&&typeof arguments[0]=="boolean")){$(document).ready(function(){$(".ws-root-template").each(function(){var m=$(this);$ws.core.bootup(m.data("template-name"),m,k);});});return;}if(j!==undefined){h=j;}i=i||"ctr";$ws.core.withComponents("Source").addCallback(function(){$(document).ready(function(){var m=$ws.single.GlobalContext.getValue("editParams");if(m!==undefined){m=$ws.helpers.deserializeURLData(m);f(m).addCallback(function(){m.method=m.method||"Список";return $ws.core.attachInstance("Source:RecordSet",{readerType:m.type||"ReaderUnifiedSBIS",filterParams:m.filter||{},readerParams:{dbScheme:"",queryName:m.method,readMethodName:m.readMethod||"Прочитать",createMethodName:m.createMethod||"Создать",updateMethodName:m.updateMethod||"Записать",destroyMethodName:m.destroyMethod||"Удалить",linkedObject:m.obj,format:m.format},firstRequest:false,requiredParams:[],usePages:""});}).addCallback(function(n){m._eventsAllowed=true;(function(){if(m.pk===undefined&&$ws.single.HashManager.get("usedId")===undefined){var q=m.filter||{};if(m.hierMode){q[m.pIdCol]={hierarchy:[m.pId,(m.branch?true:null)]};}var o=$ws.proto.Abstract.prototype._notify.apply(m,["onBeforeCreate",m.pId,m.branch?true:null,q]);if(o instanceof $ws.proto.Deferred){var r=new $ws.proto.Deferred();o.addCallbacks(function(s){if(s instanceof $ws.proto.Record){r.callback(s);}else{if(s.constructor===Object){q=$ws.core.merge(s,q);}if(!!m.id){q["ВызовИзБраузера"]=true;}n.createRecord(q).addCallbacks(function(t){r.callback(t);},function(t){r.errback(t);});}},function(s){r.errback(s);});return r;}else{if(o instanceof $ws.proto.Record){return new $ws.proto.Deferred().callback(o);}else{if(o===false){return new $ws.proto.Deferred().callback(o);}else{if(!!m.id){q["ВызовИзБраузера"]=true;}return n.createRecord(q,m.format||m.obj+"."+m.method);}}}}else{if(m.copy===true){return n.copyRecord(m.pk);}else{var p=$ws.proto.Abstract.prototype._notify.apply(m,["onBeforeRead",m.pk||$ws.single.HashManager.get("usedId")]);if(p instanceof $ws.proto.Deferred){return p;}else{if(p instanceof $ws.proto.Record){return new $ws.proto.Deferred().callback(p);}else{if(p===false){return new $ws.proto.Deferred().callback(p);}else{return n.readRecord(m.pk||$ws.single.HashManager.get("usedId"),m.format||m.obj+"."+m.method);}}}}}})().addCallbacks(function(o){var q=function(s,u){if(s instanceof $ws.proto.Record){if(u.changedRecordValues){for(var t in u.changedRecordValues){if(u.changedRecordValues.hasOwnProperty(t)){s.set(t,u.changedRecordValues[t]);}}}var r=$ws.proto.Abstract.prototype._notify.apply(u,["onBefore"+(u.pk===undefined?"Insert":"Update"),s]);u.pk=u.pk?u.pk:$ws.single.HashManager.get("usedId");if(typeof(r)!=="boolean"){a(typeof(r)=="string"?r:k,i,s,u,l);}else{if(u.pk===undefined&&r===false){s.destroy();}}}};if(m._events.hasOwnProperty("onBeforeShowRecord")){var p=$ws.proto.Abstract.prototype._notify.apply(m,["onBeforeShowRecord",o]);if(p instanceof $ws.proto.Deferred){p.addCallback(function(r){q(r,m);});return;}if(p!==undefined){o=p;}}q(o,m);},function(p){var o=m.obj+".";if(m.pk===undefined){o+=(m.createMethod||"Создать");}else{o+=(m.readMethod||"Прочитать");}if(p&&p.message&&$ws.proto.Abstract.prototype._notify.apply(m,["onLoadError",p,o])!==true){$ws.core.alert(p.message);}});});}else{m=$ws.single.GlobalContext.getValue("printParams");if(m!==undefined){c=true;m=$ws.helpers.deserializeURLData(m);f(m).addCallback(function(){m._eventsAllowed=true;a(k,i,undefined,m);});}else{a(k,i,undefined);}}});});};})();