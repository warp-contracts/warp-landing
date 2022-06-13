"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};

var resize = function resize(fn) {
  return window.addEventListener('resize', fn);
};

var isIterableArray = function isIterableArray(array) {
  return Array.isArray(array) && !!array.length;
};

var camelize = function camelize(str) {
  var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};

var getData = function getData(el, data) {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};
/* ----------------------------- Colors function ---------------------------- */


var hexToRgb = function hexToRgb(hexValue) {
  var hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

var rgbaColor = function rgbaColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
/* --------------------------------- Colors --------------------------------- */


var colors = {
  primary: '#2c7be5',
  secondary: '#748194',
  success: '#00d27a',
  info: '#27bcfd',
  warning: '#f5803e',
  danger: '#e63757',
  light: '#f9fafd',
  dark: '#000'
};
var grays = {
  white: '#fff',
  100: '#f9fafd',
  200: '#edf2f9',
  300: '#d8e2ef',
  400: '#b6c1d2',
  500: '#9da9bb',
  600: '#748194',
  700: '#5e6e82',
  800: '#4d5969',
  900: '#344050',
  1000: '#232e3c',
  1100: '#0b1727',
  black: '#000'
};

var hasClass = function hasClass(el, className) {
  !el && false;
  return el.classList.value.includes(className);
};

var addClass = function addClass(el, className) {
  el.classList.add(className);
};

var getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

var isScrolledIntoView = function isScrolledIntoView(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return {
    all: top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth,
    partial: top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset
  };
};

var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};

var getBreakpoint = function getBreakpoint(el) {
  var classes = el && el.classList.value;
  var breakpoint;

  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
      return cls.includes('navbar-expand-');
    }).pop().split('-').pop()];
  }

  return breakpoint;
};
/* --------------------------------- Cookie --------------------------------- */


var setCookie = function setCookie(name, value, expire) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};

var getCookie = function getCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
  return keyValue ? keyValue[2] : keyValue;
};

var settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
};
/* -------------------------- Chart Initialization -------------------------- */

var newChart = function newChart(chart, config) {
  var ctx = chart.getContext('2d');
  return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


var getItemFromStore = function getItemFromStore(key, defaultValue) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (_unused) {
    return store.getItem(key) || defaultValue;
  }
};

var setItemToStore = function setItemToStore(key, payload) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  return store.setItem(key, payload);
};

var getStoreSpace = function getStoreSpace() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
  return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
}; // function setCookie(cname, cvalue) {
//   document.cookie = cname + '=' + cvalue + ';';
// }
// function getCookie(cname) {
//   var name = cname + '=';
//   var ca = document.cookie.split(';');
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i].trim();
//     if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
//   }
//   return '';
// }


