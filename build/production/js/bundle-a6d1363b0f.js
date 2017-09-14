function windowResize(){null!=window.getComputedStyle&&(SCREENSIZE=window.getComputedStyle(document.body,":after").getPropertyValue("content"),SCREENSIZE=parseInt(SCREENSIZE.replace(/["']{1}/gi,"")),isNaN(SCREENSIZE)&&(SCREENSIZE=0))}!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=6)}({6:function(t,e,n){"use strict"}}),function(t){var e=function t(e){return new t.init(e)};e.init=function(t){this.node=t||"",this.getNode()},e.prototype={getNode:function(){},newChild:function(){}},e.init.prototype=e.prototype,t.Blocstart=e}(window);var modal=Blocstart(".js-modal");"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))?function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,r=arguments.length;for(n=0;n<r;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}():function(t){"use strict";if("Element"in t){var e="classList",n="prototype",r=t.Element[n],i=Object,o=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},s=Array[n].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1},c=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},u=function(t,e){if(""===e)throw new c("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new c("INVALID_CHARACTER_ERR","String contains an invalid character");return s.call(t,e)},a=function(t){for(var e=o.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],r=0,i=n.length;r<i;r++)this.push(n[r]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},l=a[n]=[],f=function(){return new a(this)};if(c[n]=Error[n],l.item=function(t){return this[t]||null},l.contains=function(t){return t+="",-1!==u(this,t)},l.add=function(){var t,e=arguments,n=0,r=e.length,i=!1;do{t=e[n]+"",-1===u(this,t)&&(this.push(t),i=!0)}while(++n<r);i&&this._updateClassName()},l.remove=function(){var t,e,n=arguments,r=0,i=n.length,o=!1;do{for(t=n[r]+"",e=u(this,t);-1!==e;)this.splice(e,1),o=!0,e=u(this,t)}while(++r<i);o&&this._updateClassName()},l.toggle=function(t,e){t+="";var n=this.contains(t),r=n?!0!==e&&"remove":!1!==e&&"add";return r&&this[r](t),!0===e||!1===e?e:!n},l.toString=function(){return this.join(" ")},i.defineProperty){var p={get:f,enumerable:!0,configurable:!0};try{i.defineProperty(r,e,p)}catch(t){-2146823252===t.number&&(p.enumerable=!1,i.defineProperty(r,e,p))}}else i[n].__defineGetter__&&r.__defineGetter__(e,f)}}(self)),document.documentElement.classList.remove("no-js");for(var SOCIALPOPS=document.querySelectorAll(".js-social-pop"),i=0,l=SOCIALPOPS.length;i<l;i++)SOCIALPOPS[i].addEventListener("click",function(t){t.preventDefault(),window.open(t.currentTarget.href,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=500")},!1);var extend=function(t){t=t||{};for(var e=1;e<arguments.length;e++)if(arguments[e])for(var n in arguments[e])arguments[e].hasOwnProperty(n)&&(t[n]=arguments[e][n]);return t},SCREENSIZE=0,WIDESCREEN=!1;!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";var r=n(1);new(function(t){return t&&t.__esModule?t:{default:t}}(r).default)("Blocstarter").greet()},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=function(){function t(e){r(this,t),this.name=e}return i(t,[{key:"greet",value:function(){console.log("Hello there, you are using "+this.name)}}]),t}();t.exports=o}]);