$ws.declareModule({namespace:"SBIS3.CORE",name:"TabTemplatedArea",imports:["SBIS3.CORE.TemplatedArea"]},function(a){$ws.proto.TabTemplatedArea=a.extend({$protected:{_horizontalAlignment:"Stretch",_verticalAlignment:"Stretch"},_onResizeHandler:function(){this._tabAreaOnResizeHandler();$ws.proto.TabTemplatedArea.superclass._onResizeHandler.apply(this,arguments);},_tabAreaOnResizeHandler:function(){var e=this.getContainer().get(0);if(this._resizer){var m=e.scrollWidth>e.clientWidth;var b=e.scrollHeight>e.clientHeight;var l=this.getContainer().find(" > .dt_grid, > .dt_layout");if(l.length){l.css({"min-height":"","min-width":""});var c={minHeight:"",minWidth:""};if(this._horizontalAlignment=="Stretch"){var i=Math.min(this._doGridCalculation?e.scrollWidth:Infinity,this._resizer.width());if(m){c.minWidth=i;}}if(this._verticalAlignment=="Stretch"){var f=Math.min(this._doGridCalculation?e.scrollHeight:Infinity,this._resizer.height());if(b){c.minHeight=f;}}l.css(c);}}if(this._resizer){var d=e.scrollWidth,h=e.scrollHeight,k=this._container.width(),g=this._container.height();if((d<=k)&&(h<=g)){var j=this;j._container.css("overflow-x","hidden");setTimeout(function(){j._container.css("overflow-x","auto");},1000);}}},_redraw:function(){}});return $ws.proto.TabTemplatedArea;});