function waitForElm(selector) {
  /* eslint-disable */
  return new Promise(function (resolve) {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    var observer = new MutationObserver(function () {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

var utils = {
  waitForElm: waitForElm,
  getCookie: getCookie,
  setCookie: setCookie,
  docReady: docReady,
  resize: resize,
  isIterableArray: isIterableArray,
  camelize: camelize,
  getData: getData,
  hasClass: hasClass,
  addClass: addClass,
  hexToRgb: hexToRgb,
  rgbaColor: rgbaColor,
  colors: colors,
  grays: grays,
  getOffset: getOffset,
  isScrolledIntoView: isScrolledIntoView,
  getBreakpoint: getBreakpoint,
  newChart: newChart,
  settings: settings,
  getItemFromStore: getItemFromStore,
  setItemToStore: setItemToStore,
  getStoreSpace: getStoreSpace
};
/* -------------------------------------------------------------------------- */

/*                                  Detector                                  */

/* -------------------------------------------------------------------------- */

var detectorInit = function detectorInit() {
  var _window = window,
      is = _window.is;
  var html = document.querySelector('html');
  is.opera() && addClass(html, 'opera');
  is.mobile() && addClass(html, 'mobile');
  is.firefox() && addClass(html, 'firefox');
  is.safari() && addClass(html, 'safari');
  is.ios() && addClass(html, 'ios');
  is.iphone() && addClass(html, 'iphone');
  is.ipad() && addClass(html, 'ipad');
  is.ie() && addClass(html, 'ie');
  is.edge() && addClass(html, 'edge');
  is.chrome() && addClass(html, 'chrome');
  is.mac() && addClass(html, 'osx');
  is.windows() && addClass(html, 'windows');
  navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
};

function animateDataPoints(displayInterval, pointsPerDisplayInterval) {
  var referenceDataPoints = 269400336;
  var referenceTimestamp = 1630398567000;
  var fromReferenceToNow = Date.now() - referenceTimestamp;
  var pointsOnPageOpen = referenceDataPoints + fromReferenceToNow * (pointsPerDisplayInterval / displayInterval);

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function animateValue(htmlElement, startPoint, interval, pointsPerInterval) {
    var startTimestamp = null;
    var previousPoint = startPoint;
    var previousTimestamp = 0;

    var step = function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;

      if (timestamp - previousTimestamp > interval) {
        var progress = (timestamp - previousTimestamp) / interval * pointsPerInterval;
        var currentPoint = Math.floor(previousPoint + progress);
        htmlElement.innerHTML = numberWithSpaces(currentPoint);
        previousTimestamp = timestamp;
        previousPoint = currentPoint;
      }

      window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }

  var obj = document.getElementById('data-points-number');
  animateValue(obj, pointsOnPageOpen, displayInterval, pointsPerDisplayInterval);
}
/*-----------------------------------------------
|   Top navigation opacity on scroll
-----------------------------------------------*/


var navbarInit = function navbarInit() {
  var Selector = {
    NAVBAR: '[data-navbar-on-scroll]',
    NAVBAR_COLLAPSE: '.navbar-collapse',
    NAVBAR_TOGGLER: '.navbar-toggler'
  };
  var ClassNames = {
    COLLAPSED: 'collapsed'
  };
  var Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDE_BS_COLLAPSE: 'hide.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  var DataKey = {
    NAVBAR_ON_SCROLL: 'navbar-light-on-scroll'
  };
  var navbar = document.querySelector(Selector.NAVBAR); // responsive nav collapsed

  navbar.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav-link') && window.innerWidth < utils.getBreakpoint(navbar)) {
      navbar.querySelector(Selector.NAVBAR_TOGGLER).click();
    }
  });
  document.addEventListener('click', function (e) {
    if (navbar !== e.target && !navbar.contains(e.target)) {
      if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        navbar.querySelector(Selector.NAVBAR_TOGGLER).click();
      }
    }
  });

  if (navbar) {
    var windowHeight = window.innerHeight;
    var html = document.documentElement;
    var navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);

    var allColors = _objectSpread(_objectSpread({}, utils.colors), utils.grays);

    var name = utils.getData(navbar, DataKey.NAVBAR_ON_SCROLL);
    var colorName = Object.keys(allColors).includes(name) ? name : 'white';
    var color = allColors[colorName];
    var bgClassName = "bg-".concat(colorName);
    var shadowName = 'shadow-transition';
    var colorRgb = utils.hexToRgb(color);

    var _window$getComputedSt = window.getComputedStyle(navbar),
        backgroundImage = _window$getComputedSt.backgroundImage;

    var transition = 'background-color 0.35s ease';
    navbar.style.backgroundImage = 'none'; // Change navbar background color on scroll

    window.addEventListener(Events.SCROLL, function () {
      var scrollTop = html.scrollTop;
      var alpha = scrollTop / windowHeight * 0.15; // Add class on scroll

      navbar.classList.add('backdrop');

      if (alpha === 0) {
        navbar.classList.remove('backdrop');
      }

      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = "rgba(".concat(colorRgb[0], ", ").concat(colorRgb[1], ", ").concat(colorRgb[2], ", ").concat(alpha, ")");
      navbar.style.backgroundImage = alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? backgroundImage : 'none';
      alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? navbar.classList.add(shadowName) : navbar.classList.remove(shadowName);
    }); // Toggle bg class on window resize

    utils.resize(function () {
      var breakPoint = utils.getBreakpoint(navbar);

      if (window.innerWidth > breakPoint) {
        navbar.style.backgroundImage = html.scrollTop ? backgroundImage : 'none';
        navbar.style.transition = 'none';
      } else if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        navbar.classList.add(bgClassName);
        navbar.classList.add(shadowName);
        navbar.style.backgroundImage = backgroundImage;
      }

      if (window.innerWidth <= breakPoint) {
        navbar.style.transition = utils.hasClass(navbarCollapse, 'show') ? transition : 'none';
      }
    });
    navbarCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, function () {
      navbar.classList.add(bgClassName);
      navbar.classList.add(shadowName);
      navbar.style.backgroundImage = backgroundImage;
      navbar.style.transition = transition;
    });
    navbarCollapse.addEventListener(Events.HIDE_BS_COLLAPSE, function () {
      navbar.classList.remove(bgClassName);
      navbar.classList.remove(shadowName);
      !html.scrollTop && (navbar.style.backgroundImage = 'none');
    });
    navbarCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, function () {
      navbar.style.transition = 'none';
    });
  }
};

