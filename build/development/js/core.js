'use strict';

// add semicon here avoid if other code doesnt finish the semicolons out properly
// it will still run fine
;(function (global) {

	var Blocstart = function Blocstart(node) {
		// Return a new object then use a function constructor to generate the property
		return new Blocstart.init(node); // this will return new object with an method init
	};

	Blocstart.init = function (node) {
		this.node = node || '';

		this.getNode();
	};

	//  This is an object Literal
	// prototype holds method (to save memory space) to THIS object that is been created
	Blocstart.prototype = {

		getNode: function getNode() {
			// document.querySelector();
		},

		newChild: function newChild() {}

		// return = {}


		// all of those objects created to point all methods on this prototype chain
	};Blocstart.init.prototype = Blocstart.prototype;

	global.Blocstart = Blocstart;
})(window);
'use strict';

var modal = Blocstart('.js-modal');
"use strict";

// ========================================================
// POLYFILL
// ========================================================

// Polyfill classList for IE 7+
if ("document" in self) {
    if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
        (function (t) {
            "use strict";
            if (!("Element" in t)) return;var e = "classList",
                i = "prototype",
                n = t.Element[i],
                s = Object,
                r = String[i].trim || function () {
                return this.replace(/^\s+|\s+$/g, "");
            },
                a = Array[i].indexOf || function (t) {
                var e = 0,
                    i = this.length;for (; e < i; e++) {
                    if (e in this && this[e] === t) {
                        return e;
                    }
                }return -1;
            },
                o = function o(t, e) {
                this.name = t;this.code = DOMException[t];this.message = e;
            },
                l = function l(t, e) {
                if (e === "") {
                    throw new o("SYNTAX_ERR", "An invalid or illegal string was specified");
                }if (/\s/.test(e)) {
                    throw new o("INVALID_CHARACTER_ERR", "String contains an invalid character");
                }return a.call(t, e);
            },
                c = function c(t) {
                var e = r.call(t.getAttribute("class") || ""),
                    i = e ? e.split(/\s+/) : [],
                    n = 0,
                    s = i.length;for (; n < s; n++) {
                    this.push(i[n]);
                }this._updateClassName = function () {
                    t.setAttribute("class", this.toString());
                };
            },
                u = c[i] = [],
                f = function f() {
                return new c(this);
            };o[i] = Error[i];u.item = function (t) {
                return this[t] || null;
            };u.contains = function (t) {
                t += "";return l(this, t) !== -1;
            };u.add = function () {
                var t = arguments,
                    e = 0,
                    i = t.length,
                    n,
                    s = false;do {
                    n = t[e] + "";if (l(this, n) === -1) {
                        this.push(n);s = true;
                    }
                } while (++e < i);if (s) {
                    this._updateClassName();
                }
            };u.remove = function () {
                var t = arguments,
                    e = 0,
                    i = t.length,
                    n,
                    s = false,
                    r;do {
                    n = t[e] + "";r = l(this, n);while (r !== -1) {
                        this.splice(r, 1);s = true;r = l(this, n);
                    }
                } while (++e < i);if (s) {
                    this._updateClassName();
                }
            };u.toggle = function (t, e) {
                t += "";var i = this.contains(t),
                    n = i ? e !== true && "remove" : e !== false && "add";if (n) {
                    this[n](t);
                }if (e === true || e === false) {
                    return e;
                } else {
                    return !i;
                }
            };u.toString = function () {
                return this.join(" ");
            };if (s.defineProperty) {
                var h = { get: f, enumerable: true, configurable: true };try {
                    s.defineProperty(n, e, h);
                } catch (d) {
                    if (d.number === -2146823252) {
                        h.enumerable = false;s.defineProperty(n, e, h);
                    }
                }
            } else if (s[i].__defineGetter__) {
                n.__defineGetter__(e, f);
            }
        })(self);
    } else {
        (function () {
            "use strict";
            var t = document.createElement("_");t.classList.add("c1", "c2");if (!t.classList.contains("c2")) {
                var e = function e(t) {
                    var e = DOMTokenList.prototype[t];DOMTokenList.prototype[t] = function (t) {
                        var i,
                            n = arguments.length;for (i = 0; i < n; i++) {
                            t = arguments[i];e.call(this, t);
                        }
                    };
                };e("add");e("remove");
            }t.classList.toggle("c3", false);if (t.classList.contains("c3")) {
                var i = DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle = function (t, e) {
                    if (1 in arguments && !this.contains(t) === !e) {
                        return e;
                    } else {
                        return i.call(this, t);
                    }
                };
            }t = null;
        })();
    }
}

