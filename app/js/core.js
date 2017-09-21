// ========================================================
// POLYFILL
// ========================================================

// Polyfill classList for IE 7+
if("document"in self){if(!("classList"in document.createElement("_"))||document.createElementNS&&!("classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))){(function(t){"use strict";if(!("Element"in t))return;var e="classList",i="prototype",n=t.Element[i],s=Object,r=String[i].trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array[i].indexOf||function(t){var e=0,i=this.length;for(;e<i;e++){if(e in this&&this[e]===t){return e}}return-1},o=function(t,e){this.name=t;this.code=DOMException[t];this.message=e},l=function(t,e){if(e===""){throw new o("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(e)){throw new o("INVALID_CHARACTER_ERR","String contains an invalid character")}return a.call(t,e)},c=function(t){var e=r.call(t.getAttribute("class")||""),i=e?e.split(/\s+/):[],n=0,s=i.length;for(;n<s;n++){this.push(i[n])}this._updateClassName=function(){t.setAttribute("class",this.toString())}},u=c[i]=[],f=function(){return new c(this)};o[i]=Error[i];u.item=function(t){return this[t]||null};u.contains=function(t){t+="";return l(this,t)!==-1};u.add=function(){var t=arguments,e=0,i=t.length,n,s=false;do{n=t[e]+"";if(l(this,n)===-1){this.push(n);s=true}}while(++e<i);if(s){this._updateClassName()}};u.remove=function(){var t=arguments,e=0,i=t.length,n,s=false,r;do{n=t[e]+"";r=l(this,n);while(r!==-1){this.splice(r,1);s=true;r=l(this,n)}}while(++e<i);if(s){this._updateClassName()}};u.toggle=function(t,e){t+="";var i=this.contains(t),n=i?e!==true&&"remove":e!==false&&"add";if(n){this[n](t)}if(e===true||e===false){return e}else{return!i}};u.toString=function(){return this.join(" ")};if(s.defineProperty){var h={get:f,enumerable:true,configurable:true};try{s.defineProperty(n,e,h)}catch(d){if(d.number===-2146823252){h.enumerable=false;s.defineProperty(n,e,h)}}}else if(s[i].__defineGetter__){n.__defineGetter__(e,f)}})(self)}else{(function(){"use strict";var t=document.createElement("_");t.classList.add("c1","c2");if(!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var i,n=arguments.length;for(i=0;i<n;i++){t=arguments[i];e.call(this,t)}}};e("add");e("remove")}t.classList.toggle("c3",false);if(t.classList.contains("c3")){var i=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){if(1 in arguments&&!this.contains(t)===!e){return e}else{return i.call(this,t)}}}t=null})()}}

// Remove class on init if js is enabled
document.documentElement.classList.remove('no-js');

