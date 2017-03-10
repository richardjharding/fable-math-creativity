(function (exports) {
'use strict';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classCallCheck = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
});

var _classCallCheck = unwrapExports(classCallCheck);

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
});

var _aFunction = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

var aFunction = _aFunction;
var _ctx = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var isObject = _isObject;
var _anObject = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var isObject$1 = _isObject;
var document$1 = _global.document;
var is = isObject$1(document$1) && isObject$1(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

var isObject$2 = _isObject;
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!isObject$2(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

var anObject       = _anObject;
var IE8_DOM_DEFINE = _ie8DomDefine;
var toPrimitive    = _toPrimitive;
var dP$1             = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP$1(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var dP         = _objectDp;
var createDesc = _propertyDesc;
var _hide = _descriptors ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var global$1    = _global;
var core      = _core;
var ctx$1       = _ctx;
var hide      = _hide;
var PROTOTYPE = 'prototype';

var $export$1 = function(type, name, source){
  var IS_FORCED = type & $export$1.F
    , IS_GLOBAL = type & $export$1.G
    , IS_STATIC = type & $export$1.S
    , IS_PROTO  = type & $export$1.P
    , IS_BIND   = type & $export$1.B
    , IS_WRAP   = type & $export$1.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] : (global$1[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx$1(out, global$1)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx$1(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export$1.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export$1.F = 1;   // forced
$export$1.G = 2;   // global
$export$1.S = 4;   // static
$export$1.P = 8;   // proto
$export$1.B = 16;  // bind
$export$1.W = 32;  // wrap
$export$1.U = 64;  // safe
$export$1.R = 128; // real proto method for `library` 
var _export = $export$1;

var $export = _export;
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !_descriptors, 'Object', {defineProperty: _objectDp.f});

var $Object = _core.Object;
var defineProperty$2 = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

var defineProperty = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty$2, __esModule: true };
});

var createClass = createCommonjsModule(function (module, exports) {
"use strict";

exports.__esModule = true;

var _defineProperty = defineProperty;

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
});

var _createClass = unwrapExports(createClass);

var fableGlobal = function () {
    var globalObj = typeof window !== "undefined" ? window
        : (typeof global !== "undefined" ? global
            : (typeof self !== "undefined" ? self : {}));
    if (typeof globalObj.__FABLE_CORE__ === "undefined") {
        globalObj.__FABLE_CORE__ = {
            types: new Map(),
            symbols: {
                reflection: Symbol("reflection"),
            }
        };
    }
    return globalObj.__FABLE_CORE__;
}();
function setType(fullName, cons) {
    fableGlobal.types.set(fullName, cons);
}

var FSymbol = (fableGlobal.symbols);

var NonDeclaredType = (function () {
    function NonDeclaredType(kind, definition, generics) {
        this.kind = kind;
        this.definition = definition;
        this.generics = generics;
    }
    NonDeclaredType.prototype.Equals = function (other) {
        if (this.kind === other.kind && this.definition === other.definition) {
            return typeof this.generics === "object"
                ? equalsRecords(this.generics, other.generics)
                : this.generics === other.generics;
        }
        return false;
    };
    return NonDeclaredType;
}());
var Any = new NonDeclaredType("Any");
var Unit = new NonDeclaredType("Unit");









function getPropertyNames(obj) {
    if (obj == null) {
        return [];
    }
    var propertyMap = typeof obj[FSymbol.reflection] === "function" ? obj[FSymbol.reflection]().properties : obj;
    return Object.getOwnPropertyNames(propertyMap);
}


function toString(o) {
    return o != null && typeof o.ToString == "function" ? o.ToString() : String(o);
}

function equals(x, y) {
    if (x === y)
        return true;
    else if (x == null)
        return y == null;
    else if (y == null)
        return false;
    else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y))
        return false;
    else if (typeof x.Equals === "function")
        return x.Equals(y);
    else if (Array.isArray(x)) {
        if (x.length != y.length)
            return false;
        for (var i = 0; i < x.length; i++)
            if (!equals(x[i], y[i]))
                return false;
        return true;
    }
    else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength)
            return false;
        var dv1 = new DataView(x.buffer), dv2 = new DataView(y.buffer);
        for (var i = 0; i < x.byteLength; i++)
            if (dv1.getUint8(i) !== dv2.getUint8(i))
                return false;
        return true;
    }
    else if (x instanceof Date)
        return x.getTime() == y.getTime();
    else
        return false;
}
function compare(x, y) {
    if (x === y)
        return 0;
    if (x == null)
        return y == null ? 0 : -1;
    else if (y == null)
        return 1;
    else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y))
        return -1;
    else if (typeof x.CompareTo === "function")
        return x.CompareTo(y);
    else if (Array.isArray(x)) {
        if (x.length != y.length)
            return x.length < y.length ? -1 : 1;
        for (var i = 0, j = 0; i < x.length; i++)
            if ((j = compare(x[i], y[i])) !== 0)
                return j;
        return 0;
    }
    else if (ArrayBuffer.isView(x)) {
        if (x.byteLength != y.byteLength)
            return x.byteLength < y.byteLength ? -1 : 1;
        var dv1 = new DataView(x.buffer), dv2 = new DataView(y.buffer);
        for (var i = 0, b1 = 0, b2 = 0; i < x.byteLength; i++) {
            b1 = dv1.getUint8(i), b2 = dv2.getUint8(i);
            if (b1 < b2)
                return -1;
            if (b1 > b2)
                return 1;
        }
        return 0;
    }
    else if (x instanceof Date)
        return compare(x.getTime(), y.getTime());
    else
        return x < y ? -1 : 1;
}
function equalsRecords(x, y) {
    if (x === y) {
        return true;
    }
    else {
        var keys = getPropertyNames(x);
        for (var i = 0; i < keys.length; i++) {
            if (!equals(x[keys[i]], y[keys[i]]))
                return false;
        }
        return true;
    }
}
function compareRecords(x, y) {
    if (x === y) {
        return 0;
    }
    else {
        var keys = getPropertyNames(x);
        for (var i = 0; i < keys.length; i++) {
            var res = compare(x[keys[i]], y[keys[i]]);
            if (res !== 0)
                return res;
        }
        return 0;
    }
}
function equalsUnions(x, y) {
    if (x === y) {
        return true;
    }
    else if (x.Case !== y.Case) {
        return false;
    }
    else {
        for (var i = 0; i < x.Fields.length; i++) {
            if (!equals(x.Fields[i], y.Fields[i]))
                return false;
        }
        return true;
    }
}
function compareUnions(x, y) {
    if (x === y) {
        return 0;
    }
    else {
        var res = compare(x.Case, y.Case);
        if (res !== 0)
            return res;
        for (var i = 0; i < x.Fields.length; i++) {
            res = compare(x.Fields[i], y.Fields[i]);
            if (res !== 0)
                return res;
        }
        return 0;
    }
}




