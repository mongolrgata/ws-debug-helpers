$ws.declareModule({namespace:"SBIS3.CORE",name:"DialogAlert",imports:["SBIS3.CORE.SimpleDialogAbstract"]},function(a){$ws.proto.DialogAlert=a.extend({$protected:{_options:{type:"info",buttons:[{tabindex:1,width:"100%",height:"100%",name:"simpleDialogOk",renderStyle:"classic",caption:"OK",handlers:{onActivated:function(){this.getParent().close();}}}]}},$constructor:function(){this._container.addClass("ws-smp-dlg-"+(this._options.type||"info"));}});return $ws.proto.DialogAlert;});