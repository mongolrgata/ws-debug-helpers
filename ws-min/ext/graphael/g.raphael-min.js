(function(){Raphael.el.popup=function(f,a,b,c){var e=this.paper||this[0].paper,d,h,j,g;if(e){switch(this.type){case "text":case "circle":case "ellipse":h=!0;break;default:h=!1}f=null==f?"up":f;a=a||5;d=this.getBBox();b="number"==typeof b?b:h?d.x+d.width/2:d.x;c="number"==typeof c?c:h?d.y+d.height/2:d.y;j=Math.max(d.width/2-a,0);g=Math.max(d.height/2-a,0);this.translate(b-d.x-(h?d.width/2:0),c-d.y-(h?d.height/2:0));d=this.getBBox();b={up:["M",b,c,"l",-a,-a,-j,0,"a",a,a,0,0,1,-a,-a,"l",0,-d.height, "a",a,a,0,0,1,a,-a,"l",2*a+2*j,0,"a",a,a,0,0,1,a,a,"l",0,d.height,"a",a,a,0,0,1,-a,a,"l",-j,0,"z"].join(),down:["M",b,c,"l",a,a,j,0,"a",a,a,0,0,1,a,a,"l",0,d.height,"a",a,a,0,0,1,-a,a,"l",-(2*a+2*j),0,"a",a,a,0,0,1,-a,-a,"l",0,-d.height,"a",a,a,0,0,1,a,-a,"l",j,0,"z"].join(),left:["M",b,c,"l",-a,a,0,g,"a",a,a,0,0,1,-a,a,"l",-d.width,0,"a",a,a,0,0,1,-a,-a,"l",0,-(2*a+2*g),"a",a,a,0,0,1,a,-a,"l",d.width,0,"a",a,a,0,0,1,a,a,"l",0,g,"z"].join(),right:["M",b,c,"l",a,-a,0,-g,"a",a,a,0,0,1,a,-a,"l",d.width, 0,"a",a,a,0,0,1,a,a,"l",0,2*a+2*g,"a",a,a,0,0,1,-a,a,"l",-d.width,0,"a",a,a,0,0,1,-a,-a,"l",0,-g,"z"].join()};a={up:{x:-!h*(d.width/2),y:2*-a-(h?d.height/2:d.height)},down:{x:-!h*(d.width/2),y:2*a+(h?d.height/2:d.height)},left:{x:2*-a-(h?d.width/2:d.width),y:-!h*(d.height/2)},right:{x:2*a+(h?d.width/2:d.width),y:-!h*(d.height/2)}}[f];this.translate(a.x,a.y);return e.path(b[f]).attr({fill:"#000",stroke:"none"}).insertBefore(this.node?this:this[0])}};Raphael.el.tag=function(f,a,b,c){var e=this.paper|| this[0].paper;if(e){var e=e.path().attr({fill:"#000",stroke:"#000"}),d=this.getBBox(),h,j,g;switch(this.type){case "text":case "circle":case "ellipse":g=!0;break;default:g=!1}f=f||0;b="number"==typeof b?b:g?d.x+d.width/2:d.x;c="number"==typeof c?c:g?d.y+d.height/2:d.y;a=null==a?5:a;j=0.5522*a;d.height>=2*a?e.attr({path:["M",b,c+a,"a",a,a,0,1,1,0,2*-a,a,a,0,1,1,0,2*a,"m",0,2*-a-3,"a",a+3,a+3,0,1,0,0,2*(a+3),"L",b+a+3,c+d.height/2+3,"l",d.width+6,0,0,-d.height-6,-d.width-6,0,"L",b,c-a-3].join()}):(h= Math.sqrt(Math.pow(a+3,2)-Math.pow(d.height/2+3,2)),e.attr({path:["M",b,c+a,"c",-j,0,-a,j-a,-a,-a,0,-j,a-j,-a,a,-a,j,0,a,a-j,a,a,0,j,j-a,a,-a,a,"M",b+h,c-d.height/2-3,"a",a+3,a+3,0,1,0,0,d.height+6,"l",a+3-h+d.width+6,0,0,-d.height-6,"L",b+h,c-d.height/2-3].join()}));f=360-f;e.rotate(f,b,c);this.attrs?(this.attr(this.attrs.x?"x":"cx",b+a+3+(!g?"text"==this.type?d.width:0:d.width/2)).attr("y",g?c:c-d.height/2),this.rotate(f,b,c),90<f&&270>f&&this.attr(this.attrs.x?"x":"cx",b-a-3-(!g?d.width:d.width/ 2)).rotate(180,b,c)):90<f&&270>f?(this.translate(b-d.x-d.width-a-3,c-d.y-d.height/2),this.rotate(f-180,d.x+d.width+a+3,d.y+d.height/2)):(this.translate(b-d.x+a+3,c-d.y-d.height/2),this.rotate(f,d.x-a-3,d.y+d.height/2));return e.insertBefore(this.node?this:this[0])}};Raphael.el.drop=function(f,a,b){var c=this.getBBox(),e=this.paper||this[0].paper,d,h;if(e){switch(this.type){case "text":case "circle":case "ellipse":d=!0;break;default:d=!1}f=f||0;a="number"==typeof a?a:d?c.x+c.width/2:c.x;b="number"== typeof b?b:d?c.y+c.height/2:c.y;h=Math.max(c.width,c.height)+Math.min(c.width,c.height);e=e.path(["M",a,b,"l",h,0,"A",0.4*h,0.4*h,0,1,0,a+0.7*h,b-0.7*h,"z"]).attr({fill:"#000",stroke:"none"}).rotate(22.5-f,a,b);f=(f+90)*Math.PI/180;a=a+h*Math.sin(f)-(d?0:c.width/2);f=b+h*Math.cos(f)-(d?0:c.height/2);this.attrs?this.attr(this.attrs.x?"x":"cx",a).attr(this.attrs.y?"y":"cy",f):this.translate(a-c.x,f-c.y);return e.insertBefore(this.node?this:this[0])}};Raphael.el.flag=function(f,a,b){var c=this.paper|| this[0].paper;if(c){var c=c.path().attr({fill:"#000",stroke:"#000"}),e=this.getBBox(),d=e.height/2,h;switch(this.type){case "text":case "circle":case "ellipse":h=!0;break;default:h=!1}f=f||0;a="number"==typeof a?a:h?e.x+e.width/2:e.x;b="number"==typeof b?b:h?e.y+e.height/2:e.y;c.attr({path:["M",a,b,"l",d+3,-d-3,e.width+6,0,0,e.height+6,-e.width-6,0,"z"].join()});f=360-f;c.rotate(f,a,b);this.attrs?(this.attr(this.attrs.x?"x":"cx",a+d+3+(!h?"text"==this.type?e.width:0:e.width/2)).attr("y",h?b:b-e.height/ 2),this.rotate(f,a,b),90<f&&270>f&&this.attr(this.attrs.x?"x":"cx",a-d-3-(!h?e.width:e.width/2)).rotate(180,a,b)):90<f&&270>f?(this.translate(a-e.x-e.width-d-3,b-e.y-e.height/2),this.rotate(f-180,e.x+e.width+d+3,e.y+e.height/2)):(this.translate(a-e.x+d+3,b-e.y-e.height/2),this.rotate(f,e.x-d-3,e.y+e.height/2));return c.insertBefore(this.node?this:this[0])}};Raphael.el.label=function(){var f=this.getBBox(),a=this.paper||this[0].paper,b=Math.min(20,f.width+10,f.height+10)/2;if(a)return a.rect(f.x-b/ 2,f.y-b/2,f.width+b,f.height+b,b).attr({stroke:"none",fill:"#000"}).insertBefore(this.node?this:this[0])};Raphael.el.blob=function(f,a,b){var c=this.getBBox(),e=Math.PI/180,d=this.paper||this[0].paper,h,j;if(d){switch(this.type){case "text":case "circle":case "ellipse":h=!0;break;default:h=!1}d=d.path().attr({fill:"#000",stroke:"none"});f=(+f+1?f:45)+90;j=Math.min(c.height,c.width);a="number"==typeof a?a:h?c.x+c.width/2:c.x;b="number"==typeof b?b:h?c.y+c.height/2:c.y;var g=Math.max(c.width+j,25*j/ 12),l=Math.max(c.height+j,25*j/12);h=a+j*Math.sin((f-22.5)*e);var k=b+j*Math.cos((f-22.5)*e),m=a+j*Math.sin((f+22.5)*e);f=b+j*Math.cos((f+22.5)*e);e=(m-h)/2;j=(f-k)/2;var g=g/2,l=l/2,n=-Math.sqrt(Math.abs(g*g*l*l-g*g*j*j-l*l*e*e)/(g*g*j*j+l*l*e*e));j=n*g*j/l+(m+h)/2;e=n*-l*e/g+(f+k)/2;d.attr({x:j,y:e,path:["M",a,b,"L",m,f,"A",g,l,0,1,1,h,k,"z"].join()});this.translate(j-c.x-c.width/2,e-c.y-c.height/2);return d.insertBefore(this.node?this:this[0])}};Raphael.fn.label=function(f,a,b){var c=this.set(); b=this.text(f,a,b).attr(Raphael.g.txtattr);return c.push(b.label(),b)};Raphael.fn.popup=function(f,a,b,c,e){var d=this.set();b=this.text(f,a,b).attr(Raphael.g.txtattr);return d.push(b.popup(c,e),b)};Raphael.fn.tag=function(f,a,b,c,e){var d=this.set();b=this.text(f,a,b).attr(Raphael.g.txtattr);return d.push(b.tag(c,e),b)};Raphael.fn.flag=function(f,a,b,c){var e=this.set();b=this.text(f,a,b).attr(Raphael.g.txtattr);return e.push(b.flag(c),b)};Raphael.fn.drop=function(f,a,b,c){var e=this.set();b=this.text(f, a,b).attr(Raphael.g.txtattr);return e.push(b.drop(c),b)};Raphael.fn.blob=function(f,a,b,c){var e=this.set();b=this.text(f,a,b).attr(Raphael.g.txtattr);return e.push(b.blob(c),b)};Raphael.el.lighter=function(f){f=f||2;var a=[this.attrs.fill,this.attrs.stroke];this.fs=this.fs||[a[0],a[1]];a[0]=Raphael.rgb2hsb(Raphael.getRGB(a[0]).hex);a[1]=Raphael.rgb2hsb(Raphael.getRGB(a[1]).hex);a[0].b=Math.min(a[0].b*f,1);a[0].s/=f;a[1].b=Math.min(a[1].b*f,1);a[1].s/=f;this.attr({fill:"hsb("+[a[0].h,a[0].s,a[0].b]+ ")",stroke:"hsb("+[a[1].h,a[1].s,a[1].b]+")"});return this};Raphael.el.darker=function(f){f=f||2;var a=[this.attrs.fill,this.attrs.stroke];this.fs=this.fs||[a[0],a[1]];a[0]=Raphael.rgb2hsb(Raphael.getRGB(a[0]).hex);a[1]=Raphael.rgb2hsb(Raphael.getRGB(a[1]).hex);a[0].s=Math.min(a[0].s*f,1);a[0].b/=f;a[1].s=Math.min(a[1].s*f,1);a[1].b/=f;this.attr({fill:"hsb("+[a[0].h,a[0].s,a[0].b]+")",stroke:"hsb("+[a[1].h,a[1].s,a[1].b]+")"});return this};Raphael.el.resetBrightness=function(){this.fs&&(this.attr({fill:this.fs[0], stroke:this.fs[1]}),delete this.fs);return this};var x=["lighter","darker","resetBrightness"],u="popup tag flag label drop blob".split(" "),q;for(q in u)(function(f){Raphael.st[f]=function(){return Raphael.el[f].apply(this,arguments)}})(u[q]);for(q in x)(function(f){Raphael.st[f]=function(){for(var a=0;a<this.length;a++)this[a][f].apply(this[a],arguments);return this}})(x[q]);x=Raphael;u=[0.6,0.2,0.05,0.1333,0.75,0];q=[];for(var k=0;10>k;k++)k<u.length?q.push("hsb("+u[k]+",.75, .75)"):q.push("hsb("+ u[k-u.length]+", 1, .5)");x.g={shim:{stroke:"none",fill:"#000","fill-opacity":0},txtattr:{font:"12px Arial, sans-serif",fill:"#fff"},colors:q,snapEnds:function(f,a,b){function c(a){return 0.25>Math.abs(a-0.5)?~~a+0.5:Math.round(a)}var e=f,d=a;if(e==d)return{from:e,to:d,power:0};var e=(d-e)/b,h=d=~~e;b=0;if(d){for(;h;)b--,h=~~(e*Math.pow(10,b))/Math.pow(10,b);b++}else{for(;!d;)b=b||1,d=~~(e*Math.pow(10,b))/Math.pow(10,b),b++;b&&b--}d=c(a*Math.pow(10,b))/Math.pow(10,b);d<a&&(d=c((a+0.5)*Math.pow(10, b))/Math.pow(10,b));e=c((f-(0<b?0:0.5))*Math.pow(10,b))/Math.pow(10,b);return{from:e,to:d,power:b}},axis:function(f,a,b,c,e,d,h,j,g,l,k){l=null==l?2:l;g=g||"t";d=d||10;k=arguments[arguments.length-1];var m="|"==g||" "==g?["M",f+0.5,a,"l",0,0.001]:1==h||3==h?["M",f+0.5,a,"l",0,-b]:["M",f,a+0.5,"l",b,0],n=this.snapEnds(c,e,d),t=n.from,q=n.to,s=n.power,v=0,p={font:"11px 'Fontin Sans', Fontin-Sans, sans-serif"},n=k.set(),q=(q-t)/d,r=t,w=0<s?s:0,z=b/d;if(1==+h||3==+h){s=a;for(t=(h-1?1:-1)*(l+3+!!(h-1));s>= a-b;)"-"!=g&&" "!=g&&(m=m.concat(["M",f-("+"==g||"|"==g?l:2*!(h-1)*l),s+0.5,"l",2*l+1,0])),n.push(k.text(f+t,s,j&&j[v++]||(Math.round(r)==r?r:+r.toFixed(w))).attr(p).attr({"text-anchor":h-1?"start":"end"})),r+=q,s-=z;Math.round(s+z-(a-b))&&("-"!=g&&" "!=g&&(m=m.concat(["M",f-("+"==g||"|"==g?l:2*!(h-1)*l),a-b+0.5,"l",2*l+1,0])),n.push(k.text(f+t,a-b,j&&j[v]||(Math.round(r)==r?r:+r.toFixed(w))).attr(p).attr({"text-anchor":h-1?"start":"end"})))}else{for(var r=t,w=(0<s)*s,t=(h?-1:1)*(l+9+!h),s=f,z=b/ d,y=0,A=0;s<=f+b;)"-"!=g&&" "!=g&&(m=m.concat(["M",s+0.5,a-("+"==g?l:2*!!h*l),"l",0,2*l+1])),n.push(y=k.text(s,a+t,j&&j[v++]||(Math.round(r)==r?r:+r.toFixed(w))).attr(p)),y=y.getBBox(),A>=y.x-5?n.pop(n.length-1).remove():A=y.x+y.width,r+=q,s+=z;Math.round(s-z-f-b)&&("-"!=g&&" "!=g&&(m=m.concat(["M",f+b+0.5,a-("+"==g?l:2*!!h*l),"l",0,2*l+1])),n.push(k.text(f+b,a+t,j&&j[v]||(Math.round(r)==r?r:+r.toFixed(w))).attr(p)))}m=k.path(m);m.text=n;m.all=k.set([m,n]);m.remove=function(){this.text.remove();this.constructor.prototype.remove.call(this)}; return m},labelise:function(f,a,b){return f?(f+"").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,function(f,e,d){if(e)return(+a).toFixed(e.replace(/^#+\.?/g,"").length);if(d)return(100*a/b).toFixed(d.replace(/^%+\.?/g,"").length)+"%"}):(+a).toFixed(0)}}})(); (function(){function x(k,f){var a=k.length,b,c=[],e=0,d=f.maxSlices||100,h=parseFloat(f.minPercent)||1,j=Boolean(h);if(1===a)b=k[0],c[0]={value:k[0],order:0,valueOf:function(){return this.value}};else{for(var g=b=0;g<a;g++)b+=k[g],c[g]={value:k[g],order:g,valueOf:function(){return this.value}};c.sort(function(a,b){return b.value-a.value});for(g=0;g<a;g++)j&&100*c[g].value/b<h&&(d=g,j=!1),g>d&&(j=!1,c[d].value+=c[g],c[d].others=!0,e=c[d].value);a=Math.min(d+1,c.length);e&&c.splice(a)&&(c[d].others= !0)}return{total:b,values:c}}function u(k,f,a,b,c,e){function d(a,b,d,f,c){var e=Math.max(f,c);f=Math.min(f,c);c=e;0.01>=Math.abs(c-f-360)&&(c-=0.01);var g=Math.PI/180,h=a+d*Math.cos(-f*g),j=a+d*Math.cos(-c*g),e=a+d/2*Math.cos(-(f+(c-f)/2)*g),k=b+d*Math.sin(-f*g),l=b+d*Math.sin(-c*g),g=b+d/2*Math.sin(-(f+(c-f)/2)*g);a=["M",a,b,"L",h,k,"A",d,d,0,+(180<Math.abs(c-f)),0,j,l,"z"];a.middle={x:e,y:g};return a}e=e||{};var h=[],j=k.set(),g=k.set(),l=k.set(),q,m,n=0,t;c=x(c,e);m=c.values;t=c.total;q=m.length; g.covers=j;if(1==q)l.push(k.circle(f,a,b).attr({fill:e.colors&&e.colors[0]||this.colors[0],stroke:e.stroke||"#fff","stroke-width":null==e.strokewidth?1:e.strokewidth})),j.push(k.circle(f,a,b).attr(this.shim)),e.href&&e.href[0]&&j[0].attr({href:e.href[0]}),l[0].middle={x:f,y:a},l[0].mangle=180;else{for(c=0;c<q;c++){var u=n-360*m[c]/t/2;c||(n=90-u,u=n-360*m[c]/t/2);if(e.init)var s=d(f,a,1,n,n-360*m[c]/t).join(",");var v=d(f,a,b,n,n-=360*m[c]/t),p=e.matchColors&&!0==e.matchColors?m[c].order:c,p=k.path(e.init? s:v).attr({fill:e.colors&&e.colors[p]||this.colors[p]||"#666",stroke:e.stroke||"#fff","stroke-width":null==e.strokewidth?1:e.strokewidth,"stroke-linejoin":"round"});p.value=m[c];p.middle=v.middle;p.mangle=u;h.push(p);l.push(p);e.init&&p.animate({path:v.join(",")},+e.init-1||1E3,">")}for(c=0;c<q;c++)p=k.path(h[c].attr("path")).attr(this.shim),e.href&&e.href[c]&&p.attr({href:e.href[c]}),p.attr=function(){},j.push(p),l.push(p)}g.hover=function(d,c){c=c||function(){};for(var e=this,g=0;g<q;g++)(function(g, h,j){var k={sector:g,cover:h,cx:f,cy:a,mx:g.middle.x,my:g.middle.y,mangle:g.mangle,r:b,value:m[j],total:t,label:e.labels&&e.labels[j]};h.mouseover(function(){d.call(k)}).mouseout(function(){c.call(k)})})(l[g],j[g],g);return this};g.each=function(d){for(var c=0;c<q;c++){var e=l[c];d.call({sector:e,cover:j[c],cx:f,cy:a,x:e.middle.x,y:e.middle.y,mangle:e.mangle,r:b,value:m[c],total:t,label:this.labels&&this.labels[c]})}return this};g.click=function(c){for(var d=this,e=0;e<q;e++)(function(e,g,h){var j= {sector:e,cover:g,cx:f,cy:a,mx:e.middle.x,my:e.middle.y,mangle:e.mangle,r:b,value:m[h],total:t,label:d.labels&&d.labels[h]};g.click(function(){c.call(j)})})(l[e],j[e],e);return this};g.inject=function(a){a.insertBefore(j[0])};if(e.legend){n=e.legend;s=e.legendothers;c=e.legendmark;h=e.legendpos;u=f+b+b/5;v=a+10;n=n||[];h=h&&h.toLowerCase&&h.toLowerCase()||"east";c=k[c&&c.toLowerCase()]||"circle";g.labels=k.set();for(p=0;p<q;p++){var r=l[p].attr("fill"),w=m[p].order;m[p].others&&(n[w]=s||"Others"); n[w]=this.labelise(n[w],m[p],t);g.labels.push(k.set());g.labels[p].push(k[c](u+5,v,5).attr({fill:r,stroke:"none"}));g.labels[p].push(r=k.text(u+20,v,n[w]||m[w]).attr(this.txtattr).attr({fill:e.legendcolor||"#000","text-anchor":"start"}));j[p].label=g.labels[p];v+=1.2*r.getBBox().height}k=g.labels.getBBox();g.labels.translate.apply(g.labels,{east:[0,-k.height/2],west:[-k.width-2*b-20,-k.height/2],north:[-b-k.width/2,-b-k.height-10],south:[-b-k.width/2,b+10]}[h]);g.push(g.labels)}g.push(l,j);g.series= l;g.covers=j;return g}var q=function(){};q.prototype=Raphael.g;u.prototype=new q;Raphael.fn.piechart=function(k,f,a,b,c){return new u(this,k,f,a,b,c)};Raphael.fn.piechartPrepareValues=x})();