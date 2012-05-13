
//All Villo dependencies, in one bag: 
var JSON;JSON||(JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(a){function t(a){return Object.prototype.toString.call(a)=="[object Function]"}function u(a){return Object.prototype.toString.call(a)=="[object Array]"}function v(a,b){var c=/^\w+\:\/\//;return/^\/\/\/?/.test(a)?a=location.protocol+a:!c.test(a)&&a.charAt(0)!="/"&&(a=(b||"")+a),c.test(a)?a:(a.charAt(0)=="/"?j:i)+a}function w(a,b){for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}function x(a){var b=!1;for(var c=0;c<a.scripts.length;c++)a.scripts[c].ready&&a.scripts[c].exec_trigger&&(b=!0,a.scripts[c].exec_trigger(),a.scripts[c].exec_trigger=null);return b}function y(a,b,c,d){a.onload=a.onreadystatechange=function(){if(a.readyState&&a.readyState!="complete"&&a.readyState!="loaded"||b[c])return;a.onload=a.onreadystatechange=null,d()}}function z(a){a.ready=a.finished=!0;for(var b=0;b<a.finished_listeners.length;b++)a.finished_listeners[b]();a.ready_listeners=[],a.finished_listeners=[]}function A(a,b,d,e,f){setTimeout(function(){var h,i=b.real_src,l;if("item"in k){if(!k[0]){setTimeout(arguments.callee,25);return}k=k[0]}h=document.createElement("script"),b.type&&(h.type=b.type),b.charset&&(h.charset=b.charset),f?q?(a[g]&&m("start script preload: "+i),d.elem=h,p?(h.preload=!0,h.onpreload=e):h.onreadystatechange=function(){h.readyState=="loaded"&&e()},h.src=i):f&&i.indexOf(j)==0&&a[c]?(l=new XMLHttpRequest,a[g]&&m("start script preload (xhr): "+i),l.onreadystatechange=function(){l.readyState==4&&(l.onreadystatechange=function(){},d.text=l.responseText+"\n//@ sourceURL="+i,e())},l.open("GET",i),l.send()):(a[g]&&m("start script preload (cache): "+i),h.type="text/cache-script",y(h,d,"ready",function(){k.removeChild(h),e()}),h.src=i,k.insertBefore(h,k.firstChild)):r?(a[g]&&m("start script load (ordered async): "+i),h.async=!1,y(h,d,"finished",e),h.src=i,k.insertBefore(h,k.firstChild)):(a[g]&&m("start script load: "+i),y(h,d,"finished",e),h.src=i,k.insertBefore(h,k.firstChild))},0)}function B(){function r(a,b,c){function f(){d!=null&&(d=null,z(c))}var d;if(o[b.src].finished)return;a[e]||(o[b.src].finished=!0),d=c.elem||document.createElement("script"),b.type&&(d.type=b.type),b.charset&&(d.charset=b.charset),y(d,c,"finished",f),c.elem?c.elem=null:c.text?(d.onload=d.onreadystatechange=null,d.text=c.text):d.src=b.real_src,k.insertBefore(d,k.firstChild),c.text&&f()}function C(a,b,c,d){var g,i,j=function(){b.ready_cb(b,function(){r(a,b,g)})},k=function(){b.finished_cb(b,c)};b.src=v(b.src,a[h]),b.real_src=b.src+(a[f]?(/\?.*$/.test(b.src)?"&_":"?_")+~~(Math.random()*1e9)+"=":""),o[b.src]||(o[b.src]={items:[],finished:!1}),i=o[b.src].items,a[e]||i.length==0?(g=i[i.length]={ready:!1,finished:!1,ready_listeners:[j],finished_listeners:[k]},A(a,b,g,d?function(){g.ready=!0;for(var a=0;a<g.ready_listeners.length;a++)g.ready_listeners[a]();g.ready_listeners=[]}:function(){z(g)},d)):(g=i[0],g.finished?k():g.finished_listeners.push(k))}function D(){function k(a,c){b[g]&&m("script preload finished: "+a.real_src),a.ready=!0,a.exec_trigger=c,o()}function l(a,c){b[g]&&m("script execution finished: "+a.real_src),a.ready=a.finished=!0,a.exec_trigger=null;for(var d=0;d<c.scripts.length;d++)if(!c.scripts[d].finished)return;c.finished=!0,o()}function o(){while(e<c.length){if(t(c[e])){b[g]&&m("$LAB.wait() executing: "+c[e]);try{c[e++]()}catch(a){b[g]&&n("$LAB.wait() error caught: ",a)}continue}if(!c[e].finished){if(x(c[e]))continue;break}e++}e==c.length&&(f=!1,h=!1)}function p(){(!h||!h.scripts)&&c.push(h={scripts:[],finished:!0})}var a,b=w(i,{}),c=[],e=0,f=!1,h;return a={script:function(){for(var c=0;c<arguments.length;c++)(function(c,e){var g;u(c)||(e=[c]);for(var i=0;i<e.length;i++){p(),c=e[i],t(c)&&(c=c());if(!c)continue;if(u(c)){g=[].slice.call(c),g.unshift(i,1),[].splice.apply(e,g),i--;continue}typeof c=="string"&&(c={src:c}),c=w(c,{ready:!1,ready_cb:k,finished:!1,finished_cb:l}),h.finished=!1,h.scripts.push(c),C(b,c,h,j&&f),f=!0,b[d]&&a.wait()}})(arguments[c],arguments[c]);return a},wait:function(){if(arguments.length>0){for(var b=0;b<arguments.length;b++)c.push(arguments[b]);h=c[c.length-1]}else h=!1;return o(),a}},{script:a.script,wait:a.wait,setOptions:function(c){return w(c,b),a}}}var i={},j=q||s,l=[],o={},p;return i[c]=!0,i[d]=!1,i[e]=!1,i[f]=!1,i[g]=!1,i[h]="",p={setGlobalDefaults:function(a){return w(a,i),p},setOptions:function(){return D().setOptions.apply(null,arguments)},script:function(){return D().script.apply(null,arguments)},wait:function(){return D().wait.apply(null,arguments)},queueScript:function(){return l[l.length]={type:"script",args:[].slice.call(arguments)},p},queueWait:function(){return l[l.length]={type:"wait",args:[].slice.call(arguments)},p},runQueue:function(){var a=p,b=l.length,c=b,d;for(;--c>=0;)d=l.shift(),a=a[d.type].apply(null,d.args);return a},noConflict:function(){return a.$LAB=b,p},sandbox:function(){return B()}},p}var b=a.$LAB,c="UseLocalXHR",d="AlwaysPreserveOrder",e="AllowDuplicates",f="CacheBust",g="Debug",h="BasePath",i=/^[^?#]*\//.exec(location.href)[0],j=/^\w+\:\/\/\/?[^\/]+/.exec(i)[0],k=document.head||document.getElementsByTagName("head"),l=a.opera&&Object.prototype.toString.call(a.opera)=="[object Opera]"||"MozAppearance"in document.documentElement.style,m=function(){},n=m,o=document.createElement("script"),p=typeof o.preload=="boolean",q=p||o.readyState&&o.readyState=="uninitialized",r=!q&&o.async===!0,s=!q&&!r&&!l;a.console&&a.console.log&&(a.console.error||(a.console.error=a.console.log),m=function(b){a.console.log(b)},n=function(b,c){a.console.error(b,c)}),a.$LAB=B(),function(a,b,c){document.readyState==null&&document[a]&&(document.readyState="loading",document[a](b,c=function(){document.removeEventListener(b,c,!1),document.readyState="complete"},!1))}("addEventListener","DOMContentLoaded")}(this),function(){function a(){return"x"+ ++d+""+ +(new Date)}function b(){return+(new Date)}function h(a,c){var d,e=0,f=function(){e+c>b()?(clearTimeout(d),d=setTimeout(f,c)):(e=b(),a())};return f}function i(a,b){if(!a||!b)return;if(typeof a[0]!="undefined")for(var c=0,d=a.length;c<d;)b.call(a[c],a[c],c++);else for(var c in a)a.hasOwnProperty&&a.hasOwnProperty(c)&&b.call(a[c],c,a[c])}function j(a,b){var c=[];return i(a||[],function(a,d){c.push(b(a,d))}),c}function k(a,b){var c=[];return i(a||[],function(a){b(a)&&c.push(a)}),c}function l(a,b){return setTimeout(a,b)}function m(a){return j(encodeURIComponent(a).split(""),function(a){return"-_.!~*'()".indexOf(a)<0?a:"%"+a.charCodeAt(0).toString(16).toUpperCase()}).join("")}function o(a){var b,c=function(){if(g)return;g=1,clearTimeout(h);try{response=JSON.parse(b.responseText)}catch(a){return k(1)}j(response)},d=0,g=0,h=l(function(){k(1)},f),i=a.fail||function(){},j=a.success||function(){},k=function(a){if(d)return;d=1,clearTimeout(h),b&&(b.onerror=b.onload=null,b.abort&&b.abort(),b=null),a&&i()};try{b=window.XDomainRequest&&new XDomainRequest||new XMLHttpRequest,b.onerror=b.onabort=function(){k(1)},b.onload=b.onloadend=c,b.timeout=f,b.open("GET",a.url.join(e),!0),b.send()}catch(m){return k(0),o(a)}return k}function p(d){var e={},f=d.publish_key||villo.app.pubnub.pub,k=d.subscribe_key||villo.app.pubnub.sub,q=d.ssl?"s":"",r="http"+q+"://"+(d.origin||"pubsub.pubnub.com"),s={history:function(a,b){var b=a.callback||b,c=a.limit||100,d=a.channel;if(!d)return log("Missing Channel");if(!b)return log("Missing Callback");o({url:[r,"history",k,m(d),0,c],success:function(a){b(a)},fail:function(a){log(a)}})},time:function(a){o({url:[r,"time",0],success:function(b){a(b[0])},fail:function(){a(0)}})},uuid:function(a){o({url:["http"+q+"://pubnub-prod.appspot.com/uuid"],success:function(b){a(b[0])},fail:function(){a(0)}})},publish:function(a,b){var b=b||a.callback||function(){},c=a.message,d=a.channel,e;if(!c)return log("Missing Message");if(!d)return log("Missing Channel");if(!f)return log("Missing Publish Key");c=JSON.stringify(c),e=[r,"publish",f,k,0,m(d),0,m(c)],o({success:function(a){b(a)},fail:function(){b([0,"Disconnected"])},url:e})},unsubscribe:function(a){var b=a.channel;if(!(b in e))return;e[b].connected=0,e[b].done&&e[b].done(0)},subscribe:function(a,b){function w(){if(!e[d].connected)return;e[d].done=o({callback:0,url:[v,"subscribe",k,m(d),0,h],fail:function(){t||(t=1,q()),l(w,1e3),s.time(function(a){a||j()})},success:function(a){if(!e[d].connected)return;u||(u=1,n()),t&&(t=0,p()),f=c.set(k+d,h=f&&c.get(k+d)||a[1]),i(a[0],function(c){b(c,a)}),l(w,10)}})}var d=a.channel,b=b||a.callback,f=a.restore,h=0,j=a.error||function(){},n=a.connect||function(){},p=a.reconnect||function(){},q=a.disconnect||function(){},t=0,u=0,v=g(r);if(!d)return log("Missing Channel");if(!b)return log("Missing Callback");if(!k)return log("Missing Subscribe Key");d in e||(e[d]={});if(e[d].connected)return log("Already Connected");e[d].connected=1,w()},init:p,xdr:o,db:c,each:i,map:j,now:b,unique:a,events:n,updater:h};return s}var c=function(){var a=typeof localStorage!="undefined"&&localStorage;return{get:function(b){try{return a?a.getItem(b):document.cookie.indexOf(b)==-1?null:((document.cookie||"").match(RegExp(b+"=([^;]+)"))||[])[1]||null}catch(c){return}},set:function(b,c){try{if(a)return a.setItem(b,c)&&0;document.cookie=b+"="+c+"; expires=Thu, 1 Aug 2030 20:00:00 UTC; path=/"}catch(d){return}}}}(),d=1,e="/",f=14e4,g=function(){var a=Math.floor(Math.random()*9)+1;return function(b){return b.indexOf("pubsub")>0&&b.replace("pubsub","ps"+(++a<10?a:a=1))||b}}(),n={list:{},unbind:function(a){n.list[a]=[]},bind:function(a,b){(n.list[a]=n.list[a]||[]).push(b)},fire:function(a,b){i(n.list[a]||[],function(a){a(b)})}};typeof module!="undefined"&&(module.exports=p)||(PUBNUB=p)}(),function(){function h(){try{return d in b&&b[d]}catch(a){return!1}}function i(){try{return e in b&&b[e]&&b[e][b.location.hostname]}catch(a){return!1}}var a={},b=window,c=b.document,d="localStorage",e="globalStorage",f="__storejs__",g;a.disabled=!1,a.set=function(a,b){},a.get=function(a){},a.remove=function(a){},a.clear=function(){},a.transact=function(b,c,d){var e=a.get(b);d==null&&(d=c,c=null),typeof e=="undefined"&&(e=c||{}),d(e),a.set(b,e)},a.getAll=function(){},a.serialize=function(a){return JSON.stringify(a)},a.deserialize=function(a){return typeof a!="string"?undefined:JSON.parse(a)};if(h())g=b[d],a.set=function(b,c){if(c===undefined)return a.remove(b);g.setItem(b,a.serialize(c))},a.get=function(b){return a.deserialize(g.getItem(b))},a.remove=function(a){g.removeItem(a)},a.clear=function(){g.clear()},a.getAll=function(){var b={};for(var c=0;c<g.length;++c){var d=g.key(c);b[d]=a.get(d)}return b};else if(i())g=b[e][b.location.hostname],a.set=function(b,c){if(c===undefined)return a.remove(b);g[b]=a.serialize(c)},a.get=function(b){return a.deserialize(g[b]&&g[b].value)},a.remove=function(a){delete g[a]},a.clear=function(){for(var a in g)delete g[a]},a.getAll=function(){var b={};for(var c=0;c<g.length;++c){var d=g.key(c);b[d]=a.get(d)}return b};else if(c.documentElement.addBehavior){var j,k;try{k=new ActiveXObject("htmlfile"),k.open(),k.write('<script>document.w=window</script><iframe src="/favicon.ico"></frame>'),k.close(),j=k.w.frames[0].document,g=j.createElement("div")}catch(l){g=c.createElement("div"),j=c.body}function m(b){return function(){var c=Array.prototype.slice.call(arguments,0);c.unshift(g),j.appendChild(g),g.addBehavior("#default#userData"),g.load(d);var e=b.apply(a,c);return j.removeChild(g),e}}function n(a){return"_"+a}a.set=m(function(b,c,e){c=n(c);if(e===undefined)return a.remove(c);b.setAttribute(c,a.serialize(e)),b.save(d)}),a.get=m(function(b,c){return c=n(c),a.deserialize(b.getAttribute(c))}),a.remove=m(function(a,b){b=n(b),a.removeAttribute(b),a.save(d)}),a.clear=m(function(a){var b=a.XMLDocument.documentElement.attributes;a.load(d);for(var c=0,e;e=b[c];c++)a.removeAttribute(e.name);a.save(d)}),a.getAll=m(function(b){var c=b.XMLDocument.documentElement.attributes;b.load(d);var e={};for(var f=0,g;g=c[f];++f)e[g]=a.get(g);return e})}try{a.set(f,f),a.get(f)!=f&&(a.disabled=!0),a.remove(f)}catch(l){a.disabled=!0}typeof module!="undefined"&&typeof module!="function"?module.exports=a:typeof define=="function"&&define.amd?define(a):this.store=a}()