// ========================================================
// SOCIAL-POP
// ========================================================
for(var SOCIALPOPS=document.querySelectorAll(".js-social-pop"),i=0,l=SOCIALPOPS.length;i<l;i++)SOCIALPOPS[i].addEventListener("click",function(a){a.preventDefault();window.open(a.currentTarget.href,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=500")},false);

// ========================================================
// EXTEND
// ========================================================
var extend=function(a){a=a||{};for(var b=1;b<arguments.length;b++)if(arguments[b])for(var c in arguments[b])arguments[b].hasOwnProperty(c)&&(a[c]=arguments[b][c]);return a};

// ========================================================
// WINDOW RESIZE
// ========================================================
var SCREENSIZE = 0,
    WIDESCREEN = false;

function windowResize() {
    if (window.getComputedStyle != null) {
        SCREENSIZE = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
        SCREENSIZE = parseInt(SCREENSIZE.replace(/["']{1}/gi, ""));
        if (isNaN(SCREENSIZE)) SCREENSIZE = 0;
    }
};


// add semicon here avoid if other code doesnt finish the semicolons out properly
// it will still run fine

;(function(global){

    var Blocstart = function(node, settings) {
        this.settings = extend({}, this.defaultSettings, settings);
        this.node = document.querySelectorAll(node) || false;

        console.log(this.node);
    }

    Blocstart.prototype.defaultSettings = {}

    // find childeren

    // create childeren
    // var Blocstart = function(node) {
    //     // Return a new object then use a function constructor to generate the property
    //     return new Blocstart.init(node); // this will return new object with an method init
    // }

    // get width

    // get height

    //  This is an object Literal
    // prototype holds method (to save memory space) to THIS object that is been created
    Blocstart.prototype = {

        getNode: function() {
            // document.querySelector();

        },

        newChild: function() {

        }


        // return = {}
    }

    // all of those objects created to point all methods on this prototype chain
    // Blocstart.init.prototype = Blocstart.prototype;

    global.Blocstart = Blocstart;

}(window));


var modal = new Blocstart('.js-modal');


// var modal = new Modal;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbHlmaWxsLmpzIiwiYmxvY3N0YXJ0LmpzIiwiY29yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gUE9MWUZJTExcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vIFBvbHlmaWxsIGNsYXNzTGlzdCBmb3IgSUUgNytcbmlmKFwiZG9jdW1lbnRcImluIHNlbGYpe2lmKCEoXCJjbGFzc0xpc3RcImluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpKXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TJiYhKFwiY2xhc3NMaXN0XCJpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwiZ1wiKSkpeyhmdW5jdGlvbih0KXtcInVzZSBzdHJpY3RcIjtpZighKFwiRWxlbWVudFwiaW4gdCkpcmV0dXJuO3ZhciBlPVwiY2xhc3NMaXN0XCIsaT1cInByb3RvdHlwZVwiLG49dC5FbGVtZW50W2ldLHM9T2JqZWN0LHI9U3RyaW5nW2ldLnRyaW18fGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZyxcIlwiKX0sYT1BcnJheVtpXS5pbmRleE9mfHxmdW5jdGlvbih0KXt2YXIgZT0wLGk9dGhpcy5sZW5ndGg7Zm9yKDtlPGk7ZSsrKXtpZihlIGluIHRoaXMmJnRoaXNbZV09PT10KXtyZXR1cm4gZX19cmV0dXJuLTF9LG89ZnVuY3Rpb24odCxlKXt0aGlzLm5hbWU9dDt0aGlzLmNvZGU9RE9NRXhjZXB0aW9uW3RdO3RoaXMubWVzc2FnZT1lfSxsPWZ1bmN0aW9uKHQsZSl7aWYoZT09PVwiXCIpe3Rocm93IG5ldyBvKFwiU1lOVEFYX0VSUlwiLFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCIpfWlmKC9cXHMvLnRlc3QoZSkpe3Rocm93IG5ldyBvKFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCIsXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIil9cmV0dXJuIGEuY2FsbCh0LGUpfSxjPWZ1bmN0aW9uKHQpe3ZhciBlPXIuY2FsbCh0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKSxpPWU/ZS5zcGxpdCgvXFxzKy8pOltdLG49MCxzPWkubGVuZ3RoO2Zvcig7bjxzO24rKyl7dGhpcy5wdXNoKGlbbl0pfXRoaXMuX3VwZGF0ZUNsYXNzTmFtZT1mdW5jdGlvbigpe3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIix0aGlzLnRvU3RyaW5nKCkpfX0sdT1jW2ldPVtdLGY9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGModGhpcyl9O29baV09RXJyb3JbaV07dS5pdGVtPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzW3RdfHxudWxsfTt1LmNvbnRhaW5zPWZ1bmN0aW9uKHQpe3QrPVwiXCI7cmV0dXJuIGwodGhpcyx0KSE9PS0xfTt1LmFkZD1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPTAsaT10Lmxlbmd0aCxuLHM9ZmFsc2U7ZG97bj10W2VdK1wiXCI7aWYobCh0aGlzLG4pPT09LTEpe3RoaXMucHVzaChuKTtzPXRydWV9fXdoaWxlKCsrZTxpKTtpZihzKXt0aGlzLl91cGRhdGVDbGFzc05hbWUoKX19O3UucmVtb3ZlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9MCxpPXQubGVuZ3RoLG4scz1mYWxzZSxyO2Rve249dFtlXStcIlwiO3I9bCh0aGlzLG4pO3doaWxlKHIhPT0tMSl7dGhpcy5zcGxpY2UociwxKTtzPXRydWU7cj1sKHRoaXMsbil9fXdoaWxlKCsrZTxpKTtpZihzKXt0aGlzLl91cGRhdGVDbGFzc05hbWUoKX19O3UudG9nZ2xlPWZ1bmN0aW9uKHQsZSl7dCs9XCJcIjt2YXIgaT10aGlzLmNvbnRhaW5zKHQpLG49aT9lIT09dHJ1ZSYmXCJyZW1vdmVcIjplIT09ZmFsc2UmJlwiYWRkXCI7aWYobil7dGhpc1tuXSh0KX1pZihlPT09dHJ1ZXx8ZT09PWZhbHNlKXtyZXR1cm4gZX1lbHNle3JldHVybiFpfX07dS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmpvaW4oXCIgXCIpfTtpZihzLmRlZmluZVByb3BlcnR5KXt2YXIgaD17Z2V0OmYsZW51bWVyYWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlfTt0cnl7cy5kZWZpbmVQcm9wZXJ0eShuLGUsaCl9Y2F0Y2goZCl7aWYoZC5udW1iZXI9PT0tMjE0NjgyMzI1Mil7aC5lbnVtZXJhYmxlPWZhbHNlO3MuZGVmaW5lUHJvcGVydHkobixlLGgpfX19ZWxzZSBpZihzW2ldLl9fZGVmaW5lR2V0dGVyX18pe24uX19kZWZpbmVHZXR0ZXJfXyhlLGYpfX0pKHNlbGYpfWVsc2V7KGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIik7dC5jbGFzc0xpc3QuYWRkKFwiYzFcIixcImMyXCIpO2lmKCF0LmNsYXNzTGlzdC5jb250YWlucyhcImMyXCIpKXt2YXIgZT1mdW5jdGlvbih0KXt2YXIgZT1ET01Ub2tlbkxpc3QucHJvdG90eXBlW3RdO0RPTVRva2VuTGlzdC5wcm90b3R5cGVbdF09ZnVuY3Rpb24odCl7dmFyIGksbj1hcmd1bWVudHMubGVuZ3RoO2ZvcihpPTA7aTxuO2krKyl7dD1hcmd1bWVudHNbaV07ZS5jYWxsKHRoaXMsdCl9fX07ZShcImFkZFwiKTtlKFwicmVtb3ZlXCIpfXQuY2xhc3NMaXN0LnRvZ2dsZShcImMzXCIsZmFsc2UpO2lmKHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzNcIikpe3ZhciBpPURPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO0RPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKHQsZSl7aWYoMSBpbiBhcmd1bWVudHMmJiF0aGlzLmNvbnRhaW5zKHQpPT09IWUpe3JldHVybiBlfWVsc2V7cmV0dXJuIGkuY2FsbCh0aGlzLHQpfX19dD1udWxsfSkoKX19XG5cbi8vIFJlbW92ZSBjbGFzcyBvbiBpbml0IGlmIGpzIGlzIGVuYWJsZWRcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCduby1qcycpO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU09DSUFMLVBPUFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZvcih2YXIgU09DSUFMUE9QUz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXNvY2lhbC1wb3BcIiksaT0wLGw9U09DSUFMUE9QUy5sZW5ndGg7aTxsO2krKylTT0NJQUxQT1BTW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGEpe2EucHJldmVudERlZmF1bHQoKTt3aW5kb3cub3BlbihhLmN1cnJlbnRUYXJnZXQuaHJlZixcIlwiLFwibWVudWJhcj1ubyx0b29sYmFyPW5vLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMsaGVpZ2h0PTUwMCx3aWR0aD01MDBcIil9LGZhbHNlKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEVYVEVORFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnZhciBleHRlbmQ9ZnVuY3Rpb24oYSl7YT1hfHx7fTtmb3IodmFyIGI9MTtiPGFyZ3VtZW50cy5sZW5ndGg7YisrKWlmKGFyZ3VtZW50c1tiXSlmb3IodmFyIGMgaW4gYXJndW1lbnRzW2JdKWFyZ3VtZW50c1tiXS5oYXNPd25Qcm9wZXJ0eShjKSYmKGFbY109YXJndW1lbnRzW2JdW2NdKTtyZXR1cm4gYX07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBXSU5ET1cgUkVTSVpFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudmFyIFNDUkVFTlNJWkUgPSAwLFxuICAgIFdJREVTQ1JFRU4gPSBmYWxzZTtcblxuZnVuY3Rpb24gd2luZG93UmVzaXplKCkge1xuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSAhPSBudWxsKSB7XG4gICAgICAgIFNDUkVFTlNJWkUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5LCAnOmFmdGVyJykuZ2V0UHJvcGVydHlWYWx1ZSgnY29udGVudCcpO1xuICAgICAgICBTQ1JFRU5TSVpFID0gcGFyc2VJbnQoU0NSRUVOU0laRS5yZXBsYWNlKC9bXCInXXsxfS9naSwgXCJcIikpO1xuICAgICAgICBpZiAoaXNOYU4oU0NSRUVOU0laRSkpIFNDUkVFTlNJWkUgPSAwO1xuICAgIH1cbn07XG5cbiIsIi8vIGFkZCBzZW1pY29uIGhlcmUgYXZvaWQgaWYgb3RoZXIgY29kZSBkb2VzbnQgZmluaXNoIHRoZSBzZW1pY29sb25zIG91dCBwcm9wZXJseVxuLy8gaXQgd2lsbCBzdGlsbCBydW4gZmluZVxuXG47KGZ1bmN0aW9uKGdsb2JhbCl7XG5cbiAgICB2YXIgQmxvY3N0YXJ0ID0gZnVuY3Rpb24obm9kZSwgc2V0dGluZ3MpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IGV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChub2RlKSB8fCBmYWxzZTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIEJsb2NzdGFydC5wcm90b3R5cGUuZGVmYXVsdFNldHRpbmdzID0ge31cblxuICAgIC8vIGZpbmQgY2hpbGRlcmVuXG5cbiAgICAvLyBjcmVhdGUgY2hpbGRlcmVuXG4gICAgLy8gdmFyIEJsb2NzdGFydCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAvLyAgICAgLy8gUmV0dXJuIGEgbmV3IG9iamVjdCB0aGVuIHVzZSBhIGZ1bmN0aW9uIGNvbnN0cnVjdG9yIHRvIGdlbmVyYXRlIHRoZSBwcm9wZXJ0eVxuICAgIC8vICAgICByZXR1cm4gbmV3IEJsb2NzdGFydC5pbml0KG5vZGUpOyAvLyB0aGlzIHdpbGwgcmV0dXJuIG5ldyBvYmplY3Qgd2l0aCBhbiBtZXRob2QgaW5pdFxuICAgIC8vIH1cblxuICAgIC8vIGdldCB3aWR0aFxuXG4gICAgLy8gZ2V0IGhlaWdodFxuXG4gICAgLy8gIFRoaXMgaXMgYW4gb2JqZWN0IExpdGVyYWxcbiAgICAvLyBwcm90b3R5cGUgaG9sZHMgbWV0aG9kICh0byBzYXZlIG1lbW9yeSBzcGFjZSkgdG8gVEhJUyBvYmplY3QgdGhhdCBpcyBiZWVuIGNyZWF0ZWRcbiAgICBCbG9jc3RhcnQucHJvdG90eXBlID0ge1xuXG4gICAgICAgIGdldE5vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigpO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbmV3Q2hpbGQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIHJldHVybiA9IHt9XG4gICAgfVxuXG4gICAgLy8gYWxsIG9mIHRob3NlIG9iamVjdHMgY3JlYXRlZCB0byBwb2ludCBhbGwgbWV0aG9kcyBvbiB0aGlzIHByb3RvdHlwZSBjaGFpblxuICAgIC8vIEJsb2NzdGFydC5pbml0LnByb3RvdHlwZSA9IEJsb2NzdGFydC5wcm90b3R5cGU7XG5cbiAgICBnbG9iYWwuQmxvY3N0YXJ0ID0gQmxvY3N0YXJ0O1xuXG59KHdpbmRvdykpO1xuXG4iLCJ2YXIgbW9kYWwgPSBuZXcgQmxvY3N0YXJ0KCcuanMtbW9kYWwnKTtcblxuXG4vLyB2YXIgbW9kYWwgPSBuZXcgTW9kYWw7XG4iXX0=
