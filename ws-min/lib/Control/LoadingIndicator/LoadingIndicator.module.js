$ws.declareModule({namespace:"SBIS3.CORE",name:"LoadingIndicator",imports:["SBIS3.CORE.Control","SBIS3.CORE.Window","SBIS3.CORE.Dialog","SBIS3.CORE.ModalOverlay"]},function(b){$ws.proto.LoadingIndicator=b.Control.extend({$protected:{_loadingPic:"",_loadingIndicator:"",_loadingContainer:"",_loadingText:"",_picture:"",_myWindow:"",_defWin:null,_myProgressBar:null,_progressBarContainer:"",_windowHeight:undefined,_windowWidth:undefined,_options:{message:"Загрузка",loadingPicture:"",isShowLoadingPicture:true,showInWindow:true,height:57,width:"100%",modal:true,progressBar:false,showPercent:true}},$constructor:function(){this._redraw();},getParent:function(){return this._parent;},show:function(){var c=this;if(this._options.showInWindow){this._defWin.addCallback(function(){c._myWindow.moveWindowToCenter({width:c._windowWidth,height:c._windowHeight});c._myWindow.show();});}else{this._loadingIndicator.show();}},hide:function(){var c=this;if(this._options.showInWindow){this._defWin.addCallback(function(){c._myWindow.hide();});}else{this._loadingIndicator.hide();}},setMessage:function(c){if(this._loadingText){this._loadingText.html($ws.helpers.escapeTagsFromStr(c,["script"]));if(this._myWindow){this._recalcWindowSize(this._myWindow._window);}}},_recalcWindowSize:function(e){var d=this,c=function(){d._windowHeight=e.height()||d._windowHeight;d._windowWidth=e.width()||d._windowWidth;};if(/none/.test(e.css("display"))){e.css({display:"block",visibility:"hidden"});c();e.css({display:"none",visibility:"visible"});}else{c();this._myWindow.moveWindowToCenter({width:this._windowWidth,height:this._windowHeight});}},close:function a(){this.destroy();},setImg:function(c){if(this._picture){this._picture.attr("src",c);}},_redraw:function(){if(this._myWindow){this._myWindow.close();}if(this._container&&(this._progressBarContainer||this._loadingIndicator)){this._container.html("");}if(this._options.loadingPicture===""){this._options.loadingPicture=$ws._const.wsRoot+"img/ajax-loader-indicator.gif";}if(this._options.showInWindow){this._container=$("<div></div>");this._renderInd();this._defWin=new $ws.proto.Deferred();var c=this;$ws.core.attachInstance("SBIS3.CORE."+((this._options.modal)?"Dialog":"Window"),{template:"loadingIndicator",resizable:false,border:false,opener:this,handlers:{onReady:function(){this._keysWeHandle=[];c._myWindow=this;this.getContainer().find("#winIndicator").append(c._container);c._windowHeight=this._window.height();c._windowWidth=this._window.width();},onAfterShow:function(){if(!c._defWin.isReady()){c._defWin.callback();}}}});}else{this._renderInd();}},_renderInd:function(){if(this._options.progressBar){this._progressBarContainer=$("<div class='ws-progressbar-container'></div>");this._loadingText=$("<span style='display: block; padding: 10px 0px; overflow: hidden; text-overflow: ellipsis; width: 289px'>"+this._options.message+"</span>");this._progressBarContainer.append(this._loadingText);var c=this;this._myProgressBar=$ws.core.attachInstance("SBIS3.CORE.ProgressBar",{element:c._progressBarContainer,width:"289px",handlers:{onInit:function(){c._progressBarContainer.find(".ws-progressbar").css("margin","0 auto");if(!c._options.showPercent){c._progressBarContainer.find(".ws-progressbar-indicator span").css("display","none");}}}});}else{if(typeof(this._options.width)==="string"){var d=this._options.width;if(d[d.length-1]!="%"){this._options.width=parseInt(this._options.width,10)+"px";}}else{this._options.width=this._options.width+"px";}if(this._options.isShowLoadingPicture){this._picture=$("<img src='"+this._options.loadingPicture+"'>").attr("title",this._options.message);this._loadingPic=$("<div class='ws-loadingimg'></div>").append(this._picture);}else{this._loadingPic=$("<div class='ws-loadingimg'></div>");}this._loadingContainer=$("<span style='display: inline-block; padding: 20px; position: relative; vertical-align: middle;' />");this._loadingContainer.append(this._loadingText=$("<span style='width: auto; margin-left: 40px;'>"+this._options.message+"</span>"));this._loadingIndicator=$("<div class='ws-loading'></div>").append(this._loadingContainer.append(this._loadingPic));this._loadingIndicator.css({"text-align":"center",height:this._options.height});if(this._options.showInWindow){this._loadingIndicator.css({width:"100%"});}this._loadingPic.css("background-color",this._options.bgColor);}this._container.append(this._options.progressBar?this._progressBarContainer:this._loadingIndicator);this._notify("onReady");},getWindow:function(){return this._myWindow;},setProgress:function(c){c=parseInt(c,10);if(c>=0&&c<=100&&this._myProgressBar!==null){this._myProgressBar.addCallback(function(d){d.setProgress(c);return d;});return true;}else{return false;}},destroy:function(){if(this._options.showInWindow){var c=this;this._defWin.addCallback(function(){c._myWindow.close();});}$ws.proto.LoadingIndicator.superclass.destroy.apply(this,arguments);}});return $ws.proto.LoadingIndicator;});