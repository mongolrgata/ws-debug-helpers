$ws.declareModule({namespace:"SBIS3.CORE",name:"FiltersArea",imports:["SBIS3.CORE.TemplatedAreaAbstract"]},function(a){$ws.proto.FiltersArea=a.extend({$protected:{_width:"",_height:"",_horizontalAlignment:"Left",_verticalAlignment:"Top",_options:{linkedBrowsers:[]},_defaults:{},_defaultsIsReady:false,_onFiltersChangeHandler:null},$constructor:function(){var b=this;this._publish("onBeforeApplyFilter");this._onFiltersChangeHandler=function(c,d){b._filterChange(d);};$ws.single.CommandDispatcher.declareCommand(this,"applyFilter",this.applyFilter);$ws.single.CommandDispatcher.declareCommand(this,"resetFilter",this.resetFilter);b._saveFiltersFromLinkedBrowsers();},_restoreSize:function(){this._container.css({width:"",height:""});},getLinkedBrowsers:function(){var b=[];for(var c in this._options.linkedBrowsers){if(this._options.linkedBrowsers.hasOwnProperty(c)){b.push($ws.single.ControlStorage.get(this._options.linkedBrowsers[c]));}}return b;},setLinkedBrowsers:function(b){var c=this;if(!(b instanceof Array)){b=[b];}this._options.linkedBrowsers=b;if(c._defaultsIsReady){c._saveFiltersFromLinkedBrowsers();}else{this.subscribe("onReady",function(){c._saveFiltersFromLinkedBrowsers();});}},_saveFiltersFromLinkedBrowsers:function(){var d={};var b=new $ws.proto.ParallelDeferred();var c=this;for(var e in c._options.linkedBrowsers){if(c._options.linkedBrowsers.hasOwnProperty(e)){b.push($ws.single.ControlStorage.waitChild(c._options.linkedBrowsers[e]).addCallback(function(f){f.subscribe("onFilterChange",c._onFiltersChangeHandler);var h=f.getQuery();for(var g in h){if(h.hasOwnProperty(g)){if(h[g]&&h[g].fieldName){h[g]=f.getLinkedContext().getValue(h[g].fieldName);}}}d=$ws.core.merge(d,h);return f;}));}}b.done(d).getResult().addCallback(function(g){c._setFieldsByFilter(g);c._defaultsIsReady=true;if(c._options.template){c._loadTemplate();}});},_filterChange:function(b){if(!this._defaultsIsReady){this._defaults=$ws.core.merge(this._defaults,b);}this._setFieldsByFilter(b);},applyFilter:function(g){var f=g&&Object.prototype.toString.call(g)=="[object Object]"?g:this._fillFilter();var d=this._notify("onBeforeApplyFilter",f);if(d&&d instanceof Object){f=d;}if(d!==false){var c=this.getLinkedBrowsers();for(var e=0,b=c.length;e<b;e++){c[e].setQuery(f);}}},resetFilter:function(){var c=this.getLinkedBrowsers();for(var d=0,b=c.length;d<b;d++){c[d].resetFilter();}},_setContextByFilter:function(d){var c=this.getLinkedContext();for(var b in d){if(d.hasOwnProperty(b)){c.setValue(b,d[b]);}}},_setFieldsByFilter:function(c){var h=this.getChildControls(true),f,g,e;for(var b in h){if(h.hasOwnProperty(b)){f=h[b];e=f.getName();g=c[e];if(g!==undefined){if(e&&f.setValue&&f.getValue()!=g){var d;if($ws.proto.FieldDate&&f instanceof $ws.proto.FieldDate&&!(g instanceof Date)){d=Date.fromSQL(g+"");}else{if($ws.proto.FieldRadio&&f instanceof $ws.proto.FieldRadio){d=f.getDefaultValue().clone();d.set(g);}else{d=g;}}f.setValue(d);}}}}this._setContextByFilter(c);},_fillFilter:function(){var c=this.getChildControls(true),f,d={};for(var b in c){if(c.hasOwnProperty(b)){f=c[b];if(f.getName&&f.getValue){var e=f.getValue();if(e!==undefined&&e!==""){d[f.getName()]=e;}}}}return d;},destroy:function(){var b=this;for(var c in b._options.linkedBrowsers){if(b._options.linkedBrowsers.hasOwnProperty(c)){$ws.single.ControlStorage.waitChild(b._options.linkedBrowsers[c]).addCallback(function(d){d.unsubscribe("onFilterChange",b._onFiltersChangeHandler);return d;});}}$ws.proto.FiltersArea.superclass.destroy.apply(b,arguments);},_redraw:function(){}});return $ws.proto.FiltersArea;});