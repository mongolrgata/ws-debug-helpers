$ws.proto.DataViewAbstract.CopyPlugin=$ws.proto.DataViewAbstract.extendPlugin({$protected:{_options:{},_menuButtons:{copy:["Копировать запись (Shift+F5)","sprite:icon-16 icon-Copy icon-primary","copy"]},_isCopy:false},$condition:function(){return this._options.useCopyRecords&&!this._options.display.readOnly;},$constructor:function(){this._publish("onBeforeCopy");$ws.single.CommandDispatcher.declareCommand(this,"copy",this.copy);this._keysWeHandle[$ws._const.key.f5]=true;this._notify("onNewAction",{title:"Копировать запись (Shift+F5)",icon:$ws._const.theme?"sprite:icon-16 icon-Copy icon-primary":"copy.png",name:"copy",callback:"copy"});},copy:function(c){var f=c&&c instanceof $ws.proto.Record?c:this.getActiveRecord(),d=this._notify("onBeforeCopy",f),g=f.getKey(),e=this.isHierarchyMode()?f.get(this._hierColumnIsLeaf):false,b=e?this._options.editBranchDialogTemplate:this._options.editDialogTemplate,a=e?this._options.editBranchMode:this._options.editMode,i=this;if(b!==""&&d!==false){if(a=="newWindow"||a=="thisWindow"){this._isCopy=true;i._openEditWindow(g,e);return;}else{if(a=="thisPage"){this._isCopy=true;var h=this.getTopParent();$ws.single.GlobalContext.setValue("editParams",this.generateEditPageURL(g,e));if(h instanceof SBIS3.CORE.AreaAbstract){$ws.core.bootup(b,undefined,undefined,h.getTemplateName());}return;}}this._useKeyboard=true;$ws.core.setCursor(false);this._currentRecordSet.copyRecord(g).addBoth(function(j){$ws.core.setCursor(true);return j;}).addCallback(function(j){if(j instanceof $ws.proto.Record){i._showDialog(b,j);}}).addErrback(function(j){if(j&&j.message){$ws.core.alert(j.message,"error");}});}},_prepareEditParams:function(b,a){a.copy=this._isCopy;this._isCopy=false;return a;},_readRecord:function(a){if(this._isCopy){this._isCopy=false;return this._currentRecordSet.copyRecord(a);}else{return arguments[1];}},_keyboardHover:function(b,a){if(this.isActive()&&!b.ctrlKey&&!b.altKey&&b.shiftKey&&b.which===$ws._const.key.f5){this.copy();return false;}return a;},_initActionsFlags:function(){var d=this.isHierarchyMode()||this._turn!=="",b=this._options.editBranchDialogTemplate,c=this._options.editDialogTemplate,a=this;this._actions=this._actions||{};this._actions.copy=(c||(d&&b))&&function(e){if(e instanceof Object&&"jquery" in e){e=a._currentRecordSet.getRecordByPrimaryKey(e.attr("rowkey"));}a.copy(e);};}});