var _window2 = window,
    is = _window2.is;

function isDeviceMobile() {
  return is.mobile() || is.iphone() || is.androidPhone() || is.windowsPhone() || is.blackberry();
}
/* eslint-disable */

/* PrismJS 1.28.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=clike+javascript */


var _self = 'undefined' != typeof window ? window : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function (e) {
  var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
      t = 0,
      r = {},
      a = {
    manual: e.Prism && e.Prism.manual,
    disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
    util: {
      encode: function e(n) {
        return n instanceof i ? new i(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
      },
      type: function type(e) {
        return Object.prototype.toString.call(e).slice(8, -1);
      },
      objId: function objId(e) {
        return e.__id || Object.defineProperty(e, '__id', {
          value: ++t
        }), e.__id;
      },
      clone: function e(n, t) {
        var r, i;

        switch (t = t || {}, a.util.type(n)) {
          case 'Object':
            if (i = a.util.objId(n), t[i]) return t[i];

            for (var l in r = {}, t[i] = r, n) {
              n.hasOwnProperty(l) && (r[l] = e(n[l], t));
            }

            return r;

          case 'Array':
            return i = a.util.objId(n), t[i] ? t[i] : (r = [], t[i] = r, n.forEach(function (n, a) {
              r[a] = e(n, t);
            }), r);

          default:
            return n;
        }
      },
      getLanguage: function getLanguage(e) {
        for (; e;) {
          var t = n.exec(e.className);
          if (t) return t[1].toLowerCase();
          e = e.parentElement;
        }

        return 'none';
      },
      setLanguage: function setLanguage(e, t) {
        e.className = e.className.replace(RegExp(n, 'gi'), ''), e.classList.add('language-' + t);
      },
      currentScript: function currentScript() {
        if ('undefined' == typeof document) return null;
        if ('currentScript' in document) return document.currentScript;

        try {
          throw new Error();
        } catch (r) {
          var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1];

          if (e) {
            var n = document.getElementsByTagName('script');

            for (var t in n) {
              if (n[t].src == e) return n[t];
            }
          }

          return null;
        }
      },
      isActive: function isActive(e, n, t) {
        for (var r = 'no-' + n; e;) {
          var a = e.classList;
          if (a.contains(n)) return !0;
          if (a.contains(r)) return !1;
          e = e.parentElement;
        }

        return !!t;
      }
    },
    languages: {
      plain: r,
      plaintext: r,
      text: r,
      txt: r,
      extend: function extend(e, n) {
        var t = a.util.clone(a.languages[e]);

        for (var r in n) {
          t[r] = n[r];
        }

        return t;
      },
      insertBefore: function insertBefore(e, n, t, r) {
        var i = (r = r || a.languages)[e],
            l = {};

        for (var o in i) {
          if (i.hasOwnProperty(o)) {
            if (o == n) for (var s in t) {
              t.hasOwnProperty(s) && (l[s] = t[s]);
            }
            t.hasOwnProperty(o) || (l[o] = i[o]);
          }
        }

        var u = r[e];
        return r[e] = l, a.languages.DFS(a.languages, function (n, t) {
          t === u && n != e && (this[n] = l);
        }), l;
      },
      DFS: function e(n, t, r, i) {
        i = i || {};
        var l = a.util.objId;

        for (var o in n) {
          if (n.hasOwnProperty(o)) {
            t.call(n, o, n[o], r || o);
            var s = n[o],
                u = a.util.type(s);
            'Object' !== u || i[l(s)] ? 'Array' !== u || i[l(s)] || (i[l(s)] = !0, e(s, t, o, i)) : (i[l(s)] = !0, e(s, t, null, i));
          }
        }
      }
    },
    plugins: {},
    highlightAll: function highlightAll(e, n) {
      a.highlightAllUnder(document, e, n);
    },
    highlightAllUnder: function highlightAllUnder(e, n, t) {
      var r = {
        callback: t,
        container: e,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };
      a.hooks.run('before-highlightall', r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), a.hooks.run('before-all-elements-highlight', r);

      for (var i, l = 0; i = r.elements[l++];) {
        a.highlightElement(i, !0 === n, r.callback);
      }
    },
    highlightElement: function highlightElement(n, t, r) {
      var i = a.util.getLanguage(n),
          l = a.languages[i];
      a.util.setLanguage(n, i);
      var o = n.parentElement;
      o && 'pre' === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
      var s = {
        element: n,
        language: i,
        grammar: l,
        code: n.textContent
      };

      function u(e) {
        s.highlightedCode = e, a.hooks.run('before-insert', s), s.element.innerHTML = s.highlightedCode, a.hooks.run('after-highlight', s), a.hooks.run('complete', s), r && r.call(s.element);
      }

      if (a.hooks.run('before-sanity-check', s), (o = s.element.parentElement) && 'pre' === o.nodeName.toLowerCase() && !o.hasAttribute('tabindex') && o.setAttribute('tabindex', '0'), !s.code) return a.hooks.run('complete', s), void (r && r.call(s.element));
      if (a.hooks.run('before-highlight', s), s.grammar) {
        if (t && e.Worker) {
          var c = new Worker(a.filename);
          c.onmessage = function (e) {
            u(e.data);
          }, c.postMessage(JSON.stringify({
            language: s.language,
            code: s.code,
            immediateClose: !0
          }));
        } else u(a.highlight(s.code, s.grammar, s.language));
      } else u(a.util.encode(s.code));
    },
    highlight: function highlight(e, n, t) {
      var r = {
        code: e,
        grammar: n,
        language: t
      };
      if (a.hooks.run('before-tokenize', r), !r.grammar) throw new Error('The language "' + r.language + '" has no grammar.');
      return r.tokens = a.tokenize(r.code, r.grammar), a.hooks.run('after-tokenize', r), i.stringify(a.util.encode(r.tokens), r.language);
    },
    tokenize: function tokenize(e, n) {
      var t = n.rest;

      if (t) {
        for (var r in t) {
          n[r] = t[r];
        }

        delete n.rest;
      }

      var a = new s();
      return u(a, a.head, e), o(e, a, n, a.head, 0), function (e) {
        for (var n = [], t = e.head.next; t !== e.tail;) {
          n.push(t.value), t = t.next;
        }

        return n;
      }(a);
    },
    hooks: {
      all: {},
      add: function add(e, n) {
        var t = a.hooks.all;
        t[e] = t[e] || [], t[e].push(n);
      },
      run: function run(e, n) {
        var t = a.hooks.all[e];
        if (t && t.length) for (var r, i = 0; r = t[i++];) {
          r(n);
        }
      }
    },
    Token: i
  };

  function i(e, n, t, r) {
    this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || '').length;
  }

  function l(e, n, t, r) {
    e.lastIndex = n;
    var a = e.exec(t);

    if (a && r && a[1]) {
      var i = a[1].length;
      a.index += i, a[0] = a[0].slice(i);
    }

    return a;
  }

  function o(e, n, t, r, s, g) {
    for (var f in t) {
      if (t.hasOwnProperty(f) && t[f]) {
        var h = t[f];
        h = Array.isArray(h) ? h : [h];

        for (var d = 0; d < h.length; ++d) {
          if (g && g.cause == f + ',' + d) return;
          var v = h[d],
              p = v.inside,
              m = !!v.lookbehind,
              y = !!v.greedy,
              k = v.alias;

          if (y && !v.pattern.global) {
            var x = v.pattern.toString().match(/[imsuy]*$/)[0];
            v.pattern = RegExp(v.pattern.source, x + 'g');
          }

          for (var b = v.pattern || v, w = r.next, A = s; w !== n.tail && !(g && A >= g.reach); A += w.value.length, w = w.next) {
            var E = w.value;
            if (n.length > e.length) return;

            if (!(E instanceof i)) {
              var P,
                  L = 1;

              if (y) {
                if (!(P = l(b, A, e, m)) || P.index >= e.length) break;
                var S = P.index,
                    O = P.index + P[0].length,
                    j = A;

                for (j += w.value.length; S >= j;) {
                  j += (w = w.next).value.length;
                }

                if (A = j -= w.value.length, w.value instanceof i) continue;

                for (var C = w; C !== n.tail && (j < O || 'string' == typeof C.value); C = C.next) {
                  L++, j += C.value.length;
                }

                L--, E = e.slice(A, j), P.index -= A;
              } else if (!(P = l(b, 0, E, m))) continue;

              S = P.index;

              var N = P[0],
                  _ = E.slice(0, S),
                  M = E.slice(S + N.length),
                  W = A + E.length;

              g && W > g.reach && (g.reach = W);
              var z = w.prev;

              if (_ && (z = u(n, z, _), A += _.length), c(n, z, L), w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N)), M && u(n, w, M), L > 1) {
                var I = {
                  cause: f + ',' + d,
                  reach: W
                };
                o(e, n, t, w.prev, A, I), g && I.reach > g.reach && (g.reach = I.reach);
              }
            }
          }
        }
      }
    }
  }

  function s() {
    var e = {
      value: null,
      prev: null,
      next: null
    },
        n = {
      value: null,
      prev: e,
      next: null
    };
    e.next = n, this.head = e, this.tail = n, this.length = 0;
  }

  function u(e, n, t) {
    var r = n.next,
        a = {
      value: t,
      prev: n,
      next: r
    };
    return n.next = a, r.prev = a, e.length++, a;
  }

  function c(e, n, t) {
    for (var r = n.next, a = 0; a < t && r !== e.tail; a++) {
      r = r.next;
    }

    n.next = r, r.prev = n, e.length -= a;
  }

  if (e.Prism = a, i.stringify = function e(n, t) {
    if ('string' == typeof n) return n;

    if (Array.isArray(n)) {
      var r = '';
      return n.forEach(function (n) {
        r += e(n, t);
      }), r;
    }

    var i = {
      type: n.type,
      content: e(n.content, t),
      tag: 'span',
      classes: ['token', n.type],
      attributes: {},
      language: t
    },
        l = n.alias;
    l && (Array.isArray(l) ? Array.prototype.push.apply(i.classes, l) : i.classes.push(l)), a.hooks.run('wrap', i);
    var o = '';

    for (var s in i.attributes) {
      o += ' ' + s + '="' + (i.attributes[s] || '').replace(/"/g, '&quot;') + '"';
    }

    return '<' + i.tag + ' class="' + i.classes.join(' ') + '"' + o + '>' + i.content + '</' + i.tag + '>';
  }, !e.document) return e.addEventListener ? (a.disableWorkerMessageHandler || e.addEventListener('message', function (n) {
    var t = JSON.parse(n.data),
        r = t.language,
        i = t.code,
        l = t.immediateClose;
    e.postMessage(a.highlight(i, a.languages[r], r)), l && e.close();
  }, !1), a) : a;
  var g = a.util.currentScript();

  function f() {
    a.manual || a.highlightAll();
  }

  if (g && (a.filename = g.src, g.hasAttribute('data-manual') && (a.manual = !0)), !a.manual) {
    var h = document.readyState;
    'loading' === h || 'interactive' === h && g && g.defer ? document.addEventListener('DOMContentLoaded', f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16);
  }

  return a;
}(_self);