function randomNext(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function ofArray(args, base) {
    var acc = base || new List$1();
    for (var i = args.length - 1; i >= 0; i--) {
        acc = new List$1(args[i], acc);
    }
    return acc;
}
var List$1 = (function () {
    function List(head, tail) {
        this.head = head;
        this.tail = tail;
    }
    List.prototype.ToString = function () {
        return "[" + Array.from(this).map(toString).join("; ") + "]";
    };
    List.prototype.Equals = function (x) {
        if (this === x) {
            return true;
        }
        else {
            var iter1 = this[Symbol.iterator](), iter2 = x[Symbol.iterator]();
            for (;;) {
                var cur1 = iter1.next(), cur2 = iter2.next();
                if (cur1.done)
                    return cur2.done ? true : false;
                else if (cur2.done)
                    return false;
                else if (!equals(cur1.value, cur2.value))
                    return false;
            }
        }
    };
    List.prototype.CompareTo = function (x) {
        if (this === x) {
            return 0;
        }
        else {
            var acc = 0;
            var iter1 = this[Symbol.iterator](), iter2 = x[Symbol.iterator]();
            for (;;) {
                var cur1 = iter1.next(), cur2 = iter2.next();
                if (cur1.done)
                    return cur2.done ? acc : -1;
                else if (cur2.done)
                    return 1;
                else {
                    acc = compare(cur1.value, cur2.value);
                    if (acc != 0)
                        return acc;
                }
            }
        }
    };
    Object.defineProperty(List.prototype, "length", {
        get: function () {
            var cur = this, acc = 0;
            while (cur.tail != null) {
                cur = cur.tail;
                acc++;
            }
            return acc;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype[Symbol.iterator] = function () {
        var cur = this;
        return {
            next: function () {
                var tmp = cur;
                cur = cur.tail;
                return { done: tmp.tail == null, value: tmp.head };
            }
        };
    };
    List.prototype[FSymbol.reflection] = function () {
        return {
            type: "Microsoft.FSharp.Collections.FSharpList",
            interfaces: ["System.IEquatable", "System.IComparable"]
        };
    };
    return List;
}());

var Enumerator = (function () {
    function Enumerator(iter) {
        this.iter = iter;
    }
    Enumerator.prototype.MoveNext = function () {
        var cur = this.iter.next();
        this.current = cur.value;
        return !cur.done;
    };
    Object.defineProperty(Enumerator.prototype, "Current", {
        get: function () {
            return this.current;
        },
        enumerable: true,
        configurable: true
    });
    Enumerator.prototype.Reset = function () {
        throw new Error("JS iterators cannot be reset");
    };
    Enumerator.prototype.Dispose = function () { };
    return Enumerator;
}());











function compareWith(f, xs, ys) {
    var nonZero = tryFind(function (i) { return i != 0; }, map2(function (x, y) { return f(x, y); }, xs, ys));
    return nonZero != null ? nonZero : count(xs) - count(ys);
}
function delay(f) {
    return _a = {},
        _a[Symbol.iterator] = function () { return f()[Symbol.iterator](); },
        _a;
    var _a;
}










function fold(f, acc, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f, acc);
    }
    else {
        var cur = void 0;
        for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
            cur = iter.next();
            if (cur.done)
                break;
            acc = f(acc, cur.value, i);
        }
        return acc;
    }
}











function iterate(f, xs) {
    fold(function (_, x) { return f(x); }, null, xs);
}






function count(xs) {
    return Array.isArray(xs) || ArrayBuffer.isView(xs)
        ? xs.length
        : fold(function (acc, x) { return acc + 1; }, 0, xs);
}
function map$1(f, xs) {
    return delay(function () { return unfold(function (iter) {
        var cur = iter.next();
        return !cur.done ? [f(cur.value), iter] : null;
    }, xs[Symbol.iterator]()); });
}

function map2(f, xs, ys) {
    return delay(function () {
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next(), cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
        });
    });
}






























