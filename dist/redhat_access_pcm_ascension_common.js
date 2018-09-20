/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resourceTypes = __webpack_require__(136);

	var _resourceTypes2 = _interopRequireDefault(_resourceTypes);

	var _commonConfig = __webpack_require__(135);

	var _commonConfig2 = _interopRequireDefault(_commonConfig);

	var _configurationService = __webpack_require__(162);

	var _configurationService2 = _interopRequireDefault(_configurationService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(169);
	__webpack_require__(159);

	var app = angular.module('RedhatAccess.common', ['RedhatAccess.ui-utils', 'angular-cache']).config(["CacheFactoryProvider", function (CacheFactoryProvider) {}]).constant('RESOURCE_TYPES', _resourceTypes2.default).value('COMMON_CONFIG', _commonConfig2.default).factory('configurationService', _configurationService2.default);

	__webpack_require__(176);

	exports.default = app.name;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */

	function nulls(val) {
	  return val != null && val !== '';
	}

	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}

	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};


	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];

	  var keys = Object.keys(obj);

	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }

	  return buf.join('');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;

	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}

	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(180).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};

	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(28);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(68),
	    getValue = __webpack_require__(86);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(96),
	    listCacheDelete = __webpack_require__(97),
	    listCacheGet = __webpack_require__(98),
	    listCacheHas = __webpack_require__(99),
	    listCacheSet = __webpack_require__(100);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(34);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(93);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(1),
	    isSymbol = __webpack_require__(14);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(4);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(14);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(36),
	    isLength = __webpack_require__(18);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(6);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(55),
	    baseKeys = __webpack_require__(70),
	    isArrayLike = __webpack_require__(13);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(4),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(101),
	    mapCacheDelete = __webpack_require__(102),
	    mapCacheGet = __webpack_require__(103),
	    mapCacheHas = __webpack_require__(104),
	    mapCacheSet = __webpack_require__(105);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global) {/*!
	    localForage -- Offline Storage, Improved
	    Version 1.7.2
	    https://localforage.github.io/localForage
	    (c) 2013-2017 Mozilla, Apache License 2.0
	*/
	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.localforage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	(function (global){
	'use strict';
	var Mutation = global.MutationObserver || global.WebKitMutationObserver;

	var scheduleDrain;

	{
	  if (Mutation) {
	    var called = 0;
	    var observer = new Mutation(nextTick);
	    var element = global.document.createTextNode('');
	    observer.observe(element, {
	      characterData: true
	    });
	    scheduleDrain = function () {
	      element.data = (called = ++called % 2);
	    };
	  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
	    var channel = new global.MessageChannel();
	    channel.port1.onmessage = nextTick;
	    scheduleDrain = function () {
	      channel.port2.postMessage(0);
	    };
	  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
	    scheduleDrain = function () {

	      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	      var scriptEl = global.document.createElement('script');
	      scriptEl.onreadystatechange = function () {
	        nextTick();

	        scriptEl.onreadystatechange = null;
	        scriptEl.parentNode.removeChild(scriptEl);
	        scriptEl = null;
	      };
	      global.document.documentElement.appendChild(scriptEl);
	    };
	  } else {
	    scheduleDrain = function () {
	      setTimeout(nextTick, 0);
	    };
	  }
	}

	var draining;
	var queue = [];
	//named nextTick for less confusing stack traces
	function nextTick() {
	  draining = true;
	  var i, oldQueue;
	  var len = queue.length;
	  while (len) {
	    oldQueue = queue;
	    queue = [];
	    i = -1;
	    while (++i < len) {
	      oldQueue[i]();
	    }
	    len = queue.length;
	  }
	  draining = false;
	}

	module.exports = immediate;
	function immediate(task) {
	  if (queue.push(task) === 1 && !draining) {
	    scheduleDrain();
	  }
	}

	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],2:[function(_dereq_,module,exports){
	'use strict';
	var immediate = _dereq_(1);

	/* istanbul ignore next */
	function INTERNAL() {}

	var handlers = {};

	var REJECTED = ['REJECTED'];
	var FULFILLED = ['FULFILLED'];
	var PENDING = ['PENDING'];

	module.exports = Promise;

	function Promise(resolver) {
	  if (typeof resolver !== 'function') {
	    throw new TypeError('resolver must be a function');
	  }
	  this.state = PENDING;
	  this.queue = [];
	  this.outcome = void 0;
	  if (resolver !== INTERNAL) {
	    safelyResolveThenable(this, resolver);
	  }
	}

	Promise.prototype["catch"] = function (onRejected) {
	  return this.then(null, onRejected);
	};
	Promise.prototype.then = function (onFulfilled, onRejected) {
	  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
	    typeof onRejected !== 'function' && this.state === REJECTED) {
	    return this;
	  }
	  var promise = new this.constructor(INTERNAL);
	  if (this.state !== PENDING) {
	    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
	    unwrap(promise, resolver, this.outcome);
	  } else {
	    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
	  }

	  return promise;
	};
	function QueueItem(promise, onFulfilled, onRejected) {
	  this.promise = promise;
	  if (typeof onFulfilled === 'function') {
	    this.onFulfilled = onFulfilled;
	    this.callFulfilled = this.otherCallFulfilled;
	  }
	  if (typeof onRejected === 'function') {
	    this.onRejected = onRejected;
	    this.callRejected = this.otherCallRejected;
	  }
	}
	QueueItem.prototype.callFulfilled = function (value) {
	  handlers.resolve(this.promise, value);
	};
	QueueItem.prototype.otherCallFulfilled = function (value) {
	  unwrap(this.promise, this.onFulfilled, value);
	};
	QueueItem.prototype.callRejected = function (value) {
	  handlers.reject(this.promise, value);
	};
	QueueItem.prototype.otherCallRejected = function (value) {
	  unwrap(this.promise, this.onRejected, value);
	};

	function unwrap(promise, func, value) {
	  immediate(function () {
	    var returnValue;
	    try {
	      returnValue = func(value);
	    } catch (e) {
	      return handlers.reject(promise, e);
	    }
	    if (returnValue === promise) {
	      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
	    } else {
	      handlers.resolve(promise, returnValue);
	    }
	  });
	}

	handlers.resolve = function (self, value) {
	  var result = tryCatch(getThen, value);
	  if (result.status === 'error') {
	    return handlers.reject(self, result.value);
	  }
	  var thenable = result.value;

	  if (thenable) {
	    safelyResolveThenable(self, thenable);
	  } else {
	    self.state = FULFILLED;
	    self.outcome = value;
	    var i = -1;
	    var len = self.queue.length;
	    while (++i < len) {
	      self.queue[i].callFulfilled(value);
	    }
	  }
	  return self;
	};
	handlers.reject = function (self, error) {
	  self.state = REJECTED;
	  self.outcome = error;
	  var i = -1;
	  var len = self.queue.length;
	  while (++i < len) {
	    self.queue[i].callRejected(error);
	  }
	  return self;
	};

	function getThen(obj) {
	  // Make sure we only access the accessor once as required by the spec
	  var then = obj && obj.then;
	  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
	    return function appyThen() {
	      then.apply(obj, arguments);
	    };
	  }
	}

	function safelyResolveThenable(self, thenable) {
	  // Either fulfill, reject or reject with error
	  var called = false;
	  function onError(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.reject(self, value);
	  }

	  function onSuccess(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.resolve(self, value);
	  }

	  function tryToUnwrap() {
	    thenable(onSuccess, onError);
	  }

	  var result = tryCatch(tryToUnwrap);
	  if (result.status === 'error') {
	    onError(result.value);
	  }
	}

	function tryCatch(func, value) {
	  var out = {};
	  try {
	    out.value = func(value);
	    out.status = 'success';
	  } catch (e) {
	    out.status = 'error';
	    out.value = e;
	  }
	  return out;
	}

	Promise.resolve = resolve;
	function resolve(value) {
	  if (value instanceof this) {
	    return value;
	  }
	  return handlers.resolve(new this(INTERNAL), value);
	}

	Promise.reject = reject;
	function reject(reason) {
	  var promise = new this(INTERNAL);
	  return handlers.reject(promise, reason);
	}

	Promise.all = all;
	function all(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }

	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }

	  var values = new Array(len);
	  var resolved = 0;
	  var i = -1;
	  var promise = new this(INTERNAL);

	  while (++i < len) {
	    allResolver(iterable[i], i);
	  }
	  return promise;
	  function allResolver(value, i) {
	    self.resolve(value).then(resolveFromAll, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	    function resolveFromAll(outValue) {
	      values[i] = outValue;
	      if (++resolved === len && !called) {
	        called = true;
	        handlers.resolve(promise, values);
	      }
	    }
	  }
	}

	Promise.race = race;
	function race(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }

	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }

	  var i = -1;
	  var promise = new this(INTERNAL);

	  while (++i < len) {
	    resolver(iterable[i]);
	  }
	  return promise;
	  function resolver(value) {
	    self.resolve(value).then(function (response) {
	      if (!called) {
	        called = true;
	        handlers.resolve(promise, response);
	      }
	    }, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	  }
	}

	},{"1":1}],3:[function(_dereq_,module,exports){
	(function (global){
	'use strict';
	if (typeof global.Promise !== 'function') {
	  global.Promise = _dereq_(2);
	}

	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"2":2}],4:[function(_dereq_,module,exports){
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getIDB() {
	    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
	    try {
	        if (typeof indexedDB !== 'undefined') {
	            return indexedDB;
	        }
	        if (typeof webkitIndexedDB !== 'undefined') {
	            return webkitIndexedDB;
	        }
	        if (typeof mozIndexedDB !== 'undefined') {
	            return mozIndexedDB;
	        }
	        if (typeof OIndexedDB !== 'undefined') {
	            return OIndexedDB;
	        }
	        if (typeof msIndexedDB !== 'undefined') {
	            return msIndexedDB;
	        }
	    } catch (e) {
	        return;
	    }
	}

	var idb = getIDB();

	function isIndexedDBValid() {
	    try {
	        // Initialize IndexedDB; fall back to vendor-prefixed versions
	        // if needed.
	        if (!idb) {
	            return false;
	        }
	        // We mimic PouchDB here;
	        //
	        // We test for openDatabase because IE Mobile identifies itself
	        // as Safari. Oh the lulz...
	        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

	        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

	        // Safari <10.1 does not meet our requirements for IDB support (#5572)
	        // since Safari 10.1 shipped with fetch, we can use that to detect it
	        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
	        // some outdated implementations of IDB that appear on Samsung
	        // and HTC Android devices <4.4 are missing IDBKeyRange
	        // See: https://github.com/mozilla/localForage/issues/128
	        // See: https://github.com/mozilla/localForage/issues/272
	        typeof IDBKeyRange !== 'undefined';
	    } catch (e) {
	        return false;
	    }
	}

	// Abstracts constructing a Blob object, so it also works in older
	// browsers that don't support the native Blob constructor. (i.e.
	// old QtWebKit versions, at least).
	// Abstracts constructing a Blob object, so it also works in older
	// browsers that don't support the native Blob constructor. (i.e.
	// old QtWebKit versions, at least).
	function createBlob(parts, properties) {
	    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
	    parts = parts || [];
	    properties = properties || {};
	    try {
	        return new Blob(parts, properties);
	    } catch (e) {
	        if (e.name !== 'TypeError') {
	            throw e;
	        }
	        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
	        var builder = new Builder();
	        for (var i = 0; i < parts.length; i += 1) {
	            builder.append(parts[i]);
	        }
	        return builder.getBlob(properties.type);
	    }
	}

	// This is CommonJS because lie is an external dependency, so Rollup
	// can just ignore it.
	if (typeof Promise === 'undefined') {
	    // In the "nopromises" build this will just throw if you don't have
	    // a global promise object, but it would throw anyway later.
	    _dereq_(3);
	}
	var Promise$1 = Promise;

	function executeCallback(promise, callback) {
	    if (callback) {
	        promise.then(function (result) {
	            callback(null, result);
	        }, function (error) {
	            callback(error);
	        });
	    }
	}

	function executeTwoCallbacks(promise, callback, errorCallback) {
	    if (typeof callback === 'function') {
	        promise.then(callback);
	    }

	    if (typeof errorCallback === 'function') {
	        promise["catch"](errorCallback);
	    }
	}

	function normalizeKey(key) {
	    // Cast the key to a string, as that's all we can set as a key.
	    if (typeof key !== 'string') {
	        console.warn(key + ' used as a key, but it is not a string.');
	        key = String(key);
	    }

	    return key;
	}

	function getCallback() {
	    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
	        return arguments[arguments.length - 1];
	    }
	}

	// Some code originally from async_storage.js in
	// [Gaia](https://github.com/mozilla-b2g/gaia).

	var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
	var supportsBlobs = void 0;
	var dbContexts = {};
	var toString = Object.prototype.toString;

	// Transaction Modes
	var READ_ONLY = 'readonly';
	var READ_WRITE = 'readwrite';

	// Transform a binary string to an array buffer, because otherwise
	// weird stuff happens when you try to work with the binary string directly.
	// It is known.
	// From http://stackoverflow.com/questions/14967647/ (continues on next line)
	// encode-decode-image-with-base64-breaks-image (2013-04-21)
	function _binStringToArrayBuffer(bin) {
	    var length = bin.length;
	    var buf = new ArrayBuffer(length);
	    var arr = new Uint8Array(buf);
	    for (var i = 0; i < length; i++) {
	        arr[i] = bin.charCodeAt(i);
	    }
	    return buf;
	}

	//
	// Blobs are not supported in all versions of IndexedDB, notably
	// Chrome <37 and Android <5. In those versions, storing a blob will throw.
	//
	// Various other blob bugs exist in Chrome v37-42 (inclusive).
	// Detecting them is expensive and confusing to users, and Chrome 37-42
	// is at very low usage worldwide, so we do a hacky userAgent check instead.
	//
	// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
	// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
	// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
	//
	// Code borrowed from PouchDB. See:
	// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
	//
	function _checkBlobSupportWithoutCaching(idb) {
	    return new Promise$1(function (resolve) {
	        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
	        var blob = createBlob(['']);
	        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

	        txn.onabort = function (e) {
	            // If the transaction aborts now its due to not being able to
	            // write to the database, likely due to the disk being full
	            e.preventDefault();
	            e.stopPropagation();
	            resolve(false);
	        };

	        txn.oncomplete = function () {
	            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
	            var matchedEdge = navigator.userAgent.match(/Edge\//);
	            // MS Edge pretends to be Chrome 42:
	            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
	            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
	        };
	    })["catch"](function () {
	        return false; // error, so assume unsupported
	    });
	}

	function _checkBlobSupport(idb) {
	    if (typeof supportsBlobs === 'boolean') {
	        return Promise$1.resolve(supportsBlobs);
	    }
	    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
	        supportsBlobs = value;
	        return supportsBlobs;
	    });
	}

	function _deferReadiness(dbInfo) {
	    var dbContext = dbContexts[dbInfo.name];

	    // Create a deferred object representing the current database operation.
	    var deferredOperation = {};

	    deferredOperation.promise = new Promise$1(function (resolve, reject) {
	        deferredOperation.resolve = resolve;
	        deferredOperation.reject = reject;
	    });

	    // Enqueue the deferred operation.
	    dbContext.deferredOperations.push(deferredOperation);

	    // Chain its promise to the database readiness.
	    if (!dbContext.dbReady) {
	        dbContext.dbReady = deferredOperation.promise;
	    } else {
	        dbContext.dbReady = dbContext.dbReady.then(function () {
	            return deferredOperation.promise;
	        });
	    }
	}

	function _advanceReadiness(dbInfo) {
	    var dbContext = dbContexts[dbInfo.name];

	    // Dequeue a deferred operation.
	    var deferredOperation = dbContext.deferredOperations.pop();

	    // Resolve its promise (which is part of the database readiness
	    // chain of promises).
	    if (deferredOperation) {
	        deferredOperation.resolve();
	        return deferredOperation.promise;
	    }
	}

	function _rejectReadiness(dbInfo, err) {
	    var dbContext = dbContexts[dbInfo.name];

	    // Dequeue a deferred operation.
	    var deferredOperation = dbContext.deferredOperations.pop();

	    // Reject its promise (which is part of the database readiness
	    // chain of promises).
	    if (deferredOperation) {
	        deferredOperation.reject(err);
	        return deferredOperation.promise;
	    }
	}

	function _getConnection(dbInfo, upgradeNeeded) {
	    return new Promise$1(function (resolve, reject) {
	        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

	        if (dbInfo.db) {
	            if (upgradeNeeded) {
	                _deferReadiness(dbInfo);
	                dbInfo.db.close();
	            } else {
	                return resolve(dbInfo.db);
	            }
	        }

	        var dbArgs = [dbInfo.name];

	        if (upgradeNeeded) {
	            dbArgs.push(dbInfo.version);
	        }

	        var openreq = idb.open.apply(idb, dbArgs);

	        if (upgradeNeeded) {
	            openreq.onupgradeneeded = function (e) {
	                var db = openreq.result;
	                try {
	                    db.createObjectStore(dbInfo.storeName);
	                    if (e.oldVersion <= 1) {
	                        // Added when support for blob shims was added
	                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
	                    }
	                } catch (ex) {
	                    if (ex.name === 'ConstraintError') {
	                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
	                    } else {
	                        throw ex;
	                    }
	                }
	            };
	        }

	        openreq.onerror = function (e) {
	            e.preventDefault();
	            reject(openreq.error);
	        };

	        openreq.onsuccess = function () {
	            resolve(openreq.result);
	            _advanceReadiness(dbInfo);
	        };
	    });
	}

	function _getOriginalConnection(dbInfo) {
	    return _getConnection(dbInfo, false);
	}

	function _getUpgradedConnection(dbInfo) {
	    return _getConnection(dbInfo, true);
	}

	function _isUpgradeNeeded(dbInfo, defaultVersion) {
	    if (!dbInfo.db) {
	        return true;
	    }

	    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
	    var isDowngrade = dbInfo.version < dbInfo.db.version;
	    var isUpgrade = dbInfo.version > dbInfo.db.version;

	    if (isDowngrade) {
	        // If the version is not the default one
	        // then warn for impossible downgrade.
	        if (dbInfo.version !== defaultVersion) {
	            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
	        }
	        // Align the versions to prevent errors.
	        dbInfo.version = dbInfo.db.version;
	    }

	    if (isUpgrade || isNewStore) {
	        // If the store is new then increment the version (if needed).
	        // This will trigger an "upgradeneeded" event which is required
	        // for creating a store.
	        if (isNewStore) {
	            var incVersion = dbInfo.db.version + 1;
	            if (incVersion > dbInfo.version) {
	                dbInfo.version = incVersion;
	            }
	        }

	        return true;
	    }

	    return false;
	}

	// encode a blob for indexeddb engines that don't support blobs
	function _encodeBlob(blob) {
	    return new Promise$1(function (resolve, reject) {
	        var reader = new FileReader();
	        reader.onerror = reject;
	        reader.onloadend = function (e) {
	            var base64 = btoa(e.target.result || '');
	            resolve({
	                __local_forage_encoded_blob: true,
	                data: base64,
	                type: blob.type
	            });
	        };
	        reader.readAsBinaryString(blob);
	    });
	}

	// decode an encoded blob
	function _decodeBlob(encodedBlob) {
	    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
	    return createBlob([arrayBuff], { type: encodedBlob.type });
	}

	// is this one of our fancy encoded blobs?
	function _isEncodedBlob(value) {
	    return value && value.__local_forage_encoded_blob;
	}

	// Specialize the default `ready()` function by making it dependent
	// on the current database operations. Thus, the driver will be actually
	// ready when it's been initialized (default) *and* there are no pending
	// operations on the database (initiated by some other instances).
	function _fullyReady(callback) {
	    var self = this;

	    var promise = self._initReady().then(function () {
	        var dbContext = dbContexts[self._dbInfo.name];

	        if (dbContext && dbContext.dbReady) {
	            return dbContext.dbReady;
	        }
	    });

	    executeTwoCallbacks(promise, callback, callback);
	    return promise;
	}

	// Try to establish a new db connection to replace the
	// current one which is broken (i.e. experiencing
	// InvalidStateError while creating a transaction).
	function _tryReconnect(dbInfo) {
	    _deferReadiness(dbInfo);

	    var dbContext = dbContexts[dbInfo.name];
	    var forages = dbContext.forages;

	    for (var i = 0; i < forages.length; i++) {
	        var forage = forages[i];
	        if (forage._dbInfo.db) {
	            forage._dbInfo.db.close();
	            forage._dbInfo.db = null;
	        }
	    }
	    dbInfo.db = null;

	    return _getOriginalConnection(dbInfo).then(function (db) {
	        dbInfo.db = db;
	        if (_isUpgradeNeeded(dbInfo)) {
	            // Reopen the database for upgrading.
	            return _getUpgradedConnection(dbInfo);
	        }
	        return db;
	    }).then(function (db) {
	        // store the latest db reference
	        // in case the db was upgraded
	        dbInfo.db = dbContext.db = db;
	        for (var i = 0; i < forages.length; i++) {
	            forages[i]._dbInfo.db = db;
	        }
	    })["catch"](function (err) {
	        _rejectReadiness(dbInfo, err);
	        throw err;
	    });
	}

	// FF doesn't like Promises (micro-tasks) and IDDB store operations,
	// so we have to do it with callbacks
	function createTransaction(dbInfo, mode, callback, retries) {
	    if (retries === undefined) {
	        retries = 1;
	    }

	    try {
	        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
	        callback(null, tx);
	    } catch (err) {
	        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
	            return Promise$1.resolve().then(function () {
	                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
	                    // increase the db version, to create the new ObjectStore
	                    if (dbInfo.db) {
	                        dbInfo.version = dbInfo.db.version + 1;
	                    }
	                    // Reopen the database for upgrading.
	                    return _getUpgradedConnection(dbInfo);
	                }
	            }).then(function () {
	                return _tryReconnect(dbInfo).then(function () {
	                    createTransaction(dbInfo, mode, callback, retries - 1);
	                });
	            })["catch"](callback);
	        }

	        callback(err);
	    }
	}

	function createDbContext() {
	    return {
	        // Running localForages sharing a database.
	        forages: [],
	        // Shared database.
	        db: null,
	        // Database readiness (promise).
	        dbReady: null,
	        // Deferred operations on the database.
	        deferredOperations: []
	    };
	}

	// Open the IndexedDB database (automatically creates one if one didn't
	// previously exist), using any options set in the config.
	function _initStorage(options) {
	    var self = this;
	    var dbInfo = {
	        db: null
	    };

	    if (options) {
	        for (var i in options) {
	            dbInfo[i] = options[i];
	        }
	    }

	    // Get the current context of the database;
	    var dbContext = dbContexts[dbInfo.name];

	    // ...or create a new context.
	    if (!dbContext) {
	        dbContext = createDbContext();
	        // Register the new context in the global container.
	        dbContexts[dbInfo.name] = dbContext;
	    }

	    // Register itself as a running localForage in the current context.
	    dbContext.forages.push(self);

	    // Replace the default `ready()` function with the specialized one.
	    if (!self._initReady) {
	        self._initReady = self.ready;
	        self.ready = _fullyReady;
	    }

	    // Create an array of initialization states of the related localForages.
	    var initPromises = [];

	    function ignoreErrors() {
	        // Don't handle errors here,
	        // just makes sure related localForages aren't pending.
	        return Promise$1.resolve();
	    }

	    for (var j = 0; j < dbContext.forages.length; j++) {
	        var forage = dbContext.forages[j];
	        if (forage !== self) {
	            // Don't wait for itself...
	            initPromises.push(forage._initReady()["catch"](ignoreErrors));
	        }
	    }

	    // Take a snapshot of the related localForages.
	    var forages = dbContext.forages.slice(0);

	    // Initialize the connection process only when
	    // all the related localForages aren't pending.
	    return Promise$1.all(initPromises).then(function () {
	        dbInfo.db = dbContext.db;
	        // Get the connection or open a new one without upgrade.
	        return _getOriginalConnection(dbInfo);
	    }).then(function (db) {
	        dbInfo.db = db;
	        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
	            // Reopen the database for upgrading.
	            return _getUpgradedConnection(dbInfo);
	        }
	        return db;
	    }).then(function (db) {
	        dbInfo.db = dbContext.db = db;
	        self._dbInfo = dbInfo;
	        // Share the final connection amongst related localForages.
	        for (var k = 0; k < forages.length; k++) {
	            var forage = forages[k];
	            if (forage !== self) {
	                // Self is already up-to-date.
	                forage._dbInfo.db = dbInfo.db;
	                forage._dbInfo.version = dbInfo.version;
	            }
	        }
	    });
	}

	function getItem(key, callback) {
	    var self = this;

	    key = normalizeKey(key);

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }

	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.get(key);

	                    req.onsuccess = function () {
	                        var value = req.result;
	                        if (value === undefined) {
	                            value = null;
	                        }
	                        if (_isEncodedBlob(value)) {
	                            value = _decodeBlob(value);
	                        }
	                        resolve(value);
	                    };

	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Iterate over all items stored in database.
	function iterate(iterator, callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }

	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.openCursor();
	                    var iterationNumber = 1;

	                    req.onsuccess = function () {
	                        var cursor = req.result;

	                        if (cursor) {
	                            var value = cursor.value;
	                            if (_isEncodedBlob(value)) {
	                                value = _decodeBlob(value);
	                            }
	                            var result = iterator(value, cursor.key, iterationNumber++);

	                            // when the iterator callback retuns any
	                            // (non-`undefined`) value, then we stop
	                            // the iteration immediately
	                            if (result !== void 0) {
	                                resolve(result);
	                            } else {
	                                cursor["continue"]();
	                            }
	                        } else {
	                            resolve();
	                        }
	                    };

	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);

	    return promise;
	}

	function setItem(key, value, callback) {
	    var self = this;

	    key = normalizeKey(key);

	    var promise = new Promise$1(function (resolve, reject) {
	        var dbInfo;
	        self.ready().then(function () {
	            dbInfo = self._dbInfo;
	            if (toString.call(value) === '[object Blob]') {
	                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
	                    if (blobSupport) {
	                        return value;
	                    }
	                    return _encodeBlob(value);
	                });
	            }
	            return value;
	        }).then(function (value) {
	            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }

	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);

	                    // The reason we don't _save_ null is because IE 10 does
	                    // not support saving the `null` type in IndexedDB. How
	                    // ironic, given the bug below!
	                    // See: https://github.com/mozilla/localForage/issues/161
	                    if (value === null) {
	                        value = undefined;
	                    }

	                    var req = store.put(value, key);

	                    transaction.oncomplete = function () {
	                        // Cast to undefined so the value passed to
	                        // callback/promise is the same as what one would get out
	                        // of `getItem()` later. This leads to some weirdness
	                        // (setItem('foo', undefined) will return `null`), but
	                        // it's not my fault localStorage is our baseline and that
	                        // it's weird.
	                        if (value === undefined) {
	                            value = null;
	                        }

	                        resolve(value);
	                    };
	                    transaction.onabort = transaction.onerror = function () {
	                        var err = req.error ? req.error : req.transaction.error;
	                        reject(err);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function removeItem(key, callback) {
	    var self = this;

	    key = normalizeKey(key);

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }

	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    // We use a Grunt task to make this safe for IE and some
	                    // versions of Android (including those used by Cordova).
	                    // Normally IE won't like `.delete()` and will insist on
	                    // using `['delete']()`, but we have a build step that
	                    // fixes this for us now.
	                    var req = store["delete"](key);
	                    transaction.oncomplete = function () {
	                        resolve();
	                    };

	                    transaction.onerror = function () {
	                        reject(req.error);
	                    };

	                    // The request will be also be aborted if we've exceeded our storage
	                    // space.
	                    transaction.onabort = function () {
	                        var err = req.error ? req.error : req.transaction.error;
	                        reject(err);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function clear(callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }

	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.clear();

	                    transaction.oncomplete = function () {
	                        resolve();
	                    };

	                    transaction.onabort = transaction.onerror = function () {
	                        var err = req.error ? req.error : req.transaction.error;
	                        reject(err);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function length(callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }

	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.count();

	                    req.onsuccess = function () {
	                        resolve(req.result);
	                    };

	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function key(n, callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        if (n < 0) {
	            resolve(null);

	            return;
	        }

	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }

	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var advanced = false;
	                    var req = store.openCursor();

	                    req.onsuccess = function () {
	                        var cursor = req.result;
	                        if (!cursor) {
	                            // this means there weren't enough keys
	                            resolve(null);

	                            return;
	                        }

	                        if (n === 0) {
	                            // We have the first key, return it if that's what they
	                            // wanted.
	                            resolve(cursor.key);
	                        } else {
	                            if (!advanced) {
	                                // Otherwise, ask the cursor to skip ahead n
	                                // records.
	                                advanced = true;
	                                cursor.advance(n);
	                            } else {
	                                // When we get here, we've got the nth key.
	                                resolve(cursor.key);
	                            }
	                        }
	                    };

	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function keys(callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
	                if (err) {
	                    return reject(err);
	                }

	                try {
	                    var store = transaction.objectStore(self._dbInfo.storeName);
	                    var req = store.openCursor();
	                    var keys = [];

	                    req.onsuccess = function () {
	                        var cursor = req.result;

	                        if (!cursor) {
	                            resolve(keys);
	                            return;
	                        }

	                        keys.push(cursor.key);
	                        cursor["continue"]();
	                    };

	                    req.onerror = function () {
	                        reject(req.error);
	                    };
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function dropInstance(options, callback) {
	    callback = getCallback.apply(this, arguments);

	    var currentConfig = this.config();
	    options = typeof options !== 'function' && options || {};
	    if (!options.name) {
	        options.name = options.name || currentConfig.name;
	        options.storeName = options.storeName || currentConfig.storeName;
	    }

	    var self = this;
	    var promise;
	    if (!options.name) {
	        promise = Promise$1.reject('Invalid arguments');
	    } else {
	        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

	        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
	            var dbContext = dbContexts[options.name];
	            var forages = dbContext.forages;
	            dbContext.db = db;
	            for (var i = 0; i < forages.length; i++) {
	                forages[i]._dbInfo.db = db;
	            }
	            return db;
	        });

	        if (!options.storeName) {
	            promise = dbPromise.then(function (db) {
	                _deferReadiness(options);

	                var dbContext = dbContexts[options.name];
	                var forages = dbContext.forages;

	                db.close();
	                for (var i = 0; i < forages.length; i++) {
	                    var forage = forages[i];
	                    forage._dbInfo.db = null;
	                }

	                var dropDBPromise = new Promise$1(function (resolve, reject) {
	                    var req = idb.deleteDatabase(options.name);

	                    req.onerror = req.onblocked = function (err) {
	                        var db = req.result;
	                        if (db) {
	                            db.close();
	                        }
	                        reject(err);
	                    };

	                    req.onsuccess = function () {
	                        var db = req.result;
	                        if (db) {
	                            db.close();
	                        }
	                        resolve(db);
	                    };
	                });

	                return dropDBPromise.then(function (db) {
	                    dbContext.db = db;
	                    for (var i = 0; i < forages.length; i++) {
	                        var _forage = forages[i];
	                        _advanceReadiness(_forage._dbInfo);
	                    }
	                })["catch"](function (err) {
	                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
	                    throw err;
	                });
	            });
	        } else {
	            promise = dbPromise.then(function (db) {
	                if (!db.objectStoreNames.contains(options.storeName)) {
	                    return;
	                }

	                var newVersion = db.version + 1;

	                _deferReadiness(options);

	                var dbContext = dbContexts[options.name];
	                var forages = dbContext.forages;

	                db.close();
	                for (var i = 0; i < forages.length; i++) {
	                    var forage = forages[i];
	                    forage._dbInfo.db = null;
	                    forage._dbInfo.version = newVersion;
	                }

	                var dropObjectPromise = new Promise$1(function (resolve, reject) {
	                    var req = idb.open(options.name, newVersion);

	                    req.onerror = function (err) {
	                        var db = req.result;
	                        db.close();
	                        reject(err);
	                    };

	                    req.onupgradeneeded = function () {
	                        var db = req.result;
	                        db.deleteObjectStore(options.storeName);
	                    };

	                    req.onsuccess = function () {
	                        var db = req.result;
	                        db.close();
	                        resolve(db);
	                    };
	                });

	                return dropObjectPromise.then(function (db) {
	                    dbContext.db = db;
	                    for (var j = 0; j < forages.length; j++) {
	                        var _forage2 = forages[j];
	                        _forage2._dbInfo.db = db;
	                        _advanceReadiness(_forage2._dbInfo);
	                    }
	                })["catch"](function (err) {
	                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
	                    throw err;
	                });
	            });
	        }
	    }

	    executeCallback(promise, callback);
	    return promise;
	}

	var asyncStorage = {
	    _driver: 'asyncStorage',
	    _initStorage: _initStorage,
	    _support: isIndexedDBValid(),
	    iterate: iterate,
	    getItem: getItem,
	    setItem: setItem,
	    removeItem: removeItem,
	    clear: clear,
	    length: length,
	    key: key,
	    keys: keys,
	    dropInstance: dropInstance
	};

	function isWebSQLValid() {
	    return typeof openDatabase === 'function';
	}

	// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
	// it to Base64, so this is how we store it to prevent very strange errors with less
	// verbose ways of binary <-> string data storage.
	var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	var BLOB_TYPE_PREFIX = '~~local_forage_type~';
	var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

	var SERIALIZED_MARKER = '__lfsc__:';
	var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

	// OMG the serializations!
	var TYPE_ARRAYBUFFER = 'arbf';
	var TYPE_BLOB = 'blob';
	var TYPE_INT8ARRAY = 'si08';
	var TYPE_UINT8ARRAY = 'ui08';
	var TYPE_UINT8CLAMPEDARRAY = 'uic8';
	var TYPE_INT16ARRAY = 'si16';
	var TYPE_INT32ARRAY = 'si32';
	var TYPE_UINT16ARRAY = 'ur16';
	var TYPE_UINT32ARRAY = 'ui32';
	var TYPE_FLOAT32ARRAY = 'fl32';
	var TYPE_FLOAT64ARRAY = 'fl64';
	var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

	var toString$1 = Object.prototype.toString;

	function stringToBuffer(serializedString) {
	    // Fill the string into a ArrayBuffer.
	    var bufferLength = serializedString.length * 0.75;
	    var len = serializedString.length;
	    var i;
	    var p = 0;
	    var encoded1, encoded2, encoded3, encoded4;

	    if (serializedString[serializedString.length - 1] === '=') {
	        bufferLength--;
	        if (serializedString[serializedString.length - 2] === '=') {
	            bufferLength--;
	        }
	    }

	    var buffer = new ArrayBuffer(bufferLength);
	    var bytes = new Uint8Array(buffer);

	    for (i = 0; i < len; i += 4) {
	        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
	        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
	        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
	        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

	        /*jslint bitwise: true */
	        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
	        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
	        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	    }
	    return buffer;
	}

	// Converts a buffer to a string to store, serialized, in the backend
	// storage library.
	function bufferToString(buffer) {
	    // base64-arraybuffer
	    var bytes = new Uint8Array(buffer);
	    var base64String = '';
	    var i;

	    for (i = 0; i < bytes.length; i += 3) {
	        /*jslint bitwise: true */
	        base64String += BASE_CHARS[bytes[i] >> 2];
	        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
	        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
	        base64String += BASE_CHARS[bytes[i + 2] & 63];
	    }

	    if (bytes.length % 3 === 2) {
	        base64String = base64String.substring(0, base64String.length - 1) + '=';
	    } else if (bytes.length % 3 === 1) {
	        base64String = base64String.substring(0, base64String.length - 2) + '==';
	    }

	    return base64String;
	}

	// Serialize a value, afterwards executing a callback (which usually
	// instructs the `setItem()` callback/promise to be executed). This is how
	// we store binary data with localStorage.
	function serialize(value, callback) {
	    var valueType = '';
	    if (value) {
	        valueType = toString$1.call(value);
	    }

	    // Cannot use `value instanceof ArrayBuffer` or such here, as these
	    // checks fail when running the tests using casper.js...
	    //
	    // TODO: See why those tests fail and use a better solution.
	    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
	        // Convert binary arrays to a string and prefix the string with
	        // a special marker.
	        var buffer;
	        var marker = SERIALIZED_MARKER;

	        if (value instanceof ArrayBuffer) {
	            buffer = value;
	            marker += TYPE_ARRAYBUFFER;
	        } else {
	            buffer = value.buffer;

	            if (valueType === '[object Int8Array]') {
	                marker += TYPE_INT8ARRAY;
	            } else if (valueType === '[object Uint8Array]') {
	                marker += TYPE_UINT8ARRAY;
	            } else if (valueType === '[object Uint8ClampedArray]') {
	                marker += TYPE_UINT8CLAMPEDARRAY;
	            } else if (valueType === '[object Int16Array]') {
	                marker += TYPE_INT16ARRAY;
	            } else if (valueType === '[object Uint16Array]') {
	                marker += TYPE_UINT16ARRAY;
	            } else if (valueType === '[object Int32Array]') {
	                marker += TYPE_INT32ARRAY;
	            } else if (valueType === '[object Uint32Array]') {
	                marker += TYPE_UINT32ARRAY;
	            } else if (valueType === '[object Float32Array]') {
	                marker += TYPE_FLOAT32ARRAY;
	            } else if (valueType === '[object Float64Array]') {
	                marker += TYPE_FLOAT64ARRAY;
	            } else {
	                callback(new Error('Failed to get type for BinaryArray'));
	            }
	        }

	        callback(marker + bufferToString(buffer));
	    } else if (valueType === '[object Blob]') {
	        // Conver the blob to a binaryArray and then to a string.
	        var fileReader = new FileReader();

	        fileReader.onload = function () {
	            // Backwards-compatible prefix for the blob type.
	            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

	            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
	        };

	        fileReader.readAsArrayBuffer(value);
	    } else {
	        try {
	            callback(JSON.stringify(value));
	        } catch (e) {
	            console.error("Couldn't convert value into a JSON string: ", value);

	            callback(null, e);
	        }
	    }
	}

	// Deserialize data we've inserted into a value column/field. We place
	// special markers into our strings to mark them as encoded; this isn't
	// as nice as a meta field, but it's the only sane thing we can do whilst
	// keeping localStorage support intact.
	//
	// Oftentimes this will just deserialize JSON content, but if we have a
	// special marker (SERIALIZED_MARKER, defined above), we will extract
	// some kind of arraybuffer/binary data/typed array out of the string.
	function deserialize(value) {
	    // If we haven't marked this string as being specially serialized (i.e.
	    // something other than serialized JSON), we can just return it and be
	    // done with it.
	    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
	        return JSON.parse(value);
	    }

	    // The following code deals with deserializing some kind of Blob or
	    // TypedArray. First we separate out the type of data we're dealing
	    // with from the data itself.
	    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
	    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

	    var blobType;
	    // Backwards-compatible blob type serialization strategy.
	    // DBs created with older versions of localForage will simply not have the blob type.
	    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
	        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
	        blobType = matcher[1];
	        serializedString = serializedString.substring(matcher[0].length);
	    }
	    var buffer = stringToBuffer(serializedString);

	    // Return the right type based on the code/type set during
	    // serialization.
	    switch (type) {
	        case TYPE_ARRAYBUFFER:
	            return buffer;
	        case TYPE_BLOB:
	            return createBlob([buffer], { type: blobType });
	        case TYPE_INT8ARRAY:
	            return new Int8Array(buffer);
	        case TYPE_UINT8ARRAY:
	            return new Uint8Array(buffer);
	        case TYPE_UINT8CLAMPEDARRAY:
	            return new Uint8ClampedArray(buffer);
	        case TYPE_INT16ARRAY:
	            return new Int16Array(buffer);
	        case TYPE_UINT16ARRAY:
	            return new Uint16Array(buffer);
	        case TYPE_INT32ARRAY:
	            return new Int32Array(buffer);
	        case TYPE_UINT32ARRAY:
	            return new Uint32Array(buffer);
	        case TYPE_FLOAT32ARRAY:
	            return new Float32Array(buffer);
	        case TYPE_FLOAT64ARRAY:
	            return new Float64Array(buffer);
	        default:
	            throw new Error('Unkown type: ' + type);
	    }
	}

	var localforageSerializer = {
	    serialize: serialize,
	    deserialize: deserialize,
	    stringToBuffer: stringToBuffer,
	    bufferToString: bufferToString
	};

	/*
	 * Includes code from:
	 *
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */

	function createDbTable(t, dbInfo, callback, errorCallback) {
	    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
	}

	// Open the WebSQL database (automatically creates one if one didn't
	// previously exist), using any options set in the config.
	function _initStorage$1(options) {
	    var self = this;
	    var dbInfo = {
	        db: null
	    };

	    if (options) {
	        for (var i in options) {
	            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
	        }
	    }

	    var dbInfoPromise = new Promise$1(function (resolve, reject) {
	        // Open the database; the openDatabase API will automatically
	        // create it for us if it doesn't exist.
	        try {
	            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
	        } catch (e) {
	            return reject(e);
	        }

	        // Create our key/value table if it doesn't exist.
	        dbInfo.db.transaction(function (t) {
	            createDbTable(t, dbInfo, function () {
	                self._dbInfo = dbInfo;
	                resolve();
	            }, function (t, error) {
	                reject(error);
	            });
	        }, reject);
	    });

	    dbInfo.serializer = localforageSerializer;
	    return dbInfoPromise;
	}

	function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
	    t.executeSql(sqlStatement, args, callback, function (t, error) {
	        if (error.code === error.SYNTAX_ERR) {
	            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
	                if (!results.rows.length) {
	                    // if the table is missing (was deleted)
	                    // re-create it table and retry
	                    createDbTable(t, dbInfo, function () {
	                        t.executeSql(sqlStatement, args, callback, errorCallback);
	                    }, errorCallback);
	                } else {
	                    errorCallback(t, error);
	                }
	            }, errorCallback);
	        } else {
	            errorCallback(t, error);
	        }
	    }, errorCallback);
	}

	function getItem$1(key, callback) {
	    var self = this;

	    key = normalizeKey(key);

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
	                    var result = results.rows.length ? results.rows.item(0).value : null;

	                    // Check to see if this is serialized content we need to
	                    // unpack.
	                    if (result) {
	                        result = dbInfo.serializer.deserialize(result);
	                    }

	                    resolve(result);
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function iterate$1(iterator, callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;

	            dbInfo.db.transaction(function (t) {
	                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
	                    var rows = results.rows;
	                    var length = rows.length;

	                    for (var i = 0; i < length; i++) {
	                        var item = rows.item(i);
	                        var result = item.value;

	                        // Check to see if this is serialized content
	                        // we need to unpack.
	                        if (result) {
	                            result = dbInfo.serializer.deserialize(result);
	                        }

	                        result = iterator(result, item.key, i + 1);

	                        // void(0) prevents problems with redefinition
	                        // of `undefined`.
	                        if (result !== void 0) {
	                            resolve(result);
	                            return;
	                        }
	                    }

	                    resolve();
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function _setItem(key, value, callback, retriesLeft) {
	    var self = this;

	    key = normalizeKey(key);

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            // The localStorage API doesn't return undefined values in an
	            // "expected" way, so undefined is always cast to null in all
	            // drivers. See: https://github.com/mozilla/localForage/pull/42
	            if (value === undefined) {
	                value = null;
	            }

	            // Save the original value to pass to the callback.
	            var originalValue = value;

	            var dbInfo = self._dbInfo;
	            dbInfo.serializer.serialize(value, function (value, error) {
	                if (error) {
	                    reject(error);
	                } else {
	                    dbInfo.db.transaction(function (t) {
	                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
	                            resolve(originalValue);
	                        }, function (t, error) {
	                            reject(error);
	                        });
	                    }, function (sqlError) {
	                        // The transaction failed; check
	                        // to see if it's a quota error.
	                        if (sqlError.code === sqlError.QUOTA_ERR) {
	                            // We reject the callback outright for now, but
	                            // it's worth trying to re-run the transaction.
	                            // Even if the user accepts the prompt to use
	                            // more storage on Safari, this error will
	                            // be called.
	                            //
	                            // Try to re-run the transaction.
	                            if (retriesLeft > 0) {
	                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
	                                return;
	                            }
	                            reject(sqlError);
	                        }
	                    });
	                }
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function setItem$1(key, value, callback) {
	    return _setItem.apply(this, [key, value, callback, 1]);
	}

	function removeItem$1(key, callback) {
	    var self = this;

	    key = normalizeKey(key);

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
	                    resolve();
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Deletes every item in the table.
	// TODO: Find out if this resets the AUTO_INCREMENT number.
	function clear$1(callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
	                    resolve();
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Does a simple `COUNT(key)` to get the number of items stored in
	// localForage.
	function length$1(callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                // Ahhh, SQL makes this one soooooo easy.
	                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
	                    var result = results.rows.item(0).c;
	                    resolve(result);
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Return the key located at key index X; essentially gets the key from a
	// `WHERE id = ?`. This is the most efficient way I can think to implement
	// this rarely-used (in my experience) part of the API, but it can seem
	// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
	// the ID of each key will change every time it's updated. Perhaps a stored
	// procedure for the `setItem()` SQL would solve this problem?
	// TODO: Don't change ID on `setItem()`.
	function key$1(n, callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
	                    var result = results.rows.length ? results.rows.item(0).key : null;
	                    resolve(result);
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function keys$1(callback) {
	    var self = this;

	    var promise = new Promise$1(function (resolve, reject) {
	        self.ready().then(function () {
	            var dbInfo = self._dbInfo;
	            dbInfo.db.transaction(function (t) {
	                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
	                    var keys = [];

	                    for (var i = 0; i < results.rows.length; i++) {
	                        keys.push(results.rows.item(i).key);
	                    }

	                    resolve(keys);
	                }, function (t, error) {
	                    reject(error);
	                });
	            });
	        })["catch"](reject);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// https://www.w3.org/TR/webdatabase/#databases
	// > There is no way to enumerate or delete the databases available for an origin from this API.
	function getAllStoreNames(db) {
	    return new Promise$1(function (resolve, reject) {
	        db.transaction(function (t) {
	            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
	                var storeNames = [];

	                for (var i = 0; i < results.rows.length; i++) {
	                    storeNames.push(results.rows.item(i).name);
	                }

	                resolve({
	                    db: db,
	                    storeNames: storeNames
	                });
	            }, function (t, error) {
	                reject(error);
	            });
	        }, function (sqlError) {
	            reject(sqlError);
	        });
	    });
	}

	function dropInstance$1(options, callback) {
	    callback = getCallback.apply(this, arguments);

	    var currentConfig = this.config();
	    options = typeof options !== 'function' && options || {};
	    if (!options.name) {
	        options.name = options.name || currentConfig.name;
	        options.storeName = options.storeName || currentConfig.storeName;
	    }

	    var self = this;
	    var promise;
	    if (!options.name) {
	        promise = Promise$1.reject('Invalid arguments');
	    } else {
	        promise = new Promise$1(function (resolve) {
	            var db;
	            if (options.name === currentConfig.name) {
	                // use the db reference of the current instance
	                db = self._dbInfo.db;
	            } else {
	                db = openDatabase(options.name, '', '', 0);
	            }

	            if (!options.storeName) {
	                // drop all database tables
	                resolve(getAllStoreNames(db));
	            } else {
	                resolve({
	                    db: db,
	                    storeNames: [options.storeName]
	                });
	            }
	        }).then(function (operationInfo) {
	            return new Promise$1(function (resolve, reject) {
	                operationInfo.db.transaction(function (t) {
	                    function dropTable(storeName) {
	                        return new Promise$1(function (resolve, reject) {
	                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
	                                resolve();
	                            }, function (t, error) {
	                                reject(error);
	                            });
	                        });
	                    }

	                    var operations = [];
	                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
	                        operations.push(dropTable(operationInfo.storeNames[i]));
	                    }

	                    Promise$1.all(operations).then(function () {
	                        resolve();
	                    })["catch"](function (e) {
	                        reject(e);
	                    });
	                }, function (sqlError) {
	                    reject(sqlError);
	                });
	            });
	        });
	    }

	    executeCallback(promise, callback);
	    return promise;
	}

	var webSQLStorage = {
	    _driver: 'webSQLStorage',
	    _initStorage: _initStorage$1,
	    _support: isWebSQLValid(),
	    iterate: iterate$1,
	    getItem: getItem$1,
	    setItem: setItem$1,
	    removeItem: removeItem$1,
	    clear: clear$1,
	    length: length$1,
	    key: key$1,
	    keys: keys$1,
	    dropInstance: dropInstance$1
	};

	function isLocalStorageValid() {
	    try {
	        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
	        // in IE8 typeof localStorage.setItem === 'object'
	        !!localStorage.setItem;
	    } catch (e) {
	        return false;
	    }
	}

	function _getKeyPrefix(options, defaultConfig) {
	    var keyPrefix = options.name + '/';

	    if (options.storeName !== defaultConfig.storeName) {
	        keyPrefix += options.storeName + '/';
	    }
	    return keyPrefix;
	}

	// Check if localStorage throws when saving an item
	function checkIfLocalStorageThrows() {
	    var localStorageTestKey = '_localforage_support_test';

	    try {
	        localStorage.setItem(localStorageTestKey, true);
	        localStorage.removeItem(localStorageTestKey);

	        return false;
	    } catch (e) {
	        return true;
	    }
	}

	// Check if localStorage is usable and allows to save an item
	// This method checks if localStorage is usable in Safari Private Browsing
	// mode, or in any other case where the available quota for localStorage
	// is 0 and there wasn't any saved items yet.
	function _isLocalStorageUsable() {
	    return !checkIfLocalStorageThrows() || localStorage.length > 0;
	}

	// Config the localStorage backend, using options set in the config.
	function _initStorage$2(options) {
	    var self = this;
	    var dbInfo = {};
	    if (options) {
	        for (var i in options) {
	            dbInfo[i] = options[i];
	        }
	    }

	    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

	    if (!_isLocalStorageUsable()) {
	        return Promise$1.reject();
	    }

	    self._dbInfo = dbInfo;
	    dbInfo.serializer = localforageSerializer;

	    return Promise$1.resolve();
	}

	// Remove all keys from the datastore, effectively destroying all data in
	// the app's key/value store!
	function clear$2(callback) {
	    var self = this;
	    var promise = self.ready().then(function () {
	        var keyPrefix = self._dbInfo.keyPrefix;

	        for (var i = localStorage.length - 1; i >= 0; i--) {
	            var key = localStorage.key(i);

	            if (key.indexOf(keyPrefix) === 0) {
	                localStorage.removeItem(key);
	            }
	        }
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Retrieve an item from the store. Unlike the original async_storage
	// library in Gaia, we don't modify return values at all. If a key's value
	// is `undefined`, we pass that value to the callback function.
	function getItem$2(key, callback) {
	    var self = this;

	    key = normalizeKey(key);

	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var result = localStorage.getItem(dbInfo.keyPrefix + key);

	        // If a result was found, parse it from the serialized
	        // string into a JS object. If result isn't truthy, the key
	        // is likely undefined and we'll pass it straight to the
	        // callback.
	        if (result) {
	            result = dbInfo.serializer.deserialize(result);
	        }

	        return result;
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Iterate over all items in the store.
	function iterate$2(iterator, callback) {
	    var self = this;

	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var keyPrefix = dbInfo.keyPrefix;
	        var keyPrefixLength = keyPrefix.length;
	        var length = localStorage.length;

	        // We use a dedicated iterator instead of the `i` variable below
	        // so other keys we fetch in localStorage aren't counted in
	        // the `iterationNumber` argument passed to the `iterate()`
	        // callback.
	        //
	        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
	        var iterationNumber = 1;

	        for (var i = 0; i < length; i++) {
	            var key = localStorage.key(i);
	            if (key.indexOf(keyPrefix) !== 0) {
	                continue;
	            }
	            var value = localStorage.getItem(key);

	            // If a result was found, parse it from the serialized
	            // string into a JS object. If result isn't truthy, the
	            // key is likely undefined and we'll pass it straight
	            // to the iterator.
	            if (value) {
	                value = dbInfo.serializer.deserialize(value);
	            }

	            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

	            if (value !== void 0) {
	                return value;
	            }
	        }
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Same as localStorage's key() method, except takes a callback.
	function key$2(n, callback) {
	    var self = this;
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var result;
	        try {
	            result = localStorage.key(n);
	        } catch (error) {
	            result = null;
	        }

	        // Remove the prefix from the key, if a key is found.
	        if (result) {
	            result = result.substring(dbInfo.keyPrefix.length);
	        }

	        return result;
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function keys$2(callback) {
	    var self = this;
	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        var length = localStorage.length;
	        var keys = [];

	        for (var i = 0; i < length; i++) {
	            var itemKey = localStorage.key(i);
	            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
	                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
	            }
	        }

	        return keys;
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Supply the number of keys in the datastore to the callback function.
	function length$2(callback) {
	    var self = this;
	    var promise = self.keys().then(function (keys) {
	        return keys.length;
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Remove an item from the store, nice and simple.
	function removeItem$2(key, callback) {
	    var self = this;

	    key = normalizeKey(key);

	    var promise = self.ready().then(function () {
	        var dbInfo = self._dbInfo;
	        localStorage.removeItem(dbInfo.keyPrefix + key);
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	// Set a key's value and run an optional callback once the value is set.
	// Unlike Gaia's implementation, the callback function is passed the value,
	// in case you want to operate on that value only after you're sure it
	// saved, or something like that.
	function setItem$2(key, value, callback) {
	    var self = this;

	    key = normalizeKey(key);

	    var promise = self.ready().then(function () {
	        // Convert undefined values to null.
	        // https://github.com/mozilla/localForage/pull/42
	        if (value === undefined) {
	            value = null;
	        }

	        // Save the original value to pass to the callback.
	        var originalValue = value;

	        return new Promise$1(function (resolve, reject) {
	            var dbInfo = self._dbInfo;
	            dbInfo.serializer.serialize(value, function (value, error) {
	                if (error) {
	                    reject(error);
	                } else {
	                    try {
	                        localStorage.setItem(dbInfo.keyPrefix + key, value);
	                        resolve(originalValue);
	                    } catch (e) {
	                        // localStorage capacity exceeded.
	                        // TODO: Make this a specific error/event.
	                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
	                            reject(e);
	                        }
	                        reject(e);
	                    }
	                }
	            });
	        });
	    });

	    executeCallback(promise, callback);
	    return promise;
	}

	function dropInstance$2(options, callback) {
	    callback = getCallback.apply(this, arguments);

	    options = typeof options !== 'function' && options || {};
	    if (!options.name) {
	        var currentConfig = this.config();
	        options.name = options.name || currentConfig.name;
	        options.storeName = options.storeName || currentConfig.storeName;
	    }

	    var self = this;
	    var promise;
	    if (!options.name) {
	        promise = Promise$1.reject('Invalid arguments');
	    } else {
	        promise = new Promise$1(function (resolve) {
	            if (!options.storeName) {
	                resolve(options.name + '/');
	            } else {
	                resolve(_getKeyPrefix(options, self._defaultConfig));
	            }
	        }).then(function (keyPrefix) {
	            for (var i = localStorage.length - 1; i >= 0; i--) {
	                var key = localStorage.key(i);

	                if (key.indexOf(keyPrefix) === 0) {
	                    localStorage.removeItem(key);
	                }
	            }
	        });
	    }

	    executeCallback(promise, callback);
	    return promise;
	}

	var localStorageWrapper = {
	    _driver: 'localStorageWrapper',
	    _initStorage: _initStorage$2,
	    _support: isLocalStorageValid(),
	    iterate: iterate$2,
	    getItem: getItem$2,
	    setItem: setItem$2,
	    removeItem: removeItem$2,
	    clear: clear$2,
	    length: length$2,
	    key: key$2,
	    keys: keys$2,
	    dropInstance: dropInstance$2
	};

	var sameValue = function sameValue(x, y) {
	    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
	};

	var includes = function includes(array, searchElement) {
	    var len = array.length;
	    var i = 0;
	    while (i < len) {
	        if (sameValue(array[i], searchElement)) {
	            return true;
	        }
	        i++;
	    }

	    return false;
	};

	var isArray = Array.isArray || function (arg) {
	    return Object.prototype.toString.call(arg) === '[object Array]';
	};

	// Drivers are stored here when `defineDriver()` is called.
	// They are shared across all instances of localForage.
	var DefinedDrivers = {};

	var DriverSupport = {};

	var DefaultDrivers = {
	    INDEXEDDB: asyncStorage,
	    WEBSQL: webSQLStorage,
	    LOCALSTORAGE: localStorageWrapper
	};

	var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

	var OptionalDriverMethods = ['dropInstance'];

	var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

	var DefaultConfig = {
	    description: '',
	    driver: DefaultDriverOrder.slice(),
	    name: 'localforage',
	    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
	    // we can use without a prompt.
	    size: 4980736,
	    storeName: 'keyvaluepairs',
	    version: 1.0
	};

	function callWhenReady(localForageInstance, libraryMethod) {
	    localForageInstance[libraryMethod] = function () {
	        var _args = arguments;
	        return localForageInstance.ready().then(function () {
	            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
	        });
	    };
	}

	function extend() {
	    for (var i = 1; i < arguments.length; i++) {
	        var arg = arguments[i];

	        if (arg) {
	            for (var _key in arg) {
	                if (arg.hasOwnProperty(_key)) {
	                    if (isArray(arg[_key])) {
	                        arguments[0][_key] = arg[_key].slice();
	                    } else {
	                        arguments[0][_key] = arg[_key];
	                    }
	                }
	            }
	        }
	    }

	    return arguments[0];
	}

	var LocalForage = function () {
	    function LocalForage(options) {
	        _classCallCheck(this, LocalForage);

	        for (var driverTypeKey in DefaultDrivers) {
	            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
	                var driver = DefaultDrivers[driverTypeKey];
	                var driverName = driver._driver;
	                this[driverTypeKey] = driverName;

	                if (!DefinedDrivers[driverName]) {
	                    // we don't need to wait for the promise,
	                    // since the default drivers can be defined
	                    // in a blocking manner
	                    this.defineDriver(driver);
	                }
	            }
	        }

	        this._defaultConfig = extend({}, DefaultConfig);
	        this._config = extend({}, this._defaultConfig, options);
	        this._driverSet = null;
	        this._initDriver = null;
	        this._ready = false;
	        this._dbInfo = null;

	        this._wrapLibraryMethodsWithReady();
	        this.setDriver(this._config.driver)["catch"](function () {});
	    }

	    // Set any config values for localForage; can be called anytime before
	    // the first API call (e.g. `getItem`, `setItem`).
	    // We loop through options so we don't overwrite existing config
	    // values.


	    LocalForage.prototype.config = function config(options) {
	        // If the options argument is an object, we use it to set values.
	        // Otherwise, we return either a specified config value or all
	        // config values.
	        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	            // If localforage is ready and fully initialized, we can't set
	            // any new configuration values. Instead, we return an error.
	            if (this._ready) {
	                return new Error("Can't call config() after localforage " + 'has been used.');
	            }

	            for (var i in options) {
	                if (i === 'storeName') {
	                    options[i] = options[i].replace(/\W/g, '_');
	                }

	                if (i === 'version' && typeof options[i] !== 'number') {
	                    return new Error('Database version must be a number.');
	                }

	                this._config[i] = options[i];
	            }

	            // after all config options are set and
	            // the driver option is used, try setting it
	            if ('driver' in options && options.driver) {
	                return this.setDriver(this._config.driver);
	            }

	            return true;
	        } else if (typeof options === 'string') {
	            return this._config[options];
	        } else {
	            return this._config;
	        }
	    };

	    // Used to define a custom driver, shared across all instances of
	    // localForage.


	    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
	        var promise = new Promise$1(function (resolve, reject) {
	            try {
	                var driverName = driverObject._driver;
	                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

	                // A driver name should be defined and not overlap with the
	                // library-defined, default drivers.
	                if (!driverObject._driver) {
	                    reject(complianceError);
	                    return;
	                }

	                var driverMethods = LibraryMethods.concat('_initStorage');
	                for (var i = 0, len = driverMethods.length; i < len; i++) {
	                    var driverMethodName = driverMethods[i];

	                    // when the property is there,
	                    // it should be a method even when optional
	                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
	                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
	                        reject(complianceError);
	                        return;
	                    }
	                }

	                var configureMissingMethods = function configureMissingMethods() {
	                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
	                        return function () {
	                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
	                            var promise = Promise$1.reject(error);
	                            executeCallback(promise, arguments[arguments.length - 1]);
	                            return promise;
	                        };
	                    };

	                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
	                        var optionalDriverMethod = OptionalDriverMethods[_i];
	                        if (!driverObject[optionalDriverMethod]) {
	                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
	                        }
	                    }
	                };

	                configureMissingMethods();

	                var setDriverSupport = function setDriverSupport(support) {
	                    if (DefinedDrivers[driverName]) {
	                        console.info('Redefining LocalForage driver: ' + driverName);
	                    }
	                    DefinedDrivers[driverName] = driverObject;
	                    DriverSupport[driverName] = support;
	                    // don't use a then, so that we can define
	                    // drivers that have simple _support methods
	                    // in a blocking manner
	                    resolve();
	                };

	                if ('_support' in driverObject) {
	                    if (driverObject._support && typeof driverObject._support === 'function') {
	                        driverObject._support().then(setDriverSupport, reject);
	                    } else {
	                        setDriverSupport(!!driverObject._support);
	                    }
	                } else {
	                    setDriverSupport(true);
	                }
	            } catch (e) {
	                reject(e);
	            }
	        });

	        executeTwoCallbacks(promise, callback, errorCallback);
	        return promise;
	    };

	    LocalForage.prototype.driver = function driver() {
	        return this._driver || null;
	    };

	    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
	        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

	        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
	        return getDriverPromise;
	    };

	    LocalForage.prototype.getSerializer = function getSerializer(callback) {
	        var serializerPromise = Promise$1.resolve(localforageSerializer);
	        executeTwoCallbacks(serializerPromise, callback);
	        return serializerPromise;
	    };

	    LocalForage.prototype.ready = function ready(callback) {
	        var self = this;

	        var promise = self._driverSet.then(function () {
	            if (self._ready === null) {
	                self._ready = self._initDriver();
	            }

	            return self._ready;
	        });

	        executeTwoCallbacks(promise, callback, callback);
	        return promise;
	    };

	    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
	        var self = this;

	        if (!isArray(drivers)) {
	            drivers = [drivers];
	        }

	        var supportedDrivers = this._getSupportedDrivers(drivers);

	        function setDriverToConfig() {
	            self._config.driver = self.driver();
	        }

	        function extendSelfWithDriver(driver) {
	            self._extend(driver);
	            setDriverToConfig();

	            self._ready = self._initStorage(self._config);
	            return self._ready;
	        }

	        function initDriver(supportedDrivers) {
	            return function () {
	                var currentDriverIndex = 0;

	                function driverPromiseLoop() {
	                    while (currentDriverIndex < supportedDrivers.length) {
	                        var driverName = supportedDrivers[currentDriverIndex];
	                        currentDriverIndex++;

	                        self._dbInfo = null;
	                        self._ready = null;

	                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
	                    }

	                    setDriverToConfig();
	                    var error = new Error('No available storage method found.');
	                    self._driverSet = Promise$1.reject(error);
	                    return self._driverSet;
	                }

	                return driverPromiseLoop();
	            };
	        }

	        // There might be a driver initialization in progress
	        // so wait for it to finish in order to avoid a possible
	        // race condition to set _dbInfo
	        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
	            return Promise$1.resolve();
	        }) : Promise$1.resolve();

	        this._driverSet = oldDriverSetDone.then(function () {
	            var driverName = supportedDrivers[0];
	            self._dbInfo = null;
	            self._ready = null;

	            return self.getDriver(driverName).then(function (driver) {
	                self._driver = driver._driver;
	                setDriverToConfig();
	                self._wrapLibraryMethodsWithReady();
	                self._initDriver = initDriver(supportedDrivers);
	            });
	        })["catch"](function () {
	            setDriverToConfig();
	            var error = new Error('No available storage method found.');
	            self._driverSet = Promise$1.reject(error);
	            return self._driverSet;
	        });

	        executeTwoCallbacks(this._driverSet, callback, errorCallback);
	        return this._driverSet;
	    };

	    LocalForage.prototype.supports = function supports(driverName) {
	        return !!DriverSupport[driverName];
	    };

	    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
	        extend(this, libraryMethodsAndProperties);
	    };

	    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
	        var supportedDrivers = [];
	        for (var i = 0, len = drivers.length; i < len; i++) {
	            var driverName = drivers[i];
	            if (this.supports(driverName)) {
	                supportedDrivers.push(driverName);
	            }
	        }
	        return supportedDrivers;
	    };

	    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
	        // Add a stub for each driver API method that delays the call to the
	        // corresponding driver method until localForage is ready. These stubs
	        // will be replaced by the driver methods as soon as the driver is
	        // loaded, so there is no performance impact.
	        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
	            callWhenReady(this, LibraryMethods[i]);
	        }
	    };

	    LocalForage.prototype.createInstance = function createInstance(options) {
	        return new LocalForage(options);
	    };

	    return LocalForage;
	}();

	// The actual localForage object that we expose as a module or via a
	// global. It's extended by pulling in one of our other libraries.


	var localforage_js = new LocalForage();

	module.exports = localforage_js;

	},{"3":3}]},{},[4])(4)
	});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(7),
	    stackClear = __webpack_require__(113),
	    stackDelete = __webpack_require__(114),
	    stackGet = __webpack_require__(115),
	    stackHas = __webpack_require__(116),
	    stackSet = __webpack_require__(117);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(3);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(61),
	    createBaseEach = __webpack_require__(80);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(26),
	    isKey = __webpack_require__(10),
	    toKey = __webpack_require__(12);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(65),
	    isObject = __webpack_require__(5),
	    isObjectLike = __webpack_require__(6);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(71),
	    baseMatchesProperty = __webpack_require__(72),
	    identity = __webpack_require__(123),
	    isArray = __webpack_require__(1),
	    property = __webpack_require__(129);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(1),
	    stringToPath = __webpack_require__(118);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(50),
	    arraySome = __webpack_require__(57);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(5);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(125);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(5);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(2);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div id=\"outageHead\" ng-show=\"(!securityService.loginStatus.userAllowedToManageCases || HeaderService.showPartnerEscalationError) &amp;&amp; !COMMON_CONFIG.isGS4\"><div id=\"errornoDirectSupport403\"><h1 translate=\"\">Support Subscription Required</h1><p translate=\"\">The credentials you provided are valid, but you do not have&nbsp;<b>direct support from Red Hat.</b></p><p translate=\"\">If you believe you should have permission to view this resource, please&nbsp;<a href=\"/support/contact/customerService.html\">contact Customer Service&nbsp;</a>for assistance. Your Red Hat login might not be associated with the right account for your organization,\nor there might be an issue with your subscription. Either way, Customer Service should be able to help\nyou resolve the problem.</p></div></div>");;return buf.join("");
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(2);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div ng-show=\"HeaderService.pageLoadFailure &amp;&amp; securityService.loginStatus.userAllowedToManageCases &amp;&amp; !COMMON_CONFIG.isGS4\"><pre class=\"console\"> \n    d8888   .d8888b.      d8888  \n   d8P888  d88P  Y88b    d8P888  \n  d8P 888  888    888   d8P 888  \n d8P  888  888    888  d8P  888  \nd88   888  888    888 d88   888  \n8888888888 888    888 8888888888 \n      888  Y88b  d88P       888  \n      888   \"Y8888P\"        888  \n<br />\n<br /><span translate=\"\" class=\"console-error\">Not Found</span><p translate=\"\">The page you are looking for is not here. It might have been moved, removed, or had its name and address changed. It might otherwise be temporarily unavailable for technical reasons.</p></pre></div>");;return buf.join("");
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(2);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div ng-hide=\"HeaderService.pageLoadFailure || !securityService.loginStatus.userAllowedToManageCases\"><a style=\"float: right\" ng-show=\"AlertService.alerts.length &gt; 1\" ng-href=\"\" ng-click=\"dismissAlerts()\">{{'Close messages'|translate}}</a><uib-alert ng-repeat=\"alert in AlertService.alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\"><span ng-show=\"alert.type==='info' || alert.isHtml\" ng-bind-html=\"alert.message\" class=\"icon-innov-prev alert-icon\"></span><span ng-hide=\"alert.type==='info' || alert.isHtml\">{{alert.message}}</span></uib-alert></div>");;return buf.join("");
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(2);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div ng-show=\"showChat\" class=\"chat\"><iframe style=\"display: none;\" ng-src=\"{{chatHackUrl}}\"></iframe><a ng-show=\"chatAvailable\" ng-click=\"openChatWindow()\" style=\"cursor: pointer\" class=\"link\">{{'Chat with Support'|translate}}&nbsp;<!--i.fa.fa-comments--></a><span ng-show=\"!chatAvailable\" disabled>{{'Chat Offline'|translate}}&nbsp;<!--i.fa.fa-comments--></span></div>");;return buf.join("");
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(2);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div rha-403error=\"\"></div><div rha-404error=\"\"></div><div ng-show=\"HeaderService.sfdcIsHealthy\"></div><div rha-alert=\"\"></div><div ng-hide=\"failedToLoadCase || !securityService.loginStatus.userAllowedToManageCases\"><div ng-show=\"pageLoading\" class=\"spinner spinner-inline\"></div></div><div ng-hide=\"HeaderService.pageLoadFailure || !securityService.loginStatus.userAllowedToManageCases\" class=\"page-header\"><div ng-hide=\"page ===&quot;&quot;\" rha-titletemplate=\"\" page=\"{{page}}\"></div><div ng-show=\"page === &quot;caseView&quot;\">Filed on&nbsp;</div><div ng-show=\"securityService.loginStatus.isLoggedIn &amp;&amp; securityService.loginStatus.authedUser.has_chat &amp;&amp; HeaderService.sfdcIsHealthy\" rha-chatbutton=\"\"></div></div><div rha-loginstatus=\"\"></div><div ng-show=\"!HeaderService.sfdcIsHealthy\" ng-bind-html=\"parseSfdcOutageHtml()\"></div>");;return buf.join("");
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(2);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<h1 ng-show=\"COMMON_CONFIG.showTitle\" class=\"page-title\">{{getPageTitle()}}</h1>");;return buf.join("");
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(2);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div id=\"rha-login-modal-header\" class=\"modal-header\"><h3 translate=\"\">Sign into the Red Hat Customer Portal</h3></div><div class=\"container-fluid\"><div id=\"rha-login-modal-body\" class=\"modal-body form-horizontal\"><!-- form ng-submit=\"modalOptions.ok()\"  method=\"post\"--><div ng-show=\"useVerboseLoginView\" class=\"form-group\">{{'Red Hat Access makes it easy for you to self-solve issues, diagnose problems, and engage with us via the Red Hat Customer Portal. To access Red Hat Customer Portal resources, you must enter valid portal credentials.'|translate}}</div><div ng-show=\"authError\" class=\"alert alert-danger\">{{authError}}</div><div id=\"rha-login-modal-user-id\" class=\"form-group\"><label for=\"rha-login-user-id\" translate=\"\" class=\"control-label\">Red Hat Login</label><div><input id=\"rha-login-user-id\" type=\"text\" placeholder=\"{{'Red Hat Login'|translate}}\" ng-model=\"user.user\" required=\"\" autofocus=\"\" class=\"form-control\"></div></div><div id=\"rha-login-modal-user-pass\" class=\"form-group\"><label for=\"rha-login-password\" translate=\"\" class=\"control-label\">Password</label><div><input id=\"rha-login-password\" type=\"password\" placeholder=\"{{'Password'|translate}}\" ng-model=\"user.password\" required=\"\" class=\"form-control\"></div></div><div style=\"font-size:smaller\" ng-show=\"useVerboseLoginView\" class=\"form-group\"><strong>{{'Note:'|translate}}</strong>{{'Red Hat Customer Portal credentials differ from the credentials used to log into this product.'|translate}}</div><!-- /form--></div><div class=\"modal-footer\"><div id=\"rha-login-modal-buttons\" class=\"form-group\"><span class=\"pull-right\"><button ng-click=\"modalOptions.close()\" type=\"submit\" translate=\"\" class=\"btn btn-md cancel\">Cancel</button><button ng-click=\"modalOptions.ok()\" type=\"submit\" translate=\"\" ng-disabled=\"status.authenticating\" class=\"btn btn-primary btn-md login\">Sign in</button></span></div></div></div>");;return buf.join("");
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var jade = __webpack_require__(2);

	module.exports = function template(locals) {
	  var buf = [];
	  var jade_mixins = {};
	  var jade_interp;

	  buf.push("<div ng-controller=\"SecurityController\" ng-show=\"displayLoginStatus()\"><div class=\"row\"><div class=\"col-sm-12\"><span ng-show=\"securityService.loginStatus.isLoggedIn\" class=\"pull-right rha-logged-in\">{{'Logged into the Red Hat Customer Portal as'|translate}} {{securityService.loginStatus.authedUser.loggedInUser}}  <span ng-if=\"securityService.logoutURL.length === 0\" ng-show=\"!securityService.loginStatus.verifying\"><a href=\"\" ng-click=\"securityService.logout()\"> {{'Log Out'|translate}}</a></span><span ng-if=\"securityService.logoutURL.length &gt; 0\" ng-show=\"!securityService.loginStatus.verifying\"><a href=\"{{securityService.logoutURL}}\"> {{'Log Out'|translate}}</a></span><span ng-show=\"securityService.loginStatus.verifying\">{{'Log Out'|translate}}</span></span><span ng-show=\"!securityService.loginStatus.isLoggedIn\" class=\"pull-right rha-logged-out\">{{'Not Logged into the Red Hat Customer Portal'|translate}} <span ng-if=\"securityService.loginURL.length === 0\" ng-show=\"!securityService.loginStatus.verifying\"><a href=\"\" ng-click=\"securityService.login()\"> {{'Log In'|translate}}</a></span><span ng-if=\"securityService.loginURL.length &gt; 0\" ng-show=\"!securityService.loginStatus.verifying\"><a href=\"{{securityService.loginURL}}\"> {{'Log In'|translate}}</a></span><span ng-show=\"securityService.loginStatus.verifying\">{{'Log In'|translate}}</span></span></div></div></div>");;return buf.join("");
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(4),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(88),
	    hashDelete = __webpack_require__(89),
	    hashGet = __webpack_require__(90),
	    hashHas = __webpack_require__(91),
	    hashSet = __webpack_require__(92);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(4),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(4),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(17),
	    setCacheAdd = __webpack_require__(110),
	    setCacheHas = __webpack_require__(111);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(3);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(4),
	    root = __webpack_require__(3);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(75),
	    isArguments = __webpack_require__(35),
	    isArray = __webpack_require__(1),
	    isIndex = __webpack_require__(30);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(22);

	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(81);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(60),
	    keys = __webpack_require__(15);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(59),
	    baseIsNaN = __webpack_require__(67);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return baseFindIndex(array, baseIsNaN, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(20),
	    equalArrays = __webpack_require__(27),
	    equalByTag = __webpack_require__(82),
	    equalObjects = __webpack_require__(83),
	    getTag = __webpack_require__(85),
	    isArray = __webpack_require__(1),
	    isHostObject = __webpack_require__(29),
	    isTypedArray = __webpack_require__(127);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(20),
	    baseIsEqual = __webpack_require__(24);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(36),
	    isHostObject = __webpack_require__(29),
	    isMasked = __webpack_require__(94),
	    isObject = __webpack_require__(5),
	    toSource = __webpack_require__(33);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(18),
	    isObjectLike = __webpack_require__(6);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(95),
	    nativeKeys = __webpack_require__(107);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(66),
	    getMatchData = __webpack_require__(84),
	    matchesStrictComparable = __webpack_require__(32);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(24),
	    get = __webpack_require__(121),
	    hasIn = __webpack_require__(122),
	    isKey = __webpack_require__(10),
	    isStrictComparable = __webpack_require__(31),
	    matchesStrictComparable = __webpack_require__(32),
	    toKey = __webpack_require__(12);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(23);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(21),
	    isSymbol = __webpack_require__(14);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(56);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(3);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(13);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(21),
	    Uint8Array = __webpack_require__(51),
	    eq = __webpack_require__(34),
	    equalArrays = __webpack_require__(27),
	    mapToArray = __webpack_require__(106),
	    setToArray = __webpack_require__(112);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(15);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(31),
	    keys = __webpack_require__(15);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(46),
	    Map = __webpack_require__(16),
	    Promise = __webpack_require__(48),
	    Set = __webpack_require__(49),
	    WeakMap = __webpack_require__(52),
	    baseGetTag = __webpack_require__(62),
	    toSource = __webpack_require__(33);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(26),
	    isArguments = __webpack_require__(35),
	    isArray = __webpack_require__(1),
	    isIndex = __webpack_require__(30),
	    isKey = __webpack_require__(10),
	    isLength = __webpack_require__(18),
	    toKey = __webpack_require__(12);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var result,
	      index = -1,
	      length = path.length;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(11);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	module.exports = hashClear;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	module.exports = hashDelete;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(11);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(11);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(11);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(79);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 95 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	module.exports = listCacheClear;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(8);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(8);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(8);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(8);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(47),
	    ListCache = __webpack_require__(7),
	    Map = __webpack_require__(16);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(9);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	module.exports = mapCacheDelete;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(9);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(9);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(9);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 106 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(109);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(28);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(37)(module)))

/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 110 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 112 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(7);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}

	module.exports = stackClear;


/***/ },
/* 114 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}

	module.exports = stackDelete;


/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(7),
	    Map = __webpack_require__(16),
	    MapCache = __webpack_require__(17);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(128),
	    toString = __webpack_require__(133);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(54),
	    baseFilter = __webpack_require__(58),
	    baseIteratee = __webpack_require__(25),
	    isArray = __webpack_require__(1);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * **Note:** Unlike `_.remove`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @see _.reject
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = filter;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(53),
	    baseEach = __webpack_require__(22),
	    baseIteratee = __webpack_require__(25),
	    isArray = __webpack_require__(1);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = forEach;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(23);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(63),
	    hasPath = __webpack_require__(87);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 123 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(64),
	    isArrayLike = __webpack_require__(13),
	    isString = __webpack_require__(126),
	    toInteger = __webpack_require__(131),
	    values = __webpack_require__(134);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Checks if `value` is in `collection`. If `collection` is a string, it's
	 * checked for a substring of `value`, otherwise
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'a': 1, 'b': 2 }, 1);
	 * // => true
	 *
	 * _.includes('abcd', 'bc');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	}

	module.exports = includes;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(13),
	    isObjectLike = __webpack_require__(6);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(1),
	    isObjectLike = __webpack_require__(6);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(69),
	    baseUnary = __webpack_require__(77),
	    nodeUtil = __webpack_require__(108);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(17);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(73),
	    basePropertyDeep = __webpack_require__(74),
	    isKey = __webpack_require__(10),
	    toKey = __webpack_require__(12);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(132);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(130);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(5),
	    isSymbol = __webpack_require__(14);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(76);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(78),
	    keys = __webpack_require__(15);

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}

	module.exports = values;


/***/ },
/* 135 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		'sfdcOutageMessage': '<ul class="message"><li class="alertSystem">Creating and updating support cases online is currently disabled. Please <a target="_blank" href="https://access.redhat.com/support/contact/technicalSupport/">contact Red Hat support</a> if you need immediate assistance.</li></ul>',
		'doSfdcHealthCheck': false,
		'sfdcIsHealthy': true, // This property should be made false only when 'doSfdcHealthCheck' is set to false
		'healthCheckInterval': 60000,
		'showTitle': true,
		'titlePrefix': 'Red Hat Access: ',
		'isGS4': false
	};

/***/ },
/* 136 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		article: 'Article',
		solution: 'Solution'
	};

/***/ },
/* 137 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FourOhThree = function () {
	    function FourOhThree() {
	        _classCallCheck(this, FourOhThree);
	    }

	    _createClass(FourOhThree, [{
	        key: 'function',
	        value: ["$scope", "securityService", "HeaderService", "COMMON_CONFIG", function _function($scope, securityService, HeaderService, COMMON_CONFIG) {
	            'ngInject';

	            $scope.COMMON_CONFIG = COMMON_CONFIG;
	            $scope.securityService = securityService;
	            $scope.HeaderService = HeaderService;
	        }]
	    }]);

	    return FourOhThree;
	}();

	exports.default = FourOhThree;

/***/ },
/* 138 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FourOhFour = function FourOhFour($scope, securityService, COMMON_CONFIG) {
	    'ngInject';

	    _classCallCheck(this, FourOhFour);

	    $scope.COMMON_CONFIG = COMMON_CONFIG;
	    $scope.securityService = securityService;
	};
	FourOhFour.$inject = ["$scope", "securityService", "COMMON_CONFIG"];

	exports.default = FourOhFour;

/***/ },
/* 139 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AlertController = function AlertController($scope, AlertService, HeaderService, securityService) {
	    'ngInject';

	    _classCallCheck(this, AlertController);

	    $scope.AlertService = AlertService;
	    $scope.HeaderService = HeaderService;
	    $scope.securityService = securityService;
	    $scope.closeable = true;
	    $scope.closeAlert = function (index) {
	        AlertService.alerts.splice(index, 1);
	    };
	    $scope.dismissAlerts = function () {
	        AlertService.clearAlerts();
	    };
	};
	AlertController.$inject = ["$scope", "AlertService", "HeaderService", "securityService"];

	exports.default = AlertController;

/***/ },
/* 140 */
/***/ function(module, exports) {

	'use strict';
	/*jshint camelcase: false, expr: true*/
	//Saleforce hack---
	//we have to monitor stuff on the window object
	//because the liveagent code generated by Salesforce is not
	//designed for angularjs.
	//We create fake buttons that we give to the salesforce api so we can track
	//chat availability without having to write a complete rest client.

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	window.fakeOnlineButton = { style: { display: 'none' } };
	window.fakeOfflineButton = { style: { display: 'none' } };

	var ChatButton = function ChatButton($scope, securityService, strataService, AlertService, CHAT_SUPPORT, AUTH_EVENTS, $sce, $interval, RHAUtils) {
	    'ngInject';

	    _classCallCheck(this, ChatButton);

	    $scope.securityService = securityService;
	    if (window.chatInitialized === undefined) {
	        window.chatInitialized = false;
	    }
	    $scope.checkChatButtonStates = function () {
	        $scope.chatAvailable = window.fakeOnlineButton.style.display !== 'none';
	    };
	    $scope.timer = null;
	    $scope.chatHackUrl = $sce.trustAsResourceUrl(CHAT_SUPPORT.chatIframeHackUrlPrefix);
	    $scope.setChatIframeHackUrl = function () {
	        strataService.users.chatSession.post().then(angular.bind(this, function (sessionId) {
	            var url = CHAT_SUPPORT.chatIframeHackUrlPrefix + '?sessionId=' + sessionId + '&ssoName=' + securityService.loginStatus.authedUser.sso_username;
	            $scope.chatHackUrl = $sce.trustAsResourceUrl(url);
	        }), function (error) {
	            AlertService.addStrataErrorMessage(error);
	        });
	    };
	    $scope.enableChat = function () {
	        $scope.showChat = securityService.loginStatus.isLoggedIn && securityService.loginStatus.authedUser.has_chat && CHAT_SUPPORT.enableChat;
	        return $scope.showChat;
	    };
	    $scope.showChat = false;
	    // determines whether we should show buttons at all
	    $scope.chatAvailable = false;
	    //Availability of chat as determined by live agent, toggles chat buttons
	    $scope.initializeChat = function () {
	        if (!$scope.enableChat() || window.chatInitialized === true) {
	            //function should only be called when chat is enabled, and only once per page load
	            return;
	        }
	        if (!window._laq) {
	            window._laq = [];
	        }
	        window._laq.push(function () {
	            liveagent.showWhenOnline(CHAT_SUPPORT.chatButtonToken, window.fakeOnlineButton);
	            liveagent.showWhenOffline(CHAT_SUPPORT.chatButtonToken, window.fakeOfflineButton);
	        });
	        //var chatToken = securityService.loginStatus.sessionId;
	        var ssoName = securityService.loginStatus.authedUser.sso_username;
	        var name = securityService.loginStatus.authedUser.loggedInUser;
	        //var currentCaseNumber;
	        var accountNumber = securityService.loginStatus.authedUser.account_number;
	        // if (currentCaseNumber) {
	        //   liveagent
	        //     .addCustomDetail('Case Number', currentCaseNumber)
	        //     .map('Case', 'CaseNumber', false, false, false)
	        //     .saveToTranscript('CaseNumber__c');
	        // }
	        // if (chatToken) {
	        //   liveagent
	        //     .addCustomDetail('Session ID', chatToken)
	        //     .map('Contact', 'SessionId__c', false, false, false);
	        // }
	        liveagent.addCustomDetail('Contact Login', ssoName).map('Contact', 'SSO_Username__c', true, true, true).saveToTranscript('SSO_Username__c');
	        //liveagent
	        //  .addCustomDetail('Contact E-mail', email)
	        //  .map('Contact', 'Email', false, false, false);
	        if (RHAUtils.isNotEmpty(accountNumber)) {
	            liveagent.addCustomDetail('Account Number', accountNumber).map('Account', 'AccountNumber', true, true, true);
	        }
	        if (RHAUtils.isNotEmpty(name)) {
	            liveagent.setName(name);
	        }
	        liveagent.addCustomDetail('Name', name);
	        liveagent.setChatWindowHeight('552');
	        //liveagent.enableLogging();
	        liveagent.init(CHAT_SUPPORT.chatLiveAgentUrlPrefix, CHAT_SUPPORT.chatInitHashOne, CHAT_SUPPORT.chatInitHashTwo);
	        window.chatInitialized = true;
	    };
	    $scope.openChatWindow = function () {
	        liveagent.startChat(CHAT_SUPPORT.chatButtonToken);
	    };
	    $scope.init = function () {
	        if ($scope.enableChat() && window.liveagent !== undefined) {
	            $scope.setChatIframeHackUrl();
	            $scope.timer = $interval($scope.checkChatButtonStates, 5000);
	            $scope.initializeChat();
	        }
	    };
	    $scope.$on('$destroy', function () {
	        //we cancel timer each time scope is destroyed
	        //it will be restarted via init on state change to a page that has a chat buttom
	        $interval.cancel($scope.timer);
	    });
	    if (securityService.loginStatus.isLoggedIn) {
	        $scope.init();
	    } else {
	        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
	            $scope.init();
	        });
	    }

	    $scope.$on('$destroy', function () {
	        window._laq = null;
	    });
	};
	ChatButton.$inject = ["$scope", "securityService", "strataService", "AlertService", "CHAT_SUPPORT", "AUTH_EVENTS", "$sce", "$interval", "RHAUtils"];

	exports.default = ChatButton;

/***/ },
/* 141 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HeaderController = function HeaderController($scope, AlertService, HeaderService, COMMON_CONFIG, RHAUtils, $interval, $sce) {
	    'ngInject';

	    /**
	     * For some reason the rhaAlert directive's controller is not binding to the view.
	     * Hijacking rhaAlert's parent controller (HeaderController) works
	     * until a real solution is found.
	     */

	    _classCallCheck(this, HeaderController);

	    $scope.AlertService = AlertService;
	    $scope.HeaderService = HeaderService;
	    $scope.closeable = true;
	    $scope.closeAlert = function (index) {
	        AlertService.alerts.splice(index, 1);
	    };
	    $scope.dismissAlerts = function () {
	        AlertService.clearAlerts();
	    };
	    $scope.init = function () {
	        HeaderService.pageLoadFailure = false;
	        HeaderService.showPartnerEscalationError = false;
	        HeaderService.sfdcIsHealthy = COMMON_CONFIG.sfdcIsHealthy;
	        if (COMMON_CONFIG.doSfdcHealthCheck) {
	            $scope.healthTimer = $interval(HeaderService.checkSfdcHealth, COMMON_CONFIG.healthCheckInterval);
	        }
	    };
	    $scope.init();
	    $scope.parseSfdcOutageHtml = function () {
	        var parsedHtml = '';
	        if (RHAUtils.isNotEmpty(COMMON_CONFIG.sfdcOutageMessage)) {
	            var rawHtml = COMMON_CONFIG.sfdcOutageMessage;
	            parsedHtml = $sce.trustAsHtml(rawHtml);
	        }
	        return parsedHtml;
	    };
	    $scope.$on('$destroy', function () {
	        $interval.cancel($scope.healthTimer);
	    });
	    $scope.pageLoadFailureWatcher = $scope.$watch('HeaderService.pageLoadFailure', function () {
	        if (HeaderService.pageLoadFailure) {
	            $scope.dismissAlerts();
	        }
	    });
	    $scope.$on('$locationChangeSuccess', function (event) {
	        $scope.dismissAlerts();
	    });
	};
	HeaderController.$inject = ["$scope", "AlertService", "HeaderService", "COMMON_CONFIG", "RHAUtils", "$interval", "$sce"];

	exports.default = HeaderController;

/***/ },
/* 142 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TitleViewCtrl = function TitleViewCtrl(COMMON_CONFIG, $scope, gettextCatalog, CaseService) {
	    'ngInject';

	    _classCallCheck(this, TitleViewCtrl);

	    $scope.COMMON_CONFIG = COMMON_CONFIG;
	    $scope.showTitle = COMMON_CONFIG.show;
	    $scope.titlePrefix = COMMON_CONFIG.titlePrefix;
	    $scope.CaseService = CaseService;
	    $scope.getPageTitle = function () {
	        switch ($scope.page) {
	            case 'search':
	                return gettextCatalog.getString('Search');
	            case 'caseList':
	                return gettextCatalog.getString('SUPPORT CASES');
	            case 'caseView':
	                return gettextCatalog.getString('CASE {{caseNumber}}', { caseNumber: CaseService.kase.case_number });
	            case 'newCase':
	                return gettextCatalog.getString('Open a Support Case');
	            case 'logViewer':
	                return gettextCatalog.getString('Logs');
	            case 'searchCase':
	                return gettextCatalog.getString('Search Support Case');
	            case 'manageGroups':
	                return gettextCatalog.getString('Manage Case Groups');
	            case 'editGroup':
	                return gettextCatalog.getString('Manage Default Case Groups');
	            default:
	                return '';
	        }
	    };
	};
	TitleViewCtrl.$inject = ["COMMON_CONFIG", "$scope", "gettextCatalog", "CaseService"];

	exports.default = TitleViewCtrl;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: __webpack_require__(38),
	        restrict: 'A',
	        controller: '403'
	    };
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: __webpack_require__(39),
	        restrict: 'A',
	        controller: '404'
	    };
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: __webpack_require__(40),
	        restrict: 'A',
	        controller: 'AlertController'
	    };
	};

/***/ },
/* 146 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$timeout", function ($timeout) {
	    'ngInject';

	    return {
	        restrict: 'AC',
	        link: function link(scope, element) {
	            $timeout(function () {
	                element[0].focus();
	            }, 100);
	        }
	    };
	}];

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        scope: {},
	        template: __webpack_require__(41),
	        restrict: 'A',
	        controller: 'ChatButton',
	        link: function postLink(scope, element, attrs) {
	            scope.$on('$destroy', function () {
	                return element.remove();
	            });
	        }
	    };
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$compile", function ($compile) {
	    'ngInject';

	    return {
	        restrict: 'A',
	        template: __webpack_require__(178),
	        link: function link(scope, elm) {
	            scope.choiceClicked = function (choice) {
	                choice.checked = !choice.checked;
	                function checkChildren(c) {
	                    angular.forEach(c.children, function (c) {
	                        c.checked = choice.checked;
	                        checkChildren(c);
	                    });
	                }

	                checkChildren(choice);
	            };
	            if (scope.choice.children.length > 0) {
	                var childChoice = $compile('<div rha-choicetree ng-show="!choice.collapsed" ng-model="choice.children"></div>')(scope);
	                elm.append(childChoice);
	            }
	        }
	    };
	}];

/***/ },
/* 149 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: '<ul><div rha-choice ng-repeat="choice in tree"></div></ul>',
	        replace: true,
	        transclude: true,
	        restrict: 'A',
	        scope: {
	            tree: '=ngModel',
	            rhaDisabled: '='
	        }
	    };
	};

/***/ },
/* 150 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            element.bind("keypress", function (event) {
	                if (event.which === 13) {
	                    scope.$apply(function () {
	                        return scope.$eval(attrs.rhaEnter, { 'event': event });
	                    });
	                    event.preventDefault();
	                }
	            });
	        }
	    };
	};

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        template: __webpack_require__(42),
	        restrict: 'A',
	        scope: { page: '@' },
	        controller: 'HeaderController'
	    };
	};

/***/ },
/* 152 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            element.bind('change', element.scope()[attrs.rhaOnchange]);
	        }
	    };
	};

/***/ },
/* 153 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$parse", function ($parse) {
	    'ngInject';

	    var disableOptions = function disableOptions(scope, attr, element, data, fnDisableIfTrue) {
	        // refresh the disabled options in the select element.
	        $('option[value!="?"]', element).each(function (i, e) {
	            var locals = {};
	            locals[attr] = data[i];
	            $(this).attr('disabled', fnDisableIfTrue(scope, locals));
	        });
	    };
	    return {
	        priority: 0,
	        link: function link(scope, element, attrs, ctrl) {
	            // parse expression and build array of disabled options
	            var expElements = attrs.optionsDisabled.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
	            var fnDisableIfTrue = $parse(expElements[1]);
	            var options = expElements[3];
	            scope.$watch(options, function (newValue, oldValue) {
	                if (newValue) {
	                    disableOptions(scope, expElements[2], element, newValue, fnDisableIfTrue);
	                }
	            }, true);
	        }
	    };
	}];

/***/ },
/* 154 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$window", function ($window) {
	    'ngInject';

	    var link = function link(scope, element, attrs) {
	        scope.onResizeFunction = function () {
	            var distanceToTop = element[0].getBoundingClientRect().top;
	            var height = $window.innerHeight - distanceToTop;
	            element.css('height', height);
	        };
	        angular.element($window).bind('resize', function () {
	            return scope.onResizeFunction();
	        });
	        angular.element($window).bind('click', function () {
	            return scope.onResizeFunction();
	        });
	        if (attrs.rhaDomReady !== undefined) {
	            scope.$watch('rhaDomReady', function (newValue) {
	                if (newValue) {
	                    scope.onResizeFunction();
	                }
	            });
	        } else {
	            scope.onResizeFunction();
	        }
	    };
	    return {
	        restrict: 'A',
	        scope: { rhaDomReady: '=' },
	        link: link
	    };
	}];

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'AE',
	        scope: { page: '@' },
	        template: __webpack_require__(43),
	        controller: 'TitleViewCtrl'
	    };
	};

/***/ },
/* 156 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$http", "$q", "TreeViewSelectorUtils", function ($http, $q, TreeViewSelectorUtils) {
	    'ngInject';

	    return {
	        getTree: function getTree(dataUrl, sessionId) {
	            var defer = $q.defer();
	            var tmpUrl = dataUrl;
	            if (sessionId) {
	                tmpUrl = tmpUrl + '?sessionId=' + encodeURIComponent(sessionId);
	            }
	            $http({
	                method: 'GET',
	                url: tmpUrl
	            }).success(function (data, status, headers, config) {
	                var tree = [];
	                TreeViewSelectorUtils.parseTreeList(tree, data);
	                defer.resolve(tree);
	            }).error(function (data, status, headers, config) {
	                return defer.reject({});
	            });
	            return defer.promise;
	        }
	    };
	}];

/***/ },
/* 157 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    var removeParams = function removeParams(path) {
	        if (path) {
	            var split = path.split('?');
	            return split[0];
	        }
	        return path;
	    };
	    var isLeafChecked = function isLeafChecked(path) {
	        if (path) {
	            var split = path.split('?');
	            if (split[1]) {
	                var params = split[1].split('&');
	                for (var i = 0; i < params.length; i++) {
	                    if (params[i].indexOf('checked=true') !== -1) {
	                        return true;
	                    }
	                }
	            }
	        }
	        return false;
	    };
	    var parseTreeNode = function parseTreeNode(splitPath, tree, fullFilePath) {
	        if (splitPath[0] !== undefined) {
	            if (splitPath[0] !== '') {
	                var node = splitPath[0];
	                var match = false;
	                var index = 0;
	                for (var i = 0; i < tree.length; i++) {
	                    if (tree[i].name === node) {
	                        match = true;
	                        index = i;
	                        break;
	                    }
	                }
	                if (!match) {
	                    var nodeObj = {};
	                    nodeObj.checked = isLeafChecked(node);
	                    nodeObj.name = removeParams(node);
	                    if (splitPath.length === 1) {
	                        nodeObj.fullPath = removeParams(fullFilePath);
	                    }
	                    nodeObj.children = [];
	                    tree.push(nodeObj);
	                    index = tree.length - 1;
	                }
	                splitPath.shift();
	                parseTreeNode(splitPath, tree[index].children, fullFilePath);
	            } else {
	                splitPath.shift();
	                parseTreeNode(splitPath, tree, fullFilePath);
	            }
	        }
	    };
	    var hasSelectedLeaves = function hasSelectedLeaves(tree) {
	        for (var i = 0; i < tree.length; i++) {
	            if (tree[i] !== undefined) {
	                if (tree[i].children.length === 0) {
	                    //we only check leaf nodes
	                    if (tree[i].checked === true) {
	                        return true;
	                    }
	                } else {
	                    if (hasSelectedLeaves(tree[i].children)) {
	                        return true;
	                    }
	                }
	            }
	        }
	        return false;
	    };
	    var getSelectedNames = function getSelectedNames(tree, container) {
	        for (var i = 0; i < tree.length; i++) {
	            if (tree[i] !== undefined) {
	                if (tree[i].children.length === 0) {
	                    if (tree[i].checked === true) {
	                        container.push(tree[i].fullPath);
	                    }
	                } else {
	                    getSelectedNames(tree[i].children, container);
	                }
	            }
	        }
	    };
	    return {
	        parseTreeList: function parseTreeList(tree, data) {
	            var files = data.split('\n');
	            for (var i = 0; i < files.length; i++) {
	                var file = files[i];
	                var splitPath = file.split('/');
	                parseTreeNode(splitPath, tree, file);
	            }
	        },
	        hasSelections: function hasSelections(tree) {
	            return hasSelectedLeaves(tree);
	        },
	        getSelectedLeaves: function getSelectedLeaves(tree) {
	            if (tree === undefined) {
	                return [];
	            }
	            var container = [];
	            getSelectedNames(tree, container);
	            return container;
	        }
	    };
	};

/***/ },
/* 158 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$sce", function ($sce) {
	    'ngInject';

	    return function (text) {
	        return $sce.trustAsHtml(text);
	    };
	}];

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Controllers

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ = __webpack_require__(137);

	var _2 = _interopRequireDefault(_);

	var _3 = __webpack_require__(138);

	var _4 = _interopRequireDefault(_3);

	var _alert = __webpack_require__(139);

	var _alert2 = _interopRequireDefault(_alert);

	var _chatButton = __webpack_require__(140);

	var _chatButton2 = _interopRequireDefault(_chatButton);

	var _header = __webpack_require__(141);

	var _header2 = _interopRequireDefault(_header);

	var _titleView = __webpack_require__(142);

	var _titleView2 = _interopRequireDefault(_titleView);

	var _5 = __webpack_require__(143);

	var _6 = _interopRequireDefault(_5);

	var _7 = __webpack_require__(144);

	var _8 = _interopRequireDefault(_7);

	var _alert3 = __webpack_require__(145);

	var _alert4 = _interopRequireDefault(_alert3);

	var _chatButton3 = __webpack_require__(147);

	var _chatButton4 = _interopRequireDefault(_chatButton3);

	var _header3 = __webpack_require__(151);

	var _header4 = _interopRequireDefault(_header3);

	var _onChange = __webpack_require__(152);

	var _onChange2 = _interopRequireDefault(_onChange);

	var _titleTemplate = __webpack_require__(155);

	var _titleTemplate2 = _interopRequireDefault(_titleTemplate);

	var _autoFocus = __webpack_require__(146);

	var _autoFocus2 = _interopRequireDefault(_autoFocus);

	var _alertService = __webpack_require__(160);

	var _alertService2 = _interopRequireDefault(_alertService);

	var _constantsService = __webpack_require__(163);

	var _constantsService2 = _interopRequireDefault(_constantsService);

	var _headerService = __webpack_require__(164);

	var _headerService2 = _interopRequireDefault(_headerService);

	var _strataService = __webpack_require__(166);

	var _strataService2 = _interopRequireDefault(_strataService);

	var _udsService = __webpack_require__(168);

	var _udsService2 = _interopRequireDefault(_udsService);

	var _cacheUtils = __webpack_require__(161);

	var _cacheUtils2 = _interopRequireDefault(_cacheUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Services


	// Directives
	var app = angular.module('RedhatAccess.header', []);

	// Controllers
	app.controller('403', _2.default);
	app.controller('404', _4.default);
	app.controller('AlertController', _alert2.default);
	app.controller('ChatButton', _chatButton2.default);
	app.controller('HeaderController', _header2.default);
	app.controller('TitleViewCtrl', _titleView2.default);

	// Directives
	app.directive('rha403error', _6.default);
	app.directive('rha404error', _8.default);
	app.directive('rhaAlert', _alert4.default);
	app.directive('rhaChatbutton', _chatButton4.default);
	app.directive('rhaHeader', _header4.default);
	app.directive('rhaOnchange', _onChange2.default);
	app.directive('rhaTitletemplate', _titleTemplate2.default);
	app.directive('autoFocus', _autoFocus2.default);

	// Services
	app.service('AlertService', _alertService2.default);
	app.service('ConstantsService', _constantsService2.default);
	app.service('HeaderService', _headerService2.default);
	app.service('strataService', _strataService2.default);
	app.service('udsService', _udsService2.default);
	app.service('CacheUtilsService', _cacheUtils2.default);

	exports.default = app.name;

/***/ },
/* 160 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AlertService = function AlertService($filter, AUTH_EVENTS, $rootScope, RHAUtils, gettextCatalog) {
	    'ngInject';

	    _classCallCheck(this, AlertService);

	    var ALERT_TYPES = {
	        DANGER: 'danger',
	        SUCCESS: 'success',
	        WARNING: 'warning',
	        INFO: 'info'
	    };
	    this.alerts = [];
	    //array of {message: 'some alert', type: '<type>'} objects
	    this.clearAlerts = function () {
	        this.alerts = [];
	    };
	    this.addAlert = function (alert) {
	        this.alerts.push(alert);
	    };
	    this.removeAlert = function (alert) {
	        this.alerts.splice(this.alerts.indexOf(alert), 1);
	    };
	    this.addDangerMessage = function (message, isHtml) {
	        return this.addMessage(message, ALERT_TYPES.DANGER, isHtml);
	    };
	    this.addSuccessMessage = function (message, isHtml) {
	        return this.addMessage(message, ALERT_TYPES.SUCCESS, isHtml);
	    };
	    this.addWarningMessage = function (message, isHtml) {
	        return this.addMessage(message, ALERT_TYPES.WARNING, isHtml);
	    };
	    this.addInfoMessage = function (message, isHtml) {
	        return this.addMessage(message, ALERT_TYPES.INFO, isHtml);
	    };
	    this.addMessage = function (message, type, isHtml) {
	        var alert = {
	            message: message,
	            type: type === null ? 'warning' : type,
	            isHtml: isHtml
	        };
	        this.addAlert(alert);
	        $('body,html').animate({ scrollTop: $('body').offset().top }, 100);
	        //Angular adds a unique hash to each alert during data binding,
	        //so the returned alert will be unique even if the
	        //message and type are identical.
	        return alert;
	    };
	    this.getErrors = function () {
	        var errors = $filter('filter')(this.alerts, { type: ALERT_TYPES.DANGER });
	        if (errors === null) {
	            errors = [];
	        }
	        return errors;
	    };
	    this.addStrataErrorMessage = function (error) {
	        if (RHAUtils.isNotEmpty(error)) {
	            var errorText = error.message;
	            if (error.xhr && error.xhr.responseText) {
	                errorText = errorText.concat(' Message: ' + error.xhr.responseText);
	            }
	            var existingMessage = $filter('filter')(this.alerts, {
	                type: ALERT_TYPES.DANGER,
	                message: errorText
	            });
	            if (existingMessage.length < 1) {
	                this.addDangerMessage(errorText);
	            }
	        }
	    };
	    this.addUDSErrorMessage = function (error) {
	        if (RHAUtils.isNotEmpty(error) && RHAUtils.isNotEmpty(error.responseText)) {
	            this.addDangerMessage(error.responseText);
	        }
	    };
	    $rootScope.$on(AUTH_EVENTS.logoutSuccess, angular.bind(this, function () {
	        this.clearAlerts();
	        this.addMessage(gettextCatalog.getString('You have successfully logged out of the Red Hat Customer Portal.'));
	    }));
	    $rootScope.$on(AUTH_EVENTS.loginSuccess, angular.bind(this, function () {
	        this.clearAlerts();
	    }));
	};
	AlertService.$inject = ["$filter", "AUTH_EVENTS", "$rootScope", "RHAUtils", "gettextCatalog"];

	exports.default = AlertService;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isFirefox = isFirefox;

	var _localforage = __webpack_require__(19);

	var _localforage2 = _interopRequireDefault(_localforage);

	var _filter = __webpack_require__(119);

	var _filter2 = _interopRequireDefault(_filter);

	var _forEach = __webpack_require__(120);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _includes = __webpack_require__(124);

	var _includes2 = _interopRequireDefault(_includes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import { CommonsCacheNamespace, CommonsCacheNamespaces } from "../enums";
	// import { envDetails } from "./env";

	function isFirefox() {
	    return "MozAppearance" in document.documentElement.style;
	}

	var CacheUtilsService = function CacheUtilsService() {
	    _classCallCheck(this, CacheUtilsService);

	    this.localForage;
	    this.indexDBAvailable = true;
	    this.localStorageAvailable = true;

	    this.configureCache = function (localForage, options) {
	        var _this = this;

	        // For FF only attempt to determine if indexDB is available, this mainly affects
	        // FF private mode
	        localForage.config(options);
	        try {
	            if (isFirefox() && window.indexedDB) {
	                var db = indexedDB.open("test");
	                db.onerror = function () {
	                    _this.indexDBAvailable = false;
	                };
	            }
	        } catch (e) {
	            console.warn("[Ascension] IndexDB unavailable.");
	            this.indexDBAvailable = false;
	        }

	        // For FF, if indexDB isn't available and localStorage is, prefer localStorage
	        if (isFirefox() && !this.indexDBAvailable && this.localStorageAvailable) {
	            localForage.setDriver([localForage.LOCALSTORAGE, localForage.WEBSQL]);
	        } else if (isFirefox() && !this.indexDBAvailable && !this.localStorageAvailable) {
	            // If indexDB and localStorage aren't available, try WEBSQL as a last resort
	            localForage.setDriver([localForage.WEBSQL]);
	        }

	        this.localForage = localForage;
	        return localForage;
	    };

	    this.makeKey = function (namespace, key) {
	        return namespace + "-" + key;
	    };

	    this.makeCommentDraftKey = function (caseNumber, ssoUsername) {
	        return caseNumber + "-" + ssoUsername;
	    };

	    this.set = function (namespace, key, obj, options) {
	        if (!obj.lastModifiedDate) {
	            obj.lastModifiedDate = new Date().toISOString();
	        }
	        if (namespace === CommonsCacheNamespaces.USER.name) {
	            obj.expiresAt = (options && options.expireAt || +new Date()) + CommonsCacheNamespaces.USER.cacheExpiry;
	        }
	        return this.setWithFullKey(this.makeKey(namespace, key), obj);
	    };

	    this.setWithFullKey = function (key, obj) {
	        try {
	            return this.localForage.setItem(key, obj);
	        } catch (e) {
	            console.warn("Unable to set " + key + " due to: " + e.message);
	        }
	    };

	    this.get = function (namespace, key) {
	        return this.getWithFullKey(this.makeKey(namespace, key));
	    };

	    this.getWithFullKey = function (key) {
	        try {
	            return this.localForage.getItem(key);
	        } catch (e) {
	            console.warn("Unable to get " + key + " due to: " + e.message);
	        }
	    };

	    this.deleteKey = function (namespace, key) {
	        return this.deleteWithFullKey(this.makeKey(namespace, key));
	    };

	    this.deleteWithFullKey = function (key) {
	        try {
	            return this.localForage.removeItem(key);
	        } catch (e) {
	            console.warn("Unable to delete " + key + " due to: " + e.message);
	        }
	    };

	    this.clear = function () {
	        try {
	            return this.localForage.clear();
	        } catch (e) {
	            console.warn("Unable to clear all cache: " + e.message);
	        }
	    };

	    this.keys = function (namespace) {
	        try {
	            if (namespace) {
	                return this.localForage.keys().then(function (keys) {
	                    if (keys) {
	                        return (0, _filter2.default)(keys, function (key) {
	                            return (0, _includes2.default)(key, namespace);
	                        });
	                    } else {
	                        return [];
	                    }
	                });
	            } else {
	                return this.localForage.keys();
	            }
	        } catch (e) {
	            console.warn("Unable to get keys from namespace " + namespace + " due to: " + e.message);
	        }
	    };

	    this.expireCache = function () {
	        var _this2 = this;

	        try {
	            var keys = this.keys();
	            (0, _forEach2.default)(keys, function (k) {
	                _this2.localForage.getItem(k).then(function (c) {
	                    if (c.expiresAt && +new Date() > c.expiresAt) {
	                        _this2.localForage.removeItem(k);
	                    }
	                });
	            });
	        } catch (e) {
	            console.warn("Could not expire indexdb cache: " + e.message);
	        }
	    };

	    this.setInSessionStorage = function (key, value) {
	        try {
	            sessionStorage.setItem(key, value);
	        } catch (e) {
	            console.warn("Could not set key: " + key + ", value: " + value + " in sessionStorage");
	        }
	    };
	    this.getInSessionStorage = function (key) {
	        try {
	            return sessionStorage.getItem(key);
	        } catch (e) {
	            console.warn("Could not get key: " + key + " in sessionStorage");
	        }
	    };
	    this.removeFromSessionStorage = function (key) {
	        try {
	            return sessionStorage.removeItem(key);
	        } catch (e) {
	            console.warn("Could not remove key: " + key + " in sessionStorage");
	        }
	    };
	};

	// export const COMMONS_CACHE_STORAGE_NAME = "ascension-common-lf";
	// export const CommonsCacheUtils = new CacheUtilsService(
	//   localForageCommons,
	//   {
	//     name: COMMONS_CACHE_STORAGE_NAME
	//   }
	// );


	exports.default = CacheUtilsService;

/***/ },
/* 162 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["$q", function ($q) {
	    'ngInject';

	    var defer = $q.defer();
	    return {
	        setConfig: function setConfig(config) {
	            defer.resolve(config);
	        },
	        getConfig: function getConfig() {
	            return defer.promise;
	        }
	    };
	}];

/***/ },
/* 163 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ConstantsService = function ConstantsService(gettextCatalog, STATUS) {
	    'ngInject';

	    _classCallCheck(this, ConstantsService);

	    this.sortByParams = [{
	        ///this refers  in context of "sorting on Newest Date Modified"
	        name: gettextCatalog.getString('Newest Date Modified'),
	        sortField: 'lastModifiedDate',
	        sortOrder: 'DESC'
	    }, {
	        ///this refers  in context of "sorting on Oldest Date Modified"
	        name: gettextCatalog.getString('Oldest Date Modified'),
	        sortField: 'lastModifiedDate',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Highest Severity"
	        name: gettextCatalog.getString('Highest Severity'),
	        sortField: 'severity',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Lowest Severity"
	        name: gettextCatalog.getString('Lowest Severity'),
	        sortField: 'severity',
	        sortOrder: 'DESC'
	    }, {
	        ///this refers  in context of "sorting on Newest Date Created"
	        name: gettextCatalog.getString('Newest Date Created'),
	        sortField: 'createdDate',
	        sortOrder: 'DESC'
	    }, {
	        ///this refers  in context of "sorting on Oldest Date Created"
	        name: gettextCatalog.getString('Oldest Date Created'),
	        sortField: 'createdDate',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Case Owner (A-Z)"
	        name: gettextCatalog.getString('Case Owner (A-Z)'),
	        sortField: 'owner',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Case Owner (Z-A)"
	        name: gettextCatalog.getString('Case Owner (Z-A)'),
	        sortField: 'owner',
	        sortOrder: 'DESC'
	    }, {
	        ///this refers  in context of "sorting on Case Status (A-Z)"
	        name: gettextCatalog.getString('Case Status (A-Z)'),
	        sortField: 'status',
	        sortOrder: 'ASC'
	    }, {
	        ///this refers  in context of "sorting on Case Status (Z-A)"
	        name: gettextCatalog.getString('Case Status (Z-A)'),
	        sortField: 'status',
	        sortOrder: 'DESC'
	    }];
	    this.statuses = [{
	        // Open and Waiting on Customer
	        name: gettextCatalog.getString('Waiting on Customer'),
	        value: STATUS.wocust
	    }, {
	        // Open and Waiting on RedHat
	        name: gettextCatalog.getString('Waiting on Red Hat'),
	        value: STATUS.worh
	    }, {
	        // Open refers to Open support cases
	        name: gettextCatalog.getString('All Open Cases'),
	        value: STATUS.open
	    }, {
	        // Closed refers to Closed support cases
	        name: gettextCatalog.getString('All Closed Cases'),
	        value: STATUS.closed
	    }, {
	        // Open and closed refers to Open and Closed support cases
	        name: gettextCatalog.getString('All Cases'),
	        value: STATUS.both
	    }];
	    this.advancedCaseListColumns = [{
	        id: 'severity',
	        name: gettextCatalog.getString('Severity'),
	        description: gettextCatalog.getString('Severity of the case.'),
	        default: true
	    }, {
	        id: 'number-status',
	        name: gettextCatalog.getString('Number & Status'),
	        description: gettextCatalog.getString('Number and Status of the case.'),
	        required: true,
	        default: true
	    }, {
	        id: 'summary',
	        name: gettextCatalog.getString('Summary'),
	        description: gettextCatalog.getString('Summary of the case.'),
	        default: true
	    }, {
	        id: 'product',
	        name: gettextCatalog.getString('Product Name and Version'),
	        description: gettextCatalog.getString('Product and Version assigned to the case.'),
	        default: true
	    }, {
	        id: 'created',
	        name: gettextCatalog.getString('Created User and Date'),
	        description: gettextCatalog.getString('Name of the person who created the case and date it was created.'),
	        default: true
	    }, {
	        id: 'modified',
	        name: gettextCatalog.getString('Last Modified User and Date'),
	        description: gettextCatalog.getString('Name of the person who modified the case last and the date the action was performed.')
	    }, {
	        id: 'contact',
	        name: gettextCatalog.getString('Contact Name'),
	        description: gettextCatalog.getString('Name of the customer contact.')
	    }, {
	        id: 'account',
	        name: gettextCatalog.getString('Account Number'),
	        description: gettextCatalog.getString('Number of the account the case was created under.')
	    }, {
	        id: 'owner',
	        name: gettextCatalog.getString('Owner Name'),
	        description: gettextCatalog.getString('Name of the Red Hat Associate\'s who owns the case.')
	    }];

	    this.wappsUrl = new Uri('https://ams-dev2.devlab.redhat.com/wapps');
	    if (window.location.hostname === 'access.redhat.com' || window.location.hostname === 'prod.foo.redhat.com' || window.location.hostname === 'fooprod.redhat.com') {
	        this.wappsUrl = new Uri('https://www.redhat.com/wapps');
	    } else {
	        if (window.location.hostname === 'access.qa.redhat.com' || window.location.hostname === 'qa.foo.redhat.com' || window.location.hostname === 'fooqa.redhat.com') {
	            this.wappsUrl = new Uri('https://www.qa.redhat.com/wapps');
	        } else {
	            if (window.location.hostname === 'access.devgssci.devlab.phx1.redhat.com' || window.location.hostname === 'ci.foo.redhat.com' || window.location.hostname === 'fooci.redhat.com') {
	                this.wappsUrl = new Uri('https://ams-dev2.devlab.redhat.com/wapps');
	            }
	        }
	    }
	};
	ConstantsService.$inject = ["gettextCatalog", "STATUS"];

	exports.default = ConstantsService;

/***/ },
/* 164 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HeaderService = function HeaderService(COMMON_CONFIG, strataService, securityService, AlertService, $q) {
	    'ngInject';

	    _classCallCheck(this, HeaderService);

	    this.sfdcIsHealthy = COMMON_CONFIG.sfdcIsHealthy;
	    this.pageLoading = false;
	    this.pageLoadFailure = false;
	    this.showSurvey = true;
	    this.showPartnerEscalationError = false;
	    this.checkSfdcHealth = function () {
	        if (securityService.loginStatus.isLoggedIn) {
	            var deferred = $q.defer();
	            strataService.health.sfdc().then(angular.bind(this, function (response) {
	                if (response.name === 'SFDC' && response.status === true) {
	                    service.sfdcIsHealthy = true;
	                }
	                deferred.resolve(response);
	            }), angular.bind(this, function (error) {
	                if (error.xhr.status === 502) {
	                    service.sfdcIsHealthy = false;
	                }
	                AlertService.addStrataErrorMessage(error);
	                deferred.reject();
	            }));
	            return deferred.promise;
	        }
	    };
	};
	HeaderService.$inject = ["COMMON_CONFIG", "strataService", "securityService", "AlertService", "$q"];

	exports.default = HeaderService;

/***/ },
/* 165 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RHAUtils = function RHAUtils() {
	    _classCallCheck(this, RHAUtils);

	    this.isEmpty = function (object) {
	        if (object === undefined || object === null || object === '' || object.length === 0 || object === {}) {
	            return true;
	        }
	        return false;
	    };
	    this.isNotEmpty = function (object) {
	        return !this.isEmpty(object);
	    };
	    this.isObjectEmpty = function (obj) {
	        for (var prop in obj) {
	            if (obj.hasOwnProperty(prop)) return false;
	        }
	        return true;
	    };
	    this.isEmailValid = function (object) {
	        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	        if (object.match(mailformat)) {
	            return true;
	        } else {
	            return false;
	        }
	    };

	    this.convertToTimezone = function (date) {
	        var timezoneDate = window.moment(date).tz(this.userTimeZone);
	        return timezoneDate;
	    };

	    this.convertToMoment = function (date) {
	        var momentDate = window.moment(date);
	        return momentDate;
	    };

	    this.formatDate = function (date, formatter) {
	        return date.format(formatter);
	    };
	    this.isWeeekend = function (userTimeZone) {
	        if (this.isEmpty(userTimeZone)) userTimeZone = null;
	        var currentDate = window.moment(); //get current date
	        var timezoneDate = window.moment(currentDate).tz(userTimeZone); //change as per logged in user's timezone
	        //Sunday as 0 and Saturday as 6.
	        if (timezoneDate.day() == 0 || timezoneDate.day() == 6) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	};

	exports.default = RHAUtils;

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _localforage = __webpack_require__(19);

	var _localforage2 = _interopRequireDefault(_localforage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StrataService = function StrataService($q, gettextCatalog, RHAUtils, CacheFactory, RESOURCE_TYPES, CacheUtilsService) {
	    'ngInject';

	    _classCallCheck(this, StrataService);

	    CacheFactory('strataCache', {
	        capacity: 1000,
	        maxAge: 900000,
	        deleteOnExpire: 'aggressive',
	        recycleFreq: 60000,
	        cacheFlushInterval: 3600000,
	        storageMode: 'sessionStorage'
	    });
	    var strataCache = CacheFactory.get('strataCache');
	    var PCM_CACHE_STORAGE_NAME = "pcm-lf";
	    var PCMCacheUtils = CacheUtilsService.configureCache(_localforage2.default, { name: PCM_CACHE_STORAGE_NAME });
	    console.log(PCMCacheUtils);
	    PCMCacheUtils.set('testinglf', 'keyValue', 'value', null);
	    $(window).on('unload', function () {
	        strataCache.destroy();
	    });
	    var errorHandler = function errorHandler(message, xhr, response, status) {
	        var translatedMsg = message;
	        switch (status) {
	            case 'Unauthorized':
	                translatedMsg = gettextCatalog.getString('Unauthorized.');
	                break; // case n:
	            //   code block
	            //   break;
	        }
	        this.reject({
	            message: translatedMsg,
	            xhr: xhr,
	            response: response,
	            status: status
	        });
	    };
	    function clearCache(key) {
	        strataCache.remove(key);
	    }
	    function clearAllCaseSearch() {
	        var allKeys = strataCache.keys();
	        if (allKeys) {
	            allKeys.forEach(function (key) {
	                if (key.startsWith('filter') || key.startsWith('search') || key.startsWith('advancedSearch')) {
	                    clearCache(key);
	                }
	            });
	        }
	    }
	    function clearAllCaseGroups(accountNumber) {
	        var allKeys = strataCache.keys();
	        if (allKeys) {
	            allKeys.forEach(function (key) {
	                if (key.startsWith('users' + accountNumber)) {
	                    clearCache(key);
	                }
	            });
	        }
	    }
	    var service = {
	        authentication: {
	            checkLogin: function checkLogin() {
	                var deferred = $q.defer();
	                if (strataCache.get('auth')) {
	                    strata.addAccountNumber(strataCache.get('auth').account_number);
	                    deferred.resolve(strataCache.get('auth'));
	                } else {
	                    strata.checkLogin(function (result, authedUser) {
	                        if (result) {
	                            service.accounts.list().then(function (accountNumber) {
	                                service.accounts.get(accountNumber).then(function (account) {
	                                    authedUser.account = account;
	                                    strata.addAccountNumber(account.number);
	                                    strataCache.put('auth', authedUser);
	                                    deferred.resolve(authedUser);
	                                });
	                            }, function (error) {
	                                //TODO revisit this behavior
	                                authedUser.account = undefined;
	                                deferred.resolve(authedUser);
	                            });
	                        } else {
	                            var error = { message: 'Unauthorized.' };
	                            deferred.reject(error);
	                        }
	                    });
	                }
	                return deferred.promise;
	            },
	            setCredentials: function setCredentials(username, password) {
	                return strata.setCredentials(username, password);
	            },
	            logout: function logout() {
	                strataCache.removeAll();
	                strata.clearCredentials();
	            }
	        },
	        cache: {
	            clr: function clr(key) {
	                clearCache(key);
	            }
	        },
	        entitlements: {
	            get: function get(showAll, ssoUserName) {
	                var deferred = $q.defer();
	                strata.entitlements.get(showAll, function (entitlements) {
	                    deferred.resolve(entitlements);
	                }, angular.bind(deferred, errorHandler), ssoUserName);
	                return deferred.promise;
	            }
	        },
	        problems: function problems(data, max) {
	            var deferred = $q.defer();
	            strata.problems(data, function (solutions) {
	                deferred.resolve(solutions);
	            }, angular.bind(deferred, errorHandler), max);
	            return deferred.promise;
	        },
	        recommendations: function recommendations(data, max, highlight, highlightTags) {
	            var deferred = $q.defer();
	            strata.recommendations(data, function (recommendations) {
	                deferred.resolve(recommendations);
	            }, angular.bind(deferred, errorHandler), max, highlight, highlightTags);
	            return deferred.promise;
	        },
	        recommendationsXmlHack: function recommendationsXmlHack(data, max, highlight, highlightTags) {
	            var deferred = $q.defer();
	            strata.recommendationsXmlHack(data, function (recommendations) {
	                deferred.resolve(recommendations);
	            }, angular.bind(deferred, errorHandler), max, highlight, highlightTags);
	            return deferred.promise;
	        },
	        recommendationsForCase: function recommendationsForCase(data, limit, start, highlight, highlightTagPre, highlightTagPost) {
	            var deferred = $q.defer();
	            strata.recommendationsForCase(data, function (response) {
	                deferred.resolve(response);
	            }, angular.bind(deferred, errorHandler), limit, start, highlight, highlightTagPre, highlightTagPost);

	            return deferred.promise;
	        },
	        solutionEngine: {
	            sendCaseNumber: function sendCaseNumber(caseNumObj, guid) {
	                var deferred = $q.defer();
	                strata.solutionEngine.sendCaseNumber(caseNumObj, guid, function () {
	                    deferred.resolve();
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        solutions: {
	            get: function get(uri) {
	                var deferred = $q.defer();
	                var splitUri = uri.split('/');
	                uri = splitUri[splitUri.length - 1];
	                if (strataCache.get('solution' + uri)) {
	                    deferred.resolve(strataCache.get('solution' + uri));
	                } else {
	                    strata.solutions.get(uri, function (solution) {
	                        solution.resource_type = RESOURCE_TYPES.solution; //Needed upstream
	                        strataCache.put('solution' + uri, solution);
	                        deferred.resolve(solution);
	                    }, function () {
	                        //workaround for 502 from strata
	                        //If the deferred is rejected then the parent $q.all()
	                        //based deferred will fail. Since we don't need every
	                        //recommendation just send back undefined
	                        //and the caller can ignore the missing solution details.
	                        deferred.resolve();
	                    });
	                }
	                return deferred.promise;
	            },
	            search: function search(searchString, max) {
	                var deferred = $q.defer();
	                strata.search(searchString, function (entries) {
	                    if (entries !== undefined) {
	                        deferred.resolve(entries);
	                    }
	                }, angular.bind(deferred, errorHandler), max, false);
	                return deferred.promise;
	            },
	            post: function post(solution) {
	                var deferred = $q.defer();
	                strata.solutions.post(solution, function (solution) {
	                    deferred.resolve(solution);
	                }, angular.bind(deferred, errorHandler));

	                return deferred.promise;
	            }
	        },
	        articles: {
	            get: function get(id) {
	                var deferred = $q.defer();
	                strata.articles.get(id, function (article) {
	                    article.resource_type = RESOURCE_TYPES.article; //Needed upstream
	                    strataCache.put('article' + id, article);
	                    deferred.resolve(article);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        search: function search(searchString, max) {
	            var resultsDeferred = $q.defer();
	            var deferreds = [];
	            strata.search(searchString, function (entries) {
	                //retrieve details for each solution
	                if (entries !== undefined) {
	                    entries.forEach(function (entry) {
	                        var deferred = $q.defer();
	                        deferreds.push(deferred.promise);
	                        var resourceType = entry.resource_type || entry.documentKind;
	                        switch (resourceType) {
	                            case RESOURCE_TYPES.solution:
	                                if (!strataCache.get('solution' + entry.uri)) {
	                                    strataCache.put('solution' + entry.uri, entry);
	                                }
	                                deferred.resolve(strataCache.get('solution' + entry.uri));
	                                break;
	                            case RESOURCE_TYPES.article:
	                                if (!strataCache.get('article' + entry.uri)) {
	                                    strataCache.put('article' + entry.uri, entry);
	                                }
	                                deferred.resolve(strataCache.get('article' + entry.uri));
	                                break;
	                            default:
	                                console.warn("Could not determine resource type from strata search, resourceType: " + resourceType + ", q: " + searchString);
	                                return deferred.resolve();
	                        }
	                    });
	                }
	                $q.all(deferreds).then(function (results) {
	                    resultsDeferred.resolve(results);
	                }, angular.bind(resultsDeferred, errorHandler));
	            }, angular.bind(resultsDeferred, errorHandler), max, false);
	            return resultsDeferred.promise;
	        },
	        products: {
	            list: function list(ssoUserName) {
	                var deferred = $q.defer();
	                if (strataCache.get('products' + ssoUserName)) {
	                    deferred.resolve(strataCache.get('products' + ssoUserName));
	                } else {
	                    strata.products.list(function (response) {
	                        strataCache.put('products' + ssoUserName, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), ssoUserName);
	                }
	                return deferred.promise;
	            },
	            versions: function versions(productCode) {
	                var deferred = $q.defer();
	                if (strataCache.get('versions-' + productCode)) {
	                    var responseCopy = [];
	                    angular.copy(strataCache.get('versions-' + productCode), responseCopy);
	                    deferred.resolve(responseCopy);
	                } else {
	                    strata.products.versions(productCode, function (response) {
	                        strataCache.put('versions-' + productCode, response);
	                        var responseCopy = [];
	                        angular.copy(response, responseCopy);
	                        deferred.resolve(responseCopy);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            get: function get(productCode) {
	                var deferred = $q.defer();
	                if (strataCache.get('product' + productCode)) {
	                    deferred.resolve(strataCache.get('product' + productCode));
	                } else {
	                    strata.products.get(productCode, function (response) {
	                        strataCache.put('product' + productCode, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            }
	        },
	        groups: {
	            get: function get(groupNum, ssoUserName) {
	                var deferred = $q.defer();
	                if (strataCache.get('groups' + groupNum + ssoUserName)) {
	                    deferred.resolve(strataCache.get('groups' + groupNum + ssoUserName));
	                } else {
	                    strata.groups.get(groupNum, function (response) {
	                        strataCache.put('groups' + groupNum + ssoUserName, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), ssoUserName);
	                }
	                return deferred.promise;
	            },
	            list: function list(ssoUserName, flushCashe) {
	                var deferred = $q.defer();
	                if (flushCashe) {
	                    strataCache.remove('groups' + ssoUserName);
	                }
	                if (strataCache.get('groups' + ssoUserName)) {
	                    deferred.resolve(strataCache.get('groups' + ssoUserName));
	                } else {
	                    strata.groups.list(function (response) {
	                        strataCache.put('groups' + ssoUserName, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), ssoUserName);
	                }
	                return deferred.promise;
	            },
	            remove: function remove(groupNum, ssoUserName) {
	                var deferred = $q.defer();
	                strata.groups.remove(groupNum, function (response) {
	                    deferred.resolve(response);
	                    clearCache('groups' + ssoUserName);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            create: function create(groupName, ssoUserName) {
	                var deferred = $q.defer();
	                strata.groups.create(groupName, function (response) {
	                    deferred.resolve(response);
	                    clearCache('groups' + ssoUserName);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            update: function update(group, ssoUserName) {
	                var deferred = $q.defer();
	                strata.groups.update(group, function (response) {
	                    deferred.resolve(response);
	                    clearCache('groups' + ssoUserName);
	                    clearCache('groups' + group.number + ssoUserName);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            createDefault: function createDefault(group, ssoUserName, accountNumber) {
	                var deferred = $q.defer();
	                strata.groups.createDefault(group, function (response) {
	                    deferred.resolve(response);
	                    clearCache('groups' + ssoUserName);
	                    clearCache('groups' + group.number + ssoUserName);
	                    clearAllCaseGroups(accountNumber);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        groupUsers: {
	            update: function update(users, accountId, groupnum) {
	                var deferred = $q.defer();
	                strata.groupUsers.update(users, accountId, groupnum, function (response) {
	                    deferred.resolve(response);
	                    if (strataCache.get('users' + accountId + groupnum)) {
	                        clearCache('users' + accountId + groupnum);
	                    }
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        accounts: {
	            get: function get(accountNumber) {
	                var deferred = $q.defer();
	                if (strataCache.get('account' + accountNumber)) {
	                    deferred.resolve(strataCache.get('account' + accountNumber));
	                } else {
	                    strata.accounts.get(accountNumber, function (response) {
	                        strataCache.put('account' + accountNumber, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            users: function users(accountNumber, group) {
	                var deferred = $q.defer();
	                if (strataCache.get('users' + accountNumber + group)) {
	                    deferred.resolve(strataCache.get('users' + accountNumber + group));
	                } else {
	                    strata.accounts.users(accountNumber, function (response) {
	                        strataCache.put('users' + accountNumber + group, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), group);
	                }
	                return deferred.promise;
	            },
	            list: function list() {
	                var deferred = $q.defer();
	                if (strataCache.get('account')) {
	                    deferred.resolve(strataCache.get('account'));
	                } else {
	                    strata.accounts.list(function (response) {
	                        strataCache.put('account', response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            addBookmark: function addBookmark(accountNumber, ssoName) {
	                var deferred = $q.defer();
	                strata.accounts.addBookmark(accountNumber, ssoName, function () {
	                    deferred.resolve();
	                }, angular.bind(deferred, errorHandler));

	                return deferred.promise;
	            },
	            removeBookmark: function removeBookmark(accountNumber, ssoName) {
	                var deferred = $q.defer();
	                strata.accounts.removeBookmark(accountNumber, ssoName, function () {
	                    deferred.resolve();
	                }, angular.bind(deferred, errorHandler));

	                return deferred.promise;
	            },
	            managedAccounts: {
	                get: function get(accountNumber) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('managedAccounts' + accountNumber)) {
	                        deferred.resolve(strataCache.get('managedAccounts' + accountNumber));
	                    } else {
	                        strata.accounts.getManagedAccounts(accountNumber, function (response) {
	                            strataCache.put('managedAccounts' + accountNumber, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                }
	            },
	            accountManagers: {
	                get: function get(accountNumber) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('accountManagers' + accountNumber)) {
	                        deferred.resolve(strataCache.get('accountManagers' + accountNumber));
	                    } else {
	                        strata.accounts.getManagersForAccount(accountNumber, function (response) {
	                            strataCache.put('accountManagers' + accountNumber, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                }
	            }
	        },
	        cases: {
	            csv: function csv() {
	                var deferred = $q.defer();
	                strata.cases.csv(function (response) {
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            attachments: {
	                list: function list(id) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('attachments' + id)) {
	                        //Changing cache response. Making sortModifiedDate as Date before sending
	                        var attachmentResponse = strataCache.get('attachments' + id);
	                        angular.forEach(attachmentResponse, angular.bind(this, function (attachment) {
	                            attachment.sortModifiedDate = new Date(attachment.sortModifiedDate);
	                        }));

	                        deferred.resolve(attachmentResponse);
	                    } else {
	                        strata.cases.attachments.list(id, function (response) {
	                            angular.forEach(response, angular.bind(this, function (element) {
	                                var sortPublishedDate = element.last_modified_date;
	                                element.sortModifiedDate = sortPublishedDate;
	                                var lastModifiedDate = RHAUtils.convertToTimezone(element.last_modified_date);
	                                element.last_modified_date = RHAUtils.formatDate(lastModifiedDate, 'MMM DD YYYY');
	                                element.last_modified_time = RHAUtils.formatDate(lastModifiedDate, 'hh:mm A Z');
	                                var createdDate = RHAUtils.convertToTimezone(element.created_date);
	                                element.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                                element.created_time = RHAUtils.formatDate(createdDate, 'hh:mm A Z');
	                                //for attachments the published date is the last modified date
	                                element.published_date = element.last_modified_date;
	                                element.published_time = element.last_modified_time;
	                            }));
	                            strataCache.put('attachments' + id, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                post: function post(attachment, caseNumber, onProgress, isPrivate) {
	                    var deferred = $q.defer();
	                    strata.cases.attachments.post(attachment, caseNumber, function (response, code, xhr) {
	                        strataCache.remove('attachments' + caseNumber);
	                        deferred.resolve(xhr.getResponseHeader('Location'));
	                    }, angular.bind(deferred, errorHandler), onProgress, isPrivate);
	                    return deferred.promise;
	                },
	                remove: function remove(id, caseNumber) {
	                    var deferred = $q.defer();
	                    strata.cases.attachments.remove(id, caseNumber, function (response) {
	                        strataCache.remove('attachments' + caseNumber);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            },
	            externalUpdates: {
	                list: function list(id) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('externalUpdates' + id)) {
	                        //Changing cache response. Making sortModifiedDate as Date before sending
	                        var externalUpdates = strataCache.get('externalUpdates' + id);
	                        angular.forEach(externalUpdates, angular.bind(this, function (externalUpdates) {
	                            externalUpdates.sortModifiedDate = new Date(externalUpdates.sortModifiedDate);
	                        }));

	                        deferred.resolve(externalUpdates);
	                    } else {
	                        strata.cases.externalUpdates.list(id, function (response) {
	                            angular.forEach(response, angular.bind(this, function (externalUpdate) {
	                                var sortPublishedDate = externalUpdate.created_date;
	                                externalUpdate.sortModifiedDate = sortPublishedDate;

	                                var createdDate = RHAUtils.convertToTimezone(externalUpdate.created_date);
	                                externalUpdate.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                                externalUpdate.created_time = RHAUtils.formatDate(createdDate, 'hh:mm A Z');
	                            }));
	                            strataCache.put('externalUpdates' + id, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                }
	            },
	            comments: {
	                get: function get(id) {
	                    var deferred = $q.defer();
	                    if (strataCache.get('comments' + id)) {
	                        //Changing cache response. Making sortModifiedDate as Date before sending
	                        var commentResponse = strataCache.get('comments' + id);
	                        angular.forEach(commentResponse, angular.bind(this, function (comment) {
	                            comment.sortModifiedDate = new Date(comment.sortModifiedDate);
	                        }));

	                        deferred.resolve(commentResponse);
	                    } else {
	                        strata.cases.comments.get(id, function (response) {
	                            angular.forEach(response, angular.bind(this, function (comment) {
	                                var sortPublishedDate = comment.published_date;
	                                comment.sortModifiedDate = sortPublishedDate;

	                                var lastModifiedDate = RHAUtils.convertToTimezone(comment.last_modified_date);
	                                comment.last_modified_date = RHAUtils.formatDate(lastModifiedDate, 'MMM DD YYYY');
	                                comment.last_modified_time = RHAUtils.formatDate(lastModifiedDate, 'hh:mm A Z');

	                                var createdDate = RHAUtils.convertToTimezone(comment.created_date);
	                                comment.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                                comment.created_time = RHAUtils.formatDate(createdDate, 'hh:mm A Z');
	                                //for comments use published date
	                                var publishedDate = RHAUtils.convertToTimezone(comment.published_date);
	                                comment.published_date = RHAUtils.formatDate(publishedDate, 'MMM DD YYYY');
	                                comment.published_time = RHAUtils.formatDate(publishedDate, 'hh:mm A Z');
	                            }));
	                            strataCache.put('comments' + id, response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                post: function post(caseNumber, text, isPublic, isDraft) {
	                    var deferred = $q.defer();
	                    strata.cases.comments.post(caseNumber, {
	                        'text': text,
	                        'draft': isDraft === true ? 'true' : 'false',
	                        'public': isPublic === true ? 'true' : 'false'
	                    }, function (response) {
	                        strataCache.remove('comments' + caseNumber);
	                        clearAllCaseSearch();
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                },
	                put: function put(caseNumber, text, isDraft, isPublic, comment_id) {
	                    var deferred = $q.defer();
	                    strata.cases.comments.update(caseNumber, {
	                        'text': text,
	                        'draft': isDraft === true ? 'true' : 'false',
	                        'public': isPublic === true ? 'true' : 'false',
	                        'caseNumber': caseNumber,
	                        'id': comment_id
	                    }, comment_id, function (response) {
	                        strataCache.remove('comments' + caseNumber);
	                        clearAllCaseSearch();
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            },
	            symptoms: {
	                get: function get(id) {
	                    var deferred = $q.defer();
	                    strata.cases.symptoms.get(id, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                },
	                solutions: {
	                    post: function post(limit, isOnlySymptoms, data) {
	                        var deferred = $q.defer();
	                        strata.cases.symptoms.solutions.post(limit, isOnlySymptoms, data, function (response) {
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                        return deferred.promise;
	                    }
	                }
	            },
	            notified_users: {
	                add: function add(caseNumber, ssoUserName) {
	                    var deferred = $q.defer();
	                    strata.cases.notified_users.add(caseNumber, ssoUserName, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                },
	                remove: function remove(caseNumber, ssoUserName) {
	                    var deferred = $q.defer();
	                    strata.cases.notified_users.remove(caseNumber, ssoUserName, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            },
	            sbrs: {
	                add: function add(caseNumber, sbrGroups) {
	                    var deferred = $q.defer();
	                    strata.cases.sbrs.add(caseNumber, sbrGroups, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                },
	                remove: function remove(caseNumber, sbrGroups) {
	                    var deferred = $q.defer();
	                    strata.cases.sbrs.remove(caseNumber, sbrGroups, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            },
	            get: function get(id) {
	                var deferred = $q.defer();
	                if (strataCache.get('case' + id)) {
	                    //Changing cache response. Making sortModifiedDate as Date before sending
	                    var caseChatsResponse = strataCache.get('case' + id);
	                    angular.forEach(caseChatsResponse.chats.chat, angular.bind(this, function (chat) {
	                        chat.sortModifiedDate = new Date(chat.sortModifiedDate);
	                    }));

	                    deferred.resolve([caseChatsResponse, true]);
	                } else {
	                    strata.cases.get(id, function (response) {
	                        var kase = response;
	                        var tzDate = RHAUtils.convertToTimezone(response.created_date);
	                        response.created_date = RHAUtils.formatDate(tzDate, 'MMM DD YYYY hh:mm:ss A Z');
	                        angular.forEach(response.chats.chat, angular.bind(this, function (chat) {
	                            chat.sortModifiedDate = chat.start_time;
	                            var lastModifiedDate = RHAUtils.convertToTimezone(chat.start_time);
	                            chat.start_date = RHAUtils.formatDate(lastModifiedDate, 'MMM DD YYYY');
	                            chat.start_time = RHAUtils.formatDate(lastModifiedDate, 'hh:mm:ss A Z');
	                        }));
	                        strataCache.put('case' + id, response);
	                        deferred.resolve([response, false]);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            search: function search(caseStatus, caseOwner, caseGroup, accountNumber, searchString, sortField, sortOrder, offset, limit, queryParams, start, partnerSearch) {
	                var deferred = $q.defer(),
	                    key = 'search' + Array.prototype.join.call(arguments, '-');

	                if (strataCache.get(key)) {
	                    deferred.resolve(strataCache.get(key));
	                } else {
	                    strata.cases.search(function (response) {
	                        angular.forEach(response['case'], function (kase) {
	                            var createdDate = RHAUtils.convertToTimezone(kase.created_date);
	                            kase.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                            var modifiedDate = RHAUtils.convertToTimezone(kase.last_modified_date);
	                            kase.last_modified_date = RHAUtils.formatDate(modifiedDate, 'MMM DD YYYY');
	                        });
	                        strataCache.put(key, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), caseStatus, caseOwner, caseGroup, accountNumber, searchString, sortField, sortOrder, offset, limit, queryParams, start, partnerSearch);
	                }
	                return deferred.promise;
	            },
	            advancedSearch: function advancedSearch(query, order, offset, limit, format) {
	                var deferred = $q.defer(),
	                    key = 'advancedSearch-' + Array.prototype.join.call(arguments, '-');

	                if (strataCache.get(key)) {
	                    deferred.resolve(strataCache.get(key));
	                } else {
	                    strata.cases.advancedSearch(function (response) {
	                        angular.forEach(response['case'], function (kase) {
	                            var createdDate = RHAUtils.convertToTimezone(kase.created_date);
	                            kase.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                            var modifiedDate = RHAUtils.convertToTimezone(kase.last_modified_date);
	                            kase.last_modified_date = RHAUtils.formatDate(modifiedDate, 'MMM DD YYYY');
	                        });
	                        strataCache.put(key, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), query, order, offset, limit, format);
	                }

	                return deferred.promise;
	            },
	            filter: function filter(params, partnerSearch) {
	                var deferred = $q.defer(),
	                    key = 'filter' + JSON.stringify(params);

	                if (RHAUtils.isEmpty(params)) {
	                    params = {};
	                }
	                if (RHAUtils.isEmpty(params.count)) {
	                    params.count = 50;
	                }
	                if (strataCache.get(key)) {
	                    deferred.resolve(strataCache.get(key));
	                } else {
	                    strata.cases.filter(params, partnerSearch, function (response) {
	                        angular.forEach(response['case'], function (kase) {
	                            var createdDate = RHAUtils.convertToTimezone(kase.created_date);
	                            kase.created_date = RHAUtils.formatDate(createdDate, 'MMM DD YYYY');
	                            var modifiedDate = RHAUtils.convertToTimezone(kase.last_modified_date);
	                            kase.last_modified_date = RHAUtils.formatDate(modifiedDate, 'MMM DD YYYY');
	                        });
	                        strataCache.put(key, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            },
	            post: function post(caseJSON) {
	                var deferred = $q.defer();
	                strata.cases.post(caseJSON, function (caseNumber) {
	                    //Remove any case filters that are cached
	                    clearAllCaseSearch();
	                    deferred.resolve(caseNumber);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            put: function put(caseNumber, caseJSON) {
	                var deferred = $q.defer();
	                strata.cases.put(caseNumber, caseJSON, function (response) {
	                    // Remove all case caches that could have been affected
	                    strataCache.remove('case' + caseNumber);
	                    clearAllCaseSearch();
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            owner: {
	                update: function update(caseNumber, ssoUserName) {
	                    var deferred = $q.defer();
	                    strata.cases.owner.update(caseNumber, ssoUserName, function (response) {
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                    return deferred.promise;
	                }
	            }
	        },
	        values: {
	            cases: {
	                severity: function severity() {
	                    var deferred = $q.defer();
	                    if (strataCache.get('severities')) {
	                        deferred.resolve(strataCache.get('severities'));
	                    } else {
	                        strata.values.cases.severity(function (response) {
	                            strataCache.put('severities', response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                status: function status() {
	                    var deferred = $q.defer();
	                    if (strataCache.get('statuses')) {
	                        deferred.resolve(strataCache.get('statuses'));
	                    } else {
	                        strata.values.cases.status(function (response) {
	                            strataCache.put('statuses', response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                types: function types() {
	                    var deferred = $q.defer();
	                    if (strataCache.get('types')) {
	                        deferred.resolve(strataCache.get('types'));
	                    } else {
	                        strata.values.cases.types(function (response) {
	                            strataCache.put('types', response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                },
	                attachment: {
	                    size: function size() {
	                        var deferred = $q.defer();
	                        if (strataCache.get('attachmentMaxSize')) {
	                            deferred.resolve(strataCache.get('attachmentMaxSize'));
	                        } else {
	                            strata.values.cases.attachment.size(function (response) {
	                                strataCache.put('attachmentMaxSize', response);
	                                deferred.resolve(response);
	                            }, angular.bind(deferred, errorHandler));
	                        }
	                        return deferred.promise;
	                    }
	                }
	            },
	            businesshours: function businesshours(timezone) {
	                var deferred = $q.defer();
	                if (strataCache.get('businesshours')) {
	                    deferred.resolve(strataCache.get('businesshours'));
	                } else {
	                    strata.values.businesshours(timezone, function (response) {
	                        strataCache.put('businesshours', response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler));
	                }
	                return deferred.promise;
	            }
	        },
	        users: {
	            get: function get(userId) {
	                var deferred = $q.defer();
	                if (strataCache.get('userId' + userId)) {
	                    deferred.resolve(strataCache.get('userId' + userId));
	                } else {
	                    strata.users.get(function (response) {
	                        strataCache.put('userId' + userId, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), userId);
	                }
	                return deferred.promise;
	            },
	            getBySSO: function getBySSO(userSSO) {
	                var deferred = $q.defer();
	                if (strataCache.get('userSSO' + userSSO)) {
	                    deferred.resolve(strataCache.get('userSSO' + userSSO));
	                } else {
	                    strata.users.getBySSO(function (response) {
	                        strataCache.put('userSSO' + userSSO, response);
	                        deferred.resolve(response);
	                    }, angular.bind(deferred, errorHandler), userSSO);
	                }
	                return deferred.promise;
	            },
	            chatSession: {
	                post: function post() {
	                    var deferred = $q.defer();
	                    if (strataCache.get('chatSession')) {
	                        deferred.resolve(strataCache.get('chatSession'));
	                    } else {
	                        strata.users.chatSession.get(function (response) {
	                            strataCache.put('chatSession', response);
	                            deferred.resolve(response);
	                        }, angular.bind(deferred, errorHandler));
	                    }
	                    return deferred.promise;
	                }
	            }
	        },
	        health: {
	            sfdc: function sfdc() {
	                var deferred = $q.defer();
	                strata.health.sfdc(function (response) {
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        escalationRequest: {
	            create: function create(escalationJSON) {
	                var deferred = $q.defer();
	                strata.escalation.create(escalationJSON, function (escalationNum) {
	                    deferred.resolve(escalationNum);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        },
	        reviews: {
	            getCaseNumber: function getCaseNumber(query) {
	                var deferred = $q.defer();
	                strata.reviews.getCaseNumber(query, function (response) {
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            },
	            getSolutionNumber: function getSolutionNumber(query) {
	                var deferred = $q.defer();
	                strata.reviews.getSolutionNumber(query, function (response) {
	                    deferred.resolve(response);
	                }, angular.bind(deferred, errorHandler));
	                return deferred.promise;
	            }
	        }
	    };
	    return service;
	};
	StrataService.$inject = ["$q", "gettextCatalog", "RHAUtils", "CacheFactory", "RESOURCE_TYPES", "CacheUtilsService"];

	exports.default = StrataService;

/***/ },
/* 167 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = ["gettextCatalog", function (gettextCatalog) {
	    'ngInject';

	    return function (str) {
	        return gettextCatalog.getString(str);
	    };
	}];

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var uds = __webpack_require__(179);

	var UdsService = function UdsService() {
	    'ngInject';

	    _classCallCheck(this, UdsService);

	    this.cases = {
	        list: function list(uql, resourceProjection, limit, sortOption, onlyStatus, nepUql) {
	            return uds.fetchCases(uql, resourceProjection, limit, sortOption, onlyStatus, nepUql);
	        },
	        sbrs: function sbrs() {
	            return uds.fetchCaseSbrs();
	        },
	        listTopCases: function listTopCases(queryString) {
	            return uds.fetchTopCasesFromSolr(queryString);
	        },
	        listLanguages: function listLanguages() {
	            return uds.fetchCaseLanguages();
	        }
	    };
	    this.brms = {
	        getResponse: function getResponse(jsonObject) {
	            return uds.getBrmsResponse(jsonObject);
	        }
	    };
	    this.bomgar = {
	        getSessionKey: function getSessionKey(caseId) {
	            return uds.generateBomgarSessionKey(caseId);
	        }
	    };
	    this.kase = {
	        handlingSystem: {
	            set: function set(caseNumber, handlingSystemArray) {
	                return uds.setHandlingSystem(caseNumber, handlingSystemArray);
	            }
	        },
	        details: {
	            get: function get(caseNumber) {
	                return uds.fetchCaseDetails(caseNumber);
	            },
	            put: function put(caseNumber, caseDetails) {
	                return uds.updateCaseDetails(caseNumber, caseDetails);
	            }
	        },
	        nep: {
	            create: function create(caseNumber, nep) {
	                return uds.createCaseNep(caseNumber, nep);
	            },
	            update: function update(caseNumber, nep) {
	                return uds.updateCaseNep(caseNumber, nep);
	            },
	            remove: function remove(caseNumber) {
	                return uds.removeCaseNep(caseNumber);
	            }
	        },
	        associates: {
	            get: function get(uqlContributors) {
	                return uds.fetchCaseAssociateDetails(uqlContributors);
	            },
	            post: function post(caseNumber, sso, roleName) {
	                var jsonAssociates = {
	                    "resource": {
	                        "sso": sso,
	                        "role": roleName
	                    }

	                };
	                return uds.addAssociates(caseNumber, jsonAssociates);
	            },
	            remove: function remove(caseNumber, sso, roleName) {
	                var jsonAssociates = {
	                    "resource": {
	                        "sso": sso,
	                        "role": roleName
	                    }

	                };
	                return uds.deleteAssociates(caseNumber, jsonAssociates);
	            }
	        },
	        comments: {
	            get: function get(caseNumber) {
	                return uds.fetchCaseComments(caseNumber);
	            },
	            post: {
	                private: function _private(caseNumber, commentText, hoursWorked) {
	                    return uds.postPrivateComments(caseNumber, commentText, hoursWorked);
	                },
	                public: function _public(caseNumber, commentText, doNotChangeSbt, hoursWorked) {
	                    return uds.postPublicComments(caseNumber, commentText, doNotChangeSbt, hoursWorked);
	                }
	            },
	            put: {
	                private: function _private(caseNumber, commentText, caseCommentId, draft) {
	                    return uds.postEditPrivateComments(caseNumber, commentText, caseCommentId, draft);
	                },
	                public: function _public(caseNumber, commentText, caseCommentId, draft) {
	                    return uds.postPvtToPubComments(caseNumber, commentText, caseCommentId, draft);
	                }
	            }
	        },
	        history: {
	            get: function get(caseNumber) {
	                return uds.fetchCaseHistory(caseNumber);
	            }
	        },
	        resourceLinks: {
	            get: function get(solutionIdQuery) {
	                return uds.fetchSolutionDetails(solutionIdQuery);
	            },
	            update: function update(caseNumber, resourceLink) {
	                return uds.updateResourceLink(caseNumber, resourceLink);
	            }
	        },
	        lock: {
	            get: function get(caseNumber) {
	                return uds.getlock(caseNumber);
	            },
	            remove: function remove(caseNumber) {
	                return uds.releaselock(caseNumber);
	            }
	        },
	        calls: {
	            get: function get(caseNumber) {
	                return uds.getCallLogsForCase(caseNumber);
	            }
	        },
	        sbt: {
	            get: function get(uql) {
	                return uds.fetchCases(uql, null, null, null, true);
	            }
	        },
	        sbrs: {
	            add: function add(caseNumber, sbrArray) {
	                return uds.addCaseSbrs(caseNumber, sbrArray);
	            },
	            remove: function remove(caseNumber, sbrArray) {
	                return uds.removeCaseSbrs(caseNumber, sbrArray);
	            }
	        },
	        tags: {
	            get: function get() {
	                return uds.getCaseTagsList();
	            },
	            add: function add(caseNumber, tagsArray) {
	                return uds.addCaseTags(caseNumber, tagsArray);
	            },
	            remove: function remove(caseNumber, tagsArray) {
	                return uds.removeCaseTags(caseNumber, tagsArray);
	            }
	        },
	        additionalContacts: {
	            get: function get(caseNumber) {
	                return uds.getAdditionalContacts(caseNumber);
	            },
	            remove: function remove(caseNumber, contacts) {
	                return uds.removeAdditionalContacts(caseNumber, contacts);
	            },
	            put: function put(caseNumber, contacts) {
	                return uds.addAdditionalContacts(caseNumber, contacts);
	            }
	        },
	        owner: {
	            update: function update(caseNumber, ownerSSO) {
	                return uds.updateCaseOwner(caseNumber, ownerSSO);
	            }
	        },
	        attachments: {
	            update: function update(caseNumber, attachmentId, attachmentDetails) {
	                return uds.updateCaseAttachment(caseNumber, attachmentId, attachmentDetails);
	            }
	        }
	    };
	    // This is not to be confused with kase.comments.  This top level comments object allows you to query
	    // /case/comments with custom UQL
	    this.comments = {
	        get: function get(uql) {
	            return uds.fetchComments(uql);
	        }
	    };
	    this.account = {
	        get: function get(accountNumber) {
	            return uds.fetchAccountDetails(accountNumber);
	        },
	        notes: function notes(accountNumber) {
	            return uds.fetchAccountNotes(accountNumber);
	        },
	        openCases: function openCases(uql) {
	            return uds.getOpenCasesForAccount(uql);
	        },
	        avgCSAT: {
	            get: function get(uql) {
	                return uds.getAvgCSATForAccount(uql);
	            }
	        },
	        getCaseContacts: function getCaseContacts(accountNumber) {
	            return uds.getCaseContactsForAccount(accountNumber);
	        },
	        getCaseGroups: function getCaseGroups(contactSSO) {
	            return uds.getCaseGroupsForContact(contactSSO);
	        },
	        rmeCount: {
	            get: function get(uql) {
	                return uds.getRMECountForAccount(uql);
	            }
	        }
	    };
	    this.user = {
	        get: function get(uql, resourceProjection) {
	            return uds.fetchUser(uql, resourceProjection);
	        },
	        details: function details(ssoUsername) {
	            return uds.fetchUserDetails(ssoUsername);
	        },
	        languages: {
	            add: function add(userId, language, type) {
	                return uds.addLanguageToUser(userId, language, type);
	            },
	            remove: function remove(userId, query) {
	                return uds.removeLanguagesFromUser(userId, query);
	            }
	        },
	        tags: {
	            add: function add(userId, tagName) {
	                return uds.addTagToUser(userId, tagName);
	            },
	            remove: function remove(userId, query) {
	                return uds.removeTagsFromUser(userId, query);
	            }
	        },
	        queueBuddies: {
	            setAsQB: function setAsQB(qbUserId, userId) {
	                return uds.addUserAsQB(qbUserId, userId);
	            },
	            remove: function remove(qbUserId, query) {
	                return uds.removeUserQBs(qbUserId, query);
	            }
	        },
	        nnoRegions: {
	            add: function add(userId, nnoRegion) {
	                return uds.addNNOToUser(userId, nnoRegion);
	            },
	            remove: function remove(userId, query) {
	                return uds.removeNNOsFromUser(userId, query);
	            }
	        },
	        virtualOffice: {
	            setGbdSuperRegion: function setGbdSuperRegion(userId, value) {
	                return uds.setGbdSuperRegion(userId, value);
	            }
	        },
	        outOfOffice: {
	            set: function set(userId, value) {
	                return uds.setOutOfOfficeflag(userId, value);
	            }
	        }
	    };
	    this.cqi = {
	        // Run UQL against the CQI endpoint
	        get: function get(uql) {
	            return uds.getCQIs(uql);
	        },
	        questions: {
	            get: function get(caseNumber) {
	                return uds.getCQIQuestions(caseNumber);
	            }
	        },
	        score: {
	            put: function put(caseNumber, reviewData) {
	                return uds.postCQIScore(caseNumber, reviewData);
	            }
	        }
	    };
	    this.reviews = {
	        dependencies: {
	            get: function get() {
	                return uds.getQuestionDependencies();
	            }
	        }
	    };
	    this.solution = {
	        details: {
	            get: function get(solutionNumber, resourceProjection) {
	                return uds.getSolutionDetails(solutionNumber, resourceProjection);
	            }
	        },
	        sqi: {
	            questions: {
	                get: function get(solutionNumber) {
	                    return uds.getSQIQuestions(solutionNumber);
	                }
	            },
	            score: {
	                put: function put(solutionNumber, reviewData) {
	                    return uds.postSQIScore(solutionNumber, reviewData);
	                }
	            },
	            // Run UQL against the SQI endpoint
	            get: function get(uql) {
	                return uds.getSQIs(uql);
	            }
	        },
	        pinSolution: function pinSolution(caseNumber, solutionJson) {
	            return uds.pinSolutionToCase(caseNumber, solutionJson);
	        }
	    };
	    this.sbr = {
	        list: function list(resourceProjection, query) {
	            return uds.getSbrList(resourceProjection, query);
	        },
	        removeUserSbr: function removeUserSbr(userId, query) {
	            return uds.removeUserSbr(userId, query);
	        },
	        user: {
	            put: function put(userId, uql, data) {
	                return uds.postAddUsersToSBR(userId, uql, data);
	            }
	        }
	    };
	    this.roles = {
	        list: function list(query) {
	            return uds.getRoleList(query);
	        },
	        roleDetails: function roleDetails(roleId) {
	            return uds.getRoleDetails(roleId);
	        },
	        listAllRoles: function listAllRoles(query) {
	            return uds.getAllRolesList(query);
	        },
	        createRole: function createRole(roleDetails) {
	            return uds.createRole(roleDetails);
	        },
	        updateRole: function updateRole(roleId, rolePayload) {
	            return uds.updateRole(roleId, rolePayload);
	        },
	        deleteRole: function deleteRole(roleId) {
	            return uds.deleteRole(roleId);
	        },
	        removeUserRole: function removeUserRole(userId, query) {
	            return uds.removeUserRole(userId, query);
	        },
	        postRoleLevel: function postRoleLevel(userId, roleName, roleLevel) {
	            return uds.postRoleLevel(userId, roleName, roleLevel);
	        },
	        user: {
	            put: function put(userId, uql, data) {
	                return uds.postAddUsersToRole(userId, uql, data);
	            },
	            update: function update(userId, role) {
	                return uds.updateUserRole(userId, role);
	            }
	        },
	        templates: {
	            list: function list(query) {
	                return uds.fetchPriorityTemplates(query);
	            }
	        }
	    };
	    this.solr = {
	        access: {
	            get: function get(query) {
	                return uds.fetchSolr(query).then(function (response) {
	                    if (typeof response === 'string') return JSON.parse(response);

	                    return response;
	                });
	            }
	        },
	        cases: {
	            get: function get(query) {
	                return uds.fetchCaseSolr(query).then(function (response) {
	                    if (typeof response === 'string') return JSON.parse(response);

	                    return response;
	                });
	            }
	        }

	    };
	    this.sfdc = {
	        user: {
	            get: function get(userID) {
	                return uds.getUserDetailsFromSFDC(userID);
	            },
	            put: function put(ssoUsername, data) {
	                return uds.updateUserDetailsInSFDC(ssoUsername, data);
	            }
	        },
	        callCenter: {
	            get: function get(callCenterId) {
	                return uds.getCallCenterFromSFDC(callCenterId);
	            }
	        }
	    };
	};

	exports.default = UdsService;

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Services

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _rhaUtils = __webpack_require__(165);

	var _rhaUtils2 = _interopRequireDefault(_rhaUtils);

	var _translate = __webpack_require__(167);

	var _translate2 = _interopRequireDefault(_translate);

	var _trust = __webpack_require__(158);

	var _trust2 = _interopRequireDefault(_trust);

	var _enter = __webpack_require__(150);

	var _enter2 = _interopRequireDefault(_enter);

	var _resizable = __webpack_require__(154);

	var _resizable2 = _interopRequireDefault(_resizable);

	var _choice = __webpack_require__(148);

	var _choice2 = _interopRequireDefault(_choice);

	var _optionsDisabled = __webpack_require__(153);

	var _optionsDisabled2 = _interopRequireDefault(_optionsDisabled);

	var _choicetree = __webpack_require__(149);

	var _choicetree2 = _interopRequireDefault(_choicetree);

	var _treeViewSelectorData = __webpack_require__(156);

	var _treeViewSelectorData2 = _interopRequireDefault(_treeViewSelectorData);

	var _treeViewSelectorUtils = __webpack_require__(157);

	var _treeViewSelectorUtils2 = _interopRequireDefault(_treeViewSelectorUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Define the ui-utils module


	// Factories


	// Filters
	var app = angular.module('RedhatAccess.ui-utils', ['gettext']);

	// Services


	// Directives
	app.service('RHAUtils', _rhaUtils2.default);
	app.service('translate', _translate2.default);

	// Filters
	app.filter('trust_html', _trust2.default);

	// Directives
	app.directive('rhaChoicetree', _choicetree2.default);
	app.directive('optionsDisabled', _optionsDisabled2.default);
	app.directive('rhaChoice', _choice2.default);
	app.directive('rhaResizable', _resizable2.default);
	app.directive('rhaEnter', _enter2.default);

	// Factories
	app.factory('TreeViewSelectorData', _treeViewSelectorData2.default);
	app.factory('TreeViewSelectorUtils', _treeViewSelectorUtils2.default);

	exports.default = app.name;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function webpackUniversalModuleDefinition(root, factory) {
	    if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["hydrajs"] = factory();else root["hydrajs"] = factory();
	})(undefined, function () {
	    return (/******/function (modules) {
	            // webpackBootstrap
	            /******/ // The module cache
	            /******/var installedModules = {};
	            /******/
	            /******/ // The require function
	            /******/function __webpack_require__(moduleId) {
	                /******/
	                /******/ // Check if module is in cache
	                /******/if (installedModules[moduleId]) {
	                    /******/return installedModules[moduleId].exports;
	                    /******/
	                }
	                /******/ // Create a new module (and put it into the cache)
	                /******/var module = installedModules[moduleId] = {
	                    /******/i: moduleId,
	                    /******/l: false,
	                    /******/exports: {}
	                    /******/ };
	                /******/
	                /******/ // Execute the module function
	                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	                /******/
	                /******/ // Flag the module as loaded
	                /******/module.l = true;
	                /******/
	                /******/ // Return the exports of the module
	                /******/return module.exports;
	                /******/
	            }
	            /******/
	            /******/
	            /******/ // expose the modules object (__webpack_modules__)
	            /******/__webpack_require__.m = modules;
	            /******/
	            /******/ // expose the module cache
	            /******/__webpack_require__.c = installedModules;
	            /******/
	            /******/ // define getter function for harmony exports
	            /******/__webpack_require__.d = function (exports, name, getter) {
	                /******/if (!__webpack_require__.o(exports, name)) {
	                    /******/Object.defineProperty(exports, name, {
	                        /******/configurable: false,
	                        /******/enumerable: true,
	                        /******/get: getter
	                        /******/ });
	                    /******/
	                }
	                /******/
	            };
	            /******/
	            /******/ // getDefaultExport function for compatibility with non-harmony modules
	            /******/__webpack_require__.n = function (module) {
	                /******/var getter = module && module.__esModule ?
	                /******/function getDefault() {
	                    return module['default'];
	                } :
	                /******/function getModuleExports() {
	                    return module;
	                };
	                /******/__webpack_require__.d(getter, 'a', getter);
	                /******/return getter;
	                /******/
	            };
	            /******/
	            /******/ // Object.prototype.hasOwnProperty.call
	            /******/__webpack_require__.o = function (object, property) {
	                return Object.prototype.hasOwnProperty.call(object, property);
	            };
	            /******/
	            /******/ // __webpack_public_path__
	            /******/__webpack_require__.p = "";
	            /******/
	            /******/ // Load entry module and return exports
	            /******/return __webpack_require__(__webpack_require__.s = 8);
	            /******/
	        }(
	        /************************************************************************/
	        /******/[
	        /* 0 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";
	            /* WEBPACK VAR INJECTION */
	            (function (process) {
	                Object.defineProperty(exports, "__esModule", { value: true });
	                // Since we aren't transpiling to babel can't use ES6 imports here
	                var Uri = __webpack_require__(11);
	                var btoa = __webpack_require__(12);
	                function createBasicAuth(user, pass) {
	                    return "Basic " + btoa(user + ':' + pass);
	                }
	                exports.createBasicAuth = createBasicAuth;
	                var hydraHostName = new Uri('');
	                var pcmHostName = new Uri('');
	                var hydraFSHostName = new Uri('');
	                var pathPrefix = '/hydra/rest';
	                var fsPathPrefix = '/hydrafs/rest';
	                var auth = null;
	                // Add any new services consuming hydrajs to below arrays
	                var prodHostNames = ['access.redhat.com', 'prod.foo.redhat.com', 'fooprod.redhat.com', 'skedge.redhat.com'];
	                var qaHostNames = ['access.qa.redhat.com', 'qa.foo.redhat.com', 'fooqa.redhat.com', 'skedge.qa.redhat.com'];
	                var fteHostNames = ['access.devgssfte.devlab.phx1.redhat.com', 'fte.foo.redhat.com', 'foofte.redhat.com'];
	                var ciHostNames = ['access.devgssci.devlab.phx1.redhat.com', 'ci.foo.redhat.com', 'fooci.redhat.com', 'skedge.ci.redhat.com'];
	                var stageHostNames = ['access.stage.redhat.com', 'stage.foo.redhat.com', 'foostage.redhat.com', 'skedge.stage.redhat.com'];
	                if (process && Object({ "NODE_ENV": "production" }) && Object({ "NODE_ENV": "production" }).RHN_USER) {
	                    auth = createBasicAuth(Object({ "NODE_ENV": "production" }).RHN_USER, Object({ "NODE_ENV": "production" }).RHN_PASS);
	                }
	                if (process && Object({ "NODE_ENV": "production" }) && (Object({ "NODE_ENV": "production" }).HYDRA_HOSTNAME || Object({ "NODE_ENV": "production" }).PCM_HOSTNAME)) {
	                    if (Object({ "NODE_ENV": "production" }).HYDRA_HOSTNAME) hydraHostName = new Uri(Object({ "NODE_ENV": "production" }).HYDRA_HOSTNAME);
	                    if (Object({ "NODE_ENV": "production" }).PCM_HOSTNAME) pcmHostName = new Uri(Object({ "NODE_ENV": "production" }).PCM_HOSTNAME);
	                    if (Object({ "NODE_ENV": "production" }).HYDRA_FS_HOSTNAME) hydraFSHostName = new Uri(Object({ "NODE_ENV": "production" }).HYDRA_FS_HOSTNAME);
	                } else if (typeof window !== 'undefined' && window) {
	                    if (prodHostNames.indexOf(window.location.hostname) !== -1) {
	                        hydraHostName = new Uri('https://access.redhat.com/hydra/rest/');
	                        pcmHostName = hydraHostName;
	                        hydraFSHostName = new Uri('https://access.redhat.com/hydrafs/rest');
	                        fsPathPrefix = '/hydrafs/rest';
	                    } else if (qaHostNames.indexOf(window.location.hostname) !== -1) {
	                        hydraHostName = new Uri('https://access.qa.redhat.com/hydra/rest/');
	                        pcmHostName = hydraHostName;
	                        hydraFSHostName = new Uri('https://hydra.fs.dev.redhat.com/hydra/rest/');
	                        fsPathPrefix = pathPrefix;
	                    } else if (fteHostNames.indexOf(window.location.hostname) !== -1) {
	                        hydraHostName = new Uri('https://access.devgssfte.devlab.phx1.redhat.com/hydra/rest/');
	                        pcmHostName = hydraHostName;
	                    } else if (ciHostNames.indexOf(window.location.hostname) !== -1) {
	                        // There is no Hydra CI
	                        pcmHostName = new Uri('https://hydraadmin-corp-dev-redhat-com.vserver.devlab.ext.phx1.redhat.com/hydra/rest/');
	                    } else if (stageHostNames.indexOf(window.location.hostname) !== -1) {
	                        hydraHostName = new Uri('https://access.stage.redhat.com/hydra/rest/');
	                        pcmHostName = hydraHostName;
	                        hydraFSHostName = new Uri('https://hydra-fs.ext.paas.stage.redhat.com/hydra/rest/');
	                        fsPathPrefix = pathPrefix;
	                    }
	                } else {
	                    throw new Error('Could not determine hostname, if you are running in Node make sure to set the HYDRA_HOSTNAME, PCM_HOSTNAME, RHN_USER, and RHN_PASS env variables.');
	                }
	                var Env = /** @class */function () {
	                    function Env() {}
	                    Env.hydraHostName = hydraHostName;
	                    Env.pcmHostName = pcmHostName;
	                    Env.hydraFSHostName = hydraFSHostName;
	                    Env.pathPrefix = pathPrefix;
	                    Env.fsPathPrefix = fsPathPrefix;
	                    Env.auth = auth;
	                    return Env;
	                }();
	                exports.default = Env;

	                /* WEBPACK VAR INJECTION */
	            }).call(exports, __webpack_require__(10));

	            /***/
	        },
	        /* 1 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            // Since we aren't transpiling to babel can't use ES6 imports here.  Also we can't specify the Response and Request
	            // types for fetch since A) They happen automatically with import which we can't use and B) the reference paths would
	            // be different in downstream apps
	            var env_1 = __webpack_require__(0);
	            function errorHandler(response) {
	                return response.text().then(function (body) {
	                    if (body == null || body === '') {
	                        var error = new Error(body);
	                        Object.assign(error, { status: response.status }, { statusText: response.statusText });
	                        throw error;
	                    }
	                    var parsedError;
	                    try {
	                        parsedError = JSON.parse(body);
	                    } catch (e) {}
	                    if (parsedError) {
	                        var error = new Error(parsedError && parsedError.message || body);
	                        Object.assign(error, parsedError, { isHydraError: true }, { status: response.status }, { statusText: response.statusText });
	                        throw error;
	                    } else {
	                        var error = new Error(body);
	                        Object.assign(error, { status: response.status }, { statusText: response.statusText });
	                        throw error;
	                    }
	                });
	            }
	            function getIsTokenExpired() {
	                if (window.sessionjs && window.sessionjs.isTokenExpired) {
	                    return window.sessionjs.isTokenExpired;
	                } else {
	                    // For PCM we use the below line because in sessionjs we don't get the isTokenExpired() function directly
	                    // also it throws an error in PCM - window.sessionjs.isTokenExpired() is not a function
	                    if (window.sessionjs && window.sessionjs._state && window.sessionjs._state.keycloak) {
	                        return window.sessionjs._state.keycloak.isTokenExpired;
	                    }
	                }
	            }
	            // If the token is expiring within 30 seconds, go ahead and refresh it.  Using 30 seconds considering jwt.js checks if
	            // the token needs to be refreshed every 58 seconds with a TTE of 90 seconds.  So 30 seconds guarantees that
	            // we are at the boundary of what jwt.js does without overlapping a great deal
	            function isTokenExpired() {
	                var _isTokenExpired = getIsTokenExpired();
	                return _isTokenExpired(30);
	            }
	            function forceTokenRefresh() {
	                var _isTokenExpired = getIsTokenExpired();
	                console.warn("Hydrajs detected the JWT token has expired, forcing an update");
	                return new Promise(function (resolve, reject) {
	                    // updateToken(true) forces the token to update by passing -1 to keycloak.updateToken
	                    window.sessionjs.updateToken(true).then(function (refreshed) {
	                        if (refreshed) {
	                            resolve(true);
	                        } else if (!refreshed && !_isTokenExpired(0)) {
	                            resolve(true);
	                        } else if (!refreshed && _isTokenExpired(0)) {
	                            reject(new Error("Token not refreshed and is expired."));
	                        }
	                    }).catch(function (e) {
	                        reject(e);
	                    });
	                });
	            }
	            function getToken() {
	                if (window.sessionjs && window.sessionjs._state.keycloak.token) {
	                    if (window.sessionjs.isAuthenticated()) {
	                        return "Bearer " + window.sessionjs._state.keycloak.token;
	                    }
	                }
	                return null;
	            }
	            function responseHandler(response, dataType) {
	                if (response.status === 204) {
	                    return null;
	                } else if (response.status === 200 || response.status === 201) {
	                    return response.clone().text().then(function (body) {
	                        if (body == null || body === '') return null;
	                        if (dataType === 'text') return body;
	                        // Safari must implement the fetch API differently than Chrome/FF as Safari doesn't like the response to
	                        // ever be cloned.  Therefore, if the clone fails here, we can just return the response.json()
	                        try {
	                            return response.clone().json().catch(function (e) {
	                                // The only possible error here is either response is null or parsing json fails.  Both of which
	                                // we just want to return the response, which would either be null or the actual api error
	                                return errorHandler(response);
	                            });
	                        } catch (e) {
	                            return response.json().catch(function (e) {
	                                // The only possible error here is either response is null or parsing json fails.  Both of which
	                                // we just want to return the response, which would either be null or the actual api error
	                                return errorHandler(response);
	                            });
	                        }
	                    });
	                } else {
	                    return errorHandler(response);
	                }
	            }
	            function getSecondsElapsed(previousTime) {
	                return (new Date().getTime() - previousTime) / 1000;
	            }
	            // Once Hydra goes to the Managed Platform then we may be able to remove this as the MP will have an 80s timeout for all requests.
	            function handleLongRunningRequest(uri, params, secondsElapsed) {
	                if (secondsElapsed > 60) {
	                    // Raven
	                    if (typeof window.Raven !== 'undefined' && typeof window.Raven.captureException === 'function') {
	                        window.Raven.captureException(new Error("Hydra long running request, seconds taken: " + secondsElapsed), {
	                            extra: {
	                                secondsElapsed: secondsElapsed,
	                                url: uri.toString(),
	                                params: params
	                            }
	                        });
	                    }
	                }
	            }
	            function isError(error) {
	                return error && error.message != null;
	            }
	            function processCaughtError(uri, params, error) {
	                try {
	                    if (isError(error)) {
	                        error.extra = {
	                            url: uri.toString(),
	                            params: params
	                        };
	                    }
	                } catch (e) {}
	            }
	            function callFetchAndHandleJwt(uri, params, dataType, externalUrl) {
	                if (!externalUrl) {
	                    if (env_1.default.auth) {
	                        params.headers['Authorization'] = env_1.default.auth;
	                    } else if (getToken()) {
	                        params.headers['Authorization'] = getToken();
	                    } else {
	                        var error = new Error("Could not set JWT token on request header, unauthenticated.");
	                        Object.assign(error, { status: 401 }, { statusText: 'Unauthorized' });
	                        throw error;
	                    }
	                }
	                return new Promise(function (resolve, reject) {
	                    var start;
	                    if (!env_1.default.auth && isTokenExpired()) {
	                        forceTokenRefresh().then(function () {
	                            if (!externalUrl) {
	                                params.headers['Authorization'] = getToken();
	                            }
	                            start = new Date().getTime();
	                            if (dataType) {
	                                fetch(uri.toString(), params).then(function (response) {
	                                    return responseHandler(response, dataType);
	                                }).then(function (output) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    resolve(output);
	                                }).catch(function (error) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    processCaughtError(uri, params, error);
	                                    reject(error);
	                                });
	                            } else {
	                                fetch(uri.toString(), params).then(responseHandler).then(function (output) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    resolve(output);
	                                }).catch(function (error) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    processCaughtError(uri, params, error);
	                                    reject(error);
	                                });
	                            }
	                        }).catch(function () {
	                            start = new Date().getTime();
	                            // Even if there was an error updating the token, we still need to hit Hydra, which at this point would probably return the "JWT expired" though this edge case is very unlikely.
	                            if (dataType) {
	                                fetch(uri.toString(), params).then(function (response) {
	                                    return responseHandler(response, dataType);
	                                }).then(function (output) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    resolve(output);
	                                }).catch(function (error) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    processCaughtError(uri, params, error);
	                                    reject(error);
	                                });
	                            } else {
	                                fetch(uri.toString(), params).then(responseHandler).then(function (output) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    resolve(output);
	                                }).catch(function (error) {
	                                    handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                    processCaughtError(uri, params, error);
	                                    reject(error);
	                                });
	                            }
	                        });
	                    } else {
	                        start = new Date().getTime();
	                        // Else we have a valid token and continue as always.
	                        if (dataType) {
	                            fetch(uri.toString(), params).then(function (response) {
	                                return responseHandler(response, dataType);
	                            }).then(function (output) {
	                                handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                resolve(output);
	                            }).catch(function (error) {
	                                handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                processCaughtError(uri, params, error);
	                                reject(error);
	                            });
	                        } else {
	                            fetch(uri.toString(), params).then(responseHandler).then(function (output) {
	                                handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                resolve(output);
	                            }).catch(function (error) {
	                                handleLongRunningRequest(uri, params, getSecondsElapsed(start));
	                                processCaughtError(uri, params, error);
	                                reject(error);
	                            });
	                        }
	                    }
	                });
	            }
	            function getUri(uri, headerParams, dataType, externalUrl) {
	                var params = {
	                    method: 'GET',
	                    headers: {}
	                };
	                if (headerParams !== undefined) {
	                    headerParams.forEach(function (element) {
	                        params.headers[element.key] = element.value;
	                    });
	                }
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.getUri = getUri;
	            function postUri(uri, body, dataType, externalUrl) {
	                var params = {
	                    method: 'POST',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify(body)
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.postUri = postUri;
	            function postFormUri(uri, formData, dataType, externalUrl) {
	                var params = {
	                    method: 'POST',
	                    credentials: 'include',
	                    headers: {
	                        'Accept': 'application/json'
	                    },
	                    body: formData
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.postFormUri = postFormUri;
	            function putUri(uri, body, dataType, externalUrl) {
	                var params = {
	                    method: 'PUT',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify(body)
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                if (externalUrl) return callFetchAndHandleJwt(uri, params, undefined, externalUrl);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.putUri = putUri;
	            function patchUri(uri, body, dataType) {
	                var params = {
	                    method: 'PATCH',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify(body)
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.patchUri = patchUri;
	            function deleteUri(uri, dataType) {
	                var params = {
	                    method: 'DELETE',
	                    headers: {
	                        'Content-Type': 'application/json'
	                    }
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.deleteUri = deleteUri;
	            function deleteUriWithBody(uri, body, dataType) {
	                var params = {
	                    method: 'DELETE',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify(body)
	                };
	                if (dataType) return callFetchAndHandleJwt(uri, params, dataType);
	                return callFetchAndHandleJwt(uri, params);
	            }
	            exports.deleteUriWithBody = deleteUriWithBody;

	            /***/
	        },
	        /* 2 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getUserFields(options) {
	                var finalFields = [];
	                if (options && options.minimal === true) {
	                    var fields = ['id', 'email', 'fullName', 'fullTitle', 'inGSS', 'isActive', 'managerId', 'mobilePhone', 'outOfOffice', 'phone', 'rhatLocation', 'region', 'ssoUsername', 'superRegion', 'title', 'isManager', 'timeZone'];
	                    Array.prototype.push.apply(finalFields, fields);
	                } else {
	                    var fields = ['id', 'accountId', 'accountNumber', 'callCenterId', 'contactId', 'contactNumber', 'email', 'firstName', 'firstNameCustom', 'fullName', 'fullTitle', 'gssCostcenterName', 'genesysUsername', 'ircNick', 'itarUser', 'inGSS', 'isActive', 'kerberosName', 'lastName', 'lastNameCustom', 'managerId', 'mobilePhone', 'name', 'officeLocation', 'outOfOffice', 'phone', 'rhatLocation', 'redhatComEmailAddress', 'region', 'ssoUsername', 'superRegion', 'title', 'userName', 'bomgarUsername', 'canWorkNightShift', 'isManager', 'timeZone', 'userRoleId'];
	                    Array.prototype.push.apply(finalFields, fields);
	                }
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['aboutMe', 'alias', 'city', 'country', 'countryCustom', 'explicitKerberosName',
	                    // 'firstLevelManagerUsername',
	                    'fourthLevelManagerUsername', 'managerSID', 'outOfOfficeChangedBy', 'outOfOfficeChangedOn', 'secondLevelManagerUsername', 'sixthLevelManagerUsername', 'thirdLevelManagerUsername', 'virtualOffice'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                return finalFields;
	            }
	            exports.getUserFields = getUserFields;

	            /***/
	        },
	        /* 3 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getContactFields(options) {
	                var finalFields = [];
	                if (options && options.minimal === true) {
	                    var fields = ['id', 'isOrgAdmin', 'ssoUsername', 'accountId', 'email', 'fullNameCustom', 'isActive', 'phone', 'timezone', 'regionGeo'];
	                    Array.prototype.push.apply(finalFields, fields);
	                } else {
	                    var fields = ['firstName', 'lastName', 'isOrgAdmin', 'ssoUsername', 'id', 'accountId', 'email', 'fullNameCustom', 'isActive', 'phone', 'timezone', 'isInternal', 'canAddAttachments', 'contact24x7', 'contactNumber', 'defaultCaseGroup', 'doNotCall', 'firstNameCustom', 'itarContact', 'isEntitled', 'lastNameCustom', 'manageSupportCases', 'mobilePhone', 'name', 'normalizedTZ', 'preferredLanguage', 'preferredMethodOfContact', 'rhnLoginName', 'regionGeo', 'reportsToId', 'srmContact', 'secureSupportTech', 'tamContact', 'title'];
	                    Array.prototype.push.apply(finalFields, fields);
	                }
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['hasOptedOutOfEmail', 'homePhone', 'npsEligibility', 'noLongerAtCompany', 'otherPhone', 'primaryComment', 'primaryScore', 'salutation', 'surveyOptOut', 'tamNewsletterSubscription', 'typeOfContact'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                return finalFields;
	            }
	            exports.getContactFields = getContactFields;

	            /***/
	        },
	        /* 4 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getCaseGroupFields() {
	                var fields = ['id',
	                // accountId field not found
	                // 'accountId',
	                // 'accountDetails',
	                // 'createdBy',
	                'createdById', 'createdDate', 'folderNumber',
	                // 'lastModifiedBy',
	                'lastModifiedById', 'lastModifiedDate', 'name', 'noAutomationForCases',
	                // 'owner',
	                'ownerId', 'isPrivate'];
	                return fields;
	            }
	            exports.getCaseGroupFields = getCaseGroupFields;

	            /***/
	        },
	        /* 5 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getBugzillaBugFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'assignedTo', 'blocks2', 'blocks', 'bugzillaURL', 'bugzillaKeywords', 'bugzillaLink', 'bugzillaNumber', 'caseNumber', 'linkedAt', 'component', 'createdById', 'createdDate', 'dependsOn', 'depends', 'description', 'dupeOf', 'groups', 'isOpen', 'isPrivate', 'lastModifiedById', 'lastModifiedDate', 'name', 'platform', 'priority', 'product', 'resolution', 'severity', 'status', 'summary', 'version'];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = [];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getBugzillaBugFields = getBugzillaBugFields;

	            /***/
	        },
	        /* 6 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getAccountFields(options) {
	                var finalFields = [];
	                var fields = ['accountId', 'accountNumber', 'accountStatus', 'businessHoursId', 'cannotAddAttachments', 'csm', 'gscsmSegment', 'caseCount', 'escalationsInLast30Days', 'description', 'escalateToHomeGeoWith1stTouch', 'escalateToHomeGeoWithoutFirstTouch', 'expectsQuickInitialResponse', 'hardwarePartner', 'hasAvailableEnhancedSLA', 'hasEnhancedSLA', 'holdSupport', 'identifyingAddressCountry', 'identifyingAddressSuperRegion', 'isPartner', 'isActive', 'name', 'noAutomationForCases', 'ownerId', 'responseTime', 'secureSupport', 'securedEnvironment', 'specialHandlingRequired', 'strategic', 'superRegion', 'supportPartner', 'tactical', 'totalNumberOfEscalations', 'watchlist', 'hasSRM', 'hasTAM', 'isInternal', 'informManagement'];
	                // owner: IUser;
	                // csmUser: IUser;
	                // parent: IAccount;
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['accountKey', 'accountAlias', 'additionalEnhancedEntitlementCount', 'customerSegment', 'csmUserId', 'escalationsInLast60Days', 'hasGroupACLs', 'npsScore', 'parentId', 'requireCGroupOnCreate', 'remainingEnhancedEntitlementCases'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeApiSpecificFields) {
	                    var apiFields = ['csmUserName', 'csmUserSSOName', 'escalationsInLast30DaysApi', 'hasChat'];
	                    Array.prototype.push.apply(finalFields, apiFields);
	                }
	                if (options && options.includeCsmUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "csmUser." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getAccountFields = getAccountFields;
	            function getAccountNoteFields(options) {
	                var finalFields = [];
	                var fields = ['body', 'numberOfDaysReviewPending', 'reasonForReview', 'isRetired', 'subject', 'type', 'name', 'lastModifiedDate', 'createdDate'];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['accountId', 'accountIdentifier', 'isEditable', 'expiryDate', 'expirySetBy', 'intendedReviewDate', 'lastReviewDate', 'needsReview', 'needsReviewByAuthor', 'noteAuthor', 'retireDate', 'retiredBy', 'createdById', 'lastModifiedById', 'sortedType'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getAccountNoteFields = getAccountNoteFields;
	            function getAccountMemberFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'createdById', 'createdDate', 'lastModifiedDate', 'name', 'role'
	                // 'createdBy: IUser;
	                // 'lastModifiedBy: IUser;
	                // 'account: IAccount;
	                // 'member: IUser;
	                ];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['ownerId', 'isDeleted', 'isAddToCaseTeam', 'isEmailOnUpdates', 'minimumSeverity', 'isNotifyOfNewCases', 'tamCaseStatus'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                if (options && options.includeMember) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "member." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getAccountMemberFields = getAccountMemberFields;

	            /***/
	        },
	        /* 7 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getProductFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'productCode', 'name', 'productFamily', 'productNumber', 'currentlySupported'];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['ownerId', 'isDeleted', 'createdDate', 'createdById', 'lastModifiedDate', 'lastModifiedById', 'systemModstamp', 'lastViewedDate', 'lastReferencedDate', 'connectionReceivedId', 'connectionSentId', 'endOfLifeDate', 'supportedDate', 'doesNotRequireSupportedEntitlement'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeOwner) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "owner." + f;
	                    }));
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getProductFields = getProductFields;

	            /***/
	        },
	        /* 8 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var insights_1 = __webpack_require__(9);
	            var roleMetadata_1 = __webpack_require__(13);
	            var testClass_1 = __webpack_require__(14);
	            var general_1 = __webpack_require__(15);
	            var kyce_1 = __webpack_require__(16);
	            var businessHours_1 = __webpack_require__(17);
	            var tags_1 = __webpack_require__(18);
	            var brms_1 = __webpack_require__(19);
	            var user_1 = __webpack_require__(2);
	            var contact_1 = __webpack_require__(3);
	            var case_1 = __webpack_require__(20);
	            var caseGroup_1 = __webpack_require__(4);
	            var bomgar_1 = __webpack_require__(23);
	            var caseHistory_1 = __webpack_require__(24);
	            var escalation_1 = __webpack_require__(25);
	            var chat_1 = __webpack_require__(26);
	            var bugzilla_1 = __webpack_require__(5);
	            var product_1 = __webpack_require__(7);
	            var externalTracker_1 = __webpack_require__(27);
	            var view_1 = __webpack_require__(28);
	            var account_1 = __webpack_require__(29);
	            var comment_1 = __webpack_require__(30);
	            var user_2 = __webpack_require__(31);
	            var kcs_1 = __webpack_require__(32);
	            var case_2 = __webpack_require__(33);
	            var attachment_1 = __webpack_require__(34);
	            var shiftMetadata_1 = __webpack_require__(35);
	            var templateMetadata_1 = __webpack_require__(36);
	            var vendorProduct_1 = __webpack_require__(37);
	            var certification_1 = __webpack_require__(38);
	            var hive_1 = __webpack_require__(39);
	            var certificationTest_1 = __webpack_require__(40);
	            var userShifts_1 = __webpack_require__(41);
	            var groupMetadata_1 = __webpack_require__(42);
	            var counts_1 = __webpack_require__(43);
	            var review_1 = __webpack_require__(44);
	            var products_1 = __webpack_require__(45);
	            var sbrs_1 = __webpack_require__(46);
	            var externalTrackers_1 = __webpack_require__(47);
	            var solr_1 = __webpack_require__(48);
	            var account_2 = __webpack_require__(49);
	            var callCenters_1 = __webpack_require__(50);
	            var commentFeedback_1 = __webpack_require__(51);
	            var roles_1 = __webpack_require__(52);
	            var vocabulary_1 = __webpack_require__(53);
	            var maintenance_1 = __webpack_require__(54);
	            var account_3 = __webpack_require__(6);
	            var comment_2 = __webpack_require__(55);
	            var metadata_1 = __webpack_require__(56);
	            var successPlan_1 = __webpack_require__(57);
	            var account_4 = __webpack_require__(58);
	            var cta_1 = __webpack_require__(59);
	            var timeline_1 = __webpack_require__(60);
	            var contact_2 = __webpack_require__(61);
	            exports.default = {
	                general: {
	                    health: general_1.health,
	                    hostname: general_1.hostname
	                },
	                kase: {
	                    getComments: comment_1.getComments,
	                    upsertComment: comment_1.upsertComment,
	                    getCase: case_2.getCase,
	                    getCases: case_2.getCases,
	                    updateCase: case_2.updateCase,
	                    updateCaseByInternal: case_2.updateCaseByInternal,
	                    getLinkedJiras: case_2.getLinkedJiras,
	                    linkJiraToCase: case_2.linkJiraToCase,
	                    deleteJiraLinkFromCase: case_2.deleteJiraLinkFromCase,
	                    counts: {
	                        allCounts: counts_1.allCounts,
	                        articlesLinked: counts_1.articlesLinked,
	                        bomgarSessions: counts_1.bomgarSessions,
	                        bugzillas: counts_1.bugzillas,
	                        caseHistory: counts_1.caseHistory,
	                        chatTranscripts: counts_1.chatTranscripts,
	                        comments: counts_1.comments,
	                        escalationsClosed: counts_1.escalationsClosed,
	                        escalationsOpen: counts_1.escalationsOpen,
	                        fileAttachments: counts_1.fileAttachments,
	                        jiras: counts_1.jiras,
	                        solutionsLinked: counts_1.solutionsLinked,
	                        teamMembers: counts_1.teamMembers,
	                        reviews: counts_1.reviews,
	                        testPlan: counts_1.testPlan,
	                        testResult: counts_1.testResult
	                    },
	                    attachments: {
	                        uploadAttachment: attachment_1.uploadAttachment,
	                        getAttachments: attachment_1.getAttachments
	                    },
	                    getLanguages: case_2.getLanguages,
	                    getCaseSbrs: case_2.getCaseSbrs,
	                    getCaseTags: case_2.getCaseTags,
	                    updateCaseTags: case_2.updateCaseTags,
	                    deleteCaseTags: case_2.deleteCaseTags,
	                    getSeverities: case_2.getSeverities,
	                    getStatuses: case_2.getStatuses,
	                    getTypes: case_2.getTypes,
	                    getCaseExternalTrackers: case_2.getCaseExternalTrackers,
	                    getCaseExternalTrackerUpdates: case_2.getCaseExternalTrackerUpdates,
	                    getCaseContacts: case_2.getCaseContacts,
	                    addCaseContacts: case_2.addCaseContacts,
	                    deleteCaseContacts: case_2.deleteCaseContacts,
	                    getAccountCaseGroups: case_2.getAccountCaseGroups,
	                    getCaseHistory: case_2.getCaseHistory,
	                    getAssociates: case_2.getAssociates,
	                    addAssociate: case_2.addAssociate,
	                    deleteAssociate: case_2.deleteAssociate,
	                    updateOwner: case_2.updateOwner,
	                    getLockedCases: case_2.getLockedCases,
	                    lockCase: case_2.lockCase,
	                    unlockCase: case_2.unlockCase,
	                    getBomgarSessionKey: case_2.getBomgarSessionKey,
	                    getNep: case_2.getNep,
	                    createNep: case_2.createNep,
	                    updateNep: case_2.updateNep,
	                    deleteNep: case_2.deleteNep,
	                    getAttachments: case_2.getAttachments,
	                    updateAttachment: case_2.updateAttachment,
	                    getBomgarSessions: case_2.getBomgarSessions,
	                    updateCaseSbrs: case_2.updateCaseSbrs,
	                    deleteCaseSbrs: case_2.deleteCaseSbrs,
	                    getMilestones: case_2.getMilestones,
	                    getChatTranscripts: case_2.getChatTranscripts,
	                    getBugs: case_2.getBugs,
	                    getCasesFromSoql: case_2.getCasesFromSoql
	                },
	                insights: {
	                    runInsights: insights_1.runInsights,
	                    getInsightsRules: insights_1.getInsightsRules
	                },
	                brms: {
	                    getBrmsResponse: brms_1.getBrmsResponse
	                },
	                skedge: {
	                    getAllShiftMetadatas: shiftMetadata_1.getAllShiftMetadatas,
	                    createShiftMetadata: shiftMetadata_1.createShiftMetadata,
	                    updateShiftMetadata: shiftMetadata_1.updateShiftMetadata,
	                    deleteShiftMetadata: shiftMetadata_1.deleteShiftMetadata,
	                    getAllRoleMetadatas: roleMetadata_1.getAllRoleMetadatas,
	                    getAllTemplateMetadatas: templateMetadata_1.getAllTemplateMetadatas,
	                    getTemplateMetadatasForUser: templateMetadata_1.getTemplateMetadatasForUser,
	                    postCustomTemplateForUser: templateMetadata_1.postCustomTemplateForUser,
	                    getAllShiftsForUsers: userShifts_1.getAllShiftsForUsers,
	                    getShiftsForUserFilters: userShifts_1.getShiftsForUserFilters,
	                    postShiftsForUsers: userShifts_1.postShiftsForUsers,
	                    editShiftForUser: userShifts_1.editShiftForUser,
	                    deleteShiftByShiftId: userShifts_1.deleteShiftByShiftId,
	                    deleteShiftForUsers: userShifts_1.deleteShiftForUsers,
	                    getAllGroupMetadatas: groupMetadata_1.getAllGroupMetadatas,
	                    getGroupsForOwner: groupMetadata_1.getGroupsForOwner,
	                    postGroupDetails: groupMetadata_1.postGroupDetails,
	                    updateGroupDetails: groupMetadata_1.updateGroupDetails,
	                    deleteGroupByGroupId: groupMetadata_1.deleteGroupByGroupId
	                },
	                certification: {
	                    createHardwareCertification: certification_1.createHardwareCertification,
	                    updateHardwareCertification: certification_1.updateHardwareCertification,
	                    getCaseNumberFromPortalId: certification_1.getCaseNumberFromPortalId,
	                    getHardwareCertification: certification_1.getHardwareCertification,
	                    createOpenStackCertification: certification_1.createOpenStackCertification,
	                    updateOpenStackCertification: certification_1.updateOpenStackCertification,
	                    getOpenStackCertification: certification_1.getOpenStackCertification,
	                    getOpenStackApi: certification_1.getOpenStackApi,
	                    getOpenStackFeature: certification_1.getOpenStackFeature,
	                    getOpenStackProtocol: certification_1.getOpenStackProtocol,
	                    getOpenStackVendorProduct: vendorProduct_1.getOpenStackVendorProduct,
	                    updateOpenStackVendorProduct: vendorProduct_1.updateOpenStackVendorProduct,
	                    getTestClasses: testClass_1.getTestClasses,
	                    getOpenStackVendorProductComponents: vendorProduct_1.getOpenStackVendorProductComponents,
	                    getCertificationTestPlan: certificationTest_1.getCertificationTestPlan,
	                    updateCertificationTestPlanComponent: certificationTest_1.updateCertificationTestPlanComponent,
	                    updateCertificationTestPlanItem: certificationTest_1.updateCertificationTestPlanItem,
	                    updateCertificationExceptionReason: certificationTest_1.updateCertificationExceptionReason,
	                    getCertificationTestResults: certificationTest_1.getCertificationTestResults,
	                    getCertificationTestLog: certificationTest_1.getCertificationTestLog,
	                    getCertificationSubTestLog: certificationTest_1.getCertificationSubTestLog,
	                    updateResultReview: certificationTest_1.updateResultReview,
	                    updateSubTestStatus: certificationTest_1.updateSubTestStatus
	                },
	                hive: {
	                    getAll: hive_1.getAll,
	                    getProgram: hive_1.getProgram,
	                    getPrograms: hive_1.getPrograms,
	                    getRedHatProduct: hive_1.getRedHatProduct,
	                    getRedHatProducts: hive_1.getRedHatProducts,
	                    getRedHatVersion: hive_1.getRedHatVersion,
	                    getRedHatVersions: hive_1.getRedHatVersions,
	                    getPlatform: hive_1.getPlatform,
	                    getPlatforms: hive_1.getPlatforms
	                },
	                review: {
	                    getQuestions: review_1.getQuestions,
	                    getKtQuestions: review_1.getKtQuestions,
	                    getReviews: review_1.getReviews,
	                    createReview: review_1.createReview
	                },
	                users: {
	                    getUsers: user_2.getUsers,
	                    getUserById: user_2.getUserById,
	                    getUserBySSO: user_2.getUserBySSO,
	                    getCaseGroups: user_2.getCaseGroups,
	                    getRoles: user_2.getRoles,
	                    updateUser: user_2.updateUser,
	                    getChatterComments: comment_1.getChatterComments,
	                    getNnoRegions: user_2.getNnoRegions,
	                    updateUserInformation: user_2.updateUserInformation,
	                    getAllRoleTemplates: user_2.getAllRoleTemplates,
	                    getUserSbrs: user_2.getUserSbrs,
	                    getUserTags: user_2.getUserTags,
	                    getUserQueueBuddies: user_2.getUserQueueBuddies,
	                    getAllRoles: user_2.getAllRoles,
	                    getLanguage: user_2.getLanguage
	                },
	                kyce: {
	                    runKyce: kyce_1.runKyce
	                },
	                commentFeedback: {
	                    createCommentFeedback: commentFeedback_1.createCommentFeedback,
	                    updateCommentFeedback: commentFeedback_1.updateCommentFeedback,
	                    getCommentFeedback: commentFeedback_1.getCommentFeedback
	                },
	                kcs: {
	                    linkKcsResources: kcs_1.linkKcsResources,
	                    getSolution: kcs_1.getSolution,
	                    getResources: kcs_1.getResources
	                },
	                products: {
	                    getProducts: products_1.getProducts,
	                    getProductVersions: products_1.getProductVersions
	                },
	                sbrs: {
	                    getSbr: sbrs_1.getSbr,
	                    getSbrs: sbrs_1.getSbrs,
	                    getSbrTags: sbrs_1.getSbrTags
	                },
	                externalTrackers: {
	                    getExternalTrackers: externalTrackers_1.getExternalTrackers,
	                    getExternalTrackersUpdates: externalTrackers_1.getExternalTrackersUpdates
	                },
	                solr: {
	                    getSolrAccess: solr_1.getSolrAccess,
	                    getSolrCases: solr_1.getSolrCases
	                },
	                accounts: {
	                    getAccount: account_2.getAccount,
	                    getAccountContacts: account_2.getAccountContacts,
	                    getAccountNotes: account_2.getAccountNotes,
	                    getAccountTeamMembers: account_2.getAccountTeamMembers,
	                    patchAccounts: account_2.patchAccounts,
	                    getContactDetailBySso: account_2.getContactDetailBySso
	                },
	                businessHours: {
	                    getBusinessHours: businessHours_1.getBusinessHours
	                },
	                tags: {
	                    getTags: tags_1.getTags
	                },
	                callcenters: {
	                    getCallCenters: callCenters_1.getCallCenters,
	                    getCallCenter: callCenters_1.getCallCenter
	                },
	                fields: {
	                    getCaseFields: case_1.getCaseFields,
	                    getUserFields: user_1.getUserFields,
	                    getContactFields: contact_1.getContactFields,
	                    getCaseGroupFields: caseGroup_1.getCaseGroupFields,
	                    getCaseBomgarSessionFields: bomgar_1.getCaseBomgarSessionFields,
	                    getAccountFields: account_3.getAccountFields,
	                    getAccountNoteFields: account_3.getAccountNoteFields,
	                    getAccountMemberFields: account_3.getAccountMemberFields,
	                    getCaseCommentFields: comment_2.getCaseCommentFields,
	                    getLiveChatTranscriptFields: chat_1.getLiveChatTranscriptFields,
	                    getBugzillaBugFields: bugzilla_1.getBugzillaBugFields,
	                    getProductFields: product_1.getProductFields,
	                    getExternalTrackerFields: externalTracker_1.getExternalTrackerFields
	                },
	                caseHistory: {
	                    getHistory: caseHistory_1.getHistory
	                },
	                escalations: {
	                    getEscalations: escalation_1.getEscalations,
	                    createIceEscalation: escalation_1.createIceEscalation
	                },
	                userManagement: {
	                    createRole: roles_1.createRole,
	                    updateRole: roles_1.updateRole,
	                    deleteRole: roles_1.deleteRole
	                },
	                vocabulary: {
	                    getVocabularyCategory: vocabulary_1.getVocabularyCategory,
	                    getVocabularyComponents: vocabulary_1.getVocabularyComponents,
	                    getVocabularyProducts: vocabulary_1.getVocabularyProducts,
	                    getVocabularySbrs: vocabulary_1.getVocabularySbrs,
	                    getVocabularyTags: vocabulary_1.getVocabularyTags
	                },
	                maintenance: {
	                    getMaintenanceMode: maintenance_1.getMaintenanceMode
	                },
	                dashboard: {
	                    getViews: view_1.getViews,
	                    getLabs: view_1.getLabs,
	                    getAccountDetails: view_1.getAccountDetails,
	                    getAllCaseInfo: view_1.getAllCaseInfo,
	                    getErrata: view_1.getErrata,
	                    getSubscriptionStats: view_1.getSubscriptionStats,
	                    getInsights: view_1.getInsights,
	                    getAccounts: account_1.getAccounts
	                },
	                csp: {
	                    metadata: {
	                        getMetadata: metadata_1.getMetadata
	                    },
	                    account: {
	                        getCSAccounts: account_4.getCSAccounts,
	                        getOpenCaseCount: account_4.getOpenCaseCount,
	                        getCTACount: account_4.getCTACount,
	                        getEntitlementCount: account_4.getEntitlementCount
	                    },
	                    contact: {
	                        getContacts: contact_2.getContacts
	                    },
	                    cta: {
	                        listCtas: cta_1.listCtas,
	                        getCtaGroupedCount: cta_1.getCtaGroupedCount,
	                        getCta: cta_1.getCta,
	                        updateCta: cta_1.updateCta,
	                        updateCtaTask: cta_1.updateCtaTask,
	                        addCta: cta_1.addCta,
	                        addTask: cta_1.addTask,
	                        deleteCta: cta_1.deleteCta,
	                        deleteTask: cta_1.deleteTask,
	                        getCtaTasks: cta_1.getCtaTasks,
	                        getCtaComments: cta_1.getCtaComments,
	                        getCtaComment: cta_1.getCtaComment,
	                        updateCtaComment: cta_1.updateCtaComment,
	                        deleteCtaComment: cta_1.deleteCtaComment,
	                        addCtaComment: cta_1.addCtaComment
	                    },
	                    successPlan: {
	                        getSuccessPlansForUserName: successPlan_1.getSuccessPlansForUserName,
	                        getSuccessPlansForAccountNumber: successPlan_1.getSuccessPlansForAccountNumber,
	                        getSuccessPlansForId: successPlan_1.getSuccessPlansForId,
	                        updateSuccessPlan: successPlan_1.updateSuccessPlan,
	                        addSuccessPlan: successPlan_1.addSuccessPlan,
	                        removeSuccessPlan: successPlan_1.removeSuccessPlan,
	                        addProduct: successPlan_1.addProduct,
	                        updateProduct: successPlan_1.updateProduct,
	                        removeProduct: successPlan_1.removeProduct,
	                        addObjective: successPlan_1.addObjective,
	                        updateObjective: successPlan_1.updateObjective,
	                        removeObjective: successPlan_1.removeObjective,
	                        addObjectiveLink: successPlan_1.addObjectiveLink,
	                        updateObjectiveLink: successPlan_1.updateObjectiveLink,
	                        removeObjectiveLink: successPlan_1.removeObjectiveLink,
	                        addObjectiveStakeholder: successPlan_1.addObjectiveStakeholder,
	                        updateObjectiveStakeholder: successPlan_1.updateObjectiveStakeholder,
	                        removeObjectiveStakeholder: successPlan_1.removeObjectiveStakeholder
	                    },
	                    timeline: {
	                        getTimeline: timeline_1.getTimeline,
	                        getTimelineActivity: timeline_1.getTimelineActivity,
	                        updateTimelineActivity: timeline_1.updateTimelineActivity,
	                        addTimelineActivity: timeline_1.addTimelineActivity,
	                        deleteTimelineActivity: timeline_1.deleteTimelineActivity
	                    }
	                }
	            };

	            /***/
	        },
	        /* 9 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function runInsights(caseNumber, attachmentId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/attachments/" + attachmentId + "/insights");
	                return fetch_1.getUri(uri);
	            }
	            exports.runInsights = runInsights;
	            function getInsightsRules(ruleIds) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/insights/rules");
	                return !!ruleIds ? fetch_1.postUri(uri, { ruleIds: ruleIds }) : fetch_1.getUri(uri);
	            }
	            exports.getInsightsRules = getInsightsRules;

	            /***/
	        },
	        /* 10 */
	        /***/function (module, exports) {

	            // shim for using process in browser
	            var process = module.exports = {};

	            // cached from whatever global is present so that test runners that stub it
	            // don't break things.  But we need to wrap it in a try catch in case it is
	            // wrapped in strict mode code which doesn't define any globals.  It's inside a
	            // function because try/catches deoptimize in certain engines.

	            var cachedSetTimeout;
	            var cachedClearTimeout;

	            function defaultSetTimout() {
	                throw new Error('setTimeout has not been defined');
	            }
	            function defaultClearTimeout() {
	                throw new Error('clearTimeout has not been defined');
	            }
	            (function () {
	                try {
	                    if (typeof setTimeout === 'function') {
	                        cachedSetTimeout = setTimeout;
	                    } else {
	                        cachedSetTimeout = defaultSetTimout;
	                    }
	                } catch (e) {
	                    cachedSetTimeout = defaultSetTimout;
	                }
	                try {
	                    if (typeof clearTimeout === 'function') {
	                        cachedClearTimeout = clearTimeout;
	                    } else {
	                        cachedClearTimeout = defaultClearTimeout;
	                    }
	                } catch (e) {
	                    cachedClearTimeout = defaultClearTimeout;
	                }
	            })();
	            function runTimeout(fun) {
	                if (cachedSetTimeout === setTimeout) {
	                    //normal enviroments in sane situations
	                    return setTimeout(fun, 0);
	                }
	                // if setTimeout wasn't available but was latter defined
	                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	                    cachedSetTimeout = setTimeout;
	                    return setTimeout(fun, 0);
	                }
	                try {
	                    // when when somebody has screwed with setTimeout but no I.E. maddness
	                    return cachedSetTimeout(fun, 0);
	                } catch (e) {
	                    try {
	                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	                        return cachedSetTimeout.call(null, fun, 0);
	                    } catch (e) {
	                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	                        return cachedSetTimeout.call(this, fun, 0);
	                    }
	                }
	            }
	            function runClearTimeout(marker) {
	                if (cachedClearTimeout === clearTimeout) {
	                    //normal enviroments in sane situations
	                    return clearTimeout(marker);
	                }
	                // if clearTimeout wasn't available but was latter defined
	                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	                    cachedClearTimeout = clearTimeout;
	                    return clearTimeout(marker);
	                }
	                try {
	                    // when when somebody has screwed with setTimeout but no I.E. maddness
	                    return cachedClearTimeout(marker);
	                } catch (e) {
	                    try {
	                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	                        return cachedClearTimeout.call(null, marker);
	                    } catch (e) {
	                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	                        return cachedClearTimeout.call(this, marker);
	                    }
	                }
	            }
	            var queue = [];
	            var draining = false;
	            var currentQueue;
	            var queueIndex = -1;

	            function cleanUpNextTick() {
	                if (!draining || !currentQueue) {
	                    return;
	                }
	                draining = false;
	                if (currentQueue.length) {
	                    queue = currentQueue.concat(queue);
	                } else {
	                    queueIndex = -1;
	                }
	                if (queue.length) {
	                    drainQueue();
	                }
	            }

	            function drainQueue() {
	                if (draining) {
	                    return;
	                }
	                var timeout = runTimeout(cleanUpNextTick);
	                draining = true;

	                var len = queue.length;
	                while (len) {
	                    currentQueue = queue;
	                    queue = [];
	                    while (++queueIndex < len) {
	                        if (currentQueue) {
	                            currentQueue[queueIndex].run();
	                        }
	                    }
	                    queueIndex = -1;
	                    len = queue.length;
	                }
	                currentQueue = null;
	                draining = false;
	                runClearTimeout(timeout);
	            }

	            process.nextTick = function (fun) {
	                var args = new Array(arguments.length - 1);
	                if (arguments.length > 1) {
	                    for (var i = 1; i < arguments.length; i++) {
	                        args[i - 1] = arguments[i];
	                    }
	                }
	                queue.push(new Item(fun, args));
	                if (queue.length === 1 && !draining) {
	                    runTimeout(drainQueue);
	                }
	            };

	            // v8 likes predictible objects
	            function Item(fun, array) {
	                this.fun = fun;
	                this.array = array;
	            }
	            Item.prototype.run = function () {
	                this.fun.apply(null, this.array);
	            };
	            process.title = 'browser';
	            process.browser = true;
	            process.env = {};
	            process.argv = [];
	            process.version = ''; // empty string to avoid regexp issues
	            process.versions = {};

	            function noop() {}

	            process.on = noop;
	            process.addListener = noop;
	            process.once = noop;
	            process.off = noop;
	            process.removeListener = noop;
	            process.removeAllListeners = noop;
	            process.emit = noop;
	            process.prependListener = noop;
	            process.prependOnceListener = noop;

	            process.listeners = function (name) {
	                return [];
	            };

	            process.binding = function (name) {
	                throw new Error('process.binding is not supported');
	            };

	            process.cwd = function () {
	                return '/';
	            };
	            process.chdir = function (dir) {
	                throw new Error('process.chdir is not supported');
	            };
	            process.umask = function () {
	                return 0;
	            };

	            /***/
	        },
	        /* 11 */
	        /***/function (module, exports, __webpack_require__) {

	            var __WEBPACK_AMD_DEFINE_RESULT__; /*!
	                                               * jsUri
	                                               * https://github.com/derek-watson/jsUri
	                                               *
	                                               * Copyright 2013, Derek Watson
	                                               * Released under the MIT license.
	                                               *
	                                               * Includes parseUri regular expressions
	                                               * http://blog.stevenlevithan.com/archives/parseuri
	                                               * Copyright 2007, Steven Levithan
	                                               * Released under the MIT license.
	                                               */

	            /*globals define, module */

	            (function (global) {

	                var re = {
	                    starts_with_slashes: /^\/+/,
	                    ends_with_slashes: /\/+$/,
	                    pluses: /\+/g,
	                    query_separator: /[&;]/,
	                    uri_parser: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	                };

	                /**
	                 * Define forEach for older js environments
	                 * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach#Compatibility
	                 */
	                if (!Array.prototype.forEach) {
	                    Array.prototype.forEach = function (callback, thisArg) {
	                        var T, k;

	                        if (this == null) {
	                            throw new TypeError(' this is null or not defined');
	                        }

	                        var O = Object(this);
	                        var len = O.length >>> 0;

	                        if (typeof callback !== "function") {
	                            throw new TypeError(callback + ' is not a function');
	                        }

	                        if (arguments.length > 1) {
	                            T = thisArg;
	                        }

	                        k = 0;

	                        while (k < len) {
	                            var kValue;
	                            if (k in O) {
	                                kValue = O[k];
	                                callback.call(T, kValue, k, O);
	                            }
	                            k++;
	                        }
	                    };
	                }

	                /**
	                 * unescape a query param value
	                 * @param  {string} s encoded value
	                 * @return {string}   decoded value
	                 */
	                function decode(s) {
	                    if (s) {
	                        s = s.toString().replace(re.pluses, '%20');
	                        s = decodeURIComponent(s);
	                    }
	                    return s;
	                }

	                /**
	                 * Breaks a uri string down into its individual parts
	                 * @param  {string} str uri
	                 * @return {object}     parts
	                 */
	                function parseUri(str) {
	                    var parser = re.uri_parser;
	                    var parserKeys = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "isColonUri", "relative", "path", "directory", "file", "query", "anchor"];
	                    var m = parser.exec(str || '');
	                    var parts = {};

	                    parserKeys.forEach(function (key, i) {
	                        parts[key] = m[i] || '';
	                    });

	                    return parts;
	                }

	                /**
	                 * Breaks a query string down into an array of key/value pairs
	                 * @param  {string} str query
	                 * @return {array}      array of arrays (key/value pairs)
	                 */
	                function parseQuery(str) {
	                    var i, ps, p, n, k, v, l;
	                    var pairs = [];

	                    if (typeof str === 'undefined' || str === null || str === '') {
	                        return pairs;
	                    }

	                    if (str.indexOf('?') === 0) {
	                        str = str.substring(1);
	                    }

	                    ps = str.toString().split(re.query_separator);

	                    for (i = 0, l = ps.length; i < l; i++) {
	                        p = ps[i];
	                        n = p.indexOf('=');

	                        if (n !== 0) {
	                            k = decode(p.substring(0, n));
	                            v = decode(p.substring(n + 1));
	                            pairs.push(n === -1 ? [p, null] : [k, v]);
	                        }
	                    }
	                    return pairs;
	                }

	                /**
	                 * Creates a new Uri object
	                 * @constructor
	                 * @param {string} str
	                 */
	                function Uri(str) {
	                    this.uriParts = parseUri(str);
	                    this.queryPairs = parseQuery(this.uriParts.query);
	                    this.hasAuthorityPrefixUserPref = null;
	                }

	                /**
	                 * Define getter/setter methods
	                 */
	                ['protocol', 'userInfo', 'host', 'port', 'path', 'anchor'].forEach(function (key) {
	                    Uri.prototype[key] = function (val) {
	                        if (typeof val !== 'undefined') {
	                            this.uriParts[key] = val;
	                        }
	                        return this.uriParts[key];
	                    };
	                });

	                /**
	                 * if there is no protocol, the leading // can be enabled or disabled
	                 * @param  {Boolean}  val
	                 * @return {Boolean}
	                 */
	                Uri.prototype.hasAuthorityPrefix = function (val) {
	                    if (typeof val !== 'undefined') {
	                        this.hasAuthorityPrefixUserPref = val;
	                    }

	                    if (this.hasAuthorityPrefixUserPref === null) {
	                        return this.uriParts.source.indexOf('//') !== -1;
	                    } else {
	                        return this.hasAuthorityPrefixUserPref;
	                    }
	                };

	                Uri.prototype.isColonUri = function (val) {
	                    if (typeof val !== 'undefined') {
	                        this.uriParts.isColonUri = !!val;
	                    } else {
	                        return !!this.uriParts.isColonUri;
	                    }
	                };

	                /**
	                 * Serializes the internal state of the query pairs
	                 * @param  {string} [val]   set a new query string
	                 * @return {string}         query string
	                 */
	                Uri.prototype.query = function (val) {
	                    var s = '',
	                        i,
	                        param,
	                        l;

	                    if (typeof val !== 'undefined') {
	                        this.queryPairs = parseQuery(val);
	                    }

	                    for (i = 0, l = this.queryPairs.length; i < l; i++) {
	                        param = this.queryPairs[i];
	                        if (s.length > 0) {
	                            s += '&';
	                        }
	                        if (param[1] === null) {
	                            s += param[0];
	                        } else {
	                            s += param[0];
	                            s += '=';
	                            if (typeof param[1] !== 'undefined') {
	                                s += encodeURIComponent(param[1]);
	                            }
	                        }
	                    }
	                    return s.length > 0 ? '?' + s : s;
	                };

	                /**
	                 * returns the first query param value found for the key
	                 * @param  {string} key query key
	                 * @return {string}     first value found for key
	                 */
	                Uri.prototype.getQueryParamValue = function (key) {
	                    var param, i, l;
	                    for (i = 0, l = this.queryPairs.length; i < l; i++) {
	                        param = this.queryPairs[i];
	                        if (key === param[0]) {
	                            return param[1];
	                        }
	                    }
	                };

	                /**
	                 * returns an array of query param values for the key
	                 * @param  {string} key query key
	                 * @return {array}      array of values
	                 */
	                Uri.prototype.getQueryParamValues = function (key) {
	                    var arr = [],
	                        i,
	                        param,
	                        l;
	                    for (i = 0, l = this.queryPairs.length; i < l; i++) {
	                        param = this.queryPairs[i];
	                        if (key === param[0]) {
	                            arr.push(param[1]);
	                        }
	                    }
	                    return arr;
	                };

	                /**
	                 * removes query parameters
	                 * @param  {string} key     remove values for key
	                 * @param  {val}    [val]   remove a specific value, otherwise removes all
	                 * @return {Uri}            returns self for fluent chaining
	                 */
	                Uri.prototype.deleteQueryParam = function (key, val) {
	                    var arr = [],
	                        i,
	                        param,
	                        keyMatchesFilter,
	                        valMatchesFilter,
	                        l;

	                    for (i = 0, l = this.queryPairs.length; i < l; i++) {

	                        param = this.queryPairs[i];
	                        keyMatchesFilter = decode(param[0]) === decode(key);
	                        valMatchesFilter = param[1] === val;

	                        if (arguments.length === 1 && !keyMatchesFilter || arguments.length === 2 && (!keyMatchesFilter || !valMatchesFilter)) {
	                            arr.push(param);
	                        }
	                    }

	                    this.queryPairs = arr;

	                    return this;
	                };

	                /**
	                 * adds a query parameter
	                 * @param  {string}  key        add values for key
	                 * @param  {string}  val        value to add
	                 * @param  {integer} [index]    specific index to add the value at
	                 * @return {Uri}                returns self for fluent chaining
	                 */
	                Uri.prototype.addQueryParam = function (key, val, index) {
	                    if (arguments.length === 3 && index !== -1) {
	                        index = Math.min(index, this.queryPairs.length);
	                        this.queryPairs.splice(index, 0, [key, val]);
	                    } else if (arguments.length > 0) {
	                        this.queryPairs.push([key, val]);
	                    }
	                    return this;
	                };

	                /**
	                 * test for the existence of a query parameter
	                 * @param  {string}  key        add values for key
	                 * @param  {string}  val        value to add
	                 * @param  {integer} [index]    specific index to add the value at
	                 * @return {Uri}                returns self for fluent chaining
	                 */
	                Uri.prototype.hasQueryParam = function (key) {
	                    var i,
	                        len = this.queryPairs.length;
	                    for (i = 0; i < len; i++) {
	                        if (this.queryPairs[i][0] == key) return true;
	                    }
	                    return false;
	                };

	                /**
	                 * replaces query param values
	                 * @param  {string} key         key to replace value for
	                 * @param  {string} newVal      new value
	                 * @param  {string} [oldVal]    replace only one specific value (otherwise replaces all)
	                 * @return {Uri}                returns self for fluent chaining
	                 */
	                Uri.prototype.replaceQueryParam = function (key, newVal, oldVal) {
	                    var index = -1,
	                        len = this.queryPairs.length,
	                        i,
	                        param;

	                    if (arguments.length === 3) {
	                        for (i = 0; i < len; i++) {
	                            param = this.queryPairs[i];
	                            if (decode(param[0]) === decode(key) && decodeURIComponent(param[1]) === decode(oldVal)) {
	                                index = i;
	                                break;
	                            }
	                        }
	                        if (index >= 0) {
	                            this.deleteQueryParam(key, decode(oldVal)).addQueryParam(key, newVal, index);
	                        }
	                    } else {
	                        for (i = 0; i < len; i++) {
	                            param = this.queryPairs[i];
	                            if (decode(param[0]) === decode(key)) {
	                                index = i;
	                                break;
	                            }
	                        }
	                        this.deleteQueryParam(key);
	                        this.addQueryParam(key, newVal, index);
	                    }
	                    return this;
	                };

	                /**
	                 * Define fluent setter methods (setProtocol, setHasAuthorityPrefix, etc)
	                 */
	                ['protocol', 'hasAuthorityPrefix', 'isColonUri', 'userInfo', 'host', 'port', 'path', 'query', 'anchor'].forEach(function (key) {
	                    var method = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
	                    Uri.prototype[method] = function (val) {
	                        this[key](val);
	                        return this;
	                    };
	                });

	                /**
	                 * Scheme name, colon and doubleslash, as required
	                 * @return {string} http:// or possibly just //
	                 */
	                Uri.prototype.scheme = function () {
	                    var s = '';

	                    if (this.protocol()) {
	                        s += this.protocol();
	                        if (this.protocol().indexOf(':') !== this.protocol().length - 1) {
	                            s += ':';
	                        }
	                        s += '//';
	                    } else {
	                        if (this.hasAuthorityPrefix() && this.host()) {
	                            s += '//';
	                        }
	                    }

	                    return s;
	                };

	                /**
	                 * Same as Mozilla nsIURI.prePath
	                 * @return {string} scheme://user:password@host:port
	                 * @see  https://developer.mozilla.org/en/nsIURI
	                 */
	                Uri.prototype.origin = function () {
	                    var s = this.scheme();

	                    if (this.userInfo() && this.host()) {
	                        s += this.userInfo();
	                        if (this.userInfo().indexOf('@') !== this.userInfo().length - 1) {
	                            s += '@';
	                        }
	                    }

	                    if (this.host()) {
	                        s += this.host();
	                        if (this.port() || this.path() && this.path().substr(0, 1).match(/[0-9]/)) {
	                            s += ':' + this.port();
	                        }
	                    }

	                    return s;
	                };

	                /**
	                 * Adds a trailing slash to the path
	                 */
	                Uri.prototype.addTrailingSlash = function () {
	                    var path = this.path() || '';

	                    if (path.substr(-1) !== '/') {
	                        this.path(path + '/');
	                    }

	                    return this;
	                };

	                /**
	                 * Serializes the internal state of the Uri object
	                 * @return {string}
	                 */
	                Uri.prototype.toString = function () {
	                    var path,
	                        s = this.origin();

	                    if (this.isColonUri()) {
	                        if (this.path()) {
	                            s += ':' + this.path();
	                        }
	                    } else if (this.path()) {
	                        path = this.path();
	                        if (!(re.ends_with_slashes.test(s) || re.starts_with_slashes.test(path))) {
	                            s += '/';
	                        } else {
	                            if (s) {
	                                s.replace(re.ends_with_slashes, '/');
	                            }
	                            path = path.replace(re.starts_with_slashes, '/');
	                        }
	                        s += path;
	                    } else {
	                        if (this.host() && (this.query().toString() || this.anchor())) {
	                            s += '/';
	                        }
	                    }
	                    if (this.query().toString()) {
	                        s += this.query().toString();
	                    }

	                    if (this.anchor()) {
	                        if (this.anchor().indexOf('#') !== 0) {
	                            s += '#';
	                        }
	                        s += this.anchor();
	                    }

	                    return s;
	                };

	                /**
	                 * Clone a Uri object
	                 * @return {Uri} duplicate copy of the Uri
	                 */
	                Uri.prototype.clone = function () {
	                    return new Uri(this.toString());
	                };

	                /**
	                 * export via AMD or CommonJS, otherwise leak a global
	                 */
	                if (true) {
	                    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	                        return Uri;
	                    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	                } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	                    module.exports = Uri;
	                } else {
	                    global.Uri = Uri;
	                }
	            })(this);

	            /***/
	        },
	        /* 12 */
	        /***/function (module, exports) {

	            module.exports = function _btoa(str) {
	                return btoa(str);
	            };

	            /***/
	        },
	        /* 13 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllRoleMetadatas() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/roleMetadata/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllRoleMetadatas = getAllRoleMetadatas;

	            /***/
	        },
	        /* 14 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getTestClasses(productType, pluginType) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/testclasses");
	                uri.addQueryParam('isSupport', true);
	                uri.addQueryParam('productType', productType);
	                if (pluginType) {
	                    uri.addQueryParam('pluginType', pluginType);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getTestClasses = getTestClasses;

	            /***/
	        },
	        /* 15 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function health() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/health");
	                return fetch_1.getUri(uri);
	            }
	            exports.health = health;
	            function hostname() {
	                return env_1.default.hydraHostName.toString();
	            }
	            exports.hostname = hostname;

	            /***/
	        },
	        /* 16 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function runKyce(attachmentId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/hardgrok/attachments/" + attachmentId + "/inspect");
	                var headerParam = [];
	                headerParam.push({
	                    key: 'Accept',
	                    value: 'application/vnd.api.v1+json'
	                });
	                return fetch_1.getUri(uri, headerParam);
	            }
	            exports.runKyce = runKyce;

	            /***/
	        },
	        /* 17 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getBusinessHours(timezone) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/businesshours");
	                uri.addQueryParam('timezone', timezone);
	                return fetch_1.getUri(uri);
	            }
	            exports.getBusinessHours = getBusinessHours;

	            /***/
	        },
	        /* 18 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getTags(fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/tags");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getTags = getTags;

	            /***/
	        },
	        /* 19 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getBrmsResponse(brmsPayload) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/brms/");
	                return fetch_1.postUri(uri, brmsPayload, 'text');
	            }
	            exports.getBrmsResponse = getBrmsResponse;

	            /***/
	        },
	        /* 20 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            var contact_1 = __webpack_require__(3);
	            var caseGroup_1 = __webpack_require__(4);
	            var bugzilla_1 = __webpack_require__(5);
	            var account_1 = __webpack_require__(6);
	            var entitlement_1 = __webpack_require__(21);
	            var product_1 = __webpack_require__(7);
	            var recordType_1 = __webpack_require__(22);
	            function getCaseFields(options) {
	                var finalFields = [];
	                var caseFields = ['accountBugzillaConfidentialGroup', 'accountId', 'accountNumber', 'actionPlan', 'actionPlanLastUpdated', 'actionPlanLastUpdatedByUserId', 'alternateId', 'amcFinalRemedyProvided', 'amcTemporaryRemedyProvided', 'automationEnabledForCaseComputed', 'bugId', 'bugzillaLink', 'bugzillaNumber', 'bugzillaSummary', 'businessHoursId', 'caseContact', 'caseCreatedDayOfWeek', 'caseCreatedHourOfDay', 'caseGroupId', 'caseLanguage', 'caseLink', 'caseNumber', 'caseOwnerId', 'caseSummary', 'caseType', 'certArchitecture', 'certCategory', 'certPortalId', 'certProduct', 'certVendorName', 'certVendorPortalId', 'certVendorProductName', 'certVendorProductPortalId', 'certVersion', 'certProgram', 'closedDate', 'commentCount', 'contactId', 'contactInfo24x7', 'contributors', 'createdByContactId', 'createdByUserId', 'createdByName', 'createdDate', 'critSit', 'currentCaseOwnerManagersEmail', 'customerCaseNotes', 'customerEngagementScorecard', 'customerEscalation', 'customerSegment', 'description', 'emailAddress', 'enhancedSLA', 'entitlementId', 'entitlementNeedsAttention', 'entitlementState', 'environment', 'externalHandlingSystem', 'externalLock', 'externalLockById', 'externalLockDate', 'fts', 'ftsHandoverReady', 'ftsRole', 'hasCommentsUnreadByOwner', 'hasNewPublicComment', 'hasSelfServiceComments', 'hostname', 'hotfixDelivered', 'hotfixDeliveredDate', 'hotfixRequestDate', 'hotfixRequested', 'hoursSinceLastPublicComment', 'id', 'identifyingAddressCountry', 'initialServiceLevel', 'internalStatus', 'isABRTCaseThatShouldRemainClosed', 'isClosed', 'isDeleted', 'isEscalated', 'isPOC', 'isReviewed', 'isStopped', 'issue', 'itar', 'kickCase', 'lastBreach', 'lastClosedAt', 'lastEscalationUpdatedAt', 'lastModifiedByContactId', 'lastModifiedById', 'lastModifiedByLink', 'lastModifiedByName', 'lastModifiedByUserId', 'lastModifiedDate', 'legacyId', 'legacySystem', 'linkToCaseInPortal', 'linkedResourceCount', 'linkedToRecommendationOnClosure', 'linkedToRecommendationOnClosureSet', 'milestoneStatus', 'name', 'needsNewOwner', 'noAutomationForCase', 'normalizedServiceLevel', 'numberOfBreaches', 'origin', 'ownerIRCNickname', 'ownerId', 'ownersManagersEmail', 'ownerOutOfOffice', 'priorityScore', 'isPrivate', 'proactive', 'privateCommentCount', 'product', 'productFamily', 'publicComment', 'publicCommentCount', 'publicTSEComments', 'reliefAt', 'remoteSessionCount', 'requestManagementEscalation', 'resolution', 'resolutionDescription', 'resolvedAt', 'sbrGroup', 'sbt', 'sbtState', 'searchHelper', 'sendCSATSurvey', 'severity', 'slaExitDate', 'slaStartDate', 'srmFlag', 'status', 'strategic', 'subject', 'summaryLastModifiedByUserId', 'summaryLastUpdated', 'tags', 'tamCase', 'targetDate', 'translators', 'ttc', 'version', 'waitingOnCallback'];
	                Array.prototype.push.apply(finalFields, caseFields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['accountNumberRef', 'assetId', 'caseOwnerIsTam', 'caseOwnerManagersEmail', 'caseOwnerSuperRegion', 'createdById', 'createdByLink', 'createdDateGainsight', 'closedDateGainsight', 'company', 'connectionReceivedId', 'connectionSentId', 'contactLink', 'contactPreferredLanguage', 'firstCaseInactivityWarningSentAt', 'highestSeverity', 'hoursInCurrentStatus', 'hoursSinceCaseLastUpdated', 'hoursSinceLastCommentOfAnyType', 'hoursSinceLastPrivateComment', 'hxComment', 'hxDirection', 'hxHubId', 'hxId', 'hxIsEscalation', 'hxPartnerId', 'hxStatus', 'lastETUUpdatedAt', 'lastEscalationAssociatedAt', 'lastPrivateCommentDateTime', 'lastPublicAttachmentMs', 'lastPublicCaseUpdateContactId', 'lastPublicCaseUpdateMs', 'lastPublicCaseUpdateUserId', 'lastPublicCommentDateTime', 'lastPublicCommentPublishedMs', 'lastPublicUpdateBy', 'lastPublicUpdateDateDisplay', 'lastReferencedDate', 'lastStatusChange', 'lastUpdateDate', 'lastViewedDate', 'ltrocClosed', 'ltrocClosedSet', 'manuallySetNoCSATSurvey', 'newTimestamp', 'originalDescription', 'originalEnvironment', 'originalIssue', 'originalPeriodicityOfIssue', 'originalProduct', 'originalServiceLevel', 'originalSeverity', 'originalSubject', 'originalTimeFramesAndUrgency', 'originalVersion',
	                    // 'parent',
	                    'parentId', 'periodicityOfIssue', 'prsRecordId', 'pushToPartner', 'priorityScoreExplanation', 'priorityScoreFormula', 'phone', 'priorityScoreLastUpdateDate', 'reason', 'redHatLogin', 'recordType', 'recordTypeId', 'redHatLoginRef', 'refTagForEmails', 'relatedChanges', 'reopenCount', 'resetSBTCount', 'rhProductId', 'rhVersionId', 'secondCaseInactivityWarningSentAt', 'stopStartDate', 'systemModstamp', 'timeFramesAndUrgency', 'timeSinceCaseWasLastUpdated', 'totalDaysWoCollaboration', 'totalEscalation', 'userAgent', 'vhtScore'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeCreatedByContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "createdByContact." + f;
	                    }));
	                }
	                if (options && options.includeCreatedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdByUser." + f;
	                    }));
	                }
	                if (options && options.includeActionPlanLastUpdatedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "actionPlanLastUpdatedByUser." + f;
	                    }));
	                }
	                if (options && options.includeExternalLockBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "externalLockBy." + f;
	                    }));
	                }
	                if (options && options.includeAccount) {
	                    Array.prototype.push.apply(finalFields, account_1.getAccountFields(options).map(function (f) {
	                        return "account." + f;
	                    }));
	                }
	                if (options && options.includeRecordType) {
	                    Array.prototype.push.apply(finalFields, recordType_1.getRecordTypeFields(options).map(function (f) {
	                        return "recordType." + f;
	                    }));
	                }
	                // Currently not used
	                if (options && options.includeBug) {
	                    Array.prototype.push.apply(finalFields, bugzilla_1.getBugzillaBugFields().map(function (f) {
	                        return "bug." + f;
	                    }));
	                }
	                if (options && options.includeCaseGroup) {
	                    Array.prototype.push.apply(finalFields, caseGroup_1.getCaseGroupFields().map(function (f) {
	                        return " caseGroup." + f;
	                    }));
	                }
	                if (options && options.includeCaseOwner) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "caseOwner." + f;
	                    }));
	                }
	                if (options && options.includeContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "contact." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedByUser." + f;
	                    }));
	                }
	                if (options && options.includeLastPublicCaseUpdateUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastPublicCaseUpdateUser." + f;
	                    }));
	                }
	                if (options && options.includeLastPublicCaseUpdateContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "lastPublicCaseUpdateContact." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "lastModifiedByContact." + f;
	                    }));
	                }
	                if (options && options.includeSummaryLastModifiedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "summaryLastModifiedByUser." + f;
	                    }));
	                }
	                if (options && options.includeEntitlement) {
	                    Array.prototype.push.apply(finalFields, entitlement_1.getEntitlementFields(options).map(function (f) {
	                        return "entitlement." + f;
	                    }));
	                }
	                if (options && options.includeProduct) {
	                    Array.prototype.push.apply(finalFields, product_1.getProductFields(options).map(function (f) {
	                        return "rhProduct." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getCaseFields = getCaseFields;

	            /***/
	        },
	        /* 21 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getEntitlementFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'name', 'status', 'serviceLevel', 'serviceType', 'supportLevel'];
	                // 'createdBy: IUser;
	                // 'lastModifiedBy: IUser;
	                // 'account: IAccount;
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['createdById', 'createdDate', 'lastModifiedById', 'lastModifiedDate', 'isDeleted', 'accountId', 'assetId', 'isAssociatedWithNoEngineeringProducts', 'businessHoursId', 'businessUnit', 'casesPerEntitlement', 'isConsiderSupported', 'contractLineItemId', 'contractLineItemSubscriptionProductNum', 'endDate', 'entitlementProcessRule', 'externalAccountNumber', 'externalContractId', 'externalContractLineItemId', 'externalEntitlementId', 'externalProductCode', 'installBaseNumber', 'isPerIncident', 'isActive', 'isL3', 'isLayered', 'isManuallySelectedEntitlementProcess', 'isTAMEntitlement', 'lastReferencedDate', 'lastViewedDate', 'levelTypeConcat', 'oracleStatus', 'quantity', 'remainingCases', 'serviceContractId', 'serviceLevelLabel', 'serviceValue', 'slaProcessId', 'startDate', 'statusAndStartDate', 'subscriptionNumber', 'subscriptionProductNumber', 'type', 'coordinates'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                return finalFields;
	            }
	            exports.getEntitlementFields = getEntitlementFields;

	            /***/
	        },
	        /* 22 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            function getRecordTypeFields(options) {
	                var finalFields = [];
	                var fields = ['name'];
	                Array.prototype.push.apply(finalFields, fields);
	                return finalFields;
	            }
	            exports.getRecordTypeFields = getRecordTypeFields;

	            /***/
	        },
	        /* 23 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getCaseBomgarSessionFields(options) {
	                var finalFields = [];
	                var caseBomgarSessionFields = ['id', 'createdById', 'createdDate', 'lastModifiedById', 'lastModifiedDate', 'name', 'duration', 'primaryCustomerName', 'primarySupportRepName', 'salesforceRecordId', 'sessionRecordingUrl', 'sessionStartDate', 'sessionEndDate'];
	                Array.prototype.push.apply(finalFields, caseBomgarSessionFields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['ownerId', 'isDeleted', 'chatDownloadUrl', 'chatViewUrl', 'externalKey', 'fileTransferCount', 'hostname', 'os', 'privateIp', 'publicSiteId', 'publicIp', 'recordingDownloadUrl', 'recordingViewUrl', 'relatedCase', 'durationHours', 'sessionRecording', 'lastActivityDate', 'lastReferencedDate', 'lastViewedDate'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getCaseBomgarSessionFields = getCaseBomgarSessionFields;

	            /***/
	        },
	        /* 24 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getHistory(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/history");
	                if (options) {
	                    if (options.fields && options.fields.length > 0) {
	                        uri.addQueryParam('fields', options.fields.join(','));
	                    }
	                    Object.keys(options).filter(function (k) {
	                        return k !== 'fields';
	                    }).forEach(function (k) {
	                        if (options[k] !== undefined) {
	                            uri.addQueryParam(k, options[k]);
	                        }
	                    });
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getHistory = getHistory;

	            /***/
	        },
	        /* 25 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getEscalations(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/escalations");
	                if (options.caseNumber) {
	                    uri.addQueryParam('caseNumber', options.caseNumber);
	                }
	                if (options.accountNumber) {
	                    uri.addQueryParam('accountNumber', options.accountNumber);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getEscalations = getEscalations;
	            function createIceEscalation(escalation) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/escalations");
	                return fetch_1.postUri(uri, escalation);
	            }
	            exports.createIceEscalation = createIceEscalation;

	            /***/
	        },
	        /* 26 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getLiveChatTranscriptFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'createdDate', 'chatDuration', 'lastModifiedDate', 'body', 'status'];
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['isDeleted', 'accountId', 'accountIdFormula', 'averageResponseTimeOperator', 'averageResponseTimeVisitor', 'browser', 'browserLanguage', 'caseId', 'createdById', 'lastModifiedById', 'caseNumber', 'contactId', 'contactIdFormula', 'endTime', 'endedBy', 'ipAddress', 'lastReferencedDate', 'lastViewedDate', 'leadId', 'liveChatButtonId', 'liveChatDeploymentId', 'liveChatVisitorId', 'location', 'operatorMessageCount', 'ownerId', 'platform', 'referrerUri', 'requestTime', 'ssoUsername', 'screenResolution', 'skillId', 'startTime', 'timeToAnswer', 'userAgent', 'visitorMessageCount'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                if (options && options.includeAccount) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "account." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getLiveChatTranscriptFields = getLiveChatTranscriptFields;

	            /***/
	        },
	        /* 27 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            function getExternalTrackerFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'createdDate', 'description', 'hasBeenPushedSuccessfully', 'hasBeenPushed', 'lastModifiedDate', 'rejected', 'resourceKey', 'resourceURL', 'status', 'system', 'ticketReference', 'title'];
	                // 'collaborationComment: ICaseComment;
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['closedAt', 'collaborationCommentId', 'caseId', 'createdAt', 'createdById', 'deletedAt', 'deletedByName', 'establishedBy', 'eligibilityKeyValue', 'identifier', 'lastModifiedById', 'lastActivityDate', 'lastReferencedDate', 'lastViewedDate', 'lastPushRequest', 'liveID', 'name', 'overrideEntitlementCheck', 'productID', 'productName', 'rejectedAt', 'rejectedMessage', 'severity', 'solveCallingCountry', 'supportTopicID', 'supportTopicName', 'systemInstance', 'visibilityLevel'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeCreatedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedBy) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getExternalTrackerFields = getExternalTrackerFields;

	            /***/
	        },
	        /* 28 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getViews(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/views");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getViews = getViews;
	            function getLabs(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/labs");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getLabs = getLabs;
	            function getAccountDetails(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/account/details");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountDetails = getAccountDetails;
	            function getAllCaseInfo(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/cases");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllCaseInfo = getAllCaseInfo;
	            function getErrata(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/errata");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getErrata = getErrata;
	            function getInsights(id, startDate, endDate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/insights");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                if (paramValid(startDate)) {
	                    uri.addQueryParam('startDate', startDate);
	                }
	                if (paramValid(endDate)) {
	                    uri.addQueryParam('endDate', endDate);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getInsights = getInsights;
	            function getSubscriptionStats(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/subscriptions");
	                if (paramValid(id)) {
	                    uri.addQueryParam('id', id);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getSubscriptionStats = getSubscriptionStats;
	            function paramValid(param) {
	                return !(param.length === 0 && param === '');
	            }

	            /***/
	        },
	        /* 29 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAccounts() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/dashboard/v2/accounts");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccounts = getAccounts;

	            /***/
	        },
	        /* 30 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getComments(caseNumber, options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/comments");
	                if (options && options.limit && options.limit > 0) {
	                    uri.addQueryParam('limit', options.limit);
	                }
	                if (options && options.orderDirection) {
	                    uri.addQueryParam('orderDirection', options.orderDirection);
	                }
	                if (options && options.orderBy) {
	                    uri.addQueryParam('orderBy', options.orderBy);
	                }
	                if (options && options.offsetType) {
	                    uri.addQueryParam('offsetType', options.offsetType);
	                }
	                if (options && options.offsetValue) {
	                    uri.addQueryParam('offsetValue', options.offsetValue);
	                }
	                if (options && options.fields && options.fields.length > 0) {
	                    return fetch_1.postUri(uri, { fields: options.fields.join(',') });
	                } else {
	                    return fetch_1.getUri(uri);
	                }
	            }
	            exports.getComments = getComments;
	            function upsertComment(comment, doNotSendEmail) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/comments");
	                if (doNotSendEmail === true) {
	                    uri.addQueryParam('doNotSendEmail', true);
	                }
	                return fetch_1.putUri(uri, comment);
	            }
	            exports.upsertComment = upsertComment;
	            function getChatterComments(userId, options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/comments");
	                if (options && options.fromDate) {
	                    uri.addQueryParam('fromDate', options.fromDate);
	                }
	                if (options && options.toDate) {
	                    uri.addQueryParam('toDate', options.toDate);
	                }
	                if (options && options.dateType) {
	                    uri.addQueryParam('dateType', options.dateType);
	                }
	                if (options.fields && options.fields.length > 0) {
	                    uri.addQueryParam('fields', options.fields.join(','));
	                }
	                if (options.limit && options.limit > 0) {
	                    uri.addQueryParam('limit', options.limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getChatterComments = getChatterComments;

	            /***/
	        },
	        /* 31 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getUsers(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users");
	                if (options) {
	                    if (options.fields && options.fields.length > 0) {
	                        uri.addQueryParam('fields', options.fields.join(','));
	                    }
	                    // By default the limit is 100 so if left undefined it will be 100
	                    if (options.limit !== undefined) {
	                        uri.addQueryParam('limit', options.limit);
	                    }
	                    Object.keys(options).filter(function (k) {
	                        return k !== 'fields' && k !== 'limit';
	                    }).forEach(function (k) {
	                        if (options[k] !== undefined) {
	                            uri.addQueryParam(k, options[k]);
	                        }
	                    });
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getUsers = getUsers;
	            function getUserBySSO(sso, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/sso/" + sso);
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserBySSO = getUserBySSO;
	            function getUserById(id, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + id);
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserById = getUserById;
	            function getCaseGroups(ssoUsername) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + ssoUsername + "/casegroups");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseGroups = getCaseGroups;
	            function updateUser(ssoUsername, user) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/sso/" + ssoUsername);
	                return fetch_1.patchUri(uri, user);
	            }
	            exports.updateUser = updateUser;
	            function getRoles(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/roles");
	                return fetch_1.getUri(uri);
	            }
	            exports.getRoles = getRoles;
	            function getNnoRegions(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/nnoregions");
	                return fetch_1.getUri(uri);
	            }
	            exports.getNnoRegions = getNnoRegions;
	            function getLanguage(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/languages");
	                return fetch_1.getUri(uri);
	            }
	            exports.getLanguage = getLanguage;
	            function getUserSbrs(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/sbrs");
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserSbrs = getUserSbrs;
	            function getUserTags(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/tags");
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserTags = getUserTags;
	            function getUserQueueBuddies(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId + "/queuebuddies");
	                return fetch_1.getUri(uri);
	            }
	            exports.getUserQueueBuddies = getUserQueueBuddies;
	            // update language,roles, sbrs
	            function updateUserInformation(userId, updateOps) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/users/" + userId);
	                return fetch_1.patchUri(uri, updateOps);
	            }
	            exports.updateUserInformation = updateUserInformation;
	            function getAllRoles() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roles");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllRoles = getAllRoles;
	            function getAllRoleTemplates() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roleTemplates");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllRoleTemplates = getAllRoleTemplates;

	            /***/
	        },
	        /* 32 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function linkKcsResources(kcsLinkedResources, isCertificationCase) {
	                if (isCertificationCase === void 0) {
	                    isCertificationCase = false;
	                }
	                if (isCertificationCase) {
	                    var uri_1 = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/cases/certification/KnowledgeResources");
	                    return fetch_1.putUri(uri_1, kcsLinkedResources);
	                }
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/resource");
	                return fetch_1.postUri(uri, kcsLinkedResources);
	            }
	            exports.linkKcsResources = linkKcsResources;
	            function getSolution(id, revisionId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/solutions/" + id);
	                if (revisionId) {
	                    uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/solutions/" + id + "/revision/" + revisionId);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getSolution = getSolution;
	            function getResources(caseNumber, options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/resources");
	                if (options) {
	                    if (options.fields && options.fields.length > 0) {
	                        uri.addQueryParam('fields', options.fields.join(','));
	                    }
	                    Object.keys(options).filter(function (k) {
	                        return k !== 'fields';
	                    }).forEach(function (k) {
	                        if (options[k] !== undefined) {
	                            uri.addQueryParam(k, options[k]);
	                        }
	                    });
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getResources = getResources;

	            /***/
	        },
	        /* 33 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            exports.CaseMilestoneTypes = {
	                ONGOING_RESPONES: 'Ongoing Response',
	                FIRST_RESPONSE: 'First Response',
	                BREACH: 'Breach',
	                AMC_FINAL_REMEDY: 'AMC Final Remedy',
	                AMC_TEMPORARY_REMEDY: 'AMC Temporary Remedy'
	            };
	            // caseId can be id or case number
	            // Note that fields can't currently be Fields<ICase> since we don't actively type each field and sub relationship field
	            function getCase(caseId, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId);
	                if (fields && fields.length > 0) {
	                    return fetch_1.postUri(uri, { fields: fields.join(',') });
	                } else {
	                    return fetch_1.getUri(uri);
	                }
	            }
	            exports.getCase = getCase;
	            function getCases(filters, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCases = getCases;
	            function updateCase(caseId, kase) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId);
	                return fetch_1.putUri(uri, kase);
	            }
	            exports.updateCase = updateCase;
	            // PCM-3403 - it will honor all email settings the same way like SFDC does
	            function updateCaseByInternal(caseId, kase) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/internal/cases/" + caseId);
	                return fetch_1.putUri(uri, kase);
	            }
	            exports.updateCaseByInternal = updateCaseByInternal;
	            function getLinkedJiras(caseId, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/jiras");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getLinkedJiras = getLinkedJiras;
	            function linkJiraToCase(caseId, newLink) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/jira");
	                return fetch_1.postUri(uri, newLink);
	            }
	            exports.linkJiraToCase = linkJiraToCase;
	            function deleteJiraLinkFromCase(caseId, issueKey) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/jira/" + issueKey);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteJiraLinkFromCase = deleteJiraLinkFromCase;
	            function getLanguages() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/languages");
	                return fetch_1.getUri(uri);
	            }
	            exports.getLanguages = getLanguages;
	            function getCaseSbrs() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/metadata/sbrs");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseSbrs = getCaseSbrs;
	            function getCaseTags(limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/metadata/tags");
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseTags = getCaseTags;
	            function updateCaseTags(caseNumber, tagsUpdate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/tags");
	                return fetch_1.putUri(uri, tagsUpdate);
	            }
	            exports.updateCaseTags = updateCaseTags;
	            function deleteCaseTags(caseNumber, tagsUpdate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/tags");
	                return fetch_1.deleteUriWithBody(uri, tagsUpdate);
	            }
	            exports.deleteCaseTags = deleteCaseTags;
	            function getSeverities() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/severities");
	                return fetch_1.getUri(uri);
	            }
	            exports.getSeverities = getSeverities;
	            function getStatuses() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/statuses");
	                return fetch_1.getUri(uri);
	            }
	            exports.getStatuses = getStatuses;
	            function getTypes() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/types");
	                return fetch_1.getUri(uri);
	            }
	            exports.getTypes = getTypes;
	            function getCaseExternalTrackers(caseId, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/externaltrackers");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseExternalTrackers = getCaseExternalTrackers;
	            function getCaseExternalTrackerUpdates(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/externaltrackerupdates");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseExternalTrackerUpdates = getCaseExternalTrackerUpdates;
	            function getCaseContacts(caseNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/contacts");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseContacts = getCaseContacts;
	            function addCaseContacts(caseNumber, contacts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/contacts");
	                var apiContacts = (contacts || []).filter(function (c) {
	                    return c.ssoUsername;
	                }).map(function (c) {
	                    return {
	                        ssoName: c.ssoUsername
	                    };
	                });
	                var modifyContacts = {
	                    contacts: apiContacts
	                };
	                return fetch_1.putUri(uri, modifyContacts);
	            }
	            exports.addCaseContacts = addCaseContacts;
	            function deleteCaseContacts(caseNumber, contacts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/contacts");
	                var apiContacts = (contacts || []).filter(function (c) {
	                    return c.ssoUsername;
	                }).map(function (c) {
	                    return {
	                        ssoName: c.ssoUsername
	                    };
	                });
	                var modifyContacts = {
	                    contacts: apiContacts
	                };
	                return fetch_1.deleteUriWithBody(uri, modifyContacts);
	            }
	            exports.deleteCaseContacts = deleteCaseContacts;
	            function getAccountCaseGroups(accountNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/groups/" + accountNumber);
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountCaseGroups = getAccountCaseGroups;
	            function getCaseHistory(caseId, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/history");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseHistory = getCaseHistory;
	            function getAssociates(caseId, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/associates");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAssociates = getAssociates;
	            function addAssociate(caseId, associateUpdate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/associate");
	                return fetch_1.putUri(uri, associateUpdate);
	            }
	            exports.addAssociate = addAssociate;
	            function deleteAssociate(caseId, associateUpdate) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/associate");
	                return fetch_1.deleteUriWithBody(uri, associateUpdate);
	            }
	            exports.deleteAssociate = deleteAssociate;
	            function updateOwner(caseId, ssoUsername) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/owner");
	                return fetch_1.putUri(uri, ssoUsername);
	            }
	            exports.updateOwner = updateOwner;
	            function lockCase(caseId, kase) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/externalLock");
	                return fetch_1.putUri(uri, kase);
	            }
	            exports.lockCase = lockCase;
	            function unlockCase(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/externalLock");
	                return fetch_1.deleteUri(uri);
	            }
	            exports.unlockCase = unlockCase;
	            function getLockedCases(userId, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/locked/" + userId);
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                if (fields && fields.length > 0) {
	                    return fetch_1.postUri(uri, { fields: fields.join(',') });
	                } else {
	                    return fetch_1.getUri(uri);
	                }
	            }
	            exports.getLockedCases = getLockedCases;
	            function getBomgarSessionKey(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/bomgar");
	                return fetch_1.getUri(uri);
	            }
	            exports.getBomgarSessionKey = getBomgarSessionKey;
	            function getNep(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/nep");
	                return fetch_1.getUri(uri);
	            }
	            exports.getNep = getNep;
	            function createNep(caseNumber, nep) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/nep");
	                return fetch_1.postUri(uri, { nep: nep });
	            }
	            exports.createNep = createNep;
	            function updateNep(caseNumber, nep) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/nep");
	                return fetch_1.putUri(uri, { nep: nep });
	            }
	            exports.updateNep = updateNep;
	            function deleteNep(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/nep");
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteNep = deleteNep;
	            function getAttachments(caseNumber, includeDeleted) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/attachments/");
	                if (includeDeleted === true) {
	                    uri.addQueryParam('includeDeleted', includeDeleted);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAttachments = getAttachments;
	            function updateAttachment(caseNumber, attachmentId, updateOps) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/attachments/" + attachmentId);
	                return fetch_1.patchUri(uri, updateOps);
	            }
	            exports.updateAttachment = updateAttachment;
	            function getBomgarSessions(caseNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/remotesessions");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getBomgarSessions = getBomgarSessions;
	            function updateCaseSbrs(caseNumber, sbrs) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/sbrs");
	                return fetch_1.putUri(uri, sbrs);
	            }
	            exports.updateCaseSbrs = updateCaseSbrs;
	            function deleteCaseSbrs(caseNumber, sbrs) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/sbrs");
	                return fetch_1.deleteUriWithBody(uri, sbrs);
	            }
	            exports.deleteCaseSbrs = deleteCaseSbrs;
	            function getMilestones(caseNumber, options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/milestones");
	                if (options && options.fields && options.fields.length > 0) {
	                    uri.addQueryParam('fields', options.fields.join(','));
	                }
	                if (options && options.limit !== undefined) {
	                    uri.addQueryParam('limit', options.limit);
	                }
	                if (options && options.type) {
	                    uri.addQueryParam('type', options.type.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getMilestones = getMilestones;
	            function getChatTranscripts(caseNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/livechattranscripts");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getChatTranscripts = getChatTranscripts;
	            function getBugs(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/bugs");
	                return fetch_1.getUri(uri);
	            }
	            exports.getBugs = getBugs;
	            function getCasesFromSoql(query) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/soql");
	                return fetch_1.postUri(uri, query);
	            }
	            exports.getCasesFromSoql = getCasesFromSoql;

	            /***/
	        },
	        /* 34 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function uploadAttachment(caseNumber, formData) {
	                var path = "/cwe/cases/" + caseNumber + "/attachments";
	                var uri = env_1.default.hydraFSHostName.clone().setPath(env_1.default.fsPathPrefix + path);
	                return fetch_1.postFormUri(uri, formData);
	            }
	            exports.uploadAttachment = uploadAttachment;
	            function getAttachments(caseNumber) {
	                var path = "/cwe/cases/" + caseNumber + "/attachments";
	                var uri = env_1.default.hydraFSHostName.clone().setPath(env_1.default.fsPathPrefix + path);
	                return fetch_1.getUri(uri);
	            }
	            exports.getAttachments = getAttachments;

	            /***/
	        },
	        /* 35 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllShiftMetadatas() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shiftsMetadata/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllShiftMetadatas = getAllShiftMetadatas;
	            function createShiftMetadata(shiftMetadata) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shiftsMetadata/");
	                return fetch_1.postUri(uri, shiftMetadata);
	            }
	            exports.createShiftMetadata = createShiftMetadata;
	            function updateShiftMetadata(shiftId, shiftMetadata) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shiftsMetadata/" + shiftId);
	                return fetch_1.putUri(uri, shiftMetadata);
	            }
	            exports.updateShiftMetadata = updateShiftMetadata;
	            function deleteShiftMetadata(shiftId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shiftsMetadata/" + shiftId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteShiftMetadata = deleteShiftMetadata;

	            /***/
	        },
	        /* 36 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllTemplateMetadatas() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/templatesMetadata/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllTemplateMetadatas = getAllTemplateMetadatas;
	            function getTemplateMetadatasForUser(userId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/templatesMetadata/user/" + userId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getTemplateMetadatasForUser = getTemplateMetadatasForUser;
	            function postCustomTemplateForUser(template) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/templatesMetadata");
	                return fetch_1.postUri(uri, template);
	            }
	            exports.postCustomTemplateForUser = postCustomTemplateForUser;

	            /***/
	        },
	        /* 37 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getOpenStackVendorProduct(vendorProductPortalId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/" + vendorProductPortalId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackVendorProduct = getOpenStackVendorProduct;
	            function getOpenStackVendorProductComponents(vendorProductPortalId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/" + vendorProductPortalId + "/components");
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackVendorProductComponents = getOpenStackVendorProductComponents;
	            function updateOpenStackVendorProduct(vendorProductPortalId, updateOps) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/" + vendorProductPortalId);
	                return fetch_1.patchUri(uri, updateOps);
	            }
	            exports.updateOpenStackVendorProduct = updateOpenStackVendorProduct;

	            /***/
	        },
	        /* 38 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getHardwareCertification(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/hardware/certcases/" + caseNumber);
	                return fetch_1.getUri(uri);
	            }
	            exports.getHardwareCertification = getHardwareCertification;
	            function createHardwareCertification(certification) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/hardware/certcases/");
	                return fetch_1.getUri(uri);
	            }
	            exports.createHardwareCertification = createHardwareCertification;
	            function updateHardwareCertification(caseNumber, certification) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/hardware/certcases/" + caseNumber);
	                return fetch_1.putUri(uri, certification);
	            }
	            exports.updateHardwareCertification = updateHardwareCertification;
	            function getOpenStackCertification(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/certcases/" + caseNumber);
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackCertification = getOpenStackCertification;
	            function createOpenStackCertification(certification) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/certcases/");
	                return fetch_1.postUri(uri, certification);
	            }
	            exports.createOpenStackCertification = createOpenStackCertification;
	            function updateOpenStackCertification(caseNumber, certification) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/certcases/" + caseNumber);
	                return fetch_1.putUri(uri, certification);
	            }
	            exports.updateOpenStackCertification = updateOpenStackCertification;
	            function getOpenStackApi(component) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/plugin/api");
	                if (component) {
	                    uri.addQueryParam('component', component);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackApi = getOpenStackApi;
	            function getOpenStackFeature(component) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/plugin/feature");
	                if (component) {
	                    uri.addQueryParam('pluginType', component);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackFeature = getOpenStackFeature;
	            function getOpenStackProtocol(component) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/openstack/plugin/protocol");
	                if (component) {
	                    uri.addQueryParam('pluginType', component);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenStackProtocol = getOpenStackProtocol;
	            function getCaseNumberFromPortalId(portalId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certs/casenumber");
	                if (portalId) {
	                    uri.addQueryParam('portalId', portalId);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getCaseNumberFromPortalId = getCaseNumberFromPortalId;

	            /***/
	        },
	        /* 39 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getAll(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/all");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                var result = fetch_1.getUri(uri);
	                return result;
	            }
	            exports.getAll = getAll;
	            function getProgram(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/programs/" + id);
	                return fetch_1.getUri(uri);
	            }
	            exports.getProgram = getProgram;
	            function getPrograms(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/programs");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getPrograms = getPrograms;
	            function getRedHatProduct(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/products/" + id);
	                return fetch_1.getUri(uri);
	            }
	            exports.getRedHatProduct = getRedHatProduct;
	            function getRedHatProducts(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/products");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getRedHatProducts = getRedHatProducts;
	            function getRedHatVersion(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/versions/" + id);
	                return fetch_1.getUri(uri);
	            }
	            exports.getRedHatVersion = getRedHatVersion;
	            function getRedHatVersions(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/versions");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getRedHatVersions = getRedHatVersions;
	            function getPlatform(id) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/platforms/" + id);
	                return fetch_1.getUri(uri);
	            }
	            exports.getPlatform = getPlatform;
	            function getPlatforms(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/rhproducts/v2/platforms");
	                if (filters && Object.keys(filters).length > 0) {
	                    for (var _i = 0, _a = Object.keys(filters); _i < _a.length; _i++) {
	                        var key = _a[_i];
	                        uri.addQueryParam(key, filters[key]);
	                    }
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getPlatforms = getPlatforms;

	            /***/
	        },
	        /* 40 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getCertificationTestPlan(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/testplan");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCertificationTestPlan = getCertificationTestPlan;
	            function updateCertificationTestPlanComponent(caseNumber, testplanComponent) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/testplan");
	                return fetch_1.patchUri(uri, testplanComponent);
	            }
	            exports.updateCertificationTestPlanComponent = updateCertificationTestPlanComponent;
	            function updateCertificationTestPlanItem(caseNumber, testplanItem) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/testplan");
	                return fetch_1.patchUri(uri, testplanItem);
	            }
	            exports.updateCertificationTestPlanItem = updateCertificationTestPlanItem;
	            function updateCertificationExceptionReason(caseNumber, exceptionReason) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/testplan");
	                return fetch_1.patchUri(uri, exceptionReason);
	            }
	            exports.updateCertificationExceptionReason = updateCertificationExceptionReason;
	            function getCertificationTestResults(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCertificationTestResults = getCertificationTestResults;
	            function getCertificationTestLog(caseNumber, rpmId, testId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms/" + rpmId + "/tests/" + testId + "/runtimelog");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCertificationTestLog = getCertificationTestLog;
	            function getCertificationSubTestLog(caseNumber, rpmId, testId, subTestId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms/" + rpmId + "/tests/" + testId + "/subtests/" + subTestId + "/runtimelog");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCertificationSubTestLog = getCertificationSubTestLog;
	            function updateResultReview(caseNumber, rpmId, reviewPatch) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms/" + rpmId);
	                return fetch_1.patchUri(uri, reviewPatch);
	            }
	            exports.updateResultReview = updateResultReview;
	            function updateSubTestStatus(caseNumber, rpmId, runNumber, testId, subTestId, updatePatch) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/certrpms/" + rpmId + "/runs/" + runNumber + "/tests/" + testId);
	                return fetch_1.patchUri(uri, updatePatch);
	            }
	            exports.updateSubTestStatus = updateSubTestStatus;

	            /***/
	        },
	        /* 41 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllShiftsForUsers() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllShiftsForUsers = getAllShiftsForUsers;
	            function getShiftsForUserFilters(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/filter");
	                return fetch_1.postUri(uri, filters);
	            }
	            exports.getShiftsForUserFilters = getShiftsForUserFilters;
	            function postShiftsForUsers(userShifts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/bulk");
	                return fetch_1.postUri(uri, userShifts);
	            }
	            exports.postShiftsForUsers = postShiftsForUsers;
	            function editShiftForUser(shiftRecordId, updatedShiftDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/" + shiftRecordId);
	                return fetch_1.putUri(uri, updatedShiftDetails);
	            }
	            exports.editShiftForUser = editShiftForUser;
	            function deleteShiftByShiftId(shiftId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/" + shiftId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteShiftByShiftId = deleteShiftByShiftId;
	            function deleteShiftForUsers(userShifts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/shifts/remove");
	                return fetch_1.deleteUriWithBody(uri, userShifts);
	            }
	            exports.deleteShiftForUsers = deleteShiftForUsers;

	            /***/
	        },
	        /* 42 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAllGroupMetadatas() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAllGroupMetadatas = getAllGroupMetadatas;
	            function getGroupsForOwner(filters) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/filter");
	                return fetch_1.postUri(uri, filters);
	            }
	            exports.getGroupsForOwner = getGroupsForOwner;
	            function postGroupDetails(groups) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/");
	                return fetch_1.postUri(uri, groups);
	            }
	            exports.postGroupDetails = postGroupDetails;
	            function updateGroupDetails(groups, groupId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/" + groupId + "/");
	                return fetch_1.putUri(uri, groups);
	            }
	            exports.updateGroupDetails = updateGroupDetails;
	            function deleteGroupByGroupId(groupId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/skedge/groups/" + groupId + "/");
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteGroupByGroupId = deleteGroupByGroupId;

	            /***/
	        },
	        /* 43 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function allCounts(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count");
	                return fetch_1.getUri(uri);
	            }
	            exports.allCounts = allCounts;
	            function articlesLinked(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/articles/linked");
	                return fetch_1.getUri(uri);
	            }
	            exports.articlesLinked = articlesLinked;
	            function bomgarSessions(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/bomgarsessions");
	                return fetch_1.getUri(uri);
	            }
	            exports.bomgarSessions = bomgarSessions;
	            function bugzillas(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/bugzillas");
	                return fetch_1.getUri(uri);
	            }
	            exports.bugzillas = bugzillas;
	            function caseHistory(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/casehistory");
	                return fetch_1.getUri(uri);
	            }
	            exports.caseHistory = caseHistory;
	            function chatTranscripts(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/chattranscripts");
	                return fetch_1.getUri(uri);
	            }
	            exports.chatTranscripts = chatTranscripts;
	            function comments(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/comments");
	                return fetch_1.getUri(uri);
	            }
	            exports.comments = comments;
	            function escalationsClosed(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/escalations/closed");
	                return fetch_1.getUri(uri);
	            }
	            exports.escalationsClosed = escalationsClosed;
	            function escalationsOpen(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/escalations/open");
	                return fetch_1.getUri(uri);
	            }
	            exports.escalationsOpen = escalationsOpen;
	            function fileAttachments(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/fileattachments");
	                return fetch_1.getUri(uri);
	            }
	            exports.fileAttachments = fileAttachments;
	            function jiras(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/jiras");
	                return fetch_1.getUri(uri);
	            }
	            exports.jiras = jiras;
	            function solutionsLinked(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/solutions/linked");
	                return fetch_1.getUri(uri);
	            }
	            exports.solutionsLinked = solutionsLinked;
	            function teamMembers(caseId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseId + "/count/teammembers");
	                return fetch_1.getUri(uri);
	            }
	            exports.teamMembers = teamMembers;
	            function reviews(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + options.qualityIndexType + "/count");
	                if (options.userId) {
	                    uri.addQueryParam('userId', options.userId);
	                }
	                if (options.createdFrom) {
	                    uri.addQueryParam('createdFrom', options.createdFrom);
	                }
	                if (options.createdTo) {
	                    uri.addQueryParam('createdTo', options.createdTo);
	                }
	                if (options.contentId) {
	                    uri.addQueryParam('contentId', options.contentId);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.reviews = reviews;
	            function testPlan(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/count/testplan");
	                return fetch_1.getUri(uri);
	            }
	            exports.testPlan = testPlan;
	            function testResult(caseNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cwe/certcases/" + caseNumber + "/count/certrpms");
	                return fetch_1.getUri(uri);
	            }
	            exports.testResult = testResult;

	            /***/
	        },
	        /* 44 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getQuestions(qualityIndexType) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + qualityIndexType + "/reviews/questions");
	                return fetch_1.getUri(uri);
	            }
	            exports.getQuestions = getQuestions;
	            function getKtQuestions(qualityIndexType) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + qualityIndexType + "/reviews/ktquestions");
	                return fetch_1.getUri(uri);
	            }
	            exports.getKtQuestions = getKtQuestions;
	            function getReviews(options) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + options.qualityIndexType + "/reviews");
	                if (options.createdBy) {
	                    uri.addQueryParam('createdBy', options.createdBy);
	                }
	                if (options.createdFrom) {
	                    uri.addQueryParam('createdFrom', options.createdFrom);
	                }
	                if (options.createdTo) {
	                    uri.addQueryParam('createdTo', options.createdTo);
	                }
	                if (options.contentId) {
	                    uri.addQueryParam('contentId', options.contentId);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getReviews = getReviews;
	            function createReview(qualityIndexType, review) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/" + qualityIndexType + "/reviews");
	                return fetch_1.postUri(uri, review);
	            }
	            exports.createReview = createReview;

	            /***/
	        },
	        /* 45 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getProducts(sso) {
	                if (sso) {
	                    var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/products/contact/" + sso);
	                    return fetch_1.getUri(uri);
	                } else {
	                    var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/products");
	                    return fetch_1.getUri(uri);
	                }
	            }
	            exports.getProducts = getProducts;
	            function getProductVersions(productName) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/products/" + productName + "/versions");
	                return fetch_1.getUri(uri);
	            }
	            exports.getProductVersions = getProductVersions;

	            /***/
	        },
	        /* 46 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getSbr(sbrId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/sbrs/" + sbrId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getSbr = getSbr;
	            function getSbrTags(sbrId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/sbrs/" + sbrId + "/tags");
	                return fetch_1.getUri(uri);
	            }
	            exports.getSbrTags = getSbrTags;
	            function getSbrs() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/sbrs");
	                return fetch_1.getUri(uri);
	            }
	            exports.getSbrs = getSbrs;

	            /***/
	        },
	        /* 47 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getExternalTrackers(externalTrackerId, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/externaltrackers/{id}");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getExternalTrackers = getExternalTrackers;
	            function getExternalTrackersUpdates(externalTrackerId, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/externaltrackerupdates/{id}");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getExternalTrackersUpdates = getExternalTrackersUpdates;

	            /***/
	        },
	        /* 48 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getSolrAccess(solrQuery) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/solr/access").addQueryParam('q', solrQuery.q).addQueryParam('fl', '*, score') // this will add the score to each response
	                .addQueryParam('facet', 'true').addQueryParam('facet.field', 'accessState').addQueryParam('facet.field', 'hasPublishedRevision').addQueryParam('hl', 'true').addQueryParam('hl.simple.post', '%3C%2Fmark%3E').addQueryParam('hl.simple.pre', '%3Cmark%3E').addQueryParam('hl.fl', 'abstract').addQueryParam('enableElevation', 'true') // Enable hand picked solutions
	                .addQueryParam('wt', 'json');
	                // It's currently not completely clear if we need to explictly set the language facet.  Mani was unsure.
	                // .addQueryParam('fq', 'language:(en)')
	                if (solrQuery.fq != null) {
	                    uri.addQueryParam('fq', solrQuery.fq);
	                }
	                if (solrQuery.sort != null) {
	                    uri.addQueryParam('sort', solrQuery.sort);
	                }
	                if (solrQuery.start != null) {
	                    uri.addQueryParam('start', solrQuery.start);
	                }
	                if (solrQuery.rows != null) {
	                    uri.addQueryParam('rows', solrQuery.rows);
	                }
	                var headerParams = [{
	                    key: 'Accept',
	                    value: 'application/vnd.redhat.solr+json'
	                }];
	                return fetch_1.getUri(uri, headerParams);
	            }
	            exports.getSolrAccess = getSolrAccess;
	            function getSolrCases(solrQuery) {
	                if (solrQuery.q == null || solrQuery.q === '') throw 'SOLR Query is mandatory';
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/solr/case");
	                uri.addQueryParam('wt', 'json');
	                uri.addQueryParam('q', solrQuery.q);
	                if (solrQuery.fq != null && solrQuery.fq !== '') {
	                    uri.addQueryParam('fq', solrQuery.fq);
	                }
	                if (solrQuery.start != null) {
	                    uri.addQueryParam('start', solrQuery.start);
	                }
	                if (solrQuery.rows != null) {
	                    uri.addQueryParam('rows', solrQuery.rows);
	                }
	                if (solrQuery.sort != null && solrQuery.sort !== '') {
	                    uri.addQueryParam('sort', solrQuery.sort);
	                }
	                if (solrQuery.fl != null && solrQuery.fl !== '') {
	                    uri.addQueryParam('fl', solrQuery.fl);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getSolrCases = getSolrCases;

	            /***/
	        },
	        /* 49 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getAccount(accountNumber, fields) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts/" + accountNumber);
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccount = getAccount;
	            function getAccountContacts(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts/" + accountNumber + "/contacts");
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountContacts = getAccountContacts;
	            function getAccountNotes(accountNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts/" + accountNumber + "/notes");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountNotes = getAccountNotes;
	            function getAccountTeamMembers(accountNumber, fields, limit) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts/" + accountNumber + "/associates");
	                if (fields && fields.length > 0) {
	                    uri.addQueryParam('fields', fields.join(','));
	                }
	                if (limit !== undefined) {
	                    uri.addQueryParam('limit', limit);
	                }
	                return fetch_1.getUri(uri);
	            }
	            exports.getAccountTeamMembers = getAccountTeamMembers;
	            function patchAccounts(accounts) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/accounts");
	                return fetch_1.patchUri(uri, accounts);
	            }
	            exports.patchAccounts = patchAccounts;
	            function getContactDetailBySso(sso) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/contacts/sso/" + sso);
	                return fetch_1.getUri(uri);
	            }
	            exports.getContactDetailBySso = getContactDetailBySso;

	            /***/
	        },
	        /* 50 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getCallCenters() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/callcenters");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCallCenters = getCallCenters;
	            function getCallCenter(callCenterId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/callcenters/" + callCenterId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getCallCenter = getCallCenter;

	            /***/
	        },
	        /* 51 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function createCommentFeedback(caseNumber, comment) {
	                var uri = env_1.default.pcmHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/comments/feedback");
	                return fetch_1.postUri(uri, comment);
	            }
	            exports.createCommentFeedback = createCommentFeedback;
	            function updateCommentFeedback(caseNumber, comment) {
	                var uri = env_1.default.pcmHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/comments/feedback");
	                return fetch_1.putUri(uri, comment);
	            }
	            exports.updateCommentFeedback = updateCommentFeedback;
	            function getCommentFeedback(caseNumber) {
	                var uri = env_1.default.pcmHostName.clone().setPath(env_1.default.pathPrefix + "/cases/" + caseNumber + "/comments/feedback");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCommentFeedback = getCommentFeedback;

	            /***/
	        },
	        /* 52 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function createRole(role) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roles/");
	                return fetch_1.postUri(uri, role);
	            }
	            exports.createRole = createRole;
	            function updateRole(roleId, role) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roles/" + roleId);
	                return fetch_1.putUri(uri, role);
	            }
	            exports.updateRole = updateRole;
	            function deleteRole(roleId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/roles/" + roleId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteRole = deleteRole;

	            /***/
	        },
	        /* 53 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getVocabularyTags() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/tag");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularyTags = getVocabularyTags;
	            function getVocabularyProducts() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/product");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularyProducts = getVocabularyProducts;
	            function getVocabularySbrs() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/sbr");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularySbrs = getVocabularySbrs;
	            function getVocabularyCategory() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/category");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularyCategory = getVocabularyCategory;
	            function getVocabularyComponents() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/vocabulary/component");
	                return fetch_1.getUri(uri);
	            }
	            exports.getVocabularyComponents = getVocabularyComponents;

	            /***/
	        },
	        /* 54 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getMaintenanceMode(configurationType) {
	                if (configurationType === void 0) {
	                    configurationType = 'ascension_maintenance';
	                }
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/configuration/" + configurationType);
	                return fetch_1.getUri(uri);
	            }
	            exports.getMaintenanceMode = getMaintenanceMode;

	            /***/
	        },
	        /* 55 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var user_1 = __webpack_require__(2);
	            var contact_1 = __webpack_require__(3);
	            function getBugzillaCommentFields(options) {
	                var finalFields = [];
	                var fields = ['id', 'bugzillaBugId', 'bugzillaId', 'caseCommentId', 'createdById', 'createdDate', 'isPrivate', 'lastModifiedById', 'lastModifiedDate'];
	                // Not yet mapped as we have no need for it.
	                // 'bugzillaBug',
	                Array.prototype.push.apply(finalFields, fields);
	                if (options && options.includeCreatedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdBy." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedBy." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getBugzillaCommentFields = getBugzillaCommentFields;
	            function getCaseCommentFields(options) {
	                var finalFields = [];
	                if (options && options.minimal === true) {
	                    var minimalFields = ['id', 'commentBody', 'caseNumber', 'createdDate', 'createdByText', 'createdByLink', 'doNotChangeSBT', 'externalHandlingSystem', 'hoursWorked', 'isPublic', 'lastModifiedDate', 'sbt', 'sortDate', 'createdByType'];
	                    Array.prototype.push.apply(finalFields, minimalFields);
	                } else {
	                    var fields = ['id', 'bugzillaCommentId', 'caseNumber', 'caseCommentId', 'caseID', 'commentBody', 'createdById', 'createdDate', 'createdByContactID', 'createdByText', 'createdByLink', 'createdByUserID', 'createdWithBug', 'doNotChangeSBT', 'externalHandlingSystem', 'fromBug', 'hoursWorked', 'inBreach', 'isDraft', 'isPublic', 'lastModifiedById', 'lastModifiedDate', 'lastReferencedDate', 'lastModifiedByContactID', 'lastModifiedByText', 'lastModifiedByUserID', 'lastModifiedDateCustom', 'name', 'sbt', 'sortDate', 'targetDate', 'createdByType'];
	                    Array.prototype.push.apply(finalFields, fields);
	                }
	                if (options && options.includeUncommonFields) {
	                    var uncommonFields = ['caseCommentCreatedDayOfWeek', 'caseCommentCreatedHourOfDay', 'caseCommentCreatedByLocation', 'connectionReceivedId', 'connectionSentId', 'externalCaseCommentId', 'externalId', 'externalTrackerToPartnerPrivateMap', 'helpsResolutionScore', 'lastModifiedByLink', 'lastViewedDate', 'lastModifiedByIdCustom', 'prsRecordID', 'lastVotedOnHelpsResolutionAt', 'representedInOtherSystemsAs', 'roleOfCreatedBy', 'isDeleted', 'managerOfCreatedBy', 'milestoneTargetDate', 'publishedDate', 'publishedMs', 'rhLocation', 'searchHelper', 'systemModstamp'];
	                    Array.prototype.push.apply(finalFields, uncommonFields);
	                }
	                if (options && options.includeBugzillaComment) {
	                    Array.prototype.push.apply(finalFields, getBugzillaCommentFields(options).map(function (f) {
	                        return "bugzillaComment." + f;
	                    }));
	                }
	                if (options && options.includeCreatedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "createdByUser." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByUser) {
	                    Array.prototype.push.apply(finalFields, user_1.getUserFields(options).map(function (f) {
	                        return "lastModifiedByUser." + f;
	                    }));
	                }
	                if (options && options.includeCreatedByContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "createdByContact." + f;
	                    }));
	                }
	                if (options && options.includeLastModifiedByContact) {
	                    Array.prototype.push.apply(finalFields, contact_1.getContactFields(options).map(function (f) {
	                        return "lastModifiedByContact." + f;
	                    }));
	                }
	                return finalFields;
	            }
	            exports.getCaseCommentFields = getCaseCommentFields;

	            /***/
	        },
	        /* 56 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getMetadata() {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/metadata");
	                return fetch_1.getUri(uri);
	            }
	            exports.getMetadata = getMetadata;

	            /***/
	        },
	        /* 57 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            // success Plan
	            function getSuccessPlansForUserName(ssoUsername) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans");
	                uri.addQueryParam('username', ssoUsername);
	                return fetch_1.getUri(uri);
	            }
	            exports.getSuccessPlansForUserName = getSuccessPlansForUserName;
	            function getSuccessPlansForAccountNumber(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/accounts/" + accountNumber);
	                return fetch_1.getUri(uri);
	            }
	            exports.getSuccessPlansForAccountNumber = getSuccessPlansForAccountNumber;
	            function getSuccessPlansForId(successPlanId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getSuccessPlansForId = getSuccessPlansForId;
	            function addSuccessPlan(successPlan) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans");
	                return fetch_1.postUri(uri, successPlan);
	            }
	            exports.addSuccessPlan = addSuccessPlan;
	            function updateSuccessPlan(successPlanId, successPlan) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId);
	                return fetch_1.putUri(uri, successPlan);
	            }
	            exports.updateSuccessPlan = updateSuccessPlan;
	            function removeSuccessPlan(successPlanId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeSuccessPlan = removeSuccessPlan;
	            // Products
	            function addProduct(successPlanId, product) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/products");
	                return fetch_1.postUri(uri, product);
	            }
	            exports.addProduct = addProduct;
	            function updateProduct(product) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + product.successPlanId + "/products/" + product.id);
	                return fetch_1.putUri(uri, product);
	            }
	            exports.updateProduct = updateProduct;
	            function removeProduct(successPlanId, productId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/products/" + productId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeProduct = removeProduct;
	            // Objectives
	            function addObjective(successPlanId, objective) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives");
	                return fetch_1.postUri(uri, objective);
	            }
	            exports.addObjective = addObjective;
	            function updateObjective(objective) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + objective.successPlanId + "/objectives/" + objective.id);
	                return fetch_1.putUri(uri, objective);
	            }
	            exports.updateObjective = updateObjective;
	            function removeObjective(successPlanId, objectiveId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeObjective = removeObjective;
	            // objective doclinks
	            function addObjectiveLink(successPlanId, objectiveId, doclink) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId + "/doclinks");
	                return fetch_1.postUri(uri, doclink);
	            }
	            exports.addObjectiveLink = addObjectiveLink;
	            function updateObjectiveLink(successPlanId, doclink) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + doclink.objectiveId + "/doclinks/" + doclink.id);
	                return fetch_1.putUri(uri, doclink);
	            }
	            exports.updateObjectiveLink = updateObjectiveLink;
	            function removeObjectiveLink(successPlanId, objectiveId, doclinkId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId + "/doclinks/" + doclinkId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeObjectiveLink = removeObjectiveLink;
	            // Objective Stakeholders
	            function addObjectiveStakeholder(successPlanId, objectiveId, stakeholder) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId + "/stakeholders");
	                return fetch_1.postUri(uri, stakeholder);
	            }
	            exports.addObjectiveStakeholder = addObjectiveStakeholder;
	            function updateObjectiveStakeholder(successPlanId, stakeholder) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + stakeholder.objectiveId + "/stakeholders/" + stakeholder.id);
	                return fetch_1.putUri(uri, stakeholder);
	            }
	            exports.updateObjectiveStakeholder = updateObjectiveStakeholder;
	            function removeObjectiveStakeholder(successPlanId, objectiveId, stakeholderId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/successplans/" + successPlanId + "/objectives/" + objectiveId + "/stakeholders/" + stakeholderId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.removeObjectiveStakeholder = removeObjectiveStakeholder;

	            /***/
	        },
	        /* 58 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            // TODO: Need to create Params interface.
	            function getCSAccounts(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/accounts/");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getCSAccounts = getCSAccounts;
	            function getOpenCaseCount(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/accounts/" + accountNumber + "/cases/count");
	                return fetch_1.getUri(uri);
	            }
	            exports.getOpenCaseCount = getOpenCaseCount;
	            function getCTACount(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/accounts/" + accountNumber + "/ctas/count");
	                return fetch_1.getUri(uri);
	            }
	            exports.getCTACount = getCTACount;
	            function getEntitlementCount(accountNumber) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/accounts/" + accountNumber + "/entitlements/count");
	                return fetch_1.getUri(uri);
	            }
	            exports.getEntitlementCount = getEntitlementCount;

	            /***/
	        },
	        /* 59 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function listCtas(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.listCtas = listCtas;
	            function getCtaGroupedCount(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/count");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getCtaGroupedCount = getCtaGroupedCount;
	            function getCta(ctaId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getCta = getCta;
	            function updateCta(ctaId, ctaDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId);
	                return fetch_1.putUri(uri, ctaDetails);
	            }
	            exports.updateCta = updateCta;
	            function addCta(ctaDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas");
	                return fetch_1.postUri(uri, ctaDetails);
	            }
	            exports.addCta = addCta;
	            function deleteCta(ctaId, params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId);
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteCta = deleteCta;
	            function getCtaTasks(ctaId, params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/tasks");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getCtaTasks = getCtaTasks;
	            function updateCtaTask(taskId, ctaId, taskDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/tasks/" + taskId);
	                return fetch_1.putUri(uri, taskDetails);
	            }
	            exports.updateCtaTask = updateCtaTask;
	            function addTask(ctaId, taskDetails) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/tasks");
	                return fetch_1.postUri(uri, taskDetails);
	            }
	            exports.addTask = addTask;
	            function deleteTask(taskId, ctaId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/tasks/" + taskId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteTask = deleteTask;
	            function getCtaComments(ctaId, params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/comments");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getCtaComments = getCtaComments;
	            function getCtaComment(commentId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + commentId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getCtaComment = getCtaComment;
	            function updateCtaComment(commentId, ctaId, comment) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/comments/" + commentId);
	                return fetch_1.putUri(uri, comment);
	            }
	            exports.updateCtaComment = updateCtaComment;
	            function addCtaComment(ctaId, comment) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/comments");
	                return fetch_1.postUri(uri, comment);
	            }
	            exports.addCtaComment = addCtaComment;
	            function deleteCtaComment(commentId, ctaId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/ctas/" + ctaId + "/comments/" + commentId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteCtaComment = deleteCtaComment;

	            /***/
	        },
	        /* 60 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var env_1 = __webpack_require__(0);
	            var fetch_1 = __webpack_require__(1);
	            function getTimeline(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getTimeline = getTimeline;
	            function getTimelineActivity(activityId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline/" + activityId);
	                return fetch_1.getUri(uri);
	            }
	            exports.getTimelineActivity = getTimelineActivity;
	            function updateTimelineActivity(activityId, activity) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline/" + activityId);
	                return fetch_1.putUri(uri, activity);
	            }
	            exports.updateTimelineActivity = updateTimelineActivity;
	            function addTimelineActivity(activity) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline");
	                return fetch_1.postUri(uri, activity);
	            }
	            exports.addTimelineActivity = addTimelineActivity;
	            function deleteTimelineActivity(activityId) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/timeline/" + activityId);
	                return fetch_1.deleteUri(uri);
	            }
	            exports.deleteTimelineActivity = deleteTimelineActivity;

	            /***/
	        },
	        /* 61 */
	        /***/function (module, exports, __webpack_require__) {

	            "use strict";

	            Object.defineProperty(exports, "__esModule", { value: true });
	            var fetch_1 = __webpack_require__(1);
	            var env_1 = __webpack_require__(0);
	            function getContacts(params) {
	                var uri = env_1.default.hydraHostName.clone().setPath(env_1.default.pathPrefix + "/cs/contacts/");
	                params && Object.keys(params).forEach(function (k) {
	                    if (params[k] !== undefined) {
	                        uri.addQueryParam(k, params[k]);
	                    }
	                });
	                return fetch_1.getUri(uri);
	            }
	            exports.getContacts = getContacts;

	            /***/
	        }]
	        /******/)
	    );
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(37)(module)))

/***/ },
/* 171 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    loginSuccess: 'auth-login-success',
	    loginFailed: 'auth-login-failed',
	    logoutSuccess: 'auth-logout-success',
	    sessionTimeout: 'auth-session-timeout',
	    notAuthenticated: 'auth-not-authenticated',
	    notAuthorized: 'auth-not-authorized',
	    sessionIdChanged: 'sid-changed'
	};

/***/ },
/* 172 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = { verbose: true };

/***/ },
/* 173 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    displayLoginStatus: true,
	    autoCheckLogin: true,
	    loginURL: '',
	    logoutURL: '',
	    forceLogin: false
	};

/***/ },
/* 174 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SecurityController = function SecurityController($scope, securityService, SECURITY_CONFIG) {
	    'ngInject';

	    _classCallCheck(this, SecurityController);

	    $scope.securityService = securityService;
	    if (SECURITY_CONFIG.autoCheckLogin) {
	        securityService.validateLogin(SECURITY_CONFIG.forceLogin);
	    }
	    $scope.displayLoginStatus = function () {
	        return SECURITY_CONFIG.displayLoginStatus;
	    };
	};
	SecurityController.$inject = ["$scope", "securityService", "SECURITY_CONFIG"];

	exports.default = SecurityController;

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return {
	        restrict: 'AE',
	        scope: false,
	        template: __webpack_require__(45)
	    };
	};

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Controllers

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _securityController = __webpack_require__(174);

	var _securityController2 = _interopRequireDefault(_securityController);

	var _loginStatus = __webpack_require__(175);

	var _loginStatus2 = _interopRequireDefault(_loginStatus);

	var _securityService = __webpack_require__(177);

	var _securityService2 = _interopRequireDefault(_securityService);

	var _authEvents = __webpack_require__(171);

	var _authEvents2 = _interopRequireDefault(_authEvents);

	var _loginViewConfig = __webpack_require__(172);

	var _loginViewConfig2 = _interopRequireDefault(_loginViewConfig);

	var _securityConfig = __webpack_require__(173);

	var _securityConfig2 = _interopRequireDefault(_securityConfig);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Services
	var app = angular.module('RedhatAccess.security', ['ui.bootstrap', 'ui.router', 'RedhatAccess.header']).constant('AUTH_EVENTS', _authEvents2.default).value('LOGIN_VIEW_CONFIG', _loginViewConfig2.default).value('SECURITY_CONFIG', _securityConfig2.default);

	// Controllers


	// Constants


	// Directives
	app.controller('SecurityController', _securityController2.default);

	// Directives
	app.directive('rhaLoginstatus', _loginStatus2.default);

	// Services
	app.service('securityService', _securityService2.default);

	exports.default = app.name;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _hydrajs = __webpack_require__(170);

	var _hydrajs2 = _interopRequireDefault(_hydrajs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SecurityService = function SecurityService($rootScope, $uibModal, AUTH_EVENTS, $q, LOGIN_VIEW_CONFIG, SECURITY_CONFIG, strataService, AlertService, RHAUtils) {
	    'ngInject';

	    _classCallCheck(this, SecurityService);

	    this.loginStatus = {
	        isLoggedIn: false,
	        verifying: false,
	        userAllowedToManageCases: true,
	        authedUser: {}
	    };
	    this.loggingIn = false;
	    this.loginFailure = false;
	    this.loginURL = SECURITY_CONFIG.loginURL;
	    this.logoutURL = SECURITY_CONFIG.logoutURL;
	    this.isSubscriptionServiceM = false;
	    this.setLoginStatus = function (isLoggedIn, verifying, authedUser) {
	        this.loginStatus.isLoggedIn = isLoggedIn;
	        this.loginStatus.verifying = verifying;
	        this.loginStatus.authedUser = authedUser;
	        this.loginStatus.authedUser.loggedInUser = authedUser.first_name + ' ' + authedUser.last_name;
	        RHAUtils.userTimeZone = authedUser.timezone;
	    };
	    this.clearLoginStatus = function () {
	        this.loginStatus.isLoggedIn = false;
	        this.loginStatus.verifying = false;
	        this.loginStatus.userAllowedToManageCases = false;
	        this.loginStatus.authedUser = {};
	        RHAUtils.userTimeZone = '';
	    };
	    this.setAccount = function (accountJSON) {
	        this.loginStatus.account = accountJSON;
	    };
	    this.modalDefaults = {
	        backdrop: 'static',
	        keyboard: true,
	        modalFade: true,
	        template: __webpack_require__(44),
	        windowClass: 'rha-login-modal'
	    };
	    this.modalOptions = {
	        closeButtonText: 'Close',
	        actionButtonText: 'OK',
	        headerText: 'Proceed?',
	        bodyText: 'Perform this action?',
	        backdrop: 'static'
	    };
	    this.userAllowedToManageCases = function () {
	        var canManage = false;
	        if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.rights) && (this.loginStatus.authedUser.is_entitled || RHAUtils.isNotEmpty(this.loginStatus.authedUser.account))) {
	            for (var i = 0; i < this.loginStatus.authedUser.rights.right.length; i++) {
	                if (this.loginStatus.authedUser.rights.right[i].name === 'portal_manage_cases' && this.loginStatus.authedUser.rights.right[i].has_access === true) {
	                    canManage = true;
	                    break;
	                }
	            }
	        }
	        this.loginStatus.userAllowedToManageCases = canManage;
	    };
	    this.userAllowedToManageEmailNotifications = function (user) {
	        if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && this.loginStatus.authedUser.org_admin) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	    this.userAllowedToManageGroups = function (user) {
	        if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && (!this.loginStatus.authedUser.account.has_group_acls || this.loginStatus.authedUser.account.has_group_acls && this.loginStatus.authedUser.org_admin)) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	    this.userAllowedToManageDefaultGroups = function (user) {
	        if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && this.loginStatus.authedUser.org_admin) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	    this.fetchUserAccountContacts = function (user) {
	        var _this = this;

	        return strataService.accounts.users(user.account_number).then(function (accountContacts) {
	            _this.loginStatus.authedUser.accountContacts = accountContacts;
	        });
	    };
	    this.getBasicAuthToken = function () {
	        var defer = $q.defer();
	        var token = localStorage.getItem('rhAuthToken');
	        if (token !== undefined && token !== '') {
	            defer.resolve(token);
	            return defer.promise;
	        } else {
	            this.login().then(function (authedUser) {
	                defer.resolve(localStorage.getItem('rhAuthToken'));
	            }, function (error) {
	                defer.resolve(error);
	            });
	            return defer.promise;
	        }
	    };
	    this.initLoginStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	        var _this2 = this;

	        var defer, user, accountPromise, configuration, userPromise, managedAccountsPromise, managersForAccountPromise;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        this.loggingIn = true;
	                        this.loginFailure = false;
	                        defer = $q.defer();
	                        // var wasLoggedIn = this.loginStatus.isLoggedIn;

	                        this.loginStatus.verifying = true;

	                        if (!(window.sessionjs != null && window.sessionjs.isAuthenticated() && RHAUtils.isNotEmpty(window.sessionjs.getUserInfo().account_number))) {
	                            _context.next = 26;
	                            break;
	                        }

	                        // JWT specific auth
	                        user = window.sessionjs.getUserInfo();
	                        //load account

	                        strata.addAccountNumber(user.account_number);
	                        accountPromise = strataService.accounts.get(user.account_number).then(function (account) {
	                            _this2.loginStatus.account = account;
	                        }).catch(function () {
	                            _this2.loginStatus.account = null;
	                        });
	                        _context.prev = 8;
	                        _context.next = 11;
	                        return _hydrajs2.default.maintenance.getMaintenanceMode('pcm_configurations');

	                    case 11:
	                        configuration = _context.sent;

	                        if (configuration.length >= 0) {
	                            configuration.map(function (value) {
	                                if (value.fieldName === 'isEntitled' && value.fieldValue === '1') {
	                                    _this2.isSubscriptionServiceM = true;
	                                }
	                            });
	                        }
	                        _context.next = 19;
	                        break;

	                    case 15:
	                        _context.prev = 15;
	                        _context.t0 = _context['catch'](8);

	                        this.isSubscriptionServiceM = false;
	                        console.log('Error getting PCM Configurations' + _context.t0);

	                    case 19:
	                        userPromise = {};

	                        if (this.isSubscriptionServiceM === true) {
	                            userPromise = strataService.users.getBySSO(user.username);
	                        } else {
	                            userPromise = strataService.users.get(user.user_id);
	                        }

	                        managedAccountsPromise = strataService.accounts.managedAccounts.get(user.account_number);
	                        managersForAccountPromise = strataService.accounts.accountManagers.get(user.account_number);


	                        Promise.all([accountPromise, userPromise, managedAccountsPromise, managersForAccountPromise]).then(function (_ref2) {
	                            var _ref3 = _slicedToArray(_ref2, 4),
	                                account = _ref3[0],
	                                authedUser = _ref3[1],
	                                managedAccounts = _ref3[2],
	                                accountManagers = _ref3[3];

	                            // PCM-6964 hardcoded is_entitled = true when subscrition service is down
	                            if (_this2.isSubscriptionServiceM === true) {
	                                authedUser.account_number = user.account_number, authedUser.preferred_language = user.lang, authedUser.is_entitled = true, authedUser.is_active = true, authedUser.timezone = 'America/New_York', authedUser.rights = {
	                                    "right": [{
	                                        "name": "AllowEmailContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "AllowFaxContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "AllowMailContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "AllowPhoneContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "AllowThirdPartyContact",
	                                        "has_access": false
	                                    }, {
	                                        "name": "portal_manage_cases",
	                                        "description": "Customer Portal: Manage Support Cases",
	                                        "has_access": true
	                                    }, {
	                                        "name": "portal_manage_subscriptions",
	                                        "description": "Customer Portal: Manage Subscriptions",
	                                        "has_access": true
	                                    }, {
	                                        "name": "portal_download",
	                                        "description": "Customer Portal: Download Software and Updates",
	                                        "has_access": true
	                                    }, {
	                                        "name": "portal_system_management",
	                                        "description": "Customer Portal: System Management",
	                                        "has_access": true
	                                    }]
	                                };
	                            }
	                            _this2.setLoginStatus(true, false, authedUser);
	                            _this2.loginStatus.authedUser.account = _this2.loginStatus.account;
	                            _this2.loginStatus.authedUser.managedAccounts = managedAccounts;
	                            _this2.loginStatus.authedUser.accountManagers = accountManagers;
	                            if (authedUser.is_internal || authedUser.org_admin) {
	                                _this2.fetchUserAccountContacts(authedUser);
	                            }
	                            _this2.userAllowedToManageCases();
	                            _this2.loggingIn = false;
	                            // if (wasLoggedIn === false) {
	                            //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                            // }
	                            defer.resolve(_this2.loginStatus.authedUser.loggedInUser);
	                        }).catch(function () {
	                            _this2.clearLoginStatus();
	                            _this2.loggingIn = false;
	                            _this2.loginFailure = true;
	                            defer.reject();
	                        });
	                        _context.next = 27;
	                        break;

	                    case 26:
	                        strataService.authentication.checkLogin().then(angular.bind(this, function (authedUser) {
	                            var _this3 = this;

	                            if (authedUser.account) {
	                                this.setAccount(authedUser.account);
	                                // PCM-6964 hardcoded is_entitled = true when subscrition service is down
	                                if (this.isSubscriptionServiceM === true) {
	                                    authedUser.is_entitled = true;
	                                }
	                                this.setLoginStatus(true, false, authedUser);
	                                this.userAllowedToManageCases();
	                                var promisesArray = [];
	                                var _managedAccountsPromise = strataService.accounts.managedAccounts.get(authedUser.account.number);
	                                var _managersForAccountPromise = strataService.accounts.accountManagers.get(authedUser.account.number);
	                                promisesArray.push(_managedAccountsPromise, _managersForAccountPromise);

	                                if (authedUser.is_internal || authedUser.org_admin) {
	                                    var accountContactsPromise = strataService.accounts.users(authedUser.account.number);
	                                    promisesArray.push(accountContactsPromise);
	                                }
	                                Promise.all(promisesArray).then(function (response) {
	                                    _this3.loginStatus.authedUser.managedAccounts = response[0];
	                                    _this3.loginStatus.authedUser.accountManagers = response[1];
	                                    if (authedUser.is_internal || authedUser.org_admin) {
	                                        _this3.loginStatus.authedUser.accountContacts = response[2];
	                                    }
	                                    _this3.loggingIn = false;
	                                    //We don't want to resend the AUTH_EVENTS.loginSuccess if we are already logged in
	                                    // if (wasLoggedIn === false) {
	                                    //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	                                    // }
	                                    defer.resolve(authedUser.loggedInUser);
	                                }).catch(function () {
	                                    _this3.clearLoginStatus();
	                                    AlertService.addStrataErrorMessage(error);
	                                    _this3.loggingIn = false;
	                                    defer.reject(error);
	                                });
	                            } else {
	                                this.loginFailure = true;
	                                this.clearLoginStatus();
	                                this.loggingIn = false;
	                                defer.reject();
	                            }
	                        }), angular.bind(this, function (error) {
	                            this.loginFailure = true;
	                            this.clearLoginStatus();
	                            AlertService.addStrataErrorMessage(error);
	                            this.loggingIn = false;

	                            defer.reject(error);
	                        }));

	                    case 27:
	                        return _context.abrupt('return', defer.promise);

	                    case 28:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this, [[8, 15]]);
	    }));
	    this.validateLogin = function (forceLogin) {
	        var defer = $q.defer();
	        //var that = this;
	        if (!forceLogin) {
	            this.initLoginStatus().then(function (username) {
	                defer.resolve(username);
	            }, function (error) {
	                defer.reject(error);
	            });
	            return defer.promise;
	        } else {
	            this.initLoginStatus().then(function (username) {
	                defer.resolve(username);
	            }, function (error) {
	                this.login().then(function (authedUser) {
	                    defer.resolve(authedUser.loggedInUser);
	                }, function (error) {
	                    defer.reject(error);
	                });
	            });
	            return defer.promise;
	        }
	    };
	    this.login = function () {
	        return this.showLogin(this.modalDefaults, this.modalOptions);
	    };
	    this.logout = function () {
	        strataService.authentication.logout();
	        this.clearLoginStatus();
	        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	    };
	    this.showLogin = function (customModalDefaults, customModalOptions) {
	        //var that = this;
	        //Create temp objects to work with since we're in a singleton service
	        var tempModalDefaults = {};
	        var tempModalOptions = {};
	        //Map angular-ui modal custom defaults to modal defaults defined in service
	        angular.extend(tempModalDefaults, this.modalDefaults, customModalDefaults);
	        //Map modal.html $scope custom properties to defaults defined in service
	        angular.extend(tempModalOptions, this.modalOptions, customModalOptions);
	        if (!tempModalDefaults.controller) {
	            tempModalDefaults.controller = ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
	                $scope.user = {
	                    user: null,
	                    password: null
	                };
	                $scope.status = {
	                    authenticating: false
	                };
	                $scope.useVerboseLoginView = LOGIN_VIEW_CONFIG.verbose;
	                $scope.modalOptions = tempModalOptions;
	                $scope.modalOptions.ok = function (result) {
	                    //Hack below is needed to handle autofill issues
	                    //@see https://github.com/angular/angular.js/issues/1460
	                    //BEGIN HACK
	                    $scope.status.authenticating = true;
	                    $scope.user.user = $('#rha-login-user-id').val();
	                    $scope.user.password = $('#rha-login-password').val();
	                    //END HACK
	                    var resp = strataService.authentication.setCredentials($scope.user.user, $scope.user.password);
	                    if (resp) {
	                        this.initLoginStatus().then(function (authedUser) {
	                            $scope.user.password = '';
	                            $scope.authError = null;
	                            try {
	                                $uibModalInstance.close(authedUser);
	                            } catch (err) {}
	                            $scope.status.authenticating = false;
	                        }, function (error) {
	                            if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
	                                $scope.$apply(function () {
	                                    $scope.authError = 'Login Failed!';
	                                });
	                            } else {
	                                $scope.authError = 'Login Failed!';
	                            }
	                            $scope.status.authenticating = false;
	                        });
	                    } else {
	                        $scope.authError = 'Login Failed!';
	                        $scope.status.authenticating = false;
	                    }
	                };
	                $scope.modalOptions.close = function () {
	                    $scope.status.authenticating = false;
	                    $uibModalInstance.dismiss('User Canceled Login');
	                };
	            }];
	        }
	        return $uibModal.open(tempModalDefaults).result;
	    };
	};
	SecurityService.$inject = ["$rootScope", "$uibModal", "AUTH_EVENTS", "$q", "LOGIN_VIEW_CONFIG", "SECURITY_CONFIG", "strataService", "AlertService", "RHAUtils"];

	exports.default = SecurityService;

/***/ },
/* 178 */
/***/ function(module, exports) {

	module.exports = "<li class=\"rha-treeselector-node\">\n    <div>\n        <span class=\"icon\" ng-class=\"{collapsed: choice.collapsed, expanded: !choice.collapsed}\" ng-show=\"choice.children.length > 0\" ng-click=\"choice.collapsed = !choice.collapsed\">\n        </span>\n        <span class=\"label\" ng-if=\"choice.children.length > 0\" ng-class=\"folder\">{{choice.name}}\n        </span>\n        <span class=\"label\" ng-if=\"choice.children.length === 0\"  ng-click=\"choiceClicked(choice)\">\n            <input type=\"checkbox\" ng-checked=\"choice.checked\">{{choice.name}}\n        </span>\n    </div>\n</li>"

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["uds"] = factory();
		else
			root["uds"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
		    if (true) {
		        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		    } else if (typeof exports !== "undefined") {
		        factory(exports, require('jsuri'));
		    } else {
		        var mod = {
		            exports: {}
		        };
		        factory(mod.exports, global.jsuri);
		        global.uds = mod.exports;
		    }
		})(this, function (exports, Uri) {
		    'use strict';

		    Object.defineProperty(exports, "__esModule", {
		        value: true
		    });
		    exports.fetchCaseDetails = fetchCaseDetails;
		    exports.fetchCaseComments = fetchCaseComments;
		    exports.fetchComments = fetchComments;
		    exports.fetchCaseAssociateDetails = fetchCaseAssociateDetails;
		    exports.getlock = getlock;
		    exports.releaselock = releaselock;
		    exports.fetchAccountDetails = fetchAccountDetails;
		    exports.fetchAccountNotes = fetchAccountNotes;
		    exports.fetchUserDetails = fetchUserDetails;
		    exports.fetchUser = fetchUser;
		    exports.fetchCases = fetchCases;
		    exports.generateBomgarSessionKey = generateBomgarSessionKey;
		    exports.postPublicComments = postPublicComments;
		    exports.postPrivateComments = postPrivateComments;
		    exports.updateCaseDetails = updateCaseDetails;
		    exports.updateCaseOwner = updateCaseOwner;
		    exports.fetchCaseHistory = fetchCaseHistory;
		    exports.getCQIQuestions = getCQIQuestions;
		    exports.getCQIs = getCQIs;
		    exports.postCQIScore = postCQIScore;
		    exports.getSolutionDetails = getSolutionDetails;
		    exports.getSQIQuestions = getSQIQuestions;
		    exports.getSQIs = getSQIs;
		    exports.postSQIScore = postSQIScore;
		    exports.getSbrList = getSbrList;
		    exports.fetchCaseSbrs = fetchCaseSbrs;
		    exports.fetchCaseSbrsExternal = fetchCaseSbrsExternal;
		    exports.pinSolutionToCase = pinSolutionToCase;
		    exports.removeUserSbr = removeUserSbr;
		    exports.getRoleList = getRoleList;
		    exports.getRoleDetails = getRoleDetails;
		    exports.removeUserRole = removeUserRole;
		    exports.updateUserRole = updateUserRole;
		    exports.postAddUsersToSBR = postAddUsersToSBR;
		    exports.postAddUsersToRole = postAddUsersToRole;
		    exports.getOpenCasesForAccount = getOpenCasesForAccount;
		    exports.getCallLogsForCase = getCallLogsForCase;
		    exports.getQuestionDependencies = getQuestionDependencies;
		    exports.postRoleLevel = postRoleLevel;
		    exports.postEditPrivateComments = postEditPrivateComments;
		    exports.postPvtToPubComments = postPvtToPubComments;
		    exports.createCaseNep = createCaseNep;
		    exports.updateCaseNep = updateCaseNep;
		    exports.removeCaseNep = removeCaseNep;
		    exports.getAvgCSATForAccount = getAvgCSATForAccount;
		    exports.getCaseContactsForAccount = getCaseContactsForAccount;
		    exports.getCaseGroupsForContact = getCaseGroupsForContact;
		    exports.getRMECountForAccount = getRMECountForAccount;
		    exports.addAssociates = addAssociates;
		    exports.deleteAssociates = deleteAssociates;
		    exports.fetchSolutionDetails = fetchSolutionDetails;
		    exports.setHandlingSystem = setHandlingSystem;
		    exports.fetchKCSFromDrupal = fetchKCSFromDrupal;
		    exports.fetchSolr = fetchSolr;
		    exports.fetchCaseSolr = fetchCaseSolr;
		    exports.addCaseSbrs = addCaseSbrs;
		    exports.removeCaseSbrs = removeCaseSbrs;
		    exports.getAllRolesList = getAllRolesList;
		    exports.createRole = createRole;
		    exports.updateRole = updateRole;
		    exports.deleteRole = deleteRole;
		    exports.getAdditionalContacts = getAdditionalContacts;
		    exports.removeAdditionalContacts = removeAdditionalContacts;
		    exports.addAdditionalContacts = addAdditionalContacts;
		    exports.getBrmsResponse = getBrmsResponse;
		    exports.fetchTopCasesFromSolr = fetchTopCasesFromSolr;
		    exports.getUserDetailsFromSFDC = getUserDetailsFromSFDC;
		    exports.updateUserDetailsInSFDC = updateUserDetailsInSFDC;
		    exports.getCallCenterFromSFDC = getCallCenterFromSFDC;
		    exports.getCaseTagsList = getCaseTagsList;
		    exports.addCaseTags = addCaseTags;
		    exports.removeCaseTags = removeCaseTags;
		    exports.fetchPriorityTemplates = fetchPriorityTemplates;
		    exports.fetchCaseLanguages = fetchCaseLanguages;
		    exports.fetchBugzillas = fetchBugzillas;
		    exports.fetchBugzillaComments = fetchBugzillaComments;
		    exports.addLanguageToUser = addLanguageToUser;
		    exports.removeLanguagesFromUser = removeLanguagesFromUser;
		    exports.addTagToUser = addTagToUser;
		    exports.removeTagsFromUser = removeTagsFromUser;
		    exports.addUserAsQB = addUserAsQB;
		    exports.removeUserQBs = removeUserQBs;
		    exports.addNNOToUser = addNNOToUser;
		    exports.removeNNOsFromUser = removeNNOsFromUser;
		    exports.setGbdSuperRegion = setGbdSuperRegion;
		    exports.setOutOfOfficeflag = setOutOfOfficeflag;
		    exports.updateResourceLink = updateResourceLink;
		    exports.updateNightShiftForUser = updateNightShiftForUser;
		    exports.updateCaseAttachment = updateCaseAttachment;


		    var udsHostName = new Uri('https://unified-ds-ci.gsslab.brq.redhat.com/');

		    if (window.location.hostname === 'access.redhat.com' || window.location.hostname === 'prod.foo.redhat.com' || window.location.hostname === 'fooprod.redhat.com' || window.location.hostname === 'skedge.redhat.com') {
		        udsHostName = new Uri('https://unified-ds.gsslab.rdu2.redhat.com/');
		    } else {
		        if (window.location.hostname === 'access.qa.redhat.com' || window.location.hostname === 'qa.foo.redhat.com' || window.location.hostname === 'fooqa.redhat.com' || window.location.hostname === 'skedge.qa.redhat.com') {
		            udsHostName = new Uri('https://unified-ds-qa.gsslab.pnq2.redhat.com/');
		        } else {
		            if (window.location.hostname === 'access.devgssci.devlab.phx1.redhat.com' || window.location.hostname === 'ci.foo.redhat.com' || window.location.hostname === 'fooci.redhat.com' || window.location.hostname === 'skedge.ci.redhat.com') {
		                udsHostName = new Uri('https://unified-ds-ci.gsslab.brq.redhat.com/');
		            } else {
		                if (window.location.hostname === 'access.stage.redhat.com' || window.location.hostname === 'stage.foo.redhat.com' || window.location.hostname === 'foostage.redhat.com' || window.location.hostname === 'skedge.stage.redhat.com') {
		                    udsHostName = new Uri('https://unified-ds-stage.gsslab.pnq2.redhat.com/');
		                }
		            }
		        }
		    }

		    if (localStorage && localStorage.getItem('udsHostname')) {
		        udsHostName = localStorage.getItem('udsHostname');
		    }

		    var baseAjaxParams = {
		        accepts: {
		            jsonp: 'application/json, text/json'
		        },
		        crossDomain: true,
		        type: 'GET',
		        method: 'GET',
		        //beforeSend: function(xhr) {
		        //    xhr.setRequestHeader('X-Omit', 'WWW-Authenticate');
		        //    //xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent('<username>' + ':' + '<password>'))))
		        //},
		        //headers: {
		        //    Accept: 'application/json, text/json'
		        //},
		        xhrFields: {
		            withCredentials: true
		        },
		        data: {},
		        dataType: ''
		    };

		    // If the token is expiring within 60 seconds, go ahead and refresh it.  Using 60 seconds considering jwt.js checks if
		    // the token needs to be refreshed every 60 seconds with a TTE of 90 seconds.  So 60 seconds guarantees that
		    // we are at the boundary of what jwt.js does without overlapping a great deal
		    function isTokenExpired() {
		        return window.sessionjs && window.sessionjs.isTokenExpired();
		    }

		    function forceTokenRefresh() {
		        console.warn('Udsjs detected the JWT token has expired, forcing an update');
		        // updateToken(true) forces the token to update by passing -1 to keycloak.updateToken
		        return window.sessionjs.updateToken(true);
		    }

		    function getToken() {
		        if (window.sessionjs && window.sessionjs._state.keycloak.token) {
		            if (window.sessionjs.isAuthenticated()) {
		                return window.sessionjs._state.keycloak.token;
		            }
		        }
		        return null;
		    }

		    var executeUdsAjaxCall = function executeUdsAjaxCall(url, httpMethod) {
		        return new Promise(function (resolve, reject) {
		            return $.ajax($.extend({}, baseAjaxParams, {
		                url: url,
		                type: httpMethod,
		                method: httpMethod,
		                beforeSend: function beforeSend(xhr) {
		                    if (getToken()) {
		                        xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
		                    } else {
		                        console.warn('Could not set JWT token on request, unauthenticated.');
		                    }
		                },
		                success: function success(response, status, xhr) {
		                    return resolve(xhr.status === 204 ? null : response);
		                },
		                error: function error(xhr, status, errorThrown) {
		                    reject(xhr);
		                }
		            }));
		        });
		        return Promise.resolve();
		    };

		    var executeUdsAjaxCallWithJwt = function executeUdsAjaxCallWithJwt(url, httpMethod) {
		        return new Promise(function (resolve, reject) {
		            if (isTokenExpired()) {
		                forceTokenRefresh().success(function () {
		                    executeUdsAjaxCall(url, httpMethod).then(function (response) {
		                        return resolve(response);
		                    }).catch(function (error) {
		                        return reject(error);
		                    });
		                }).error(function () {
		                    // Even if there was an error updating the token, we still need to hit udsjs, which at this point would probably return the "JWT expired" though this edge case is very unlikely.
		                    console.warn('Udsjs unable to force an update of the JWT token.');
		                    executeUdsAjaxCall(url, httpMethod).then(function (response) {
		                        return resolve(response);
		                    }).catch(function (error) {
		                        return reject(error);
		                    });
		                });
		            } else {
		                // Else we have a valid token and continue as always.
		                executeUdsAjaxCall(url, httpMethod).then(function (response) {
		                    return resolve(response);
		                }).catch(function (error) {
		                    return reject(error);
		                });
		            }
		        });
		    };

		    var executeUdsAjaxCallUnAuthed = function executeUdsAjaxCallUnAuthed(url, httpMethod) {
		        return new Promise(function (resolve, reject) {
		            return $.ajax($.extend({}, baseAjaxParams, {
		                url: url,
		                type: httpMethod,
		                method: httpMethod,
		                xhrFields: {
		                    withCredentials: false
		                },
		                success: function success(response, status, xhr) {
		                    return resolve(xhr.status === 204 ? null : response);
		                },
		                error: function error(xhr, status) {
		                    return reject(xhr);
		                }
		            }));
		        });
		        return Promise.resolve();
		    };

		    var executeUdsAjaxCallWithData = function executeUdsAjaxCallWithData(url, data, httpMethod, dataType) {
		        return new Promise(function (resolve, reject) {
		            return $.ajax($.extend({}, baseAjaxParams, {
		                url: url,
		                data: JSON.stringify(data),
		                contentType: 'application/json',
		                type: httpMethod,
		                method: httpMethod,
		                beforeSend: function beforeSend(xhr) {
		                    // xhr.setRequestHeader('X-Omit', 'WWW-Authenticate');
		                    if (window.sessionjs && window.sessionjs.isAuthenticated() && window.sessionjs._state.keycloak.token) {
		                        xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionjs._state.keycloak.token);
		                    }
		                },
		                dataType: dataType || '',
		                success: function success(response, status, xhr) {
		                    return resolve(xhr.status === 204 ? null : response);
		                },
		                error: function error(xhr, status) {
		                    return reject(xhr);
		                }
		            }));
		        });
		    };

		    var executeUdsAjaxCallWithDataWithJwt = function executeUdsAjaxCallWithDataWithJwt(url, data, httpMethod, dataType) {
		        return new Promise(function (resolve, reject) {
		            if (isTokenExpired()) {
		                forceTokenRefresh().success(function () {
		                    executeUdsAjaxCallWithData(url, data, httpMethod, dataType).then(function (response) {
		                        return resolve(response);
		                    }).catch(function (error) {
		                        return reject(error);
		                    });
		                }).error(function () {
		                    // Even if there was an error updating the token, we still need to hit udsjs, which at this point would probably return the "JWT expired" though this edge case is very unlikely.
		                    console.warn('Udsjs unable to force an update of the JWT token.');
		                    executeUdsAjaxCallWithData(url, data, httpMethod, dataType).then(function (response) {
		                        return resolve(response);
		                    }).catch(function (error) {
		                        return reject(error);
		                    });
		                });
		            } else {
		                // Else we have a valid token and continue as always.
		                executeUdsAjaxCallWithData(url, data, httpMethod, dataType).then(function (response) {
		                    return resolve(response);
		                }).catch(function (error) {
		                    return reject(error);
		                });
		            }
		        });
		    };

		    function fetchCaseDetails(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseComments(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchComments(uql) {
		        var url = udsHostName.clone().setPath('/case/comments').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseAssociateDetails(uql) {
		        var url = udsHostName.clone().setPath('/case/associates').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    //hold the lock on the case
		    function getlock(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/lock");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    //release the lock on the case
		    function releaselock(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/lock");
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function fetchAccountDetails(accountNumber, resourceProjection) {

		        var url = udsHostName.clone().setPath('/account/' + accountNumber);
		        if (resourceProjection != null) {
		            url.addQueryParam('resourceProjection', resourceProjection);
		        } else {
		            url.addQueryParam('resourceProjection', 'Minimal');
		        }
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchAccountNotes(accountNumber) {
		        var url = udsHostName.clone().setPath('/account/' + accountNumber + '/notes');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchUserDetails(ssoUsername) {
		        var url = udsHostName.clone().setPath('/user/') + ssoUsername;
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchUser(userUql, resourceProjection) {
		        var url = udsHostName.clone().setPath('/user').addQueryParam('where', userUql);
		        if (resourceProjection != null) {
		            url.addQueryParam('resourceProjection', resourceProjection);
		        }
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCases(uql, resourceProjection, limit, sortOption, statusOnly, nepUql) {
		        var path = '/case';
		        if (statusOnly) {
		            path = '/case/list-status-only';
		        }
		        var url = udsHostName.clone().setPath(path).addQueryParam('where', uql);
		        if (nepUql != null) {
		            url.addQueryParam('nepWhere', nepUql);
		        }
		        if (resourceProjection != null) {
		            url.addQueryParam('resourceProjection', resourceProjection);
		        } else {
		            url.addQueryParam('resourceProjection', 'Minimal');
		        }
		        if (limit != null) {
		            url.addQueryParam('limit', limit);
		        }
		        if (sortOption != null) {
		            url.addQueryParam('orderBy', sortOption);
		        }
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function generateBomgarSessionKey(caseId) {
		        var url = udsHostName.clone().setPath('/case/' + caseId + '/remote-session-key');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function postPublicComments(caseNumber, caseComment, doNotChangeSbt, hoursWorked) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/public");
		        if (hoursWorked !== undefined) {
		            url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/public/hoursWorked/" + hoursWorked);
		        }
		        if (doNotChangeSbt) {
		            url.addQueryParam('doNotChangeSbt', doNotChangeSbt);
		        }
		        return executeUdsAjaxCallWithDataWithJwt(url, caseComment, 'POST');
		    }

		    function postPrivateComments(caseNumber, caseComment, hoursWorked) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/private");
		        if (hoursWorked === undefined) {
		            url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/private");
		        } else {
		            url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/private/hoursWorked/" + hoursWorked);
		        }
		        return executeUdsAjaxCallWithDataWithJwt(url, caseComment, 'POST');
		    }

		    function updateCaseDetails(caseNumber, caseDetails) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber);
		        return executeUdsAjaxCallWithDataWithJwt(url, caseDetails, 'PUT');
		    }

		    function updateCaseOwner(caseNumber, ownerSSO) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/owner/' + ownerSSO);
		        return executeUdsAjaxCallWithJwt(url, 'PUT');
		    }

		    function fetchCaseHistory(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/history");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCQIQuestions(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/reviews/questions');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    // Allows for UQL for fetching CQIs
		    function getCQIs(uql) {
		        var url = udsHostName.clone().setPath('/case/reviews').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function postCQIScore(caseNumber, reviewData) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/reviews');
		        return executeUdsAjaxCallWithDataWithJwt(url, reviewData, 'POST');
		    }

		    function getSolutionDetails(solutionNumber, resourceProjection) {
		        var url = udsHostName.clone().setPath('/documentation/solution/' + solutionNumber);
		        if (resourceProjection !== undefined) {
		            url.addQueryParam('resourceProjection', resourceProjection);
		        }
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getSQIQuestions(solutionNumber) {
		        var url = udsHostName.clone().setPath('/documentation/solution/' + solutionNumber + '/reviews/questions');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    // Allows for UQL for fetching SQIs
		    function getSQIs(uql) {
		        var url = udsHostName.clone().setPath('/documentation/solution/reviews').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function postSQIScore(solutionNumber, reviewData) {
		        var url = udsHostName.clone().setPath('/documentation/solution/' + solutionNumber + '/reviews');
		        return executeUdsAjaxCallWithDataWithJwt(url, reviewData, 'POST');
		    }

		    function getSbrList(resourceProjection, query) {
		        var url = udsHostName.clone().setPath('/user/metadata/sbrs');
		        url.addQueryParam('resourceProjection', resourceProjection);
		        url.addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseSbrs() {
		        var url = udsHostName.clone().setPath('/case/sbrs');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    // Unauthed sbrs
		    function fetchCaseSbrsExternal() {
		        var url = udsHostName.clone().setPath('/external/case/sbrs');
		        return executeUdsAjaxCallUnAuthed(url, 'GET');
		    }

		    function pinSolutionToCase(caseNumber, solutionJson) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber);
		        return executeUdsAjaxCallWithDataWithJwt(url, solutionJson, 'PUT');
		    }

		    function removeUserSbr(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/sbr').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function getRoleList(query) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles');
		        url.addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getRoleDetails(roleId) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/' + roleId);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function removeUserRole(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/role').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function updateUserRole(userId, role) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/role/' + role.externalModelId);
		        return executeUdsAjaxCallWithDataWithJwt(url, role.resource, 'PUT');
		    }

		    function postAddUsersToSBR(userId, uql, data) {
		        if (uql == null || uql == undefined || uql === '') {
		            throw 'User Query is mandatory';
		        }
		        var url = udsHostName.clone().setPath('/user/' + userId + '/sbr').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithDataWithJwt(url, data, 'POST');
		    }

		    function postAddUsersToRole(userId, uql, data) {
		        if (uql == null || uql == undefined || uql === '') {
		            throw 'User Query is mandatory';
		        }
		        var url = udsHostName.clone().setPath('/user/' + userId + '/role').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithDataWithJwt(url, data, 'POST');
		    }

		    function getOpenCasesForAccount(uql) {
		        var path = '/case';
		        var url = udsHostName.clone().setPath(path).addQueryParam('where', uql);
		        url.addQueryParam('resourceProjection', 'Minimal');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCallLogsForCase(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/calls");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getQuestionDependencies() {
		        var path = '/case/ktquestions';
		        var url = udsHostName.clone().setPath(path);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function postRoleLevel(userId, roleName, roleLevel) {
		        var url = udsHostName.clone().setPath('/user/' + userId + "/role-level/" + roleName);
		        return executeUdsAjaxCallWithDataWithJwt(url, roleLevel, 'PUT');
		    }

		    function postEditPrivateComments(caseNumber, caseComment, caseCommentId, draft) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/" + caseCommentId + "/private");
		        url.addQueryParam('draft', draft);
		        return executeUdsAjaxCallWithDataWithJwt(url, caseComment, 'PUT');
		    }

		    function postPvtToPubComments(caseNumber, caseComment, caseCommentId, draft) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/comments/" + caseCommentId + "/public");
		        url.addQueryParam('draft', draft);
		        return executeUdsAjaxCallWithDataWithJwt(url, caseComment, 'PUT');
		    }

		    function createCaseNep(caseNumber, nep) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/nep");
		        return executeUdsAjaxCallWithDataWithJwt(url, nep, 'POST');
		    }

		    function updateCaseNep(caseNumber, nep) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/nep");
		        return executeUdsAjaxCallWithDataWithJwt(url, nep, 'PUT');
		    }

		    function removeCaseNep(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/nep");
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function getAvgCSATForAccount(uql) {
		        var url = udsHostName.clone().setPath('/metrics/CsatAccountAvg').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCaseContactsForAccount(accountNumber) {
		        var url = udsHostName.clone().setPath('/account/' + accountNumber + "/contacts");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCaseGroupsForContact(contactSSO) {
		        var url = udsHostName.clone().setPath('/case/casegroups/user/' + contactSSO);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getRMECountForAccount(uql) {
		        var url = udsHostName.clone().setPath('/case/history').addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function addAssociates(caseNumber, jsonAssociates) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/associate");
		        return executeUdsAjaxCallWithDataWithJwt(url, jsonAssociates, 'POST');
		    }

		    function deleteAssociates(caseNumber, jsonAssociates) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/associate");
		        return executeUdsAjaxCallWithDataWithJwt(url, jsonAssociates, 'DELETE');
		    }

		    function fetchSolutionDetails(solutionIdQuery) {
		        var url = udsHostName.clone().setPath('/documentation/solution').addQueryParam('where', solutionIdQuery);
		        url.addQueryParam('resourceProjection', 'Minimal');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function setHandlingSystem(caseNumber, handlingSystemArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/handlingsystems");
		        return executeUdsAjaxCallWithDataWithJwt(url, handlingSystemArray, 'PUT');
		    }

		    function fetchKCSFromDrupal(id) {
		        var url = udsHostName.clone().setPath('/documentation/drupalapi/' + id);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchSolr(query) {
		        if (query.q == null || query.q === '') throw 'SOLR Query is mandatory';

		        var url = udsHostName.clone().setPath('/solr');
		        url.addQueryParam('wt', 'json');
		        url.addQueryParam('q', query.q);
		        if (query.fq != null && query.fq !== '') {
		            url.addQueryParam('fq', query.fq);
		        }
		        if (query.start != null) {
		            url.addQueryParam('start', query.start);
		        }
		        if (query.rows != null) {
		            url.addQueryParam('rows', query.rows);
		        }
		        if (query.sort != null && query.sort !== '') {
		            url.addQueryParam('sort', query.sort);
		        }
		        if (query.fl != null && query.fl !== '') {
		            url.addQueryParam('fl', query.fl);
		        }

		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseSolr(query) {
		        if (query.q == null || query.q === '') throw 'SOLR Query is mandatory';

		        var url = udsHostName.clone().setPath('/solr/cases');
		        url.addQueryParam('wt', 'json');
		        url.addQueryParam('q', query.q);
		        if (query.fq != null && query.fq !== '') {
		            url.addQueryParam('fq', query.fq);
		        }
		        if (query.start != null) {
		            url.addQueryParam('start', query.start);
		        }
		        if (query.rows != null) {
		            url.addQueryParam('rows', query.rows);
		        }
		        if (query.sort != null && query.sort !== '') {
		            url.addQueryParam('sort', query.sort);
		        }
		        if (query.fl != null && query.fl !== '') {
		            url.addQueryParam('fl', query.fl);
		        }

		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function addCaseSbrs(caseNumber, sbrArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/sbrs");
		        return executeUdsAjaxCallWithDataWithJwt(url, sbrArray, 'PUT');
		    }

		    function removeCaseSbrs(caseNumber, sbrArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/sbrs");
		        return executeUdsAjaxCallWithDataWithJwt(url, sbrArray, 'DELETE');
		    }

		    function getAllRolesList(query) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/query');
		        url.addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function createRole(roleDetails) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/add');
		        return executeUdsAjaxCallWithDataWithJwt(url, roleDetails, 'POST');
		    }

		    function updateRole(roleId, rolePayload) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/' + roleId);
		        return executeUdsAjaxCallWithDataWithJwt(url, rolePayload, 'PUT');
		    }

		    function deleteRole(roleId) {
		        var url = udsHostName.clone().setPath('/user/metadata/roles/' + roleId);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function getAdditionalContacts(caseNumber) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/contacts");
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function removeAdditionalContacts(caseNumber, contacts) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/contacts");
		        return executeUdsAjaxCallWithDataWithJwt(url, contacts, 'DELETE');
		    }

		    function addAdditionalContacts(caseNumber, contacts) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/contacts");
		        return executeUdsAjaxCallWithDataWithJwt(url, contacts, 'PUT');
		    }

		    function getBrmsResponse(jsonObject) {
		        var url = udsHostName.clone().setPath('/brms');
		        return executeUdsAjaxCallWithDataWithJwt(url, jsonObject, 'POST', 'text');
		    }

		    function fetchTopCasesFromSolr(queryString) {
		        var url = udsHostName.clone().setPath('/solr?' + queryString);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getUserDetailsFromSFDC(userID) {
		        var url = udsHostName.clone().setPath('/salesforce/user/' + userID);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function updateUserDetailsInSFDC(ssoUsername, data) {
		        var url = udsHostName.clone().setPath('/user/salesforce/' + ssoUsername);
		        return executeUdsAjaxCallWithDataWithJwt(url, data, 'PUT');
		    }

		    function getCallCenterFromSFDC(callCenterId) {
		        var url = udsHostName.clone().setPath('/callcenter/' + callCenterId);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function getCaseTagsList() {
		        var url = udsHostName.clone().setPath('/case/tags');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function addCaseTags(caseNumber, tagsArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/tags");
		        return executeUdsAjaxCallWithDataWithJwt(url, tagsArray, 'PUT');
		    }

		    function removeCaseTags(caseNumber, tagsArray) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + "/tags");
		        return executeUdsAjaxCallWithDataWithJwt(url, tagsArray, 'DELETE');
		    }

		    function fetchPriorityTemplates(uql) {
		        var url = udsHostName.clone().setPath('/user/metadata/templates');
		        url.addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchCaseLanguages() {
		        var url = udsHostName.clone().setPath('/case/languages');
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchBugzillas(uql) {
		        var url = udsHostName.clone().setPath('/bug');
		        url.addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function fetchBugzillaComments(uql) {
		        var url = udsHostName.clone().setPath('/bug/comments');
		        url.addQueryParam('where', uql);
		        return executeUdsAjaxCallWithJwt(url, 'GET');
		    }

		    function addLanguageToUser(userId, language, type) {
		        if (type !== "primary" && type !== "secondary") type = "primary";
		        var url = udsHostName.clone().setPath('/user/' + userId + '/language/' + type + '/' + language);
		        return executeUdsAjaxCallWithJwt(url, 'POST');
		    }

		    function removeLanguagesFromUser(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/language').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function addTagToUser(userId, tagName) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/tag/' + tagName);
		        return executeUdsAjaxCallWithJwt(url, 'POST');
		    }

		    function removeTagsFromUser(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/tag').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function addUserAsQB(qbUserId, userId) {
		        var url = udsHostName.clone().setPath('/user/' + qbUserId + '/queuebuddy/' + userId);
		        return executeUdsAjaxCallWithJwt(url, 'POST');
		    }

		    function removeUserQBs(qbUserId, query) {
		        var url = udsHostName.clone().setPath('/user/' + qbUserId + '/queuebuddy').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function addNNOToUser(userId, nnoRegion) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/nnoregion/' + nnoRegion);
		        return executeUdsAjaxCallWithJwt(url, 'POST');
		    }

		    function removeNNOsFromUser(userId, query) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/nnoregion').addQueryParam('where', query);
		        return executeUdsAjaxCallWithJwt(url, 'DELETE');
		    }

		    function setGbdSuperRegion(userId, value) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/virtualoffice/' + value);
		        return executeUdsAjaxCallWithJwt(url, 'PUT');
		    }

		    function setOutOfOfficeflag(userId, value) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/out-of-office');
		        return executeUdsAjaxCallWithDataWithJwt(url, value, 'POST');
		    }

		    function updateResourceLink(caseNumber, resourceLink) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/resourcelink');
		        return executeUdsAjaxCallWithDataWithJwt(url, resourceLink, 'PUT');
		    }

		    function updateNightShiftForUser(userId, value) {
		        var url = udsHostName.clone().setPath('/user/' + userId + '/nightshift/' + value);
		        return executeUdsAjaxCallWithJwt(url, 'PUT');
		    }

		    function updateCaseAttachment(caseNumber, attachmentId, attachmentDetails) {
		        var url = udsHostName.clone().setPath('/case/' + caseNumber + '/attachment/' + attachmentId);
		        return executeUdsAjaxCallWithDataWithJwt(url, attachmentDetails, 'PUT');
		    }
		});

	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		var __WEBPACK_AMD_DEFINE_RESULT__;/*!
		 * jsUri
		 * https://github.com/derek-watson/jsUri
		 *
		 * Copyright 2013, Derek Watson
		 * Released under the MIT license.
		 *
		 * Includes parseUri regular expressions
		 * http://blog.stevenlevithan.com/archives/parseuri
		 * Copyright 2007, Steven Levithan
		 * Released under the MIT license.
		 */

		 /*globals define, module */

		(function(global) {

		  var re = {
		    starts_with_slashes: /^\/+/,
		    ends_with_slashes: /\/+$/,
		    pluses: /\+/g,
		    query_separator: /[&;]/,
		    uri_parser: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		  };

		  /**
		   * Define forEach for older js environments
		   * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach#Compatibility
		   */
		  if (!Array.prototype.forEach) {
		    Array.prototype.forEach = function(callback, thisArg) {
		      var T, k;

		      if (this == null) {
		        throw new TypeError(' this is null or not defined');
		      }

		      var O = Object(this);
		      var len = O.length >>> 0;

		      if (typeof callback !== "function") {
		        throw new TypeError(callback + ' is not a function');
		      }

		      if (arguments.length > 1) {
		        T = thisArg;
		      }

		      k = 0;

		      while (k < len) {
		        var kValue;
		        if (k in O) {
		          kValue = O[k];
		          callback.call(T, kValue, k, O);
		        }
		        k++;
		      }
		    };
		  }

		  /**
		   * unescape a query param value
		   * @param  {string} s encoded value
		   * @return {string}   decoded value
		   */
		  function decode(s) {
		    if (s) {
		        s = s.toString().replace(re.pluses, '%20');
		        s = decodeURIComponent(s);
		    }
		    return s;
		  }

		  /**
		   * Breaks a uri string down into its individual parts
		   * @param  {string} str uri
		   * @return {object}     parts
		   */
		  function parseUri(str) {
		    var parser = re.uri_parser;
		    var parserKeys = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "isColonUri", "relative", "path", "directory", "file", "query", "anchor"];
		    var m = parser.exec(str || '');
		    var parts = {};

		    parserKeys.forEach(function(key, i) {
		      parts[key] = m[i] || '';
		    });

		    return parts;
		  }

		  /**
		   * Breaks a query string down into an array of key/value pairs
		   * @param  {string} str query
		   * @return {array}      array of arrays (key/value pairs)
		   */
		  function parseQuery(str) {
		    var i, ps, p, n, k, v, l;
		    var pairs = [];

		    if (typeof(str) === 'undefined' || str === null || str === '') {
		      return pairs;
		    }

		    if (str.indexOf('?') === 0) {
		      str = str.substring(1);
		    }

		    ps = str.toString().split(re.query_separator);

		    for (i = 0, l = ps.length; i < l; i++) {
		      p = ps[i];
		      n = p.indexOf('=');

		      if (n !== 0) {
		        k = decode(p.substring(0, n));
		        v = decode(p.substring(n + 1));
		        pairs.push(n === -1 ? [p, null] : [k, v]);
		      }

		    }
		    return pairs;
		  }

		  /**
		   * Creates a new Uri object
		   * @constructor
		   * @param {string} str
		   */
		  function Uri(str) {
		    this.uriParts = parseUri(str);
		    this.queryPairs = parseQuery(this.uriParts.query);
		    this.hasAuthorityPrefixUserPref = null;
		  }

		  /**
		   * Define getter/setter methods
		   */
		  ['protocol', 'userInfo', 'host', 'port', 'path', 'anchor'].forEach(function(key) {
		    Uri.prototype[key] = function(val) {
		      if (typeof val !== 'undefined') {
		        this.uriParts[key] = val;
		      }
		      return this.uriParts[key];
		    };
		  });

		  /**
		   * if there is no protocol, the leading // can be enabled or disabled
		   * @param  {Boolean}  val
		   * @return {Boolean}
		   */
		  Uri.prototype.hasAuthorityPrefix = function(val) {
		    if (typeof val !== 'undefined') {
		      this.hasAuthorityPrefixUserPref = val;
		    }

		    if (this.hasAuthorityPrefixUserPref === null) {
		      return (this.uriParts.source.indexOf('//') !== -1);
		    } else {
		      return this.hasAuthorityPrefixUserPref;
		    }
		  };

		  Uri.prototype.isColonUri = function (val) {
		    if (typeof val !== 'undefined') {
		      this.uriParts.isColonUri = !!val;
		    } else {
		      return !!this.uriParts.isColonUri;
		    }
		  };

		  /**
		   * Serializes the internal state of the query pairs
		   * @param  {string} [val]   set a new query string
		   * @return {string}         query string
		   */
		  Uri.prototype.query = function(val) {
		    var s = '', i, param, l;

		    if (typeof val !== 'undefined') {
		      this.queryPairs = parseQuery(val);
		    }

		    for (i = 0, l = this.queryPairs.length; i < l; i++) {
		      param = this.queryPairs[i];
		      if (s.length > 0) {
		        s += '&';
		      }
		      if (param[1] === null) {
		        s += param[0];
		      } else {
		        s += param[0];
		        s += '=';
		        if (typeof param[1] !== 'undefined') {
		          s += encodeURIComponent(param[1]);
		        }
		      }
		    }
		    return s.length > 0 ? '?' + s : s;
		  };

		  /**
		   * returns the first query param value found for the key
		   * @param  {string} key query key
		   * @return {string}     first value found for key
		   */
		  Uri.prototype.getQueryParamValue = function (key) {
		    var param, i, l;
		    for (i = 0, l = this.queryPairs.length; i < l; i++) {
		      param = this.queryPairs[i];
		      if (key === param[0]) {
		        return param[1];
		      }
		    }
		  };

		  /**
		   * returns an array of query param values for the key
		   * @param  {string} key query key
		   * @return {array}      array of values
		   */
		  Uri.prototype.getQueryParamValues = function (key) {
		    var arr = [], i, param, l;
		    for (i = 0, l = this.queryPairs.length; i < l; i++) {
		      param = this.queryPairs[i];
		      if (key === param[0]) {
		        arr.push(param[1]);
		      }
		    }
		    return arr;
		  };

		  /**
		   * removes query parameters
		   * @param  {string} key     remove values for key
		   * @param  {val}    [val]   remove a specific value, otherwise removes all
		   * @return {Uri}            returns self for fluent chaining
		   */
		  Uri.prototype.deleteQueryParam = function (key, val) {
		    var arr = [], i, param, keyMatchesFilter, valMatchesFilter, l;

		    for (i = 0, l = this.queryPairs.length; i < l; i++) {

		      param = this.queryPairs[i];
		      keyMatchesFilter = decode(param[0]) === decode(key);
		      valMatchesFilter = param[1] === val;

		      if ((arguments.length === 1 && !keyMatchesFilter) || (arguments.length === 2 && (!keyMatchesFilter || !valMatchesFilter))) {
		        arr.push(param);
		      }
		    }

		    this.queryPairs = arr;

		    return this;
		  };

		  /**
		   * adds a query parameter
		   * @param  {string}  key        add values for key
		   * @param  {string}  val        value to add
		   * @param  {integer} [index]    specific index to add the value at
		   * @return {Uri}                returns self for fluent chaining
		   */
		  Uri.prototype.addQueryParam = function (key, val, index) {
		    if (arguments.length === 3 && index !== -1) {
		      index = Math.min(index, this.queryPairs.length);
		      this.queryPairs.splice(index, 0, [key, val]);
		    } else if (arguments.length > 0) {
		      this.queryPairs.push([key, val]);
		    }
		    return this;
		  };

		  /**
		   * test for the existence of a query parameter
		   * @param  {string}  key        add values for key
		   * @param  {string}  val        value to add
		   * @param  {integer} [index]    specific index to add the value at
		   * @return {Uri}                returns self for fluent chaining
		   */
		  Uri.prototype.hasQueryParam = function (key) {
		    var i, len = this.queryPairs.length;
		    for (i = 0; i < len; i++) {
		      if (this.queryPairs[i][0] == key)
		        return true;
		    }
		    return false;
		  };

		  /**
		   * replaces query param values
		   * @param  {string} key         key to replace value for
		   * @param  {string} newVal      new value
		   * @param  {string} [oldVal]    replace only one specific value (otherwise replaces all)
		   * @return {Uri}                returns self for fluent chaining
		   */
		  Uri.prototype.replaceQueryParam = function (key, newVal, oldVal) {
		    var index = -1, len = this.queryPairs.length, i, param;

		    if (arguments.length === 3) {
		      for (i = 0; i < len; i++) {
		        param = this.queryPairs[i];
		        if (decode(param[0]) === decode(key) && decodeURIComponent(param[1]) === decode(oldVal)) {
		          index = i;
		          break;
		        }
		      }
		      if (index >= 0) {
		        this.deleteQueryParam(key, decode(oldVal)).addQueryParam(key, newVal, index);
		      }
		    } else {
		      for (i = 0; i < len; i++) {
		        param = this.queryPairs[i];
		        if (decode(param[0]) === decode(key)) {
		          index = i;
		          break;
		        }
		      }
		      this.deleteQueryParam(key);
		      this.addQueryParam(key, newVal, index);
		    }
		    return this;
		  };

		  /**
		   * Define fluent setter methods (setProtocol, setHasAuthorityPrefix, etc)
		   */
		  ['protocol', 'hasAuthorityPrefix', 'isColonUri', 'userInfo', 'host', 'port', 'path', 'query', 'anchor'].forEach(function(key) {
		    var method = 'set' + key.charAt(0).toUpperCase() + key.slice(1);
		    Uri.prototype[method] = function(val) {
		      this[key](val);
		      return this;
		    };
		  });

		  /**
		   * Scheme name, colon and doubleslash, as required
		   * @return {string} http:// or possibly just //
		   */
		  Uri.prototype.scheme = function() {
		    var s = '';

		    if (this.protocol()) {
		      s += this.protocol();
		      if (this.protocol().indexOf(':') !== this.protocol().length - 1) {
		        s += ':';
		      }
		      s += '//';
		    } else {
		      if (this.hasAuthorityPrefix() && this.host()) {
		        s += '//';
		      }
		    }

		    return s;
		  };

		  /**
		   * Same as Mozilla nsIURI.prePath
		   * @return {string} scheme://user:password@host:port
		   * @see  https://developer.mozilla.org/en/nsIURI
		   */
		  Uri.prototype.origin = function() {
		    var s = this.scheme();

		    if (this.userInfo() && this.host()) {
		      s += this.userInfo();
		      if (this.userInfo().indexOf('@') !== this.userInfo().length - 1) {
		        s += '@';
		      }
		    }

		    if (this.host()) {
		      s += this.host();
		      if (this.port() || (this.path() && this.path().substr(0, 1).match(/[0-9]/))) {
		        s += ':' + this.port();
		      }
		    }

		    return s;
		  };

		  /**
		   * Adds a trailing slash to the path
		   */
		  Uri.prototype.addTrailingSlash = function() {
		    var path = this.path() || '';

		    if (path.substr(-1) !== '/') {
		      this.path(path + '/');
		    }

		    return this;
		  };

		  /**
		   * Serializes the internal state of the Uri object
		   * @return {string}
		   */
		  Uri.prototype.toString = function() {
		    var path, s = this.origin();

		    if (this.isColonUri()) {
		      if (this.path()) {
		        s += ':'+this.path();
		      }
		    } else if (this.path()) {
		      path = this.path();
		      if (!(re.ends_with_slashes.test(s) || re.starts_with_slashes.test(path))) {
		        s += '/';
		      } else {
		        if (s) {
		          s.replace(re.ends_with_slashes, '/');
		        }
		        path = path.replace(re.starts_with_slashes, '/');
		      }
		      s += path;
		    } else {
		      if (this.host() && (this.query().toString() || this.anchor())) {
		        s += '/';
		      }
		    }
		    if (this.query().toString()) {
		      s += this.query().toString();
		    }

		    if (this.anchor()) {
		      if (this.anchor().indexOf('#') !== 0) {
		        s += '#';
		      }
		      s += this.anchor();
		    }

		    return s;
		  };

		  /**
		   * Clone a Uri object
		   * @return {Uri} duplicate copy of the Uri
		   */
		  Uri.prototype.clone = function() {
		    return new Uri(this.toString());
		  };

		  /**
		   * export via AMD or CommonJS, otherwise leak a global
		   */
		  if (true) {
		    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		      return Uri;
		    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		    module.exports = Uri;
		  } else {
		    global.Uri = Uri;
		  }
		}(this));


	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 180 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ]);