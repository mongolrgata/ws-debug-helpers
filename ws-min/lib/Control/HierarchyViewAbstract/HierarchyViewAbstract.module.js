$ws.declareModule({namespace:"SBIS3.CORE",name:"HierarchyViewAbstract",imports:["SBIS3.CORE.TableView"]},function(a){$ws.single.DependencyResolver.register("SBIS3.CORE.HierarchyViewAbstract",function(b){var c={};if(b){if(b.display.showPathSelector){c["SBIS3.CORE.PathSelector"]=1;}}return Object.keys(c);},"SBIS3.CORE.DataViewAbstract/SBIS3.CORE.TableView");$ws.proto.HierarchyViewAbstract=a.extend({$protected:{_options:{allowMove:false,editBranchMode:"newDialog",editBranchDialogTemplate:"",editFullScreenBranchTemplate:undefined,selectionType:"all",folderLinkAction:"open",display:{hierColumn:"Раздел",titleColumn:"Название",partiallyLoad:false,rootNode:null,fixedExpand:false,expand:"",showPathSelector:true},optionsSaver:{}},_hierColumnParentId:"Раздел",_hierColumnIsLeaf:"Раздел@",_hierColumnHasChild:"Раздел$",_loaded:{},_currentRootId:null,_wayRS:undefined,_wayRSDeferred:undefined,_rootNode:null,_pathSelector:undefined,_pathReady:undefined,_titleColumnIndex:-1,_rowTemplates:[undefined,undefined],_selectAfterPathLoad:true,_isInsertOnFolderInTree:false,_expanded:{},_systemParams:{"ВидДерева":"",HierarchyField:"","Разворот":"","ПутьКУзлу":"","ЗаголовокИерархии":"","_ЕстьДочерние":false},_pageSaver:{"null":0},_keysWeHandle:[$ws._const.key.enter,$ws._const.key.down,$ws._const.key.up,$ws._const.key.del,$ws._const.key.insert,$ws._const.key.f3,$ws._const.key.esc,$ws._const.key.pageUp,$ws._const.key.minus,$ws._const.key.pageDown,$ws._const.key.space,$ws._const.key.q,$ws._const.key.n,$ws._const.key.b,$ws._const.key.v,$ws._const.key.m,$ws._const.key.backspace]},$constructor:function(){$ws.single.CommandDispatcher.declareCommand(this,"newFolder",this._insertRecordFolder);$ws.single.CommandDispatcher.declareCommand(this,"newChildItem",this._insertChildRecordItem);$ws.single.CommandDispatcher.declareCommand(this,"newChildFolder",this._insertChildRecordFolder);this._currentRootId=this._rootNode;if(this._emptyDataBlock&&this._options.display.showPathSelector&&this._options.display.showHead!==true){if(!this._options.display.showToolbar){this._emptyDataBlock.addClass("ws-browser-empty-top");}if(this._options.display.hasZebra){this._emptyDataBlock.addClass("ws-browser-empty-border");}}this._publish("onDragStart","onDragMove","onDragStop","onConvert");},getTitleName:function(){return this._options.display.titleColumn;},getCurrentRootId:function(){return this._currentRootId;},_updateHierColumnParams:function(b){this._hierColumnParentId=b;this._hierColumnIsLeaf=b+"@";this._hierColumnHasChild=b+"$";},_configChecking:function(){this._updateHierColumnParams(this._options.display.hierColumn);$ws.proto.HierarchyViewAbstract.superclass._configChecking.apply(this,arguments);if(this._options.display.rootNode!==null&&typeof(this._options.display.rootNode)==="object"){var b=this.getLinkedContext(),c=this._options.display.rootNode.fieldName;if(b.getValue!==undefined&&b.getValue(c)!==undefined){this._rootNode=b.getValue(c);}}else{this._rootNode=this._options.display.rootNode;}},_initSystemParams:function(){this._systemParams["ВидДерева"]="С узлами и листьями";if(this._options.selectionType==="node"||this._options.display.viewMode=="foldersTree"){this._options.filterParams["ВидДерева"]="Только узлы";this._systemParams["ВидДерева"]="Только узлы";}if(this._options.filterParams.HierarchyField){this._systemParams.HierarchyField=this._options.filterParams.HierarchyField;}else{this._systemParams.HierarchyField=this._hierColumnParentId;}this._systemParams[this._hierColumnParentId]=this._rootNode;this._systemParams["Разворот"]=this._options.display.partiallyLoad?"Без разворота":"С разворотом";this._systemParams["ЗаголовокИерархии"]=this._options.display.titleColumn;this._systemParams["ПутьКУзлу"]=true;},_insertRowPosition:function(c,b){if(b&&b.altKey){return false;}return this._currentRootId;},_initActionsFlags:function(){$ws.proto.HierarchyViewAbstract.superclass._initActionsFlags.apply(this,arguments);var b=this;if(this._options.allowAdd!==false&&!this._options.display.readOnly){if(this._options.editDialogTemplate){this._actions.addItem=function(e,d){var c=b._insertRowPosition(e,d);if(c!==false){b._showRecordDialog({parentId:c,isBranch:false});}};}if(this._options.editBranchDialogTemplate){this._actions.addFolder=function(e,d){var c=b._insertRowPosition(e,d);if(c!==false){b._showRecordDialog({parentId:c,isBranch:true});}};}}if(!this._actions.edit&&this._options.editBranchDialogTemplate&&this._options.allowEdit!==false){this._actions.edit=this._actionEdit.bind(this);}},setData:function(d){$ws.proto.HierarchyViewAbstract.superclass.setData.apply(this,arguments);var c=this,b=function(){d.setHierarchyField(c._hierColumnParentId);c._pathReady.addCallback(function(){c._pathSelector.setPath([]);});c._currentRootId=c._rootNode;};if(this._parent&&!this._parent.isReady()){if(this._setDataHandler){this._parent.unsubscribe("onReady",this._setDataHandler);}this._setDataHandler=this._setDataHandler.callNext(b);this._parent.subscribe("onReady",this._setDataHandler);}else{b();}},_expandFromFilter:function(b,c){},_prepareQueryFilter:function(d){var b=$ws.proto.HierarchyViewAbstract.superclass._prepareQueryFilter.apply(this,arguments);for(var c in b){if(b.hasOwnProperty(c)){if(c==this._hierColumnParentId){this._systemParams[c]=b[c];this._currentRootId=b[c];}else{if(c=="Разворот"&&d.hasOwnProperty(c)&&this._options.display.expand===""){this._systemParams[c]=b[c];this._expandFromFilter(b,b[c]);}}}}this._loaded={};if(b["Разворот"]!=="С разворотом"){var e=this._expanded[this._rootNode];this._expanded={};if(e){this._expanded[this._rootNode]=e;}}return b;},_prepareDataSource:function(){$ws.proto.HierarchyViewAbstract.superclass._prepareDataSource.apply(this,arguments);var c=this._options.dataSource;if(!(c instanceof Object)){return;}var b={usePages:this._options.display.expand?"":this._options.display.usePaging};if(this._options.display.expand){this._expandAll(this._options.display.expand==="folders",true);}if(this._options.dataSource.filterParams[this._hierColumnParentId]===""){this._options.dataSource.filterParams[this._hierColumnParentId]=this._rootNode;}$ws.core.merge(c,b);this._currentRootId=this._rootNode;if(c.firstRequest){this._loaded[this._rootNode]=true;}},_initDataSource:function(){$ws.proto.HierarchyViewAbstract.superclass._initDataSource.apply(this,arguments);this._pathReady=new $ws.proto.Deferred();this._drawPathSelector();},_findWay:function(g){var d=this._currentRecordSet.getWay(),c=[],b;if(!d){return;}while(g&&g!=this._rootNode&&d!==null){try{b=d.getRecordByPrimaryKey(g);}catch(f){b=this._currentRecordSet.getRecordByPrimaryKey(g);}c.unshift({title:b.get(this._options.display.titleColumn),id:b.getKey()});g=b.get(this._hierColumnParentId);}if(this._pathSelector&&(c.length>0)){this._pathSelector.setPath(c);}},_pathRecordSetLoaded:function(g,i,b){if(b){var l=this._wayRS.getWay(),f,c,h=l.getRecordCount(),d=[];if(this._rootNode&&l!==null&&!l.contains(this._rootNode)){this._wayRSDeferred.callback();}else{l.rewind();var e=!this._rootNode;while((f=l.next())!==false){var j=f.getKey();if(f.get(this._hierColumnIsLeaf)===false&&e){break;}if(this._rootNode==j){e=true;}if(e){d.push({title:f.get(this._options.display.titleColumn),id:j});}}this._currentRootId=c=(!d.length?this._rootNode:d[d.length-1].id);this._hovered=this._wayRS.getLoadingId();this._activeElement=undefined;this._systemParams[this._hierColumnParentId]=c;var k=this._currentRecordSet.loadNode(c,true,this._pageSaver[this._currentRootId]?this._pageSaver[this._currentRootId]:0);this._wayRSDeferred.dependOn(k);}}else{this._wayRSDeferred.errback("Не загружается путь у HierarchyViewAbstract: "+this._id);}},_createPathRecordSet:function(c){var d=$ws.core.merge({},this._initialSource),b=this;this._wayRSDeferred=new $ws.proto.Deferred();d.firstRequest=true;d.filterParams[this._hierColumnParentId]=c;d.filterParams["ПутьКУзлу"]=true;d.filterParams["ЗаголовокИерархии"]=this._options.display.titleColumn;d.pageNum=this._pageSaver[c]?this._pageSaver[c]:0;d.handlers={onAfterLoad:$.proxy(b._pathRecordSetLoaded,b)};$ws.core.attachInstance("Source:RecordSet",d).addCallback(function(e){b._wayRS=e;});return this._wayRSDeferred;},showBranch:function(b,c){return this._runInBatchUpdate("Browser.showBranch",function(){var d=this._pageSaver[b];if(this._options.display.partiallyLoad&&b!=this._rootNode&&!this._currentRecordSet.contains(b)){this._showBranchAfterPathLoad(b,c);if(!this._wayRS){return this._createPathRecordSet(b);}else{this._wayRSDeferred=new $ws.proto.Deferred();return this._wayRS.loadNode(b,true,d?d:0);}}else{return this._showActiveFolderOrElement(b,c);}});},_showBranchAfterPathLoad:function(){},isShow:function(b){return b===this._currentRootId;},_showActiveFolderOrElement:function(b,c){return this._runInBatchUpdate("Browser._showActiveFolderOrElement",function(){return this._showBranchHierarchy(b,c);});},_showBranchHierarchy:function(b,c){return this._runInBatchUpdate("Browser._showBranchHierarchy",function(){var o=[],j=b,k,e=this._hierColumnIsLeaf,g=this._hierColumnParentId,m=this._pageSaver[b];this._systemParams[this._hierColumnParentId]=b;if(this._options.display.partiallyLoad){var n=b;if(this._rootNode!=n&&this._currentRecordSet.contains(n)){k=this._currentRecordSet.getRecordByPrimaryKey(n);if(!k.get(this._hierColumnIsLeaf)){n=k.get(this._hierColumnParentId)||null;}}if(!this._isIdEqual(this._currentRootId,n)){this._hovered=b;this._currentRootId=b;this._activeElement=undefined;return this._currentRecordSet.loadNode(n,!(this._currentRecordSet.contains(n)||this._isIdEqual(this._rootNode,n)),m?m:0);}else{if(!c){this.setActiveElement(this._body.find('[rowkey="'+b+'"]'));}}}else{var f=this._currentRecordSet.getWay(),p=this,d=function(i){if(p._currentRecordSet.contains(i)){return p._currentRecordSet.getRecordByPrimaryKey(i);}else{if(f.contains(i)){return f.getRecordByPrimaryKey(i);}}return undefined;};if(j&&j!=this._rootNode){if(!d(j)){return undefined;}k=this._currentRecordSet.getRecordByPrimaryKey(j);if(!k.get(e)){j=k.get(g)||null;}}this._currentRootId=j;var l=undefined;while(j&&j!=this._rootNode){k=d(j);o.unshift({title:k.get(this._options.display.titleColumn),id:j});if(k.get(this._hierColumnIsLeaf)===false){l=j;}j=k.get(g)||null;}if(l!==undefined){for(var h=0;h<o.length;++h){if(o[h].id===l){this._currentRootId=(h>0?o[h-1].id:this._rootNode);if(!c){this._hovered=o[h];}while(o.length!==h+1){o.pop();}break;}}}if(this._pathSelector){this._pathSelector.setPath(o);}this._hovered=b;this._drawBody();this._updatePager();}return undefined;});},_reloadAfterRecordsChange:function(b){if(this._pathSelector){this._pathSelector.updateLast();}this._currentRecordSet.updatePages();var c;if(this._options.display.partiallyLoad){c=this._currentRootId;}else{c=this._rootNode;}this._currentRecordSet.loadNode(c,undefined,this._currentRecordSet.getPageNumber(),!this._options.display.partiallyLoad);},_onRecordUpdatedBegin:function(){this._minimized=false;this._initialRecordSet=false;if(this._isUpdatingRecords){return false;}this._notify("onRecordsChanged");if(this._pathSelector){this._pathSelector.updateLast();}return true;},_onRecordUpdated:function(h,m){if(!this._onRecordUpdatedBegin()||this._notifyOnAfterInsert(m)){return;}if(this._options.display.reload){var d;if(this._options.display.partiallyLoad){if(h===true){d=[];var b={},l={};for(var e=0,k=m.length;e<k;++e){if(!l[m[e]]){l[m[e]]=true;b[m[e]]=true;d.push(m[e]);}}for(var f in this._expanded){if(this._expanded.hasOwnProperty(f)){var c=f,g;while(true){if(c in b&&(this._expanded[c]||(c==this._rootNode&&!this._options.display.showRoot))&&l[f]===undefined){l[f]=true;d.push(f);break;}if(!c||c==this._rootNode){break;}g=this._currentRecordSet.contains(c)&&this._currentRecordSet.getRecordByPrimaryKey(c);if(!g){break;}c=g.get(this._hierColumnParentId);}}}if(d.length===0){return;}}else{if(this.isHierarchyMode()){d=this._getNodeForRecordUpdate(m);this._systemParams[this._hierColumnParentId]=d;}else{d=null;}}}else{d=this._rootNode||null;}this._currentRecordSet.loadNode(d,!this._options.display.partiallyLoad,this._currentRecordSet.getPageNumber(),!this._options.display.partiallyLoad);}else{this._drawBody();}},_getNodeForRecordUpdate:function(){return this._currentRootId;},applyTurn:function(c,b){return this._runInBatchUpdate("DataViewAbstract.applyTurn",function(){this._toggleTurn(c,b);});},_toggleTurn:function(c,b){},_isDefaultPagingText:function(){return true;},_updatePager:function(){this._foot.find(".ws-browser-dropdown-container").toggleClass("ws-hidden",!!this._turn);if(this._currentRecordSet&&(this._options.display.showRecordCountForEmptyData||(!this._options.display.showRecordCountForEmptyData&&this._currentRecordSet.getRecordCount()>0))&&this._options.display.showRecordsCount&&!this._isDefaultPagingText()){var f=this._count===0?this._currentRecordSet.getRecordCount():this._count,e="",c=0;e+=e===""?"Всего : ":". Всего : ";e+=f;for(var d=0,b=this._selectedRecords.length;d<b;++d){if(this._selectedRecords[d]){++c;}}if(c>0){e="Выбра"+$ws.helpers.wordCaseByNumber(c,"но","на","ны")+" "+c+" запис"+$ws.helpers.wordCaseByNumber(c,"ей","ь","и")+". "+e;}$ws.proto.HierarchyViewAbstract.superclass._updatePager.apply(this,arguments);this._rootElement.find(".ws-browser-pager-text").text(e);}else{$ws.proto.HierarchyViewAbstract.superclass._updatePager.apply(this,arguments);}},_mapColumns:function(){$ws.proto.HierarchyViewAbstract.superclass._mapColumns.apply(this,arguments);var d=this._options.display.columns,b=0;if(d){for(var c in d){if(d.hasOwnProperty(c)){var e=d[c];this._columnMap[b].useForFolder=e.useForFolder?e.useForFolder:false;if(this._columnMap[b].field===this._options.display.titleColumn){this._titleColumnIndex=b;}b++;}}}},toggleColumn:function(c,b){if(c!==this._options.display.titleColumn){$ws.proto.HierarchyViewAbstract.superclass.toggleColumn.apply(this,arguments);}},_onPathSelectorChange:function(b,c){},_drawPathSelector:function(){if(this._options.display.showPathSelector&&this._pathSelector===undefined){var c=this,b=$('<div class="ws-browser-path-selector"><div></div></div>'),d=$ws.core.merge({},this._initialSource);if(this._headContainer.length===0){this._container.find(".ws-browser-container-wrapper").prepend(this._headContainer=$('<div class="ws-browser-head-container" />'));}if(this._options.display.showHead||!this._options.display.hasZebra){b.addClass("ws-path-selector-height");}this._headContainer.prepend(b);this._pathSelector=false;d.context=this.getLinkedContext();$ws.core.attachInstance("Control/PathSelector",{element:b.find("div"),rootNodeCaption:this._options.display.rootName,rootNodeId:this._rootNode===null?-1:this._rootNode,dataSource:d,cssClassName:"ws-path-container",titleColumn:this._options.display.titleColumn,folderIcon:this._options.display.hierarchyIcons,hierarchyField:this._hierColumnParentId,handlers:{onPathChange:this._onPathSelectorChange.bind(this)}}).addCallback(function(e){c._pathSelector=e;e.setEnabled(c.isEnabled());c._pathReady.callback();if(c._turn===""&&c._currentRecordSet){c._findWay(c._currentRootId);}});}},_initEvents:function(){var b=this,c,d=this._body.parent()[0];$(".ws-browser-checkbox-holder",d).live("click",function(e){b._selectActiveElement($(this).parents(".ws-browser tr"));e.stopImmediatePropagation();return false;});$ws.proto.HierarchyViewAbstract.superclass._initEvents.apply(this,arguments);if(this._options.useSelection){if(this._options.useHoverRowAsActive){this._data.addClass("ws-browser-active-hover");$("[rowkey]",d).live("mouseenter",function(){if(!b._useKeyboard){if(b._activeElement&&"jquery" in b._activeElement){b._activeElement.removeClass("ws-browser-item-over");}b._activeElement=$(this);b._hovered=b._activeElement.attr("rowkey")==="null"?null:b._activeElement.attr("rowkey");b._activeElement.addClass("ws-browser-item-over");}});$(this._container).live("mouseleave",function(){if(!b._useKeyboard&&b._activeElement&&"jquery" in b._activeElement){b._activeElement.removeClass("ws-browser-item-over");}});}else{this._data.addClass("ws-browser-hover");}}},isHierarchyMode:function(){return true;},_clickOnFolder:function(d,c,b){},_activateFolder:function(d,c,b){if(this._options.folderLinkAction==="open"){this._clickOnFolder(d,c,b);}else{this._elementActivated(d);}},_dblClickHandler:function(h,e,c,b,g){var d=this._handlersNotifier("onRowDoubleClick",h,e,c,b);if(!g&&d!==false){var f=(e.get(this._hierColumnIsLeaf)===true);if(this._options.mode!=="oneClickMode"&&this._options.mode!=="navigationMode"){if(f){this._activateFolder(h,e.getKey(),e);}else{this._elementActivated(h);}}}return d;},_oneClickHandler:function(h,e,c,b,g){var d=this._handlersNotifier("onRowClick",h,e,c,b);if(!g&&d!==false&&(this._options.mode==="oneClickMode"||this._options.mode==="navigationMode")){var f=(e.get(this._hierColumnIsLeaf)===true);if(f){this._activateFolder(h,e.getKey(),e);}else{this._elementActivated(h);}}return d;},_insertRecordItem:function(){this._showRecordDialog({parentId:this._currentRootId,isBranch:false});},_insertRecordFolder:function(){this._showRecordDialog({parentId:this._currentRootId,isBranch:true});},_insertChildRecordItem:function(){var b=this.getActiveRecord();if(b!==false&&b.get(this._hierColumnIsLeaf)===true){this._showRecordDialog({isBranch:false,parentId:b.getKey()});}},_insertChildRecordFolder:function(){var b=this.getActiveRecord();if(b!==false&&b.get(this._hierColumnIsLeaf)===true){this._showRecordDialog({isBranch:true,parentId:b.getKey()});}},_clearExpandAll:function(b){var d=this._hierColumnParentId,e=this.getQuery();this._expanded={};e["Разворот"]=this._options.display.partiallyLoad?"Без разворота":"С разворотом";this._systemParams["Разворот"]=e["Разворот"];this._currentFilter["Разворот"]=e["Разворот"];e["ВидДерева"]="С узлами и листьями";this._systemParams["ВидДерева"]="С узлами и листьями";var c=this.getActiveRecord();if(c){this._currentRootId=c.get(d);}e[this._hierColumnParentId]=this._options.display.partiallyLoad?this._currentRootId:this._rootNode;this._systemParams[this._hierColumnParentId]=e[this._hierColumnParentId];this._currentRecordSet.setUsePages(this._options.display.usePaging);if(this._paging){this._paging.setEnabled(true);}if(this._pathSelector){this._pathSelector.setEnabled(true);}if(!b){this._runQuery(e,true);}},getItemParents:function(b){return this._getItemParents(b);},_getItemParents:function(d){var b=[d],c;while(d&&d!=this._rootNode&&this._currentRecordSet.contains(d)){c=this._currentRecordSet.getRecordByPrimaryKey(d);d=c.get(this._hierColumnParentId);b.push(d);}return b;},_prepareCreateFilter:function(c,e,b){var d=$ws.proto.HierarchyViewAbstract.superclass._prepareCreateFilter.apply(this,arguments);delete d["Раздел"];d[this._hierColumnParentId]={hierarchy:[e,(b?true:null)]};return d;},_openEditWindow:function(d,c){var h=d.parentId,f=c?c:this.generateEditPageURL(d.recordId,d.isBranch,h,d.isCopy,c),b=this._notify("onBeforeOpenEditWindow",f),g,e=d.isBranch?this._options.editBranchMode:this._options.editMode;if(typeof(b)==="string"){f=b;}if(b!==false){if(e=="thisWindow"){window.location.href=f;}else{g=window.open(f,"_blank");if(g){g.focus();}}}},_showDialogForRecord:function(b){this._showRecordDialog({recordId:b.getKey(),isBranch:b.get(this._hierColumnIsLeaf)});},_showRecordDialog:function(d){if(this._checkShowDialog(d.recordId,d.isBranch,d.parentId)){return;}var e=d.isBranch?this._options.editBranchMode:this._options.editMode,b=d.isBranch?this._options.editBranchDialogTemplate:this._options.editDialogTemplate,c=d.isBranch?this._options.editFullScreenBranchTemplate:this._options.editFullScreenTemplate;if(b!==""){this._editRecordWithMode(d,e,b,c);}},_getRecordFromConfig:function(b){return this._readRecord(b.recordId,b.parentId,b.isBranch,b.isCopy);},_readRecord:function(c,e,d,h){var j=this;if(c===undefined){var b=j._prepareCreateFilter.apply(j,arguments);b[j._hierColumnParentId]={hierarchy:[e,(d?true:null)]};var g=j._notify("onBeforeCreate",e,d?true:null,b);if(g instanceof $ws.proto.Deferred){var f=new $ws.proto.Deferred();g.addCallbacks(function(k){if(k instanceof $ws.proto.Record){f.callback(k);}else{if(k&&Object.prototype.toString.call(k)=="[object Object]"){b=$ws.core.merge(b,k);}b["ВызовИзБраузера"]=true;j._currentRecordSet.createRecord(b).addCallbacks(function(l){f.callback(l);},function(l){f.errback(l);});}},function(k){f.errback(k);});return f;}else{if(g instanceof $ws.proto.Record){return new $ws.proto.Deferred().callback(g);}else{if(g&&Object.prototype.toString.call(g)=="[object Object]"){b=$ws.core.merge(b,g);}b["ВызовИзБраузера"]=true;return j._currentRecordSet.createRecord(b);}}}else{if(h===true){return j._currentRecordSet.copyRecord(c);}else{var i=j._notify("onBeforeRead",c);if(i instanceof $ws.proto.Deferred){return i;}else{if(i instanceof $ws.proto.Record){return new $ws.proto.Deferred().callback(i);}else{return j._currentRecordSet.readRecord(c);}}}}},_generateEditPageURL:function(b){return this.generateEditPageURL(b.recordId,b.isBranch,b.parentId,b.isCopy);},generateEditPageURL:function(e,h,j,l,c,k,f){if(h&&this._options.editBranchDialogTemplate||!h&&this._options.editDialogTemplate){var g={id:this.getId(),hierMode:true,pk:e,copy:l||false,readOnly:this._options.display.readOnly||false,obj:this._options.dataSource.readerParams.linkedObject,_events:{}},d,m=c?c:undefined,b=h?this._options.editBranchMode:this._options.editMode,n=f;if(!n){if(h){n=(b=="newFloatArea"&&this._options.editFullScreenBranchTemplate)?this._options.editFullScreenBranchTemplate:this._options.editBranchDialogTemplate;}else{n=(b=="newFloatArea"&&this._options.editFullScreenTemplate)?this._options.editFullScreenTemplate:this._options.editDialogTemplate;}}if(m===undefined){if($ws._const.htmlNames[n]){var i=$ws._const.htmlNames[n].split("/");m=i[i.length-1];}else{d=$ws._const.xmlContents[n].split("/");m=$ws._const.appRoot+d[d.length-1]+".html";}}if(k){g.changedRecordValues=k;}if(b==="thisWindow"){g.history=true;}g.pIdCol=this._hierColumnParentId;g.branch=h;g.pId=j;if(e===undefined){g.filter=this.getQuery();g._events.onBeforeCreate=this._handlersPath("onBeforeCreate");g._events.onBeforeInsert=this._handlersPath("onBeforeInsert");}g=this._prepareEditParams(g);g=$ws.helpers.serializeURLData(g);m+="?editParams="+encodeURIComponent(g);return b==="thisPage"?g:m;}else{return false;}},_clearAdditionalStates:function(){},clear:function(){var b=this.getRecordSet();if(b.getRecordCount()!==0){this.resetFilter(true);this._clearAdditionalStates();}$ws.proto.HierarchyViewAbstract.superclass.clear.apply(this,arguments);},destroy:function(){if(this._pathSelector&&this._pathSelector.destroy){this._pathSelector.destroy();}$ws.proto.HierarchyViewAbstract.superclass.destroy.apply(this,arguments);},setSelectionType:function(b){this._options.selectionType=b||"all";if(this._options.selectionType==="node"||this._options.display.viewMode=="foldersTree"){this._options.filterParams["ВидДерева"]="Только узлы";this._systemParams["ВидДерева"]="Только узлы";}},_testSelectedRecord:function(b){if(b!==undefined){if(this.isHierarchyMode()){switch(this._options.selectionType){case"leaf":if(!b.get(this._hierColumnIsLeaf)){return true;}break;case"node":if(!!b.get(this._hierColumnIsLeaf)){return true;}break;case"all":default:return true;}}else{return true;}}return false;},_selectRow:function(c){var d=this._body.find('[rowkey="'+c+'"]');d.addClass("ws-browser-selected");if(!this._isIdEqual(c,this._rootNode)&&this._selected[c]===undefined){var b=this._currentRecordSet.contains(c)?this._currentRecordSet.getRecordByPrimaryKey(c):undefined;this._selected[c]=this._selectedRecords.length;this._selectedRecords.push(b);this._notifyBatchDelayed("onChangeSelection",b,true);}},_unselectRow:function(c){var d=this._body.find('[rowkey="'+c+'"]');d.removeClass("ws-browser-selected");if(!this._isIdEqual(c,this._rootNode)&&this._selected[c]!==undefined){var b=this._currentRecordSet.contains(c)?this._currentRecordSet.getRecordByPrimaryKey(c):undefined;delete this._selectedRecords[this._selected[c]];delete this._selected[c];this._notifyBatchDelayed("onChangeSelection",b,false);}},_toggleRowSelection:function(b){if(this._selected[b]!==undefined){this._unselectRow(b);}else{this._selectRow(b);}},_selectActiveElement:function(e){var c=this,f=e||this.getActiveElement(),d=f.attr("rowkey");d=d==="null"?null:d;if(this._isIdEqual(d,this._rootNode)){if(e.hasClass("ws-browser-selected")){this.removeSelection();}else{this.selectAll();}}else{var b=this._currentRecordSet.getRecordByPrimaryKey(d);if(this.isHierarchyMode()){switch(this._options.selectionType){case"leaf":if(!b.get(this._hierColumnIsLeaf)){this._toggleRowSelection(d);}break;case"node":if(!!b.get(this._hierColumnIsLeaf)){this._toggleRowSelection(d);}break;case"all":default:this._toggleRowSelection(d);break;}}else{this._toggleRowSelection(d);}}this._updatePager();},getRootNode:function(){return this._rootNode;},getCurrentRootNode:function(){return this._currentRootId;},getFolderKeyForActiveRecord:function(f){var b=this.getActiveRecord();if(b){var d;if(b.get(this._hierColumnIsLeaf)!==true||(b.get(this._hierColumnIsLeaf)===true&&!f)){d=b.get(this._hierColumnParentId);}else{this._isInsertOnFolderInTree=true;d=b.getKey();}return d;}else{var e=this.getActiveElement();if(e){var c=e.attr("rowkey");if(c==="null"){c=null;}return c;}}return this._currentRootId;},_onResizeHandler:function(b,c){if(this!==c){this._setHeight();if(this._pathSelector){this._pathSelector._onResizeHandler();}}$ws.proto.HierarchyViewAbstract.superclass._onResizeHandler.apply(this,arguments);},setRootNode:function(e,c){var d=this,b=new $ws.proto.Deferred();this._dReady.addCallback(function(){d._rootNode=d._currentRootId=e;d._systemParams[d._hierColumnParentId]=d._rootNode;d._currentRecordSet.updateInitialParameter(d._hierColumnParentId,e+"");if(d._pathSelector!==undefined){d._pathReady.addCallback(function(){d._pathSelector.setRootNode(e,c);});}if(c){b.callback();}else{d._expanded={};d._systemParams[d._hierColumnParentId]=e;d._expanded[e]=true;b.dependOn(d._currentRecordSet.loadNode(e,true,0,!d._options.display.partiallyLoad||d._systemParams["Разворот"]==="С разворотом"));}});return b;},setRootName:function(b){this._options.display.rootName=b;if(this._pathSelector&&this._pathSelector instanceof Object){this._pathSelector.setRootName(b);}},setHierarchyField:function(d,c){if(c!==undefined){this._options.display.titleColumn=c;}if(this._options.display.hierColumn!==d){var b=this;this._dReady.addCallback(function(){var e=b.getRecordSet();if(e===null||e.checkHierColumn(d)===false){return;}e.setHierarchyField(d);b._options.display.hierColumn=d;b._updateHierColumnParams(d);if(b._pathSelector instanceof Object){b._pathSelector.setHierarchyField(d);}});}},setEnabled:function(b){b=!!b;if(this._options.allowChangeEnable||b===this._options.enable){$ws.proto.HierarchyViewAbstract.superclass.setEnabled.apply(this,arguments);if(this._pathSelector){this._pathSelector.setEnabled(b);}}},isRecordFolder:function(c){var b=this._currentRecordSet.contains(c)&&this._currentRecordSet.getRecordByPrimaryKey(c);if(b){return b.get(this._hierColumnIsLeaf)===true;}return false;},_getCellGeneralTextAlign:function(d){if(d.textAlign==="auto"){var c=$ws._const.Browser.type2ClassMap[d.type]||d.type,b=[];if($ws.render.defaultColumn.isNumeric(d.type)){b.push("ws-browser-type-numeric");}if(c){b.push("ws-browser-type-"+c);}return b;}return["ws-browser-"+d.textAlign];},_getCellTextAlign:function(c,b){if(b){return["ws-browser-left"];}return this._getCellGeneralTextAlign(c);},_cellTemplateOptions:function(h,c,b,m,f){var k=this._getColumnConfigByIndex(m),d=["ws-browser-valign-top"],o=h.getKey(),j=$ws._const.Browser.iconWidth,i=$ws._const.Browser.type2ClassMap[k.type]||k.type,n=this._renderTD(k,h),e;if(!f){if(this._options.display.cutLongRows){d.push("ws-browser-cell-cut ");}if(k.textAlign!=="auto"){d.push("ws-browser-"+k.textAlign);}}if(k.className){d.push(k.className);}d=d.concat(this._getCellTextAlign(k,k.useForFolder?false:f));if(typeof(k.render)==="function"){e=n;}else{if(b=="thisWindow"&&this._options.mode==="oneClickMode"){var l=this.generateEditPageURL(o),g=(b=="thisWindow"&&!f)&&l!==false?('class="ws-browser-link" href="'+l+'"'):('class="ws-browser-edit-link" href="javascript:void(0)"');e="<a "+g+">"+n+"</a>";}else{e='<span class="ws-browser-text-no-render">'+n+"</span>";}}return{cellClassName:d.join(" "),containerClassName:"ws-browser-cell-container"+(this._options.display.cutLongRows?" ws-browser-div-cut":""),checkbox:this._options.display.showSelectionCheckbox&&this._options.useSelection!==false&&!(this._options.selectionType==="leaf"&&f)&&!(this._options.selectionType==="node"&&!f),padding:j*c+$ws._const.Browser.defaultCellPadding,data:e};},_getColumnConfigByIndex:function(b){return this._columnMap[b];},_initKeys:function(){$ws.proto.HierarchyViewAbstract.superclass._initKeys.apply(this,arguments);this._registerShortcut($ws._const.key.b,$ws._const.modifiers.control,this._toggleViewKey);this._registerShortcut($ws._const.key.del,$ws._const.modifiers.nothing,this._deleteRecordsKey);this._registerShortcut($ws._const.key.insert,[$ws._const.modifiers.control,$ws._const.modifiers.alt],this._insertRecordKey);},_toggleViewKey:function(b){if(this.isEnabled()){this.applyTurn(b.which===$ws._const.key.b);}},_insertRecordKey:function(b){if(this.isEnabled()&&!this.isReadOnly()&&(b.ctrlKey||this._options.display.viewMode!=="foldersTree")){var c=this._actions[b.ctrlKey?"addFolder":"addItem"];if(c){c(this.getActiveElement(),b);}return false;}return true;},_isDisableEditOptionForRecord:function(b){return(!b||!b.get(this._hierColumnIsLeaf))&&this._options.mode==="oneClickMode"&&!this._selectMode;},_additionalFilterRowOptions:function(d,b){var c;$ws.proto.HierarchyViewAbstract.superclass._additionalFilterRowOptions.apply(this,arguments);if(b){c=b.get(this._hierColumnIsLeaf);if((c&&!this._options.editBranchDialogTemplate)||(!c&&!this._options.editDialogTemplate)){d.push("edit");}}},_redraw:function(){}});return $ws.proto.HierarchyViewAbstract;});