// Remove class on init if js is enabled
document.documentElement.classList.remove('no-js');

// ========================================================
// SOCIAL-POP
// ========================================================
for (var SOCIALPOPS = document.querySelectorAll(".js-social-pop"), i = 0, l = SOCIALPOPS.length; i < l; i++) {
    SOCIALPOPS[i].addEventListener("click", function (a) {
        a.preventDefault();window.open(a.currentTarget.href, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=500");
    }, false);
} // ========================================================
// EXTEND
// ========================================================
var extend = function extend(a) {
    a = a || {};for (var b = 1; b < arguments.length; b++) {
        if (arguments[b]) for (var c in arguments[b]) {
            arguments[b].hasOwnProperty(c) && (a[c] = arguments[b][c]);
        }
    }return a;
};

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

console.log('Polyfill');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2NzdGFydC5qcyIsImNvcmUuanMiLCJwb2x5ZmlsbC5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJCbG9jc3RhcnQiLCJub2RlIiwiaW5pdCIsImdldE5vZGUiLCJwcm90b3R5cGUiLCJuZXdDaGlsZCIsIndpbmRvdyIsIm1vZGFsIiwic2VsZiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZUVsZW1lbnROUyIsInQiLCJlIiwiaSIsIm4iLCJFbGVtZW50IiwicyIsIk9iamVjdCIsInIiLCJTdHJpbmciLCJ0cmltIiwicmVwbGFjZSIsImEiLCJBcnJheSIsImluZGV4T2YiLCJsZW5ndGgiLCJvIiwibmFtZSIsImNvZGUiLCJET01FeGNlcHRpb24iLCJtZXNzYWdlIiwibCIsInRlc3QiLCJjYWxsIiwiYyIsImdldEF0dHJpYnV0ZSIsInNwbGl0IiwicHVzaCIsIl91cGRhdGVDbGFzc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJ0b1N0cmluZyIsInUiLCJmIiwiRXJyb3IiLCJpdGVtIiwiY29udGFpbnMiLCJhZGQiLCJhcmd1bWVudHMiLCJyZW1vdmUiLCJzcGxpY2UiLCJ0b2dnbGUiLCJqb2luIiwiZGVmaW5lUHJvcGVydHkiLCJoIiwiZ2V0IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImQiLCJudW1iZXIiLCJfX2RlZmluZUdldHRlcl9fIiwiY2xhc3NMaXN0IiwiRE9NVG9rZW5MaXN0IiwiZG9jdW1lbnRFbGVtZW50IiwiU09DSUFMUE9QUyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwicHJldmVudERlZmF1bHQiLCJvcGVuIiwiY3VycmVudFRhcmdldCIsImhyZWYiLCJleHRlbmQiLCJiIiwiaGFzT3duUHJvcGVydHkiLCJTQ1JFRU5TSVpFIiwiV0lERVNDUkVFTiIsIndpbmRvd1Jlc2l6ZSIsImdldENvbXB1dGVkU3R5bGUiLCJib2R5IiwiZ2V0UHJvcGVydHlWYWx1ZSIsInBhcnNlSW50IiwiaXNOYU4i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dUUsZ0JBQVAsSUFBMkIsSUFBL0IsRUFBcUM7QUFDakNILHFCQUFhcEUsT0FBT3VFLGdCQUFQLENBQXdCcEUsU0FBU3FFLElBQWpDLEVBQXVDLFFBQXZDLEVBQWlEQyxnQkFBakQsQ0FBa0UsU0FBbEUsQ0FBYjtBQUNBTCxxQkFBYU0sU0FBU04sV0FBV3BELE9BQVgsQ0FBbUIsV0FBbkIsRUFBZ0MsRUFBaEMsQ0FBVCxDQUFiO0FBQ0EsWUFBSTJELE1BQU1QLFVBQU4sQ0FBSixFQUF1QkEsYUFBYSxDQUFiO0FBQzFCO0FBQ0o7O0FBR0RRLFFBQVFDLEdBQVIsQ0FBWSxVQUFaIiwiZmlsZSI6ImNvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhZGQgc2VtaWNvbiBoZXJlIGF2b2lkIGlmIG90aGVyIGNvZGUgZG9lc250IGZpbmlzaCB0aGUgc2VtaWNvbG9ucyBvdXQgcHJvcGVybHlcbi8vIGl0IHdpbGwgc3RpbGwgcnVuIGZpbmVcbjsoZnVuY3Rpb24oZ2xvYmFsKXtcblxuXHR2YXIgQmxvY3N0YXJ0ID0gZnVuY3Rpb24obm9kZSkge1xuXHRcdC8vIFJldHVybiBhIG5ldyBvYmplY3QgdGhlbiB1c2UgYSBmdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBnZW5lcmF0ZSB0aGUgcHJvcGVydHlcblx0XHRyZXR1cm4gbmV3IEJsb2NzdGFydC5pbml0KG5vZGUpOyAvLyB0aGlzIHdpbGwgcmV0dXJuIG5ldyBvYmplY3Qgd2l0aCBhbiBtZXRob2QgaW5pdFxuXHR9XG5cblx0QmxvY3N0YXJ0LmluaXQgPSBmdW5jdGlvbihub2RlKSB7XG5cdFx0dGhpcy5ub2RlID0gbm9kZSB8fCAnJztcblxuXHRcdHRoaXMuZ2V0Tm9kZSgpO1xuXHR9XG5cblxuXHQvLyAgVGhpcyBpcyBhbiBvYmplY3QgTGl0ZXJhbFxuXHQvLyBwcm90b3R5cGUgaG9sZHMgbWV0aG9kICh0byBzYXZlIG1lbW9yeSBzcGFjZSkgdG8gVEhJUyBvYmplY3QgdGhhdCBpcyBiZWVuIGNyZWF0ZWRcblx0QmxvY3N0YXJ0LnByb3RvdHlwZSA9IHtcblxuXHRcdGdldE5vZGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigpO1xuXHRcdH0sXG5cblx0XHRuZXdDaGlsZDogZnVuY3Rpb24oKSB7XG5cblx0XHR9XG5cblxuXHRcdC8vIHJldHVybiA9IHt9XG5cdH1cblxuXHQvLyBhbGwgb2YgdGhvc2Ugb2JqZWN0cyBjcmVhdGVkIHRvIHBvaW50IGFsbCBtZXRob2RzIG9uIHRoaXMgcHJvdG90eXBlIGNoYWluXG5cdEJsb2NzdGFydC5pbml0LnByb3RvdHlwZSA9IEJsb2NzdGFydC5wcm90b3R5cGU7XG5cblxuXHRnbG9iYWwuQmxvY3N0YXJ0ID0gQmxvY3N0YXJ0O1xuXG5cbn0od2luZG93KSk7XG4iLCJ2YXIgbW9kYWwgPSBCbG9jc3RhcnQoJy5qcy1tb2RhbCcpO1xuXG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gUE9MWUZJTExcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vIFBvbHlmaWxsIGNsYXNzTGlzdCBmb3IgSUUgNytcbmlmKFwiZG9jdW1lbnRcImluIHNlbGYpe2lmKCEoXCJjbGFzc0xpc3RcImluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpKXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TJiYhKFwiY2xhc3NMaXN0XCJpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwiZ1wiKSkpeyhmdW5jdGlvbih0KXtcInVzZSBzdHJpY3RcIjtpZighKFwiRWxlbWVudFwiaW4gdCkpcmV0dXJuO3ZhciBlPVwiY2xhc3NMaXN0XCIsaT1cInByb3RvdHlwZVwiLG49dC5FbGVtZW50W2ldLHM9T2JqZWN0LHI9U3RyaW5nW2ldLnRyaW18fGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZyxcIlwiKX0sYT1BcnJheVtpXS5pbmRleE9mfHxmdW5jdGlvbih0KXt2YXIgZT0wLGk9dGhpcy5sZW5ndGg7Zm9yKDtlPGk7ZSsrKXtpZihlIGluIHRoaXMmJnRoaXNbZV09PT10KXtyZXR1cm4gZX19cmV0dXJuLTF9LG89ZnVuY3Rpb24odCxlKXt0aGlzLm5hbWU9dDt0aGlzLmNvZGU9RE9NRXhjZXB0aW9uW3RdO3RoaXMubWVzc2FnZT1lfSxsPWZ1bmN0aW9uKHQsZSl7aWYoZT09PVwiXCIpe3Rocm93IG5ldyBvKFwiU1lOVEFYX0VSUlwiLFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkXCIpfWlmKC9cXHMvLnRlc3QoZSkpe3Rocm93IG5ldyBvKFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCIsXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIil9cmV0dXJuIGEuY2FsbCh0LGUpfSxjPWZ1bmN0aW9uKHQpe3ZhciBlPXIuY2FsbCh0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKSxpPWU/ZS5zcGxpdCgvXFxzKy8pOltdLG49MCxzPWkubGVuZ3RoO2Zvcig7bjxzO24rKyl7dGhpcy5wdXNoKGlbbl0pfXRoaXMuX3VwZGF0ZUNsYXNzTmFtZT1mdW5jdGlvbigpe3Quc2V0QXR0cmlidXRlKFwiY2xhc3NcIix0aGlzLnRvU3RyaW5nKCkpfX0sdT1jW2ldPVtdLGY9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGModGhpcyl9O29baV09RXJyb3JbaV07dS5pdGVtPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzW3RdfHxudWxsfTt1LmNvbnRhaW5zPWZ1bmN0aW9uKHQpe3QrPVwiXCI7cmV0dXJuIGwodGhpcyx0KSE9PS0xfTt1LmFkZD1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPTAsaT10Lmxlbmd0aCxuLHM9ZmFsc2U7ZG97bj10W2VdK1wiXCI7aWYobCh0aGlzLG4pPT09LTEpe3RoaXMucHVzaChuKTtzPXRydWV9fXdoaWxlKCsrZTxpKTtpZihzKXt0aGlzLl91cGRhdGVDbGFzc05hbWUoKX19O3UucmVtb3ZlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9MCxpPXQubGVuZ3RoLG4scz1mYWxzZSxyO2Rve249dFtlXStcIlwiO3I9bCh0aGlzLG4pO3doaWxlKHIhPT0tMSl7dGhpcy5zcGxpY2UociwxKTtzPXRydWU7cj1sKHRoaXMsbil9fXdoaWxlKCsrZTxpKTtpZihzKXt0aGlzLl91cGRhdGVDbGFzc05hbWUoKX19O3UudG9nZ2xlPWZ1bmN0aW9uKHQsZSl7dCs9XCJcIjt2YXIgaT10aGlzLmNvbnRhaW5zKHQpLG49aT9lIT09dHJ1ZSYmXCJyZW1vdmVcIjplIT09ZmFsc2UmJlwiYWRkXCI7aWYobil7dGhpc1tuXSh0KX1pZihlPT09dHJ1ZXx8ZT09PWZhbHNlKXtyZXR1cm4gZX1lbHNle3JldHVybiFpfX07dS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmpvaW4oXCIgXCIpfTtpZihzLmRlZmluZVByb3BlcnR5KXt2YXIgaD17Z2V0OmYsZW51bWVyYWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlfTt0cnl7cy5kZWZpbmVQcm9wZXJ0eShuLGUsaCl9Y2F0Y2goZCl7aWYoZC5udW1iZXI9PT0tMjE0NjgyMzI1Mil7aC5lbnVtZXJhYmxlPWZhbHNlO3MuZGVmaW5lUHJvcGVydHkobixlLGgpfX19ZWxzZSBpZihzW2ldLl9fZGVmaW5lR2V0dGVyX18pe24uX19kZWZpbmVHZXR0ZXJfXyhlLGYpfX0pKHNlbGYpfWVsc2V7KGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIl9cIik7dC5jbGFzc0xpc3QuYWRkKFwiYzFcIixcImMyXCIpO2lmKCF0LmNsYXNzTGlzdC5jb250YWlucyhcImMyXCIpKXt2YXIgZT1mdW5jdGlvbih0KXt2YXIgZT1ET01Ub2tlbkxpc3QucHJvdG90eXBlW3RdO0RPTVRva2VuTGlzdC5wcm90b3R5cGVbdF09ZnVuY3Rpb24odCl7dmFyIGksbj1hcmd1bWVudHMubGVuZ3RoO2ZvcihpPTA7aTxuO2krKyl7dD1hcmd1bWVudHNbaV07ZS5jYWxsKHRoaXMsdCl9fX07ZShcImFkZFwiKTtlKFwicmVtb3ZlXCIpfXQuY2xhc3NMaXN0LnRvZ2dsZShcImMzXCIsZmFsc2UpO2lmKHQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzNcIikpe3ZhciBpPURPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO0RPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKHQsZSl7aWYoMSBpbiBhcmd1bWVudHMmJiF0aGlzLmNvbnRhaW5zKHQpPT09IWUpe3JldHVybiBlfWVsc2V7cmV0dXJuIGkuY2FsbCh0aGlzLHQpfX19dD1udWxsfSkoKX19XG5cbi8vIFJlbW92ZSBjbGFzcyBvbiBpbml0IGlmIGpzIGlzIGVuYWJsZWRcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCduby1qcycpO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU09DSUFMLVBPUFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZvcih2YXIgU09DSUFMUE9QUz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXNvY2lhbC1wb3BcIiksaT0wLGw9U09DSUFMUE9QUy5sZW5ndGg7aTxsO2krKylTT0NJQUxQT1BTW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGEpe2EucHJldmVudERlZmF1bHQoKTt3aW5kb3cub3BlbihhLmN1cnJlbnRUYXJnZXQuaHJlZixcIlwiLFwibWVudWJhcj1ubyx0b29sYmFyPW5vLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMsaGVpZ2h0PTUwMCx3aWR0aD01MDBcIil9LGZhbHNlKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEVYVEVORFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnZhciBleHRlbmQ9ZnVuY3Rpb24oYSl7YT1hfHx7fTtmb3IodmFyIGI9MTtiPGFyZ3VtZW50cy5sZW5ndGg7YisrKWlmKGFyZ3VtZW50c1tiXSlmb3IodmFyIGMgaW4gYXJndW1lbnRzW2JdKWFyZ3VtZW50c1tiXS5oYXNPd25Qcm9wZXJ0eShjKSYmKGFbY109YXJndW1lbnRzW2JdW2NdKTtyZXR1cm4gYX07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBXSU5ET1cgUkVTSVpFXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudmFyIFNDUkVFTlNJWkUgPSAwLFxuICAgIFdJREVTQ1JFRU4gPSBmYWxzZTtcblxuZnVuY3Rpb24gd2luZG93UmVzaXplKCkge1xuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSAhPSBudWxsKSB7XG4gICAgICAgIFNDUkVFTlNJWkUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5LCAnOmFmdGVyJykuZ2V0UHJvcGVydHlWYWx1ZSgnY29udGVudCcpO1xuICAgICAgICBTQ1JFRU5TSVpFID0gcGFyc2VJbnQoU0NSRUVOU0laRS5yZXBsYWNlKC9bXCInXXsxfS9naSwgXCJcIikpO1xuICAgICAgICBpZiAoaXNOYU4oU0NSRUVOU0laRSkpIFNDUkVFTlNJWkUgPSAwO1xuICAgIH1cbn07XG5cblxuY29uc29sZS5sb2coJ1BvbHlmaWxsJyk7XG4iXX0=