'undefined' != typeof module && module.exports && (module.exports = Prism), 'undefined' != typeof global && (global.Prism = Prism);
Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0,
    greedy: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0,
    greedy: !0
  }],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  'class-name': {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /[.\\]/
    }
  },
  keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  "boolean": /\b(?:false|true)\b/,
  "function": /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [Prism.languages.clike['class-name'], {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
    lookbehind: !0
  }],
  keyword: [{
    pattern: /((?:^|\})\s*)catch\b/,
    lookbehind: !0
  }, {
    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: !0
  }],
  "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp('(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])'),
    lookbehind: !0
  },
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore('javascript', 'keyword', {
  regex: {
    pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"),
    lookbehind: !0,
    greedy: !0,
    inside: {
      'regex-source': {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: !0,
        alias: 'language-regex',
        inside: Prism.languages.regex
      },
      'regex-delimiter': /^\/|\/$/,
      'regex-flags': /^[a-z]+$/
    }
  },
  'function-variable': {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: 'function'
  },
  parameter: [{
    pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore('javascript', 'string', {
  hashbang: {
    pattern: /^#!.*/,
    greedy: !0,
    alias: 'comment'
  },
  'template-string': {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: !0,
    inside: {
      'template-punctuation': {
        pattern: /^`|`$/,
        alias: 'string'
      },
      interpolation: {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: !0,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      string: /[\s\S]+/
    }
  },
  'string-property': {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: !0,
    greedy: !0,
    alias: 'property'
  }
}), Prism.languages.insertBefore('javascript', 'operator', {
  'literal-property': {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: !0,
    alias: 'property'
  }
}), Prism.languages.markup && (Prism.languages.markup.tag.addInlined('script', 'javascript'), Prism.languages.markup.tag.addAttribute('on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)', 'javascript')), Prism.languages.js = Prism.languages.javascript;
/* -------------------------------------------------------------------------- */

/*                                Scroll To Top                               */

/* -------------------------------------------------------------------------- */

var scrollToTop = function scrollToTop() {
  document.querySelectorAll('[data-anchor] > a, [data-scroll-to]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var _utils$getData;

      e.preventDefault();
      var el = e.target;
      var id = utils.getData(el, 'scroll-to') || el.getAttribute('href');
      window.scroll({
        top: (_utils$getData = utils.getData(el, 'offset-top')) !== null && _utils$getData !== void 0 ? _utils$getData : utils.getOffset(document.querySelector(id)).top - 100,
        left: 0,
        behavior: 'smooth'
      });
      window.location.hash = id;
    });
  });
};

if (document.getElementById('members')) {
  var isMobile = isDeviceMobile();
  var members = [{
    name: 'Jakub',
    role: 'Founder',
    img: 'assets/img/team/jakub.png',
    email: 'jakub@redstone.finance',
    linkedin: 'https://www.linkedin.com/in/jakub-wojciechowski-5901b68/',
    bio: ''
  }, {
    name: 'Marcin',
    role: 'Head of Growth',
    img: 'assets/img/team/marcin.jpg',
    email: 'marcin@redstone.finance',
    linkedin: 'https://www.linkedin.com/in/marcin-kazmierczak1/',
    bio: 'Marcin handles strategic cooperation with DeFi protocols as well as Traditional businesses. Present in the blockchain ecosystem since 2018, his domains are Co-Opetition, Building long-term relationships, Education and "Growing the Pie" approach. Any doubt about cooperation options with Redstone? <a href="https://www.linkedin.com/in/marcin-kazmierczak1/" target="_blank">Write to me on LinkedIn!</a> Privately Travelling, Sports and understanding new cultures.'
  }, {
    name: 'Alex',
    role: 'Backend',
    img: 'assets/img/team/alex.png',
    email: 'alex@redstone.finance',
    linkedin: 'https://www.linkedin.com/in/alex-suvorov/',
    bio: 'Alex has over four years of experience as a full-stack developer in both startup and corporate environments. He enjoys solving problems and bring new ideas to life. He has developed a game-based <a href="https://codenplay.io/">educational coding platform</a> and many other projects with a variety of technologies and languages.'
  }, {
    name: 'Piotr',
    role: 'Blockchain',
    img: 'assets/img/team/ppe.jpeg',
    email: 'peter@redstone.finance',
    linkedin: 'https://www.linkedin.com/in/piotr-p%C4%99dziwiatr-2ab105215/',
    bio: 'Piotr considers himself an old guy (we would agree only judging his competency!), with over 15 years of experience in financial and insurance industry (and few startups), working as Software Developer and Technical Team Leader. Now he decided to take active part in the DeFi revolution. Privately father of three, fan of retro video games and drumming.'
  }, {
    name: 'Piotr',
    role: 'Frontend',
    img: 'assets/img/team/piotr.jpeg',
    email: 'pduda@redstone.finance',
    linkedin: 'https://www.linkedin.com/in/piotr-duda-62b66b63/',
    bio: 'New challenge? Sounds like a task for Piotr! In his not so long story he built a <a href="https://wutracing.pl/" target="_blank">racing car</a>, designed machinery for production of Tesla cars, developed numerous web apps and created furniture related company. Passionate full-stack developer with 4 years of experience, now exploring the world of blockchain!'
  }];
  var element = document.getElementById('members');
  var bio = document.getElementById('member-bio');
  members.forEach(function (member, index) {
    var card = document.createElement('div');
    card.classList.add('member-card', 'col-12', 'col-md-3', 'col-lg-2', 'mb-4');
    card.innerHTML += "\n            <img class=\"member-picture\" src=\"".concat(member.img, "\"/>\n            <div class=\"member-info fw-medium\">\n                <div class=\"member-name\">").concat(member.name, "</div>\n                <div class=\"member-role\">").concat(member.role, "</div>\n                <div class=\"member-social\">\n                    <a href=\"mailto:").concat(member.email, "\">\n                        <img src=\"assets/img/icons/mail.svg\">\n                    </a>\n                    <a href=\"").concat(member.linkedin, "\" target=\"_blank\">\n                        <img src=\"assets/img/icons/linkedin.svg\">\n                    </a>\n                </div>\n            </div>");
    element.appendChild(card);
    var memberBio = document.createElement('div');
    memberBio.innerHTML = member.bio;

    if (!isMobile) {
      memberBio.style.display = 'none';
      bio.appendChild(memberBio);
      card.addEventListener('mouseenter', function () {
        bio.childNodes.forEach(function (node, i) {
          if (i > 0) {
            node.style.display = i === index + 1 ? 'block' : 'none';
          }
        });
      });
    } else {
      memberBio.classList.add('text-center', 'mt-2', 'mb-4');
      element.appendChild(memberBio);
    }
  });
} // /* -------------------------------------------------------------------------- */
// /*                            Theme Initialization                            */
// /* -------------------------------------------------------------------------- */


docReady(navbarInit);
docReady(detectorInit);
docReady(scrollToTop); // if (videoElem) {
// if (!isDeviceMobile()) {

var scriptEle = document.createElement('script');
scriptEle.setAttribute('src', 'vendors/@lottiefiles/lottie-player.js');
document.getElementsByTagName('body')[0].appendChild(scriptEle);
document.getElementById('weave-animation').innerHTML = "            \n        <lottie-player id=\"weave-lottie\" autoplay=\"true\" loop=\"true\" speed=\"1\" src=\"assets/animations/weave.json\"\n        style=\"background: transparent\" background=\"transparent\"></lottie-player>";
document.getElementById('gears-animation').innerHTML = "            \n      <lottie-player autoplay=\"true\" loop=\"true\" speed=\"1\" src=\"assets/animations/gears.json\"\n                    style=\"background: transparent\" background=\"transparent\"></lottie-player>"; // } else {
//   videoElem.innerHTML = `<video width="100%"
// src="assets/animations/redstone.mov" autoplay loop muted playsinline></video>`;
// }
// }

var cookieScript = document.getElementById('cookie-script');
cookieScript.addEventListener('load', function () {
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: '#24355B',
        text: '#FFFFFF'
      },
      button: {
        background: '#5982F1',
        text: '#FFFFFF'
      }
    },
    showLink: false,
    theme: 'classic',
    content: {
      message: 'This site uses cookies to analyze traffic and offer a better browsing experience.',
      dismiss: 'Agree'
    }
  });
});
var resizeObserver = new ResizeObserver(function (entries) {
  entries.forEach(function (entry) {
    console.log('elo');
    console.log(entry);
    entry.target.style.height = "".concat(entry.target.offsetWidth * 0.56, "px");
  });
});
resizeObserver.observe(document.querySelector('#migration-video'));
//# sourceMappingURL=theme.js.map