function tryFind(f, xs, defaultValue) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done)
            return defaultValue === void 0 ? null : defaultValue;
        if (f(cur.value, i))
            return cur.value;
    }
}









function unfold(f, acc) {
    return _a = {},
        _a[Symbol.iterator] = function () {
            return {
                next: function () {
                    var res = f(acc);
                    if (res != null) {
                        acc = res[1];
                        return { done: false, value: res[0] };
                    }
                    return { done: true };
                }
            };
        },
        _a;
    var _a;
}

var MapTree = (function () {
    function MapTree(caseName, fields) {
        this.Case = caseName;
        this.Fields = fields;
    }
    return MapTree;
}());
function tree_sizeAux(acc, m) {
    return m.Case === "MapOne"
        ? acc + 1
        : m.Case === "MapNode"
            ? tree_sizeAux(tree_sizeAux(acc + 1, m.Fields[2]), m.Fields[3])
            : acc;
}
function tree_size(x) {
    return tree_sizeAux(0, x);
}

function tree_find(comparer, k, m) {
    var res = tree_tryFind(comparer, k, m);
    if (res != null)
        return res;
    throw new Error("key not found");
}
function tree_tryFind(comparer, k, m) {
    if (m.Case === "MapOne") {
        var c = comparer.Compare(k, m.Fields[0]);
        return c === 0 ? m.Fields[1] : null;
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_tryFind(comparer, k, m.Fields[2]);
        }
        else {
            if (c === 0) {
                return m.Fields[1];
            }
            else {
                return tree_tryFind(comparer, k, m.Fields[3]);
            }
        }
    }
    return null;
}
function tree_mem(comparer, k, m) {
    if (m.Case === "MapOne") {
        return comparer.Compare(k, m.Fields[0]) === 0;
    }
    else if (m.Case === "MapNode") {
        var c = comparer.Compare(k, m.Fields[0]);
        if (c < 0) {
            return tree_mem(comparer, k, m.Fields[2]);
        }
        else {
            if (c === 0) {
                return true;
            }
            else {
                return tree_mem(comparer, k, m.Fields[3]);
            }
        }
    }
    else {
        return false;
    }
}
function tree_collapseLHS(stack) {
    if (stack.tail != null) {
        if (stack.head.Case === "MapOne") {
            return stack;
        }
        else if (stack.head.Case === "MapNode") {
            return tree_collapseLHS(ofArray([
                stack.head.Fields[2],
                new MapTree("MapOne", [stack.head.Fields[0], stack.head.Fields[1]]),
                stack.head.Fields[3]
            ], stack.tail));
        }
        else {
            return tree_collapseLHS(stack.tail);
        }
    }
    else {
        return new List$1();
    }
}
function tree_mkIterator(s) {
    return { stack: tree_collapseLHS(new List$1(s, new List$1())), started: false };
}
function tree_moveNext(i) {
    function current(i) {
        if (i.stack.tail == null) {
            return null;
        }
        else if (i.stack.head.Case === "MapOne") {
            return [i.stack.head.Fields[0], i.stack.head.Fields[1]];
        }
        throw new Error("Please report error: Map iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        }
        else {
            if (i.stack.head.Case === "MapOne") {
                i.stack = tree_collapseLHS(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            }
            else {
                throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
            }
        }
    }
    else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
    
}
var FableMap = (function () {
    function FableMap() {
    }
    FableMap.prototype.ToString = function () {
        return "map [" + Array.from(this).map(toString).join("; ") + "]";
    };
    FableMap.prototype.Equals = function (m2) {
        return this.CompareTo(m2) === 0;
    };
    FableMap.prototype.CompareTo = function (m2) {
        var _this = this;
        return this === m2 ? 0 : compareWith(function (kvp1, kvp2) {
            var c = _this.comparer.Compare(kvp1[0], kvp2[0]);
            return c !== 0 ? c : compare(kvp1[1], kvp2[1]);
        }, this, m2);
    };
    FableMap.prototype[Symbol.iterator] = function () {
        var i = tree_mkIterator(this.tree);
        return {
            next: function () { return tree_moveNext(i); }
        };
    };
    FableMap.prototype.entries = function () {
        return this[Symbol.iterator]();
    };
    FableMap.prototype.keys = function () {
        return map$1(function (kv) { return kv[0]; }, this);
    };
    FableMap.prototype.values = function () {
        return map$1(function (kv) { return kv[1]; }, this);
    };
    FableMap.prototype.get = function (k) {
        return tree_find(this.comparer, k, this.tree);
    };
    FableMap.prototype.has = function (k) {
        return tree_mem(this.comparer, k, this.tree);
    };
    FableMap.prototype.set = function (k, v) {
        throw new Error("not supported");
    };
    FableMap.prototype.delete = function (k) {
        throw new Error("not supported");
    };
    FableMap.prototype.clear = function () {
        throw new Error("not supported");
    };
    Object.defineProperty(FableMap.prototype, "size", {
        get: function () {
            return tree_size(this.tree);
        },
        enumerable: true,
        configurable: true
    });
    FableMap.prototype[FSymbol.reflection] = function () {
        return {
            type: "Microsoft.FSharp.Collections.FSharpMap",
            interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
        };
    };
    return FableMap;
}());

function filter$$1(f, xs) {
    return reverse$$1(fold(function (acc, x) { return f(x) ? new List$1(x, acc) : acc; }, new List$1(), xs));
}


function map$$1(f, xs) {
    return reverse$$1(fold(function (acc, x) { return new List$1(f(x), acc); }, new List$1(), xs));
}



function reverse$$1(xs) {
    return fold(function (acc, x) { return new List$1(x, acc); }, new List$1(), xs);
}

var Trampoline = (function () {
    function Trampoline() {
        this.callCount = 0;
    }
    Object.defineProperty(Trampoline, "maxTrampolineCallCount", {
        get: function () {
            return 2000;
        },
        enumerable: true,
        configurable: true
    });
    Trampoline.prototype.incrementAndCheck = function () {
        return this.callCount++ > Trampoline.maxTrampolineCallCount;
    };
    Trampoline.prototype.hijack = function (f) {
        this.callCount = 0;
        setTimeout(f, 0);
    };
    return Trampoline;
}());
function protectedCont(f) {
    return function (ctx) {
        if (ctx.cancelToken.isCancelled)
            ctx.onCancel("cancelled");
        else if (ctx.trampoline.incrementAndCheck())
            ctx.trampoline.hijack(function () {
                try {
                    f(ctx);
                }
                catch (err) {
                    ctx.onError(err);
                }
            });
        else
            try {
                f(ctx);
            }
            catch (err) {
                ctx.onError(err);
            }
    };
}
function protectedBind(computation, binder) {
    return protectedCont(function (ctx) {
        computation({
            onSuccess: function (x) { return binder(x)(ctx); },
            onError: ctx.onError,
            onCancel: ctx.onCancel,
            cancelToken: ctx.cancelToken,
            trampoline: ctx.trampoline
        });
    });
}
function protectedReturn(value) {
    return protectedCont(function (ctx) { return ctx.onSuccess(value); });
}
var AsyncBuilder = (function () {
    function AsyncBuilder() {
    }
    AsyncBuilder.prototype.Bind = function (computation, binder) {
        return protectedBind(computation, binder);
    };
    AsyncBuilder.prototype.Combine = function (computation1, computation2) {
        return this.Bind(computation1, function () { return computation2; });
    };
    AsyncBuilder.prototype.Delay = function (generator) {
        return protectedCont(function (ctx) { return generator()(ctx); });
    };
    AsyncBuilder.prototype.For = function (sequence, body) {
        var iter = sequence[Symbol.iterator]();
        var cur = iter.next();
        return this.While(function () { return !cur.done; }, this.Delay(function () {
            var res = body(cur.value);
            cur = iter.next();
            return res;
        }));
    };
    AsyncBuilder.prototype.Return = function (value) {
        return protectedReturn(value);
    };
    AsyncBuilder.prototype.ReturnFrom = function (computation) {
        return computation;
    };
    AsyncBuilder.prototype.TryFinally = function (computation, compensation) {
        return protectedCont(function (ctx) {
            computation({
                onSuccess: function (x) {
                    compensation();
                    ctx.onSuccess(x);
                },
                onError: function (x) {
                    compensation();
                    ctx.onError(x);
                },
                onCancel: function (x) {
                    compensation();
                    ctx.onCancel(x);
                },
                cancelToken: ctx.cancelToken,
                trampoline: ctx.trampoline
            });
        });
    };
    AsyncBuilder.prototype.TryWith = function (computation, catchHandler) {
        return protectedCont(function (ctx) {
            computation({
                onSuccess: ctx.onSuccess,
                onCancel: ctx.onCancel,
                cancelToken: ctx.cancelToken,
                trampoline: ctx.trampoline,
                onError: function (ex) {
                    try {
                        catchHandler(ex)(ctx);
                    }
                    catch (ex2) {
                        ctx.onError(ex2);
                    }
                }
            });
        });
    };
    AsyncBuilder.prototype.Using = function (resource, binder) {
        return this.TryFinally(binder(resource), function () { return resource.Dispose(); });
    };
    AsyncBuilder.prototype.While = function (guard, computation) {
        var _this = this;
        if (guard())
            return this.Bind(computation, function () { return _this.While(guard, computation); });
        else
            return this.Return(void 0);
    };
    AsyncBuilder.prototype.Zero = function () {
        return protectedCont(function (ctx) { return ctx.onSuccess(void 0); });
    };
    return AsyncBuilder;
}());
var singleton$2 = new AsyncBuilder();

var Choice = (function () {
    function Choice(t, d) {
        this.Case = t;
        this.Fields = d;
    }
    Object.defineProperty(Choice.prototype, "valueIfChoice1", {
        get: function () {
            return this.Case === "Choice1Of2" ? this.Fields[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Choice.prototype, "valueIfChoice2", {
        get: function () {
            return this.Case === "Choice2Of2" ? this.Fields[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Choice.prototype.Equals = function (other) {
        return equalsUnions(this, other);
    };
    Choice.prototype.CompareTo = function (other) {
        return compareUnions(this, other);
    };
    Choice.prototype[FSymbol.reflection] = function () {
        return {
            type: "Microsoft.FSharp.Core.FSharpChoice",
            interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"]
        };
    };
    return Choice;
}());

function emptyContinuation(x) {
}


var defaultCancellationToken = { isCancelled: false };




function sleep(millisecondsDueTime) {
    return protectedCont(function (ctx) {
        setTimeout(function () { return ctx.cancelToken.isCancelled ? ctx.onCancel("cancelled") : ctx.onSuccess(void 0); }, millisecondsDueTime);
    });
}
function start(computation, cancellationToken) {
    return startWithContinuations(computation, cancellationToken);
}
function startImmediate(computation, cancellationToken) {
    return start(computation, cancellationToken);
}
function startWithContinuations(computation, continuation, exceptionContinuation, cancellationContinuation, cancelToken) {
    if (typeof continuation !== "function") {
        cancelToken = continuation;
        continuation = null;
    }
    var trampoline = new Trampoline();
    computation({
        onSuccess: continuation ? continuation : emptyContinuation,
        onError: exceptionContinuation ? exceptionContinuation : emptyContinuation,
        onCancel: cancellationContinuation ? cancellationContinuation : emptyContinuation,
        cancelToken: cancelToken ? cancelToken : defaultCancellationToken,
        trampoline: trampoline
    });
}

var width = 800;
var height = 400;
var Circle = function () {
    function Circle(x, y, scale, scaleSpeed, lrSpeed, alpha, hRad, vRad, hRadInc, vRadInc, lr) {
        _classCallCheck(this, Circle);

        this.X = x;
        this.Y = y;
        this.Scale = scale;
        this.ScaleSpeed = scaleSpeed;
        this.lrSpeed = lrSpeed;
        this.alpha = alpha;
        this.hRad = hRad;
        this.vRad = vRad;
        this.hRadInc = hRadInc;
        this.vRadInc = vRadInc;
        this.lr = lr;
    }

    _createClass(Circle, [{
        key: FSymbol.reflection,
        value: function () {
            return {
                type: "Main.Circle",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    X: "number",
                    Y: "number",
                    Scale: "number",
                    ScaleSpeed: "number",
                    lrSpeed: "number",
                    alpha: "number",
                    hRad: "number",
                    vRad: "number",
                    hRadInc: "number",
                    vRadInc: "number",
                    lr: "number"
                }
            };
        }
    }, {
        key: "Equals",
        value: function (other) {
            return equalsRecords(this, other);
        }
    }, {
        key: "CompareTo",
        value: function (other) {
            return compareRecords(this, other);
        }
    }]);

    return Circle;
}();
setType("Main.Circle", Circle);
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
canvas.height = height;
canvas.width = width;
function drawBg(ctx_1, canvas_1) {
    ctx_1.fillStyle = "black";
    ctx_1.fillRect(0, 0, width, height);
}
function drawCircle(ctx_1, x, y, scale, alpha) {
    ctx_1.save();
    ctx_1.globalAlpha = alpha;
    ctx_1.beginPath();
    ctx_1.arc(x, y, 15 + scale, 0, 2 * 3.141592653589793, false);
    ctx_1.fillStyle = "red";
    ctx_1.fill();
    ctx_1.stroke();
    ctx_1.restore();
}
var r = {};
function lrSpeed() {
    return 5 + ~~(randomNext(1, 1000) / 100);
}
function hRad() {
    return 4 + ~~(randomNext(1, 1000) / 100);
}
function vRad() {
    return 4 + ~~(randomNext(1, 1000) / 100);
}
var hRadInc = 0.1;
var vRadInc = 0.1;
var scaleMax = 90;
function createCircle() {
    return new Circle(width / 2, height / 2, 1, 0.6, lrSpeed(), 1, hRad(), vRad(), hRadInc, vRadInc, 0);
}
function setAlpha(circle) {
    if (circle.Scale > scaleMax) {
        var alpha = circle.alpha - 0.016;
        return new Circle(circle.X, circle.Y, circle.Scale, circle.ScaleSpeed, circle.lrSpeed, alpha, circle.hRad, circle.vRad, circle.hRadInc, circle.vRadInc, circle.lr);
    } else {
        return circle;
    }
}
function calculateNewCoords(circle) {
    var newX = width / 2 + circle.hRad * Math.sin(circle.lr * 3.141592653589793 / 180);
    var newY = height / 2 + circle.vRad * Math.cos(circle.lr * 3.141592653589793 / 180);
    return [newX, newY];
}
function updateCircle(circle) {
    var patternInput = calculateNewCoords(circle);
    var newHrad = circle.hRad + circle.hRadInc;
    var newVrad = circle.vRad + circle.vRadInc;
    var newLr = circle.lr + circle.lrSpeed;
    return new Circle(patternInput[0], patternInput[1], circle.Scale + circle.ScaleSpeed, circle.ScaleSpeed, circle.lrSpeed, circle.alpha, newHrad, newVrad, circle.hRadInc, circle.vRadInc, newLr);
}
var myCircles = ofArray([createCircle()]);
function loop(circles) {
    return function (builder_) {
        return builder_.Delay(function () {
            ctx.clearRect(0, 0, width, height);
            drawBg(ctx, canvas);
            iterate(function (c) {
                drawCircle(ctx, c.X, c.Y, c.Scale, c.alpha);
            }, circles);
            var circles_1 = filter$$1(function (circle) {
                return circle.alpha > 0;
            }, map$$1(function (circle_1) {
                return function ($var9) {
                    return setAlpha(updateCircle($var9));
                }(circle_1);
            }, circles));
            return builder_.Bind(sleep(~~(1000 / 90)), function () {
                var f = ~~(randomNext(1, 1000) / 10);

                if (f >= 98) {
                    return builder_.ReturnFrom(loop(new List$1(createCircle(), circles_1)));
                } else {
                    return builder_.ReturnFrom(loop(circles_1));
                }
            });
        });
    }(singleton$2);
}

(function (arg00) {
    startImmediate(arg00);
})(loop(myCircles));

exports.width = width;
exports.height = height;
exports.Circle = Circle;
exports.canvas = canvas;
exports.ctx = ctx;
exports.drawBg = drawBg;
exports.drawCircle = drawCircle;
exports.r = r;
exports.lrSpeed = lrSpeed;
exports.hRad = hRad;
exports.vRad = vRad;
exports.hRadInc = hRadInc;
exports.vRadInc = vRadInc;
exports.scaleMax = scaleMax;
exports.createCircle = createCircle;
exports.setAlpha = setAlpha;
exports.calculateNewCoords = calculateNewCoords;
exports.updateCircle = updateCircle;
exports.myCircles = myCircles;
exports.loop = loop;

}((this.main = this.main || {})));

//# sourceMappingURL=main.js.map