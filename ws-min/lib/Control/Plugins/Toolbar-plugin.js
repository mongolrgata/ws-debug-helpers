$ws.proto.DataViewAbstract.ToolbarPlugin=$ws.proto.DataViewAbstract.extendPlugin({$protected:{_options:{display:{showToolbar:false,toolbarButtons:{}}},_menuButtons:{addItem:["Добавить запись (Insert)","sprite:icon-16 icon-Add icon-primary","addItem"],"delete":["Удалить (Delete)","sprite:icon-16 icon-Erase icon-error","delete"],refresh:["Перечитать данные (Ctrl+N)","sprite:icon-16 icon-Refresh icon-primary","refresh"],filterParams:["Параметры фильтрации (Ctrl+Q)","sprite:icon-16 icon-Document icon-primary","filterParams"],clearFilter:["Очистить фильтрацию","sprite:icon-16 icon-Close icon-primary","clearFilter"],clearSorting:["Очистить сортировку","sprite:icon-16 icon-Close icon-primary","clearSorting"],clearExpand:["Обычный","sprite:icon-16 icon-HierarchyView icon-primary","clearExpand"],expandSet:["Вид списка","","expandSet"]},_infobox:undefined,_expandMenu:undefined,_expandRows:[],_toolbar:undefined,_toolbarReady:undefined},$condition:function(){return this._options.display.showToolbar===true;},$constructor:function(){if(this._options.display.showToolbar===true){this._toolbarReady=new $ws.proto.Deferred();if(this.isHierarchyMode()){this._menuButtons.addFolder=["Добавить папку (Ctrl+Insert)","sprite:icon-16 icon-CreateFolder icon-primary","addFolder"];this._menuButtons.convert=this.isHierarchy()?["Переключить в дерево","sprite:icon-16 icon-HierarchyView icon-primary","convert"]:["Переключить в иерархию","sprite:icon-16 icon-TreeView icon-primary","convert"];this._menuButtons.expandWithFolders=["Развернуто с папками (Ctrl+B)","sprite:icon-16 icon-TreeView icon-primary","expandWithFolders"];if(this._options.display.viewMode!=="foldersTree"){this._menuButtons.expand=["Развернуто без папок (Ctrl+V)","sprite:icon-16 icon-ListView icon-primary","expand"];}}this._drawToolBar();if(this.isHierarchyMode()&&this._options.display.toolbarButtons.expandSet!==undefined&&!this._options.display.fixedExpand){this._buildExpandMenu();}}},_keyboardHover:function(c,b){if(this.isActive()){var a="";if(this._options.display.toolbarButtons.expandSet!==true){return b;}if((this._isCtrl(c)&&(c.which===$ws._const.key.b||c.which===$ws._const.key.v))){a=this._turn!==""?(c.which===$ws._const.key.b?"expandWithFolders":"expand"):"clearExpand";this._setToolBarButtonImage("expandSet",this._expandRows[this._findExpandRowIdByButtonId(a)].imgSrc);}}return b;},_buildExpandMenu:function(){var b=this,d={clearExpand:b._menuButtons.clearExpand,expandWithFolders:b._menuButtons.expandWithFolders,expand:b._menuButtons.expand};for(var c in d){if(!d.hasOwnProperty(c)||d[c]===undefined){continue;}var a=b._prepareButtonsList([d[c]])[0],e={caption:a.caption?a.caption:a.tooltip,imgSrc:a.img,id:a.id?a.id:a.name?a.name:c,renderStyle:a.renderStyle,name:c};if(a.handlers&&a.handlers.onActivated){e.handlers={onActivated:a.handlers.onActivated};}this._expandRows.push(e);}if(this._options.display.toolbarButtons.expandSet===false){this._toolbarReady.addCallback(function(f){b._toolbar.getMenu().addSubMenu("expandSet",b._expandRows);return f;});}else{if(this._options.display.toolbarButtons.expandSet===true){if(this._options.display.showPathSelector){this._pathReady.addCallback(function(){b._pathSelector.subscribe("onPathChange",function(){b._setToolBarButtonImage("expandSet",b._expandRows[b._findExpandRowIdByButtonId("clearExpand")].imgSrc);});});}$ws.core.attachInstance("Control/Menu",{id:this.getId()+"-menuExpandControl",data:b._expandRows,handlers:{onActivated:function(f,g){b._setToolBarButtonImage("expandSet",b._expandRows[b._findExpandRowIdByButtonId(g)].imgSrc);}}}).addCallback(function(f){b._expandMenu=f;});}}},_setToolBarButtonImage:function(a,b){var c;if(this._toolbar){c=this._toolbar.getButton(a);c.getContainer().find(".ws-button-image").removeClass().addClass("ws-button-image");c.setImage(b);}},_findExpandRowIdByButtonId:function(e){var c;for(var d=0,a=this._expandRows.length;d<a;d++){var b=e.indexOf(this._expandRows[d].name);if(b>=0&&(e.length-b===this._expandRows[d].name.length)){c=d;break;}}return c;},_createContainer:function(){if(this._options.display.showToolbar&&!this._headContainer.length){var a=this._options.display.useDrawingLines?" ws-browser-border":"";if(!this._options.display.showHead){a+=" ws-browser-border-top";}this._rootElement.find("div:first").prepend(['<div class="ws-browser-head-container"><div class="ws-browser-head-scroller"><table cellspacing="0" class="ws-table-fixed ws-browser-head ',a,'"><colgroup></colgroup><thead></thead></table></div></div>'].join(""));this._head=this._rootElement.find("thead");this._headContainer=this._rootElement.find(".ws-browser-head-container");}},_getToolbarButtons:function(){var c=this._options.display.toolbarButtons||[],a=[];for(var b in c){if(c.hasOwnProperty(b)){if(c[b]===true&&this._menuButtons.hasOwnProperty(b)){a.push(this._menuButtons[b]);}}}return a;},_getMenuButtons:function(){var c=this._options.display.toolbarButtons||[],a=[];for(var b in c){if(c.hasOwnProperty(b)){if(c[b]===false&&this._menuButtons.hasOwnProperty(b)){a.push(this._menuButtons[b]);}}}return a;},_drawToolBar:function(){var a=$('<div class="ws-browser-toolbar"><div class="ws-toolbar" id="'+this.getId()+'-toolbar"></div></div>');this._headContainer.prepend(a);var d=this._getToolbarButtons(),c=this._getMenuButtons(),b=this;if(this.isHierarchy()&&this._options.display.showPathSelector){this._headContainer.find(".ws-browser-toolbar").addClass("ws-toolbar-path-selector");}$ws.core.attachInstance("SBIS3.CORE.ToolBar",{element:a.find(".ws-toolbar"),buttons:this._prepareButtonsList(d),subBtnCfg:this._prepareButtonsList(c),buttonsSide:"right",handlers:{onReady:function(){b._toolbar=this;this.setEnabled(b.isEnabled());b._toolbarReady.callback(this);}}});},_prepareButton:function(a){return{tooltip:a[0],img:$ws._const.wsRoot+a[1],name:a[2],handlers:{onActivated:this._actions[a[2]]}};},_prepareButtonsList:function(d){var e=[],b=true,f=function(){if(!Object.isEmpty(e[e.length-1])){e.push({});}};for(var c=0,a=d.length;c<a;c++){if(this._actions[d[c][2]]){if(d[c][0]===""){if(!b){f();b=true;}}else{e.push(this._prepareButton(d[c]));b=false;}}}return e;},addToolbarButton:function(f,g,c,e,a){var b=this,d=(typeof f=="object")?f:{tooltip:f||"",img:g,handlers:c||{},name:e,wsClassName:a};if(d.img&&(d.img.indexOf($ws._const.resourceRoot)<0&&d.img.indexOf($ws._const.wsRoot)<0)){d.img=$ws._const.resourceRoot+d.img;}b._toolbarReady.addCallback(function(h){h=b._toolbar!==undefined?b._toolbar:h;h.addButton(d);return h;});},_rebuildActions:function(){this._initActionsFlags();var a=this;this._toolbarReady.addCallback(function(b){b.getMenuReady().addCallback(function(j){if(!a._actions.addItem){b.deleteButton("addItem");}if(!a._actions.addFolder){b.deleteButton("addFolder");}var h=a._prepareButtonsList(a._getToolbarButtons());for(var f=0,c=h.length;f<c;++f){if(!b.hasButton(h[f].name)){b.insertButton(h[f],"menu");}}var e=a._getMenuButtons();for(f=0,c=e.length;f<c;++f){g=e[f];if(!a._actions[g[2]]&&j.hasItem(g[2])){j.removeItem(g[2]);}}var d="menu";for(f=e.length-1;f>=0;--f){var g=e[f];if(j.hasItem(g[2])){d=g[2];}else{if(a._actions[g[2]]&&!j.hasItem(e[2])){j.insertItem(a._prepareMenuItem(g),d);}}}return j;});return b;});},setReadOnly:function(a){if(this._options.display.readOnly!=!!a){this._rebuildActions();}},setAllowAdd:function(a){if(this._options.allowAdd!=a){this._rebuildActions();}},setAllowEdit:function(a){if(this._options.allowEdit!=a){this._rebuildActions();}},setAllowDelete:function(a){if(this._options.allowDelete!=a){this._rebuildActions();}},getToolbar:function(){return this._toolbarReady;},setEnabled:function(a){a=!!a;if((this._options.allowChangeEnable||a===this._options.enable)&&this._toolbar){this._toolbar.setEnabled(a);}},_initActionsFlags:function(){var e=this.isHierarchyMode()||this._turn!=="",c=this._options.editBranchDialogTemplate,d=this._options.editDialogTemplate,b=this,a=function(f){var g;if(f instanceof Object&&"jquery" in f){if(b.isHierarchyMode()){g=f.attr("parentid");}}else{if(b._options.display.viewType=="tree"){g=b.getActiveElement()&&b.getActiveElement().attr("parentid");}}if(!g){g=b._currentRootId;}return g;};this._actions.addItem=this._options.allowAdd!==false&&!this._options.display.readOnly&&d&&function(g,h){var f=h===true&&g&&g.hasClass("ws-browser-folder")?g.attr("rowkey"):a(g);b._showRecordDialog({isBranch:false,parentId:f});};this._actions.addFolder=this._options.allowAdd!==false&&!this._options.display.readOnly&&e&&c&&function(g,h){var f=h===true&&g&&g.hasClass("ws-browser-folder")?g.attr("rowkey"):a(g);b._showRecordDialog({isBranch:true,parentId:f});};this._actions.expand=this.isHierarchyMode()&&!this._options.display.fixedExpand&&this._options.selectionType!=="node"&&function(){if(b._turn!=="OnlyLeaves"){b._turn="";b.applyTurn(false);}};this._actions.expandWithFolders=this.isHierarchyMode()&&!this._options.display.fixedExpand&&this._options.selectionType!=="node"&&function(){if(b._turn!=="BranchesAndLeaves"){b._turn="";b.applyTurn(true);}};this._actions.clearExpand=this.isHierarchyMode()&&!this._options.display.fixedExpand&&this._options.selectionType!=="node"&&function(){b._turn="";b._clearExpandAll();};this._actions.expandSet=this.isHierarchy()&&!this._options.display.fixedExpand&&this._options.selectionType!=="node"&&function(g){if(b._options.display.toolbarButtons.expandSet===false){return true;}var h;if(document.createEvent){h=document.createEvent("HTMLEvents");}else{if(document.createEventObject){h=document.createEventObject();}}var f=b._options.display.toolbarButtons.expandSet?this.getContainer():$("#"+b._id+"-"+g),i=f.offset();h.clientX=i.left+$ws._const.Toolbar.menuOffset.left;h.clientY=i.top+$ws._const.Toolbar.menuOffset.top+f.height();b._expandMenu.show(h);};this._actions.filterParams=this._options.filterDialogTemplate&&function(){b.createFiltersDialog.apply(b,[]);};this._actions.clearFilter=this._options.filterDialogTemplate&&function(){b.resetFilter();};this._actions.refresh=$.proxy(b.reload,b);this._actions.convert=this.isHierarchyMode()&&function(){var h=b._options,l=b.isTree()?"HierarchyView":"TreeView",k=b.getParent(),f=b.getTopParent(),g=b.getRootNode(),j=!!($ws.proto.DialogSelector&&f instanceof $ws.proto.DialogSelector&&b===f.getBrowser());if(b._infobox){b._infobox.hide(0);}if(h.optionsSaver.display!==undefined){h.display=h.optionsSaver.display;}else{h.optionsSaver.display=h.display;}h.type=b.isTree()?"Control/DataViewAbstract/TableView/HierarchyViewAbstract/HierarchyView":"Control/DataViewAbstract/TableView/TreeView";h.handlers=b._saveHandlersToConvert();h.element=$('<div id="'+b.getId()+'" class="ws-convert-container" type="'+h.type+'"></div>');h.element.attr({alignmargin:b.getContainer().attr("alignmargin"),autoheight:b.getContainer().attr("autoheight"),sbisname:b.getContainer().attr("sbisname"),tabindex:b.getContainer().attr("tabindex")});h.dataSource.firstRequest=false;h.optionsSaver.filterForSet=h.optionsSaver.filter?h.optionsSaver.filterForSet:b.getQuery();h.display.rootNode=(g instanceof Array)?g.toString():g;if(b.isHierarchy()){h.optionsSaver.rootNode=b.getCurrentRootNode();}else{var i=b.getActiveRecord();h.optionsSaver.rootNode=i?(b.isTreeFolderExpanded(i.getKey())?i.getKey():b.getFolderKeyForActiveRecord()):b.getFolderKeyForActiveRecord();}h.optionsSaver.activeRecord=b.getActiveRecord();h.verticalAlignment=b._verticalAlignment;h.horizontalAlignment=b._horizontalAlignment;h.parent=k;h.linkedContext=b.getLinkedContext();h.setNewDataSourceWithParent=true;b.getContainer().parent().append(h.element);b.destroy();h.handlers.onReady=h.handlers.onReady||[];h.handlers.onReady.push(b._onReady);$ws.core.attachInstance("SBIS3.CORE."+l,h).addCallback(function(m){if(l==="TreeView"){m.subscribe("onFolderOpen",b._onTreeShowInfoBox);}m._notify("onConvert",m);if(j){f.setBrowser(m);}});};},_onReady:function(){this.unsubscribe("onReady",this._onReady);var a=$ws.core.merge(this.getQuery(),this._options.optionsSaver.filterForSet);a[this._options.display.hierColumn]=this.isHierarchy()?this._options.optionsSaver.rootNode:this.getRootNode();this.setQuery(a);this.once("onAfterLoad",this._onAfterLoadShowBranch);},_onAfterLoadShowBranch:function(){if(this.isTree()){this._onTreeShowInfoBox();}if(this._options.optionsSaver.rootNode!==this.getCurrentRootNode()&&this.isTree()){if(this._systemParams["Разворот"]!=="С разворотом"){this.showBranch(this._options.optionsSaver.rootNode);}}if(this._options.optionsSaver.activeRecord){var d=this._options.optionsSaver.activeRecord.getKey(),b=this.getContainer().find("tr:.ws-browser-table-row");for(var c=0,a=b.length;c<a;c++){if(b[c].getAttribute("rowkey")==d){this.setActiveRow($(b[c]));break;}}}this.setActive(true);},_onTreeShowInfoBox:function(){var b=this,a=this.getRecordSet().hasNextPage();if((typeof(a)==="boolean"&&a)||a>this.getDataSource().rowsPerPage){$ws.requireModule("SBIS3.CORE.Infobox").addCallback(function(c){b._infobox=$ws.single.Infobox;$ws.single.Infobox.show(b.getActiveElement(),"Внимание! Показаны не все записи, так как это привело бы к длительному ожиданию.<br> Чтобы посмотреть полный список - переключитесь в режим иерархии.",undefined,100,5000);});}},_saveHandlersToConvert:function(){var b={};for(var e in this._events){if(this._events.hasOwnProperty(e)){var c=this._events[e];if(e==="onFolderEnter"){continue;}for(var d=0,a=c.length;d<a;d++){if(c[d].wsHandlerPath||e==="onConvert"){if(b[e]===undefined){b[e]=[];}b[e].push(c[d]);}}}}return b;},destroy:function(){if(this._toolbar){this._toolbar.destroy();}}});