var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/jsbi/dist/jsbi-cjs.js
var require_jsbi_cjs = __commonJS({
  "node_modules/jsbi/dist/jsbi-cjs.js"(exports, module) {
    "use strict";
    var JSBI = class _JSBI extends Array {
      constructor(i2, _2) {
        if (super(i2), this.sign = _2, Object.setPrototypeOf(this, _JSBI.prototype), i2 > _JSBI.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded");
      }
      static BigInt(i2) {
        var _2 = Math.floor, t2 = Number.isFinite;
        if ("number" == typeof i2) {
          if (0 === i2) return _JSBI.__zero();
          if (_JSBI.__isOneDigitInt(i2)) return 0 > i2 ? _JSBI.__oneDigit(-i2, true) : _JSBI.__oneDigit(i2, false);
          if (!t2(i2) || _2(i2) !== i2) throw new RangeError("The number " + i2 + " cannot be converted to BigInt because it is not an integer");
          return _JSBI.__fromDouble(i2);
        }
        if ("string" == typeof i2) {
          const _3 = _JSBI.__fromString(i2);
          if (null === _3) throw new SyntaxError("Cannot convert " + i2 + " to a BigInt");
          return _3;
        }
        if ("boolean" == typeof i2) return true === i2 ? _JSBI.__oneDigit(1, false) : _JSBI.__zero();
        if ("object" == typeof i2) {
          if (i2.constructor === _JSBI) return i2;
          const _3 = _JSBI.__toPrimitive(i2);
          return _JSBI.BigInt(_3);
        }
        throw new TypeError("Cannot convert " + i2 + " to a BigInt");
      }
      toDebugString() {
        const i2 = ["BigInt["];
        for (const _2 of this) i2.push((_2 ? (_2 >>> 0).toString(16) : _2) + ", ");
        return i2.push("]"), i2.join("");
      }
      toString(i2 = 10) {
        if (2 > i2 || 36 < i2) throw new RangeError("toString() radix argument must be between 2 and 36");
        return 0 === this.length ? "0" : 0 == (i2 & i2 - 1) ? _JSBI.__toStringBasePowerOfTwo(this, i2) : _JSBI.__toStringGeneric(this, i2, false);
      }
      valueOf() {
        throw new Error("Convert JSBI instances to native numbers using `toNumber`.");
      }
      static toNumber(i2) {
        const _2 = i2.length;
        if (0 === _2) return 0;
        if (1 === _2) {
          const _3 = i2.__unsignedDigit(0);
          return i2.sign ? -_3 : _3;
        }
        const t2 = i2.__digit(_2 - 1), e2 = _JSBI.__clz30(t2), n2 = 30 * _2 - e2;
        if (1024 < n2) return i2.sign ? -Infinity : 1 / 0;
        let g2 = n2 - 1, o2 = t2, s2 = _2 - 1;
        const l2 = e2 + 3;
        let r2 = 32 === l2 ? 0 : o2 << l2;
        r2 >>>= 12;
        const a2 = l2 - 12;
        let u2 = 12 <= l2 ? 0 : o2 << 20 + l2, d2 = 20 + l2;
        for (0 < a2 && 0 < s2 && (s2--, o2 = i2.__digit(s2), r2 |= o2 >>> 30 - a2, u2 = o2 << a2 + 2, d2 = a2 + 2); 0 < d2 && 0 < s2; ) s2--, o2 = i2.__digit(s2), u2 |= 30 <= d2 ? o2 << d2 - 30 : o2 >>> 30 - d2, d2 -= 30;
        const h2 = _JSBI.__decideRounding(i2, d2, s2, o2);
        if ((1 === h2 || 0 === h2 && 1 == (1 & u2)) && (u2 = u2 + 1 >>> 0, 0 === u2 && (r2++, 0 != r2 >>> 20 && (r2 = 0, g2++, 1023 < g2)))) return i2.sign ? -Infinity : 1 / 0;
        const m2 = i2.sign ? -2147483648 : 0;
        return g2 = g2 + 1023 << 20, _JSBI.__kBitConversionInts[_JSBI.__kBitConversionIntHigh] = m2 | g2 | r2, _JSBI.__kBitConversionInts[_JSBI.__kBitConversionIntLow] = u2, _JSBI.__kBitConversionDouble[0];
      }
      static unaryMinus(i2) {
        if (0 === i2.length) return i2;
        const _2 = i2.__copy();
        return _2.sign = !i2.sign, _2;
      }
      static bitwiseNot(i2) {
        return i2.sign ? _JSBI.__absoluteSubOne(i2).__trim() : _JSBI.__absoluteAddOne(i2, true);
      }
      static exponentiate(i2, _2) {
        if (_2.sign) throw new RangeError("Exponent must be positive");
        if (0 === _2.length) return _JSBI.__oneDigit(1, false);
        if (0 === i2.length) return i2;
        if (1 === i2.length && 1 === i2.__digit(0)) return i2.sign && 0 == (1 & _2.__digit(0)) ? _JSBI.unaryMinus(i2) : i2;
        if (1 < _2.length) throw new RangeError("BigInt too big");
        let t2 = _2.__unsignedDigit(0);
        if (1 === t2) return i2;
        if (t2 >= _JSBI.__kMaxLengthBits) throw new RangeError("BigInt too big");
        if (1 === i2.length && 2 === i2.__digit(0)) {
          const _3 = 1 + (0 | t2 / 30), e3 = i2.sign && 0 != (1 & t2), n3 = new _JSBI(_3, e3);
          n3.__initializeDigits();
          const g2 = 1 << t2 % 30;
          return n3.__setDigit(_3 - 1, g2), n3;
        }
        let e2 = null, n2 = i2;
        for (0 != (1 & t2) && (e2 = i2), t2 >>= 1; 0 !== t2; t2 >>= 1) n2 = _JSBI.multiply(n2, n2), 0 != (1 & t2) && (null === e2 ? e2 = n2 : e2 = _JSBI.multiply(e2, n2));
        return e2;
      }
      static multiply(_2, t2) {
        if (0 === _2.length) return _2;
        if (0 === t2.length) return t2;
        let i2 = _2.length + t2.length;
        30 <= _2.__clzmsd() + t2.__clzmsd() && i2--;
        const e2 = new _JSBI(i2, _2.sign !== t2.sign);
        e2.__initializeDigits();
        for (let n2 = 0; n2 < _2.length; n2++) _JSBI.__multiplyAccumulate(t2, _2.__digit(n2), e2, n2);
        return e2.__trim();
      }
      static divide(i2, _2) {
        if (0 === _2.length) throw new RangeError("Division by zero");
        if (0 > _JSBI.__absoluteCompare(i2, _2)) return _JSBI.__zero();
        const t2 = i2.sign !== _2.sign, e2 = _2.__unsignedDigit(0);
        let n2;
        if (1 === _2.length && 32767 >= e2) {
          if (1 === e2) return t2 === i2.sign ? i2 : _JSBI.unaryMinus(i2);
          n2 = _JSBI.__absoluteDivSmall(i2, e2, null);
        } else n2 = _JSBI.__absoluteDivLarge(i2, _2, true, false);
        return n2.sign = t2, n2.__trim();
      }
      static remainder(i2, _2) {
        if (0 === _2.length) throw new RangeError("Division by zero");
        if (0 > _JSBI.__absoluteCompare(i2, _2)) return i2;
        const t2 = _2.__unsignedDigit(0);
        if (1 === _2.length && 32767 >= t2) {
          if (1 === t2) return _JSBI.__zero();
          const _3 = _JSBI.__absoluteModSmall(i2, t2);
          return 0 === _3 ? _JSBI.__zero() : _JSBI.__oneDigit(_3, i2.sign);
        }
        const e2 = _JSBI.__absoluteDivLarge(i2, _2, false, true);
        return e2.sign = i2.sign, e2.__trim();
      }
      static add(i2, _2) {
        const t2 = i2.sign;
        return t2 === _2.sign ? _JSBI.__absoluteAdd(i2, _2, t2) : 0 <= _JSBI.__absoluteCompare(i2, _2) ? _JSBI.__absoluteSub(i2, _2, t2) : _JSBI.__absoluteSub(_2, i2, !t2);
      }
      static subtract(i2, _2) {
        const t2 = i2.sign;
        return t2 === _2.sign ? 0 <= _JSBI.__absoluteCompare(i2, _2) ? _JSBI.__absoluteSub(i2, _2, t2) : _JSBI.__absoluteSub(_2, i2, !t2) : _JSBI.__absoluteAdd(i2, _2, t2);
      }
      static leftShift(i2, _2) {
        return 0 === _2.length || 0 === i2.length ? i2 : _2.sign ? _JSBI.__rightShiftByAbsolute(i2, _2) : _JSBI.__leftShiftByAbsolute(i2, _2);
      }
      static signedRightShift(i2, _2) {
        return 0 === _2.length || 0 === i2.length ? i2 : _2.sign ? _JSBI.__leftShiftByAbsolute(i2, _2) : _JSBI.__rightShiftByAbsolute(i2, _2);
      }
      static unsignedRightShift() {
        throw new TypeError("BigInts have no unsigned right shift; use >> instead");
      }
      static lessThan(i2, _2) {
        return 0 > _JSBI.__compareToBigInt(i2, _2);
      }
      static lessThanOrEqual(i2, _2) {
        return 0 >= _JSBI.__compareToBigInt(i2, _2);
      }
      static greaterThan(i2, _2) {
        return 0 < _JSBI.__compareToBigInt(i2, _2);
      }
      static greaterThanOrEqual(i2, _2) {
        return 0 <= _JSBI.__compareToBigInt(i2, _2);
      }
      static equal(_2, t2) {
        if (_2.sign !== t2.sign) return false;
        if (_2.length !== t2.length) return false;
        for (let e2 = 0; e2 < _2.length; e2++) if (_2.__digit(e2) !== t2.__digit(e2)) return false;
        return true;
      }
      static notEqual(i2, _2) {
        return !_JSBI.equal(i2, _2);
      }
      static bitwiseAnd(i2, _2) {
        var t2 = Math.max;
        if (!i2.sign && !_2.sign) return _JSBI.__absoluteAnd(i2, _2).__trim();
        if (i2.sign && _2.sign) {
          const e2 = t2(i2.length, _2.length) + 1;
          let n2 = _JSBI.__absoluteSubOne(i2, e2);
          const g2 = _JSBI.__absoluteSubOne(_2);
          return n2 = _JSBI.__absoluteOr(n2, g2, n2), _JSBI.__absoluteAddOne(n2, true, n2).__trim();
        }
        return i2.sign && ([i2, _2] = [_2, i2]), _JSBI.__absoluteAndNot(i2, _JSBI.__absoluteSubOne(_2)).__trim();
      }
      static bitwiseXor(i2, _2) {
        var t2 = Math.max;
        if (!i2.sign && !_2.sign) return _JSBI.__absoluteXor(i2, _2).__trim();
        if (i2.sign && _2.sign) {
          const e3 = t2(i2.length, _2.length), n3 = _JSBI.__absoluteSubOne(i2, e3), g2 = _JSBI.__absoluteSubOne(_2);
          return _JSBI.__absoluteXor(n3, g2, n3).__trim();
        }
        const e2 = t2(i2.length, _2.length) + 1;
        i2.sign && ([i2, _2] = [_2, i2]);
        let n2 = _JSBI.__absoluteSubOne(_2, e2);
        return n2 = _JSBI.__absoluteXor(n2, i2, n2), _JSBI.__absoluteAddOne(n2, true, n2).__trim();
      }
      static bitwiseOr(i2, _2) {
        var t2 = Math.max;
        const e2 = t2(i2.length, _2.length);
        if (!i2.sign && !_2.sign) return _JSBI.__absoluteOr(i2, _2).__trim();
        if (i2.sign && _2.sign) {
          let t3 = _JSBI.__absoluteSubOne(i2, e2);
          const n3 = _JSBI.__absoluteSubOne(_2);
          return t3 = _JSBI.__absoluteAnd(t3, n3, t3), _JSBI.__absoluteAddOne(t3, true, t3).__trim();
        }
        i2.sign && ([i2, _2] = [_2, i2]);
        let n2 = _JSBI.__absoluteSubOne(_2, e2);
        return n2 = _JSBI.__absoluteAndNot(n2, i2, n2), _JSBI.__absoluteAddOne(n2, true, n2).__trim();
      }
      static asIntN(_2, t2) {
        var i2 = Math.floor;
        if (0 === t2.length) return t2;
        if (_2 = i2(_2), 0 > _2) throw new RangeError("Invalid value: not (convertible to) a safe integer");
        if (0 === _2) return _JSBI.__zero();
        if (_2 >= _JSBI.__kMaxLengthBits) return t2;
        const e2 = 0 | (_2 + 29) / 30;
        if (t2.length < e2) return t2;
        const g2 = t2.__unsignedDigit(e2 - 1), o2 = 1 << (_2 - 1) % 30;
        if (t2.length === e2 && g2 < o2) return t2;
        if (!((g2 & o2) === o2)) return _JSBI.__truncateToNBits(_2, t2);
        if (!t2.sign) return _JSBI.__truncateAndSubFromPowerOfTwo(_2, t2, true);
        if (0 == (g2 & o2 - 1)) {
          for (let n2 = e2 - 2; 0 <= n2; n2--) if (0 !== t2.__digit(n2)) return _JSBI.__truncateAndSubFromPowerOfTwo(_2, t2, false);
          return t2.length === e2 && g2 === o2 ? t2 : _JSBI.__truncateToNBits(_2, t2);
        }
        return _JSBI.__truncateAndSubFromPowerOfTwo(_2, t2, false);
      }
      static asUintN(i2, _2) {
        var t2 = Math.floor;
        if (0 === _2.length) return _2;
        if (i2 = t2(i2), 0 > i2) throw new RangeError("Invalid value: not (convertible to) a safe integer");
        if (0 === i2) return _JSBI.__zero();
        if (_2.sign) {
          if (i2 > _JSBI.__kMaxLengthBits) throw new RangeError("BigInt too big");
          return _JSBI.__truncateAndSubFromPowerOfTwo(i2, _2, false);
        }
        if (i2 >= _JSBI.__kMaxLengthBits) return _2;
        const e2 = 0 | (i2 + 29) / 30;
        if (_2.length < e2) return _2;
        const g2 = i2 % 30;
        if (_2.length == e2) {
          if (0 === g2) return _2;
          const i3 = _2.__digit(e2 - 1);
          if (0 == i3 >>> g2) return _2;
        }
        return _JSBI.__truncateToNBits(i2, _2);
      }
      static ADD(i2, _2) {
        if (i2 = _JSBI.__toPrimitive(i2), _2 = _JSBI.__toPrimitive(_2), "string" == typeof i2) return "string" != typeof _2 && (_2 = _2.toString()), i2 + _2;
        if ("string" == typeof _2) return i2.toString() + _2;
        if (i2 = _JSBI.__toNumeric(i2), _2 = _JSBI.__toNumeric(_2), _JSBI.__isBigInt(i2) && _JSBI.__isBigInt(_2)) return _JSBI.add(i2, _2);
        if ("number" == typeof i2 && "number" == typeof _2) return i2 + _2;
        throw new TypeError("Cannot mix BigInt and other types, use explicit conversions");
      }
      static LT(i2, _2) {
        return _JSBI.__compare(i2, _2, 0);
      }
      static LE(i2, _2) {
        return _JSBI.__compare(i2, _2, 1);
      }
      static GT(i2, _2) {
        return _JSBI.__compare(i2, _2, 2);
      }
      static GE(i2, _2) {
        return _JSBI.__compare(i2, _2, 3);
      }
      static EQ(i2, _2) {
        for (; ; ) {
          if (_JSBI.__isBigInt(i2)) return _JSBI.__isBigInt(_2) ? _JSBI.equal(i2, _2) : _JSBI.EQ(_2, i2);
          if ("number" == typeof i2) {
            if (_JSBI.__isBigInt(_2)) return _JSBI.__equalToNumber(_2, i2);
            if ("object" != typeof _2) return i2 == _2;
            _2 = _JSBI.__toPrimitive(_2);
          } else if ("string" == typeof i2) {
            if (_JSBI.__isBigInt(_2)) return i2 = _JSBI.__fromString(i2), null !== i2 && _JSBI.equal(i2, _2);
            if ("object" != typeof _2) return i2 == _2;
            _2 = _JSBI.__toPrimitive(_2);
          } else if ("boolean" == typeof i2) {
            if (_JSBI.__isBigInt(_2)) return _JSBI.__equalToNumber(_2, +i2);
            if ("object" != typeof _2) return i2 == _2;
            _2 = _JSBI.__toPrimitive(_2);
          } else if ("symbol" == typeof i2) {
            if (_JSBI.__isBigInt(_2)) return false;
            if ("object" != typeof _2) return i2 == _2;
            _2 = _JSBI.__toPrimitive(_2);
          } else if ("object" == typeof i2) {
            if ("object" == typeof _2 && _2.constructor !== _JSBI) return i2 == _2;
            i2 = _JSBI.__toPrimitive(i2);
          } else return i2 == _2;
        }
      }
      static NE(i2, _2) {
        return !_JSBI.EQ(i2, _2);
      }
      static DataViewGetBigInt64(i2, _2, t2 = false) {
        return _JSBI.asIntN(64, _JSBI.DataViewGetBigUint64(i2, _2, t2));
      }
      static DataViewGetBigUint64(i2, _2, t2 = false) {
        const [e2, n2] = t2 ? [4, 0] : [0, 4], g2 = i2.getUint32(_2 + e2, t2), o2 = i2.getUint32(_2 + n2, t2), s2 = new _JSBI(3, false);
        return s2.__setDigit(0, 1073741823 & o2), s2.__setDigit(1, (268435455 & g2) << 2 | o2 >>> 30), s2.__setDigit(2, g2 >>> 28), s2.__trim();
      }
      static DataViewSetBigInt64(i2, _2, t2, e2 = false) {
        _JSBI.DataViewSetBigUint64(i2, _2, t2, e2);
      }
      static DataViewSetBigUint64(i2, _2, t2, e2 = false) {
        t2 = _JSBI.asUintN(64, t2);
        let n2 = 0, g2 = 0;
        if (0 < t2.length && (g2 = t2.__digit(0), 1 < t2.length)) {
          const i3 = t2.__digit(1);
          g2 |= i3 << 30, n2 = i3 >>> 2, 2 < t2.length && (n2 |= t2.__digit(2) << 28);
        }
        const [o2, s2] = e2 ? [4, 0] : [0, 4];
        i2.setUint32(_2 + o2, n2, e2), i2.setUint32(_2 + s2, g2, e2);
      }
      static __zero() {
        return new _JSBI(0, false);
      }
      static __oneDigit(i2, _2) {
        const t2 = new _JSBI(1, _2);
        return t2.__setDigit(0, i2), t2;
      }
      __copy() {
        const _2 = new _JSBI(this.length, this.sign);
        for (let t2 = 0; t2 < this.length; t2++) _2[t2] = this[t2];
        return _2;
      }
      __trim() {
        let i2 = this.length, _2 = this[i2 - 1];
        for (; 0 === _2; ) i2--, _2 = this[i2 - 1], this.pop();
        return 0 === i2 && (this.sign = false), this;
      }
      __initializeDigits() {
        for (let _2 = 0; _2 < this.length; _2++) this[_2] = 0;
      }
      static __decideRounding(i2, _2, t2, e2) {
        if (0 < _2) return -1;
        let n2;
        if (0 > _2) n2 = -_2 - 1;
        else {
          if (0 === t2) return -1;
          t2--, e2 = i2.__digit(t2), n2 = 29;
        }
        let g2 = 1 << n2;
        if (0 == (e2 & g2)) return -1;
        if (g2 -= 1, 0 != (e2 & g2)) return 1;
        for (; 0 < t2; ) if (t2--, 0 !== i2.__digit(t2)) return 1;
        return 0;
      }
      static __fromDouble(i2) {
        _JSBI.__kBitConversionDouble[0] = i2;
        const _2 = 2047 & _JSBI.__kBitConversionInts[_JSBI.__kBitConversionIntHigh] >>> 20, t2 = _2 - 1023, e2 = (0 | t2 / 30) + 1, n2 = new _JSBI(e2, 0 > i2);
        let g2 = 1048575 & _JSBI.__kBitConversionInts[_JSBI.__kBitConversionIntHigh] | 1048576, o2 = _JSBI.__kBitConversionInts[_JSBI.__kBitConversionIntLow];
        const s2 = 20, l2 = t2 % 30;
        let r2, a2 = 0;
        if (l2 < 20) {
          const i3 = s2 - l2;
          a2 = i3 + 32, r2 = g2 >>> i3, g2 = g2 << 32 - i3 | o2 >>> i3, o2 <<= 32 - i3;
        } else if (l2 === 20) a2 = 32, r2 = g2, g2 = o2, o2 = 0;
        else {
          const i3 = l2 - s2;
          a2 = 32 - i3, r2 = g2 << i3 | o2 >>> 32 - i3, g2 = o2 << i3, o2 = 0;
        }
        n2.__setDigit(e2 - 1, r2);
        for (let _3 = e2 - 2; 0 <= _3; _3--) 0 < a2 ? (a2 -= 30, r2 = g2 >>> 2, g2 = g2 << 30 | o2 >>> 2, o2 <<= 30) : r2 = 0, n2.__setDigit(_3, r2);
        return n2.__trim();
      }
      static __isWhitespace(i2) {
        return !!(13 >= i2 && 9 <= i2) || (159 >= i2 ? 32 == i2 : 131071 >= i2 ? 160 == i2 || 5760 == i2 : 196607 >= i2 ? (i2 &= 131071, 10 >= i2 || 40 == i2 || 41 == i2 || 47 == i2 || 95 == i2 || 4096 == i2) : 65279 == i2);
      }
      static __fromString(i2, _2 = 0) {
        let t2 = 0;
        const e2 = i2.length;
        let n2 = 0;
        if (n2 === e2) return _JSBI.__zero();
        let g2 = i2.charCodeAt(n2);
        for (; _JSBI.__isWhitespace(g2); ) {
          if (++n2 === e2) return _JSBI.__zero();
          g2 = i2.charCodeAt(n2);
        }
        if (43 === g2) {
          if (++n2 === e2) return null;
          g2 = i2.charCodeAt(n2), t2 = 1;
        } else if (45 === g2) {
          if (++n2 === e2) return null;
          g2 = i2.charCodeAt(n2), t2 = -1;
        }
        if (0 === _2) {
          if (_2 = 10, 48 === g2) {
            if (++n2 === e2) return _JSBI.__zero();
            if (g2 = i2.charCodeAt(n2), 88 === g2 || 120 === g2) {
              if (_2 = 16, ++n2 === e2) return null;
              g2 = i2.charCodeAt(n2);
            } else if (79 === g2 || 111 === g2) {
              if (_2 = 8, ++n2 === e2) return null;
              g2 = i2.charCodeAt(n2);
            } else if (66 === g2 || 98 === g2) {
              if (_2 = 2, ++n2 === e2) return null;
              g2 = i2.charCodeAt(n2);
            }
          }
        } else if (16 === _2 && 48 === g2) {
          if (++n2 === e2) return _JSBI.__zero();
          if (g2 = i2.charCodeAt(n2), 88 === g2 || 120 === g2) {
            if (++n2 === e2) return null;
            g2 = i2.charCodeAt(n2);
          }
        }
        if (0 != t2 && 10 !== _2) return null;
        for (; 48 === g2; ) {
          if (++n2 === e2) return _JSBI.__zero();
          g2 = i2.charCodeAt(n2);
        }
        const o2 = e2 - n2;
        let s2 = _JSBI.__kMaxBitsPerChar[_2], l2 = _JSBI.__kBitsPerCharTableMultiplier - 1;
        if (o2 > 1073741824 / s2) return null;
        const r2 = s2 * o2 + l2 >>> _JSBI.__kBitsPerCharTableShift, a2 = new _JSBI(0 | (r2 + 29) / 30, false), u2 = 10 > _2 ? _2 : 10, h2 = 10 < _2 ? _2 - 10 : 0;
        if (0 == (_2 & _2 - 1)) {
          s2 >>= _JSBI.__kBitsPerCharTableShift;
          const _3 = [], t3 = [];
          let o3 = false;
          do {
            let l3 = 0, r3 = 0;
            for (; ; ) {
              let _4;
              if (g2 - 48 >>> 0 < u2) _4 = g2 - 48;
              else if ((32 | g2) - 97 >>> 0 < h2) _4 = (32 | g2) - 87;
              else {
                o3 = true;
                break;
              }
              if (r3 += s2, l3 = l3 << s2 | _4, ++n2 === e2) {
                o3 = true;
                break;
              }
              if (g2 = i2.charCodeAt(n2), 30 < r3 + s2) break;
            }
            _3.push(l3), t3.push(r3);
          } while (!o3);
          _JSBI.__fillFromParts(a2, _3, t3);
        } else {
          a2.__initializeDigits();
          let t3 = false, o3 = 0;
          do {
            let r3 = 0, b2 = 1;
            for (; ; ) {
              let s3;
              if (g2 - 48 >>> 0 < u2) s3 = g2 - 48;
              else if ((32 | g2) - 97 >>> 0 < h2) s3 = (32 | g2) - 87;
              else {
                t3 = true;
                break;
              }
              const l3 = b2 * _2;
              if (1073741823 < l3) break;
              if (b2 = l3, r3 = r3 * _2 + s3, o3++, ++n2 === e2) {
                t3 = true;
                break;
              }
              g2 = i2.charCodeAt(n2);
            }
            l2 = 30 * _JSBI.__kBitsPerCharTableMultiplier - 1;
            const D2 = 0 | (s2 * o3 + l2 >>> _JSBI.__kBitsPerCharTableShift) / 30;
            a2.__inplaceMultiplyAdd(b2, r3, D2);
          } while (!t3);
        }
        if (n2 !== e2) {
          if (!_JSBI.__isWhitespace(g2)) return null;
          for (n2++; n2 < e2; n2++) if (g2 = i2.charCodeAt(n2), !_JSBI.__isWhitespace(g2)) return null;
        }
        return a2.sign = -1 == t2, a2.__trim();
      }
      static __fillFromParts(_2, t2, e2) {
        let n2 = 0, g2 = 0, o2 = 0;
        for (let s2 = t2.length - 1; 0 <= s2; s2--) {
          const i2 = t2[s2], l2 = e2[s2];
          g2 |= i2 << o2, o2 += l2, 30 === o2 ? (_2.__setDigit(n2++, g2), o2 = 0, g2 = 0) : 30 < o2 && (_2.__setDigit(n2++, 1073741823 & g2), o2 -= 30, g2 = i2 >>> l2 - o2);
        }
        if (0 !== g2) {
          if (n2 >= _2.length) throw new Error("implementation bug");
          _2.__setDigit(n2++, g2);
        }
        for (; n2 < _2.length; n2++) _2.__setDigit(n2, 0);
      }
      static __toStringBasePowerOfTwo(_2, i2) {
        const t2 = _2.length;
        let e2 = i2 - 1;
        e2 = (85 & e2 >>> 1) + (85 & e2), e2 = (51 & e2 >>> 2) + (51 & e2), e2 = (15 & e2 >>> 4) + (15 & e2);
        const n2 = e2, g2 = i2 - 1, o2 = _2.__digit(t2 - 1), s2 = _JSBI.__clz30(o2);
        let l2 = 0 | (30 * t2 - s2 + n2 - 1) / n2;
        if (_2.sign && l2++, 268435456 < l2) throw new Error("string too long");
        const r2 = Array(l2);
        let a2 = l2 - 1, u2 = 0, d2 = 0;
        for (let e3 = 0; e3 < t2 - 1; e3++) {
          const i3 = _2.__digit(e3), t3 = (u2 | i3 << d2) & g2;
          r2[a2--] = _JSBI.__kConversionChars[t3];
          const o3 = n2 - d2;
          for (u2 = i3 >>> o3, d2 = 30 - o3; d2 >= n2; ) r2[a2--] = _JSBI.__kConversionChars[u2 & g2], u2 >>>= n2, d2 -= n2;
        }
        const h2 = (u2 | o2 << d2) & g2;
        for (r2[a2--] = _JSBI.__kConversionChars[h2], u2 = o2 >>> n2 - d2; 0 !== u2; ) r2[a2--] = _JSBI.__kConversionChars[u2 & g2], u2 >>>= n2;
        if (_2.sign && (r2[a2--] = "-"), -1 != a2) throw new Error("implementation bug");
        return r2.join("");
      }
      static __toStringGeneric(_2, i2, t2) {
        const e2 = _2.length;
        if (0 === e2) return "";
        if (1 === e2) {
          let e3 = _2.__unsignedDigit(0).toString(i2);
          return false === t2 && _2.sign && (e3 = "-" + e3), e3;
        }
        const n2 = 30 * e2 - _JSBI.__clz30(_2.__digit(e2 - 1)), g2 = _JSBI.__kMaxBitsPerChar[i2], o2 = g2 - 1;
        let s2 = n2 * _JSBI.__kBitsPerCharTableMultiplier;
        s2 += o2 - 1, s2 = 0 | s2 / o2;
        const l2 = s2 + 1 >> 1, r2 = _JSBI.exponentiate(_JSBI.__oneDigit(i2, false), _JSBI.__oneDigit(l2, false));
        let a2, u2;
        const d2 = r2.__unsignedDigit(0);
        if (1 === r2.length && 32767 >= d2) {
          a2 = new _JSBI(_2.length, false), a2.__initializeDigits();
          let t3 = 0;
          for (let e3 = 2 * _2.length - 1; 0 <= e3; e3--) {
            const i3 = t3 << 15 | _2.__halfDigit(e3);
            a2.__setHalfDigit(e3, 0 | i3 / d2), t3 = 0 | i3 % d2;
          }
          u2 = t3.toString(i2);
        } else {
          const t3 = _JSBI.__absoluteDivLarge(_2, r2, true, true);
          a2 = t3.quotient;
          const e3 = t3.remainder.__trim();
          u2 = _JSBI.__toStringGeneric(e3, i2, true);
        }
        a2.__trim();
        let h2 = _JSBI.__toStringGeneric(a2, i2, true);
        for (; u2.length < l2; ) u2 = "0" + u2;
        return false === t2 && _2.sign && (h2 = "-" + h2), h2 + u2;
      }
      static __unequalSign(i2) {
        return i2 ? -1 : 1;
      }
      static __absoluteGreater(i2) {
        return i2 ? -1 : 1;
      }
      static __absoluteLess(i2) {
        return i2 ? 1 : -1;
      }
      static __compareToBigInt(i2, _2) {
        const t2 = i2.sign;
        if (t2 !== _2.sign) return _JSBI.__unequalSign(t2);
        const e2 = _JSBI.__absoluteCompare(i2, _2);
        return 0 < e2 ? _JSBI.__absoluteGreater(t2) : 0 > e2 ? _JSBI.__absoluteLess(t2) : 0;
      }
      static __compareToNumber(i2, _2) {
        if (_JSBI.__isOneDigitInt(_2)) {
          const t2 = i2.sign, e2 = 0 > _2;
          if (t2 !== e2) return _JSBI.__unequalSign(t2);
          if (0 === i2.length) {
            if (e2) throw new Error("implementation bug");
            return 0 === _2 ? 0 : -1;
          }
          if (1 < i2.length) return _JSBI.__absoluteGreater(t2);
          const n2 = Math.abs(_2), g2 = i2.__unsignedDigit(0);
          return g2 > n2 ? _JSBI.__absoluteGreater(t2) : g2 < n2 ? _JSBI.__absoluteLess(t2) : 0;
        }
        return _JSBI.__compareToDouble(i2, _2);
      }
      static __compareToDouble(i2, _2) {
        if (_2 !== _2) return _2;
        if (_2 === 1 / 0) return -1;
        if (_2 === -Infinity) return 1;
        const t2 = i2.sign;
        if (t2 !== 0 > _2) return _JSBI.__unequalSign(t2);
        if (0 === _2) throw new Error("implementation bug: should be handled elsewhere");
        if (0 === i2.length) return -1;
        _JSBI.__kBitConversionDouble[0] = _2;
        const e2 = 2047 & _JSBI.__kBitConversionInts[_JSBI.__kBitConversionIntHigh] >>> 20;
        if (2047 == e2) throw new Error("implementation bug: handled elsewhere");
        const n2 = e2 - 1023;
        if (0 > n2) return _JSBI.__absoluteGreater(t2);
        const g2 = i2.length;
        let o2 = i2.__digit(g2 - 1);
        const s2 = _JSBI.__clz30(o2), l2 = 30 * g2 - s2, r2 = n2 + 1;
        if (l2 < r2) return _JSBI.__absoluteLess(t2);
        if (l2 > r2) return _JSBI.__absoluteGreater(t2);
        let a2 = 1048576 | 1048575 & _JSBI.__kBitConversionInts[_JSBI.__kBitConversionIntHigh], u2 = _JSBI.__kBitConversionInts[_JSBI.__kBitConversionIntLow];
        const d2 = 20, h2 = 29 - s2;
        if (h2 !== (0 | (l2 - 1) % 30)) throw new Error("implementation bug");
        let m2, b2 = 0;
        if (20 > h2) {
          const i3 = d2 - h2;
          b2 = i3 + 32, m2 = a2 >>> i3, a2 = a2 << 32 - i3 | u2 >>> i3, u2 <<= 32 - i3;
        } else if (20 === h2) b2 = 32, m2 = a2, a2 = u2, u2 = 0;
        else {
          const i3 = h2 - d2;
          b2 = 32 - i3, m2 = a2 << i3 | u2 >>> 32 - i3, a2 = u2 << i3, u2 = 0;
        }
        if (o2 >>>= 0, m2 >>>= 0, o2 > m2) return _JSBI.__absoluteGreater(t2);
        if (o2 < m2) return _JSBI.__absoluteLess(t2);
        for (let e3 = g2 - 2; 0 <= e3; e3--) {
          0 < b2 ? (b2 -= 30, m2 = a2 >>> 2, a2 = a2 << 30 | u2 >>> 2, u2 <<= 30) : m2 = 0;
          const _3 = i2.__unsignedDigit(e3);
          if (_3 > m2) return _JSBI.__absoluteGreater(t2);
          if (_3 < m2) return _JSBI.__absoluteLess(t2);
        }
        if (0 !== a2 || 0 !== u2) {
          if (0 === b2) throw new Error("implementation bug");
          return _JSBI.__absoluteLess(t2);
        }
        return 0;
      }
      static __equalToNumber(i2, _2) {
        var t2 = Math.abs;
        return _JSBI.__isOneDigitInt(_2) ? 0 === _2 ? 0 === i2.length : 1 === i2.length && i2.sign === 0 > _2 && i2.__unsignedDigit(0) === t2(_2) : 0 === _JSBI.__compareToDouble(i2, _2);
      }
      static __comparisonResultToBool(i2, _2) {
        return 0 === _2 ? 0 > i2 : 1 === _2 ? 0 >= i2 : 2 === _2 ? 0 < i2 : 3 === _2 ? 0 <= i2 : void 0;
      }
      static __compare(i2, _2, t2) {
        if (i2 = _JSBI.__toPrimitive(i2), _2 = _JSBI.__toPrimitive(_2), "string" == typeof i2 && "string" == typeof _2) switch (t2) {
          case 0:
            return i2 < _2;
          case 1:
            return i2 <= _2;
          case 2:
            return i2 > _2;
          case 3:
            return i2 >= _2;
        }
        if (_JSBI.__isBigInt(i2) && "string" == typeof _2) return _2 = _JSBI.__fromString(_2), null !== _2 && _JSBI.__comparisonResultToBool(_JSBI.__compareToBigInt(i2, _2), t2);
        if ("string" == typeof i2 && _JSBI.__isBigInt(_2)) return i2 = _JSBI.__fromString(i2), null !== i2 && _JSBI.__comparisonResultToBool(_JSBI.__compareToBigInt(i2, _2), t2);
        if (i2 = _JSBI.__toNumeric(i2), _2 = _JSBI.__toNumeric(_2), _JSBI.__isBigInt(i2)) {
          if (_JSBI.__isBigInt(_2)) return _JSBI.__comparisonResultToBool(_JSBI.__compareToBigInt(i2, _2), t2);
          if ("number" != typeof _2) throw new Error("implementation bug");
          return _JSBI.__comparisonResultToBool(_JSBI.__compareToNumber(i2, _2), t2);
        }
        if ("number" != typeof i2) throw new Error("implementation bug");
        if (_JSBI.__isBigInt(_2)) return _JSBI.__comparisonResultToBool(_JSBI.__compareToNumber(_2, i2), 2 ^ t2);
        if ("number" != typeof _2) throw new Error("implementation bug");
        return 0 === t2 ? i2 < _2 : 1 === t2 ? i2 <= _2 : 2 === t2 ? i2 > _2 : 3 === t2 ? i2 >= _2 : void 0;
      }
      __clzmsd() {
        return _JSBI.__clz30(this.__digit(this.length - 1));
      }
      static __absoluteAdd(_2, t2, e2) {
        if (_2.length < t2.length) return _JSBI.__absoluteAdd(t2, _2, e2);
        if (0 === _2.length) return _2;
        if (0 === t2.length) return _2.sign === e2 ? _2 : _JSBI.unaryMinus(_2);
        let n2 = _2.length;
        (0 === _2.__clzmsd() || t2.length === _2.length && 0 === t2.__clzmsd()) && n2++;
        const g2 = new _JSBI(n2, e2);
        let o2 = 0, s2 = 0;
        for (; s2 < t2.length; s2++) {
          const i2 = _2.__digit(s2) + t2.__digit(s2) + o2;
          o2 = i2 >>> 30, g2.__setDigit(s2, 1073741823 & i2);
        }
        for (; s2 < _2.length; s2++) {
          const i2 = _2.__digit(s2) + o2;
          o2 = i2 >>> 30, g2.__setDigit(s2, 1073741823 & i2);
        }
        return s2 < g2.length && g2.__setDigit(s2, o2), g2.__trim();
      }
      static __absoluteSub(_2, t2, e2) {
        if (0 === _2.length) return _2;
        if (0 === t2.length) return _2.sign === e2 ? _2 : _JSBI.unaryMinus(_2);
        const n2 = new _JSBI(_2.length, e2);
        let g2 = 0, o2 = 0;
        for (; o2 < t2.length; o2++) {
          const i2 = _2.__digit(o2) - t2.__digit(o2) - g2;
          g2 = 1 & i2 >>> 30, n2.__setDigit(o2, 1073741823 & i2);
        }
        for (; o2 < _2.length; o2++) {
          const i2 = _2.__digit(o2) - g2;
          g2 = 1 & i2 >>> 30, n2.__setDigit(o2, 1073741823 & i2);
        }
        return n2.__trim();
      }
      static __absoluteAddOne(_2, i2, t2 = null) {
        const e2 = _2.length;
        null === t2 ? t2 = new _JSBI(e2, i2) : t2.sign = i2;
        let n2 = 1;
        for (let g2 = 0; g2 < e2; g2++) {
          const i3 = _2.__digit(g2) + n2;
          n2 = i3 >>> 30, t2.__setDigit(g2, 1073741823 & i3);
        }
        return 0 != n2 && t2.__setDigitGrow(e2, 1), t2;
      }
      static __absoluteSubOne(_2, t2) {
        const e2 = _2.length;
        t2 = t2 || e2;
        const n2 = new _JSBI(t2, false);
        let g2 = 1;
        for (let o2 = 0; o2 < e2; o2++) {
          const i2 = _2.__digit(o2) - g2;
          g2 = 1 & i2 >>> 30, n2.__setDigit(o2, 1073741823 & i2);
        }
        if (0 != g2) throw new Error("implementation bug");
        for (let g3 = e2; g3 < t2; g3++) n2.__setDigit(g3, 0);
        return n2;
      }
      static __absoluteAnd(_2, t2, e2 = null) {
        let n2 = _2.length, g2 = t2.length, o2 = g2;
        if (n2 < g2) {
          o2 = n2;
          const i2 = _2, e3 = n2;
          _2 = t2, n2 = g2, t2 = i2, g2 = e3;
        }
        let s2 = o2;
        null === e2 ? e2 = new _JSBI(s2, false) : s2 = e2.length;
        let l2 = 0;
        for (; l2 < o2; l2++) e2.__setDigit(l2, _2.__digit(l2) & t2.__digit(l2));
        for (; l2 < s2; l2++) e2.__setDigit(l2, 0);
        return e2;
      }
      static __absoluteAndNot(_2, t2, e2 = null) {
        const n2 = _2.length, g2 = t2.length;
        let o2 = g2;
        n2 < g2 && (o2 = n2);
        let s2 = n2;
        null === e2 ? e2 = new _JSBI(s2, false) : s2 = e2.length;
        let l2 = 0;
        for (; l2 < o2; l2++) e2.__setDigit(l2, _2.__digit(l2) & ~t2.__digit(l2));
        for (; l2 < n2; l2++) e2.__setDigit(l2, _2.__digit(l2));
        for (; l2 < s2; l2++) e2.__setDigit(l2, 0);
        return e2;
      }
      static __absoluteOr(_2, t2, e2 = null) {
        let n2 = _2.length, g2 = t2.length, o2 = g2;
        if (n2 < g2) {
          o2 = n2;
          const i2 = _2, e3 = n2;
          _2 = t2, n2 = g2, t2 = i2, g2 = e3;
        }
        let s2 = n2;
        null === e2 ? e2 = new _JSBI(s2, false) : s2 = e2.length;
        let l2 = 0;
        for (; l2 < o2; l2++) e2.__setDigit(l2, _2.__digit(l2) | t2.__digit(l2));
        for (; l2 < n2; l2++) e2.__setDigit(l2, _2.__digit(l2));
        for (; l2 < s2; l2++) e2.__setDigit(l2, 0);
        return e2;
      }
      static __absoluteXor(_2, t2, e2 = null) {
        let n2 = _2.length, g2 = t2.length, o2 = g2;
        if (n2 < g2) {
          o2 = n2;
          const i2 = _2, e3 = n2;
          _2 = t2, n2 = g2, t2 = i2, g2 = e3;
        }
        let s2 = n2;
        null === e2 ? e2 = new _JSBI(s2, false) : s2 = e2.length;
        let l2 = 0;
        for (; l2 < o2; l2++) e2.__setDigit(l2, _2.__digit(l2) ^ t2.__digit(l2));
        for (; l2 < n2; l2++) e2.__setDigit(l2, _2.__digit(l2));
        for (; l2 < s2; l2++) e2.__setDigit(l2, 0);
        return e2;
      }
      static __absoluteCompare(_2, t2) {
        const e2 = _2.length - t2.length;
        if (0 != e2) return e2;
        let n2 = _2.length - 1;
        for (; 0 <= n2 && _2.__digit(n2) === t2.__digit(n2); ) n2--;
        return 0 > n2 ? 0 : _2.__unsignedDigit(n2) > t2.__unsignedDigit(n2) ? 1 : -1;
      }
      static __multiplyAccumulate(_2, t2, e2, n2) {
        if (0 === t2) return;
        const g2 = 32767 & t2, o2 = t2 >>> 15;
        let s2 = 0, l2 = 0;
        for (let r2, a2 = 0; a2 < _2.length; a2++, n2++) {
          r2 = e2.__digit(n2);
          const i2 = _2.__digit(a2), t3 = 32767 & i2, u2 = i2 >>> 15, d2 = _JSBI.__imul(t3, g2), h2 = _JSBI.__imul(t3, o2), m2 = _JSBI.__imul(u2, g2), b2 = _JSBI.__imul(u2, o2);
          r2 += l2 + d2 + s2, s2 = r2 >>> 30, r2 &= 1073741823, r2 += ((32767 & h2) << 15) + ((32767 & m2) << 15), s2 += r2 >>> 30, l2 = b2 + (h2 >>> 15) + (m2 >>> 15), e2.__setDigit(n2, 1073741823 & r2);
        }
        for (; 0 != s2 || 0 !== l2; n2++) {
          let i2 = e2.__digit(n2);
          i2 += s2 + l2, l2 = 0, s2 = i2 >>> 30, e2.__setDigit(n2, 1073741823 & i2);
        }
      }
      static __internalMultiplyAdd(_2, t2, e2, g2, o2) {
        let s2 = e2, l2 = 0;
        for (let n2 = 0; n2 < g2; n2++) {
          const i2 = _2.__digit(n2), e3 = _JSBI.__imul(32767 & i2, t2), g3 = _JSBI.__imul(i2 >>> 15, t2), a2 = e3 + ((32767 & g3) << 15) + l2 + s2;
          s2 = a2 >>> 30, l2 = g3 >>> 15, o2.__setDigit(n2, 1073741823 & a2);
        }
        if (o2.length > g2) for (o2.__setDigit(g2++, s2 + l2); g2 < o2.length; ) o2.__setDigit(g2++, 0);
        else if (0 !== s2 + l2) throw new Error("implementation bug");
      }
      __inplaceMultiplyAdd(i2, _2, t2) {
        t2 > this.length && (t2 = this.length);
        const e2 = 32767 & i2, n2 = i2 >>> 15;
        let g2 = 0, o2 = _2;
        for (let s2 = 0; s2 < t2; s2++) {
          const i3 = this.__digit(s2), _3 = 32767 & i3, t3 = i3 >>> 15, l2 = _JSBI.__imul(_3, e2), r2 = _JSBI.__imul(_3, n2), a2 = _JSBI.__imul(t3, e2), u2 = _JSBI.__imul(t3, n2);
          let d2 = o2 + l2 + g2;
          g2 = d2 >>> 30, d2 &= 1073741823, d2 += ((32767 & r2) << 15) + ((32767 & a2) << 15), g2 += d2 >>> 30, o2 = u2 + (r2 >>> 15) + (a2 >>> 15), this.__setDigit(s2, 1073741823 & d2);
        }
        if (0 != g2 || 0 !== o2) throw new Error("implementation bug");
      }
      static __absoluteDivSmall(_2, t2, e2 = null) {
        null === e2 && (e2 = new _JSBI(_2.length, false));
        let n2 = 0;
        for (let g2, o2 = 2 * _2.length - 1; 0 <= o2; o2 -= 2) {
          g2 = (n2 << 15 | _2.__halfDigit(o2)) >>> 0;
          const i2 = 0 | g2 / t2;
          n2 = 0 | g2 % t2, g2 = (n2 << 15 | _2.__halfDigit(o2 - 1)) >>> 0;
          const s2 = 0 | g2 / t2;
          n2 = 0 | g2 % t2, e2.__setDigit(o2 >>> 1, i2 << 15 | s2);
        }
        return e2;
      }
      static __absoluteModSmall(_2, t2) {
        let e2 = 0;
        for (let n2 = 2 * _2.length - 1; 0 <= n2; n2--) {
          const i2 = (e2 << 15 | _2.__halfDigit(n2)) >>> 0;
          e2 = 0 | i2 % t2;
        }
        return e2;
      }
      static __absoluteDivLarge(i2, _2, t2, e2) {
        const g2 = _2.__halfDigitLength(), n2 = _2.length, o2 = i2.__halfDigitLength() - g2;
        let s2 = null;
        t2 && (s2 = new _JSBI(o2 + 2 >>> 1, false), s2.__initializeDigits());
        const l2 = new _JSBI(g2 + 2 >>> 1, false);
        l2.__initializeDigits();
        const r2 = _JSBI.__clz15(_2.__halfDigit(g2 - 1));
        0 < r2 && (_2 = _JSBI.__specialLeftShift(_2, r2, 0));
        const a2 = _JSBI.__specialLeftShift(i2, r2, 1), u2 = _2.__halfDigit(g2 - 1);
        let d2 = 0;
        for (let r3, h2 = o2; 0 <= h2; h2--) {
          r3 = 32767;
          const i3 = a2.__halfDigit(h2 + g2);
          if (i3 !== u2) {
            const t3 = (i3 << 15 | a2.__halfDigit(h2 + g2 - 1)) >>> 0;
            r3 = 0 | t3 / u2;
            let e4 = 0 | t3 % u2;
            const n3 = _2.__halfDigit(g2 - 2), o3 = a2.__halfDigit(h2 + g2 - 2);
            for (; _JSBI.__imul(r3, n3) >>> 0 > (e4 << 16 | o3) >>> 0 && (r3--, e4 += u2, !(32767 < e4)); ) ;
          }
          _JSBI.__internalMultiplyAdd(_2, r3, 0, n2, l2);
          let e3 = a2.__inplaceSub(l2, h2, g2 + 1);
          0 !== e3 && (e3 = a2.__inplaceAdd(_2, h2, g2), a2.__setHalfDigit(h2 + g2, 32767 & a2.__halfDigit(h2 + g2) + e3), r3--), t2 && (1 & h2 ? d2 = r3 << 15 : s2.__setDigit(h2 >>> 1, d2 | r3));
        }
        if (e2) return a2.__inplaceRightShift(r2), t2 ? { quotient: s2, remainder: a2 } : a2;
        if (t2) return s2;
        throw new Error("unreachable");
      }
      static __clz15(i2) {
        return _JSBI.__clz30(i2) - 15;
      }
      __inplaceAdd(_2, t2, e2) {
        let n2 = 0;
        for (let g2 = 0; g2 < e2; g2++) {
          const i2 = this.__halfDigit(t2 + g2) + _2.__halfDigit(g2) + n2;
          n2 = i2 >>> 15, this.__setHalfDigit(t2 + g2, 32767 & i2);
        }
        return n2;
      }
      __inplaceSub(_2, t2, e2) {
        let n2 = 0;
        if (1 & t2) {
          t2 >>= 1;
          let g2 = this.__digit(t2), o2 = 32767 & g2, s2 = 0;
          for (; s2 < e2 - 1 >>> 1; s2++) {
            const i3 = _2.__digit(s2), e3 = (g2 >>> 15) - (32767 & i3) - n2;
            n2 = 1 & e3 >>> 15, this.__setDigit(t2 + s2, (32767 & e3) << 15 | 32767 & o2), g2 = this.__digit(t2 + s2 + 1), o2 = (32767 & g2) - (i3 >>> 15) - n2, n2 = 1 & o2 >>> 15;
          }
          const i2 = _2.__digit(s2), l2 = (g2 >>> 15) - (32767 & i2) - n2;
          n2 = 1 & l2 >>> 15, this.__setDigit(t2 + s2, (32767 & l2) << 15 | 32767 & o2);
          if (t2 + s2 + 1 >= this.length) throw new RangeError("out of bounds");
          0 == (1 & e2) && (g2 = this.__digit(t2 + s2 + 1), o2 = (32767 & g2) - (i2 >>> 15) - n2, n2 = 1 & o2 >>> 15, this.__setDigit(t2 + _2.length, 1073709056 & g2 | 32767 & o2));
        } else {
          t2 >>= 1;
          let g2 = 0;
          for (; g2 < _2.length - 1; g2++) {
            const i3 = this.__digit(t2 + g2), e3 = _2.__digit(g2), o3 = (32767 & i3) - (32767 & e3) - n2;
            n2 = 1 & o3 >>> 15;
            const s3 = (i3 >>> 15) - (e3 >>> 15) - n2;
            n2 = 1 & s3 >>> 15, this.__setDigit(t2 + g2, (32767 & s3) << 15 | 32767 & o3);
          }
          const i2 = this.__digit(t2 + g2), o2 = _2.__digit(g2), s2 = (32767 & i2) - (32767 & o2) - n2;
          n2 = 1 & s2 >>> 15;
          let l2 = 0;
          0 == (1 & e2) && (l2 = (i2 >>> 15) - (o2 >>> 15) - n2, n2 = 1 & l2 >>> 15), this.__setDigit(t2 + g2, (32767 & l2) << 15 | 32767 & s2);
        }
        return n2;
      }
      __inplaceRightShift(_2) {
        if (0 === _2) return;
        let t2 = this.__digit(0) >>> _2;
        const e2 = this.length - 1;
        for (let n2 = 0; n2 < e2; n2++) {
          const i2 = this.__digit(n2 + 1);
          this.__setDigit(n2, 1073741823 & i2 << 30 - _2 | t2), t2 = i2 >>> _2;
        }
        this.__setDigit(e2, t2);
      }
      static __specialLeftShift(_2, t2, e2) {
        const g2 = _2.length, n2 = new _JSBI(g2 + e2, false);
        if (0 === t2) {
          for (let t3 = 0; t3 < g2; t3++) n2.__setDigit(t3, _2.__digit(t3));
          return 0 < e2 && n2.__setDigit(g2, 0), n2;
        }
        let o2 = 0;
        for (let s2 = 0; s2 < g2; s2++) {
          const i2 = _2.__digit(s2);
          n2.__setDigit(s2, 1073741823 & i2 << t2 | o2), o2 = i2 >>> 30 - t2;
        }
        return 0 < e2 && n2.__setDigit(g2, o2), n2;
      }
      static __leftShiftByAbsolute(_2, i2) {
        const t2 = _JSBI.__toShiftAmount(i2);
        if (0 > t2) throw new RangeError("BigInt too big");
        const e2 = 0 | t2 / 30, n2 = t2 % 30, g2 = _2.length, o2 = 0 !== n2 && 0 != _2.__digit(g2 - 1) >>> 30 - n2, s2 = g2 + e2 + (o2 ? 1 : 0), l2 = new _JSBI(s2, _2.sign);
        if (0 === n2) {
          let t3 = 0;
          for (; t3 < e2; t3++) l2.__setDigit(t3, 0);
          for (; t3 < s2; t3++) l2.__setDigit(t3, _2.__digit(t3 - e2));
        } else {
          let t3 = 0;
          for (let _3 = 0; _3 < e2; _3++) l2.__setDigit(_3, 0);
          for (let o3 = 0; o3 < g2; o3++) {
            const i3 = _2.__digit(o3);
            l2.__setDigit(o3 + e2, 1073741823 & i3 << n2 | t3), t3 = i3 >>> 30 - n2;
          }
          if (o2) l2.__setDigit(g2 + e2, t3);
          else if (0 !== t3) throw new Error("implementation bug");
        }
        return l2.__trim();
      }
      static __rightShiftByAbsolute(_2, i2) {
        const t2 = _2.length, e2 = _2.sign, n2 = _JSBI.__toShiftAmount(i2);
        if (0 > n2) return _JSBI.__rightShiftByMaximum(e2);
        const g2 = 0 | n2 / 30, o2 = n2 % 30;
        let s2 = t2 - g2;
        if (0 >= s2) return _JSBI.__rightShiftByMaximum(e2);
        let l2 = false;
        if (e2) {
          if (0 != (_2.__digit(g2) & (1 << o2) - 1)) l2 = true;
          else for (let t3 = 0; t3 < g2; t3++) if (0 !== _2.__digit(t3)) {
            l2 = true;
            break;
          }
        }
        if (l2 && 0 === o2) {
          const i3 = _2.__digit(t2 - 1);
          0 == ~i3 && s2++;
        }
        let r2 = new _JSBI(s2, e2);
        if (0 === o2) {
          r2.__setDigit(s2 - 1, 0);
          for (let e3 = g2; e3 < t2; e3++) r2.__setDigit(e3 - g2, _2.__digit(e3));
        } else {
          let e3 = _2.__digit(g2) >>> o2;
          const n3 = t2 - g2 - 1;
          for (let t3 = 0; t3 < n3; t3++) {
            const i3 = _2.__digit(t3 + g2 + 1);
            r2.__setDigit(t3, 1073741823 & i3 << 30 - o2 | e3), e3 = i3 >>> o2;
          }
          r2.__setDigit(n3, e3);
        }
        return l2 && (r2 = _JSBI.__absoluteAddOne(r2, true, r2)), r2.__trim();
      }
      static __rightShiftByMaximum(i2) {
        return i2 ? _JSBI.__oneDigit(1, true) : _JSBI.__zero();
      }
      static __toShiftAmount(i2) {
        if (1 < i2.length) return -1;
        const _2 = i2.__unsignedDigit(0);
        return _2 > _JSBI.__kMaxLengthBits ? -1 : _2;
      }
      static __toPrimitive(i2, _2 = "default") {
        if ("object" != typeof i2) return i2;
        if (i2.constructor === _JSBI) return i2;
        if ("undefined" != typeof Symbol && "symbol" == typeof Symbol.toPrimitive && i2[Symbol.toPrimitive]) {
          const t3 = i2[Symbol.toPrimitive](_2);
          if ("object" != typeof t3) return t3;
          throw new TypeError("Cannot convert object to primitive value");
        }
        const t2 = i2.valueOf;
        if (t2) {
          const _3 = t2.call(i2);
          if ("object" != typeof _3) return _3;
        }
        const e2 = i2.toString;
        if (e2) {
          const _3 = e2.call(i2);
          if ("object" != typeof _3) return _3;
        }
        throw new TypeError("Cannot convert object to primitive value");
      }
      static __toNumeric(i2) {
        return _JSBI.__isBigInt(i2) ? i2 : +i2;
      }
      static __isBigInt(i2) {
        return "object" == typeof i2 && null !== i2 && i2.constructor === _JSBI;
      }
      static __truncateToNBits(i2, _2) {
        const t2 = 0 | (i2 + 29) / 30, e2 = new _JSBI(t2, _2.sign), n2 = t2 - 1;
        for (let t3 = 0; t3 < n2; t3++) e2.__setDigit(t3, _2.__digit(t3));
        let g2 = _2.__digit(n2);
        if (0 != i2 % 30) {
          const _3 = 32 - i2 % 30;
          g2 = g2 << _3 >>> _3;
        }
        return e2.__setDigit(n2, g2), e2.__trim();
      }
      static __truncateAndSubFromPowerOfTwo(_2, t2, e2) {
        var n2 = Math.min;
        const g2 = 0 | (_2 + 29) / 30, o2 = new _JSBI(g2, e2);
        let s2 = 0;
        const l2 = g2 - 1;
        let a2 = 0;
        for (const i2 = n2(l2, t2.length); s2 < i2; s2++) {
          const i3 = 0 - t2.__digit(s2) - a2;
          a2 = 1 & i3 >>> 30, o2.__setDigit(s2, 1073741823 & i3);
        }
        for (; s2 < l2; s2++) o2.__setDigit(s2, 0 | 1073741823 & -a2);
        let u2 = l2 < t2.length ? t2.__digit(l2) : 0;
        const d2 = _2 % 30;
        let h2;
        if (0 == d2) h2 = 0 - u2 - a2, h2 &= 1073741823;
        else {
          const i2 = 32 - d2;
          u2 = u2 << i2 >>> i2;
          const _3 = 1 << 32 - i2;
          h2 = _3 - u2 - a2, h2 &= _3 - 1;
        }
        return o2.__setDigit(l2, h2), o2.__trim();
      }
      __digit(_2) {
        return this[_2];
      }
      __unsignedDigit(_2) {
        return this[_2] >>> 0;
      }
      __setDigit(_2, i2) {
        this[_2] = 0 | i2;
      }
      __setDigitGrow(_2, i2) {
        this[_2] = 0 | i2;
      }
      __halfDigitLength() {
        const i2 = this.length;
        return 32767 >= this.__unsignedDigit(i2 - 1) ? 2 * i2 - 1 : 2 * i2;
      }
      __halfDigit(_2) {
        return 32767 & this[_2 >>> 1] >>> 15 * (1 & _2);
      }
      __setHalfDigit(_2, i2) {
        const t2 = _2 >>> 1, e2 = this.__digit(t2), n2 = 1 & _2 ? 32767 & e2 | i2 << 15 : 1073709056 & e2 | 32767 & i2;
        this.__setDigit(t2, n2);
      }
      static __digitPow(i2, _2) {
        let t2 = 1;
        for (; 0 < _2; ) 1 & _2 && (t2 *= i2), _2 >>>= 1, i2 *= i2;
        return t2;
      }
      static __detectBigEndian() {
        return _JSBI.__kBitConversionDouble[0] = -0, 0 !== _JSBI.__kBitConversionInts[0];
      }
      static __isOneDigitInt(i2) {
        return (1073741823 & i2) === i2;
      }
    };
    JSBI.__kMaxLength = 33554432, JSBI.__kMaxLengthBits = JSBI.__kMaxLength << 5, JSBI.__kMaxBitsPerChar = [0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], JSBI.__kBitsPerCharTableShift = 5, JSBI.__kBitsPerCharTableMultiplier = 1 << JSBI.__kBitsPerCharTableShift, JSBI.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], JSBI.__kBitConversionBuffer = new ArrayBuffer(8), JSBI.__kBitConversionDouble = new Float64Array(JSBI.__kBitConversionBuffer), JSBI.__kBitConversionInts = new Int32Array(JSBI.__kBitConversionBuffer), JSBI.__kBitConversionIntHigh = JSBI.__detectBigEndian() ? 0 : 1, JSBI.__kBitConversionIntLow = JSBI.__detectBigEndian() ? 1 : 0, JSBI.__clz30 = Math.clz32 ? function(i2) {
      return Math.clz32(i2) - 2;
    } : function(i2) {
      return 0 === i2 ? 30 : 0 | 29 - (0 | Math.log(i2 >>> 0) / Math.LN2);
    }, JSBI.__imul = Math.imul || function(i2, _2) {
      return 0 | i2 * _2;
    }, module.exports = JSBI;
  }
});

// node_modules/rrule/dist/es5/rrule.js
var require_rrule = __commonJS({
  "node_modules/rrule/dist/es5/rrule.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define([], factory);
      else if (typeof exports === "object")
        exports["rrule"] = factory();
      else
        root["rrule"] = factory();
    })(typeof self !== "undefined" ? self : exports, () => {
      return (
        /******/
        (() => {
          "use strict";
          var __webpack_require__ = {};
          (() => {
            __webpack_require__.d = (exports2, definition) => {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          })();
          (() => {
            __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
          })();
          (() => {
            __webpack_require__.r = (exports2) => {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
          })();
          var __webpack_exports__ = {};
          __webpack_require__.r(__webpack_exports__);
          __webpack_require__.d(__webpack_exports__, {
            "ALL_WEEKDAYS": () => (
              /* reexport */
              ALL_WEEKDAYS
            ),
            "Frequency": () => (
              /* reexport */
              Frequency
            ),
            "RRule": () => (
              /* reexport */
              RRule
            ),
            "RRuleSet": () => (
              /* reexport */
              RRuleSet
            ),
            "Weekday": () => (
              /* reexport */
              Weekday
            ),
            "datetime": () => (
              /* reexport */
              datetime
            ),
            "rrulestr": () => (
              /* reexport */
              rrulestr2
            )
          });
          ;
          var ALL_WEEKDAYS = [
            "MO",
            "TU",
            "WE",
            "TH",
            "FR",
            "SA",
            "SU"
          ];
          var Weekday = (
            /** @class */
            (function() {
              function Weekday2(weekday, n2) {
                if (n2 === 0)
                  throw new Error("Can't create weekday with n == 0");
                this.weekday = weekday;
                this.n = n2;
              }
              Weekday2.fromStr = function(str) {
                return new Weekday2(ALL_WEEKDAYS.indexOf(str));
              };
              Weekday2.prototype.nth = function(n2) {
                return this.n === n2 ? this : new Weekday2(this.weekday, n2);
              };
              Weekday2.prototype.equals = function(other) {
                return this.weekday === other.weekday && this.n === other.n;
              };
              Weekday2.prototype.toString = function() {
                var s2 = ALL_WEEKDAYS[this.weekday];
                if (this.n)
                  s2 = (this.n > 0 ? "+" : "") + String(this.n) + s2;
                return s2;
              };
              Weekday2.prototype.getJsWeekday = function() {
                return this.weekday === 6 ? 0 : this.weekday + 1;
              };
              return Weekday2;
            })()
          );
          ;
          var isPresent = function(value) {
            return value !== null && value !== void 0;
          };
          var isNumber = function(value) {
            return typeof value === "number";
          };
          var isWeekdayStr = function(value) {
            return typeof value === "string" && ALL_WEEKDAYS.includes(value);
          };
          var isArray = Array.isArray;
          var range = function(start, end) {
            if (end === void 0) {
              end = start;
            }
            if (arguments.length === 1) {
              end = start;
              start = 0;
            }
            var rang = [];
            for (var i2 = start; i2 < end; i2++)
              rang.push(i2);
            return rang;
          };
          var clone = function(array) {
            return [].concat(array);
          };
          var repeat = function(value, times) {
            var i2 = 0;
            var array = [];
            if (isArray(value)) {
              for (; i2 < times; i2++)
                array[i2] = [].concat(value);
            } else {
              for (; i2 < times; i2++)
                array[i2] = value;
            }
            return array;
          };
          var toArray = function(item) {
            if (isArray(item)) {
              return item;
            }
            return [item];
          };
          function padStart(item, targetLength, padString) {
            if (padString === void 0) {
              padString = " ";
            }
            var str = String(item);
            targetLength = targetLength >> 0;
            if (str.length > targetLength) {
              return String(str);
            }
            targetLength = targetLength - str.length;
            if (targetLength > padString.length) {
              padString += repeat(padString, targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(str);
          }
          var split = function(str, sep, num) {
            var splits = str.split(sep);
            return num ? splits.slice(0, num).concat([splits.slice(num).join(sep)]) : splits;
          };
          var pymod = function(a2, b2) {
            var r2 = a2 % b2;
            return r2 * b2 < 0 ? r2 + b2 : r2;
          };
          var divmod = function(a2, b2) {
            return { div: Math.floor(a2 / b2), mod: pymod(a2, b2) };
          };
          var empty = function(obj) {
            return !isPresent(obj) || obj.length === 0;
          };
          var notEmpty = function(obj) {
            return !empty(obj);
          };
          var includes = function(arr, val) {
            return notEmpty(arr) && arr.indexOf(val) !== -1;
          };
          ;
          var datetime = function(y2, m2, d2, h2, i2, s2) {
            if (h2 === void 0) {
              h2 = 0;
            }
            if (i2 === void 0) {
              i2 = 0;
            }
            if (s2 === void 0) {
              s2 = 0;
            }
            return new Date(Date.UTC(y2, m2 - 1, d2, h2, i2, s2));
          };
          var MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          var ONE_DAY = 1e3 * 60 * 60 * 24;
          var MAXYEAR = 9999;
          var ORDINAL_BASE = datetime(1970, 1, 1);
          var PY_WEEKDAYS = [6, 0, 1, 2, 3, 4, 5];
          var getYearDay = function(date) {
            var dateNoTime = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
            return Math.ceil((dateNoTime.valueOf() - new Date(date.getUTCFullYear(), 0, 1).valueOf()) / ONE_DAY) + 1;
          };
          var isLeapYear = function(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
          };
          var isDate = function(value) {
            return value instanceof Date;
          };
          var isValidDate = function(value) {
            return isDate(value) && !isNaN(value.getTime());
          };
          var tzOffset = function(date) {
            return date.getTimezoneOffset() * 60 * 1e3;
          };
          var daysBetween = function(date1, date2) {
            var date1ms = date1.getTime();
            var date2ms = date2.getTime();
            var differencems = date1ms - date2ms;
            return Math.round(differencems / ONE_DAY);
          };
          var toOrdinal = function(date) {
            return daysBetween(date, ORDINAL_BASE);
          };
          var fromOrdinal = function(ordinal) {
            return new Date(ORDINAL_BASE.getTime() + ordinal * ONE_DAY);
          };
          var getMonthDays = function(date) {
            var month = date.getUTCMonth();
            return month === 1 && isLeapYear(date.getUTCFullYear()) ? 29 : MONTH_DAYS[month];
          };
          var getWeekday = function(date) {
            return PY_WEEKDAYS[date.getUTCDay()];
          };
          var monthRange = function(year, month) {
            var date = datetime(year, month + 1, 1);
            return [getWeekday(date), getMonthDays(date)];
          };
          var combine = function(date, time) {
            time = time || date;
            return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()));
          };
          var dateutil_clone = function(date) {
            var dolly = new Date(date.getTime());
            return dolly;
          };
          var cloneDates = function(dates) {
            var clones = [];
            for (var i2 = 0; i2 < dates.length; i2++) {
              clones.push(dateutil_clone(dates[i2]));
            }
            return clones;
          };
          var sort = function(dates) {
            dates.sort(function(a2, b2) {
              return a2.getTime() - b2.getTime();
            });
          };
          var timeToUntilString = function(time, utc) {
            if (utc === void 0) {
              utc = true;
            }
            var date = new Date(time);
            return [
              padStart(date.getUTCFullYear().toString(), 4, "0"),
              padStart(date.getUTCMonth() + 1, 2, "0"),
              padStart(date.getUTCDate(), 2, "0"),
              "T",
              padStart(date.getUTCHours(), 2, "0"),
              padStart(date.getUTCMinutes(), 2, "0"),
              padStart(date.getUTCSeconds(), 2, "0"),
              utc ? "Z" : ""
            ].join("");
          };
          var untilStringToDate = function(until) {
            var re2 = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/;
            var bits = re2.exec(until);
            if (!bits)
              throw new Error("Invalid UNTIL value: ".concat(until));
            return new Date(Date.UTC(parseInt(bits[1], 10), parseInt(bits[2], 10) - 1, parseInt(bits[3], 10), parseInt(bits[5], 10) || 0, parseInt(bits[6], 10) || 0, parseInt(bits[7], 10) || 0));
          };
          var dateTZtoISO8601 = function(date, timeZone) {
            var dateStr = date.toLocaleString("sv-SE", { timeZone });
            return dateStr.replace(" ", "T") + "Z";
          };
          var dateInTimeZone = function(date, timeZone) {
            var localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            var dateInLocalTZ = new Date(dateTZtoISO8601(date, localTimeZone));
            var dateInTargetTZ = new Date(dateTZtoISO8601(date, timeZone !== null && timeZone !== void 0 ? timeZone : "UTC"));
            var tzOffset2 = dateInTargetTZ.getTime() - dateInLocalTZ.getTime();
            return new Date(date.getTime() - tzOffset2);
          };
          ;
          var IterResult = (
            /** @class */
            (function() {
              function IterResult2(method, args) {
                this.minDate = null;
                this.maxDate = null;
                this._result = [];
                this.total = 0;
                this.method = method;
                this.args = args;
                if (method === "between") {
                  this.maxDate = args.inc ? args.before : new Date(args.before.getTime() - 1);
                  this.minDate = args.inc ? args.after : new Date(args.after.getTime() + 1);
                } else if (method === "before") {
                  this.maxDate = args.inc ? args.dt : new Date(args.dt.getTime() - 1);
                } else if (method === "after") {
                  this.minDate = args.inc ? args.dt : new Date(args.dt.getTime() + 1);
                }
              }
              IterResult2.prototype.accept = function(date) {
                ++this.total;
                var tooEarly = this.minDate && date < this.minDate;
                var tooLate = this.maxDate && date > this.maxDate;
                if (this.method === "between") {
                  if (tooEarly)
                    return true;
                  if (tooLate)
                    return false;
                } else if (this.method === "before") {
                  if (tooLate)
                    return false;
                } else if (this.method === "after") {
                  if (tooEarly)
                    return true;
                  this.add(date);
                  return false;
                }
                return this.add(date);
              };
              IterResult2.prototype.add = function(date) {
                this._result.push(date);
                return true;
              };
              IterResult2.prototype.getValue = function() {
                var res = this._result;
                switch (this.method) {
                  case "all":
                  case "between":
                    return res;
                  case "before":
                  case "after":
                  default:
                    return res.length ? res[res.length - 1] : null;
                }
              };
              IterResult2.prototype.clone = function() {
                return new IterResult2(this.method, this.args);
              };
              return IterResult2;
            })()
          );
          const iterresult = IterResult;
          ;
          var extendStatics = function(d2, b2) {
            extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
              d3.__proto__ = b3;
            } || function(d3, b3) {
              for (var p2 in b3) if (Object.prototype.hasOwnProperty.call(b3, p2)) d3[p2] = b3[p2];
            };
            return extendStatics(d2, b2);
          };
          function __extends(d2, b2) {
            if (typeof b2 !== "function" && b2 !== null)
              throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
            extendStatics(d2, b2);
            function __() {
              this.constructor = d2;
            }
            d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
          }
          var __assign = function() {
            __assign = Object.assign || function __assign2(t2) {
              for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
                s2 = arguments[i2];
                for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t2[p2] = s2[p2];
              }
              return t2;
            };
            return __assign.apply(this, arguments);
          };
          function __rest(s2, e2) {
            var t2 = {};
            for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0)
              t2[p2] = s2[p2];
            if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
              for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
                if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
                  t2[p2[i2]] = s2[p2[i2]];
              }
            return t2;
          }
          function __decorate(decorators, target, key, desc) {
            var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
            else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d2 = decorators[i2]) r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
            return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
          }
          function __param(paramIndex, decorator) {
            return function(target, key) {
              decorator(target, key, paramIndex);
            };
          }
          function __metadata(metadataKey, metadataValue) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
          }
          function __awaiter(thisArg, _arguments, P2, generator) {
            function adopt(value) {
              return value instanceof P2 ? value : new P2(function(resolve) {
                resolve(value);
              });
            }
            return new (P2 || (P2 = Promise))(function(resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e2) {
                  reject(e2);
                }
              }
              function rejected(value) {
                try {
                  step(generator["throw"](value));
                } catch (e2) {
                  reject(e2);
                }
              }
              function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
              }
              step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
          }
          function __generator(thisArg, body) {
            var _2 = { label: 0, sent: function() {
              if (t2[0] & 1) throw t2[1];
              return t2[1];
            }, trys: [], ops: [] }, f2, y2, t2, g2;
            return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
              return this;
            }), g2;
            function verb(n2) {
              return function(v2) {
                return step([n2, v2]);
              };
            }
            function step(op) {
              if (f2) throw new TypeError("Generator is already executing.");
              while (_2) try {
                if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done) return t2;
                if (y2 = 0, t2) op = [op[0] & 2, t2.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t2 = op;
                    break;
                  case 4:
                    _2.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _2.label++;
                    y2 = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _2.ops.pop();
                    _2.trys.pop();
                    continue;
                  default:
                    if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _2 = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                      _2.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _2.label < t2[1]) {
                      _2.label = t2[1];
                      t2 = op;
                      break;
                    }
                    if (t2 && _2.label < t2[2]) {
                      _2.label = t2[2];
                      _2.ops.push(op);
                      break;
                    }
                    if (t2[2]) _2.ops.pop();
                    _2.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _2);
              } catch (e2) {
                op = [6, e2];
                y2 = 0;
              } finally {
                f2 = t2 = 0;
              }
              if (op[0] & 5) throw op[1];
              return { value: op[0] ? op[1] : void 0, done: true };
            }
          }
          var __createBinding = Object.create ? (function(o2, m2, k2, k22) {
            if (k22 === void 0) k22 = k2;
            var desc = Object.getOwnPropertyDescriptor(m2, k2);
            if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
              desc = { enumerable: true, get: function() {
                return m2[k2];
              } };
            }
            Object.defineProperty(o2, k22, desc);
          }) : (function(o2, m2, k2, k22) {
            if (k22 === void 0) k22 = k2;
            o2[k22] = m2[k2];
          });
          function __exportStar(m2, o2) {
            for (var p2 in m2) if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(o2, p2)) __createBinding(o2, m2, p2);
          }
          function __values(o2) {
            var s2 = typeof Symbol === "function" && Symbol.iterator, m2 = s2 && o2[s2], i2 = 0;
            if (m2) return m2.call(o2);
            if (o2 && typeof o2.length === "number") return {
              next: function() {
                if (o2 && i2 >= o2.length) o2 = void 0;
                return { value: o2 && o2[i2++], done: !o2 };
              }
            };
            throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
          }
          function __read(o2, n2) {
            var m2 = typeof Symbol === "function" && o2[Symbol.iterator];
            if (!m2) return o2;
            var i2 = m2.call(o2), r2, ar2 = [], e2;
            try {
              while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar2.push(r2.value);
            } catch (error) {
              e2 = { error };
            } finally {
              try {
                if (r2 && !r2.done && (m2 = i2["return"])) m2.call(i2);
              } finally {
                if (e2) throw e2.error;
              }
            }
            return ar2;
          }
          function __spread() {
            for (var ar2 = [], i2 = 0; i2 < arguments.length; i2++)
              ar2 = ar2.concat(__read(arguments[i2]));
            return ar2;
          }
          function __spreadArrays() {
            for (var s2 = 0, i2 = 0, il = arguments.length; i2 < il; i2++) s2 += arguments[i2].length;
            for (var r2 = Array(s2), k2 = 0, i2 = 0; i2 < il; i2++)
              for (var a2 = arguments[i2], j2 = 0, jl = a2.length; j2 < jl; j2++, k2++)
                r2[k2] = a2[j2];
            return r2;
          }
          function __spreadArray(to2, from, pack) {
            if (pack || arguments.length === 2) for (var i2 = 0, l2 = from.length, ar2; i2 < l2; i2++) {
              if (ar2 || !(i2 in from)) {
                if (!ar2) ar2 = Array.prototype.slice.call(from, 0, i2);
                ar2[i2] = from[i2];
              }
            }
            return to2.concat(ar2 || Array.prototype.slice.call(from));
          }
          function __await(v2) {
            return this instanceof __await ? (this.v = v2, this) : new __await(v2);
          }
          function __asyncGenerator(thisArg, _arguments, generator) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var g2 = generator.apply(thisArg, _arguments || []), i2, q2 = [];
            return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
              return this;
            }, i2;
            function verb(n2) {
              if (g2[n2]) i2[n2] = function(v2) {
                return new Promise(function(a2, b2) {
                  q2.push([n2, v2, a2, b2]) > 1 || resume(n2, v2);
                });
              };
            }
            function resume(n2, v2) {
              try {
                step(g2[n2](v2));
              } catch (e2) {
                settle(q2[0][3], e2);
              }
            }
            function step(r2) {
              r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q2[0][2], r2);
            }
            function fulfill(value) {
              resume("next", value);
            }
            function reject(value) {
              resume("throw", value);
            }
            function settle(f2, v2) {
              if (f2(v2), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
            }
          }
          function __asyncDelegator(o2) {
            var i2, p2;
            return i2 = {}, verb("next"), verb("throw", function(e2) {
              throw e2;
            }), verb("return"), i2[Symbol.iterator] = function() {
              return this;
            }, i2;
            function verb(n2, f2) {
              i2[n2] = o2[n2] ? function(v2) {
                return (p2 = !p2) ? { value: __await(o2[n2](v2)), done: n2 === "return" } : f2 ? f2(v2) : v2;
              } : f2;
            }
          }
          function __asyncValues(o2) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var m2 = o2[Symbol.asyncIterator], i2;
            return m2 ? m2.call(o2) : (o2 = typeof __values === "function" ? __values(o2) : o2[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
              return this;
            }, i2);
            function verb(n2) {
              i2[n2] = o2[n2] && function(v2) {
                return new Promise(function(resolve, reject) {
                  v2 = o2[n2](v2), settle(resolve, reject, v2.done, v2.value);
                });
              };
            }
            function settle(resolve, reject, d2, v2) {
              Promise.resolve(v2).then(function(v3) {
                resolve({ value: v3, done: d2 });
              }, reject);
            }
          }
          function __makeTemplateObject(cooked, raw) {
            if (Object.defineProperty) {
              Object.defineProperty(cooked, "raw", { value: raw });
            } else {
              cooked.raw = raw;
            }
            return cooked;
          }
          ;
          var __setModuleDefault = Object.create ? (function(o2, v2) {
            Object.defineProperty(o2, "default", { enumerable: true, value: v2 });
          }) : function(o2, v2) {
            o2["default"] = v2;
          };
          function __importStar(mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) {
              for (var k2 in mod) if (k2 !== "default" && Object.prototype.hasOwnProperty.call(mod, k2)) __createBinding(result, mod, k2);
            }
            __setModuleDefault(result, mod);
            return result;
          }
          function __importDefault(mod) {
            return mod && mod.__esModule ? mod : { default: mod };
          }
          function __classPrivateFieldGet(receiver, state, kind, f2) {
            if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a getter");
            if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
          }
          function __classPrivateFieldSet(receiver, state, value, kind, f2) {
            if (kind === "m") throw new TypeError("Private method is not writable");
            if (kind === "a" && !f2) throw new TypeError("Private accessor was defined without a setter");
            if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return kind === "a" ? f2.call(receiver, value) : f2 ? f2.value = value : state.set(receiver, value), value;
          }
          function __classPrivateFieldIn(state, receiver) {
            if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
            return typeof state === "function" ? receiver === state : state.has(receiver);
          }
          ;
          var CallbackIterResult = (
            /** @class */
            (function(_super) {
              __extends(CallbackIterResult2, _super);
              function CallbackIterResult2(method, args, iterator) {
                var _this = _super.call(this, method, args) || this;
                _this.iterator = iterator;
                return _this;
              }
              CallbackIterResult2.prototype.add = function(date) {
                if (this.iterator(date, this._result.length)) {
                  this._result.push(date);
                  return true;
                }
                return false;
              };
              return CallbackIterResult2;
            })(iterresult)
          );
          const callbackiterresult = CallbackIterResult;
          ;
          var ENGLISH = {
            dayNames: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            monthNames: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ],
            tokens: {
              SKIP: /^[ \r\n\t]+|^\.$/,
              number: /^[1-9][0-9]*/,
              numberAsText: /^(one|two|three)/i,
              every: /^every/i,
              "day(s)": /^days?/i,
              "weekday(s)": /^weekdays?/i,
              "week(s)": /^weeks?/i,
              "hour(s)": /^hours?/i,
              "minute(s)": /^minutes?/i,
              "month(s)": /^months?/i,
              "year(s)": /^years?/i,
              on: /^(on|in)/i,
              at: /^(at)/i,
              the: /^the/i,
              first: /^first/i,
              second: /^second/i,
              third: /^third/i,
              nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i,
              last: /^last/i,
              for: /^for/i,
              "time(s)": /^times?/i,
              until: /^(un)?til/i,
              monday: /^mo(n(day)?)?/i,
              tuesday: /^tu(e(s(day)?)?)?/i,
              wednesday: /^we(d(n(esday)?)?)?/i,
              thursday: /^th(u(r(sday)?)?)?/i,
              friday: /^fr(i(day)?)?/i,
              saturday: /^sa(t(urday)?)?/i,
              sunday: /^su(n(day)?)?/i,
              january: /^jan(uary)?/i,
              february: /^feb(ruary)?/i,
              march: /^mar(ch)?/i,
              april: /^apr(il)?/i,
              may: /^may/i,
              june: /^june?/i,
              july: /^july?/i,
              august: /^aug(ust)?/i,
              september: /^sep(t(ember)?)?/i,
              october: /^oct(ober)?/i,
              november: /^nov(ember)?/i,
              december: /^dec(ember)?/i,
              comma: /^(,\s*|(and|or)\s*)+/i
            }
          };
          const i18n = ENGLISH;
          ;
          var contains = function(arr, val) {
            return arr.indexOf(val) !== -1;
          };
          var defaultGetText = function(id) {
            return id.toString();
          };
          var defaultDateFormatter = function(year, month, day) {
            return "".concat(month, " ").concat(day, ", ").concat(year);
          };
          var ToText = (
            /** @class */
            (function() {
              function ToText2(rrule, gettext, language, dateFormatter) {
                if (gettext === void 0) {
                  gettext = defaultGetText;
                }
                if (language === void 0) {
                  language = i18n;
                }
                if (dateFormatter === void 0) {
                  dateFormatter = defaultDateFormatter;
                }
                this.text = [];
                this.language = language || i18n;
                this.gettext = gettext;
                this.dateFormatter = dateFormatter;
                this.rrule = rrule;
                this.options = rrule.options;
                this.origOptions = rrule.origOptions;
                if (this.origOptions.bymonthday) {
                  var bymonthday = [].concat(this.options.bymonthday);
                  var bynmonthday = [].concat(this.options.bynmonthday);
                  bymonthday.sort(function(a2, b2) {
                    return a2 - b2;
                  });
                  bynmonthday.sort(function(a2, b2) {
                    return b2 - a2;
                  });
                  this.bymonthday = bymonthday.concat(bynmonthday);
                  if (!this.bymonthday.length)
                    this.bymonthday = null;
                }
                if (isPresent(this.origOptions.byweekday)) {
                  var byweekday = !isArray(this.origOptions.byweekday) ? [this.origOptions.byweekday] : this.origOptions.byweekday;
                  var days = String(byweekday);
                  this.byweekday = {
                    allWeeks: byweekday.filter(function(weekday) {
                      return !weekday.n;
                    }),
                    someWeeks: byweekday.filter(function(weekday) {
                      return Boolean(weekday.n);
                    }),
                    isWeekdays: days.indexOf("MO") !== -1 && days.indexOf("TU") !== -1 && days.indexOf("WE") !== -1 && days.indexOf("TH") !== -1 && days.indexOf("FR") !== -1 && days.indexOf("SA") === -1 && days.indexOf("SU") === -1,
                    isEveryDay: days.indexOf("MO") !== -1 && days.indexOf("TU") !== -1 && days.indexOf("WE") !== -1 && days.indexOf("TH") !== -1 && days.indexOf("FR") !== -1 && days.indexOf("SA") !== -1 && days.indexOf("SU") !== -1
                  };
                  var sortWeekDays = function(a2, b2) {
                    return a2.weekday - b2.weekday;
                  };
                  this.byweekday.allWeeks.sort(sortWeekDays);
                  this.byweekday.someWeeks.sort(sortWeekDays);
                  if (!this.byweekday.allWeeks.length)
                    this.byweekday.allWeeks = null;
                  if (!this.byweekday.someWeeks.length)
                    this.byweekday.someWeeks = null;
                } else {
                  this.byweekday = null;
                }
              }
              ToText2.isFullyConvertible = function(rrule) {
                var canConvert = true;
                if (!(rrule.options.freq in ToText2.IMPLEMENTED))
                  return false;
                if (rrule.origOptions.until && rrule.origOptions.count)
                  return false;
                for (var key in rrule.origOptions) {
                  if (contains(["dtstart", "tzid", "wkst", "freq"], key))
                    return true;
                  if (!contains(ToText2.IMPLEMENTED[rrule.options.freq], key))
                    return false;
                }
                return canConvert;
              };
              ToText2.prototype.isFullyConvertible = function() {
                return ToText2.isFullyConvertible(this.rrule);
              };
              ToText2.prototype.toString = function() {
                var gettext = this.gettext;
                if (!(this.options.freq in ToText2.IMPLEMENTED)) {
                  return gettext("RRule error: Unable to fully convert this rrule to text");
                }
                this.text = [gettext("every")];
                this[RRule.FREQUENCIES[this.options.freq]]();
                if (this.options.until) {
                  this.add(gettext("until"));
                  var until = this.options.until;
                  this.add(this.dateFormatter(until.getUTCFullYear(), this.language.monthNames[until.getUTCMonth()], until.getUTCDate()));
                } else if (this.options.count) {
                  this.add(gettext("for")).add(this.options.count.toString()).add(this.plural(this.options.count) ? gettext("times") : gettext("time"));
                }
                if (!this.isFullyConvertible())
                  this.add(gettext("(~ approximate)"));
                return this.text.join("");
              };
              ToText2.prototype.HOURLY = function() {
                var gettext = this.gettext;
                if (this.options.interval !== 1)
                  this.add(this.options.interval.toString());
                this.add(this.plural(this.options.interval) ? gettext("hours") : gettext("hour"));
              };
              ToText2.prototype.MINUTELY = function() {
                var gettext = this.gettext;
                if (this.options.interval !== 1)
                  this.add(this.options.interval.toString());
                this.add(this.plural(this.options.interval) ? gettext("minutes") : gettext("minute"));
              };
              ToText2.prototype.DAILY = function() {
                var gettext = this.gettext;
                if (this.options.interval !== 1)
                  this.add(this.options.interval.toString());
                if (this.byweekday && this.byweekday.isWeekdays) {
                  this.add(this.plural(this.options.interval) ? gettext("weekdays") : gettext("weekday"));
                } else {
                  this.add(this.plural(this.options.interval) ? gettext("days") : gettext("day"));
                }
                if (this.origOptions.bymonth) {
                  this.add(gettext("in"));
                  this._bymonth();
                }
                if (this.bymonthday) {
                  this._bymonthday();
                } else if (this.byweekday) {
                  this._byweekday();
                } else if (this.origOptions.byhour) {
                  this._byhour();
                }
              };
              ToText2.prototype.WEEKLY = function() {
                var gettext = this.gettext;
                if (this.options.interval !== 1) {
                  this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? gettext("weeks") : gettext("week"));
                }
                if (this.byweekday && this.byweekday.isWeekdays) {
                  if (this.options.interval === 1) {
                    this.add(this.plural(this.options.interval) ? gettext("weekdays") : gettext("weekday"));
                  } else {
                    this.add(gettext("on")).add(gettext("weekdays"));
                  }
                } else if (this.byweekday && this.byweekday.isEveryDay) {
                  this.add(this.plural(this.options.interval) ? gettext("days") : gettext("day"));
                } else {
                  if (this.options.interval === 1)
                    this.add(gettext("week"));
                  if (this.origOptions.bymonth) {
                    this.add(gettext("in"));
                    this._bymonth();
                  }
                  if (this.bymonthday) {
                    this._bymonthday();
                  } else if (this.byweekday) {
                    this._byweekday();
                  }
                  if (this.origOptions.byhour) {
                    this._byhour();
                  }
                }
              };
              ToText2.prototype.MONTHLY = function() {
                var gettext = this.gettext;
                if (this.origOptions.bymonth) {
                  if (this.options.interval !== 1) {
                    this.add(this.options.interval.toString()).add(gettext("months"));
                    if (this.plural(this.options.interval))
                      this.add(gettext("in"));
                  } else {
                  }
                  this._bymonth();
                } else {
                  if (this.options.interval !== 1) {
                    this.add(this.options.interval.toString());
                  }
                  this.add(this.plural(this.options.interval) ? gettext("months") : gettext("month"));
                }
                if (this.bymonthday) {
                  this._bymonthday();
                } else if (this.byweekday && this.byweekday.isWeekdays) {
                  this.add(gettext("on")).add(gettext("weekdays"));
                } else if (this.byweekday) {
                  this._byweekday();
                }
              };
              ToText2.prototype.YEARLY = function() {
                var gettext = this.gettext;
                if (this.origOptions.bymonth) {
                  if (this.options.interval !== 1) {
                    this.add(this.options.interval.toString());
                    this.add(gettext("years"));
                  } else {
                  }
                  this._bymonth();
                } else {
                  if (this.options.interval !== 1) {
                    this.add(this.options.interval.toString());
                  }
                  this.add(this.plural(this.options.interval) ? gettext("years") : gettext("year"));
                }
                if (this.bymonthday) {
                  this._bymonthday();
                } else if (this.byweekday) {
                  this._byweekday();
                }
                if (this.options.byyearday) {
                  this.add(gettext("on the")).add(this.list(this.options.byyearday, this.nth, gettext("and"))).add(gettext("day"));
                }
                if (this.options.byweekno) {
                  this.add(gettext("in")).add(this.plural(this.options.byweekno.length) ? gettext("weeks") : gettext("week")).add(this.list(this.options.byweekno, void 0, gettext("and")));
                }
              };
              ToText2.prototype._bymonthday = function() {
                var gettext = this.gettext;
                if (this.byweekday && this.byweekday.allWeeks) {
                  this.add(gettext("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext, gettext("or"))).add(gettext("the")).add(this.list(this.bymonthday, this.nth, gettext("or")));
                } else {
                  this.add(gettext("on the")).add(this.list(this.bymonthday, this.nth, gettext("and")));
                }
              };
              ToText2.prototype._byweekday = function() {
                var gettext = this.gettext;
                if (this.byweekday.allWeeks && !this.byweekday.isWeekdays) {
                  this.add(gettext("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext));
                }
                if (this.byweekday.someWeeks) {
                  if (this.byweekday.allWeeks)
                    this.add(gettext("and"));
                  this.add(gettext("on the")).add(this.list(this.byweekday.someWeeks, this.weekdaytext, gettext("and")));
                }
              };
              ToText2.prototype._byhour = function() {
                var gettext = this.gettext;
                this.add(gettext("at")).add(this.list(this.origOptions.byhour, void 0, gettext("and")));
              };
              ToText2.prototype._bymonth = function() {
                this.add(this.list(this.options.bymonth, this.monthtext, this.gettext("and")));
              };
              ToText2.prototype.nth = function(n2) {
                n2 = parseInt(n2.toString(), 10);
                var nth;
                var gettext = this.gettext;
                if (n2 === -1)
                  return gettext("last");
                var npos = Math.abs(n2);
                switch (npos) {
                  case 1:
                  case 21:
                  case 31:
                    nth = npos + gettext("st");
                    break;
                  case 2:
                  case 22:
                    nth = npos + gettext("nd");
                    break;
                  case 3:
                  case 23:
                    nth = npos + gettext("rd");
                    break;
                  default:
                    nth = npos + gettext("th");
                }
                return n2 < 0 ? nth + " " + gettext("last") : nth;
              };
              ToText2.prototype.monthtext = function(m2) {
                return this.language.monthNames[m2 - 1];
              };
              ToText2.prototype.weekdaytext = function(wday) {
                var weekday = isNumber(wday) ? (wday + 1) % 7 : wday.getJsWeekday();
                return (wday.n ? this.nth(wday.n) + " " : "") + this.language.dayNames[weekday];
              };
              ToText2.prototype.plural = function(n2) {
                return n2 % 100 !== 1;
              };
              ToText2.prototype.add = function(s2) {
                this.text.push(" ");
                this.text.push(s2);
                return this;
              };
              ToText2.prototype.list = function(arr, callback, finalDelim, delim) {
                var _this = this;
                if (delim === void 0) {
                  delim = ",";
                }
                if (!isArray(arr)) {
                  arr = [arr];
                }
                var delimJoin = function(array, delimiter, finalDelimiter) {
                  var list = "";
                  for (var i2 = 0; i2 < array.length; i2++) {
                    if (i2 !== 0) {
                      if (i2 === array.length - 1) {
                        list += " " + finalDelimiter + " ";
                      } else {
                        list += delimiter + " ";
                      }
                    }
                    list += array[i2];
                  }
                  return list;
                };
                callback = callback || function(o2) {
                  return o2.toString();
                };
                var realCallback = function(arg) {
                  return callback && callback.call(_this, arg);
                };
                if (finalDelim) {
                  return delimJoin(arr.map(realCallback), delim, finalDelim);
                } else {
                  return arr.map(realCallback).join(delim + " ");
                }
              };
              return ToText2;
            })()
          );
          const totext = ToText;
          ;
          var Parser = (
            /** @class */
            (function() {
              function Parser2(rules) {
                this.done = true;
                this.rules = rules;
              }
              Parser2.prototype.start = function(text) {
                this.text = text;
                this.done = false;
                return this.nextSymbol();
              };
              Parser2.prototype.isDone = function() {
                return this.done && this.symbol === null;
              };
              Parser2.prototype.nextSymbol = function() {
                var best;
                var bestSymbol;
                this.symbol = null;
                this.value = null;
                do {
                  if (this.done)
                    return false;
                  var rule = void 0;
                  best = null;
                  for (var name_1 in this.rules) {
                    rule = this.rules[name_1];
                    var match = rule.exec(this.text);
                    if (match) {
                      if (best === null || match[0].length > best[0].length) {
                        best = match;
                        bestSymbol = name_1;
                      }
                    }
                  }
                  if (best != null) {
                    this.text = this.text.substr(best[0].length);
                    if (this.text === "")
                      this.done = true;
                  }
                  if (best == null) {
                    this.done = true;
                    this.symbol = null;
                    this.value = null;
                    return;
                  }
                } while (bestSymbol === "SKIP");
                this.symbol = bestSymbol;
                this.value = best;
                return true;
              };
              Parser2.prototype.accept = function(name) {
                if (this.symbol === name) {
                  if (this.value) {
                    var v2 = this.value;
                    this.nextSymbol();
                    return v2;
                  }
                  this.nextSymbol();
                  return true;
                }
                return false;
              };
              Parser2.prototype.acceptNumber = function() {
                return this.accept("number");
              };
              Parser2.prototype.expect = function(name) {
                if (this.accept(name))
                  return true;
                throw new Error("expected " + name + " but found " + this.symbol);
              };
              return Parser2;
            })()
          );
          function parseText(text, language) {
            if (language === void 0) {
              language = i18n;
            }
            var options = {};
            var ttr = new Parser(language.tokens);
            if (!ttr.start(text))
              return null;
            S2();
            return options;
            function S2() {
              ttr.expect("every");
              var n2 = ttr.acceptNumber();
              if (n2)
                options.interval = parseInt(n2[0], 10);
              if (ttr.isDone())
                throw new Error("Unexpected end");
              switch (ttr.symbol) {
                case "day(s)":
                  options.freq = RRule.DAILY;
                  if (ttr.nextSymbol()) {
                    AT();
                    F2();
                  }
                  break;
                // FIXME Note: every 2 weekdays != every two weeks on weekdays.
                // DAILY on weekdays is not a valid rule
                case "weekday(s)":
                  options.freq = RRule.WEEKLY;
                  options.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
                  ttr.nextSymbol();
                  AT();
                  F2();
                  break;
                case "week(s)":
                  options.freq = RRule.WEEKLY;
                  if (ttr.nextSymbol()) {
                    ON();
                    AT();
                    F2();
                  }
                  break;
                case "hour(s)":
                  options.freq = RRule.HOURLY;
                  if (ttr.nextSymbol()) {
                    ON();
                    F2();
                  }
                  break;
                case "minute(s)":
                  options.freq = RRule.MINUTELY;
                  if (ttr.nextSymbol()) {
                    ON();
                    F2();
                  }
                  break;
                case "month(s)":
                  options.freq = RRule.MONTHLY;
                  if (ttr.nextSymbol()) {
                    ON();
                    F2();
                  }
                  break;
                case "year(s)":
                  options.freq = RRule.YEARLY;
                  if (ttr.nextSymbol()) {
                    ON();
                    F2();
                  }
                  break;
                case "monday":
                case "tuesday":
                case "wednesday":
                case "thursday":
                case "friday":
                case "saturday":
                case "sunday":
                  options.freq = RRule.WEEKLY;
                  var key = ttr.symbol.substr(0, 2).toUpperCase();
                  options.byweekday = [RRule[key]];
                  if (!ttr.nextSymbol())
                    return;
                  while (ttr.accept("comma")) {
                    if (ttr.isDone())
                      throw new Error("Unexpected end");
                    var wkd = decodeWKD();
                    if (!wkd) {
                      throw new Error("Unexpected symbol " + ttr.symbol + ", expected weekday");
                    }
                    options.byweekday.push(RRule[wkd]);
                    ttr.nextSymbol();
                  }
                  AT();
                  MDAYs();
                  F2();
                  break;
                case "january":
                case "february":
                case "march":
                case "april":
                case "may":
                case "june":
                case "july":
                case "august":
                case "september":
                case "october":
                case "november":
                case "december":
                  options.freq = RRule.YEARLY;
                  options.bymonth = [decodeM()];
                  if (!ttr.nextSymbol())
                    return;
                  while (ttr.accept("comma")) {
                    if (ttr.isDone())
                      throw new Error("Unexpected end");
                    var m2 = decodeM();
                    if (!m2) {
                      throw new Error("Unexpected symbol " + ttr.symbol + ", expected month");
                    }
                    options.bymonth.push(m2);
                    ttr.nextSymbol();
                  }
                  ON();
                  F2();
                  break;
                default:
                  throw new Error("Unknown symbol");
              }
            }
            function ON() {
              var on2 = ttr.accept("on");
              var the = ttr.accept("the");
              if (!(on2 || the))
                return;
              do {
                var nth = decodeNTH();
                var wkd = decodeWKD();
                var m2 = decodeM();
                if (nth) {
                  if (wkd) {
                    ttr.nextSymbol();
                    if (!options.byweekday)
                      options.byweekday = [];
                    options.byweekday.push(RRule[wkd].nth(nth));
                  } else {
                    if (!options.bymonthday)
                      options.bymonthday = [];
                    options.bymonthday.push(nth);
                    ttr.accept("day(s)");
                  }
                } else if (wkd) {
                  ttr.nextSymbol();
                  if (!options.byweekday)
                    options.byweekday = [];
                  options.byweekday.push(RRule[wkd]);
                } else if (ttr.symbol === "weekday(s)") {
                  ttr.nextSymbol();
                  if (!options.byweekday) {
                    options.byweekday = [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR];
                  }
                } else if (ttr.symbol === "week(s)") {
                  ttr.nextSymbol();
                  var n2 = ttr.acceptNumber();
                  if (!n2) {
                    throw new Error("Unexpected symbol " + ttr.symbol + ", expected week number");
                  }
                  options.byweekno = [parseInt(n2[0], 10)];
                  while (ttr.accept("comma")) {
                    n2 = ttr.acceptNumber();
                    if (!n2) {
                      throw new Error("Unexpected symbol " + ttr.symbol + "; expected monthday");
                    }
                    options.byweekno.push(parseInt(n2[0], 10));
                  }
                } else if (m2) {
                  ttr.nextSymbol();
                  if (!options.bymonth)
                    options.bymonth = [];
                  options.bymonth.push(m2);
                } else {
                  return;
                }
              } while (ttr.accept("comma") || ttr.accept("the") || ttr.accept("on"));
            }
            function AT() {
              var at2 = ttr.accept("at");
              if (!at2)
                return;
              do {
                var n2 = ttr.acceptNumber();
                if (!n2) {
                  throw new Error("Unexpected symbol " + ttr.symbol + ", expected hour");
                }
                options.byhour = [parseInt(n2[0], 10)];
                while (ttr.accept("comma")) {
                  n2 = ttr.acceptNumber();
                  if (!n2) {
                    throw new Error("Unexpected symbol " + ttr.symbol + "; expected hour");
                  }
                  options.byhour.push(parseInt(n2[0], 10));
                }
              } while (ttr.accept("comma") || ttr.accept("at"));
            }
            function decodeM() {
              switch (ttr.symbol) {
                case "january":
                  return 1;
                case "february":
                  return 2;
                case "march":
                  return 3;
                case "april":
                  return 4;
                case "may":
                  return 5;
                case "june":
                  return 6;
                case "july":
                  return 7;
                case "august":
                  return 8;
                case "september":
                  return 9;
                case "october":
                  return 10;
                case "november":
                  return 11;
                case "december":
                  return 12;
                default:
                  return false;
              }
            }
            function decodeWKD() {
              switch (ttr.symbol) {
                case "monday":
                case "tuesday":
                case "wednesday":
                case "thursday":
                case "friday":
                case "saturday":
                case "sunday":
                  return ttr.symbol.substr(0, 2).toUpperCase();
                default:
                  return false;
              }
            }
            function decodeNTH() {
              switch (ttr.symbol) {
                case "last":
                  ttr.nextSymbol();
                  return -1;
                case "first":
                  ttr.nextSymbol();
                  return 1;
                case "second":
                  ttr.nextSymbol();
                  return ttr.accept("last") ? -2 : 2;
                case "third":
                  ttr.nextSymbol();
                  return ttr.accept("last") ? -3 : 3;
                case "nth":
                  var v2 = parseInt(ttr.value[1], 10);
                  if (v2 < -366 || v2 > 366)
                    throw new Error("Nth out of range: " + v2);
                  ttr.nextSymbol();
                  return ttr.accept("last") ? -v2 : v2;
                default:
                  return false;
              }
            }
            function MDAYs() {
              ttr.accept("on");
              ttr.accept("the");
              var nth = decodeNTH();
              if (!nth)
                return;
              options.bymonthday = [nth];
              ttr.nextSymbol();
              while (ttr.accept("comma")) {
                nth = decodeNTH();
                if (!nth) {
                  throw new Error("Unexpected symbol " + ttr.symbol + "; expected monthday");
                }
                options.bymonthday.push(nth);
                ttr.nextSymbol();
              }
            }
            function F2() {
              if (ttr.symbol === "until") {
                var date = Date.parse(ttr.text);
                if (!date)
                  throw new Error("Cannot parse until date:" + ttr.text);
                options.until = new Date(date);
              } else if (ttr.accept("for")) {
                options.count = parseInt(ttr.value[0], 10);
                ttr.expect("number");
              }
            }
          }
          ;
          var Frequency;
          (function(Frequency2) {
            Frequency2[Frequency2["YEARLY"] = 0] = "YEARLY";
            Frequency2[Frequency2["MONTHLY"] = 1] = "MONTHLY";
            Frequency2[Frequency2["WEEKLY"] = 2] = "WEEKLY";
            Frequency2[Frequency2["DAILY"] = 3] = "DAILY";
            Frequency2[Frequency2["HOURLY"] = 4] = "HOURLY";
            Frequency2[Frequency2["MINUTELY"] = 5] = "MINUTELY";
            Frequency2[Frequency2["SECONDLY"] = 6] = "SECONDLY";
          })(Frequency || (Frequency = {}));
          function freqIsDailyOrGreater(freq) {
            return freq < Frequency.HOURLY;
          }
          ;
          var fromText = function(text, language) {
            if (language === void 0) {
              language = i18n;
            }
            return new RRule(parseText(text, language) || void 0);
          };
          var common = [
            "count",
            "until",
            "interval",
            "byweekday",
            "bymonthday",
            "bymonth"
          ];
          totext.IMPLEMENTED = [];
          totext.IMPLEMENTED[Frequency.HOURLY] = common;
          totext.IMPLEMENTED[Frequency.MINUTELY] = common;
          totext.IMPLEMENTED[Frequency.DAILY] = ["byhour"].concat(common);
          totext.IMPLEMENTED[Frequency.WEEKLY] = common;
          totext.IMPLEMENTED[Frequency.MONTHLY] = common;
          totext.IMPLEMENTED[Frequency.YEARLY] = ["byweekno", "byyearday"].concat(common);
          var toText = function(rrule, gettext, language, dateFormatter) {
            return new totext(rrule, gettext, language, dateFormatter).toString();
          };
          var isFullyConvertible = totext.isFullyConvertible;
          ;
          var Time = (
            /** @class */
            (function() {
              function Time2(hour, minute, second, millisecond) {
                this.hour = hour;
                this.minute = minute;
                this.second = second;
                this.millisecond = millisecond || 0;
              }
              Time2.prototype.getHours = function() {
                return this.hour;
              };
              Time2.prototype.getMinutes = function() {
                return this.minute;
              };
              Time2.prototype.getSeconds = function() {
                return this.second;
              };
              Time2.prototype.getMilliseconds = function() {
                return this.millisecond;
              };
              Time2.prototype.getTime = function() {
                return (this.hour * 60 * 60 + this.minute * 60 + this.second) * 1e3 + this.millisecond;
              };
              return Time2;
            })()
          );
          var DateTime = (
            /** @class */
            (function(_super) {
              __extends(DateTime2, _super);
              function DateTime2(year, month, day, hour, minute, second, millisecond) {
                var _this = _super.call(this, hour, minute, second, millisecond) || this;
                _this.year = year;
                _this.month = month;
                _this.day = day;
                return _this;
              }
              DateTime2.fromDate = function(date) {
                return new this(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.valueOf() % 1e3);
              };
              DateTime2.prototype.getWeekday = function() {
                return getWeekday(new Date(this.getTime()));
              };
              DateTime2.prototype.getTime = function() {
                return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
              };
              DateTime2.prototype.getDay = function() {
                return this.day;
              };
              DateTime2.prototype.getMonth = function() {
                return this.month;
              };
              DateTime2.prototype.getYear = function() {
                return this.year;
              };
              DateTime2.prototype.addYears = function(years) {
                this.year += years;
              };
              DateTime2.prototype.addMonths = function(months) {
                this.month += months;
                if (this.month > 12) {
                  var yearDiv = Math.floor(this.month / 12);
                  var monthMod = pymod(this.month, 12);
                  this.month = monthMod;
                  this.year += yearDiv;
                  if (this.month === 0) {
                    this.month = 12;
                    --this.year;
                  }
                }
              };
              DateTime2.prototype.addWeekly = function(days, wkst) {
                if (wkst > this.getWeekday()) {
                  this.day += -(this.getWeekday() + 1 + (6 - wkst)) + days * 7;
                } else {
                  this.day += -(this.getWeekday() - wkst) + days * 7;
                }
                this.fixDay();
              };
              DateTime2.prototype.addDaily = function(days) {
                this.day += days;
                this.fixDay();
              };
              DateTime2.prototype.addHours = function(hours, filtered, byhour) {
                if (filtered) {
                  this.hour += Math.floor((23 - this.hour) / hours) * hours;
                }
                for (; ; ) {
                  this.hour += hours;
                  var _a = divmod(this.hour, 24), dayDiv = _a.div, hourMod = _a.mod;
                  if (dayDiv) {
                    this.hour = hourMod;
                    this.addDaily(dayDiv);
                  }
                  if (empty(byhour) || includes(byhour, this.hour))
                    break;
                }
              };
              DateTime2.prototype.addMinutes = function(minutes, filtered, byhour, byminute) {
                if (filtered) {
                  this.minute += Math.floor((1439 - (this.hour * 60 + this.minute)) / minutes) * minutes;
                }
                for (; ; ) {
                  this.minute += minutes;
                  var _a = divmod(this.minute, 60), hourDiv = _a.div, minuteMod = _a.mod;
                  if (hourDiv) {
                    this.minute = minuteMod;
                    this.addHours(hourDiv, false, byhour);
                  }
                  if ((empty(byhour) || includes(byhour, this.hour)) && (empty(byminute) || includes(byminute, this.minute))) {
                    break;
                  }
                }
              };
              DateTime2.prototype.addSeconds = function(seconds, filtered, byhour, byminute, bysecond) {
                if (filtered) {
                  this.second += Math.floor((86399 - (this.hour * 3600 + this.minute * 60 + this.second)) / seconds) * seconds;
                }
                for (; ; ) {
                  this.second += seconds;
                  var _a = divmod(this.second, 60), minuteDiv = _a.div, secondMod = _a.mod;
                  if (minuteDiv) {
                    this.second = secondMod;
                    this.addMinutes(minuteDiv, false, byhour, byminute);
                  }
                  if ((empty(byhour) || includes(byhour, this.hour)) && (empty(byminute) || includes(byminute, this.minute)) && (empty(bysecond) || includes(bysecond, this.second))) {
                    break;
                  }
                }
              };
              DateTime2.prototype.fixDay = function() {
                if (this.day <= 28) {
                  return;
                }
                var daysinmonth = monthRange(this.year, this.month - 1)[1];
                if (this.day <= daysinmonth) {
                  return;
                }
                while (this.day > daysinmonth) {
                  this.day -= daysinmonth;
                  ++this.month;
                  if (this.month === 13) {
                    this.month = 1;
                    ++this.year;
                    if (this.year > MAXYEAR) {
                      return;
                    }
                  }
                  daysinmonth = monthRange(this.year, this.month - 1)[1];
                }
              };
              DateTime2.prototype.add = function(options, filtered) {
                var freq = options.freq, interval = options.interval, wkst = options.wkst, byhour = options.byhour, byminute = options.byminute, bysecond = options.bysecond;
                switch (freq) {
                  case Frequency.YEARLY:
                    return this.addYears(interval);
                  case Frequency.MONTHLY:
                    return this.addMonths(interval);
                  case Frequency.WEEKLY:
                    return this.addWeekly(interval, wkst);
                  case Frequency.DAILY:
                    return this.addDaily(interval);
                  case Frequency.HOURLY:
                    return this.addHours(interval, filtered, byhour);
                  case Frequency.MINUTELY:
                    return this.addMinutes(interval, filtered, byhour, byminute);
                  case Frequency.SECONDLY:
                    return this.addSeconds(interval, filtered, byhour, byminute, bysecond);
                }
              };
              return DateTime2;
            })(Time)
          );
          ;
          function initializeOptions(options) {
            var invalid = [];
            var keys = Object.keys(options);
            for (var _i2 = 0, keys_1 = keys; _i2 < keys_1.length; _i2++) {
              var key = keys_1[_i2];
              if (!includes(defaultKeys, key))
                invalid.push(key);
              if (isDate(options[key]) && !isValidDate(options[key])) {
                invalid.push(key);
              }
            }
            if (invalid.length) {
              throw new Error("Invalid options: " + invalid.join(", "));
            }
            return __assign({}, options);
          }
          function parseOptions(options) {
            var opts = __assign(__assign({}, DEFAULT_OPTIONS), initializeOptions(options));
            if (isPresent(opts.byeaster))
              opts.freq = RRule.YEARLY;
            if (!(isPresent(opts.freq) && RRule.FREQUENCIES[opts.freq])) {
              throw new Error("Invalid frequency: ".concat(opts.freq, " ").concat(options.freq));
            }
            if (!opts.dtstart)
              opts.dtstart = new Date((/* @__PURE__ */ new Date()).setMilliseconds(0));
            if (!isPresent(opts.wkst)) {
              opts.wkst = RRule.MO.weekday;
            } else if (isNumber(opts.wkst)) {
            } else {
              opts.wkst = opts.wkst.weekday;
            }
            if (isPresent(opts.bysetpos)) {
              if (isNumber(opts.bysetpos))
                opts.bysetpos = [opts.bysetpos];
              for (var i2 = 0; i2 < opts.bysetpos.length; i2++) {
                var v2 = opts.bysetpos[i2];
                if (v2 === 0 || !(v2 >= -366 && v2 <= 366)) {
                  throw new Error("bysetpos must be between 1 and 366, or between -366 and -1");
                }
              }
            }
            if (!(Boolean(opts.byweekno) || notEmpty(opts.byweekno) || notEmpty(opts.byyearday) || Boolean(opts.bymonthday) || notEmpty(opts.bymonthday) || isPresent(opts.byweekday) || isPresent(opts.byeaster))) {
              switch (opts.freq) {
                case RRule.YEARLY:
                  if (!opts.bymonth)
                    opts.bymonth = opts.dtstart.getUTCMonth() + 1;
                  opts.bymonthday = opts.dtstart.getUTCDate();
                  break;
                case RRule.MONTHLY:
                  opts.bymonthday = opts.dtstart.getUTCDate();
                  break;
                case RRule.WEEKLY:
                  opts.byweekday = [getWeekday(opts.dtstart)];
                  break;
              }
            }
            if (isPresent(opts.bymonth) && !isArray(opts.bymonth)) {
              opts.bymonth = [opts.bymonth];
            }
            if (isPresent(opts.byyearday) && !isArray(opts.byyearday) && isNumber(opts.byyearday)) {
              opts.byyearday = [opts.byyearday];
            }
            if (!isPresent(opts.bymonthday)) {
              opts.bymonthday = [];
              opts.bynmonthday = [];
            } else if (isArray(opts.bymonthday)) {
              var bymonthday = [];
              var bynmonthday = [];
              for (var i2 = 0; i2 < opts.bymonthday.length; i2++) {
                var v2 = opts.bymonthday[i2];
                if (v2 > 0) {
                  bymonthday.push(v2);
                } else if (v2 < 0) {
                  bynmonthday.push(v2);
                }
              }
              opts.bymonthday = bymonthday;
              opts.bynmonthday = bynmonthday;
            } else if (opts.bymonthday < 0) {
              opts.bynmonthday = [opts.bymonthday];
              opts.bymonthday = [];
            } else {
              opts.bynmonthday = [];
              opts.bymonthday = [opts.bymonthday];
            }
            if (isPresent(opts.byweekno) && !isArray(opts.byweekno)) {
              opts.byweekno = [opts.byweekno];
            }
            if (!isPresent(opts.byweekday)) {
              opts.bynweekday = null;
            } else if (isNumber(opts.byweekday)) {
              opts.byweekday = [opts.byweekday];
              opts.bynweekday = null;
            } else if (isWeekdayStr(opts.byweekday)) {
              opts.byweekday = [Weekday.fromStr(opts.byweekday).weekday];
              opts.bynweekday = null;
            } else if (opts.byweekday instanceof Weekday) {
              if (!opts.byweekday.n || opts.freq > RRule.MONTHLY) {
                opts.byweekday = [opts.byweekday.weekday];
                opts.bynweekday = null;
              } else {
                opts.bynweekday = [[opts.byweekday.weekday, opts.byweekday.n]];
                opts.byweekday = null;
              }
            } else {
              var byweekday = [];
              var bynweekday = [];
              for (var i2 = 0; i2 < opts.byweekday.length; i2++) {
                var wday = opts.byweekday[i2];
                if (isNumber(wday)) {
                  byweekday.push(wday);
                  continue;
                } else if (isWeekdayStr(wday)) {
                  byweekday.push(Weekday.fromStr(wday).weekday);
                  continue;
                }
                if (!wday.n || opts.freq > RRule.MONTHLY) {
                  byweekday.push(wday.weekday);
                } else {
                  bynweekday.push([wday.weekday, wday.n]);
                }
              }
              opts.byweekday = notEmpty(byweekday) ? byweekday : null;
              opts.bynweekday = notEmpty(bynweekday) ? bynweekday : null;
            }
            if (!isPresent(opts.byhour)) {
              opts.byhour = opts.freq < RRule.HOURLY ? [opts.dtstart.getUTCHours()] : null;
            } else if (isNumber(opts.byhour)) {
              opts.byhour = [opts.byhour];
            }
            if (!isPresent(opts.byminute)) {
              opts.byminute = opts.freq < RRule.MINUTELY ? [opts.dtstart.getUTCMinutes()] : null;
            } else if (isNumber(opts.byminute)) {
              opts.byminute = [opts.byminute];
            }
            if (!isPresent(opts.bysecond)) {
              opts.bysecond = opts.freq < RRule.SECONDLY ? [opts.dtstart.getUTCSeconds()] : null;
            } else if (isNumber(opts.bysecond)) {
              opts.bysecond = [opts.bysecond];
            }
            return { parsedOptions: opts };
          }
          function buildTimeset(opts) {
            var millisecondModulo = opts.dtstart.getTime() % 1e3;
            if (!freqIsDailyOrGreater(opts.freq)) {
              return [];
            }
            var timeset = [];
            opts.byhour.forEach(function(hour) {
              opts.byminute.forEach(function(minute) {
                opts.bysecond.forEach(function(second) {
                  timeset.push(new Time(hour, minute, second, millisecondModulo));
                });
              });
            });
            return timeset;
          }
          ;
          function parseString(rfcString) {
            var options = rfcString.split("\n").map(parseLine).filter(function(x2) {
              return x2 !== null;
            });
            return __assign(__assign({}, options[0]), options[1]);
          }
          function parseDtstart(line) {
            var options = {};
            var dtstartWithZone = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(line);
            if (!dtstartWithZone) {
              return options;
            }
            var tzid = dtstartWithZone[1], dtstart = dtstartWithZone[2];
            if (tzid) {
              options.tzid = tzid;
            }
            options.dtstart = untilStringToDate(dtstart);
            return options;
          }
          function parseLine(rfcString) {
            rfcString = rfcString.replace(/^\s+|\s+$/, "");
            if (!rfcString.length)
              return null;
            var header = /^([A-Z]+?)[:;]/.exec(rfcString.toUpperCase());
            if (!header) {
              return parseRrule(rfcString);
            }
            var key = header[1];
            switch (key.toUpperCase()) {
              case "RRULE":
              case "EXRULE":
                return parseRrule(rfcString);
              case "DTSTART":
                return parseDtstart(rfcString);
              default:
                throw new Error("Unsupported RFC prop ".concat(key, " in ").concat(rfcString));
            }
          }
          function parseRrule(line) {
            var strippedLine = line.replace(/^RRULE:/i, "");
            var options = parseDtstart(strippedLine);
            var attrs = line.replace(/^(?:RRULE|EXRULE):/i, "").split(";");
            attrs.forEach(function(attr) {
              var _a = attr.split("="), key = _a[0], value = _a[1];
              switch (key.toUpperCase()) {
                case "FREQ":
                  options.freq = Frequency[value.toUpperCase()];
                  break;
                case "WKST":
                  options.wkst = Days[value.toUpperCase()];
                  break;
                case "COUNT":
                case "INTERVAL":
                case "BYSETPOS":
                case "BYMONTH":
                case "BYMONTHDAY":
                case "BYYEARDAY":
                case "BYWEEKNO":
                case "BYHOUR":
                case "BYMINUTE":
                case "BYSECOND":
                  var num = parseNumber(value);
                  var optionKey = key.toLowerCase();
                  options[optionKey] = num;
                  break;
                case "BYWEEKDAY":
                case "BYDAY":
                  options.byweekday = parseWeekday(value);
                  break;
                case "DTSTART":
                case "TZID":
                  var dtstart = parseDtstart(line);
                  options.tzid = dtstart.tzid;
                  options.dtstart = dtstart.dtstart;
                  break;
                case "UNTIL":
                  options.until = untilStringToDate(value);
                  break;
                case "BYEASTER":
                  options.byeaster = Number(value);
                  break;
                default:
                  throw new Error("Unknown RRULE property '" + key + "'");
              }
            });
            return options;
          }
          function parseNumber(value) {
            if (value.indexOf(",") !== -1) {
              var values = value.split(",");
              return values.map(parseIndividualNumber);
            }
            return parseIndividualNumber(value);
          }
          function parseIndividualNumber(value) {
            if (/^[+-]?\d+$/.test(value)) {
              return Number(value);
            }
            return value;
          }
          function parseWeekday(value) {
            var days = value.split(",");
            return days.map(function(day) {
              if (day.length === 2) {
                return Days[day];
              }
              var parts = day.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
              if (!parts || parts.length < 3) {
                throw new SyntaxError("Invalid weekday string: ".concat(day));
              }
              var n2 = Number(parts[1]);
              var wdaypart = parts[2];
              var wday = Days[wdaypart].weekday;
              return new Weekday(wday, n2);
            });
          }
          ;
          var DateWithZone = (
            /** @class */
            (function() {
              function DateWithZone2(date, tzid) {
                if (isNaN(date.getTime())) {
                  throw new RangeError("Invalid date passed to DateWithZone");
                }
                this.date = date;
                this.tzid = tzid;
              }
              Object.defineProperty(DateWithZone2.prototype, "isUTC", {
                get: function() {
                  return !this.tzid || this.tzid.toUpperCase() === "UTC";
                },
                enumerable: false,
                configurable: true
              });
              DateWithZone2.prototype.toString = function() {
                var datestr = timeToUntilString(this.date.getTime(), this.isUTC);
                if (!this.isUTC) {
                  return ";TZID=".concat(this.tzid, ":").concat(datestr);
                }
                return ":".concat(datestr);
              };
              DateWithZone2.prototype.getTime = function() {
                return this.date.getTime();
              };
              DateWithZone2.prototype.rezonedDate = function() {
                if (this.isUTC) {
                  return this.date;
                }
                return dateInTimeZone(this.date, this.tzid);
              };
              return DateWithZone2;
            })()
          );
          ;
          function optionsToString(options) {
            var rrule = [];
            var dtstart = "";
            var keys = Object.keys(options);
            var defaultKeys2 = Object.keys(DEFAULT_OPTIONS);
            for (var i2 = 0; i2 < keys.length; i2++) {
              if (keys[i2] === "tzid")
                continue;
              if (!includes(defaultKeys2, keys[i2]))
                continue;
              var key = keys[i2].toUpperCase();
              var value = options[keys[i2]];
              var outValue = "";
              if (!isPresent(value) || isArray(value) && !value.length)
                continue;
              switch (key) {
                case "FREQ":
                  outValue = RRule.FREQUENCIES[options.freq];
                  break;
                case "WKST":
                  if (isNumber(value)) {
                    outValue = new Weekday(value).toString();
                  } else {
                    outValue = value.toString();
                  }
                  break;
                case "BYWEEKDAY":
                  key = "BYDAY";
                  outValue = toArray(value).map(function(wday) {
                    if (wday instanceof Weekday) {
                      return wday;
                    }
                    if (isArray(wday)) {
                      return new Weekday(wday[0], wday[1]);
                    }
                    return new Weekday(wday);
                  }).toString();
                  break;
                case "DTSTART":
                  dtstart = buildDtstart(value, options.tzid);
                  break;
                case "UNTIL":
                  outValue = timeToUntilString(value, !options.tzid);
                  break;
                default:
                  if (isArray(value)) {
                    var strValues = [];
                    for (var j2 = 0; j2 < value.length; j2++) {
                      strValues[j2] = String(value[j2]);
                    }
                    outValue = strValues.toString();
                  } else {
                    outValue = String(value);
                  }
              }
              if (outValue) {
                rrule.push([key, outValue]);
              }
            }
            var rules = rrule.map(function(_a) {
              var key2 = _a[0], value2 = _a[1];
              return "".concat(key2, "=").concat(value2.toString());
            }).join(";");
            var ruleString = "";
            if (rules !== "") {
              ruleString = "RRULE:".concat(rules);
            }
            return [dtstart, ruleString].filter(function(x2) {
              return !!x2;
            }).join("\n");
          }
          function buildDtstart(dtstart, tzid) {
            if (!dtstart) {
              return "";
            }
            return "DTSTART" + new DateWithZone(new Date(dtstart), tzid).toString();
          }
          ;
          function argsMatch(left, right) {
            if (Array.isArray(left)) {
              if (!Array.isArray(right))
                return false;
              if (left.length !== right.length)
                return false;
              return left.every(function(date, i2) {
                return date.getTime() === right[i2].getTime();
              });
            }
            if (left instanceof Date) {
              return right instanceof Date && left.getTime() === right.getTime();
            }
            return left === right;
          }
          var Cache = (
            /** @class */
            (function() {
              function Cache2() {
                this.all = false;
                this.before = [];
                this.after = [];
                this.between = [];
              }
              Cache2.prototype._cacheAdd = function(what, value, args) {
                if (value) {
                  value = value instanceof Date ? dateutil_clone(value) : cloneDates(value);
                }
                if (what === "all") {
                  this.all = value;
                } else {
                  args._value = value;
                  this[what].push(args);
                }
              };
              Cache2.prototype._cacheGet = function(what, args) {
                var cached = false;
                var argsKeys = args ? Object.keys(args) : [];
                var findCacheDiff = function(item2) {
                  for (var i3 = 0; i3 < argsKeys.length; i3++) {
                    var key = argsKeys[i3];
                    if (!argsMatch(args[key], item2[key])) {
                      return true;
                    }
                  }
                  return false;
                };
                var cachedObject = this[what];
                if (what === "all") {
                  cached = this.all;
                } else if (isArray(cachedObject)) {
                  for (var i2 = 0; i2 < cachedObject.length; i2++) {
                    var item = cachedObject[i2];
                    if (argsKeys.length && findCacheDiff(item))
                      continue;
                    cached = item._value;
                    break;
                  }
                }
                if (!cached && this.all) {
                  var iterResult = new iterresult(what, args);
                  for (var i2 = 0; i2 < this.all.length; i2++) {
                    if (!iterResult.accept(this.all[i2]))
                      break;
                  }
                  cached = iterResult.getValue();
                  this._cacheAdd(what, cached, args);
                }
                return isArray(cached) ? cloneDates(cached) : cached instanceof Date ? dateutil_clone(cached) : cached;
              };
              return Cache2;
            })()
          );
          ;
          var M365MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], repeat(1, 31), true), repeat(2, 28), true), repeat(3, 31), true), repeat(4, 30), true), repeat(5, 31), true), repeat(6, 30), true), repeat(7, 31), true), repeat(8, 31), true), repeat(9, 30), true), repeat(10, 31), true), repeat(11, 30), true), repeat(12, 31), true), repeat(1, 7), true);
          var M366MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], repeat(1, 31), true), repeat(2, 29), true), repeat(3, 31), true), repeat(4, 30), true), repeat(5, 31), true), repeat(6, 30), true), repeat(7, 31), true), repeat(8, 31), true), repeat(9, 30), true), repeat(10, 31), true), repeat(11, 30), true), repeat(12, 31), true), repeat(1, 7), true);
          var M28 = range(1, 29);
          var M29 = range(1, 30);
          var M30 = range(1, 31);
          var M31 = range(1, 32);
          var MDAY366MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], M31, true), M29, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31.slice(0, 7), true);
          var MDAY365MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], M31, true), M28, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31, true), M30, true), M31, true), M30, true), M31, true), M31.slice(0, 7), true);
          var NM28 = range(-28, 0);
          var NM29 = range(-29, 0);
          var NM30 = range(-30, 0);
          var NM31 = range(-31, 0);
          var NMDAY366MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], NM31, true), NM29, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31.slice(0, 7), true);
          var NMDAY365MASK = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], NM31, true), NM28, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31, true), NM30, true), NM31, true), NM30, true), NM31, true), NM31.slice(0, 7), true);
          var M366RANGE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
          var M365RANGE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
          var WDAYMASK = (function() {
            var wdaymask = [];
            for (var i2 = 0; i2 < 55; i2++)
              wdaymask = wdaymask.concat(range(7));
            return wdaymask;
          })();
          ;
          function rebuildYear(year, options) {
            var firstyday = datetime(year, 1, 1);
            var yearlen = isLeapYear(year) ? 366 : 365;
            var nextyearlen = isLeapYear(year + 1) ? 366 : 365;
            var yearordinal = toOrdinal(firstyday);
            var yearweekday = getWeekday(firstyday);
            var result = __assign(__assign({ yearlen, nextyearlen, yearordinal, yearweekday }, baseYearMasks(year)), { wnomask: null });
            if (empty(options.byweekno)) {
              return result;
            }
            result.wnomask = repeat(0, yearlen + 7);
            var firstwkst;
            var wyearlen;
            var no1wkst = firstwkst = pymod(7 - yearweekday + options.wkst, 7);
            if (no1wkst >= 4) {
              no1wkst = 0;
              wyearlen = result.yearlen + pymod(yearweekday - options.wkst, 7);
            } else {
              wyearlen = yearlen - no1wkst;
            }
            var div = Math.floor(wyearlen / 7);
            var mod = pymod(wyearlen, 7);
            var numweeks = Math.floor(div + mod / 4);
            for (var j2 = 0; j2 < options.byweekno.length; j2++) {
              var n2 = options.byweekno[j2];
              if (n2 < 0) {
                n2 += numweeks + 1;
              }
              if (!(n2 > 0 && n2 <= numweeks)) {
                continue;
              }
              var i2 = void 0;
              if (n2 > 1) {
                i2 = no1wkst + (n2 - 1) * 7;
                if (no1wkst !== firstwkst) {
                  i2 -= 7 - firstwkst;
                }
              } else {
                i2 = no1wkst;
              }
              for (var k2 = 0; k2 < 7; k2++) {
                result.wnomask[i2] = 1;
                i2++;
                if (result.wdaymask[i2] === options.wkst)
                  break;
              }
            }
            if (includes(options.byweekno, 1)) {
              var i2 = no1wkst + numweeks * 7;
              if (no1wkst !== firstwkst)
                i2 -= 7 - firstwkst;
              if (i2 < yearlen) {
                for (var j2 = 0; j2 < 7; j2++) {
                  result.wnomask[i2] = 1;
                  i2 += 1;
                  if (result.wdaymask[i2] === options.wkst)
                    break;
                }
              }
            }
            if (no1wkst) {
              var lnumweeks = void 0;
              if (!includes(options.byweekno, -1)) {
                var lyearweekday = getWeekday(datetime(year - 1, 1, 1));
                var lno1wkst = pymod(7 - lyearweekday.valueOf() + options.wkst, 7);
                var lyearlen = isLeapYear(year - 1) ? 366 : 365;
                var weekst = void 0;
                if (lno1wkst >= 4) {
                  lno1wkst = 0;
                  weekst = lyearlen + pymod(lyearweekday - options.wkst, 7);
                } else {
                  weekst = yearlen - no1wkst;
                }
                lnumweeks = Math.floor(52 + pymod(weekst, 7) / 4);
              } else {
                lnumweeks = -1;
              }
              if (includes(options.byweekno, lnumweeks)) {
                for (var i2 = 0; i2 < no1wkst; i2++)
                  result.wnomask[i2] = 1;
              }
            }
            return result;
          }
          function baseYearMasks(year) {
            var yearlen = isLeapYear(year) ? 366 : 365;
            var firstyday = datetime(year, 1, 1);
            var wday = getWeekday(firstyday);
            if (yearlen === 365) {
              return {
                mmask: M365MASK,
                mdaymask: MDAY365MASK,
                nmdaymask: NMDAY365MASK,
                wdaymask: WDAYMASK.slice(wday),
                mrange: M365RANGE
              };
            }
            return {
              mmask: M366MASK,
              mdaymask: MDAY366MASK,
              nmdaymask: NMDAY366MASK,
              wdaymask: WDAYMASK.slice(wday),
              mrange: M366RANGE
            };
          }
          ;
          function rebuildMonth(year, month, yearlen, mrange, wdaymask, options) {
            var result = {
              lastyear: year,
              lastmonth: month,
              nwdaymask: []
            };
            var ranges = [];
            if (options.freq === RRule.YEARLY) {
              if (empty(options.bymonth)) {
                ranges = [[0, yearlen]];
              } else {
                for (var j2 = 0; j2 < options.bymonth.length; j2++) {
                  month = options.bymonth[j2];
                  ranges.push(mrange.slice(month - 1, month + 1));
                }
              }
            } else if (options.freq === RRule.MONTHLY) {
              ranges = [mrange.slice(month - 1, month + 1)];
            }
            if (empty(ranges)) {
              return result;
            }
            result.nwdaymask = repeat(0, yearlen);
            for (var j2 = 0; j2 < ranges.length; j2++) {
              var rang = ranges[j2];
              var first = rang[0];
              var last = rang[1] - 1;
              for (var k2 = 0; k2 < options.bynweekday.length; k2++) {
                var i2 = void 0;
                var _a = options.bynweekday[k2], wday = _a[0], n2 = _a[1];
                if (n2 < 0) {
                  i2 = last + (n2 + 1) * 7;
                  i2 -= pymod(wdaymask[i2] - wday, 7);
                } else {
                  i2 = first + (n2 - 1) * 7;
                  i2 += pymod(7 - wdaymask[i2] + wday, 7);
                }
                if (first <= i2 && i2 <= last)
                  result.nwdaymask[i2] = 1;
              }
            }
            return result;
          }
          ;
          function easter(y2, offset) {
            if (offset === void 0) {
              offset = 0;
            }
            var a2 = y2 % 19;
            var b2 = Math.floor(y2 / 100);
            var c2 = y2 % 100;
            var d2 = Math.floor(b2 / 4);
            var e2 = b2 % 4;
            var f2 = Math.floor((b2 + 8) / 25);
            var g2 = Math.floor((b2 - f2 + 1) / 3);
            var h2 = Math.floor(19 * a2 + b2 - d2 - g2 + 15) % 30;
            var i2 = Math.floor(c2 / 4);
            var k2 = c2 % 4;
            var l2 = Math.floor(32 + 2 * e2 + 2 * i2 - h2 - k2) % 7;
            var m2 = Math.floor((a2 + 11 * h2 + 22 * l2) / 451);
            var month = Math.floor((h2 + l2 - 7 * m2 + 114) / 31);
            var day = (h2 + l2 - 7 * m2 + 114) % 31 + 1;
            var date = Date.UTC(y2, month - 1, day + offset);
            var yearStart = Date.UTC(y2, 0, 1);
            return [Math.ceil((date - yearStart) / (1e3 * 60 * 60 * 24))];
          }
          ;
          var Iterinfo = (
            /** @class */
            (function() {
              function Iterinfo2(options) {
                this.options = options;
              }
              Iterinfo2.prototype.rebuild = function(year, month) {
                var options = this.options;
                if (year !== this.lastyear) {
                  this.yearinfo = rebuildYear(year, options);
                }
                if (notEmpty(options.bynweekday) && (month !== this.lastmonth || year !== this.lastyear)) {
                  var _a = this.yearinfo, yearlen = _a.yearlen, mrange = _a.mrange, wdaymask = _a.wdaymask;
                  this.monthinfo = rebuildMonth(year, month, yearlen, mrange, wdaymask, options);
                }
                if (isPresent(options.byeaster)) {
                  this.eastermask = easter(year, options.byeaster);
                }
              };
              Object.defineProperty(Iterinfo2.prototype, "lastyear", {
                get: function() {
                  return this.monthinfo ? this.monthinfo.lastyear : null;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "lastmonth", {
                get: function() {
                  return this.monthinfo ? this.monthinfo.lastmonth : null;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "yearlen", {
                get: function() {
                  return this.yearinfo.yearlen;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "yearordinal", {
                get: function() {
                  return this.yearinfo.yearordinal;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "mrange", {
                get: function() {
                  return this.yearinfo.mrange;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "wdaymask", {
                get: function() {
                  return this.yearinfo.wdaymask;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "mmask", {
                get: function() {
                  return this.yearinfo.mmask;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "wnomask", {
                get: function() {
                  return this.yearinfo.wnomask;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "nwdaymask", {
                get: function() {
                  return this.monthinfo ? this.monthinfo.nwdaymask : [];
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "nextyearlen", {
                get: function() {
                  return this.yearinfo.nextyearlen;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "mdaymask", {
                get: function() {
                  return this.yearinfo.mdaymask;
                },
                enumerable: false,
                configurable: true
              });
              Object.defineProperty(Iterinfo2.prototype, "nmdaymask", {
                get: function() {
                  return this.yearinfo.nmdaymask;
                },
                enumerable: false,
                configurable: true
              });
              Iterinfo2.prototype.ydayset = function() {
                return [range(this.yearlen), 0, this.yearlen];
              };
              Iterinfo2.prototype.mdayset = function(_2, month) {
                var start = this.mrange[month - 1];
                var end = this.mrange[month];
                var set = repeat(null, this.yearlen);
                for (var i2 = start; i2 < end; i2++)
                  set[i2] = i2;
                return [set, start, end];
              };
              Iterinfo2.prototype.wdayset = function(year, month, day) {
                var set = repeat(null, this.yearlen + 7);
                var i2 = toOrdinal(datetime(year, month, day)) - this.yearordinal;
                var start = i2;
                for (var j2 = 0; j2 < 7; j2++) {
                  set[i2] = i2;
                  ++i2;
                  if (this.wdaymask[i2] === this.options.wkst)
                    break;
                }
                return [set, start, i2];
              };
              Iterinfo2.prototype.ddayset = function(year, month, day) {
                var set = repeat(null, this.yearlen);
                var i2 = toOrdinal(datetime(year, month, day)) - this.yearordinal;
                set[i2] = i2;
                return [set, i2, i2 + 1];
              };
              Iterinfo2.prototype.htimeset = function(hour, _2, second, millisecond) {
                var _this = this;
                var set = [];
                this.options.byminute.forEach(function(minute) {
                  set = set.concat(_this.mtimeset(hour, minute, second, millisecond));
                });
                sort(set);
                return set;
              };
              Iterinfo2.prototype.mtimeset = function(hour, minute, _2, millisecond) {
                var set = this.options.bysecond.map(function(second) {
                  return new Time(hour, minute, second, millisecond);
                });
                sort(set);
                return set;
              };
              Iterinfo2.prototype.stimeset = function(hour, minute, second, millisecond) {
                return [new Time(hour, minute, second, millisecond)];
              };
              Iterinfo2.prototype.getdayset = function(freq) {
                switch (freq) {
                  case Frequency.YEARLY:
                    return this.ydayset.bind(this);
                  case Frequency.MONTHLY:
                    return this.mdayset.bind(this);
                  case Frequency.WEEKLY:
                    return this.wdayset.bind(this);
                  case Frequency.DAILY:
                    return this.ddayset.bind(this);
                  default:
                    return this.ddayset.bind(this);
                }
              };
              Iterinfo2.prototype.gettimeset = function(freq) {
                switch (freq) {
                  case Frequency.HOURLY:
                    return this.htimeset.bind(this);
                  case Frequency.MINUTELY:
                    return this.mtimeset.bind(this);
                  case Frequency.SECONDLY:
                    return this.stimeset.bind(this);
                }
              };
              return Iterinfo2;
            })()
          );
          const iterinfo = Iterinfo;
          ;
          function buildPoslist(bysetpos, timeset, start, end, ii2, dayset) {
            var poslist = [];
            for (var j2 = 0; j2 < bysetpos.length; j2++) {
              var daypos = void 0;
              var timepos = void 0;
              var pos = bysetpos[j2];
              if (pos < 0) {
                daypos = Math.floor(pos / timeset.length);
                timepos = pymod(pos, timeset.length);
              } else {
                daypos = Math.floor((pos - 1) / timeset.length);
                timepos = pymod(pos - 1, timeset.length);
              }
              var tmp = [];
              for (var k2 = start; k2 < end; k2++) {
                var val = dayset[k2];
                if (!isPresent(val))
                  continue;
                tmp.push(val);
              }
              var i2 = void 0;
              if (daypos < 0) {
                i2 = tmp.slice(daypos)[0];
              } else {
                i2 = tmp[daypos];
              }
              var time = timeset[timepos];
              var date = fromOrdinal(ii2.yearordinal + i2);
              var res = combine(date, time);
              if (!includes(poslist, res))
                poslist.push(res);
            }
            sort(poslist);
            return poslist;
          }
          ;
          function iter(iterResult, options) {
            var dtstart = options.dtstart, freq = options.freq, interval = options.interval, until = options.until, bysetpos = options.bysetpos;
            var count = options.count;
            if (count === 0 || interval === 0) {
              return emitResult(iterResult);
            }
            var counterDate = DateTime.fromDate(dtstart);
            var ii2 = new iterinfo(options);
            ii2.rebuild(counterDate.year, counterDate.month);
            var timeset = makeTimeset(ii2, counterDate, options);
            for (; ; ) {
              var _a = ii2.getdayset(freq)(counterDate.year, counterDate.month, counterDate.day), dayset = _a[0], start = _a[1], end = _a[2];
              var filtered = removeFilteredDays(dayset, start, end, ii2, options);
              if (notEmpty(bysetpos)) {
                var poslist = buildPoslist(bysetpos, timeset, start, end, ii2, dayset);
                for (var j2 = 0; j2 < poslist.length; j2++) {
                  var res = poslist[j2];
                  if (until && res > until) {
                    return emitResult(iterResult);
                  }
                  if (res >= dtstart) {
                    var rezonedDate = rezoneIfNeeded(res, options);
                    if (!iterResult.accept(rezonedDate)) {
                      return emitResult(iterResult);
                    }
                    if (count) {
                      --count;
                      if (!count) {
                        return emitResult(iterResult);
                      }
                    }
                  }
                }
              } else {
                for (var j2 = start; j2 < end; j2++) {
                  var currentDay = dayset[j2];
                  if (!isPresent(currentDay)) {
                    continue;
                  }
                  var date = fromOrdinal(ii2.yearordinal + currentDay);
                  for (var k2 = 0; k2 < timeset.length; k2++) {
                    var time = timeset[k2];
                    var res = combine(date, time);
                    if (until && res > until) {
                      return emitResult(iterResult);
                    }
                    if (res >= dtstart) {
                      var rezonedDate = rezoneIfNeeded(res, options);
                      if (!iterResult.accept(rezonedDate)) {
                        return emitResult(iterResult);
                      }
                      if (count) {
                        --count;
                        if (!count) {
                          return emitResult(iterResult);
                        }
                      }
                    }
                  }
                }
              }
              if (options.interval === 0) {
                return emitResult(iterResult);
              }
              counterDate.add(options, filtered);
              if (counterDate.year > MAXYEAR) {
                return emitResult(iterResult);
              }
              if (!freqIsDailyOrGreater(freq)) {
                timeset = ii2.gettimeset(freq)(counterDate.hour, counterDate.minute, counterDate.second, 0);
              }
              ii2.rebuild(counterDate.year, counterDate.month);
            }
          }
          function isFiltered(ii2, currentDay, options) {
            var bymonth = options.bymonth, byweekno = options.byweekno, byweekday = options.byweekday, byeaster = options.byeaster, bymonthday = options.bymonthday, bynmonthday = options.bynmonthday, byyearday = options.byyearday;
            return notEmpty(bymonth) && !includes(bymonth, ii2.mmask[currentDay]) || notEmpty(byweekno) && !ii2.wnomask[currentDay] || notEmpty(byweekday) && !includes(byweekday, ii2.wdaymask[currentDay]) || notEmpty(ii2.nwdaymask) && !ii2.nwdaymask[currentDay] || byeaster !== null && !includes(ii2.eastermask, currentDay) || (notEmpty(bymonthday) || notEmpty(bynmonthday)) && !includes(bymonthday, ii2.mdaymask[currentDay]) && !includes(bynmonthday, ii2.nmdaymask[currentDay]) || notEmpty(byyearday) && (currentDay < ii2.yearlen && !includes(byyearday, currentDay + 1) && !includes(byyearday, -ii2.yearlen + currentDay) || currentDay >= ii2.yearlen && !includes(byyearday, currentDay + 1 - ii2.yearlen) && !includes(byyearday, -ii2.nextyearlen + currentDay - ii2.yearlen));
          }
          function rezoneIfNeeded(date, options) {
            return new DateWithZone(date, options.tzid).rezonedDate();
          }
          function emitResult(iterResult) {
            return iterResult.getValue();
          }
          function removeFilteredDays(dayset, start, end, ii2, options) {
            var filtered = false;
            for (var dayCounter = start; dayCounter < end; dayCounter++) {
              var currentDay = dayset[dayCounter];
              filtered = isFiltered(ii2, currentDay, options);
              if (filtered)
                dayset[currentDay] = null;
            }
            return filtered;
          }
          function makeTimeset(ii2, counterDate, options) {
            var freq = options.freq, byhour = options.byhour, byminute = options.byminute, bysecond = options.bysecond;
            if (freqIsDailyOrGreater(freq)) {
              return buildTimeset(options);
            }
            if (freq >= RRule.HOURLY && notEmpty(byhour) && !includes(byhour, counterDate.hour) || freq >= RRule.MINUTELY && notEmpty(byminute) && !includes(byminute, counterDate.minute) || freq >= RRule.SECONDLY && notEmpty(bysecond) && !includes(bysecond, counterDate.second)) {
              return [];
            }
            return ii2.gettimeset(freq)(counterDate.hour, counterDate.minute, counterDate.second, counterDate.millisecond);
          }
          ;
          var Days = {
            MO: new Weekday(0),
            TU: new Weekday(1),
            WE: new Weekday(2),
            TH: new Weekday(3),
            FR: new Weekday(4),
            SA: new Weekday(5),
            SU: new Weekday(6)
          };
          var DEFAULT_OPTIONS = {
            freq: Frequency.YEARLY,
            dtstart: null,
            interval: 1,
            wkst: Days.MO,
            count: null,
            until: null,
            tzid: null,
            bysetpos: null,
            bymonth: null,
            bymonthday: null,
            bynmonthday: null,
            byyearday: null,
            byweekno: null,
            byweekday: null,
            bynweekday: null,
            byhour: null,
            byminute: null,
            bysecond: null,
            byeaster: null
          };
          var defaultKeys = Object.keys(DEFAULT_OPTIONS);
          var RRule = (
            /** @class */
            (function() {
              function RRule2(options, noCache) {
                if (options === void 0) {
                  options = {};
                }
                if (noCache === void 0) {
                  noCache = false;
                }
                this._cache = noCache ? null : new Cache();
                this.origOptions = initializeOptions(options);
                var parsedOptions = parseOptions(options).parsedOptions;
                this.options = parsedOptions;
              }
              RRule2.parseText = function(text, language) {
                return parseText(text, language);
              };
              RRule2.fromText = function(text, language) {
                return fromText(text, language);
              };
              RRule2.fromString = function(str) {
                return new RRule2(RRule2.parseString(str) || void 0);
              };
              RRule2.prototype._iter = function(iterResult) {
                return iter(iterResult, this.options);
              };
              RRule2.prototype._cacheGet = function(what, args) {
                if (!this._cache)
                  return false;
                return this._cache._cacheGet(what, args);
              };
              RRule2.prototype._cacheAdd = function(what, value, args) {
                if (!this._cache)
                  return;
                return this._cache._cacheAdd(what, value, args);
              };
              RRule2.prototype.all = function(iterator) {
                if (iterator) {
                  return this._iter(new callbackiterresult("all", {}, iterator));
                }
                var result = this._cacheGet("all");
                if (result === false) {
                  result = this._iter(new iterresult("all", {}));
                  this._cacheAdd("all", result);
                }
                return result;
              };
              RRule2.prototype.between = function(after, before, inc, iterator) {
                if (inc === void 0) {
                  inc = false;
                }
                if (!isValidDate(after) || !isValidDate(before)) {
                  throw new Error("Invalid date passed in to RRule.between");
                }
                var args = {
                  before,
                  after,
                  inc
                };
                if (iterator) {
                  return this._iter(new callbackiterresult("between", args, iterator));
                }
                var result = this._cacheGet("between", args);
                if (result === false) {
                  result = this._iter(new iterresult("between", args));
                  this._cacheAdd("between", result, args);
                }
                return result;
              };
              RRule2.prototype.before = function(dt2, inc) {
                if (inc === void 0) {
                  inc = false;
                }
                if (!isValidDate(dt2)) {
                  throw new Error("Invalid date passed in to RRule.before");
                }
                var args = { dt: dt2, inc };
                var result = this._cacheGet("before", args);
                if (result === false) {
                  result = this._iter(new iterresult("before", args));
                  this._cacheAdd("before", result, args);
                }
                return result;
              };
              RRule2.prototype.after = function(dt2, inc) {
                if (inc === void 0) {
                  inc = false;
                }
                if (!isValidDate(dt2)) {
                  throw new Error("Invalid date passed in to RRule.after");
                }
                var args = { dt: dt2, inc };
                var result = this._cacheGet("after", args);
                if (result === false) {
                  result = this._iter(new iterresult("after", args));
                  this._cacheAdd("after", result, args);
                }
                return result;
              };
              RRule2.prototype.count = function() {
                return this.all().length;
              };
              RRule2.prototype.toString = function() {
                return optionsToString(this.origOptions);
              };
              RRule2.prototype.toText = function(gettext, language, dateFormatter) {
                return toText(this, gettext, language, dateFormatter);
              };
              RRule2.prototype.isFullyConvertibleToText = function() {
                return isFullyConvertible(this);
              };
              RRule2.prototype.clone = function() {
                return new RRule2(this.origOptions);
              };
              RRule2.FREQUENCIES = [
                "YEARLY",
                "MONTHLY",
                "WEEKLY",
                "DAILY",
                "HOURLY",
                "MINUTELY",
                "SECONDLY"
              ];
              RRule2.YEARLY = Frequency.YEARLY;
              RRule2.MONTHLY = Frequency.MONTHLY;
              RRule2.WEEKLY = Frequency.WEEKLY;
              RRule2.DAILY = Frequency.DAILY;
              RRule2.HOURLY = Frequency.HOURLY;
              RRule2.MINUTELY = Frequency.MINUTELY;
              RRule2.SECONDLY = Frequency.SECONDLY;
              RRule2.MO = Days.MO;
              RRule2.TU = Days.TU;
              RRule2.WE = Days.WE;
              RRule2.TH = Days.TH;
              RRule2.FR = Days.FR;
              RRule2.SA = Days.SA;
              RRule2.SU = Days.SU;
              RRule2.parseString = parseString;
              RRule2.optionsToString = optionsToString;
              return RRule2;
            })()
          );
          ;
          function iterSet(iterResult, _rrule, _exrule, _rdate, _exdate, tzid) {
            var _exdateHash = {};
            var _accept = iterResult.accept;
            function evalExdate(after, before) {
              _exrule.forEach(function(rrule) {
                rrule.between(after, before, true).forEach(function(date) {
                  _exdateHash[Number(date)] = true;
                });
              });
            }
            _exdate.forEach(function(date) {
              var zonedDate2 = new DateWithZone(date, tzid).rezonedDate();
              _exdateHash[Number(zonedDate2)] = true;
            });
            iterResult.accept = function(date) {
              var dt2 = Number(date);
              if (isNaN(dt2))
                return _accept.call(this, date);
              if (!_exdateHash[dt2]) {
                evalExdate(new Date(dt2 - 1), new Date(dt2 + 1));
                if (!_exdateHash[dt2]) {
                  _exdateHash[dt2] = true;
                  return _accept.call(this, date);
                }
              }
              return true;
            };
            if (iterResult.method === "between") {
              evalExdate(iterResult.args.after, iterResult.args.before);
              iterResult.accept = function(date) {
                var dt2 = Number(date);
                if (!_exdateHash[dt2]) {
                  _exdateHash[dt2] = true;
                  return _accept.call(this, date);
                }
                return true;
              };
            }
            for (var i2 = 0; i2 < _rdate.length; i2++) {
              var zonedDate = new DateWithZone(_rdate[i2], tzid).rezonedDate();
              if (!iterResult.accept(new Date(zonedDate.getTime())))
                break;
            }
            _rrule.forEach(function(rrule) {
              iter(iterResult, rrule.options);
            });
            var res = iterResult._result;
            sort(res);
            switch (iterResult.method) {
              case "all":
              case "between":
                return res;
              case "before":
                return res.length && res[res.length - 1] || null;
              case "after":
              default:
                return res.length && res[0] || null;
            }
          }
          ;
          var rrulestr_DEFAULT_OPTIONS = {
            dtstart: null,
            cache: false,
            unfold: false,
            forceset: false,
            compatible: false,
            tzid: null
          };
          function parseInput(s2, options) {
            var rrulevals = [];
            var rdatevals = [];
            var exrulevals = [];
            var exdatevals = [];
            var parsedDtstart = parseDtstart(s2);
            var dtstart = parsedDtstart.dtstart;
            var tzid = parsedDtstart.tzid;
            var lines = splitIntoLines(s2, options.unfold);
            lines.forEach(function(line) {
              var _a;
              if (!line)
                return;
              var _b = breakDownLine(line), name = _b.name, parms = _b.parms, value = _b.value;
              switch (name.toUpperCase()) {
                case "RRULE":
                  if (parms.length) {
                    throw new Error("unsupported RRULE parm: ".concat(parms.join(",")));
                  }
                  rrulevals.push(parseString(line));
                  break;
                case "RDATE":
                  var _c = (_a = /RDATE(?:;TZID=([^:=]+))?/i.exec(line)) !== null && _a !== void 0 ? _a : [], rdateTzid = _c[1];
                  if (rdateTzid && !tzid) {
                    tzid = rdateTzid;
                  }
                  rdatevals = rdatevals.concat(parseRDate(value, parms));
                  break;
                case "EXRULE":
                  if (parms.length) {
                    throw new Error("unsupported EXRULE parm: ".concat(parms.join(",")));
                  }
                  exrulevals.push(parseString(value));
                  break;
                case "EXDATE":
                  exdatevals = exdatevals.concat(parseRDate(value, parms));
                  break;
                case "DTSTART":
                  break;
                default:
                  throw new Error("unsupported property: " + name);
              }
            });
            return {
              dtstart,
              tzid,
              rrulevals,
              rdatevals,
              exrulevals,
              exdatevals
            };
          }
          function buildRule(s2, options) {
            var _a = parseInput(s2, options), rrulevals = _a.rrulevals, rdatevals = _a.rdatevals, exrulevals = _a.exrulevals, exdatevals = _a.exdatevals, dtstart = _a.dtstart, tzid = _a.tzid;
            var noCache = options.cache === false;
            if (options.compatible) {
              options.forceset = true;
              options.unfold = true;
            }
            if (options.forceset || rrulevals.length > 1 || rdatevals.length || exrulevals.length || exdatevals.length) {
              var rset_1 = new RRuleSet(noCache);
              rset_1.dtstart(dtstart);
              rset_1.tzid(tzid || void 0);
              rrulevals.forEach(function(val2) {
                rset_1.rrule(new RRule(groomRruleOptions(val2, dtstart, tzid), noCache));
              });
              rdatevals.forEach(function(date) {
                rset_1.rdate(date);
              });
              exrulevals.forEach(function(val2) {
                rset_1.exrule(new RRule(groomRruleOptions(val2, dtstart, tzid), noCache));
              });
              exdatevals.forEach(function(date) {
                rset_1.exdate(date);
              });
              if (options.compatible && options.dtstart)
                rset_1.rdate(dtstart);
              return rset_1;
            }
            var val = rrulevals[0] || {};
            return new RRule(groomRruleOptions(val, val.dtstart || options.dtstart || dtstart, val.tzid || options.tzid || tzid), noCache);
          }
          function rrulestr2(s2, options) {
            if (options === void 0) {
              options = {};
            }
            return buildRule(s2, rrulestr_initializeOptions(options));
          }
          function groomRruleOptions(val, dtstart, tzid) {
            return __assign(__assign({}, val), { dtstart, tzid });
          }
          function rrulestr_initializeOptions(options) {
            var invalid = [];
            var keys = Object.keys(options);
            var defaultKeys2 = Object.keys(rrulestr_DEFAULT_OPTIONS);
            keys.forEach(function(key) {
              if (!includes(defaultKeys2, key))
                invalid.push(key);
            });
            if (invalid.length) {
              throw new Error("Invalid options: " + invalid.join(", "));
            }
            return __assign(__assign({}, rrulestr_DEFAULT_OPTIONS), options);
          }
          function extractName(line) {
            if (line.indexOf(":") === -1) {
              return {
                name: "RRULE",
                value: line
              };
            }
            var _a = split(line, ":", 1), name = _a[0], value = _a[1];
            return {
              name,
              value
            };
          }
          function breakDownLine(line) {
            var _a = extractName(line), name = _a.name, value = _a.value;
            var parms = name.split(";");
            if (!parms)
              throw new Error("empty property name");
            return {
              name: parms[0].toUpperCase(),
              parms: parms.slice(1),
              value
            };
          }
          function splitIntoLines(s2, unfold) {
            if (unfold === void 0) {
              unfold = false;
            }
            s2 = s2 && s2.trim();
            if (!s2)
              throw new Error("Invalid empty string");
            if (!unfold) {
              return s2.split(/\s/);
            }
            var lines = s2.split("\n");
            var i2 = 0;
            while (i2 < lines.length) {
              var line = lines[i2] = lines[i2].replace(/\s+$/g, "");
              if (!line) {
                lines.splice(i2, 1);
              } else if (i2 > 0 && line[0] === " ") {
                lines[i2 - 1] += line.slice(1);
                lines.splice(i2, 1);
              } else {
                i2 += 1;
              }
            }
            return lines;
          }
          function validateDateParm(parms) {
            parms.forEach(function(parm) {
              if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(parm)) {
                throw new Error("unsupported RDATE/EXDATE parm: " + parm);
              }
            });
          }
          function parseRDate(rdateval, parms) {
            validateDateParm(parms);
            return rdateval.split(",").map(function(datestr) {
              return untilStringToDate(datestr);
            });
          }
          ;
          function createGetterSetter(fieldName) {
            var _this = this;
            return function(field) {
              if (field !== void 0) {
                _this["_".concat(fieldName)] = field;
              }
              if (_this["_".concat(fieldName)] !== void 0) {
                return _this["_".concat(fieldName)];
              }
              for (var i2 = 0; i2 < _this._rrule.length; i2++) {
                var field_1 = _this._rrule[i2].origOptions[fieldName];
                if (field_1) {
                  return field_1;
                }
              }
            };
          }
          var RRuleSet = (
            /** @class */
            (function(_super) {
              __extends(RRuleSet2, _super);
              function RRuleSet2(noCache) {
                if (noCache === void 0) {
                  noCache = false;
                }
                var _this = _super.call(this, {}, noCache) || this;
                _this.dtstart = createGetterSetter.apply(_this, ["dtstart"]);
                _this.tzid = createGetterSetter.apply(_this, ["tzid"]);
                _this._rrule = [];
                _this._rdate = [];
                _this._exrule = [];
                _this._exdate = [];
                return _this;
              }
              RRuleSet2.prototype._iter = function(iterResult) {
                return iterSet(iterResult, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
              };
              RRuleSet2.prototype.rrule = function(rrule) {
                _addRule(rrule, this._rrule);
              };
              RRuleSet2.prototype.exrule = function(rrule) {
                _addRule(rrule, this._exrule);
              };
              RRuleSet2.prototype.rdate = function(date) {
                _addDate(date, this._rdate);
              };
              RRuleSet2.prototype.exdate = function(date) {
                _addDate(date, this._exdate);
              };
              RRuleSet2.prototype.rrules = function() {
                return this._rrule.map(function(e2) {
                  return rrulestr2(e2.toString());
                });
              };
              RRuleSet2.prototype.exrules = function() {
                return this._exrule.map(function(e2) {
                  return rrulestr2(e2.toString());
                });
              };
              RRuleSet2.prototype.rdates = function() {
                return this._rdate.map(function(e2) {
                  return new Date(e2.getTime());
                });
              };
              RRuleSet2.prototype.exdates = function() {
                return this._exdate.map(function(e2) {
                  return new Date(e2.getTime());
                });
              };
              RRuleSet2.prototype.valueOf = function() {
                var result = [];
                if (!this._rrule.length && this._dtstart) {
                  result = result.concat(optionsToString({ dtstart: this._dtstart }));
                }
                this._rrule.forEach(function(rrule) {
                  result = result.concat(rrule.toString().split("\n"));
                });
                this._exrule.forEach(function(exrule) {
                  result = result.concat(exrule.toString().split("\n").map(function(line) {
                    return line.replace(/^RRULE:/, "EXRULE:");
                  }).filter(function(line) {
                    return !/^DTSTART/.test(line);
                  }));
                });
                if (this._rdate.length) {
                  result.push(rdatesToString("RDATE", this._rdate, this.tzid()));
                }
                if (this._exdate.length) {
                  result.push(rdatesToString("EXDATE", this._exdate, this.tzid()));
                }
                return result;
              };
              RRuleSet2.prototype.toString = function() {
                return this.valueOf().join("\n");
              };
              RRuleSet2.prototype.clone = function() {
                var rrs = new RRuleSet2(!!this._cache);
                this._rrule.forEach(function(rule) {
                  return rrs.rrule(rule.clone());
                });
                this._exrule.forEach(function(rule) {
                  return rrs.exrule(rule.clone());
                });
                this._rdate.forEach(function(date) {
                  return rrs.rdate(new Date(date.getTime()));
                });
                this._exdate.forEach(function(date) {
                  return rrs.exdate(new Date(date.getTime()));
                });
                return rrs;
              };
              return RRuleSet2;
            })(RRule)
          );
          function _addRule(rrule, collection) {
            if (!(rrule instanceof RRule)) {
              throw new TypeError(String(rrule) + " is not RRule instance");
            }
            if (!includes(collection.map(String), String(rrule))) {
              collection.push(rrule);
            }
          }
          function _addDate(date, collection) {
            if (!(date instanceof Date)) {
              throw new TypeError(String(date) + " is not Date instance");
            }
            if (!includes(collection.map(Number), Number(date))) {
              collection.push(date);
              sort(collection);
            }
          }
          function rdatesToString(param, rdates, tzid) {
            var isUTC = !tzid || tzid.toUpperCase() === "UTC";
            var header = isUTC ? "".concat(param, ":") : "".concat(param, ";TZID=").concat(tzid, ":");
            var dateString = rdates.map(function(rdate) {
              return timeToUntilString(rdate.valueOf(), isUTC);
            }).join(",");
            return "".concat(header).concat(dateString);
          }
          ;
          return __webpack_exports__;
        })()
      );
    });
  }
});

// src/worker-entry.ts
import { parentPort, workerData } from "node:worker_threads";

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_2) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k2) => typeof obj[obj[k2]] !== "number");
    const filtered = {};
    for (const k2 of validKeys) {
      filtered[k2] = obj[k2];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e2) {
      return obj[e2];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_2, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t2 = typeof data;
  switch (t2) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i2 = 0;
          while (i2 < issue.path.length) {
            const el = issue.path[i2];
            const terminal = i2 === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i2++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m2) => !!m2).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x2) => !!x2)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s2 of results) {
      if (s2.status === "aborted")
        return INVALID;
      if (s2.status === "dirty")
        status.dirty();
      arrayValue.push(s2.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x2) => x2.status === "aborted";
var isDirty = (x2) => x2.status === "dirty";
var isValid = (x2) => x2.status === "valid";
var isAsync = (x2) => typeof Promise !== "undefined" && x2 instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input2) {
    return getParsedType(input2.data);
  }
  _getOrReturnCtx(input2, ctx) {
    return ctx || {
      common: input2.parent.common,
      data: input2.data,
      parsedType: getParsedType(input2.data),
      schemaErrorMap: this._def.errorMap,
      path: input2.path,
      parent: input2.parent
    };
  }
  _processInputParams(input2) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input2.parent.common,
        data: input2.data,
        parsedType: getParsedType(input2.data),
        schemaErrorMap: this._def.errorMap,
        path: input2.path,
        parent: input2.parent
      }
    };
  }
  _parseSync(input2) {
    const result = this._parse(input2);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input2) {
    const result = this._parse(input2);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input2) {
    if (this._def.coerce) {
      input2.data = String(input2.data);
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input2.data.length < check.value) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input2.data.length > check.value) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input2.data.length > check.value;
        const tooSmall = input2.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input2, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input2.data);
        } catch {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input2.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input2.data = input2.data.trim();
      } else if (check.kind === "includes") {
        if (!input2.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input2.data = input2.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input2.data = input2.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input2.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input2.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input2.data, check.version)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input2.data, check.alg)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input2.data, check.version)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input2.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input2) {
    if (this._def.coerce) {
      input2.data = Number(input2.data);
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input2.data < check.value : input2.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input2.data > check.value : input2.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input2.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input2.data)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input2.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input2) {
    if (this._def.coerce) {
      try {
        input2.data = BigInt(input2.data);
      } catch {
        return this._getInvalidInput(input2);
      }
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input2);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input2.data < check.value : input2.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input2.data > check.value : input2.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input2.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input2.data };
  }
  _getInvalidInput(input2) {
    const ctx = this._getOrReturnCtx(input2);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input2) {
    if (this._def.coerce) {
      input2.data = Boolean(input2.data);
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input2) {
    if (this._def.coerce) {
      input2.data = new Date(input2.data);
    }
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input2.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input2.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input2.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input2, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input2.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input2) {
    return OK(input2.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input2) {
    return OK(input2.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input2) {
    const ctx = this._getOrReturnCtx(input2);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input2.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input2) {
    const { ctx, status } = this._processInputParams(input2);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i2) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i2) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input2);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input2);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a2, b2) {
  const aType = getParsedType(a2);
  const bType = getParsedType(b2);
  if (a2 === b2) {
    return { valid: true, data: a2 };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b2);
    const sharedKeys = util.objectKeys(a2).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a2, ...b2 };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a2[key], b2[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a2.length !== b2.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a2.length; index++) {
      const itemA = a2[index];
      const itemB = b2[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a2 === +b2) {
    return { valid: true, data: a2 };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x2) => !!x2);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i2) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i2)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x2) => !!x2),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x2) => !!x2),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn2 = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me2 = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me2._def.args.parseAsync(args, params).catch((e2) => {
          error.addIssue(makeArgsIssue(args, e2));
          throw error;
        });
        const result = await Reflect.apply(fn2, this, parsedArgs);
        const parsedReturns = await me2._def.returns._def.type.parseAsync(result, params).catch((e2) => {
          error.addIssue(makeReturnsIssue(result, e2));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me2 = this;
      return OK(function(...args) {
        const parsedArgs = me2._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn2, this, parsedArgs.data);
        const parsedReturns = me2._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input2) {
    if (input2.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input2.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input2) {
    if (typeof input2.data !== "string") {
      const ctx = this._getOrReturnCtx(input2);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input2.data)) {
      const ctx = this._getOrReturnCtx(input2);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input2.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input2) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input2);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input2.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input2.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input2);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input2);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input2) {
    const parsedType = this._getType(input2);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input2);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input2.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input2) {
    const { ctx } = this._processInputParams(input2);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input2) {
    const { status, ctx } = this._processInputParams(input2);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a2, b2) {
    return new _ZodPipeline({
      in: a2,
      out: b2,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input2) {
    const result = this._def.innerType._parse(input2);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p2 = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p22 = typeof p2 === "string" ? { message: p2 } : p2;
  return p22;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r2 = check(data);
      if (r2 instanceof Promise) {
        return r2.then((r3) => {
          if (!r3) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r2) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// src/contract.ts
var InstantSchema = external_exports.string().min(1).max(64).regex(
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/,
  "must be an RFC 3339 timestamp with Z or an explicit offset"
);
var LocalDateTimeSchema = external_exports.string().regex(
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
  "must be a local date-time without an offset"
);
var StableIdSchema = external_exports.string().min(1).max(80).regex(/^[A-Za-z0-9._-]+$/, "must use letters, numbers, dot, underscore, or hyphen");
var IntervalInputSchema = external_exports.object({
  id: StableIdSchema.optional(),
  start: InstantSchema,
  end: InstantSchema
}).strict();
var RecurrenceInputSchema = external_exports.object({
  id: StableIdSchema,
  dtstart: LocalDateTimeSchema,
  timeZone: external_exports.string().min(1).max(80),
  rrule: external_exports.string().min(1).max(1024),
  durationSeconds: external_exports.number().int().positive().max(604800),
  maxOccurrences: external_exports.number().int().positive().max(2e3)
}).strict();
var ScheduleInputSchema = external_exports.object({
  id: StableIdSchema,
  intervals: external_exports.array(IntervalInputSchema).max(1e3).optional(),
  recurrences: external_exports.array(RecurrenceInputSchema).max(32).optional()
}).strict().superRefine((value, context) => {
  if ((value.intervals?.length ?? 0) + (value.recurrences?.length ?? 0) === 0) {
    context.addIssue({
      code: external_exports.ZodIssueCode.custom,
      message: "a schedule must contain at least one interval or recurrence"
    });
  }
  const ids = /* @__PURE__ */ new Set();
  for (const [index, interval] of (value.intervals ?? []).entries()) {
    if (!interval.id) continue;
    if (ids.has(interval.id)) {
      context.addIssue({
        code: external_exports.ZodIssueCode.custom,
        path: ["intervals", index, "id"],
        message: "item ids must be unique within a schedule"
      });
    }
    ids.add(interval.id);
  }
  for (const [index, recurrence] of (value.recurrences ?? []).entries()) {
    if (ids.has(recurrence.id)) {
      context.addIssue({
        code: external_exports.ZodIssueCode.custom,
        path: ["recurrences", index, "id"],
        message: "item ids must be unique within a schedule"
      });
    }
    ids.add(recurrence.id);
  }
});
var ScheduleRequestSchema = external_exports.object({
  operation: external_exports.enum(["union", "intersection", "difference", "gaps", "overlaps"]),
  horizon: external_exports.object({
    start: InstantSchema,
    end: InstantSchema
  }).strict(),
  schedules: external_exports.array(ScheduleInputSchema).min(1).max(16),
  maxResultIntervals: external_exports.number().int().positive().max(2e3).default(1e3)
}).strict().superRefine((value, context) => {
  const ids = /* @__PURE__ */ new Set();
  for (const [index, schedule] of value.schedules.entries()) {
    if (ids.has(schedule.id)) {
      context.addIssue({
        code: external_exports.ZodIssueCode.custom,
        path: ["schedules", index, "id"],
        message: "schedule ids must be unique"
      });
    }
    ids.add(schedule.id);
  }
});

// node_modules/@js-temporal/polyfill/dist/index.esm.js
var import_jsbi = __toESM(require_jsbi_cjs(), 1);
var t = import_jsbi.default.BigInt(0);
var n = import_jsbi.default.BigInt(1);
var r = import_jsbi.default.BigInt(2);
var o = import_jsbi.default.BigInt(10);
var i = import_jsbi.default.BigInt(24);
var a = import_jsbi.default.BigInt(60);
var s = import_jsbi.default.BigInt(1e3);
var c = import_jsbi.default.BigInt(1e6);
var d = import_jsbi.default.BigInt(1e9);
var h = import_jsbi.default.multiply(import_jsbi.default.BigInt(3600), d);
var u = import_jsbi.default.multiply(a, d);
var l = import_jsbi.default.multiply(h, i);
function m(t2) {
  return "bigint" == typeof t2 ? import_jsbi.default.BigInt(t2.toString(10)) : t2;
}
function f(n2) {
  return import_jsbi.default.equal(import_jsbi.default.remainder(n2, r), t);
}
function y(n2) {
  return import_jsbi.default.lessThan(n2, t) ? import_jsbi.default.unaryMinus(n2) : n2;
}
function p(t2, n2) {
  return import_jsbi.default.lessThan(t2, n2) ? -1 : import_jsbi.default.greaterThan(t2, n2) ? 1 : 0;
}
function g(t2, n2) {
  return { quotient: import_jsbi.default.divide(t2, n2), remainder: import_jsbi.default.remainder(t2, n2) };
}
var w;
var v;
var b = "slot-epochNanoSeconds";
var D = "slot-iso-date";
var T = "slot-iso-date-time";
var M = "slot-time";
var E = "slot-calendar";
var I = "slot-date-brand";
var C = "slot-year-month-brand";
var O = "slot-month-day-brand";
var $ = "slot-time-zone";
var Y = "slot-years";
var R = "slot-months";
var S = "slot-weeks";
var j = "slot-days";
var k = "slot-hours";
var N = "slot-minutes";
var x = "slot-seconds";
var L = "slot-milliseconds";
var P = "slot-microseconds";
var U = "slot-nanoseconds";
var B = "date";
var Z = "ym";
var F = "md";
var H = "time";
var z = "datetime";
var A = "instant";
var q = "original";
var W = "timezone-canonical";
var _ = "timezone-original";
var J = "calendar-id";
var G = "locale";
var K = "options";
var V = /* @__PURE__ */ new WeakMap();
var X = Symbol.for("@@Temporal__GetSlots");
(w = globalThis)[X] || (w[X] = function(e2) {
  return V.get(e2);
});
var Q = globalThis[X];
var ee = Symbol.for("@@Temporal__CreateSlots");
(v = globalThis)[ee] || (v[ee] = function(e2) {
  V.set(e2, /* @__PURE__ */ Object.create(null));
});
var te = globalThis[ee];
function ne(e2, ...t2) {
  if (!e2 || "object" != typeof e2) return false;
  const n2 = Q(e2);
  return !!n2 && t2.every(((e3) => e3 in n2));
}
function re(e2, t2) {
  const n2 = Q(e2)?.[t2];
  if (void 0 === n2) throw new TypeError(`Missing internal slot ${t2}`);
  return n2;
}
function oe(e2, t2, n2) {
  const r2 = Q(e2);
  if (void 0 === r2) throw new TypeError("Missing slots for the given container");
  if (r2[t2]) throw new TypeError(`${t2} already has set`);
  r2[t2] = n2;
}
var ie = {};
function ae(e2, t2) {
  Object.defineProperty(e2.prototype, Symbol.toStringTag, { value: t2, writable: false, enumerable: false, configurable: true });
  const n2 = Object.getOwnPropertyNames(e2);
  for (let t3 = 0; t3 < n2.length; t3++) {
    const r3 = n2[t3], o2 = Object.getOwnPropertyDescriptor(e2, r3);
    o2.configurable && o2.enumerable && (o2.enumerable = false, Object.defineProperty(e2, r3, o2));
  }
  const r2 = Object.getOwnPropertyNames(e2.prototype);
  for (let t3 = 0; t3 < r2.length; t3++) {
    const n3 = r2[t3], o2 = Object.getOwnPropertyDescriptor(e2.prototype, n3);
    o2.configurable && o2.enumerable && (o2.enumerable = false, Object.defineProperty(e2.prototype, n3, o2));
  }
  se(t2, e2), se(`${t2}.prototype`, e2.prototype);
}
function se(e2, t2) {
  const n2 = `%${e2}%`;
  if (void 0 !== ie[n2]) throw new Error(`intrinsic ${e2} already exists`);
  ie[n2] = t2;
}
function ce(e2) {
  return ie[e2];
}
function de(e2, t2) {
  let n2 = e2;
  if (0 === n2) return { div: n2, mod: n2 };
  const r2 = Math.sign(n2);
  n2 = Math.abs(n2);
  const o2 = Math.trunc(1 + Math.log10(n2));
  if (t2 >= o2) return { div: 0 * r2, mod: r2 * n2 };
  if (0 === t2) return { div: r2 * n2, mod: 0 * r2 };
  const i2 = n2.toPrecision(o2);
  return { div: r2 * Number.parseInt(i2.slice(0, o2 - t2), 10), mod: r2 * Number.parseInt(i2.slice(o2 - t2), 10) };
}
function he(e2, t2, n2) {
  let r2 = e2, o2 = n2;
  if (0 === r2) return o2;
  const i2 = Math.sign(r2) || Math.sign(o2);
  r2 = Math.abs(r2), o2 = Math.abs(o2);
  const a2 = r2.toPrecision(Math.trunc(1 + Math.log10(r2)));
  if (0 === o2) return i2 * Number.parseInt(a2 + "0".repeat(t2), 10);
  const s2 = a2 + o2.toPrecision(Math.trunc(1 + Math.log10(o2))).padStart(t2, "0");
  return i2 * Number.parseInt(s2, 10);
}
function ue(e2, t2) {
  const n2 = "negative" === t2;
  switch (e2) {
    case "ceil":
      return n2 ? "zero" : "infinity";
    case "floor":
      return n2 ? "infinity" : "zero";
    case "expand":
      return "infinity";
    case "trunc":
      return "zero";
    case "halfCeil":
      return n2 ? "half-zero" : "half-infinity";
    case "halfFloor":
      return n2 ? "half-infinity" : "half-zero";
    case "halfExpand":
      return "half-infinity";
    case "halfTrunc":
      return "half-zero";
    case "halfEven":
      return "half-even";
  }
}
function le(e2, t2, n2, r2, o2) {
  return "zero" === o2 ? e2 : "infinity" === o2 ? t2 : n2 < 0 ? e2 : n2 > 0 ? t2 : "half-zero" === o2 ? e2 : "half-infinity" === o2 ? t2 : r2 ? e2 : t2;
}
var TimeDuration = class _TimeDuration {
  constructor(t2) {
    this.totalNs = m(t2), this.sec = import_jsbi.default.toNumber(import_jsbi.default.divide(this.totalNs, d)), this.subsec = import_jsbi.default.toNumber(import_jsbi.default.remainder(this.totalNs, d));
  }
  static validateNew(t2, n2) {
    if (import_jsbi.default.greaterThan(y(t2), _TimeDuration.MAX)) throw new RangeError(`${n2} of duration time units cannot exceed ${_TimeDuration.MAX} s`);
    return new _TimeDuration(t2);
  }
  static fromEpochNsDiff(t2, n2) {
    const r2 = import_jsbi.default.subtract(m(t2), m(n2));
    return new _TimeDuration(r2);
  }
  static fromComponents(t2, n2, r2, o2, i2, a2) {
    const l2 = import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.add(import_jsbi.default.BigInt(a2), import_jsbi.default.multiply(import_jsbi.default.BigInt(i2), s)), import_jsbi.default.multiply(import_jsbi.default.BigInt(o2), c)), import_jsbi.default.multiply(import_jsbi.default.BigInt(r2), d)), import_jsbi.default.multiply(import_jsbi.default.BigInt(n2), u)), import_jsbi.default.multiply(import_jsbi.default.BigInt(t2), h));
    return _TimeDuration.validateNew(l2, "total");
  }
  abs() {
    return new _TimeDuration(y(this.totalNs));
  }
  add(t2) {
    return _TimeDuration.validateNew(import_jsbi.default.add(this.totalNs, t2.totalNs), "sum");
  }
  add24HourDays(t2) {
    return _TimeDuration.validateNew(import_jsbi.default.add(this.totalNs, import_jsbi.default.multiply(import_jsbi.default.BigInt(t2), l)), "sum");
  }
  addToEpochNs(t2) {
    return import_jsbi.default.add(m(t2), this.totalNs);
  }
  cmp(e2) {
    return p(this.totalNs, e2.totalNs);
  }
  divmod(t2) {
    const { quotient: n2, remainder: r2 } = g(this.totalNs, import_jsbi.default.BigInt(t2));
    return { quotient: import_jsbi.default.toNumber(n2), remainder: new _TimeDuration(r2) };
  }
  fdiv(n2) {
    const r2 = m(n2), i2 = import_jsbi.default.BigInt(r2);
    let { quotient: a2, remainder: s2 } = g(this.totalNs, i2);
    const c2 = [];
    let d2;
    const h2 = (import_jsbi.default.lessThan(this.totalNs, t) ? -1 : 1) * Math.sign(import_jsbi.default.toNumber(r2));
    for (; !import_jsbi.default.equal(s2, t) && c2.length < 50; ) s2 = import_jsbi.default.multiply(s2, o), { quotient: d2, remainder: s2 } = g(s2, i2), c2.push(Math.abs(import_jsbi.default.toNumber(d2)));
    return h2 * Number(y(a2).toString() + "." + c2.join(""));
  }
  isZero() {
    return import_jsbi.default.equal(this.totalNs, t);
  }
  round(o2, i2) {
    const a2 = m(o2);
    if (import_jsbi.default.equal(a2, n)) return this;
    const { quotient: s2, remainder: c2 } = g(this.totalNs, a2), d2 = import_jsbi.default.lessThan(this.totalNs, t) ? "negative" : "positive", h2 = import_jsbi.default.multiply(y(s2), a2), u2 = import_jsbi.default.add(h2, a2), l2 = p(y(import_jsbi.default.multiply(c2, r)), a2), w2 = ue(i2, d2), v2 = import_jsbi.default.equal(y(this.totalNs), h2) ? h2 : le(h2, u2, l2, f(s2), w2), b2 = "positive" === d2 ? v2 : import_jsbi.default.unaryMinus(v2);
    return _TimeDuration.validateNew(b2, "rounding");
  }
  sign() {
    return this.cmp(new _TimeDuration(t));
  }
  subtract(t2) {
    return _TimeDuration.validateNew(import_jsbi.default.subtract(this.totalNs, t2.totalNs), "difference");
  }
};
TimeDuration.MAX = import_jsbi.default.BigInt("9007199254740991999999999"), TimeDuration.ZERO = new TimeDuration(t);
var me = /[A-Za-z._][A-Za-z._0-9+-]*/;
var fe = new RegExp(`(?:${/(?:[+-](?:[01][0-9]|2[0-3])(?::?[0-5][0-9])?)/.source}|(?:${me.source})(?:\\/(?:${me.source}))*)`);
var ye = /(?:[+-]\d{6}|\d{4})/;
var pe = /(?:0[1-9]|1[0-2])/;
var ge = /(?:0[1-9]|[12]\d|3[01])/;
var we = new RegExp(`(${ye.source})(?:-(${pe.source})-(${ge.source})|(${pe.source})(${ge.source}))`);
var ve = /(\d{2})(?::(\d{2})(?::(\d{2})(?:[.,](\d{1,9}))?)?|(\d{2})(?:(\d{2})(?:[.,](\d{1,9}))?)?)?/;
var be = /((?:[+-])(?:[01][0-9]|2[0-3])(?::?(?:[0-5][0-9])(?::?(?:[0-5][0-9])(?:[.,](?:\d{1,9}))?)?)?)/;
var De = new RegExp(`([zZ])|${be.source}?`);
var Te = /\[(!)?([a-z_][a-z0-9_-]*)=([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\]/g;
var Me = new RegExp([`^${we.source}`, `(?:(?:[tT]|\\s+)${ve.source}(?:${De.source})?)?`, `(?:\\[!?(${fe.source})\\])?`, `((?:${Te.source})*)$`].join(""));
var Ee = new RegExp([`^[tT]?${ve.source}`, `(?:${De.source})?`, `(?:\\[!?${fe.source}\\])?`, `((?:${Te.source})*)$`].join(""));
var Ie = new RegExp(`^(${ye.source})-?(${pe.source})(?:\\[!?${fe.source}\\])?((?:${Te.source})*)$`);
var Ce = new RegExp(`^(?:--)?(${pe.source})-?(${ge.source})(?:\\[!?${fe.source}\\])?((?:${Te.source})*)$`);
var Oe = /(\d+)(?:[.,](\d{1,9}))?/;
var $e = new RegExp(`(?:${Oe.source}H)?(?:${Oe.source}M)?(?:${Oe.source}S)?`);
var Ye = new RegExp(`^([+-])?P${/(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?/.source}(?:T(?!$)${$e.source})?$`, "i");
var Re = 864e5;
var Se = 1e6 * Re;
var je = 6e10;
var ke = 1e8 * Re;
var Ne = xo(ke);
var xe = import_jsbi.default.unaryMinus(Ne);
var Le = import_jsbi.default.add(import_jsbi.default.subtract(xe, l), n);
var Pe = import_jsbi.default.subtract(import_jsbi.default.add(Ne, l), n);
var Ue = 146097 * Re;
var Be = -271821;
var Ze = 275760;
var Fe = Date.UTC(1847, 0, 1);
var He = ["iso8601", "hebrew", "islamic", "islamic-umalqura", "islamic-tbla", "islamic-civil", "islamic-rgsa", "islamicc", "persian", "ethiopic", "ethioaa", "ethiopic-amete-alem", "coptic", "chinese", "dangi", "roc", "indian", "buddhist", "japanese", "gregory"];
var ze = /* @__PURE__ */ new Set(["ACT", "AET", "AGT", "ART", "AST", "BET", "BST", "CAT", "CNT", "CST", "CTT", "EAT", "ECT", "IET", "IST", "JST", "MIT", "NET", "NST", "PLT", "PNT", "PRT", "PST", "SST", "VST"]);
function Ae(e2) {
  return "object" == typeof e2 && null !== e2 || "function" == typeof e2;
}
function qe(e2) {
  if ("bigint" == typeof e2) throw new TypeError("Cannot convert BigInt to number");
  return Number(e2);
}
function We(e2) {
  if ("symbol" == typeof e2) throw new TypeError("Cannot convert a Symbol value to a String");
  return String(e2);
}
function _e(e2) {
  const t2 = qe(e2);
  if (0 === t2) return 0;
  if (Number.isNaN(t2) || t2 === 1 / 0 || t2 === -1 / 0) throw new RangeError("invalid number value");
  const n2 = Math.trunc(t2);
  return 0 === n2 ? 0 : n2;
}
function Je(e2, t2) {
  const n2 = _e(e2);
  if (n2 <= 0) {
    if (void 0 !== t2) throw new RangeError(`property '${t2}' cannot be a a number less than one`);
    throw new RangeError("Cannot convert a number less than one to a positive integer");
  }
  return n2;
}
function Ge(e2) {
  const t2 = qe(e2);
  if (Number.isNaN(t2)) throw new RangeError("not a number");
  if (t2 === 1 / 0 || t2 === -1 / 0) throw new RangeError("infinity is out of range");
  if (!(function(e3) {
    if ("number" != typeof e3 || Number.isNaN(e3) || e3 === 1 / 0 || e3 === -1 / 0) return false;
    const t3 = Math.abs(e3);
    return Math.floor(t3) === t3;
  })(t2)) throw new RangeError(`unsupported fractional value ${e2}`);
  return 0 === t2 ? 0 : t2;
}
function Ke(e2, t2) {
  return String(e2).padStart(t2, "0");
}
function Ve(e2) {
  if ("string" != typeof e2) throw new TypeError(`expected a string, not ${String(e2)}`);
  return e2;
}
function Xe(e2, t2) {
  if (Ae(e2)) {
    const t3 = e2?.toString();
    if ("string" == typeof t3 || "number" == typeof t3) return t3;
    throw new TypeError("Cannot convert object to primitive value");
  }
  return e2;
}
var Qe = ["era", "eraYear", "year", "month", "monthCode", "day", "hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset", "timeZone"];
var et = { era: We, eraYear: _e, year: _e, month: Je, monthCode: function(e2) {
  const t2 = Ve(Xe(e2));
  if (t2.length < 3 || t2.length > 4 || "M" !== t2[0] || -1 === "0123456789".indexOf(t2[1]) || -1 === "0123456789".indexOf(t2[2]) || t2[1] + t2[2] === "00" && "L" !== t2[3] || "L" !== t2[3] && void 0 !== t2[3]) throw new RangeError(`bad month code ${t2}; must match M01-M99 or M00L-M99L`);
  return t2;
}, day: Je, hour: _e, minute: _e, second: _e, millisecond: _e, microsecond: _e, nanosecond: _e, offset: function(e2) {
  const t2 = Ve(Xe(e2));
  return sr(t2), t2;
}, timeZone: Bn };
var tt = { hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
var nt = [["years", "year", "date"], ["months", "month", "date"], ["weeks", "week", "date"], ["days", "day", "date"], ["hours", "hour", "time"], ["minutes", "minute", "time"], ["seconds", "second", "time"], ["milliseconds", "millisecond", "time"], ["microseconds", "microsecond", "time"], ["nanoseconds", "nanosecond", "time"]];
var rt = Object.fromEntries(nt.map(((e2) => [e2[0], e2[1]])));
var ot = Object.fromEntries(nt.map((([e2, t2]) => [t2, e2])));
var it = nt.map((([, e2]) => e2));
var at = { day: Se, hour: 36e11, minute: 6e10, second: 1e9, millisecond: 1e6, microsecond: 1e3, nanosecond: 1 };
var st = ["days", "hours", "microseconds", "milliseconds", "minutes", "months", "nanoseconds", "seconds", "weeks", "years"];
var ct = Intl.DateTimeFormat;
var dt = /* @__PURE__ */ new Map();
function ht(e2) {
  const t2 = Ao(e2);
  let n2 = dt.get(t2);
  return void 0 === n2 && (n2 = new ct("en-us", { timeZone: t2, hour12: false, era: "short", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }), dt.set(t2, n2)), n2;
}
function ut(e2) {
  return ne(e2, b) && !ne(e2, $, E);
}
function lt(e2) {
  return ne(e2, Y, R, j, k, N, x, L, P, U);
}
function mt(e2) {
  return ne(e2, I);
}
function ft(e2) {
  return ne(e2, M);
}
function yt(e2) {
  return ne(e2, T);
}
function pt(e2) {
  return ne(e2, C);
}
function gt(e2) {
  return ne(e2, O);
}
function wt(e2) {
  return ne(e2, b, $, E);
}
function vt(e2, t2) {
  if (!t2(e2)) throw new TypeError("invalid receiver: method called with the wrong type of this-object");
}
function bt(e2) {
  if (ne(e2, E) || ne(e2, $)) throw new TypeError("with() does not support a calendar or timeZone property");
  if (ft(e2)) throw new TypeError("with() does not accept Temporal.PlainTime, use withPlainTime() instead");
  if (void 0 !== e2.calendar) throw new TypeError("with() does not support a calendar property");
  if (void 0 !== e2.timeZone) throw new TypeError("with() does not support a timeZone property");
}
function Dt(e2, t2) {
  return "never" === t2 || "auto" === t2 && "iso8601" === e2 ? "" : `[${"critical" === t2 ? "!" : ""}u-ca=${e2}]`;
}
function Tt(e2) {
  let t2, n2, r2 = false;
  for (Te.lastIndex = 0; n2 = Te.exec(e2); ) {
    const { 1: o2, 2: i2, 3: a2 } = n2;
    if ("u-ca" === i2) {
      if (void 0 === t2) t2 = a2, r2 = "!" === o2;
      else if ("!" === o2 || r2) throw new RangeError(`Invalid annotations in ${e2}: more than one u-ca present with critical flag`);
    } else if ("!" === o2) throw new RangeError(`Unrecognized annotation: !${i2}=${a2}`);
  }
  return t2;
}
function Mt(e2) {
  const t2 = Me.exec(e2);
  if (!t2) throw new RangeError(`invalid RFC 9557 string: ${e2}`);
  const n2 = Tt(t2[16]);
  let r2 = t2[1];
  if ("-000000" === r2) throw new RangeError(`invalid RFC 9557 string: ${e2}`);
  const o2 = +r2, i2 = +(t2[2] ?? t2[4] ?? 1), a2 = +(t2[3] ?? t2[5] ?? 1), s2 = void 0 !== t2[6], c2 = +(t2[6] ?? 0), d2 = +(t2[7] ?? t2[10] ?? 0);
  let h2 = +(t2[8] ?? t2[11] ?? 0);
  60 === h2 && (h2 = 59);
  const u2 = (t2[9] ?? t2[12] ?? "") + "000000000", l2 = +u2.slice(0, 3), m2 = +u2.slice(3, 6), f2 = +u2.slice(6, 9);
  let y2, p2 = false;
  t2[13] ? (y2 = void 0, p2 = true) : t2[14] && (y2 = t2[14]);
  const g2 = t2[15];
  return Ur(o2, i2, a2, c2, d2, h2, l2, m2, f2), { year: o2, month: i2, day: a2, time: s2 ? { hour: c2, minute: d2, second: h2, millisecond: l2, microsecond: m2, nanosecond: f2 } : "start-of-day", tzAnnotation: g2, offset: y2, z: p2, calendar: n2 };
}
function Et(e2) {
  const t2 = Ee.exec(e2);
  let n2, r2, o2, i2, a2, s2, c2;
  if (t2) {
    c2 = Tt(t2[10]), n2 = +(t2[1] ?? 0), r2 = +(t2[2] ?? t2[5] ?? 0), o2 = +(t2[3] ?? t2[6] ?? 0), 60 === o2 && (o2 = 59);
    const e3 = (t2[4] ?? t2[7] ?? "") + "000000000";
    if (i2 = +e3.slice(0, 3), a2 = +e3.slice(3, 6), s2 = +e3.slice(6, 9), t2[8]) throw new RangeError("Z designator not supported for PlainTime");
  } else {
    let t3, d2;
    if ({ time: t3, z: d2, calendar: c2 } = Mt(e2), "start-of-day" === t3) throw new RangeError(`time is missing in string: ${e2}`);
    if (d2) throw new RangeError("Z designator not supported for PlainTime");
    ({ hour: n2, minute: r2, second: o2, millisecond: i2, microsecond: a2, nanosecond: s2 } = t3);
  }
  if (Pr(n2, r2, o2, i2, a2, s2), /[tT ][0-9][0-9]/.test(e2)) return { hour: n2, minute: r2, second: o2, millisecond: i2, microsecond: a2, nanosecond: s2, calendar: c2 };
  try {
    const { month: t3, day: n3 } = Ct(e2);
    xr(1972, t3, n3);
  } catch {
    try {
      const { year: t3, month: n3 } = It(e2);
      xr(t3, n3, 1);
    } catch {
      return { hour: n2, minute: r2, second: o2, millisecond: i2, microsecond: a2, nanosecond: s2, calendar: c2 };
    }
  }
  throw new RangeError(`invalid RFC 9557 time-only string ${e2}; may need a T prefix`);
}
function It(e2) {
  const t2 = Ie.exec(e2);
  let n2, r2, o2, i2;
  if (t2) {
    o2 = Tt(t2[3]);
    let a2 = t2[1];
    if ("-000000" === a2) throw new RangeError(`invalid RFC 9557 string: ${e2}`);
    if (n2 = +a2, r2 = +t2[2], i2 = 1, void 0 !== o2 && "iso8601" !== o2) throw new RangeError("YYYY-MM format is only valid with iso8601 calendar");
  } else {
    let t3;
    if ({ year: n2, month: r2, calendar: o2, day: i2, z: t3 } = Mt(e2), t3) throw new RangeError("Z designator not supported for PlainYearMonth");
  }
  return { year: n2, month: r2, calendar: o2, referenceISODay: i2 };
}
function Ct(e2) {
  const t2 = Ce.exec(e2);
  let n2, r2, o2, i2;
  if (t2) {
    if (o2 = Tt(t2[3]), n2 = +t2[1], r2 = +t2[2], void 0 !== o2 && "iso8601" !== o2) throw new RangeError("MM-DD format is only valid with iso8601 calendar");
  } else {
    let t3;
    if ({ month: n2, day: r2, calendar: o2, year: i2, z: t3 } = Mt(e2), t3) throw new RangeError("Z designator not supported for PlainMonthDay");
  }
  return { month: n2, day: r2, calendar: o2, referenceISOYear: i2 };
}
var Ot = new RegExp(`^${fe.source}$`, "i");
var $t = new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])?)?/.source}$`);
function Yt(e2) {
  const t2 = Wo.test(e2) ? "Seconds not allowed in offset time zone" : "Invalid time zone";
  throw new RangeError(`${t2}: ${e2}`);
}
function Rt(e2) {
  return Ot.test(e2) || Yt(e2), $t.test(e2) ? { offsetMinutes: sr(e2) / 6e10 } : { tzName: e2 };
}
function St(e2, t2, n2, r2) {
  let o2 = e2, i2 = t2, a2 = n2;
  switch (r2) {
    case "reject":
      xr(o2, i2, a2);
      break;
    case "constrain":
      ({ year: o2, month: i2, day: a2 } = kr(o2, i2, a2));
  }
  return { year: o2, month: i2, day: a2 };
}
function jt(e2, t2, n2, r2, o2, i2, a2) {
  let s2 = e2, c2 = t2, d2 = n2, h2 = r2, u2 = o2, l2 = i2;
  switch (a2) {
    case "reject":
      Pr(s2, c2, d2, h2, u2, l2);
      break;
    case "constrain":
      s2 = jr(s2, 0, 23), c2 = jr(c2, 0, 59), d2 = jr(d2, 0, 59), h2 = jr(h2, 0, 999), u2 = jr(u2, 0, 999), l2 = jr(l2, 0, 999);
  }
  return { hour: s2, minute: c2, second: d2, millisecond: h2, microsecond: u2, nanosecond: l2 };
}
function kt(e2) {
  if (!Ae(e2)) throw new TypeError("invalid duration-like");
  const t2 = { years: void 0, months: void 0, weeks: void 0, days: void 0, hours: void 0, minutes: void 0, seconds: void 0, milliseconds: void 0, microseconds: void 0, nanoseconds: void 0 };
  let n2 = false;
  for (let r2 = 0; r2 < st.length; r2++) {
    const o2 = st[r2], i2 = e2[o2];
    void 0 !== i2 && (n2 = true, t2[o2] = Ge(i2));
  }
  if (!n2) throw new TypeError("invalid duration-like");
  return t2;
}
function Nt({ years: e2, months: t2, weeks: n2, days: r2 }, o2, i2, a2) {
  return { years: e2, months: a2 ?? t2, weeks: i2 ?? n2, days: o2 ?? r2 };
}
function xt(e2, t2) {
  return { isoDate: e2, time: t2 };
}
function Lt(e2) {
  return Ho(e2, "overflow", ["constrain", "reject"], "constrain");
}
function Pt(e2) {
  return Ho(e2, "disambiguation", ["compatible", "earlier", "later", "reject"], "compatible");
}
function Ut(e2, t2) {
  return Ho(e2, "roundingMode", ["ceil", "floor", "expand", "trunc", "halfCeil", "halfFloor", "halfExpand", "halfTrunc", "halfEven"], t2);
}
function Bt(e2, t2) {
  return Ho(e2, "offset", ["prefer", "use", "ignore", "reject"], t2);
}
function Zt(e2) {
  return Ho(e2, "calendarName", ["auto", "always", "never", "critical"], "auto");
}
function Ft(e2) {
  let t2 = e2.roundingIncrement;
  if (void 0 === t2) return 1;
  const n2 = _e(t2);
  if (n2 < 1 || n2 > 1e9) throw new RangeError(`roundingIncrement must be at least 1 and at most 1e9, not ${t2}`);
  return n2;
}
function Ht(e2, t2, n2) {
  const r2 = n2 ? t2 : t2 - 1;
  if (e2 > r2) throw new RangeError(`roundingIncrement must be at least 1 and less than ${r2}, not ${e2}`);
  if (t2 % e2 != 0) throw new RangeError(`Rounding increment must divide evenly into ${t2}`);
}
function zt(e2) {
  const t2 = e2.fractionalSecondDigits;
  if (void 0 === t2) return "auto";
  if ("number" != typeof t2) {
    if ("auto" !== We(t2)) throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t2}`);
    return "auto";
  }
  const n2 = Math.floor(t2);
  if (!Number.isFinite(n2) || n2 < 0 || n2 > 9) throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t2}`);
  return n2;
}
function At(e2, t2) {
  switch (e2) {
    case "minute":
      return { precision: "minute", unit: "minute", increment: 1 };
    case "second":
      return { precision: 0, unit: "second", increment: 1 };
    case "millisecond":
      return { precision: 3, unit: "millisecond", increment: 1 };
    case "microsecond":
      return { precision: 6, unit: "microsecond", increment: 1 };
    case "nanosecond":
      return { precision: 9, unit: "nanosecond", increment: 1 };
  }
  switch (t2) {
    case "auto":
      return { precision: t2, unit: "nanosecond", increment: 1 };
    case 0:
      return { precision: t2, unit: "second", increment: 1 };
    case 1:
    case 2:
    case 3:
      return { precision: t2, unit: "millisecond", increment: 10 ** (3 - t2) };
    case 4:
    case 5:
    case 6:
      return { precision: t2, unit: "microsecond", increment: 10 ** (6 - t2) };
    case 7:
    case 8:
    case 9:
      return { precision: t2, unit: "nanosecond", increment: 10 ** (9 - t2) };
    default:
      throw new RangeError(`fractionalSecondDigits must be 'auto' or 0 through 9, not ${t2}`);
  }
}
var qt = Symbol("~required~");
function Wt(e2, t2, n2, r2, o2 = []) {
  let i2 = [];
  for (let e3 = 0; e3 < nt.length; e3++) {
    const t3 = nt[e3], r3 = t3[1], o3 = t3[2];
    "datetime" !== n2 && n2 !== o3 || i2.push(r3);
  }
  i2 = i2.concat(o2);
  let a2 = r2;
  a2 === qt ? a2 = void 0 : void 0 !== a2 && i2.push(a2);
  let s2 = [];
  s2 = s2.concat(i2);
  for (let e3 = 0; e3 < i2.length; e3++) {
    const t3 = i2[e3], n3 = ot[t3];
    void 0 !== n3 && s2.push(n3);
  }
  let c2 = Ho(e2, t2, s2, a2);
  if (void 0 === c2 && r2 === qt) throw new RangeError(`${t2} is required`);
  return c2 && c2 in rt ? rt[c2] : c2;
}
function _t(e2) {
  const t2 = e2.relativeTo;
  if (void 0 === t2) return {};
  let n2, r2, o2, i2, a2, s2 = "option", c2 = false;
  if (Ae(t2)) {
    if (wt(t2)) return { zonedRelativeTo: t2 };
    if (mt(t2)) return { plainRelativeTo: t2 };
    if (yt(t2)) return { plainRelativeTo: pn(re(t2, T).isoDate, re(t2, E)) };
    o2 = Nn(t2);
    const e3 = tn(o2, t2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset", "timeZone"], []);
    ({ isoDate: n2, time: r2 } = on(o2, e3, "constrain")), { offset: a2, timeZone: i2 } = e3, void 0 === a2 && (s2 = "wall");
  } else {
    let e3, d2, h2, u2, l2;
    if ({ year: h2, month: u2, day: l2, time: r2, calendar: o2, tzAnnotation: e3, offset: a2, z: d2 } = Mt(Ve(t2)), e3) i2 = Bn(e3), d2 ? s2 = "exact" : a2 || (s2 = "wall"), c2 = true;
    else if (d2) throw new RangeError("Z designator not supported for PlainDate relativeTo; either remove the Z or add a bracketed time zone");
    o2 || (o2 = "iso8601"), o2 = zo(o2), n2 = { year: h2, month: u2, day: l2 };
  }
  return void 0 === i2 ? { plainRelativeTo: pn(n2, o2) } : { zonedRelativeTo: $n(mn(n2, r2, s2, "option" === s2 ? sr(a2) : 0, i2, "compatible", "reject", c2), i2, o2) };
}
function Jt(e2) {
  return 0 !== re(e2, Y) ? "year" : 0 !== re(e2, R) ? "month" : 0 !== re(e2, S) ? "week" : 0 !== re(e2, j) ? "day" : 0 !== re(e2, k) ? "hour" : 0 !== re(e2, N) ? "minute" : 0 !== re(e2, x) ? "second" : 0 !== re(e2, L) ? "millisecond" : 0 !== re(e2, P) ? "microsecond" : "nanosecond";
}
function Gt(e2, t2) {
  return it.indexOf(e2) > it.indexOf(t2) ? t2 : e2;
}
function Kt(e2) {
  return "year" === e2 || "month" === e2 || "week" === e2;
}
function Vt(e2) {
  return Kt(e2) || "day" === e2 ? "date" : "time";
}
function Xt(e2) {
  return ce("%calendarImpl%")(e2);
}
function Qt(e2) {
  return ce("%calendarImpl%")(re(e2, E));
}
function en(e2, t2, n2 = "date") {
  const r2 = /* @__PURE__ */ Object.create(null), o2 = Xt(e2).isoToDate(t2, { year: true, monthCode: true, day: true });
  return r2.monthCode = o2.monthCode, "month-day" !== n2 && "date" !== n2 || (r2.day = o2.day), "year-month" !== n2 && "date" !== n2 || (r2.year = o2.year), r2;
}
function tn(e2, t2, n2, r2, o2) {
  const i2 = Xt(e2).extraFields(n2), a2 = n2.concat(r2, i2), s2 = /* @__PURE__ */ Object.create(null);
  let c2 = false;
  a2.sort();
  for (let e3 = 0; e3 < a2.length; e3++) {
    const n3 = a2[e3], r3 = t2[n3];
    if (void 0 !== r3) c2 = true, s2[n3] = (0, et[n3])(r3);
    else if ("partial" !== o2) {
      if (o2.includes(n3)) throw new TypeError(`required property '${n3}' missing or undefined`);
      s2[n3] = tt[n3];
    }
  }
  if ("partial" === o2 && !c2) throw new TypeError("no supported properties found");
  return s2;
}
function nn(e2, t2 = "complete") {
  const n2 = ["hour", "microsecond", "millisecond", "minute", "nanosecond", "second"];
  let r2 = false;
  const o2 = /* @__PURE__ */ Object.create(null);
  for (let i2 = 0; i2 < n2.length; i2++) {
    const a2 = n2[i2], s2 = e2[a2];
    void 0 !== s2 ? (o2[a2] = _e(s2), r2 = true) : "complete" === t2 && (o2[a2] = 0);
  }
  if (!r2) throw new TypeError("invalid time-like");
  return o2;
}
function rn(e2, t2) {
  if (Ae(e2)) {
    if (mt(e2)) return Lt(Zo(t2)), pn(re(e2, D), re(e2, E));
    if (wt(e2)) {
      const n4 = zn(re(e2, $), re(e2, b));
      return Lt(Zo(t2)), pn(n4.isoDate, re(e2, E));
    }
    if (yt(e2)) return Lt(Zo(t2)), pn(re(e2, T).isoDate, re(e2, E));
    const n3 = Nn(e2);
    return pn(Ln(n3, tn(n3, e2, ["year", "month", "monthCode", "day"], [], []), Lt(Zo(t2))), n3);
  }
  let { year: n2, month: r2, day: o2, calendar: i2, z: a2 } = Mt(Ve(e2));
  if (a2) throw new RangeError("Z designator not supported for PlainDate");
  return i2 || (i2 = "iso8601"), i2 = zo(i2), Lt(Zo(t2)), pn({ year: n2, month: r2, day: o2 }, i2);
}
function on(e2, t2, n2) {
  return xt(Ln(e2, t2, n2), jt(t2.hour, t2.minute, t2.second, t2.millisecond, t2.microsecond, t2.nanosecond, n2));
}
function an(e2, t2) {
  let n2, r2, o2;
  if (Ae(e2)) {
    if (yt(e2)) return Lt(Zo(t2)), wn(re(e2, T), re(e2, E));
    if (wt(e2)) {
      const n3 = zn(re(e2, $), re(e2, b));
      return Lt(Zo(t2)), wn(n3, re(e2, E));
    }
    if (mt(e2)) return Lt(Zo(t2)), wn(xt(re(e2, D), { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), re(e2, E));
    o2 = Nn(e2);
    const i2 = tn(o2, e2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"], []), a2 = Lt(Zo(t2));
    ({ isoDate: n2, time: r2 } = on(o2, i2, a2));
  } else {
    let i2, a2, s2, c2;
    if ({ year: a2, month: s2, day: c2, time: r2, calendar: o2, z: i2 } = Mt(Ve(e2)), i2) throw new RangeError("Z designator not supported for PlainDateTime");
    "start-of-day" === r2 && (r2 = { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), Ur(a2, s2, c2, r2.hour, r2.minute, r2.second, r2.millisecond, r2.microsecond, r2.nanosecond), o2 || (o2 = "iso8601"), o2 = zo(o2), Lt(Zo(t2)), n2 = { year: a2, month: s2, day: c2 };
  }
  return wn(xt(n2, r2), o2);
}
function sn(e2) {
  const t2 = ce("%Temporal.Duration%");
  if (lt(e2)) return new t2(re(e2, Y), re(e2, R), re(e2, S), re(e2, j), re(e2, k), re(e2, N), re(e2, x), re(e2, L), re(e2, P), re(e2, U));
  if (!Ae(e2)) return (function(e3) {
    const { years: t3, months: n3, weeks: r3, days: o2, hours: i2, minutes: a2, seconds: s2, milliseconds: c2, microseconds: d2, nanoseconds: h2 } = (function(e4) {
      const t4 = Ye.exec(e4);
      if (!t4) throw new RangeError(`invalid duration: ${e4}`);
      if (t4.every(((e5, t5) => t5 < 2 || void 0 === e5))) throw new RangeError(`invalid duration: ${e4}`);
      const n4 = "-" === t4[1] ? -1 : 1, r4 = void 0 === t4[2] ? 0 : _e(t4[2]) * n4, o3 = void 0 === t4[3] ? 0 : _e(t4[3]) * n4, i3 = void 0 === t4[4] ? 0 : _e(t4[4]) * n4, a3 = void 0 === t4[5] ? 0 : _e(t4[5]) * n4, s3 = void 0 === t4[6] ? 0 : _e(t4[6]) * n4, c3 = t4[7], d3 = t4[8], h3 = t4[9], u2 = t4[10], l2 = t4[11];
      let m2 = 0, f2 = 0, y2 = 0;
      if (void 0 !== c3) {
        if (d3 ?? h3 ?? u2 ?? l2) throw new RangeError("only the smallest unit can be fractional");
        y2 = 3600 * _e((c3 + "000000000").slice(0, 9)) * n4;
      } else if (m2 = void 0 === d3 ? 0 : _e(d3) * n4, void 0 !== h3) {
        if (u2 ?? l2) throw new RangeError("only the smallest unit can be fractional");
        y2 = 60 * _e((h3 + "000000000").slice(0, 9)) * n4;
      } else f2 = void 0 === u2 ? 0 : _e(u2) * n4, void 0 !== l2 && (y2 = _e((l2 + "000000000").slice(0, 9)) * n4);
      const p2 = y2 % 1e3, g2 = Math.trunc(y2 / 1e3) % 1e3, w2 = Math.trunc(y2 / 1e6) % 1e3;
      return f2 += Math.trunc(y2 / 1e9) % 60, m2 += Math.trunc(y2 / 6e10), zr(r4, o3, i3, a3, s3, m2, f2, w2, g2, p2), { years: r4, months: o3, weeks: i3, days: a3, hours: s3, minutes: m2, seconds: f2, milliseconds: w2, microseconds: g2, nanoseconds: p2 };
    })(e3);
    return new (ce("%Temporal.Duration%"))(t3, n3, r3, o2, i2, a2, s2, c2, d2, h2);
  })(Ve(e2));
  const n2 = { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0, microseconds: 0, nanoseconds: 0 };
  let r2 = kt(e2);
  for (let e3 = 0; e3 < st.length; e3++) {
    const t3 = st[e3], o2 = r2[t3];
    void 0 !== o2 && (n2[t3] = o2);
  }
  return new t2(n2.years, n2.months, n2.weeks, n2.days, n2.hours, n2.minutes, n2.seconds, n2.milliseconds, n2.microseconds, n2.nanoseconds);
}
function cn(e2) {
  let t2;
  if (Ae(e2)) {
    if (ut(e2) || wt(e2)) return Cn(re(e2, b));
    t2 = Xe(e2);
  } else t2 = e2;
  const { year: n2, month: r2, day: o2, time: i2, offset: a2, z: s2 } = (function(e3) {
    const t3 = Mt(e3);
    if (!t3.z && !t3.offset) throw new RangeError("Temporal.Instant requires a time zone offset");
    return t3;
  })(Ve(t2)), { hour: c2 = 0, minute: d2 = 0, second: h2 = 0, millisecond: u2 = 0, microsecond: l2 = 0, nanosecond: m2 = 0 } = "start-of-day" === i2 ? {} : i2, f2 = $r(n2, r2, o2, c2, d2, h2, u2, l2, m2 - (s2 ? 0 : sr(a2)));
  return Kr(f2.isoDate), Cn(pr(f2));
}
function dn(e2, t2) {
  if (Ae(e2)) {
    if (gt(e2)) return Lt(Zo(t2)), bn(re(e2, D), re(e2, E));
    let n3;
    return ne(e2, E) ? n3 = re(e2, E) : (n3 = e2.calendar, void 0 === n3 && (n3 = "iso8601"), n3 = kn(n3)), bn(Un(n3, tn(n3, e2, ["year", "month", "monthCode", "day"], [], []), Lt(Zo(t2))), n3);
  }
  let { month: n2, day: r2, referenceISOYear: o2, calendar: i2 } = Ct(Ve(e2));
  if (void 0 === i2 && (i2 = "iso8601"), i2 = zo(i2), Lt(Zo(t2)), "iso8601" === i2) return bn({ year: 1972, month: n2, day: r2 }, i2);
  let a2 = { year: o2, month: n2, day: r2 };
  return Lr(a2), a2 = Un(i2, en(i2, a2, "month-day"), "constrain"), bn(a2, i2);
}
function hn(e2, t2) {
  let n2;
  if (Ae(e2)) {
    if (ft(e2)) return Lt(Zo(t2)), Tn(re(e2, M));
    if (yt(e2)) return Lt(Zo(t2)), Tn(re(e2, T).time);
    if (wt(e2)) {
      const n3 = zn(re(e2, $), re(e2, b));
      return Lt(Zo(t2)), Tn(n3.time);
    }
    const { hour: r2, minute: o2, second: i2, millisecond: a2, microsecond: s2, nanosecond: c2 } = nn(e2);
    n2 = jt(r2, o2, i2, a2, s2, c2, Lt(Zo(t2)));
  } else n2 = Et(Ve(e2)), Lt(Zo(t2));
  return Tn(n2);
}
function un(e2) {
  return void 0 === e2 ? { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 } : re(hn(e2), M);
}
function ln(e2, t2) {
  if (Ae(e2)) {
    if (pt(e2)) return Lt(Zo(t2)), En(re(e2, D), re(e2, E));
    const n3 = Nn(e2);
    return En(Pn(n3, tn(n3, e2, ["year", "month", "monthCode"], [], []), Lt(Zo(t2))), n3);
  }
  let { year: n2, month: r2, referenceISODay: o2, calendar: i2 } = It(Ve(e2));
  void 0 === i2 && (i2 = "iso8601"), i2 = zo(i2), Lt(Zo(t2));
  let a2 = { year: n2, month: r2, day: o2 };
  return Hr(a2), a2 = Pn(i2, en(i2, a2, "year-month"), "constrain"), En(a2, i2);
}
function mn(t2, n2, r2, o2, i2, a2, s2, c2) {
  if ("start-of-day" === n2) return _n(i2, t2);
  const d2 = xt(t2, n2);
  if ("wall" === r2 || "ignore" === s2) return An(i2, d2, a2);
  if ("exact" === r2 || "use" === s2) {
    const e2 = $r(t2.year, t2.month, t2.day, n2.hour, n2.minute, n2.second, n2.millisecond, n2.microsecond, n2.nanosecond - o2);
    Kr(e2.isoDate);
    const r3 = pr(e2);
    return Fr(r3), r3;
  }
  Kr(t2);
  const h2 = pr(d2), u2 = Wn(i2, d2);
  for (let t3 = 0; t3 < u2.length; t3++) {
    const n3 = u2[t3], r3 = import_jsbi.default.toNumber(import_jsbi.default.subtract(h2, n3)), i3 = Eo(r3, 6e10, "halfExpand");
    if (r3 === o2 || c2 && i3 === o2) return n3;
  }
  if ("reject" === s2) {
    const e2 = Hn(o2), t3 = nr(d2, "iso8601", "auto");
    throw new RangeError(`Offset ${e2} is invalid for ${t3} in ${i2}`);
  }
  return qn(u2, i2, d2, a2);
}
function fn(e2, t2) {
  let n2, r2, o2, i2, a2, s2, c2, d2 = false, h2 = "option";
  if (Ae(e2)) {
    if (wt(e2)) {
      const n3 = Zo(t2);
      return Pt(n3), Bt(n3, "reject"), Lt(n3), $n(re(e2, b), re(e2, $), re(e2, E));
    }
    a2 = Nn(e2);
    const d3 = tn(a2, e2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset", "timeZone"], ["timeZone"]);
    ({ offset: i2, timeZone: o2 } = d3), void 0 === i2 && (h2 = "wall");
    const u3 = Zo(t2);
    s2 = Pt(u3), c2 = Bt(u3, "reject");
    const l2 = Lt(u3);
    ({ isoDate: n2, time: r2 } = on(a2, d3, l2));
  } else {
    let u3, l2, m2, f2, y2;
    ({ year: m2, month: f2, day: y2, time: r2, tzAnnotation: u3, offset: i2, z: l2, calendar: a2 } = (function(e3) {
      const t3 = Mt(e3);
      if (!t3.tzAnnotation) throw new RangeError("Temporal.ZonedDateTime requires a time zone ID in brackets");
      return t3;
    })(Ve(e2))), o2 = Bn(u3), l2 ? h2 = "exact" : i2 || (h2 = "wall"), a2 || (a2 = "iso8601"), a2 = zo(a2), d2 = true;
    const p2 = Zo(t2);
    s2 = Pt(p2), c2 = Bt(p2, "reject"), Lt(p2), n2 = { year: m2, month: f2, day: y2 };
  }
  let u2 = 0;
  return "option" === h2 && (u2 = sr(i2)), $n(mn(n2, r2, h2, u2, o2, s2, c2, d2), o2, a2);
}
function yn(e2, t2, n2) {
  Lr(t2), te(e2), oe(e2, D, t2), oe(e2, E, n2), oe(e2, I, true);
}
function pn(e2, t2) {
  const n2 = ce("%Temporal.PlainDate%"), r2 = Object.create(n2.prototype);
  return yn(r2, e2, t2), r2;
}
function gn(e2, t2, n2) {
  Br(t2), te(e2), oe(e2, T, t2), oe(e2, E, n2);
}
function wn(e2, t2) {
  const n2 = ce("%Temporal.PlainDateTime%"), r2 = Object.create(n2.prototype);
  return gn(r2, e2, t2), r2;
}
function vn(e2, t2, n2) {
  Lr(t2), te(e2), oe(e2, D, t2), oe(e2, E, n2), oe(e2, O, true);
}
function bn(e2, t2) {
  const n2 = ce("%Temporal.PlainMonthDay%"), r2 = Object.create(n2.prototype);
  return vn(r2, e2, t2), r2;
}
function Dn(e2, t2) {
  te(e2), oe(e2, M, t2);
}
function Tn(e2) {
  const t2 = ce("%Temporal.PlainTime%"), n2 = Object.create(t2.prototype);
  return Dn(n2, e2), n2;
}
function Mn(e2, t2, n2) {
  Hr(t2), te(e2), oe(e2, D, t2), oe(e2, E, n2), oe(e2, C, true);
}
function En(e2, t2) {
  const n2 = ce("%Temporal.PlainYearMonth%"), r2 = Object.create(n2.prototype);
  return Mn(r2, e2, t2), r2;
}
function In(e2, t2) {
  Fr(t2), te(e2), oe(e2, b, t2);
}
function Cn(e2) {
  const t2 = ce("%Temporal.Instant%"), n2 = Object.create(t2.prototype);
  return In(n2, e2), n2;
}
function On(e2, t2, n2, r2) {
  Fr(t2), te(e2), oe(e2, b, t2), oe(e2, $, n2), oe(e2, E, r2);
}
function $n(e2, t2, n2 = "iso8601") {
  const r2 = ce("%Temporal.ZonedDateTime%"), o2 = Object.create(r2.prototype);
  return On(o2, e2, t2, n2), o2;
}
function Yn(e2) {
  return Qe.filter(((t2) => void 0 !== e2[t2]));
}
function Rn(e2, t2, n2) {
  const r2 = Yn(n2), o2 = Xt(e2).fieldKeysToIgnore(r2), i2 = /* @__PURE__ */ Object.create(null), a2 = Yn(t2);
  for (let e3 = 0; e3 < Qe.length; e3++) {
    let s2;
    const c2 = Qe[e3];
    a2.includes(c2) && !o2.includes(c2) && (s2 = t2[c2]), r2.includes(c2) && (s2 = n2[c2]), void 0 !== s2 && (i2[c2] = s2);
  }
  return i2;
}
function Sn(e2, t2, n2, r2) {
  const o2 = Xt(e2).dateAdd(t2, n2, r2);
  return Lr(o2), o2;
}
function jn(e2, t2, n2, r2) {
  return Xt(e2).dateUntil(t2, n2, r2);
}
function kn(e2) {
  if (Ae(e2) && ne(e2, E)) return re(e2, E);
  const t2 = Ve(e2);
  try {
    return zo(t2);
  } catch {
  }
  let n2;
  try {
    ({ calendar: n2 } = Mt(t2));
  } catch {
    try {
      ({ calendar: n2 } = Et(t2));
    } catch {
      try {
        ({ calendar: n2 } = It(t2));
      } catch {
        ({ calendar: n2 } = Ct(t2));
      }
    }
  }
  return n2 || (n2 = "iso8601"), zo(n2);
}
function Nn(e2) {
  if (ne(e2, E)) return re(e2, E);
  const { calendar: t2 } = e2;
  return void 0 === t2 ? "iso8601" : kn(t2);
}
function xn(e2, t2) {
  return zo(e2) === zo(t2);
}
function Ln(e2, t2, n2) {
  const r2 = Xt(e2);
  r2.resolveFields(t2, "date");
  const o2 = r2.dateToISO(t2, n2);
  return Lr(o2), o2;
}
function Pn(e2, t2, n2) {
  const r2 = Xt(e2);
  r2.resolveFields(t2, "year-month"), t2.day = 1;
  const o2 = r2.dateToISO(t2, n2);
  return Hr(o2), o2;
}
function Un(e2, t2, n2) {
  const r2 = Xt(e2);
  r2.resolveFields(t2, "month-day");
  const o2 = r2.monthDayToISOReferenceDate(t2, n2);
  return Lr(o2), o2;
}
function Bn(e2) {
  if (Ae(e2) && wt(e2)) return re(e2, $);
  const t2 = Ve(e2);
  if ("UTC" === t2) return "UTC";
  const { tzName: n2, offsetMinutes: r2 } = (function(e3) {
    const { tzAnnotation: t3, offset: n3, z: r3 } = (function(e4) {
      if (Ot.test(e4)) return { tzAnnotation: e4, offset: void 0, z: false };
      try {
        const { tzAnnotation: t4, offset: n4, z: r4 } = Mt(e4);
        if (r4 || t4 || n4) return { tzAnnotation: t4, offset: n4, z: r4 };
      } catch {
      }
      Yt(e4);
    })(e3);
    return t3 ? Rt(t3) : r3 ? Rt("UTC") : n3 ? Rt(n3) : void 0;
  })(t2);
  if (void 0 !== r2) return mr(r2);
  const o2 = hr(n2);
  if (!o2) throw new RangeError(`Unrecognized time zone ${n2}`);
  return o2.identifier;
}
function Zn(e2, t2) {
  if (e2 === t2) return true;
  const n2 = Rt(e2).offsetMinutes, r2 = Rt(t2).offsetMinutes;
  if (void 0 === n2 && void 0 === r2) {
    const n3 = hr(t2);
    if (!n3) return false;
    const r3 = hr(e2);
    return !!r3 && r3.primaryIdentifier === n3.primaryIdentifier;
  }
  return n2 === r2;
}
function Fn(e2, t2) {
  const n2 = Rt(e2).offsetMinutes;
  return void 0 !== n2 ? 6e10 * n2 : lr(e2, t2);
}
function Hn(e2) {
  const t2 = e2 < 0 ? "-" : "+", n2 = Math.abs(e2), r2 = Math.floor(n2 / 36e11), o2 = Math.floor(n2 / 6e10) % 60, i2 = Math.floor(n2 / 1e9) % 60, a2 = n2 % 1e9;
  return `${t2}${Vn(r2, o2, i2, a2, 0 === i2 && 0 === a2 ? "minute" : "auto")}`;
}
function zn(e2, t2) {
  const n2 = Fn(e2, t2);
  let { isoDate: { year: r2, month: o2, day: i2 }, time: { hour: a2, minute: s2, second: c2, millisecond: d2, microsecond: h2, nanosecond: u2 } } = gr(t2);
  return $r(r2, o2, i2, a2, s2, c2, d2, h2, u2 + n2);
}
function An(e2, t2, n2) {
  return qn(Wn(e2, t2), e2, t2, n2);
}
function qn(t2, n2, r2, o2) {
  const i2 = t2.length;
  if (1 === i2) return t2[0];
  if (i2) switch (o2) {
    case "compatible":
    case "earlier":
      return t2[0];
    case "later":
      return t2[i2 - 1];
    case "reject":
      throw new RangeError("multiple instants found");
  }
  if ("reject" === o2) throw new RangeError("multiple instants found");
  const a2 = pr(r2), s2 = import_jsbi.default.subtract(a2, l);
  Fr(s2);
  const c2 = Fn(n2, s2), d2 = import_jsbi.default.add(a2, l);
  Fr(d2);
  const h2 = Fn(n2, d2) - c2;
  switch (o2) {
    case "earlier": {
      const e2 = TimeDuration.fromComponents(0, 0, 0, 0, 0, -h2), t3 = fo(r2.time, e2);
      return Wn(n2, xt(Or(r2.isoDate.year, r2.isoDate.month, r2.isoDate.day + t3.deltaDays), t3))[0];
    }
    case "compatible":
    case "later": {
      const e2 = TimeDuration.fromComponents(0, 0, 0, 0, 0, h2), t3 = fo(r2.time, e2), o3 = Wn(n2, xt(Or(r2.isoDate.year, r2.isoDate.month, r2.isoDate.day + t3.deltaDays), t3));
      return o3[o3.length - 1];
    }
  }
}
function Wn(t2, n2) {
  if ("UTC" === t2) return Kr(n2.isoDate), [pr(n2)];
  const r2 = Rt(t2).offsetMinutes;
  if (void 0 !== r2) {
    const e2 = $r(n2.isoDate.year, n2.isoDate.month, n2.isoDate.day, n2.time.hour, n2.time.minute - r2, n2.time.second, n2.time.millisecond, n2.time.microsecond, n2.time.nanosecond);
    Kr(e2.isoDate);
    const t3 = pr(e2);
    return Fr(t3), [t3];
  }
  return Kr(n2.isoDate), (function(t3, n3) {
    let r3 = pr(n3), o2 = import_jsbi.default.subtract(r3, l);
    import_jsbi.default.lessThan(o2, xe) && (o2 = r3);
    let i2 = import_jsbi.default.add(r3, l);
    import_jsbi.default.greaterThan(i2, Ne) && (i2 = r3);
    const a2 = lr(t3, o2), s2 = lr(t3, i2), c2 = (a2 === s2 ? [a2] : [a2, s2]).map(((o3) => {
      const i3 = import_jsbi.default.subtract(r3, import_jsbi.default.BigInt(o3)), a3 = (function(e2, t4) {
        const { epochMilliseconds: n4, time: { millisecond: r4, microsecond: o4, nanosecond: i4 } } = gr(t4), { year: a4, month: s3, day: c3, hour: d2, minute: h2, second: u2 } = br(e2, n4);
        return $r(a4, s3, c3, d2, h2, u2, r4, o4, i4);
      })(t3, i3);
      if (0 === jo(n3, a3)) return Fr(i3), i3;
    }));
    return c2.filter(((e2) => void 0 !== e2));
  })(t2, n2);
}
function _n(t2, n2) {
  const r2 = xt(n2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), o2 = Wn(t2, r2);
  if (o2.length) return o2[0];
  const i2 = pr(r2), a2 = import_jsbi.default.subtract(i2, l);
  return Fr(a2), wr(t2, a2);
}
function Jn(e2) {
  let t2;
  return t2 = e2 < 0 || e2 > 9999 ? (e2 < 0 ? "-" : "+") + Ke(Math.abs(e2), 6) : Ke(e2, 4), t2;
}
function Gn(e2) {
  return Ke(e2, 2);
}
function Kn(e2, t2) {
  let n2;
  if ("auto" === t2) {
    if (0 === e2) return "";
    n2 = Ke(e2, 9).replace(/0+$/, "");
  } else {
    if (0 === t2) return "";
    n2 = Ke(e2, 9).slice(0, t2);
  }
  return `.${n2}`;
}
function Vn(e2, t2, n2, r2, o2) {
  let i2 = `${Gn(e2)}:${Gn(t2)}`;
  return "minute" === o2 || (i2 += `:${Gn(n2)}`, i2 += Kn(r2, o2)), i2;
}
function Xn(e2, t2, n2) {
  let r2 = t2;
  void 0 === r2 && (r2 = "UTC");
  const o2 = re(e2, b), i2 = nr(zn(r2, o2), "iso8601", n2, "never");
  let a2 = "Z";
  return void 0 !== t2 && (a2 = fr(Fn(r2, o2))), `${i2}${a2}`;
}
function Qn(e2, t2) {
  const n2 = re(e2, Y), r2 = re(e2, R), o2 = re(e2, S), i2 = re(e2, j), a2 = re(e2, k), s2 = re(e2, N), c2 = Mr(e2);
  let d2 = "";
  0 !== n2 && (d2 += `${Math.abs(n2)}Y`), 0 !== r2 && (d2 += `${Math.abs(r2)}M`), 0 !== o2 && (d2 += `${Math.abs(o2)}W`), 0 !== i2 && (d2 += `${Math.abs(i2)}D`);
  let h2 = "";
  0 !== a2 && (h2 += `${Math.abs(a2)}H`), 0 !== s2 && (h2 += `${Math.abs(s2)}M`);
  const u2 = TimeDuration.fromComponents(0, 0, re(e2, x), re(e2, L), re(e2, P), re(e2, U));
  u2.isZero() && !["second", "millisecond", "microsecond", "nanosecond"].includes(Jt(e2)) && "auto" === t2 || (h2 += `${Math.abs(u2.sec)}${Kn(Math.abs(u2.subsec), t2)}S`);
  let l2 = `${c2 < 0 ? "-" : ""}P${d2}`;
  return h2 && (l2 = `${l2}T${h2}`), l2;
}
function er(e2, t2 = "auto") {
  const { year: n2, month: r2, day: o2 } = re(e2, D);
  return `${Jn(n2)}-${Gn(r2)}-${Gn(o2)}${Dt(re(e2, E), t2)}`;
}
function tr({ hour: e2, minute: t2, second: n2, millisecond: r2, microsecond: o2, nanosecond: i2 }, a2) {
  return Vn(e2, t2, n2, 1e6 * r2 + 1e3 * o2 + i2, a2);
}
function nr(e2, t2, n2, r2 = "auto") {
  const { isoDate: { year: o2, month: i2, day: a2 }, time: { hour: s2, minute: c2, second: d2, millisecond: h2, microsecond: u2, nanosecond: l2 } } = e2;
  return `${Jn(o2)}-${Gn(i2)}-${Gn(a2)}T${Vn(s2, c2, d2, 1e6 * h2 + 1e3 * u2 + l2, n2)}${Dt(t2, r2)}`;
}
function rr(e2, t2 = "auto") {
  const { year: n2, month: r2, day: o2 } = re(e2, D);
  let i2 = `${Gn(r2)}-${Gn(o2)}`;
  const a2 = re(e2, E);
  "always" !== t2 && "critical" !== t2 && "iso8601" === a2 || (i2 = `${Jn(n2)}-${i2}`);
  const s2 = Dt(a2, t2);
  return s2 && (i2 += s2), i2;
}
function or(e2, t2 = "auto") {
  const { year: n2, month: r2, day: o2 } = re(e2, D);
  let i2 = `${Jn(n2)}-${Gn(r2)}`;
  const a2 = re(e2, E);
  "always" !== t2 && "critical" !== t2 && "iso8601" === a2 || (i2 += `-${Gn(o2)}`);
  const s2 = Dt(a2, t2);
  return s2 && (i2 += s2), i2;
}
function ir(e2, t2, n2 = "auto", r2 = "auto", o2 = "auto", i2 = void 0) {
  let a2 = re(e2, b);
  if (i2) {
    const { unit: e3, increment: t3, roundingMode: n3 } = i2;
    a2 = Io(a2, t3, e3, n3);
  }
  const s2 = re(e2, $), c2 = Fn(s2, a2);
  let d2 = nr(zn(s2, a2), "iso8601", t2, "never");
  return "never" !== o2 && (d2 += fr(c2)), "never" !== r2 && (d2 += `[${"critical" === r2 ? "!" : ""}${s2}]`), d2 += Dt(re(e2, E), n2), d2;
}
function ar(e2) {
  return $t.test(e2);
}
function sr(e2) {
  const t2 = _o.exec(e2);
  if (!t2) throw new RangeError(`invalid time zone offset: ${e2}; must match \xB1HH:MM[:SS.SSSSSSSSS]`);
  return ("-" === t2[1] ? -1 : 1) * (1e9 * (60 * (60 * +t2[2] + +(t2[3] || 0)) + +(t2[4] || 0)) + +((t2[5] || 0) + "000000000").slice(0, 9));
}
var cr;
var dr = Object.assign(/* @__PURE__ */ Object.create(null), { "/": true, "-": true, _: true });
function hr(e2) {
  if (void 0 === cr) {
    const e3 = Intl.supportedValuesOf?.("timeZone");
    if (e3) {
      cr = /* @__PURE__ */ new Map();
      for (let t3 = 0; t3 < e3.length; t3++) {
        const n3 = e3[t3];
        cr.set(Ao(n3), n3);
      }
    } else cr = null;
  }
  const t2 = Ao(e2);
  let n2 = cr?.get(t2);
  if (n2) return { identifier: n2, primaryIdentifier: n2 };
  try {
    n2 = ht(e2).resolvedOptions().timeZone;
  } catch {
    return;
  }
  if ("antarctica/south_pole" === t2 && (n2 = "Antarctica/McMurdo"), ze.has(e2)) throw new RangeError(`${e2} is a legacy time zone identifier from ICU. Use ${n2} instead`);
  const r2 = [...t2].map(((e3, n3) => 0 === n3 || dr[t2[n3 - 1]] ? e3.toUpperCase() : e3)).join("").split("/");
  if (1 === r2.length) return "gb-eire" === t2 ? { identifier: "GB-Eire", primaryIdentifier: n2 } : { identifier: t2.length <= 3 || /[-0-9]/.test(t2) ? t2.toUpperCase() : r2[0], primaryIdentifier: n2 };
  if ("Etc" === r2[0]) return { identifier: `Etc/${["Zulu", "Greenwich", "Universal"].includes(r2[1]) ? r2[1] : r2[1].toUpperCase()}`, primaryIdentifier: n2 };
  if ("Us" === r2[0]) return { identifier: `US/${r2[1]}`, primaryIdentifier: n2 };
  const o2 = /* @__PURE__ */ new Map([["Act", "ACT"], ["Lhi", "LHI"], ["Nsw", "NSW"], ["Dar_Es_Salaam", "Dar_es_Salaam"], ["Port_Of_Spain", "Port_of_Spain"], ["Port-Au-Prince", "Port-au-Prince"], ["Isle_Of_Man", "Isle_of_Man"], ["Comodrivadavia", "ComodRivadavia"], ["Knox_In", "Knox_IN"], ["Dumontdurville", "DumontDUrville"], ["Mcmurdo", "McMurdo"], ["Denoronha", "DeNoronha"], ["Easterisland", "EasterIsland"], ["Bajanorte", "BajaNorte"], ["Bajasur", "BajaSur"]]);
  return r2[1] = o2.get(r2[1]) ?? r2[1], r2.length > 2 && (r2[2] = o2.get(r2[2]) ?? r2[2]), { identifier: r2.join("/"), primaryIdentifier: n2 };
}
function ur(e2, t2) {
  const { year: n2, month: r2, day: o2, hour: i2, minute: a2, second: s2 } = br(e2, t2);
  let c2 = t2 % 1e3;
  return c2 < 0 && (c2 += 1e3), 1e6 * (yr({ isoDate: { year: n2, month: r2, day: o2 }, time: { hour: i2, minute: a2, second: s2, millisecond: c2 } }) - t2);
}
function lr(e2, t2) {
  return ur(e2, No(t2, "floor"));
}
function mr(e2) {
  const t2 = e2 < 0 ? "-" : "+", n2 = Math.abs(e2);
  return `${t2}${Vn(Math.floor(n2 / 60), n2 % 60, 0, 0, "minute")}`;
}
function fr(e2) {
  return mr(Eo(e2, je, "halfExpand") / 6e10);
}
function yr({ isoDate: { year: e2, month: t2, day: n2 }, time: { hour: r2, minute: o2, second: i2, millisecond: a2 } }) {
  const s2 = e2 % 400, c2 = (e2 - s2) / 400, d2 = /* @__PURE__ */ new Date();
  return d2.setUTCHours(r2, o2, i2, a2), d2.setUTCFullYear(s2, t2 - 1, n2), d2.getTime() + Ue * c2;
}
function pr(t2) {
  const n2 = yr(t2), r2 = 1e3 * t2.time.microsecond + t2.time.nanosecond;
  return import_jsbi.default.add(xo(n2), import_jsbi.default.BigInt(r2));
}
function gr(t2) {
  let n2 = No(t2, "trunc"), r2 = import_jsbi.default.toNumber(import_jsbi.default.remainder(t2, c));
  r2 < 0 && (r2 += 1e6, n2 -= 1);
  const o2 = Math.floor(r2 / 1e3) % 1e3, i2 = r2 % 1e3, a2 = new Date(n2);
  return { epochMilliseconds: n2, isoDate: { year: a2.getUTCFullYear(), month: a2.getUTCMonth() + 1, day: a2.getUTCDate() }, time: { hour: a2.getUTCHours(), minute: a2.getUTCMinutes(), second: a2.getUTCSeconds(), millisecond: a2.getUTCMilliseconds(), microsecond: o2, nanosecond: i2 } };
}
function wr(e2, t2) {
  if ("UTC" === e2) return null;
  const n2 = No(t2, "floor");
  if (n2 < Fe) return wr(e2, xo(Fe));
  const r2 = Date.now(), o2 = Math.max(n2, r2) + 366 * Re * 3;
  let i2 = n2, a2 = ur(e2, i2), s2 = i2, c2 = a2;
  for (; a2 === c2 && i2 < o2; ) {
    if (s2 = i2 + 2 * Re * 7, s2 > ke) return null;
    c2 = ur(e2, s2), a2 === c2 && (i2 = s2);
  }
  return a2 === c2 ? null : xo(Jo(((t3) => ur(e2, t3)), i2, s2, a2, c2));
}
function vr(t2, n2) {
  if ("UTC" === t2) return null;
  const r2 = No(n2, "ceil"), o2 = Date.now(), i2 = o2 + 366 * Re * 3;
  if (r2 > i2) {
    const n3 = vr(t2, xo(i2));
    if (null === n3 || import_jsbi.default.lessThan(n3, xo(o2))) return n3;
  }
  if ("Africa/Casablanca" === t2 || "Africa/El_Aaiun" === t2) {
    const e2 = Date.UTC(2088, 0, 1);
    if (e2 < r2) return vr(t2, xo(e2));
  }
  let a2 = r2 - 1;
  if (a2 < Fe) return null;
  let s2 = ur(t2, a2), c2 = a2, d2 = s2;
  for (; s2 === d2 && a2 > Fe; ) {
    if (c2 = a2 - 2 * Re * 7, c2 < Fe) return null;
    d2 = ur(t2, c2), s2 === d2 && (a2 = c2);
  }
  return s2 === d2 ? null : xo(Jo(((e2) => ur(t2, e2)), c2, a2, d2, s2));
}
function br(e2, t2) {
  return (function(e3) {
    const t3 = e3.split(/[^\w]+/);
    if (7 !== t3.length) throw new RangeError(`expected 7 parts in "${e3}`);
    const n2 = +t3[0], r2 = +t3[1];
    let o2 = +t3[2];
    const i2 = t3[3];
    if ("b" === i2[0] || "B" === i2[0]) o2 = 1 - o2;
    else if ("a" !== i2[0] && "A" !== i2[0]) throw new RangeError(`Unknown era ${i2} in "${e3}`);
    const a2 = "24" === t3[4] ? 0 : +t3[4], s2 = +t3[5], c2 = +t3[6];
    if (!(Number.isFinite(o2) && Number.isFinite(n2) && Number.isFinite(r2) && Number.isFinite(a2) && Number.isFinite(s2) && Number.isFinite(c2))) throw new RangeError(`Invalid number in "${e3}`);
    return { year: o2, month: n2, day: r2, hour: a2, minute: s2, second: c2 };
  })(ht(e2).format(t2));
}
function Dr(e2) {
  return void 0 !== e2 && !(e2 % 4 != 0 || e2 % 100 == 0 && e2 % 400 != 0);
}
function Tr(e2, t2) {
  return { standard: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], leapyear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] }[Dr(e2) ? "leapyear" : "standard"][t2 - 1];
}
function Mr(e2) {
  const t2 = [re(e2, Y), re(e2, R), re(e2, S), re(e2, j), re(e2, k), re(e2, N), re(e2, x), re(e2, L), re(e2, P), re(e2, U)];
  for (let e3 = 0; e3 < t2.length; e3++) {
    const n2 = t2[e3];
    if (0 !== n2) return n2 < 0 ? -1 : 1;
  }
  return 0;
}
function Er(e2) {
  const t2 = ["years", "months", "weeks", "days"];
  for (let n2 = 0; n2 < t2.length; n2++) {
    const r2 = e2[t2[n2]];
    if (0 !== r2) return r2 < 0 ? -1 : 1;
  }
  return 0;
}
function Ir(e2) {
  const t2 = Er(e2.date);
  return 0 !== t2 ? t2 : e2.time.sign();
}
function Cr(e2, t2) {
  let n2 = e2, r2 = t2;
  if (!Number.isFinite(n2) || !Number.isFinite(r2)) throw new RangeError("infinity is out of range");
  return r2 -= 1, n2 += Math.floor(r2 / 12), r2 %= 12, r2 < 0 && (r2 += 12), r2 += 1, { year: n2, month: r2 };
}
function Or(e2, t2, n2) {
  let r2 = e2, o2 = t2, i2 = n2;
  if (!Number.isFinite(i2)) throw new RangeError("infinity is out of range");
  ({ year: r2, month: o2 } = Cr(r2, o2));
  const a2 = 146097;
  if (Math.abs(i2) > a2) {
    const e3 = Math.trunc(i2 / a2);
    r2 += 400 * e3, i2 -= e3 * a2;
  }
  let s2 = 0, c2 = o2 > 2 ? r2 : r2 - 1;
  for (; s2 = Dr(c2) ? 366 : 365, i2 < -s2; ) r2 -= 1, c2 -= 1, i2 += s2;
  for (c2 += 1; s2 = Dr(c2) ? 366 : 365, i2 > s2; ) r2 += 1, c2 += 1, i2 -= s2;
  for (; i2 < 1; ) ({ year: r2, month: o2 } = Cr(r2, o2 - 1)), i2 += Tr(r2, o2);
  for (; i2 > Tr(r2, o2); ) i2 -= Tr(r2, o2), { year: r2, month: o2 } = Cr(r2, o2 + 1);
  return { year: r2, month: o2, day: i2 };
}
function $r(e2, t2, n2, r2, o2, i2, a2, s2, c2) {
  const d2 = Yr(r2, o2, i2, a2, s2, c2);
  return xt(Or(e2, t2, n2 + d2.deltaDays), d2);
}
function Yr(e2, t2, n2, r2, o2, i2) {
  let a2, s2 = e2, c2 = t2, d2 = n2, h2 = r2, u2 = o2, l2 = i2;
  ({ div: a2, mod: l2 } = de(l2, 3)), u2 += a2, l2 < 0 && (u2 -= 1, l2 += 1e3), { div: a2, mod: u2 } = de(u2, 3), h2 += a2, u2 < 0 && (h2 -= 1, u2 += 1e3), d2 += Math.trunc(h2 / 1e3), h2 %= 1e3, h2 < 0 && (d2 -= 1, h2 += 1e3), c2 += Math.trunc(d2 / 60), d2 %= 60, d2 < 0 && (c2 -= 1, d2 += 60), s2 += Math.trunc(c2 / 60), c2 %= 60, c2 < 0 && (s2 -= 1, c2 += 60);
  let m2 = Math.trunc(s2 / 24);
  return s2 %= 24, s2 < 0 && (m2 -= 1, s2 += 24), m2 += 0, s2 += 0, c2 += 0, d2 += 0, h2 += 0, u2 += 0, l2 += 0, { deltaDays: m2, hour: s2, minute: c2, second: d2, millisecond: h2, microsecond: u2, nanosecond: l2 };
}
function Rr(e2, t2) {
  const n2 = Nt(e2, 0);
  if (0 === Er(n2)) return e2.days;
  const r2 = re(t2, D), o2 = Sn(re(t2, E), r2, n2, "constrain"), i2 = Gr(r2.year, r2.month - 1, r2.day), a2 = Gr(o2.year, o2.month - 1, o2.day) - i2;
  return e2.days + a2;
}
function Sr(e2) {
  return new (ce("%Temporal.Duration%"))(-re(e2, Y), -re(e2, R), -re(e2, S), -re(e2, j), -re(e2, k), -re(e2, N), -re(e2, x), -re(e2, L), -re(e2, P), -re(e2, U));
}
function jr(e2, t2, n2) {
  return Math.min(n2, Math.max(t2, e2));
}
function kr(e2, t2, n2) {
  const r2 = jr(t2, 1, 12);
  return { year: e2, month: r2, day: jr(n2, 1, Tr(e2, r2)) };
}
function Nr(e2, t2, n2) {
  if (e2 < t2 || e2 > n2) throw new RangeError(`value out of range: ${t2} <= ${e2} <= ${n2}`);
}
function xr(e2, t2, n2) {
  Nr(t2, 1, 12), Nr(n2, 1, Tr(e2, t2));
}
function Lr(e2) {
  Br(xt(e2, { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }));
}
function Pr(e2, t2, n2, r2, o2, i2) {
  Nr(e2, 0, 23), Nr(t2, 0, 59), Nr(n2, 0, 59), Nr(r2, 0, 999), Nr(o2, 0, 999), Nr(i2, 0, 999);
}
function Ur(e2, t2, n2, r2, o2, i2, a2, s2, c2) {
  xr(e2, t2, n2), Pr(r2, o2, i2, a2, s2, c2);
}
function Br(t2) {
  const n2 = pr(t2);
  (import_jsbi.default.lessThan(n2, Le) || import_jsbi.default.greaterThan(n2, Pe)) && Fr(n2);
}
function Zr(e2) {
  pr(e2);
}
function Fr(t2) {
  if (import_jsbi.default.lessThan(t2, xe) || import_jsbi.default.greaterThan(t2, Ne)) throw new RangeError("date/time value is outside of supported range");
}
function Hr({ year: e2, month: t2 }) {
  Nr(e2, Be, Ze), e2 === Be ? Nr(t2, 4, 12) : e2 === Ze && Nr(t2, 1, 9);
}
function zr(e2, t2, n2, r2, o2, i2, a2, s2, c2, d2) {
  let h2 = 0;
  const u2 = [e2, t2, n2, r2, o2, i2, a2, s2, c2, d2];
  for (let e3 = 0; e3 < u2.length; e3++) {
    const t3 = u2[e3];
    if (t3 === 1 / 0 || t3 === -1 / 0) throw new RangeError("infinite values not allowed as duration fields");
    if (0 !== t3) {
      const e4 = t3 < 0 ? -1 : 1;
      if (0 !== h2 && e4 !== h2) throw new RangeError("mixed-sign values not allowed as duration fields");
      h2 = e4;
    }
  }
  if (Math.abs(e2) >= 2 ** 32 || Math.abs(t2) >= 2 ** 32 || Math.abs(n2) >= 2 ** 32) throw new RangeError("years, months, and weeks must be < 2\xB3\xB2");
  const l2 = de(s2, 3), m2 = de(c2, 6), f2 = de(d2, 9), y2 = de(1e6 * l2.mod + 1e3 * m2.mod + f2.mod, 9).div, p2 = 86400 * r2 + 3600 * o2 + 60 * i2 + a2 + l2.div + m2.div + f2.div + y2;
  if (!Number.isSafeInteger(p2)) throw new RangeError("total of duration time units cannot exceed 9007199254740991.999999999 s");
}
function Ar(e2) {
  return { date: { years: re(e2, Y), months: re(e2, R), weeks: re(e2, S), days: re(e2, j) }, time: TimeDuration.fromComponents(re(e2, k), re(e2, N), re(e2, x), re(e2, L), re(e2, P), re(e2, U)) };
}
function qr(e2) {
  const t2 = TimeDuration.fromComponents(re(e2, k), re(e2, N), re(e2, x), re(e2, L), re(e2, P), re(e2, U)).add24HourDays(re(e2, j));
  return { date: { years: re(e2, Y), months: re(e2, R), weeks: re(e2, S), days: 0 }, time: t2 };
}
function Wr(e2) {
  const t2 = qr(e2), n2 = Math.trunc(t2.time.sec / 86400);
  return zr(t2.date.years, t2.date.months, t2.date.weeks, n2, 0, 0, 0, 0, 0, 0), { ...t2.date, days: n2 };
}
function _r(e2, t2) {
  const n2 = e2.time.sign();
  let r2 = e2.time.abs().subsec, o2 = 0, i2 = 0, a2 = e2.time.abs().sec, s2 = 0, c2 = 0, d2 = 0;
  switch (t2) {
    case "year":
    case "month":
    case "week":
    case "day":
      o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3, s2 = Math.trunc(a2 / 60), a2 %= 60, c2 = Math.trunc(s2 / 60), s2 %= 60, d2 = Math.trunc(c2 / 24), c2 %= 24;
      break;
    case "hour":
      o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3, s2 = Math.trunc(a2 / 60), a2 %= 60, c2 = Math.trunc(s2 / 60), s2 %= 60;
      break;
    case "minute":
      o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3, s2 = Math.trunc(a2 / 60), a2 %= 60;
      break;
    case "second":
      o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = Math.trunc(o2 / 1e3), o2 %= 1e3, a2 += Math.trunc(i2 / 1e3), i2 %= 1e3;
      break;
    case "millisecond":
      o2 = Math.trunc(r2 / 1e3), r2 %= 1e3, i2 = he(a2, 3, Math.trunc(o2 / 1e3)), o2 %= 1e3, a2 = 0;
      break;
    case "microsecond":
      o2 = he(a2, 6, Math.trunc(r2 / 1e3)), r2 %= 1e3, a2 = 0;
      break;
    case "nanosecond":
      r2 = he(a2, 9, r2), a2 = 0;
  }
  return new (ce("%Temporal.Duration%"))(e2.date.years, e2.date.months, e2.date.weeks, e2.date.days + n2 * d2, n2 * c2, n2 * s2, n2 * a2, n2 * i2, n2 * o2, n2 * r2);
}
function Jr(e2, t2) {
  return Er(e2), t2.sign(), { date: e2, time: t2 };
}
function Gr(e2, t2, n2) {
  return yr({ isoDate: { year: e2, month: t2 + 1, day: n2 }, time: { hour: 0, minute: 0, second: 0, millisecond: 0 } }) / Re;
}
function Kr({ year: e2, month: t2, day: n2 }) {
  if (Math.abs(Gr(e2, t2 - 1, n2)) > 1e8) throw new RangeError("date/time value is outside the supported range");
}
function Vr(e2, t2) {
  const n2 = t2.hour - e2.hour, r2 = t2.minute - e2.minute, o2 = t2.second - e2.second, i2 = t2.millisecond - e2.millisecond, a2 = t2.microsecond - e2.microsecond, s2 = t2.nanosecond - e2.nanosecond;
  return TimeDuration.fromComponents(n2, r2, o2, i2, a2, s2);
}
function Xr(e2, t2, n2, r2, o2) {
  let i2 = TimeDuration.fromEpochNsDiff(t2, e2);
  return i2 = $o(i2, n2, r2, o2), Jr({ years: 0, months: 0, weeks: 0, days: 0 }, i2);
}
function Qr(e2, t2, n2, r2) {
  Zr(e2), Zr(t2);
  let o2 = Vr(e2.time, t2.time);
  const i2 = o2.sign(), a2 = Ro(e2.isoDate, t2.isoDate);
  let s2 = t2.isoDate;
  a2 === i2 && (s2 = Or(s2.year, s2.month, s2.day + i2), o2 = o2.add24HourDays(-i2));
  const c2 = Gt("day", r2), d2 = jn(n2, e2.isoDate, s2, c2);
  return r2 !== c2 && (o2 = o2.add24HourDays(d2.days), d2.days = 0), Jr(d2, o2);
}
function eo(n2, r2, o2, i2, a2) {
  const s2 = import_jsbi.default.subtract(r2, n2);
  if (import_jsbi.default.equal(s2, t)) return { date: { years: 0, months: 0, weeks: 0, days: 0 }, time: TimeDuration.ZERO };
  const c2 = import_jsbi.default.lessThan(s2, t) ? -1 : 1, d2 = zn(o2, n2), h2 = zn(o2, r2);
  let u2, l2 = 0, m2 = 1 === c2 ? 2 : 1, f2 = Vr(d2.time, h2.time);
  for (f2.sign() === -c2 && l2++; l2 <= m2; l2++) {
    u2 = xt(Or(h2.isoDate.year, h2.isoDate.month, h2.isoDate.day - l2 * c2), d2.time);
    const e2 = An(o2, u2, "compatible");
    if (f2 = TimeDuration.fromEpochNsDiff(r2, e2), f2.sign() !== -c2) break;
  }
  const y2 = Gt("day", a2);
  return Jr(jn(i2, d2.isoDate, u2.isoDate, y2), f2);
}
function to(t2, n2, r2, o2, i2, a2, s2, c2, d2) {
  let h2, u2, l2, m2, f2 = n2;
  switch (c2) {
    case "year": {
      const e2 = Eo(f2.date.years, s2, "trunc");
      h2 = e2, u2 = e2 + s2 * t2, l2 = { years: h2, months: 0, weeks: 0, days: 0 }, m2 = { ...l2, years: u2 };
      break;
    }
    case "month": {
      const e2 = Eo(f2.date.months, s2, "trunc");
      h2 = e2, u2 = e2 + s2 * t2, l2 = Nt(f2.date, 0, 0, h2), m2 = Nt(f2.date, 0, 0, u2);
      break;
    }
    case "week": {
      const e2 = Nt(f2.date, 0, 0), n3 = Sn(a2, o2.isoDate, e2, "constrain"), r3 = jn(a2, n3, Or(n3.year, n3.month, n3.day + f2.date.days), "week"), i3 = Eo(f2.date.weeks + r3.weeks, s2, "trunc");
      h2 = i3, u2 = i3 + s2 * t2, l2 = Nt(f2.date, 0, h2), m2 = Nt(f2.date, 0, u2);
      break;
    }
    case "day": {
      const e2 = Eo(f2.date.days, s2, "trunc");
      h2 = e2, u2 = e2 + s2 * t2, l2 = Nt(f2.date, h2), m2 = Nt(f2.date, u2);
      break;
    }
  }
  const y2 = Sn(a2, o2.isoDate, l2, "constrain"), p2 = Sn(a2, o2.isoDate, m2, "constrain");
  let g2, w2;
  const v2 = xt(y2, o2.time), b2 = xt(p2, o2.time);
  i2 ? (g2 = An(i2, v2, "compatible"), w2 = An(i2, b2, "compatible")) : (g2 = pr(v2), w2 = pr(b2));
  const D2 = TimeDuration.fromEpochNsDiff(r2, g2), T2 = TimeDuration.fromEpochNsDiff(w2, g2), M2 = ue(d2, t2 < 0 ? "negative" : "positive"), E2 = D2.add(D2).abs().subtract(T2.abs()).sign(), I2 = Math.abs(h2) / s2 % 2 == 0, C2 = D2.isZero() ? Math.abs(h2) : D2.cmp(T2) ? le(Math.abs(h2), Math.abs(u2), E2, I2, M2) : Math.abs(u2), O2 = new TimeDuration(import_jsbi.default.add(import_jsbi.default.multiply(T2.totalNs, import_jsbi.default.BigInt(h2)), import_jsbi.default.multiply(D2.totalNs, import_jsbi.default.BigInt(s2 * t2)))).fdiv(T2.totalNs), $2 = C2 === Math.abs(u2);
  return f2 = { date: $2 ? m2 : l2, time: TimeDuration.ZERO }, { nudgeResult: { duration: f2, nudgedEpochNs: $2 ? w2 : g2, didExpandCalendarUnit: $2 }, total: O2 };
}
function no(t2, n2, r2, o2, i2, a2, s2, c2, d2) {
  let h2 = t2;
  const u2 = Kt(c2) || o2 && "day" === c2, l2 = Ir(h2) < 0 ? -1 : 1;
  let m2;
  return u2 ? { nudgeResult: m2 } = to(l2, h2, n2, r2, o2, i2, s2, c2, d2) : m2 = o2 ? (function(t3, n3, r3, o3, i3, a3, s3, c3) {
    let d3 = n3;
    const h3 = Sn(i3, r3.isoDate, d3.date, "constrain"), u3 = xt(h3, r3.time), l3 = xt(Or(h3.year, h3.month, h3.day + t3), r3.time), m3 = An(o3, u3, "compatible"), f2 = An(o3, l3, "compatible"), y2 = TimeDuration.fromEpochNsDiff(f2, m3);
    if (y2.sign() !== t3) throw new RangeError("time zone returned inconsistent Instants");
    const p2 = import_jsbi.default.BigInt(at[s3] * a3);
    let g2 = d3.time.round(p2, c3);
    const w2 = g2.subtract(y2), v2 = w2.sign() !== -t3;
    let b2, D2;
    return v2 ? (b2 = t3, g2 = w2.round(p2, c3), D2 = g2.addToEpochNs(f2)) : (b2 = 0, D2 = g2.addToEpochNs(m3)), { duration: Jr(Nt(d3.date, d3.date.days + b2), g2), nudgedEpochNs: D2, didExpandCalendarUnit: v2 };
  })(l2, h2, r2, o2, i2, s2, c2, d2) : (function(t3, n3, r3, o3, i3, a3) {
    let s3 = t3;
    const c3 = s3.time.add24HourDays(s3.date.days), d3 = c3.round(import_jsbi.default.BigInt(o3 * at[i3]), a3), h3 = d3.subtract(c3), { quotient: u3 } = c3.divmod(Se), { quotient: l3 } = d3.divmod(Se), m3 = Math.sign(l3 - u3) === c3.sign(), f2 = h3.addToEpochNs(n3);
    let y2 = 0, p2 = d3;
    return "date" === Vt(r3) && (y2 = l3, p2 = d3.add(TimeDuration.fromComponents(24 * -l3, 0, 0, 0, 0, 0))), { duration: { date: Nt(s3.date, y2), time: p2 }, nudgedEpochNs: f2, didExpandCalendarUnit: m3 };
  })(h2, n2, a2, s2, c2, d2), h2 = m2.duration, m2.didExpandCalendarUnit && "week" !== c2 && (h2 = (function(e2, t3, n3, r3, o3, i3, a3, s3) {
    let c3 = t3;
    if (s3 === a3) return c3;
    const d3 = it.indexOf(a3);
    for (let t4 = it.indexOf(s3) - 1; t4 >= d3; t4--) {
      const s4 = it[t4];
      if ("week" === s4 && "week" !== a3) continue;
      let d4;
      switch (s4) {
        case "year":
          d4 = { years: c3.date.years + e2, months: 0, weeks: 0, days: 0 };
          break;
        case "month": {
          const t5 = c3.date.months + e2;
          d4 = Nt(c3.date, 0, 0, t5);
          break;
        }
        case "week": {
          const t5 = c3.date.weeks + e2;
          d4 = Nt(c3.date, 0, t5);
          break;
        }
      }
      const h3 = xt(Sn(i3, r3.isoDate, d4, "constrain"), r3.time);
      let u3;
      if (u3 = o3 ? An(o3, h3, "compatible") : pr(h3), p(n3, u3) === -e2) break;
      c3 = { date: d4, time: TimeDuration.ZERO };
    }
    return c3;
  })(l2, h2, m2.nudgedEpochNs, r2, o2, i2, a2, Gt(c2, "day"))), h2;
}
function ro(e2, t2, n2, r2, o2, i2) {
  return Kt(i2) || r2 && "day" === i2 ? to(Ir(e2) < 0 ? -1 : 1, e2, t2, n2, r2, o2, 1, i2, "trunc").total : Yo(e2.time.add24HourDays(e2.date.days), i2);
}
function oo(e2, t2, n2, r2, o2, i2, a2) {
  if (0 == jo(e2, t2)) return { date: { years: 0, months: 0, weeks: 0, days: 0 }, time: TimeDuration.ZERO };
  Br(e2), Br(t2);
  const s2 = Qr(e2, t2, n2, r2);
  return "nanosecond" === i2 && 1 === o2 ? s2 : no(s2, pr(t2), e2, null, n2, r2, o2, i2, a2);
}
function io(e2, t2, n2, r2, o2, i2, a2, s2) {
  if ("time" === Vt(o2)) return Xr(e2, t2, i2, a2, s2);
  const c2 = eo(e2, t2, n2, r2, o2);
  return "nanosecond" === a2 && 1 === i2 ? c2 : no(c2, t2, zn(n2, e2), n2, r2, o2, i2, a2, s2);
}
function ao(e2, t2, n2, r2, o2, i2) {
  const a2 = nt.reduce(((e3, t3) => {
    const o3 = t3[0], i3 = t3[1], a3 = t3[2];
    return "datetime" !== n2 && a3 !== n2 || r2.includes(i3) || e3.push(i3, o3), e3;
  }), []);
  let s2 = Wt(t2, "largestUnit", n2, "auto");
  if (r2.includes(s2)) throw new RangeError(`largestUnit must be one of ${a2.join(", ")}, not ${s2}`);
  const c2 = Ft(t2);
  let d2 = Ut(t2, "trunc");
  "since" === e2 && (d2 = (function(e3) {
    switch (e3) {
      case "ceil":
        return "floor";
      case "floor":
        return "ceil";
      case "halfCeil":
        return "halfFloor";
      case "halfFloor":
        return "halfCeil";
      default:
        return e3;
    }
  })(d2));
  const h2 = Wt(t2, "smallestUnit", n2, o2);
  if (r2.includes(h2)) throw new RangeError(`smallestUnit must be one of ${a2.join(", ")}, not ${h2}`);
  const u2 = Gt(i2, h2);
  if ("auto" === s2 && (s2 = u2), Gt(s2, h2) !== s2) throw new RangeError(`largestUnit ${s2} cannot be smaller than smallestUnit ${h2}`);
  const l2 = { hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[h2];
  return void 0 !== l2 && Ht(c2, l2, false), { largestUnit: s2, roundingIncrement: c2, roundingMode: d2, smallestUnit: h2 };
}
function so(e2, t2, n2, r2) {
  const o2 = cn(n2), i2 = ao(e2, Zo(r2), "time", [], "nanosecond", "second");
  let a2 = _r(Xr(re(t2, b), re(o2, b), i2.roundingIncrement, i2.smallestUnit, i2.roundingMode), i2.largestUnit);
  return "since" === e2 && (a2 = Sr(a2)), a2;
}
function co(e2, t2, n2, r2) {
  const o2 = rn(n2), i2 = re(t2, E), a2 = re(o2, E);
  if (!xn(i2, a2)) throw new RangeError(`cannot compute difference between dates of ${i2} and ${a2} calendars`);
  const s2 = ao(e2, Zo(r2), "date", [], "day", "day"), c2 = ce("%Temporal.Duration%"), d2 = re(t2, D), h2 = re(o2, D);
  if (0 === Ro(d2, h2)) return new c2();
  let u2 = { date: jn(i2, d2, h2, s2.largestUnit), time: TimeDuration.ZERO };
  if ("day" !== s2.smallestUnit || 1 !== s2.roundingIncrement) {
    const e3 = xt(d2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
    u2 = no(u2, pr(xt(h2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })), e3, null, i2, s2.largestUnit, s2.roundingIncrement, s2.smallestUnit, s2.roundingMode);
  }
  let l2 = _r(u2, "day");
  return "since" === e2 && (l2 = Sr(l2)), l2;
}
function ho(e2, t2, n2, r2) {
  const o2 = an(n2), i2 = re(t2, E), a2 = re(o2, E);
  if (!xn(i2, a2)) throw new RangeError(`cannot compute difference between dates of ${i2} and ${a2} calendars`);
  const s2 = ao(e2, Zo(r2), "datetime", [], "nanosecond", "day"), c2 = ce("%Temporal.Duration%"), d2 = re(t2, T), h2 = re(o2, T);
  if (0 === jo(d2, h2)) return new c2();
  let u2 = _r(oo(d2, h2, i2, s2.largestUnit, s2.roundingIncrement, s2.smallestUnit, s2.roundingMode), s2.largestUnit);
  return "since" === e2 && (u2 = Sr(u2)), u2;
}
function uo(e2, t2, n2, r2) {
  const o2 = hn(n2), i2 = ao(e2, Zo(r2), "time", [], "nanosecond", "hour");
  let a2 = Vr(re(t2, M), re(o2, M));
  a2 = $o(a2, i2.roundingIncrement, i2.smallestUnit, i2.roundingMode);
  let s2 = _r(Jr({ years: 0, months: 0, weeks: 0, days: 0 }, a2), i2.largestUnit);
  return "since" === e2 && (s2 = Sr(s2)), s2;
}
function lo(e2, t2, n2, r2) {
  const o2 = ln(n2), i2 = re(t2, E), a2 = re(o2, E);
  if (!xn(i2, a2)) throw new RangeError(`cannot compute difference between months of ${i2} and ${a2} calendars`);
  const s2 = ao(e2, Zo(r2), "date", ["week", "day"], "month", "year"), c2 = ce("%Temporal.Duration%");
  if (0 == Ro(re(t2, D), re(o2, D))) return new c2();
  const d2 = en(i2, re(t2, D), "year-month");
  d2.day = 1;
  const h2 = Ln(i2, d2, "constrain"), u2 = en(i2, re(o2, D), "year-month");
  u2.day = 1;
  const l2 = Ln(i2, u2, "constrain");
  let m2 = { date: Nt(jn(i2, h2, l2, s2.largestUnit), 0, 0), time: TimeDuration.ZERO };
  if ("month" !== s2.smallestUnit || 1 !== s2.roundingIncrement) {
    const e3 = xt(h2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
    m2 = no(m2, pr(xt(l2, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })), e3, null, i2, s2.largestUnit, s2.roundingIncrement, s2.smallestUnit, s2.roundingMode);
  }
  let f2 = _r(m2, "day");
  return "since" === e2 && (f2 = Sr(f2)), f2;
}
function mo(t2, n2, r2, o2) {
  const i2 = fn(r2), a2 = re(n2, E), s2 = re(i2, E);
  if (!xn(a2, s2)) throw new RangeError(`cannot compute difference between dates of ${a2} and ${s2} calendars`);
  const c2 = ao(t2, Zo(o2), "datetime", [], "nanosecond", "hour"), d2 = re(n2, b), h2 = re(i2, b), u2 = ce("%Temporal.Duration%");
  let l2;
  if ("date" !== Vt(c2.largestUnit)) l2 = _r(Xr(d2, h2, c2.roundingIncrement, c2.smallestUnit, c2.roundingMode), c2.largestUnit);
  else {
    const t3 = re(n2, $);
    if (!Zn(t3, re(i2, $))) throw new RangeError("When calculating difference between time zones, largestUnit must be 'hours' or smaller because day lengths can vary between time zones due to DST or time zone offset changes.");
    if (import_jsbi.default.equal(d2, h2)) return new u2();
    l2 = _r(io(d2, h2, t3, a2, c2.largestUnit, c2.roundingIncrement, c2.smallestUnit, c2.roundingMode), "hour");
  }
  return "since" === t2 && (l2 = Sr(l2)), l2;
}
function fo({ hour: e2, minute: t2, second: n2, millisecond: r2, microsecond: o2, nanosecond: i2 }, a2) {
  let s2 = n2, c2 = i2;
  return s2 += a2.sec, c2 += a2.subsec, Yr(e2, t2, s2, r2, o2, c2);
}
function yo(e2, t2) {
  const n2 = t2.addToEpochNs(e2);
  return Fr(n2), n2;
}
function po(e2, t2, n2, r2, o2 = "constrain") {
  if (0 === Er(r2.date)) return yo(e2, r2.time);
  const i2 = zn(t2, e2);
  return yo(An(t2, xt(Sn(n2, i2.isoDate, r2.date, o2), i2.time), "compatible"), r2.time);
}
function go(e2, t2, n2) {
  let r2 = sn(n2);
  "subtract" === e2 && (r2 = Sr(r2));
  const o2 = Gt(Jt(t2), Jt(r2));
  if (Kt(o2)) throw new RangeError("For years, months, or weeks arithmetic, use date arithmetic relative to a starting point");
  const i2 = qr(t2), a2 = qr(r2);
  return _r(Jr({ years: 0, months: 0, weeks: 0, days: 0 }, i2.time.add(a2.time)), o2);
}
function wo(e2, t2, n2) {
  let r2 = sn(n2);
  "subtract" === e2 && (r2 = Sr(r2));
  const o2 = Jt(r2);
  if ("date" === Vt(o2)) throw new RangeError(`Duration field ${o2} not supported by Temporal.Instant. Try Temporal.ZonedDateTime instead.`);
  const i2 = qr(r2);
  return Cn(yo(re(t2, b), i2.time));
}
function vo(e2, t2, n2, r2) {
  const o2 = re(t2, E);
  let i2 = sn(n2);
  "subtract" === e2 && (i2 = Sr(i2));
  const a2 = Wr(i2), s2 = Lt(Zo(r2));
  return pn(Sn(o2, re(t2, D), a2, s2), o2);
}
function bo(e2, t2, n2, r2) {
  let o2 = sn(n2);
  "subtract" === e2 && (o2 = Sr(o2));
  const i2 = Lt(Zo(r2)), a2 = re(t2, E), s2 = qr(o2), c2 = re(t2, T), d2 = fo(c2.time, s2.time), h2 = Nt(s2.date, d2.deltaDays);
  return zr(h2.years, h2.months, h2.weeks, h2.days, 0, 0, 0, 0, 0, 0), wn(xt(Sn(a2, c2.isoDate, h2, i2), d2), a2);
}
function Do(e2, t2, n2) {
  let r2 = sn(n2);
  "subtract" === e2 && (r2 = Sr(r2));
  const o2 = qr(r2), { hour: i2, minute: a2, second: s2, millisecond: c2, microsecond: d2, nanosecond: h2 } = fo(re(t2, M), o2.time);
  return Tn(jt(i2, a2, s2, c2, d2, h2, "reject"));
}
function To(e2, t2, n2, r2) {
  let o2 = sn(n2);
  "subtract" === e2 && (o2 = Sr(o2));
  const i2 = Lt(Zo(r2)), a2 = Mr(o2), s2 = re(t2, E), c2 = en(s2, re(t2, D), "year-month");
  c2.day = 1;
  let d2 = Ln(s2, c2, "constrain");
  if (a2 < 0) {
    const e3 = Sn(s2, d2, { months: 1 }, "constrain");
    d2 = Or(e3.year, e3.month, e3.day - 1);
  }
  const h2 = Wr(o2);
  return Lr(d2), En(Pn(s2, en(s2, Sn(s2, d2, h2, i2), "year-month"), i2), s2);
}
function Mo(e2, t2, n2, r2) {
  let o2 = sn(n2);
  "subtract" === e2 && (o2 = Sr(o2));
  const i2 = Lt(Zo(r2)), a2 = re(t2, $), s2 = re(t2, E), c2 = Ar(o2);
  return $n(po(re(t2, b), a2, s2, c2, i2), a2, s2);
}
function Eo(e2, t2, n2) {
  const r2 = Math.trunc(e2 / t2), o2 = e2 % t2, i2 = e2 < 0 ? "negative" : "positive", a2 = Math.abs(r2), s2 = a2 + 1, c2 = Bo(Math.abs(2 * o2) - t2), d2 = a2 % 2 == 0, h2 = ue(n2, i2), u2 = 0 === o2 ? a2 : le(a2, s2, c2, d2, h2);
  return t2 * ("positive" === i2 ? u2 : -u2);
}
function Io(o2, i2, a2, s2) {
  const c2 = at[a2] * i2;
  return (function(o3, i3, a3) {
    const s3 = m(o3), c3 = m(i3), d2 = import_jsbi.default.divide(s3, c3), h2 = import_jsbi.default.remainder(s3, c3), u2 = ue(a3, "positive");
    let l2, g2;
    import_jsbi.default.lessThan(s3, t) ? (l2 = import_jsbi.default.subtract(d2, n), g2 = d2) : (l2 = d2, g2 = import_jsbi.default.add(d2, n));
    const w2 = p(y(import_jsbi.default.multiply(h2, r)), c3) * (import_jsbi.default.lessThan(s3, t) ? -1 : 1) + 0, v2 = import_jsbi.default.equal(h2, t) ? d2 : le(l2, g2, w2, f(l2), u2);
    return import_jsbi.default.multiply(v2, c3);
  })(o2, import_jsbi.default.BigInt(c2), s2);
}
function Co(e2, t2, n2, r2) {
  Zr(e2);
  const { year: o2, month: i2, day: a2 } = e2.isoDate, s2 = Oo(e2.time, t2, n2, r2);
  return xt(Or(o2, i2, a2 + s2.deltaDays), s2);
}
function Oo({ hour: e2, minute: t2, second: n2, millisecond: r2, microsecond: o2, nanosecond: i2 }, a2, s2, c2) {
  let d2;
  switch (s2) {
    case "day":
    case "hour":
      d2 = 1e3 * (1e3 * (1e3 * (60 * (60 * e2 + t2) + n2) + r2) + o2) + i2;
      break;
    case "minute":
      d2 = 1e3 * (1e3 * (1e3 * (60 * t2 + n2) + r2) + o2) + i2;
      break;
    case "second":
      d2 = 1e3 * (1e3 * (1e3 * n2 + r2) + o2) + i2;
      break;
    case "millisecond":
      d2 = 1e3 * (1e3 * r2 + o2) + i2;
      break;
    case "microsecond":
      d2 = 1e3 * o2 + i2;
      break;
    case "nanosecond":
      d2 = i2;
  }
  const h2 = at[s2], u2 = Eo(d2, h2 * a2, c2) / h2;
  switch (s2) {
    case "day":
      return { deltaDays: u2, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 };
    case "hour":
      return Yr(u2, 0, 0, 0, 0, 0);
    case "minute":
      return Yr(e2, u2, 0, 0, 0, 0);
    case "second":
      return Yr(e2, t2, u2, 0, 0, 0);
    case "millisecond":
      return Yr(e2, t2, n2, u2, 0, 0);
    case "microsecond":
      return Yr(e2, t2, n2, r2, u2, 0);
    case "nanosecond":
      return Yr(e2, t2, n2, r2, o2, u2);
    default:
      throw new Error(`Invalid unit ${s2}`);
  }
}
function $o(t2, n2, r2, o2) {
  const i2 = at[r2];
  return t2.round(import_jsbi.default.BigInt(i2 * n2), o2);
}
function Yo(t2, n2) {
  const r2 = at[n2];
  return t2.fdiv(import_jsbi.default.BigInt(r2));
}
function Ro(e2, t2) {
  return e2.year !== t2.year ? Bo(e2.year - t2.year) : e2.month !== t2.month ? Bo(e2.month - t2.month) : e2.day !== t2.day ? Bo(e2.day - t2.day) : 0;
}
function So(e2, t2) {
  return e2.hour !== t2.hour ? Bo(e2.hour - t2.hour) : e2.minute !== t2.minute ? Bo(e2.minute - t2.minute) : e2.second !== t2.second ? Bo(e2.second - t2.second) : e2.millisecond !== t2.millisecond ? Bo(e2.millisecond - t2.millisecond) : e2.microsecond !== t2.microsecond ? Bo(e2.microsecond - t2.microsecond) : e2.nanosecond !== t2.nanosecond ? Bo(e2.nanosecond - t2.nanosecond) : 0;
}
function jo(e2, t2) {
  const n2 = Ro(e2.isoDate, t2.isoDate);
  return 0 !== n2 ? n2 : So(e2.time, t2.time);
}
function ko(e2) {
  const t2 = Lo(e2);
  return void 0 !== globalThis.BigInt ? globalThis.BigInt(t2.toString(10)) : t2;
}
function No(t2, n2) {
  const r2 = m(t2), { quotient: o2, remainder: i2 } = g(r2, c);
  let a2 = import_jsbi.default.toNumber(o2);
  return "floor" === n2 && import_jsbi.default.toNumber(i2) < 0 && (a2 -= 1), "ceil" === n2 && import_jsbi.default.toNumber(i2) > 0 && (a2 += 1), a2;
}
function xo(t2) {
  if (!Number.isInteger(t2)) throw new RangeError("epoch milliseconds must be an integer");
  return import_jsbi.default.multiply(import_jsbi.default.BigInt(t2), c);
}
function Lo(t2) {
  let n2 = t2;
  if ("object" == typeof t2) {
    const e2 = t2[Symbol.toPrimitive];
    e2 && "function" == typeof e2 && (n2 = e2.call(t2, "number"));
  }
  if ("number" == typeof n2) throw new TypeError("cannot convert number to bigint");
  return "bigint" == typeof n2 ? import_jsbi.default.BigInt(n2.toString(10)) : import_jsbi.default.BigInt(n2);
}
var Po = (() => {
  let t2 = import_jsbi.default.BigInt(Date.now() % 1e6);
  return () => {
    const n2 = Date.now(), r2 = import_jsbi.default.BigInt(n2), o2 = import_jsbi.default.add(xo(n2), t2);
    return t2 = import_jsbi.default.remainder(r2, c), import_jsbi.default.greaterThan(o2, Ne) ? Ne : import_jsbi.default.lessThan(o2, xe) ? xe : o2;
  };
})();
function Uo() {
  return new Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function Bo(e2) {
  return e2 < 0 ? -1 : e2 > 0 ? 1 : e2;
}
function Zo(e2) {
  if (void 0 === e2) return /* @__PURE__ */ Object.create(null);
  if (Ae(e2) && null !== e2) return e2;
  throw new TypeError("Options parameter must be an object, not " + (null === e2 ? "null" : typeof e2));
}
function Fo(e2, t2) {
  const n2 = /* @__PURE__ */ Object.create(null);
  return n2[e2] = t2, n2;
}
function Ho(e2, t2, n2, r2) {
  let o2 = e2[t2];
  if (void 0 !== o2) {
    if (o2 = We(o2), !n2.includes(o2)) throw new RangeError(`${t2} must be one of ${n2.join(", ")}, not ${o2}`);
    return o2;
  }
  if (r2 === qt) throw new RangeError(`${t2} option is required`);
  return r2;
}
function zo(e2) {
  const t2 = Ao(e2);
  if (!He.includes(Ao(t2))) throw new RangeError(`invalid calendar identifier ${t2}`);
  switch (t2) {
    case "ethiopic-amete-alem":
      return "ethioaa";
    case "islamicc":
      return "islamic-civil";
  }
  return t2;
}
function Ao(e2) {
  let t2 = "";
  for (let n2 = 0; n2 < e2.length; n2++) {
    const r2 = e2.charCodeAt(n2);
    t2 += r2 >= 65 && r2 <= 90 ? String.fromCharCode(r2 + 32) : String.fromCharCode(r2);
  }
  return t2;
}
function qo(e2) {
  throw new TypeError(`Do not use built-in arithmetic operators with Temporal objects. When comparing, use ${"PlainMonthDay" === e2 ? "Temporal.PlainDate.compare(obj1.toPlainDate(year), obj2.toPlainDate(year))" : `Temporal.${e2}.compare(obj1, obj2)`}, not obj1 > obj2. When coercing to strings, use \`\${obj}\` or String(obj), not '' + obj. When coercing to numbers, use properties or methods of the object, not \`+obj\`. When concatenating with strings, use \`\${str}\${obj}\` or str.concat(obj), not str + obj. In React, coerce to a string before rendering a Temporal object.`);
}
var Wo = new RegExp(`^${be.source}$`);
var _o = new RegExp(`^${/([+-])([01][0-9]|2[0-3])(?::?([0-5][0-9])(?::?([0-5][0-9])(?:[.,](\d{1,9}))?)?)?/.source}$`);
function Jo(e2, t2, n2, r2 = e2(t2), o2 = e2(n2)) {
  let i2 = t2, a2 = n2, s2 = r2, c2 = o2;
  for (; a2 - i2 > 1; ) {
    let t3 = Math.trunc((i2 + a2) / 2);
    const n3 = e2(t3);
    n3 === s2 ? (i2 = t3, s2 = n3) : n3 === c2 && (a2 = t3, c2 = n3);
  }
  return a2;
}
function Go(e2) {
  return [...e2];
}
function Ko(e2, t2) {
  if ("gregory" !== e2 && "iso8601" !== e2) return;
  const n2 = Xo[e2];
  let r2 = t2.year;
  const { dayOfWeek: o2, dayOfYear: i2, daysInYear: a2 } = n2.isoToDate(t2, { dayOfWeek: true, dayOfYear: true, daysInYear: true }), s2 = n2.getFirstDayOfWeek(), c2 = n2.getMinimalDaysInFirstWeek();
  let d2 = (o2 + 7 - s2) % 7, h2 = (o2 - i2 + 7001 - s2) % 7, u2 = Math.floor((i2 - 1 + h2) / 7);
  if (7 - h2 >= c2 && ++u2, 0 == u2) u2 = (function(e3, t3, n3, r3) {
    let o3 = (r3 - e3 - n3 + 1) % 7;
    o3 < 0 && (o3 += 7);
    let i3 = Math.floor((n3 + o3 - 1) / 7);
    return 7 - o3 >= t3 && ++i3, i3;
  })(s2, c2, i2 + n2.isoToDate(n2.dateAdd(t2, { years: -1 }, "constrain"), { daysInYear: true }).daysInYear, o2), r2--;
  else if (i2 >= a2 - 5) {
    let e3 = (d2 + a2 - i2) % 7;
    e3 < 0 && (e3 += 7), 6 - e3 >= c2 && i2 + 7 - d2 > a2 && (u2 = 1, r2++);
  }
  return { week: u2, year: r2 };
}
function Vo(e2, t2, n2, r2, o2) {
  if (t2 !== o2.year) {
    if (e2 * (t2 - o2.year) > 0) return true;
  } else if (n2 !== o2.month) {
    if (e2 * (n2 - o2.month) > 0) return true;
  } else if (r2 !== o2.day && e2 * (r2 - o2.day) > 0) return true;
  return false;
}
var Xo = {};
function Qo(e2) {
  if (!e2.startsWith("M")) throw new RangeError(`Invalid month code: ${e2}.  Month codes must start with M.`);
  const t2 = +e2.slice(1);
  if (Number.isNaN(t2)) throw new RangeError(`Invalid month code: ${e2}`);
  return t2;
}
function ei(e2, t2 = false) {
  return `M${`${e2}`.padStart(2, "0")}${t2 ? "L" : ""}`;
}
function ti(e2, t2 = void 0, n2 = 12) {
  let { month: r2, monthCode: o2 } = e2;
  if (void 0 === o2) {
    if (void 0 === r2) throw new TypeError("Either month or monthCode are required");
    "reject" === t2 && Nr(r2, 1, n2), "constrain" === t2 && (r2 = jr(r2, 1, n2)), o2 = ei(r2);
  } else {
    const e3 = Qo(o2);
    if (o2 !== ei(e3)) throw new RangeError(`Invalid month code: ${o2}`);
    if (void 0 !== r2 && r2 !== e3) throw new RangeError(`monthCode ${o2} and month ${r2} must match if both are present`);
    if (r2 = e3, r2 < 1 || r2 > n2) throw new RangeError(`Invalid monthCode: ${o2}`);
  }
  return { ...e2, month: r2, monthCode: o2 };
}
Xo.iso8601 = { resolveFields(e2, t2) {
  if (("date" === t2 || "year-month" === t2) && void 0 === e2.year) throw new TypeError("year is required");
  if (("date" === t2 || "month-day" === t2) && void 0 === e2.day) throw new TypeError("day is required");
  Object.assign(e2, ti(e2));
}, dateToISO: (e2, t2) => St(e2.year, e2.month, e2.day, t2), monthDayToISOReferenceDate(e2, t2) {
  const { month: n2, day: r2 } = St(e2.year ?? 1972, e2.month, e2.day, t2);
  return { month: n2, day: r2, year: 1972 };
}, extraFields: () => [], fieldKeysToIgnore(e2) {
  const t2 = /* @__PURE__ */ new Set();
  for (let n2 = 0; n2 < e2.length; n2++) {
    const r2 = e2[n2];
    t2.add(r2), "month" === r2 ? t2.add("monthCode") : "monthCode" === r2 && t2.add("month");
  }
  return Go(t2);
}, dateAdd(e2, { years: t2 = 0, months: n2 = 0, weeks: r2 = 0, days: o2 = 0 }, i2) {
  let { year: a2, month: s2, day: c2 } = e2;
  return a2 += t2, s2 += n2, { year: a2, month: s2 } = Cr(a2, s2), { year: a2, month: s2, day: c2 } = St(a2, s2, c2, i2), c2 += o2 + 7 * r2, Or(a2, s2, c2);
}, dateUntil(e2, t2, n2) {
  const r2 = -Ro(e2, t2);
  if (0 === r2) return { years: 0, months: 0, weeks: 0, days: 0 };
  let o2, i2 = 0, a2 = 0;
  if ("year" === n2 || "month" === n2) {
    let s3 = t2.year - e2.year;
    for (0 !== s3 && (s3 -= r2); !Vo(r2, e2.year + s3, e2.month, e2.day, t2); ) i2 = s3, s3 += r2;
    let c3 = r2;
    for (o2 = Cr(e2.year + i2, e2.month + c3); !Vo(r2, o2.year, o2.month, e2.day, t2); ) a2 = c3, c3 += r2, o2 = Cr(o2.year, o2.month + r2);
    "month" === n2 && (a2 += 12 * i2, i2 = 0);
  }
  o2 = Cr(e2.year + i2, e2.month + a2);
  const s2 = kr(o2.year, o2.month, e2.day);
  let c2 = 0, d2 = Gr(t2.year, t2.month - 1, t2.day) - Gr(s2.year, s2.month - 1, s2.day);
  return "week" === n2 && (c2 = Math.trunc(d2 / 7), d2 %= 7), { years: i2, months: a2, weeks: c2, days: d2 };
}, isoToDate({ year: e2, month: t2, day: n2 }, r2) {
  const o2 = { era: void 0, eraYear: void 0, year: e2, month: t2, day: n2, daysInWeek: 7, monthsInYear: 12 };
  if (r2.monthCode && (o2.monthCode = ei(t2)), r2.dayOfWeek) {
    const r3 = t2 + (t2 < 3 ? 10 : -2), i2 = e2 - (t2 < 3 ? 1 : 0), a2 = Math.floor(i2 / 100), s2 = i2 - 100 * a2, c2 = (n2 + Math.floor(2.6 * r3 - 0.2) + (s2 + Math.floor(s2 / 4)) + (Math.floor(a2 / 4) - 2 * a2)) % 7;
    o2.dayOfWeek = c2 + (c2 <= 0 ? 7 : 0);
  }
  if (r2.dayOfYear) {
    let r3 = n2;
    for (let n3 = t2 - 1; n3 > 0; n3--) r3 += Tr(e2, n3);
    o2.dayOfYear = r3;
  }
  return r2.weekOfYear && (o2.weekOfYear = Ko("iso8601", { year: e2, month: t2, day: n2 })), r2.daysInMonth && (o2.daysInMonth = Tr(e2, t2)), (r2.daysInYear || r2.inLeapYear) && (o2.inLeapYear = Dr(e2), o2.daysInYear = o2.inLeapYear ? 366 : 365), o2;
}, getFirstDayOfWeek: () => 1, getMinimalDaysInFirstWeek: () => 4 };
var OneObjectCache = class _OneObjectCache {
  constructor(e2) {
    if (this.map = /* @__PURE__ */ new Map(), this.calls = 0, this.hits = 0, this.misses = 0, void 0 !== e2) {
      let t2 = 0;
      for (const n2 of e2.map.entries()) {
        if (++t2 > _OneObjectCache.MAX_CACHE_ENTRIES) break;
        this.map.set(...n2);
      }
    }
  }
  get(e2) {
    const t2 = this.map.get(e2);
    return t2 && (this.hits++, this.report()), this.calls++, t2;
  }
  set(e2, t2) {
    this.map.set(e2, t2), this.misses++, this.report();
  }
  report() {
  }
  setObject(e2) {
    if (_OneObjectCache.objectMap.get(e2)) throw new RangeError("object already cached");
    _OneObjectCache.objectMap.set(e2, this), this.report();
  }
  static getCacheForObject(e2) {
    let t2 = _OneObjectCache.objectMap.get(e2);
    return t2 || (t2 = new _OneObjectCache(), _OneObjectCache.objectMap.set(e2, t2)), t2;
  }
};
function ni({ isoYear: e2, isoMonth: t2, isoDay: n2 }) {
  return `${Jn(e2)}-${Gn(t2)}-${Gn(n2)}T00:00Z`;
}
function ri(e2, t2) {
  return { years: e2.year - t2.year, months: e2.month - t2.month, days: e2.day - t2.day };
}
OneObjectCache.objectMap = /* @__PURE__ */ new WeakMap(), OneObjectCache.MAX_CACHE_ENTRIES = 1e3;
var HelperBase = class {
  constructor() {
    this.eras = [], this.hasEra = false, this.erasBeginMidYear = false;
  }
  getFormatter() {
    return void 0 === this.formatter && (this.formatter = new Intl.DateTimeFormat(`en-US-u-ca-${this.id}`, { day: "numeric", month: "numeric", year: "numeric", era: "short", timeZone: "UTC" })), this.formatter;
  }
  getCalendarParts(e2) {
    let t2 = this.getFormatter(), n2 = new Date(e2);
    if ("-271821-04-19T00:00Z" === e2) {
      const e3 = t2.resolvedOptions();
      t2 = new Intl.DateTimeFormat(e3.locale, { ...e3, timeZone: "Etc/GMT+1" }), n2 = /* @__PURE__ */ new Date("-271821-04-20T00:00Z");
    }
    try {
      return t2.formatToParts(n2);
    } catch (t3) {
      throw new RangeError(`Invalid ISO date: ${e2}`);
    }
  }
  isoToCalendarDate(e2, t2) {
    const { year: n2, month: r2, day: o2 } = e2, i2 = JSON.stringify({ func: "isoToCalendarDate", isoYear: n2, isoMonth: r2, isoDay: o2, id: this.id }), a2 = t2.get(i2);
    if (a2) return a2;
    const s2 = ni({ isoYear: n2, isoMonth: r2, isoDay: o2 }), c2 = this.getCalendarParts(s2), d2 = {};
    for (let e3 = 0; e3 < c2.length; e3++) {
      const { type: t3, value: n3 } = c2[e3];
      if ("year" !== t3 && "relatedYear" !== t3 || (this.hasEra ? d2.eraYear = +n3 : d2.year = +n3), "month" === t3) {
        const e4 = /^([0-9]*)(.*?)$/.exec(n3);
        if (!e4 || 3 != e4.length || !e4[1] && !e4[2]) throw new RangeError(`Unexpected month: ${n3}`);
        if (d2.month = e4[1] ? +e4[1] : 1, d2.month < 1) throw new RangeError(`Invalid month ${n3} from ${s2}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)`);
        if (d2.month > 13) throw new RangeError(`Invalid month ${n3} from ${s2}[u-ca-${this.id}] (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);
        e4[2] && (d2.monthExtra = e4[2]);
      }
      "day" === t3 && (d2.day = +n3), this.hasEra && "era" === t3 && null != n3 && "" !== n3 && (d2.era = n3.split(" (")[0].normalize("NFD").replace(/[^-0-9 \p{L}]/gu, "").replace(/ /g, "-").toLowerCase());
    }
    if (this.hasEra && void 0 === d2.eraYear) throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
    if (this.hasEra) {
      const e3 = this.eras.find(((e4) => d2.era === e4.genericName));
      e3 && (d2.era = e3.code);
    }
    if (this.reviseIntlEra) {
      const { era: t3, eraYear: n3 } = this.reviseIntlEra(d2, e2);
      d2.era = t3, d2.eraYear = n3;
    }
    this.checkIcuBugs && this.checkIcuBugs(e2);
    const h2 = this.adjustCalendarDate(d2, t2, "constrain", true);
    if (void 0 === h2.year) throw new RangeError(`Missing year converting ${JSON.stringify(e2)}`);
    if (void 0 === h2.month) throw new RangeError(`Missing month converting ${JSON.stringify(e2)}`);
    if (void 0 === h2.day) throw new RangeError(`Missing day converting ${JSON.stringify(e2)}`);
    return t2.set(i2, h2), ["constrain", "reject"].forEach(((n3) => {
      const r3 = JSON.stringify({ func: "calendarToIsoDate", year: h2.year, month: h2.month, day: h2.day, overflow: n3, id: this.id });
      t2.set(r3, e2);
    })), h2;
  }
  validateCalendarDate(e2) {
    const { month: t2, year: n2, day: r2, eraYear: o2, monthCode: i2, monthExtra: a2 } = e2;
    if (void 0 !== a2) throw new RangeError("Unexpected `monthExtra` value");
    if (void 0 === n2 && void 0 === o2) throw new TypeError("year or eraYear is required");
    if (void 0 === t2 && void 0 === i2) throw new TypeError("month or monthCode is required");
    if (void 0 === r2) throw new RangeError("Missing day");
    if (void 0 !== i2) {
      if ("string" != typeof i2) throw new RangeError("monthCode must be a string, not " + typeof i2);
      if (!/^M([01]?\d)(L?)$/.test(i2)) throw new RangeError(`Invalid monthCode: ${i2}`);
    }
    if (this.hasEra && void 0 === e2.era != (void 0 === e2.eraYear)) throw new TypeError("properties era and eraYear must be provided together");
  }
  adjustCalendarDate(e2, t2 = void 0, n2 = "constrain", r2 = false) {
    if ("lunisolar" === this.calendarType) throw new RangeError("Override required for lunisolar calendars");
    let o2 = e2;
    this.validateCalendarDate(o2);
    const i2 = this.monthsInYear(o2, t2);
    let { month: a2, monthCode: s2 } = o2;
    return { month: a2, monthCode: s2 } = ti(o2, n2, i2), { ...o2, month: a2, monthCode: s2 };
  }
  regulateMonthDayNaive(e2, t2, n2) {
    const r2 = this.monthsInYear(e2, n2);
    let { month: o2, day: i2 } = e2;
    return "reject" === t2 ? (Nr(o2, 1, r2), Nr(i2, 1, this.maximumMonthLength(e2))) : (o2 = jr(o2, 1, r2), i2 = jr(i2, 1, this.maximumMonthLength({ ...e2, month: o2 }))), { ...e2, month: o2, day: i2 };
  }
  calendarToIsoDate(e2, t2 = "constrain", n2) {
    const r2 = e2;
    let o2 = this.adjustCalendarDate(e2, n2, t2, false);
    o2 = this.regulateMonthDayNaive(o2, t2, n2);
    const { year: i2, month: a2, day: s2 } = o2, c2 = JSON.stringify({ func: "calendarToIsoDate", year: i2, month: a2, day: s2, overflow: t2, id: this.id });
    let d2, h2 = n2.get(c2);
    if (h2) return h2;
    if (void 0 !== r2.year && void 0 !== r2.month && void 0 !== r2.day && (r2.year !== o2.year || r2.month !== o2.month || r2.day !== o2.day) && (d2 = JSON.stringify({ func: "calendarToIsoDate", year: r2.year, month: r2.month, day: r2.day, overflow: t2, id: this.id }), h2 = n2.get(d2), h2)) return h2;
    let u2 = this.estimateIsoDate({ year: i2, month: a2, day: s2 });
    const l2 = (e3) => {
      let r3 = this.addDaysIso(u2, e3);
      if (o2.day > this.minimumMonthLength(o2)) {
        let e4 = this.isoToCalendarDate(r3, n2);
        for (; e4.month !== a2 || e4.year !== i2; ) {
          if ("reject" === t2) throw new RangeError(`day ${s2} does not exist in month ${a2} of year ${i2}`);
          r3 = this.addDaysIso(r3, -1), e4 = this.isoToCalendarDate(r3, n2);
        }
      }
      return r3;
    };
    let m2 = 0, f2 = this.isoToCalendarDate(u2, n2), y2 = ri(o2, f2);
    if (0 !== y2.years || 0 !== y2.months || 0 !== y2.days) {
      const e3 = 365 * y2.years + 30 * y2.months + y2.days;
      u2 = this.addDaysIso(u2, e3), f2 = this.isoToCalendarDate(u2, n2), y2 = ri(o2, f2), 0 === y2.years && 0 === y2.months ? u2 = l2(y2.days) : m2 = this.compareCalendarDates(o2, f2);
    }
    let p2 = 8;
    for (; m2; ) {
      u2 = this.addDaysIso(u2, m2 * p2);
      const e3 = f2;
      f2 = this.isoToCalendarDate(u2, n2);
      const i3 = m2;
      if (m2 = this.compareCalendarDates(o2, f2), m2) {
        if (y2 = ri(o2, f2), 0 === y2.years && 0 === y2.months) u2 = l2(y2.days), m2 = 0;
        else if (i3 && m2 !== i3) if (p2 > 1) p2 /= 2;
        else {
          if ("reject" === t2) throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({ ...r2 })}`);
          this.compareCalendarDates(f2, e3) > 0 && (u2 = this.addDaysIso(u2, -1)), m2 = 0;
        }
      }
    }
    if (n2.set(c2, u2), d2 && n2.set(d2, u2), void 0 === o2.year || void 0 === o2.month || void 0 === o2.day || void 0 === o2.monthCode || this.hasEra && (void 0 === o2.era || void 0 === o2.eraYear)) throw new RangeError("Unexpected missing property");
    return u2;
  }
  compareCalendarDates(e2, t2) {
    return e2.year !== t2.year ? Bo(e2.year - t2.year) : e2.month !== t2.month ? Bo(e2.month - t2.month) : e2.day !== t2.day ? Bo(e2.day - t2.day) : 0;
  }
  regulateDate(e2, t2 = "constrain", n2) {
    const r2 = this.calendarToIsoDate(e2, t2, n2);
    return this.isoToCalendarDate(r2, n2);
  }
  addDaysIso(e2, t2) {
    return Or(e2.year, e2.month, e2.day + t2);
  }
  addDaysCalendar(e2, t2, n2) {
    const r2 = this.calendarToIsoDate(e2, "constrain", n2), o2 = this.addDaysIso(r2, t2);
    return this.isoToCalendarDate(o2, n2);
  }
  addMonthsCalendar(e2, t2, n2, r2) {
    let o2 = e2;
    const { day: i2 } = o2;
    for (let e3 = 0, n3 = Math.abs(t2); e3 < n3; e3++) {
      const { month: e4 } = o2, n4 = o2, a2 = t2 < 0 ? -Math.max(i2, this.daysInPreviousMonth(o2, r2)) : this.daysInMonth(o2, r2), s2 = this.calendarToIsoDate(o2, "constrain", r2);
      let c2 = this.addDaysIso(s2, a2);
      if (o2 = this.isoToCalendarDate(c2, r2), t2 > 0) {
        const t3 = this.monthsInYear(n4, r2);
        for (; o2.month - 1 != e4 % t3; ) c2 = this.addDaysIso(c2, -1), o2 = this.isoToCalendarDate(c2, r2);
      }
      o2.day !== i2 && (o2 = this.regulateDate({ ...o2, day: i2 }, "constrain", r2));
    }
    if ("reject" === n2 && o2.day !== i2) throw new RangeError(`Day ${i2} does not exist in resulting calendar month`);
    return o2;
  }
  addCalendar(e2, { years: t2 = 0, months: n2 = 0, weeks: r2 = 0, days: o2 = 0 }, i2, a2) {
    const { year: s2, day: c2, monthCode: d2 } = e2, h2 = this.adjustCalendarDate({ year: s2 + t2, monthCode: d2, day: c2 }, a2), u2 = this.addMonthsCalendar(h2, n2, i2, a2), l2 = o2 + 7 * r2;
    return this.addDaysCalendar(u2, l2, a2);
  }
  untilCalendar(e2, t2, n2, r2) {
    let o2 = 0, i2 = 0, a2 = 0, s2 = 0;
    switch (n2) {
      case "day":
        o2 = this.calendarDaysUntil(e2, t2, r2);
        break;
      case "week": {
        const n3 = this.calendarDaysUntil(e2, t2, r2);
        o2 = n3 % 7, i2 = (n3 - o2) / 7;
        break;
      }
      case "month":
      case "year": {
        const i3 = this.compareCalendarDates(t2, e2);
        if (!i3) return { years: 0, months: 0, weeks: 0, days: 0 };
        const c2 = t2.year - e2.year, d2 = t2.day - e2.day;
        if ("year" === n2 && c2) {
          let n3 = 0;
          t2.monthCode > e2.monthCode && (n3 = 1), t2.monthCode < e2.monthCode && (n3 = -1), n3 || (n3 = Math.sign(d2)), s2 = n3 * i3 < 0 ? c2 - i3 : c2;
        }
        let h2, u2 = s2 ? this.addCalendar(e2, { years: s2 }, "constrain", r2) : e2;
        do {
          a2 += i3, h2 = u2, u2 = this.addMonthsCalendar(h2, i3, "constrain", r2), u2.day !== e2.day && (u2 = this.regulateDate({ ...u2, day: e2.day }, "constrain", r2));
        } while (this.compareCalendarDates(t2, u2) * i3 >= 0);
        a2 -= i3, o2 = this.calendarDaysUntil(h2, t2, r2);
        break;
      }
    }
    return { years: s2, months: a2, weeks: i2, days: o2 };
  }
  daysInMonth(e2, t2) {
    const { day: n2 } = e2, r2 = this.maximumMonthLength(e2), o2 = this.minimumMonthLength(e2);
    if (o2 === r2) return o2;
    const i2 = n2 <= r2 - o2 ? r2 : o2, a2 = this.calendarToIsoDate(e2, "constrain", t2), s2 = this.addDaysIso(a2, i2), c2 = this.isoToCalendarDate(s2, t2), d2 = this.addDaysIso(s2, -c2.day);
    return this.isoToCalendarDate(d2, t2).day;
  }
  daysInPreviousMonth(e2, t2) {
    const { day: n2, month: r2, year: o2 } = e2;
    let i2 = { year: r2 > 1 ? o2 : o2 - 1, month: r2, day: 1 };
    const a2 = r2 > 1 ? r2 - 1 : this.monthsInYear(i2, t2);
    i2 = { ...i2, month: a2 };
    const s2 = this.minimumMonthLength(i2), c2 = this.maximumMonthLength(i2);
    if (s2 === c2) return c2;
    const d2 = this.calendarToIsoDate(e2, "constrain", t2), h2 = this.addDaysIso(d2, -n2);
    return this.isoToCalendarDate(h2, t2).day;
  }
  startOfCalendarYear(e2) {
    return { year: e2.year, month: 1, monthCode: "M01", day: 1 };
  }
  startOfCalendarMonth(e2) {
    return { year: e2.year, month: e2.month, day: 1 };
  }
  calendarDaysUntil(e2, t2, n2) {
    const r2 = this.calendarToIsoDate(e2, "constrain", n2), o2 = this.calendarToIsoDate(t2, "constrain", n2);
    return Gr(o2.year, o2.month - 1, o2.day) - Gr(r2.year, r2.month - 1, r2.day);
  }
  monthDaySearchStartYear(e2, t2) {
    return 1972;
  }
  monthDayFromFields(e2, t2, n2) {
    let r2, o2, i2, a2, s2, { era: c2, eraYear: d2, year: h2, month: u2, monthCode: l2, day: m2 } = e2;
    if (void 0 !== u2 && void 0 === h2 && (!this.hasEra || void 0 === c2 || void 0 === d2)) throw new TypeError("when month is present, year (or era and eraYear) are required");
    (void 0 === l2 || void 0 !== h2 || this.hasEra && void 0 !== d2) && ({ monthCode: l2, day: m2 } = this.isoToCalendarDate(this.calendarToIsoDate(e2, t2, n2), n2));
    const f2 = { year: this.monthDaySearchStartYear(l2, m2), month: 12, day: 31 }, y2 = this.isoToCalendarDate(f2, n2), p2 = y2.monthCode > l2 || y2.monthCode === l2 && y2.day >= m2 ? y2.year : y2.year - 1;
    for (let e3 = 0; e3 < 20; e3++) {
      const c3 = this.adjustCalendarDate({ day: m2, monthCode: l2, year: p2 - e3 }, n2), d3 = this.calendarToIsoDate(c3, "constrain", n2), h3 = this.isoToCalendarDate(d3, n2);
      if ({ year: r2, month: o2, day: i2 } = d3, h3.monthCode === l2 && h3.day === m2) return { month: o2, day: i2, year: r2 };
      if ("constrain" === t2) {
        const e4 = this.maxLengthOfMonthCodeInAnyYear(h3.monthCode);
        if (h3.monthCode === l2 && h3.day === e4 && m2 > e4) return { month: o2, day: i2, year: r2 };
        (void 0 === a2 || h3.monthCode === a2.monthCode && h3.day > a2.day) && (a2 = h3, s2 = d3);
      }
    }
    if ("constrain" === t2 && void 0 !== s2) return s2;
    throw new RangeError(`No recent ${this.id} year with monthCode ${l2} and day ${m2}`);
  }
  getFirstDayOfWeek() {
  }
  getMinimalDaysInFirstWeek() {
  }
};
var HebrewHelper = class extends HelperBase {
  constructor() {
    super(...arguments), this.id = "hebrew", this.calendarType = "lunisolar", this.months = { Tishri: { leap: 1, regular: 1, monthCode: "M01", days: 30 }, Heshvan: { leap: 2, regular: 2, monthCode: "M02", days: { min: 29, max: 30 } }, Kislev: { leap: 3, regular: 3, monthCode: "M03", days: { min: 29, max: 30 } }, Tevet: { leap: 4, regular: 4, monthCode: "M04", days: 29 }, Shevat: { leap: 5, regular: 5, monthCode: "M05", days: 30 }, Adar: { leap: void 0, regular: 6, monthCode: "M06", days: 29 }, "Adar I": { leap: 6, regular: void 0, monthCode: "M05L", days: 30 }, "Adar II": { leap: 7, regular: void 0, monthCode: "M06", days: 29 }, Nisan: { leap: 8, regular: 7, monthCode: "M07", days: 30 }, Iyar: { leap: 9, regular: 8, monthCode: "M08", days: 29 }, Sivan: { leap: 10, regular: 9, monthCode: "M09", days: 30 }, Tamuz: { leap: 11, regular: 10, monthCode: "M10", days: 29 }, Av: { leap: 12, regular: 11, monthCode: "M11", days: 30 }, Elul: { leap: 13, regular: 12, monthCode: "M12", days: 29 } };
  }
  inLeapYear(e2) {
    const { year: t2 } = e2;
    return (7 * t2 + 1) % 19 < 7;
  }
  monthsInYear(e2) {
    return this.inLeapYear(e2) ? 13 : 12;
  }
  minimumMonthLength(e2) {
    return this.minMaxMonthLength(e2, "min");
  }
  maximumMonthLength(e2) {
    return this.minMaxMonthLength(e2, "max");
  }
  minMaxMonthLength(e2, t2) {
    const { month: n2, year: r2 } = e2, o2 = this.getMonthCode(r2, n2), i2 = Object.entries(this.months).find(((e3) => e3[1].monthCode === o2));
    if (void 0 === i2) throw new RangeError(`unmatched Hebrew month: ${n2}`);
    const a2 = i2[1].days;
    return "number" == typeof a2 ? a2 : a2[t2];
  }
  maxLengthOfMonthCodeInAnyYear(e2) {
    return ["M04", "M06", "M08", "M10", "M12"].includes(e2) ? 29 : 30;
  }
  estimateIsoDate(e2) {
    const { year: t2 } = e2;
    return { year: t2 - 3760, month: 1, day: 1 };
  }
  getMonthCode(e2, t2) {
    return this.inLeapYear({ year: e2 }) ? 6 === t2 ? ei(5, true) : ei(t2 < 6 ? t2 : t2 - 1) : ei(t2);
  }
  adjustCalendarDate(e2, t2, n2 = "constrain", r2 = false) {
    let { year: o2, month: i2, monthCode: a2, day: s2, monthExtra: c2 } = e2;
    if (void 0 === o2) throw new TypeError("Missing property: year");
    if (r2) {
      if (c2) {
        const e3 = this.months[c2];
        if (!e3) throw new RangeError(`Unrecognized month from formatToParts: ${c2}`);
        i2 = this.inLeapYear({ year: o2 }) ? e3.leap : e3.regular;
      }
      return a2 = this.getMonthCode(o2, i2), { year: o2, month: i2, day: s2, monthCode: a2 };
    }
    if (this.validateCalendarDate(e2), void 0 === i2) if (a2.endsWith("L")) {
      if ("M05L" !== a2) throw new RangeError(`Hebrew leap month must have monthCode M05L, not ${a2}`);
      if (i2 = 6, !this.inLeapYear({ year: o2 })) {
        if ("reject" === n2) throw new RangeError(`Hebrew monthCode M05L is invalid in year ${o2} which is not a leap year`);
        i2 = 6, a2 = "M06";
      }
    } else {
      i2 = Qo(a2), this.inLeapYear({ year: o2 }) && i2 >= 6 && i2++;
      const e3 = this.monthsInYear({ year: o2 });
      if (i2 < 1 || i2 > e3) throw new RangeError(`Invalid monthCode: ${a2}`);
    }
    else if ("reject" === n2 ? (Nr(i2, 1, this.monthsInYear({ year: o2 })), Nr(s2, 1, this.maximumMonthLength({ year: o2, month: i2 }))) : (i2 = jr(i2, 1, this.monthsInYear({ year: o2 })), s2 = jr(s2, 1, this.maximumMonthLength({ year: o2, month: i2 }))), void 0 === a2) a2 = this.getMonthCode(o2, i2);
    else if (this.getMonthCode(o2, i2) !== a2) throw new RangeError(`monthCode ${a2} doesn't correspond to month ${i2} in Hebrew year ${o2}`);
    return { ...e2, day: s2, month: i2, monthCode: a2, year: o2 };
  }
};
var IslamicBaseHelper = class extends HelperBase {
  constructor() {
    super(...arguments), this.calendarType = "lunar", this.DAYS_PER_ISLAMIC_YEAR = 354 + 11 / 30, this.DAYS_PER_ISO_YEAR = 365.2425;
  }
  inLeapYear(e2, t2) {
    const n2 = { year: e2.year, month: 1, monthCode: "M01", day: 1 }, r2 = { year: e2.year + 1, month: 1, monthCode: "M01", day: 1 };
    return 355 === this.calendarDaysUntil(n2, r2, t2);
  }
  monthsInYear() {
    return 12;
  }
  minimumMonthLength() {
    return 29;
  }
  maximumMonthLength() {
    return 30;
  }
  maxLengthOfMonthCodeInAnyYear() {
    return 30;
  }
  estimateIsoDate(e2) {
    const { year: t2 } = this.adjustCalendarDate(e2);
    return { year: Math.floor(t2 * this.DAYS_PER_ISLAMIC_YEAR / this.DAYS_PER_ISO_YEAR) + 622, month: 1, day: 1 };
  }
};
var IslamicHelper = class extends IslamicBaseHelper {
  constructor() {
    super(...arguments), this.id = "islamic";
  }
};
var IslamicUmalquraHelper = class extends IslamicBaseHelper {
  constructor() {
    super(...arguments), this.id = "islamic-umalqura";
  }
};
var IslamicTblaHelper = class extends IslamicBaseHelper {
  constructor() {
    super(...arguments), this.id = "islamic-tbla";
  }
};
var IslamicCivilHelper = class extends IslamicBaseHelper {
  constructor() {
    super(...arguments), this.id = "islamic-civil";
  }
};
var IslamicRgsaHelper = class extends IslamicBaseHelper {
  constructor() {
    super(...arguments), this.id = "islamic-rgsa";
  }
};
var IslamicCcHelper = class extends IslamicBaseHelper {
  constructor() {
    super(...arguments), this.id = "islamicc";
  }
};
var PersianHelper = class extends HelperBase {
  constructor() {
    super(...arguments), this.id = "persian", this.calendarType = "solar";
  }
  inLeapYear(e2, t2) {
    return 30 === this.daysInMonth({ year: e2.year, month: 12, day: 1 }, t2);
  }
  monthsInYear() {
    return 12;
  }
  minimumMonthLength(e2) {
    const { month: t2 } = e2;
    return 12 === t2 ? 29 : t2 <= 6 ? 31 : 30;
  }
  maximumMonthLength(e2) {
    const { month: t2 } = e2;
    return 12 === t2 ? 30 : t2 <= 6 ? 31 : 30;
  }
  maxLengthOfMonthCodeInAnyYear(e2) {
    return Qo(e2) <= 6 ? 31 : 30;
  }
  estimateIsoDate(e2) {
    const { year: t2 } = this.adjustCalendarDate(e2);
    return { year: t2 + 621, month: 1, day: 1 };
  }
};
var IndianHelper = class extends HelperBase {
  constructor() {
    super(...arguments), this.id = "indian", this.calendarType = "solar", this.months = { 1: { length: 30, month: 3, day: 22, leap: { length: 31, month: 3, day: 21 } }, 2: { length: 31, month: 4, day: 21 }, 3: { length: 31, month: 5, day: 22 }, 4: { length: 31, month: 6, day: 22 }, 5: { length: 31, month: 7, day: 23 }, 6: { length: 31, month: 8, day: 23 }, 7: { length: 30, month: 9, day: 23 }, 8: { length: 30, month: 10, day: 23 }, 9: { length: 30, month: 11, day: 22 }, 10: { length: 30, month: 12, day: 22 }, 11: { length: 30, month: 1, nextYear: true, day: 21 }, 12: { length: 30, month: 2, nextYear: true, day: 20 } }, this.vulnerableToBceBug = "10/11/-79 Saka" !== (/* @__PURE__ */ new Date("0000-01-01T00:00Z")).toLocaleDateString("en-US-u-ca-indian", { timeZone: "UTC" });
  }
  inLeapYear(e2) {
    return oi(e2.year + 78);
  }
  monthsInYear() {
    return 12;
  }
  minimumMonthLength(e2) {
    return this.getMonthInfo(e2).length;
  }
  maximumMonthLength(e2) {
    return this.getMonthInfo(e2).length;
  }
  maxLengthOfMonthCodeInAnyYear(e2) {
    const t2 = Qo(e2);
    let n2 = this.months[t2];
    return n2 = n2.leap ?? n2, n2.length;
  }
  getMonthInfo(e2) {
    const { month: t2 } = e2;
    let n2 = this.months[t2];
    if (void 0 === n2) throw new RangeError(`Invalid month: ${t2}`);
    return this.inLeapYear(e2) && n2.leap && (n2 = n2.leap), n2;
  }
  estimateIsoDate(e2) {
    const t2 = this.adjustCalendarDate(e2), n2 = this.getMonthInfo(t2);
    return Or(t2.year + 78 + (n2.nextYear ? 1 : 0), n2.month, n2.day + t2.day - 1);
  }
  checkIcuBugs(e2) {
    if (this.vulnerableToBceBug && e2.year < 1) throw new RangeError(`calendar '${this.id}' is broken for ISO dates before 0001-01-01 (see https://bugs.chromium.org/p/v8/issues/detail?id=10529)`);
  }
};
function oi(e2) {
  return e2 % 4 == 0 && (e2 % 100 != 0 || e2 % 400 == 0);
}
var GregorianBaseHelperFixedEpoch = class extends HelperBase {
  constructor(e2, t2) {
    super(), this.calendarType = "solar", this.id = e2, this.isoEpoch = t2;
  }
  inLeapYear(e2) {
    const { year: t2 } = this.estimateIsoDate({ month: 1, day: 1, year: e2.year });
    return oi(t2);
  }
  monthsInYear() {
    return 12;
  }
  minimumMonthLength(e2) {
    const { month: t2 } = e2;
    return 2 === t2 ? this.inLeapYear(e2) ? 29 : 28 : [4, 6, 9, 11].indexOf(t2) >= 0 ? 30 : 31;
  }
  maximumMonthLength(e2) {
    return this.minimumMonthLength(e2);
  }
  maxLengthOfMonthCodeInAnyYear(e2) {
    return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Qo(e2) - 1];
  }
  estimateIsoDate(e2) {
    const t2 = this.adjustCalendarDate(e2);
    return St(t2.year + this.isoEpoch.year, t2.month + this.isoEpoch.month, t2.day + this.isoEpoch.day, "constrain");
  }
};
var GregorianBaseHelper = class extends HelperBase {
  constructor(e2, t2) {
    super(), this.hasEra = true, this.calendarType = "solar", this.id = e2;
    const { eras: n2, anchorEra: r2 } = (function(e3) {
      let t3, n3 = e3;
      if (0 === n3.length) throw new RangeError("Invalid era data: eras are required");
      if (1 === n3.length && n3[0].reverseOf) throw new RangeError("Invalid era data: anchor era cannot count years backwards");
      if (1 === n3.length && !n3[0].code) throw new RangeError("Invalid era data: at least one named era is required");
      if (n3.filter(((e4) => null != e4.reverseOf)).length > 1) throw new RangeError("Invalid era data: only one era can count years backwards");
      n3.forEach(((e4) => {
        if (e4.isAnchor || !e4.anchorEpoch && !e4.reverseOf) {
          if (t3) throw new RangeError("Invalid era data: cannot have multiple anchor eras");
          t3 = e4, e4.anchorEpoch = { year: e4.hasYearZero ? 0 : 1 };
        } else if (!e4.code) throw new RangeError("If era name is blank, it must be the anchor era");
      })), n3 = n3.filter(((e4) => e4.code)), n3.forEach(((e4) => {
        const { reverseOf: t4 } = e4;
        if (t4) {
          const r4 = n3.find(((e5) => e5.code === t4));
          if (void 0 === r4) throw new RangeError(`Invalid era data: unmatched reverseOf era: ${t4}`);
          e4.reverseOf = r4, e4.anchorEpoch = r4.anchorEpoch, e4.isoEpoch = r4.isoEpoch;
        }
        void 0 === e4.anchorEpoch.month && (e4.anchorEpoch.month = 1), void 0 === e4.anchorEpoch.day && (e4.anchorEpoch.day = 1);
      })), n3.sort(((e4, t4) => {
        if (e4.reverseOf) return 1;
        if (t4.reverseOf) return -1;
        if (!e4.isoEpoch || !t4.isoEpoch) throw new RangeError("Invalid era data: missing ISO epoch");
        return t4.isoEpoch.year - e4.isoEpoch.year;
      }));
      const r3 = n3[n3.length - 1].reverseOf;
      if (r3 && r3 !== n3[n3.length - 2]) throw new RangeError("Invalid era data: invalid reverse-sign era");
      return n3.forEach(((e4, t4) => {
        e4.genericName = "era" + (n3.length - 1 - t4);
      })), { eras: n3, anchorEra: t3 || n3[0] };
    })(t2);
    this.anchorEra = r2, this.eras = n2;
  }
  inLeapYear(e2) {
    const { year: t2 } = this.estimateIsoDate({ month: 1, day: 1, year: e2.year });
    return oi(t2);
  }
  monthsInYear() {
    return 12;
  }
  minimumMonthLength(e2) {
    const { month: t2 } = e2;
    return 2 === t2 ? this.inLeapYear(e2) ? 29 : 28 : [4, 6, 9, 11].indexOf(t2) >= 0 ? 30 : 31;
  }
  maximumMonthLength(e2) {
    return this.minimumMonthLength(e2);
  }
  maxLengthOfMonthCodeInAnyYear(e2) {
    return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Qo(e2) - 1];
  }
  completeEraYear(e2) {
    const t2 = (t3, n3, r3) => {
      const o3 = e2[t3];
      if (null != o3 && o3 != n3 && !(r3 || []).includes(o3)) {
        const e3 = r3?.[0];
        throw new RangeError(`Input ${t3} ${o3} doesn't match calculated value ${e3 ? `${n3} (also called ${e3})` : n3}`);
      }
    }, n2 = (t3) => {
      let n3;
      const r3 = { ...e2, year: t3 }, o3 = this.eras.find(((e3, o4) => {
        if (o4 === this.eras.length - 1) {
          if (e3.reverseOf) {
            if (t3 > 0) throw new RangeError(`Signed year ${t3} is invalid for era ${e3.code}`);
            return n3 = e3.anchorEpoch.year - t3, true;
          }
          return n3 = t3 - e3.anchorEpoch.year + (e3.hasYearZero ? 0 : 1), true;
        }
        return this.compareCalendarDates(r3, e3.anchorEpoch) >= 0 && (n3 = t3 - e3.anchorEpoch.year + (e3.hasYearZero ? 0 : 1), true);
      }));
      if (!o3) throw new RangeError(`Year ${t3} was not matched by any era`);
      return { eraYear: n3, era: o3.code, eraNames: o3.names };
    };
    let { year: r2, eraYear: o2, era: i2 } = e2;
    if (null != r2) {
      const e3 = n2(r2);
      ({ eraYear: o2, era: i2 } = e3), t2("era", i2, e3?.eraNames), t2("eraYear", o2);
    } else {
      if (null == o2) throw new RangeError("Either year or eraYear and era are required");
      {
        if (void 0 === i2) throw new RangeError("era and eraYear must be provided together");
        const e3 = this.eras.find((({ code: e4, names: t3 = [] }) => e4 === i2 || t3.includes(i2)));
        if (!e3) throw new RangeError(`Era ${i2} (ISO year ${o2}) was not matched by any era`);
        r2 = e3.reverseOf ? e3.anchorEpoch.year - o2 : o2 + e3.anchorEpoch.year - (e3.hasYearZero ? 0 : 1), t2("year", r2), { eraYear: o2, era: i2 } = n2(r2);
      }
    }
    return { ...e2, year: r2, eraYear: o2, era: i2 };
  }
  adjustCalendarDate(e2, t2, n2 = "constrain") {
    let r2 = e2;
    const { month: o2, monthCode: i2 } = r2;
    return void 0 === o2 && (r2 = { ...r2, month: Qo(i2) }), this.validateCalendarDate(r2), r2 = this.completeEraYear(r2), super.adjustCalendarDate(r2, t2, n2);
  }
  estimateIsoDate(e2) {
    const t2 = this.adjustCalendarDate(e2), { year: n2, month: r2, day: o2 } = t2, { anchorEra: i2 } = this;
    return St(n2 + i2.isoEpoch.year - (i2.hasYearZero ? 0 : 1), r2, o2, "constrain");
  }
};
var SameMonthDayAsGregorianBaseHelper = class extends GregorianBaseHelper {
  constructor(e2, t2) {
    super(e2, t2);
  }
  isoToCalendarDate(e2) {
    const { year: t2, month: n2, day: r2 } = e2, o2 = ei(n2), i2 = t2 - this.anchorEra.isoEpoch.year + 1;
    return this.completeEraYear({ year: i2, month: n2, monthCode: o2, day: r2 });
  }
};
var ii = { inLeapYear(e2) {
  const { year: t2 } = e2;
  return (t2 + 1) % 4 == 0;
}, monthsInYear: () => 13, minimumMonthLength(e2) {
  const { month: t2 } = e2;
  return 13 === t2 ? this.inLeapYear(e2) ? 6 : 5 : 30;
}, maximumMonthLength(e2) {
  return this.minimumMonthLength(e2);
}, maxLengthOfMonthCodeInAnyYear: (e2) => "M13" === e2 ? 6 : 30 };
var OrthodoxBaseHelperFixedEpoch = class extends GregorianBaseHelperFixedEpoch {
  constructor(e2, t2) {
    super(e2, t2), this.inLeapYear = ii.inLeapYear, this.monthsInYear = ii.monthsInYear, this.minimumMonthLength = ii.minimumMonthLength, this.maximumMonthLength = ii.maximumMonthLength, this.maxLengthOfMonthCodeInAnyYear = ii.maxLengthOfMonthCodeInAnyYear;
  }
};
var OrthodoxBaseHelper = class extends GregorianBaseHelper {
  constructor(e2, t2) {
    super(e2, t2), this.inLeapYear = ii.inLeapYear, this.monthsInYear = ii.monthsInYear, this.minimumMonthLength = ii.minimumMonthLength, this.maximumMonthLength = ii.maximumMonthLength, this.maxLengthOfMonthCodeInAnyYear = ii.maxLengthOfMonthCodeInAnyYear;
  }
};
var EthioaaHelper = class extends OrthodoxBaseHelperFixedEpoch {
  constructor() {
    super("ethioaa", { year: -5492, month: 7, day: 17 });
  }
};
var CopticHelper = class extends OrthodoxBaseHelper {
  constructor() {
    super("coptic", [{ code: "coptic", isoEpoch: { year: 284, month: 8, day: 29 } }, { code: "coptic-inverse", reverseOf: "coptic" }]);
  }
};
var EthiopicHelper = class extends OrthodoxBaseHelper {
  constructor() {
    super("ethiopic", [{ code: "ethioaa", names: ["ethiopic-amete-alem", "mundi"], isoEpoch: { year: -5492, month: 7, day: 17 } }, { code: "ethiopic", names: ["incar"], isoEpoch: { year: 8, month: 8, day: 27 }, anchorEpoch: { year: 5501 } }]);
  }
};
var RocHelper = class extends SameMonthDayAsGregorianBaseHelper {
  constructor() {
    super("roc", [{ code: "roc", names: ["minguo"], isoEpoch: { year: 1912, month: 1, day: 1 } }, { code: "roc-inverse", names: ["before-roc"], reverseOf: "roc" }]);
  }
};
var BuddhistHelper = class extends GregorianBaseHelperFixedEpoch {
  constructor() {
    super("buddhist", { year: -543, month: 1, day: 1 });
  }
};
var GregoryHelper = class extends SameMonthDayAsGregorianBaseHelper {
  constructor() {
    super("gregory", [{ code: "gregory", names: ["ad", "ce"], isoEpoch: { year: 1, month: 1, day: 1 } }, { code: "gregory-inverse", names: ["be", "bce"], reverseOf: "gregory" }]);
  }
  reviseIntlEra(e2) {
    let { era: t2, eraYear: n2 } = e2;
    return "b" === t2 && (t2 = "gregory-inverse"), "a" === t2 && (t2 = "gregory"), { era: t2, eraYear: n2 };
  }
  getFirstDayOfWeek() {
    return 1;
  }
  getMinimalDaysInFirstWeek() {
    return 1;
  }
};
var JapaneseHelper = class extends SameMonthDayAsGregorianBaseHelper {
  constructor() {
    super("japanese", [{ code: "reiwa", isoEpoch: { year: 2019, month: 5, day: 1 }, anchorEpoch: { year: 2019, month: 5, day: 1 } }, { code: "heisei", isoEpoch: { year: 1989, month: 1, day: 8 }, anchorEpoch: { year: 1989, month: 1, day: 8 } }, { code: "showa", isoEpoch: { year: 1926, month: 12, day: 25 }, anchorEpoch: { year: 1926, month: 12, day: 25 } }, { code: "taisho", isoEpoch: { year: 1912, month: 7, day: 30 }, anchorEpoch: { year: 1912, month: 7, day: 30 } }, { code: "meiji", isoEpoch: { year: 1868, month: 9, day: 8 }, anchorEpoch: { year: 1868, month: 9, day: 8 } }, { code: "japanese", names: ["japanese", "gregory", "ad", "ce"], isoEpoch: { year: 1, month: 1, day: 1 } }, { code: "japanese-inverse", names: ["japanese-inverse", "gregory-inverse", "bc", "bce"], reverseOf: "japanese" }]), this.erasBeginMidYear = true;
  }
  reviseIntlEra(e2, t2) {
    const { era: n2, eraYear: r2 } = e2, { year: o2 } = t2;
    return this.eras.find(((e3) => e3.code === n2)) ? { era: n2, eraYear: r2 } : o2 < 1 ? { era: "japanese-inverse", eraYear: 1 - o2 } : { era: "japanese", eraYear: o2 };
  }
};
var ChineseBaseHelper = class extends HelperBase {
  constructor() {
    super(...arguments), this.calendarType = "lunisolar";
  }
  inLeapYear(e2, t2) {
    const n2 = this.getMonthList(e2.year, t2);
    return 13 === Object.entries(n2).length;
  }
  monthsInYear(e2, t2) {
    return this.inLeapYear(e2, t2) ? 13 : 12;
  }
  minimumMonthLength() {
    return 29;
  }
  maximumMonthLength() {
    return 30;
  }
  maxLengthOfMonthCodeInAnyYear(e2) {
    return ["M01L", "M09L", "M10L", "M11L", "M12L"].includes(e2) ? 29 : 30;
  }
  monthDaySearchStartYear(e2, t2) {
    const n2 = { M01L: [1651, 1651], M02L: [1947, 1765], M03L: [1966, 1955], M04L: [1963, 1944], M05L: [1971, 1952], M06L: [1960, 1941], M07L: [1968, 1938], M08L: [1957, 1718], M09L: [1832, 1832], M10L: [1870, 1870], M11L: [1814, 1814], M12L: [1890, 1890] }[e2] ?? [1972, 1972];
    return t2 < 30 ? n2[0] : n2[1];
  }
  getMonthList(e2, t2) {
    if (void 0 === e2) throw new TypeError("Missing year");
    const n2 = JSON.stringify({ func: "getMonthList", calendarYear: e2, id: this.id }), r2 = t2.get(n2);
    if (r2) return r2;
    const o2 = this.getFormatter(), i2 = (e3, t3) => {
      const n3 = ni({ isoYear: e3, isoMonth: 2, isoDay: 1 }), r3 = new Date(n3);
      r3.setUTCDate(t3 + 1);
      const i3 = o2.formatToParts(r3), a3 = i3.find(((e4) => "month" === e4.type)).value, s3 = +i3.find(((e4) => "day" === e4.type)).value, c3 = i3.find(((e4) => "relatedYear" === e4.type));
      let d3;
      if (void 0 === c3) throw new RangeError(`Intl.DateTimeFormat.formatToParts lacks relatedYear in ${this.id} calendar. Try Node 14+ or modern browsers.`);
      return d3 = +c3.value, { calendarMonthString: a3, calendarDay: s3, calendarYearToVerify: d3 };
    };
    let a2 = 17, { calendarMonthString: s2, calendarDay: c2, calendarYearToVerify: d2 } = i2(e2, a2);
    "1" !== s2 && (a2 += 29, { calendarMonthString: s2, calendarDay: c2 } = i2(e2, a2)), a2 -= c2 - 5;
    const h2 = {};
    let u2, l2, m2 = 1, f2 = false;
    do {
      ({ calendarMonthString: s2, calendarDay: c2, calendarYearToVerify: d2 } = i2(e2, a2)), u2 && (h2[l2].daysInMonth = u2 + 30 - c2), d2 !== e2 ? f2 = true : (h2[s2] = { monthIndex: m2++ }, a2 += 30), u2 = c2, l2 = s2;
    } while (!f2);
    return h2[l2].daysInMonth = u2 + 30 - c2, t2.set(n2, h2), h2;
  }
  estimateIsoDate(e2) {
    const { year: t2, month: n2 } = e2;
    return { year: t2, month: n2 >= 12 ? 12 : n2 + 1, day: 1 };
  }
  adjustCalendarDate(e2, t2, n2 = "constrain", r2 = false) {
    let { year: o2, month: i2, monthExtra: a2, day: s2, monthCode: c2 } = e2;
    if (void 0 === o2) throw new TypeError("Missing property: year");
    if (r2) {
      if (a2 && "bis" !== a2) throw new RangeError(`Unexpected leap month suffix: ${a2}`);
      const e3 = ei(i2, void 0 !== a2), n3 = `${i2}${a2 || ""}`, r3 = this.getMonthList(o2, t2)[n3];
      if (void 0 === r3) throw new RangeError(`Unmatched month ${n3} in Chinese year ${o2}`);
      return i2 = r3.monthIndex, { year: o2, month: i2, day: s2, monthCode: e3 };
    }
    if (this.validateCalendarDate(e2), void 0 === i2) {
      const e3 = this.getMonthList(o2, t2);
      let r3 = c2.replace(/^M|L$/g, ((e4) => "L" === e4 ? "bis" : ""));
      "0" === r3[0] && (r3 = r3.slice(1));
      let a3 = e3[r3];
      if (i2 = a3 && a3.monthIndex, void 0 === i2 && c2.endsWith("L") && "M13L" != c2 && "constrain" === n2) {
        const t3 = +c2.replace(/^M0?|L$/g, "");
        a3 = e3[t3], a3 && (i2 = a3.monthIndex, c2 = ei(t3));
      }
      if (void 0 === i2) throw new RangeError(`Unmatched month ${c2} in Chinese year ${o2}`);
    } else if (void 0 === c2) {
      const e3 = this.getMonthList(o2, t2), r3 = Object.entries(e3), a3 = r3.length;
      "reject" === n2 ? (Nr(i2, 1, a3), Nr(s2, 1, this.maximumMonthLength())) : (i2 = jr(i2, 1, a3), s2 = jr(s2, 1, this.maximumMonthLength()));
      const d2 = r3.find(((e4) => e4[1].monthIndex === i2));
      if (void 0 === d2) throw new RangeError(`Invalid month ${i2} in Chinese year ${o2}`);
      c2 = ei(+d2[0].replace("bis", ""), -1 !== d2[0].indexOf("bis"));
    } else {
      const e3 = this.getMonthList(o2, t2);
      let n3 = c2.replace(/^M|L$/g, ((e4) => "L" === e4 ? "bis" : ""));
      "0" === n3[0] && (n3 = n3.slice(1));
      const r3 = e3[n3];
      if (!r3) throw new RangeError(`Unmatched monthCode ${c2} in Chinese year ${o2}`);
      if (i2 !== r3.monthIndex) throw new RangeError(`monthCode ${c2} doesn't correspond to month ${i2} in Chinese year ${o2}`);
    }
    return { ...e2, year: o2, month: i2, monthCode: c2, day: s2 };
  }
};
var ChineseHelper = class extends ChineseBaseHelper {
  constructor() {
    super(...arguments), this.id = "chinese";
  }
};
var DangiHelper = class extends ChineseBaseHelper {
  constructor() {
    super(...arguments), this.id = "dangi";
  }
};
var NonIsoCalendar = class {
  constructor(e2) {
    this.helper = e2;
  }
  extraFields(e2) {
    return this.helper.hasEra && e2.includes("year") ? ["era", "eraYear"] : [];
  }
  resolveFields(e2) {
    if ("lunisolar" !== this.helper.calendarType) {
      const t2 = new OneObjectCache();
      ti(e2, void 0, this.helper.monthsInYear({ year: e2.year ?? 1972 }, t2));
    }
  }
  dateToISO(e2, t2) {
    const n2 = new OneObjectCache(), r2 = this.helper.calendarToIsoDate(e2, t2, n2);
    return n2.setObject(r2), r2;
  }
  monthDayToISOReferenceDate(e2, t2) {
    const n2 = new OneObjectCache(), r2 = this.helper.monthDayFromFields(e2, t2, n2);
    return n2.setObject(r2), r2;
  }
  fieldKeysToIgnore(e2) {
    const t2 = /* @__PURE__ */ new Set();
    for (let n2 = 0; n2 < e2.length; n2++) {
      const r2 = e2[n2];
      switch (t2.add(r2), r2) {
        case "era":
          t2.add("eraYear"), t2.add("year");
          break;
        case "eraYear":
          t2.add("era"), t2.add("year");
          break;
        case "year":
          t2.add("era"), t2.add("eraYear");
          break;
        case "month":
          t2.add("monthCode"), this.helper.erasBeginMidYear && (t2.add("era"), t2.add("eraYear"));
          break;
        case "monthCode":
          t2.add("month"), this.helper.erasBeginMidYear && (t2.add("era"), t2.add("eraYear"));
          break;
        case "day":
          this.helper.erasBeginMidYear && (t2.add("era"), t2.add("eraYear"));
      }
    }
    return Go(t2);
  }
  dateAdd(e2, { years: t2, months: n2, weeks: r2, days: o2 }, i2) {
    const a2 = OneObjectCache.getCacheForObject(e2), s2 = this.helper.isoToCalendarDate(e2, a2), c2 = this.helper.addCalendar(s2, { years: t2, months: n2, weeks: r2, days: o2 }, i2, a2), d2 = this.helper.calendarToIsoDate(c2, "constrain", a2);
    return OneObjectCache.getCacheForObject(d2) || new OneObjectCache(a2).setObject(d2), d2;
  }
  dateUntil(e2, t2, n2) {
    const r2 = OneObjectCache.getCacheForObject(e2), o2 = OneObjectCache.getCacheForObject(t2), i2 = this.helper.isoToCalendarDate(e2, r2), a2 = this.helper.isoToCalendarDate(t2, o2);
    return this.helper.untilCalendar(i2, a2, n2, r2);
  }
  isoToDate(e2, t2) {
    const n2 = OneObjectCache.getCacheForObject(e2), r2 = this.helper.isoToCalendarDate(e2, n2);
    if (t2.dayOfWeek && (r2.dayOfWeek = Xo.iso8601.isoToDate(e2, { dayOfWeek: true }).dayOfWeek), t2.dayOfYear) {
      const e3 = this.helper.startOfCalendarYear(r2), t3 = this.helper.calendarDaysUntil(e3, r2, n2);
      r2.dayOfYear = t3 + 1;
    }
    if (t2.weekOfYear && (r2.weekOfYear = Ko(this.helper.id, e2)), r2.daysInWeek = 7, t2.daysInMonth && (r2.daysInMonth = this.helper.daysInMonth(r2, n2)), t2.daysInYear) {
      const e3 = this.helper.startOfCalendarYear(r2), t3 = this.helper.addCalendar(e3, { years: 1 }, "constrain", n2);
      r2.daysInYear = this.helper.calendarDaysUntil(e3, t3, n2);
    }
    return t2.monthsInYear && (r2.monthsInYear = this.helper.monthsInYear(r2, n2)), t2.inLeapYear && (r2.inLeapYear = this.helper.inLeapYear(r2, n2)), r2;
  }
  getFirstDayOfWeek() {
    return this.helper.getFirstDayOfWeek();
  }
  getMinimalDaysInFirstWeek() {
    return this.helper.getMinimalDaysInFirstWeek();
  }
};
for (const e2 of [HebrewHelper, PersianHelper, EthiopicHelper, EthioaaHelper, CopticHelper, ChineseHelper, DangiHelper, RocHelper, IndianHelper, BuddhistHelper, GregoryHelper, JapaneseHelper, IslamicHelper, IslamicUmalquraHelper, IslamicTblaHelper, IslamicCivilHelper, IslamicRgsaHelper, IslamicCcHelper]) {
  const t2 = new e2();
  Xo[t2.id] = new NonIsoCalendar(t2);
}
se("calendarImpl", (function(e2) {
  return Xo[e2];
}));
var ai = Intl.DateTimeFormat;
function si(e2, t2) {
  let n2 = re(e2, t2);
  return "function" == typeof n2 && (n2 = new ai(re(e2, G), n2(re(e2, K))), (function(e3, t3, n3) {
    const r2 = Q(e3);
    if (void 0 === r2) throw new TypeError("Missing slots for the given container");
    if (void 0 === r2[t3]) throw new TypeError(`tried to reset ${t3} which was not set`);
    r2[t3] = n3;
  })(e2, t2, n2)), n2;
}
function ci(e2) {
  return ne(e2, q);
}
var DateTimeFormatImpl = class {
  constructor(e2 = void 0, t2 = void 0) {
    !(function(e3, t3, n2) {
      const r2 = void 0 !== n2;
      let o2;
      if (r2) {
        const e4 = ["localeMatcher", "calendar", "numberingSystem", "hour12", "hourCycle", "timeZone", "weekday", "era", "year", "month", "day", "dayPeriod", "hour", "minute", "second", "fractionalSecondDigits", "timeZoneName", "formatMatcher", "dateStyle", "timeStyle"];
        o2 = (function(e5) {
          if (null == e5) throw new TypeError(`Expected object not ${e5}`);
          return Object(e5);
        })(n2);
        const t4 = /* @__PURE__ */ Object.create(null);
        for (let n3 = 0; n3 < e4.length; n3++) {
          const r3 = e4[n3];
          Object.prototype.hasOwnProperty.call(o2, r3) && (t4[r3] = o2[r3]);
        }
        o2 = t4;
      } else o2 = /* @__PURE__ */ Object.create(null);
      const i2 = new ai(t3, o2), a2 = i2.resolvedOptions();
      if (te(e3), r2) {
        const t4 = Object.assign(/* @__PURE__ */ Object.create(null), a2);
        for (const e4 in t4) Object.prototype.hasOwnProperty.call(o2, e4) || delete t4[e4];
        t4.hour12 = o2.hour12, t4.hourCycle = o2.hourCycle, oe(e3, K, t4);
      } else oe(e3, K, o2);
      oe(e3, G, a2.locale), oe(e3, q, i2), oe(e3, W, a2.timeZone), oe(e3, J, a2.calendar), oe(e3, B, vi), oe(e3, Z, gi), oe(e3, F, wi), oe(e3, H, pi), oe(e3, z, bi), oe(e3, A, Di);
      const s2 = r2 ? o2.timeZone : void 0;
      if (void 0 === s2) oe(e3, _, a2.timeZone);
      else {
        const t4 = We(s2);
        if (t4.startsWith("\u2212")) throw new RangeError("Unicode minus (U+2212) is not supported in time zone offsets");
        oe(e3, _, Bn(t4));
      }
    })(this, e2, t2);
  }
  get format() {
    vt(this, ci);
    const e2 = ui.bind(this);
    return Object.defineProperties(e2, { length: { value: 1, enumerable: false, writable: false, configurable: true }, name: { value: "", enumerable: false, writable: false, configurable: true } }), e2;
  }
  formatRange(e2, t2) {
    return vt(this, ci), mi.call(this, e2, t2);
  }
  formatToParts(e2, ...t2) {
    return vt(this, ci), li.call(this, e2, ...t2);
  }
  formatRangeToParts(e2, t2) {
    return vt(this, ci), fi.call(this, e2, t2);
  }
  resolvedOptions() {
    return vt(this, ci), hi.call(this);
  }
};
"formatToParts" in ai.prototype || delete DateTimeFormatImpl.prototype.formatToParts, "formatRangeToParts" in ai.prototype || delete DateTimeFormatImpl.prototype.formatRangeToParts;
var di = function(e2 = void 0, t2 = void 0) {
  return new DateTimeFormatImpl(e2, t2);
};
function hi() {
  const e2 = re(this, q).resolvedOptions();
  return e2.timeZone = re(this, _), e2;
}
function ui(e2, ...t2) {
  let n2, r2, o2 = $i(e2, this);
  return o2.formatter ? (n2 = o2.formatter, r2 = [No(o2.epochNs, "floor")]) : (n2 = re(this, q), r2 = [e2, ...t2]), n2.format(...r2);
}
function li(e2, ...t2) {
  let n2, r2, o2 = $i(e2, this);
  return o2.formatter ? (n2 = o2.formatter, r2 = [No(o2.epochNs, "floor")]) : (n2 = re(this, q), r2 = [e2, ...t2]), n2.formatToParts(...r2);
}
function mi(e2, t2) {
  if (void 0 === e2 || void 0 === t2) throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");
  const n2 = Ci(e2), r2 = Ci(t2);
  let o2, i2 = [n2, r2];
  if (Ii(n2) !== Ii(r2)) throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");
  if (Ii(n2)) {
    if (!Oi(n2, r2)) throw new TypeError("Intl.DateTimeFormat.formatRange accepts two values of the same type");
    const { epochNs: e3, formatter: t3 } = $i(n2, this), { epochNs: a2, formatter: s2 } = $i(r2, this);
    t3 && (o2 = t3, i2 = [No(e3, "floor"), No(a2, "floor")]);
  }
  return o2 || (o2 = re(this, q)), o2.formatRange(...i2);
}
function fi(e2, t2) {
  if (void 0 === e2 || void 0 === t2) throw new TypeError("Intl.DateTimeFormat.formatRange requires two values");
  const n2 = Ci(e2), r2 = Ci(t2);
  let o2, i2 = [n2, r2];
  if (Ii(n2) !== Ii(r2)) throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");
  if (Ii(n2)) {
    if (!Oi(n2, r2)) throw new TypeError("Intl.DateTimeFormat.formatRangeToParts accepts two values of the same type");
    const { epochNs: e3, formatter: t3 } = $i(n2, this), { epochNs: a2, formatter: s2 } = $i(r2, this);
    t3 && (o2 = t3, i2 = [No(e3, "floor"), No(a2, "floor")]);
  }
  return o2 || (o2 = re(this, q)), o2.formatRangeToParts(...i2);
}
function yi(e2 = {}, t2 = {}) {
  const n2 = Object.assign({}, e2), r2 = ["year", "month", "day", "hour", "minute", "second", "weekday", "dayPeriod", "timeZoneName", "dateStyle", "timeStyle"];
  for (let e3 = 0; e3 < r2.length; e3++) {
    const o2 = r2[e3];
    n2[o2] = o2 in t2 ? t2[o2] : n2[o2], false !== n2[o2] && void 0 !== n2[o2] || delete n2[o2];
  }
  return n2;
}
function pi(e2) {
  const t2 = yi(e2, { year: false, month: false, day: false, weekday: false, timeZoneName: false, dateStyle: false });
  if ("long" !== t2.timeStyle && "full" !== t2.timeStyle || (delete t2.timeStyle, Object.assign(t2, { hour: "numeric", minute: "2-digit", second: "2-digit" })), !Mi(t2)) {
    if (Ei(e2)) throw new TypeError(`cannot format Temporal.PlainTime with options [${Object.keys(e2)}]`);
    Object.assign(t2, { hour: "numeric", minute: "numeric", second: "numeric" });
  }
  return t2;
}
function gi(e2) {
  const t2 = { short: { year: "2-digit", month: "numeric" }, medium: { year: "numeric", month: "short" }, long: { year: "numeric", month: "long" }, full: { year: "numeric", month: "long" } }, n2 = yi(e2, { day: false, hour: false, minute: false, second: false, weekday: false, dayPeriod: false, timeZoneName: false, timeStyle: false });
  if ("dateStyle" in n2 && n2.dateStyle) {
    const e3 = n2.dateStyle;
    delete n2.dateStyle, Object.assign(n2, t2[e3]);
  }
  if (!("year" in n2 || "month" in n2 || "era" in n2)) {
    if (Ei(e2)) throw new TypeError(`cannot format PlainYearMonth with options [${Object.keys(e2)}]`);
    Object.assign(n2, { year: "numeric", month: "numeric" });
  }
  return n2;
}
function wi(e2) {
  const t2 = { short: { month: "numeric", day: "numeric" }, medium: { month: "short", day: "numeric" }, long: { month: "long", day: "numeric" }, full: { month: "long", day: "numeric" } }, n2 = yi(e2, { year: false, hour: false, minute: false, second: false, weekday: false, dayPeriod: false, timeZoneName: false, timeStyle: false });
  if ("dateStyle" in n2 && n2.dateStyle) {
    const e3 = n2.dateStyle;
    delete n2.dateStyle, Object.assign(n2, t2[e3]);
  }
  if (!("month" in n2) && !("day" in n2)) {
    if (Ei(e2)) throw new TypeError(`cannot format PlainMonthDay with options [${Object.keys(e2)}]`);
    Object.assign(n2, { month: "numeric", day: "numeric" });
  }
  return n2;
}
function vi(e2) {
  const t2 = yi(e2, { hour: false, minute: false, second: false, dayPeriod: false, timeZoneName: false, timeStyle: false });
  if (!Ti(t2)) {
    if (Ei(e2)) throw new TypeError(`cannot format PlainDate with options [${Object.keys(e2)}]`);
    Object.assign(t2, { year: "numeric", month: "numeric", day: "numeric" });
  }
  return t2;
}
function bi(e2) {
  const t2 = yi(e2, { timeZoneName: false });
  if (("long" === t2.timeStyle || "full" === t2.timeStyle) && (delete t2.timeStyle, Object.assign(t2, { hour: "numeric", minute: "2-digit", second: "2-digit" }), t2.dateStyle)) {
    const e3 = { short: { year: "numeric", month: "numeric", day: "numeric" }, medium: { year: "numeric", month: "short", day: "numeric" }, long: { year: "numeric", month: "long", day: "numeric" }, full: { year: "numeric", month: "long", day: "numeric", weekday: "long" } };
    Object.assign(t2, e3[t2.dateStyle]), delete t2.dateStyle;
  }
  if (!Mi(t2) && !Ti(t2)) {
    if (Ei(e2)) throw new TypeError(`cannot format PlainDateTime with options [${Object.keys(e2)}]`);
    Object.assign(t2, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
  }
  return t2;
}
function Di(e2) {
  let t2 = e2;
  return Mi(t2) || Ti(t2) || (t2 = Object.assign({}, t2, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })), t2;
}
function Ti(e2) {
  return "year" in e2 || "month" in e2 || "day" in e2 || "weekday" in e2 || "dateStyle" in e2 || "era" in e2;
}
function Mi(e2) {
  return "hour" in e2 || "minute" in e2 || "second" in e2 || "timeStyle" in e2 || "dayPeriod" in e2 || "fractionalSecondDigits" in e2;
}
function Ei(e2) {
  return Ti(e2) || Mi(e2) || "dateStyle" in e2 || "timeStyle" in e2 || "timeZoneName" in e2;
}
function Ii(e2) {
  return mt(e2) || ft(e2) || yt(e2) || wt(e2) || pt(e2) || gt(e2) || ut(e2);
}
function Ci(e2) {
  return Ii(e2) ? e2 : qe(e2);
}
function Oi(e2, t2) {
  return !(!Ii(e2) || !Ii(t2) || ft(e2) && !ft(t2) || mt(e2) && !mt(t2) || yt(e2) && !yt(t2) || wt(e2) && !wt(t2) || pt(e2) && !pt(t2) || gt(e2) && !gt(t2) || ut(e2) && !ut(t2));
}
function $i(e2, t2) {
  if (ft(e2)) {
    const n2 = { isoDate: { year: 1970, month: 1, day: 1 }, time: re(e2, M) };
    return { epochNs: An(re(t2, W), n2, "compatible"), formatter: si(t2, H) };
  }
  if (pt(e2)) {
    const n2 = re(e2, E), r2 = re(t2, J);
    if (n2 !== r2) throw new RangeError(`cannot format PlainYearMonth with calendar ${n2} in locale with calendar ${r2}`);
    const o2 = xt(re(e2, D), { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
    return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, Z) };
  }
  if (gt(e2)) {
    const n2 = re(e2, E), r2 = re(t2, J);
    if (n2 !== r2) throw new RangeError(`cannot format PlainMonthDay with calendar ${n2} in locale with calendar ${r2}`);
    const o2 = xt(re(e2, D), { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
    return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, F) };
  }
  if (mt(e2)) {
    const n2 = re(e2, E), r2 = re(t2, J);
    if ("iso8601" !== n2 && n2 !== r2) throw new RangeError(`cannot format PlainDate with calendar ${n2} in locale with calendar ${r2}`);
    const o2 = xt(re(e2, D), { deltaDays: 0, hour: 12, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
    return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, B) };
  }
  if (yt(e2)) {
    const n2 = re(e2, E), r2 = re(t2, J);
    if ("iso8601" !== n2 && n2 !== r2) throw new RangeError(`cannot format PlainDateTime with calendar ${n2} in locale with calendar ${r2}`);
    const o2 = re(e2, T);
    return { epochNs: An(re(t2, W), o2, "compatible"), formatter: si(t2, z) };
  }
  if (wt(e2)) throw new TypeError("Temporal.ZonedDateTime not supported in DateTimeFormat methods. Use toLocaleString() instead.");
  return ut(e2) ? { epochNs: re(e2, b), formatter: si(t2, A) } : {};
}
function Yi(e2) {
  const t2 = /* @__PURE__ */ Object.create(null);
  return t2.years = re(e2, Y), t2.months = re(e2, R), t2.weeks = re(e2, S), t2.days = re(e2, j), t2.hours = re(e2, k), t2.minutes = re(e2, N), t2.seconds = re(e2, x), t2.milliseconds = re(e2, L), t2.microseconds = re(e2, P), t2.nanoseconds = re(e2, U), t2;
}
DateTimeFormatImpl.prototype.constructor = di, Object.defineProperty(di, "prototype", { value: DateTimeFormatImpl.prototype, writable: false, enumerable: false, configurable: false }), di.supportedLocalesOf = ai.supportedLocalesOf, ae(di, "Intl.DateTimeFormat");
var { format: Ri, formatToParts: Si } = Intl.DurationFormat?.prototype ?? /* @__PURE__ */ Object.create(null);
function ji(e2) {
  Intl.DurationFormat.prototype.resolvedOptions.call(this);
  const t2 = Yi(sn(e2));
  return Ri.call(this, t2);
}
Intl.DurationFormat?.prototype && (Intl.DurationFormat.prototype.format = ji, Intl.DurationFormat.prototype.formatToParts = function(e2) {
  Intl.DurationFormat.prototype.resolvedOptions.call(this);
  const t2 = Yi(sn(e2));
  return Si.call(this, t2);
});
var ki = Object.freeze({ __proto__: null, DateTimeFormat: di, ModifiedIntlDurationFormatPrototypeFormat: ji });
var Instant = class {
  constructor(e2) {
    if (arguments.length < 1) throw new TypeError("missing argument: epochNanoseconds is required");
    In(this, Lo(e2));
  }
  get epochMilliseconds() {
    return vt(this, ut), No(re(this, b), "floor");
  }
  get epochNanoseconds() {
    return vt(this, ut), ko(import_jsbi.default.BigInt(re(this, b)));
  }
  add(e2) {
    return vt(this, ut), wo("add", this, e2);
  }
  subtract(e2) {
    return vt(this, ut), wo("subtract", this, e2);
  }
  until(e2, t2 = void 0) {
    return vt(this, ut), so("until", this, e2, t2);
  }
  since(e2, t2 = void 0) {
    return vt(this, ut), so("since", this, e2, t2);
  }
  round(e2) {
    if (vt(this, ut), void 0 === e2) throw new TypeError("options parameter is required");
    const t2 = "string" == typeof e2 ? Fo("smallestUnit", e2) : Zo(e2), n2 = Ft(t2), r2 = Ut(t2, "halfExpand"), o2 = Wt(t2, "smallestUnit", "time", qt);
    return Ht(n2, { hour: 24, minute: 1440, second: 86400, millisecond: 864e5, microsecond: 864e8, nanosecond: 864e11 }[o2], true), Cn(Io(re(this, b), n2, o2, r2));
  }
  equals(t2) {
    vt(this, ut);
    const n2 = cn(t2), r2 = re(this, b), o2 = re(n2, b);
    return import_jsbi.default.equal(import_jsbi.default.BigInt(r2), import_jsbi.default.BigInt(o2));
  }
  toString(e2 = void 0) {
    vt(this, ut);
    const t2 = Zo(e2), n2 = zt(t2), r2 = Ut(t2, "trunc"), o2 = Wt(t2, "smallestUnit", "time", void 0);
    if ("hour" === o2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
    let i2 = t2.timeZone;
    void 0 !== i2 && (i2 = Bn(i2));
    const { precision: a2, unit: s2, increment: c2 } = At(o2, n2);
    return Xn(Cn(Io(re(this, b), c2, s2, r2)), i2, a2);
  }
  toJSON() {
    return vt(this, ut), Xn(this, void 0, "auto");
  }
  toLocaleString(e2 = void 0, t2 = void 0) {
    return vt(this, ut), new di(e2, t2).format(this);
  }
  valueOf() {
    qo("Instant");
  }
  toZonedDateTimeISO(e2) {
    vt(this, ut);
    const t2 = Bn(e2);
    return $n(re(this, b), t2, "iso8601");
  }
  static fromEpochMilliseconds(e2) {
    return Cn(xo(qe(e2)));
  }
  static fromEpochNanoseconds(e2) {
    return Cn(Lo(e2));
  }
  static from(e2) {
    return cn(e2);
  }
  static compare(t2, n2) {
    const r2 = cn(t2), o2 = cn(n2), i2 = re(r2, b), a2 = re(o2, b);
    return import_jsbi.default.lessThan(i2, a2) ? -1 : import_jsbi.default.greaterThan(i2, a2) ? 1 : 0;
  }
};
ae(Instant, "Temporal.Instant");
var PlainDate = class {
  constructor(e2, t2, n2, r2 = "iso8601") {
    const o2 = _e(e2), i2 = _e(t2), a2 = _e(n2), s2 = zo(void 0 === r2 ? "iso8601" : Ve(r2));
    xr(o2, i2, a2), yn(this, { year: o2, month: i2, day: a2 }, s2);
  }
  get calendarId() {
    return vt(this, mt), re(this, E);
  }
  get era() {
    return Ni(this, "era");
  }
  get eraYear() {
    return Ni(this, "eraYear");
  }
  get year() {
    return Ni(this, "year");
  }
  get month() {
    return Ni(this, "month");
  }
  get monthCode() {
    return Ni(this, "monthCode");
  }
  get day() {
    return Ni(this, "day");
  }
  get dayOfWeek() {
    return Ni(this, "dayOfWeek");
  }
  get dayOfYear() {
    return Ni(this, "dayOfYear");
  }
  get weekOfYear() {
    return Ni(this, "weekOfYear")?.week;
  }
  get yearOfWeek() {
    return Ni(this, "weekOfYear")?.year;
  }
  get daysInWeek() {
    return Ni(this, "daysInWeek");
  }
  get daysInMonth() {
    return Ni(this, "daysInMonth");
  }
  get daysInYear() {
    return Ni(this, "daysInYear");
  }
  get monthsInYear() {
    return Ni(this, "monthsInYear");
  }
  get inLeapYear() {
    return Ni(this, "inLeapYear");
  }
  with(e2, t2 = void 0) {
    if (vt(this, mt), !Ae(e2)) throw new TypeError("invalid argument");
    bt(e2);
    const n2 = re(this, E);
    let r2 = en(n2, re(this, D));
    return r2 = Rn(n2, r2, tn(n2, e2, ["year", "month", "monthCode", "day"], [], "partial")), pn(Ln(n2, r2, Lt(Zo(t2))), n2);
  }
  withCalendar(e2) {
    vt(this, mt);
    const t2 = kn(e2);
    return pn(re(this, D), t2);
  }
  add(e2, t2 = void 0) {
    return vt(this, mt), vo("add", this, e2, t2);
  }
  subtract(e2, t2 = void 0) {
    return vt(this, mt), vo("subtract", this, e2, t2);
  }
  until(e2, t2 = void 0) {
    return vt(this, mt), co("until", this, e2, t2);
  }
  since(e2, t2 = void 0) {
    return vt(this, mt), co("since", this, e2, t2);
  }
  equals(e2) {
    vt(this, mt);
    const t2 = rn(e2);
    return 0 === Ro(re(this, D), re(t2, D)) && xn(re(this, E), re(t2, E));
  }
  toString(e2 = void 0) {
    return vt(this, mt), er(this, Zt(Zo(e2)));
  }
  toJSON() {
    return vt(this, mt), er(this);
  }
  toLocaleString(e2 = void 0, t2 = void 0) {
    return vt(this, mt), new di(e2, t2).format(this);
  }
  valueOf() {
    qo("PlainDate");
  }
  toPlainDateTime(e2 = void 0) {
    vt(this, mt);
    const t2 = un(e2);
    return wn(xt(re(this, D), t2), re(this, E));
  }
  toZonedDateTime(e2) {
    let t2, n2;
    if (vt(this, mt), Ae(e2)) {
      const r3 = e2.timeZone;
      void 0 === r3 ? t2 = Bn(e2) : (t2 = Bn(r3), n2 = e2.plainTime);
    } else t2 = Bn(e2);
    const r2 = re(this, D);
    let o2;
    return void 0 === n2 ? o2 = _n(t2, r2) : (n2 = hn(n2), o2 = An(t2, xt(r2, re(n2, M)), "compatible")), $n(o2, t2, re(this, E));
  }
  toPlainYearMonth() {
    vt(this, mt);
    const e2 = re(this, E);
    return En(Pn(e2, en(e2, re(this, D)), "constrain"), e2);
  }
  toPlainMonthDay() {
    vt(this, mt);
    const e2 = re(this, E);
    return bn(Un(e2, en(e2, re(this, D)), "constrain"), e2);
  }
  static from(e2, t2 = void 0) {
    return rn(e2, t2);
  }
  static compare(e2, t2) {
    const n2 = rn(e2), r2 = rn(t2);
    return Ro(re(n2, D), re(r2, D));
  }
};
function Ni(e2, t2) {
  vt(e2, mt);
  const n2 = re(e2, D);
  return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
}
ae(PlainDate, "Temporal.PlainDate");
var PlainDateTime = class {
  constructor(e2, t2, n2, r2 = 0, o2 = 0, i2 = 0, a2 = 0, s2 = 0, c2 = 0, d2 = "iso8601") {
    const h2 = _e(e2), u2 = _e(t2), l2 = _e(n2), m2 = void 0 === r2 ? 0 : _e(r2), f2 = void 0 === o2 ? 0 : _e(o2), y2 = void 0 === i2 ? 0 : _e(i2), p2 = void 0 === a2 ? 0 : _e(a2), g2 = void 0 === s2 ? 0 : _e(s2), w2 = void 0 === c2 ? 0 : _e(c2), v2 = zo(void 0 === d2 ? "iso8601" : Ve(d2));
    Ur(h2, u2, l2, m2, f2, y2, p2, g2, w2), gn(this, { isoDate: { year: h2, month: u2, day: l2 }, time: { hour: m2, minute: f2, second: y2, millisecond: p2, microsecond: g2, nanosecond: w2 } }, v2);
  }
  get calendarId() {
    return vt(this, yt), re(this, E);
  }
  get year() {
    return xi(this, "year");
  }
  get month() {
    return xi(this, "month");
  }
  get monthCode() {
    return xi(this, "monthCode");
  }
  get day() {
    return xi(this, "day");
  }
  get hour() {
    return Li(this, "hour");
  }
  get minute() {
    return Li(this, "minute");
  }
  get second() {
    return Li(this, "second");
  }
  get millisecond() {
    return Li(this, "millisecond");
  }
  get microsecond() {
    return Li(this, "microsecond");
  }
  get nanosecond() {
    return Li(this, "nanosecond");
  }
  get era() {
    return xi(this, "era");
  }
  get eraYear() {
    return xi(this, "eraYear");
  }
  get dayOfWeek() {
    return xi(this, "dayOfWeek");
  }
  get dayOfYear() {
    return xi(this, "dayOfYear");
  }
  get weekOfYear() {
    return xi(this, "weekOfYear")?.week;
  }
  get yearOfWeek() {
    return xi(this, "weekOfYear")?.year;
  }
  get daysInWeek() {
    return xi(this, "daysInWeek");
  }
  get daysInYear() {
    return xi(this, "daysInYear");
  }
  get daysInMonth() {
    return xi(this, "daysInMonth");
  }
  get monthsInYear() {
    return xi(this, "monthsInYear");
  }
  get inLeapYear() {
    return xi(this, "inLeapYear");
  }
  with(e2, t2 = void 0) {
    if (vt(this, yt), !Ae(e2)) throw new TypeError("invalid argument");
    bt(e2);
    const n2 = re(this, E), r2 = re(this, T);
    let o2 = { ...en(n2, r2.isoDate), ...r2.time };
    return o2 = Rn(n2, o2, tn(n2, e2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond"], "partial")), wn(on(n2, o2, Lt(Zo(t2))), n2);
  }
  withPlainTime(e2 = void 0) {
    vt(this, yt);
    const t2 = un(e2);
    return wn(xt(re(this, T).isoDate, t2), re(this, E));
  }
  withCalendar(e2) {
    vt(this, yt);
    const t2 = kn(e2);
    return wn(re(this, T), t2);
  }
  add(e2, t2 = void 0) {
    return vt(this, yt), bo("add", this, e2, t2);
  }
  subtract(e2, t2 = void 0) {
    return vt(this, yt), bo("subtract", this, e2, t2);
  }
  until(e2, t2 = void 0) {
    return vt(this, yt), ho("until", this, e2, t2);
  }
  since(e2, t2 = void 0) {
    return vt(this, yt), ho("since", this, e2, t2);
  }
  round(e2) {
    if (vt(this, yt), void 0 === e2) throw new TypeError("options parameter is required");
    const t2 = "string" == typeof e2 ? Fo("smallestUnit", e2) : Zo(e2), n2 = Ft(t2), r2 = Ut(t2, "halfExpand"), o2 = Wt(t2, "smallestUnit", "time", qt, ["day"]), i2 = { day: 1, hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[o2];
    Ht(n2, i2, 1 === i2);
    const a2 = re(this, T);
    return wn(1 === n2 && "nanosecond" === o2 ? a2 : Co(a2, n2, o2, r2), re(this, E));
  }
  equals(e2) {
    vt(this, yt);
    const t2 = an(e2);
    return 0 === jo(re(this, T), re(t2, T)) && xn(re(this, E), re(t2, E));
  }
  toString(e2 = void 0) {
    vt(this, yt);
    const t2 = Zo(e2), n2 = Zt(t2), r2 = zt(t2), o2 = Ut(t2, "trunc"), i2 = Wt(t2, "smallestUnit", "time", void 0);
    if ("hour" === i2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
    const { precision: a2, unit: s2, increment: c2 } = At(i2, r2), d2 = Co(re(this, T), c2, s2, o2);
    return Br(d2), nr(d2, re(this, E), a2, n2);
  }
  toJSON() {
    return vt(this, yt), nr(re(this, T), re(this, E), "auto");
  }
  toLocaleString(e2 = void 0, t2 = void 0) {
    return vt(this, yt), new di(e2, t2).format(this);
  }
  valueOf() {
    qo("PlainDateTime");
  }
  toZonedDateTime(e2, t2 = void 0) {
    vt(this, yt);
    const n2 = Bn(e2), r2 = Pt(Zo(t2));
    return $n(An(n2, re(this, T), r2), n2, re(this, E));
  }
  toPlainDate() {
    return vt(this, yt), pn(re(this, T).isoDate, re(this, E));
  }
  toPlainTime() {
    return vt(this, yt), Tn(re(this, T).time);
  }
  static from(e2, t2 = void 0) {
    return an(e2, t2);
  }
  static compare(e2, t2) {
    const n2 = an(e2), r2 = an(t2);
    return jo(re(n2, T), re(r2, T));
  }
};
function xi(e2, t2) {
  vt(e2, yt);
  const n2 = re(e2, T).isoDate;
  return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
}
function Li(e2, t2) {
  return vt(e2, yt), re(e2, T).time[t2];
}
ae(PlainDateTime, "Temporal.PlainDateTime");
var Duration = class _Duration {
  constructor(e2 = 0, t2 = 0, n2 = 0, r2 = 0, o2 = 0, i2 = 0, a2 = 0, s2 = 0, c2 = 0, d2 = 0) {
    const h2 = void 0 === e2 ? 0 : Ge(e2), u2 = void 0 === t2 ? 0 : Ge(t2), l2 = void 0 === n2 ? 0 : Ge(n2), m2 = void 0 === r2 ? 0 : Ge(r2), f2 = void 0 === o2 ? 0 : Ge(o2), y2 = void 0 === i2 ? 0 : Ge(i2), p2 = void 0 === a2 ? 0 : Ge(a2), g2 = void 0 === s2 ? 0 : Ge(s2), w2 = void 0 === c2 ? 0 : Ge(c2), v2 = void 0 === d2 ? 0 : Ge(d2);
    zr(h2, u2, l2, m2, f2, y2, p2, g2, w2, v2), te(this), oe(this, Y, h2), oe(this, R, u2), oe(this, S, l2), oe(this, j, m2), oe(this, k, f2), oe(this, N, y2), oe(this, x, p2), oe(this, L, g2), oe(this, P, w2), oe(this, U, v2);
  }
  get years() {
    return vt(this, lt), re(this, Y);
  }
  get months() {
    return vt(this, lt), re(this, R);
  }
  get weeks() {
    return vt(this, lt), re(this, S);
  }
  get days() {
    return vt(this, lt), re(this, j);
  }
  get hours() {
    return vt(this, lt), re(this, k);
  }
  get minutes() {
    return vt(this, lt), re(this, N);
  }
  get seconds() {
    return vt(this, lt), re(this, x);
  }
  get milliseconds() {
    return vt(this, lt), re(this, L);
  }
  get microseconds() {
    return vt(this, lt), re(this, P);
  }
  get nanoseconds() {
    return vt(this, lt), re(this, U);
  }
  get sign() {
    return vt(this, lt), Mr(this);
  }
  get blank() {
    return vt(this, lt), 0 === Mr(this);
  }
  with(e2) {
    vt(this, lt);
    const t2 = kt(e2), { years: n2 = re(this, Y), months: r2 = re(this, R), weeks: o2 = re(this, S), days: i2 = re(this, j), hours: a2 = re(this, k), minutes: s2 = re(this, N), seconds: c2 = re(this, x), milliseconds: d2 = re(this, L), microseconds: h2 = re(this, P), nanoseconds: u2 = re(this, U) } = t2;
    return new _Duration(n2, r2, o2, i2, a2, s2, c2, d2, h2, u2);
  }
  negated() {
    return vt(this, lt), Sr(this);
  }
  abs() {
    return vt(this, lt), new _Duration(Math.abs(re(this, Y)), Math.abs(re(this, R)), Math.abs(re(this, S)), Math.abs(re(this, j)), Math.abs(re(this, k)), Math.abs(re(this, N)), Math.abs(re(this, x)), Math.abs(re(this, L)), Math.abs(re(this, P)), Math.abs(re(this, U)));
  }
  add(e2) {
    return vt(this, lt), go("add", this, e2);
  }
  subtract(e2) {
    return vt(this, lt), go("subtract", this, e2);
  }
  round(e2) {
    if (vt(this, lt), void 0 === e2) throw new TypeError("options parameter is required");
    const t2 = Jt(this), n2 = "string" == typeof e2 ? Fo("smallestUnit", e2) : Zo(e2);
    let r2 = Wt(n2, "largestUnit", "datetime", void 0, ["auto"]), { plainRelativeTo: o2, zonedRelativeTo: i2 } = _t(n2);
    const a2 = Ft(n2), s2 = Ut(n2, "halfExpand");
    let c2 = Wt(n2, "smallestUnit", "datetime", void 0), d2 = true;
    c2 || (d2 = false, c2 = "nanosecond");
    const h2 = Gt(t2, c2);
    let u2 = true;
    if (r2 || (u2 = false, r2 = h2), "auto" === r2 && (r2 = h2), !d2 && !u2) throw new RangeError("at least one of smallestUnit or largestUnit is required");
    if (Gt(r2, c2) !== r2) throw new RangeError(`largestUnit ${r2} cannot be smaller than smallestUnit ${c2}`);
    const l2 = { hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[c2];
    if (void 0 !== l2 && Ht(a2, l2, false), a2 > 1 && "date" === Vt(c2) && r2 !== c2) throw new RangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit");
    if (i2) {
      let e3 = Ar(this);
      const t3 = re(i2, $), n3 = re(i2, E), o3 = re(i2, b);
      return e3 = io(o3, po(o3, t3, n3, e3), t3, n3, r2, a2, c2, s2), "date" === Vt(r2) && (r2 = "hour"), _r(e3, r2);
    }
    if (o2) {
      let e3 = qr(this);
      const t3 = fo({ deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }, e3.time), n3 = re(o2, D), i3 = re(o2, E), d3 = Sn(i3, n3, Nt(e3.date, t3.deltaDays), "constrain");
      return e3 = oo(xt(n3, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), xt(d3, t3), i3, r2, a2, c2, s2), _r(e3, r2);
    }
    if (Kt(t2)) throw new RangeError(`a starting point is required for ${t2}s balancing`);
    if (Kt(r2)) throw new RangeError(`a starting point is required for ${r2}s balancing`);
    let m2 = qr(this);
    if ("day" === c2) {
      const { quotient: e3, remainder: t3 } = m2.time.divmod(Se);
      let n3 = m2.date.days + e3 + Yo(t3, "day");
      n3 = Eo(n3, a2, s2), m2 = Jr({ years: 0, months: 0, weeks: 0, days: n3 }, TimeDuration.ZERO);
    } else m2 = Jr({ years: 0, months: 0, weeks: 0, days: 0 }, $o(m2.time, a2, c2, s2));
    return _r(m2, r2);
  }
  total(t2) {
    if (vt(this, lt), void 0 === t2) throw new TypeError("options argument is required");
    const n2 = "string" == typeof t2 ? Fo("unit", t2) : Zo(t2);
    let { plainRelativeTo: r2, zonedRelativeTo: o2 } = _t(n2);
    const i2 = Wt(n2, "unit", "datetime", qt);
    if (o2) {
      const e2 = Ar(this), t3 = re(o2, $), n3 = re(o2, E), r3 = re(o2, b);
      return (function(e3, t4, n4, r4, o3) {
        return "time" === Vt(o3) ? Yo(TimeDuration.fromEpochNsDiff(t4, e3), o3) : ro(eo(e3, t4, n4, r4, o3), t4, zn(n4, e3), n4, r4, o3);
      })(r3, po(r3, t3, n3, e2), t3, n3, i2);
    }
    if (r2) {
      const t3 = qr(this);
      let n3 = fo({ deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }, t3.time);
      const o3 = re(r2, D), a3 = re(r2, E), s2 = Sn(a3, o3, Nt(t3.date, n3.deltaDays), "constrain");
      return (function(t4, n4, r3, o4) {
        if (0 == jo(t4, n4)) return 0;
        Br(t4), Br(n4);
        const i3 = Qr(t4, n4, r3, o4);
        return "nanosecond" === o4 ? import_jsbi.default.toNumber(i3.time.totalNs) : ro(i3, pr(n4), t4, null, r3, o4);
      })(xt(o3, { deltaDays: 0, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 }), xt(s2, n3), a3, i2);
    }
    const a2 = Jt(this);
    if (Kt(a2)) throw new RangeError(`a starting point is required for ${a2}s total`);
    if (Kt(i2)) throw new RangeError(`a starting point is required for ${i2}s total`);
    return Yo(qr(this).time, i2);
  }
  toString(e2 = void 0) {
    vt(this, lt);
    const t2 = Zo(e2), n2 = zt(t2), r2 = Ut(t2, "trunc"), o2 = Wt(t2, "smallestUnit", "time", void 0);
    if ("hour" === o2 || "minute" === o2) throw new RangeError('smallestUnit must be a time unit other than "hours" or "minutes"');
    const { precision: i2, unit: a2, increment: s2 } = At(o2, n2);
    if ("nanosecond" === a2 && 1 === s2) return Qn(this, i2);
    const c2 = Jt(this);
    let d2 = Ar(this);
    const h2 = $o(d2.time, s2, a2, r2);
    return d2 = Jr(d2.date, h2), Qn(_r(d2, Gt(c2, "second")), i2);
  }
  toJSON() {
    return vt(this, lt), Qn(this, "auto");
  }
  toLocaleString(e2 = void 0, t2 = void 0) {
    if (vt(this, lt), "function" == typeof Intl.DurationFormat) {
      const n2 = new Intl.DurationFormat(e2, t2);
      return ji.call(n2, this);
    }
    return console.warn("Temporal.Duration.prototype.toLocaleString() requires Intl.DurationFormat."), Qn(this, "auto");
  }
  valueOf() {
    qo("Duration");
  }
  static from(e2) {
    return sn(e2);
  }
  static compare(t2, n2, r2 = void 0) {
    const o2 = sn(t2), i2 = sn(n2), a2 = Zo(r2), { plainRelativeTo: s2, zonedRelativeTo: c2 } = _t(a2);
    if (re(o2, Y) === re(i2, Y) && re(o2, R) === re(i2, R) && re(o2, S) === re(i2, S) && re(o2, j) === re(i2, j) && re(o2, k) === re(i2, k) && re(o2, N) === re(i2, N) && re(o2, x) === re(i2, x) && re(o2, L) === re(i2, L) && re(o2, P) === re(i2, P) && re(o2, U) === re(i2, U)) return 0;
    const d2 = Jt(o2), h2 = Jt(i2), u2 = Ar(o2), l2 = Ar(i2);
    if (c2 && ("date" === Vt(d2) || "date" === Vt(h2))) {
      const t3 = re(c2, $), n3 = re(c2, E), r3 = re(c2, b), o3 = po(r3, t3, n3, u2), i3 = po(r3, t3, n3, l2);
      return Bo(import_jsbi.default.toNumber(import_jsbi.default.subtract(o3, i3)));
    }
    let m2 = u2.date.days, f2 = l2.date.days;
    if (Kt(d2) || Kt(h2)) {
      if (!s2) throw new RangeError("A starting point is required for years, months, or weeks comparison");
      m2 = Rr(u2.date, s2), f2 = Rr(l2.date, s2);
    }
    const y2 = u2.time.add24HourDays(m2), p2 = l2.time.add24HourDays(f2);
    return y2.cmp(p2);
  }
};
ae(Duration, "Temporal.Duration");
var PlainMonthDay = class {
  constructor(e2, t2, n2 = "iso8601", r2 = 1972) {
    const o2 = _e(e2), i2 = _e(t2), a2 = zo(void 0 === n2 ? "iso8601" : Ve(n2)), s2 = _e(r2);
    xr(s2, o2, i2), vn(this, { year: s2, month: o2, day: i2 }, a2);
  }
  get monthCode() {
    return Pi(this, "monthCode");
  }
  get day() {
    return Pi(this, "day");
  }
  get calendarId() {
    return vt(this, gt), re(this, E);
  }
  with(e2, t2 = void 0) {
    if (vt(this, gt), !Ae(e2)) throw new TypeError("invalid argument");
    bt(e2);
    const n2 = re(this, E);
    let r2 = en(n2, re(this, D), "month-day");
    return r2 = Rn(n2, r2, tn(n2, e2, ["year", "month", "monthCode", "day"], [], "partial")), bn(Un(n2, r2, Lt(Zo(t2))), n2);
  }
  equals(e2) {
    vt(this, gt);
    const t2 = dn(e2);
    return 0 === Ro(re(this, D), re(t2, D)) && xn(re(this, E), re(t2, E));
  }
  toString(e2 = void 0) {
    return vt(this, gt), rr(this, Zt(Zo(e2)));
  }
  toJSON() {
    return vt(this, gt), rr(this);
  }
  toLocaleString(e2 = void 0, t2 = void 0) {
    return vt(this, gt), new di(e2, t2).format(this);
  }
  valueOf() {
    qo("PlainMonthDay");
  }
  toPlainDate(e2) {
    if (vt(this, gt), !Ae(e2)) throw new TypeError("argument should be an object");
    const t2 = re(this, E);
    return pn(Ln(t2, Rn(t2, en(t2, re(this, D), "month-day"), tn(t2, e2, ["year"], [], [])), "constrain"), t2);
  }
  static from(e2, t2 = void 0) {
    return dn(e2, t2);
  }
};
function Pi(e2, t2) {
  vt(e2, gt);
  const n2 = re(e2, D);
  return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
}
function Ui(e2) {
  return zn(e2, Po());
}
ae(PlainMonthDay, "Temporal.PlainMonthDay");
var Bi = { instant: () => Cn(Po()), plainDateTimeISO: (e2 = Uo()) => wn(Ui(Bn(e2)), "iso8601"), plainDateISO: (e2 = Uo()) => pn(Ui(Bn(e2)).isoDate, "iso8601"), plainTimeISO: (e2 = Uo()) => Tn(Ui(Bn(e2)).time), timeZoneId: () => Uo(), zonedDateTimeISO: (e2 = Uo()) => {
  const t2 = Bn(e2);
  return $n(Po(), t2, "iso8601");
}, [Symbol.toStringTag]: "Temporal.Now" };
Object.defineProperty(Bi, Symbol.toStringTag, { value: "Temporal.Now", writable: false, enumerable: false, configurable: true });
var PlainTime = class _PlainTime {
  constructor(e2 = 0, t2 = 0, n2 = 0, r2 = 0, o2 = 0, i2 = 0) {
    const a2 = void 0 === e2 ? 0 : _e(e2), s2 = void 0 === t2 ? 0 : _e(t2), c2 = void 0 === n2 ? 0 : _e(n2), d2 = void 0 === r2 ? 0 : _e(r2), h2 = void 0 === o2 ? 0 : _e(o2), u2 = void 0 === i2 ? 0 : _e(i2);
    Pr(a2, s2, c2, d2, h2, u2), Dn(this, { hour: a2, minute: s2, second: c2, millisecond: d2, microsecond: h2, nanosecond: u2 });
  }
  get hour() {
    return vt(this, ft), re(this, M).hour;
  }
  get minute() {
    return vt(this, ft), re(this, M).minute;
  }
  get second() {
    return vt(this, ft), re(this, M).second;
  }
  get millisecond() {
    return vt(this, ft), re(this, M).millisecond;
  }
  get microsecond() {
    return vt(this, ft), re(this, M).microsecond;
  }
  get nanosecond() {
    return vt(this, ft), re(this, M).nanosecond;
  }
  with(e2, t2 = void 0) {
    if (vt(this, ft), !Ae(e2)) throw new TypeError("invalid argument");
    bt(e2);
    const n2 = nn(e2, "partial"), r2 = nn(this);
    let { hour: o2, minute: i2, second: a2, millisecond: s2, microsecond: c2, nanosecond: d2 } = Object.assign(r2, n2);
    const h2 = Lt(Zo(t2));
    return { hour: o2, minute: i2, second: a2, millisecond: s2, microsecond: c2, nanosecond: d2 } = jt(o2, i2, a2, s2, c2, d2, h2), new _PlainTime(o2, i2, a2, s2, c2, d2);
  }
  add(e2) {
    return vt(this, ft), Do("add", this, e2);
  }
  subtract(e2) {
    return vt(this, ft), Do("subtract", this, e2);
  }
  until(e2, t2 = void 0) {
    return vt(this, ft), uo("until", this, e2, t2);
  }
  since(e2, t2 = void 0) {
    return vt(this, ft), uo("since", this, e2, t2);
  }
  round(e2) {
    if (vt(this, ft), void 0 === e2) throw new TypeError("options parameter is required");
    const t2 = "string" == typeof e2 ? Fo("smallestUnit", e2) : Zo(e2), n2 = Ft(t2), r2 = Ut(t2, "halfExpand"), o2 = Wt(t2, "smallestUnit", "time", qt);
    return Ht(n2, { hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[o2], false), Tn(Oo(re(this, M), n2, o2, r2));
  }
  equals(e2) {
    vt(this, ft);
    const t2 = hn(e2);
    return 0 === So(re(this, M), re(t2, M));
  }
  toString(e2 = void 0) {
    vt(this, ft);
    const t2 = Zo(e2), n2 = zt(t2), r2 = Ut(t2, "trunc"), o2 = Wt(t2, "smallestUnit", "time", void 0);
    if ("hour" === o2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
    const { precision: i2, unit: a2, increment: s2 } = At(o2, n2);
    return tr(Oo(re(this, M), s2, a2, r2), i2);
  }
  toJSON() {
    return vt(this, ft), tr(re(this, M), "auto");
  }
  toLocaleString(e2 = void 0, t2 = void 0) {
    return vt(this, ft), new di(e2, t2).format(this);
  }
  valueOf() {
    qo("PlainTime");
  }
  static from(e2, t2 = void 0) {
    return hn(e2, t2);
  }
  static compare(e2, t2) {
    const n2 = hn(e2), r2 = hn(t2);
    return So(re(n2, M), re(r2, M));
  }
};
ae(PlainTime, "Temporal.PlainTime");
var PlainYearMonth = class {
  constructor(e2, t2, n2 = "iso8601", r2 = 1) {
    const o2 = _e(e2), i2 = _e(t2), a2 = zo(void 0 === n2 ? "iso8601" : Ve(n2)), s2 = _e(r2);
    xr(o2, i2, s2), Mn(this, { year: o2, month: i2, day: s2 }, a2);
  }
  get year() {
    return Zi(this, "year");
  }
  get month() {
    return Zi(this, "month");
  }
  get monthCode() {
    return Zi(this, "monthCode");
  }
  get calendarId() {
    return vt(this, pt), re(this, E);
  }
  get era() {
    return Zi(this, "era");
  }
  get eraYear() {
    return Zi(this, "eraYear");
  }
  get daysInMonth() {
    return Zi(this, "daysInMonth");
  }
  get daysInYear() {
    return Zi(this, "daysInYear");
  }
  get monthsInYear() {
    return Zi(this, "monthsInYear");
  }
  get inLeapYear() {
    return Zi(this, "inLeapYear");
  }
  with(e2, t2 = void 0) {
    if (vt(this, pt), !Ae(e2)) throw new TypeError("invalid argument");
    bt(e2);
    const n2 = re(this, E);
    let r2 = en(n2, re(this, D), "year-month");
    return r2 = Rn(n2, r2, tn(n2, e2, ["year", "month", "monthCode"], [], "partial")), En(Pn(n2, r2, Lt(Zo(t2))), n2);
  }
  add(e2, t2 = void 0) {
    return vt(this, pt), To("add", this, e2, t2);
  }
  subtract(e2, t2 = void 0) {
    return vt(this, pt), To("subtract", this, e2, t2);
  }
  until(e2, t2 = void 0) {
    return vt(this, pt), lo("until", this, e2, t2);
  }
  since(e2, t2 = void 0) {
    return vt(this, pt), lo("since", this, e2, t2);
  }
  equals(e2) {
    vt(this, pt);
    const t2 = ln(e2);
    return 0 === Ro(re(this, D), re(t2, D)) && xn(re(this, E), re(t2, E));
  }
  toString(e2 = void 0) {
    return vt(this, pt), or(this, Zt(Zo(e2)));
  }
  toJSON() {
    return vt(this, pt), or(this);
  }
  toLocaleString(e2 = void 0, t2 = void 0) {
    return vt(this, pt), new di(e2, t2).format(this);
  }
  valueOf() {
    qo("PlainYearMonth");
  }
  toPlainDate(e2) {
    if (vt(this, pt), !Ae(e2)) throw new TypeError("argument should be an object");
    const t2 = re(this, E);
    return pn(Ln(t2, Rn(t2, en(t2, re(this, D), "year-month"), tn(t2, e2, ["day"], [], [])), "constrain"), t2);
  }
  static from(e2, t2 = void 0) {
    return ln(e2, t2);
  }
  static compare(e2, t2) {
    const n2 = ln(e2), r2 = ln(t2);
    return Ro(re(n2, D), re(r2, D));
  }
};
function Zi(e2, t2) {
  vt(e2, pt);
  const n2 = re(e2, D);
  return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
}
ae(PlainYearMonth, "Temporal.PlainYearMonth");
var Fi = di.prototype.resolvedOptions;
var ZonedDateTime = class {
  constructor(e2, t2, n2 = "iso8601") {
    if (arguments.length < 1) throw new TypeError("missing argument: epochNanoseconds is required");
    const r2 = Lo(e2);
    let o2 = Ve(t2);
    const { tzName: i2, offsetMinutes: a2 } = Rt(o2);
    if (void 0 === a2) {
      const e3 = hr(i2);
      if (!e3) throw new RangeError(`unknown time zone ${i2}`);
      o2 = e3.identifier;
    } else o2 = mr(a2);
    On(this, r2, o2, zo(void 0 === n2 ? "iso8601" : Ve(n2)));
  }
  get calendarId() {
    return vt(this, wt), re(this, E);
  }
  get timeZoneId() {
    return vt(this, wt), re(this, $);
  }
  get year() {
    return zi(this, "year");
  }
  get month() {
    return zi(this, "month");
  }
  get monthCode() {
    return zi(this, "monthCode");
  }
  get day() {
    return zi(this, "day");
  }
  get hour() {
    return Ai(this, "hour");
  }
  get minute() {
    return Ai(this, "minute");
  }
  get second() {
    return Ai(this, "second");
  }
  get millisecond() {
    return Ai(this, "millisecond");
  }
  get microsecond() {
    return Ai(this, "microsecond");
  }
  get nanosecond() {
    return Ai(this, "nanosecond");
  }
  get era() {
    return zi(this, "era");
  }
  get eraYear() {
    return zi(this, "eraYear");
  }
  get epochMilliseconds() {
    return vt(this, wt), No(re(this, b), "floor");
  }
  get epochNanoseconds() {
    return vt(this, wt), ko(re(this, b));
  }
  get dayOfWeek() {
    return zi(this, "dayOfWeek");
  }
  get dayOfYear() {
    return zi(this, "dayOfYear");
  }
  get weekOfYear() {
    return zi(this, "weekOfYear")?.week;
  }
  get yearOfWeek() {
    return zi(this, "weekOfYear")?.year;
  }
  get hoursInDay() {
    vt(this, wt);
    const e2 = re(this, $), t2 = Hi(this).isoDate, n2 = Or(t2.year, t2.month, t2.day + 1), r2 = _n(e2, t2), o2 = _n(e2, n2);
    return Yo(TimeDuration.fromEpochNsDiff(o2, r2), "hour");
  }
  get daysInWeek() {
    return zi(this, "daysInWeek");
  }
  get daysInMonth() {
    return zi(this, "daysInMonth");
  }
  get daysInYear() {
    return zi(this, "daysInYear");
  }
  get monthsInYear() {
    return zi(this, "monthsInYear");
  }
  get inLeapYear() {
    return zi(this, "inLeapYear");
  }
  get offset() {
    return vt(this, wt), Hn(Fn(re(this, $), re(this, b)));
  }
  get offsetNanoseconds() {
    return vt(this, wt), Fn(re(this, $), re(this, b));
  }
  with(e2, t2 = void 0) {
    if (vt(this, wt), !Ae(e2)) throw new TypeError("invalid zoned-date-time-like");
    bt(e2);
    const n2 = re(this, E), r2 = re(this, $), o2 = Fn(r2, re(this, b)), i2 = Hi(this);
    let a2 = { ...en(n2, i2.isoDate), ...i2.time, offset: Hn(o2) };
    a2 = Rn(n2, a2, tn(n2, e2, ["year", "month", "monthCode", "day"], ["hour", "minute", "second", "millisecond", "microsecond", "nanosecond", "offset"], "partial"));
    const s2 = Zo(t2), c2 = Pt(s2), d2 = Bt(s2, "prefer"), h2 = on(n2, a2, Lt(s2)), u2 = sr(a2.offset);
    return $n(mn(h2.isoDate, h2.time, "option", u2, r2, c2, d2, false), r2, n2);
  }
  withPlainTime(e2 = void 0) {
    vt(this, wt);
    const t2 = re(this, $), n2 = re(this, E), r2 = Hi(this).isoDate;
    let o2;
    return o2 = void 0 === e2 ? _n(t2, r2) : An(t2, xt(r2, re(hn(e2), M)), "compatible"), $n(o2, t2, n2);
  }
  withTimeZone(e2) {
    vt(this, wt);
    const t2 = Bn(e2);
    return $n(re(this, b), t2, re(this, E));
  }
  withCalendar(e2) {
    vt(this, wt);
    const t2 = kn(e2);
    return $n(re(this, b), re(this, $), t2);
  }
  add(e2, t2 = void 0) {
    return vt(this, wt), Mo("add", this, e2, t2);
  }
  subtract(e2, t2 = void 0) {
    return vt(this, wt), Mo("subtract", this, e2, t2);
  }
  until(e2, t2 = void 0) {
    return vt(this, wt), mo("until", this, e2, t2);
  }
  since(e2, t2 = void 0) {
    return vt(this, wt), mo("since", this, e2, t2);
  }
  round(t2) {
    if (vt(this, wt), void 0 === t2) throw new TypeError("options parameter is required");
    const n2 = "string" == typeof t2 ? Fo("smallestUnit", t2) : Zo(t2), r2 = Ft(n2), o2 = Ut(n2, "halfExpand"), i2 = Wt(n2, "smallestUnit", "time", qt, ["day"]), a2 = { day: 1, hour: 24, minute: 60, second: 60, millisecond: 1e3, microsecond: 1e3, nanosecond: 1e3 }[i2];
    if (Ht(r2, a2, 1 === a2), "nanosecond" === i2 && 1 === r2) return $n(re(this, b), re(this, $), re(this, E));
    const s2 = re(this, $), c2 = re(this, b), d2 = Hi(this);
    let h2;
    if ("day" === i2) {
      const t3 = d2.isoDate, n3 = Or(t3.year, t3.month, t3.day + 1), r3 = _n(s2, t3), i3 = _n(s2, n3), a3 = import_jsbi.default.subtract(i3, r3);
      h2 = TimeDuration.fromEpochNsDiff(c2, r3).round(a3, o2).addToEpochNs(r3);
    } else {
      const e2 = Co(d2, r2, i2, o2), t3 = Fn(s2, c2);
      h2 = mn(e2.isoDate, e2.time, "option", t3, s2, "compatible", "prefer", false);
    }
    return $n(h2, s2, re(this, E));
  }
  equals(t2) {
    vt(this, wt);
    const n2 = fn(t2), r2 = re(this, b), o2 = re(n2, b);
    return !!import_jsbi.default.equal(import_jsbi.default.BigInt(r2), import_jsbi.default.BigInt(o2)) && !!Zn(re(this, $), re(n2, $)) && xn(re(this, E), re(n2, E));
  }
  toString(e2 = void 0) {
    vt(this, wt);
    const t2 = Zo(e2), n2 = Zt(t2), r2 = zt(t2), o2 = (function(e3) {
      return Ho(e3, "offset", ["auto", "never"], "auto");
    })(t2), i2 = Ut(t2, "trunc"), a2 = Wt(t2, "smallestUnit", "time", void 0);
    if ("hour" === a2) throw new RangeError('smallestUnit must be a time unit other than "hour"');
    const s2 = (function(e3) {
      return Ho(e3, "timeZoneName", ["auto", "never", "critical"], "auto");
    })(t2), { precision: c2, unit: d2, increment: h2 } = At(a2, r2);
    return ir(this, c2, n2, s2, o2, { unit: d2, increment: h2, roundingMode: i2 });
  }
  toLocaleString(e2 = void 0, t2 = void 0) {
    vt(this, wt);
    const n2 = Zo(t2), r2 = /* @__PURE__ */ Object.create(null);
    if ((function(e3, t3, n3, r3) {
      if (null == t3) return;
      const o3 = Reflect.ownKeys(t3);
      for (let i3 = 0; i3 < o3.length; i3++) {
        const a3 = o3[i3];
        if (!n3.some(((e4) => Object.is(e4, a3))) && Object.prototype.propertyIsEnumerable.call(t3, a3)) {
          const n4 = t3[a3];
          r3, e3[a3] = n4;
        }
      }
    })(r2, n2, ["timeZone"]), void 0 !== n2.timeZone) throw new TypeError("ZonedDateTime toLocaleString does not accept a timeZone option");
    if (void 0 === r2.year && void 0 === r2.month && void 0 === r2.day && void 0 === r2.era && void 0 === r2.weekday && void 0 === r2.dateStyle && void 0 === r2.hour && void 0 === r2.minute && void 0 === r2.second && void 0 === r2.fractionalSecondDigits && void 0 === r2.timeStyle && void 0 === r2.dayPeriod && void 0 === r2.timeZoneName && (r2.timeZoneName = "short"), r2.timeZone = re(this, $), ar(r2.timeZone)) throw new RangeError("toLocaleString does not currently support offset time zones");
    const o2 = new di(e2, r2), i2 = Fi.call(o2).calendar, a2 = re(this, E);
    if ("iso8601" !== a2 && "iso8601" !== i2 && !xn(i2, a2)) throw new RangeError(`cannot format ZonedDateTime with calendar ${a2} in locale with calendar ${i2}`);
    return o2.format(Cn(re(this, b)));
  }
  toJSON() {
    return vt(this, wt), ir(this, "auto");
  }
  valueOf() {
    qo("ZonedDateTime");
  }
  startOfDay() {
    vt(this, wt);
    const e2 = re(this, $);
    return $n(_n(e2, Hi(this).isoDate), e2, re(this, E));
  }
  getTimeZoneTransition(e2) {
    vt(this, wt);
    const t2 = re(this, $);
    if (void 0 === e2) throw new TypeError("options parameter is required");
    const n2 = Ho("string" == typeof e2 ? Fo("direction", e2) : Zo(e2), "direction", ["next", "previous"], qt);
    if (void 0 === n2) throw new TypeError("direction option is required");
    if (ar(t2) || "UTC" === t2) return null;
    const r2 = re(this, b), o2 = "next" === n2 ? wr(t2, r2) : vr(t2, r2);
    return null === o2 ? null : $n(o2, t2, re(this, E));
  }
  toInstant() {
    return vt(this, wt), Cn(re(this, b));
  }
  toPlainDate() {
    return vt(this, wt), pn(Hi(this).isoDate, re(this, E));
  }
  toPlainTime() {
    return vt(this, wt), Tn(Hi(this).time);
  }
  toPlainDateTime() {
    return vt(this, wt), wn(Hi(this), re(this, E));
  }
  static from(e2, t2 = void 0) {
    return fn(e2, t2);
  }
  static compare(t2, n2) {
    const r2 = fn(t2), o2 = fn(n2), i2 = re(r2, b), a2 = re(o2, b);
    return import_jsbi.default.lessThan(import_jsbi.default.BigInt(i2), import_jsbi.default.BigInt(a2)) ? -1 : import_jsbi.default.greaterThan(import_jsbi.default.BigInt(i2), import_jsbi.default.BigInt(a2)) ? 1 : 0;
  }
};
function Hi(e2) {
  return zn(re(e2, $), re(e2, b));
}
function zi(e2, t2) {
  vt(e2, wt);
  const n2 = Hi(e2).isoDate;
  return Qt(e2).isoToDate(n2, { [t2]: true })[t2];
}
function Ai(e2, t2) {
  return vt(e2, wt), Hi(e2).time[t2];
}
ae(ZonedDateTime, "Temporal.ZonedDateTime");
var qi = Object.freeze({ __proto__: null, Duration, Instant, Now: Bi, PlainDate, PlainDateTime, PlainMonthDay, PlainTime, PlainYearMonth, ZonedDateTime });
var Wi = class LegacyDateImpl {
  toTemporalInstant() {
    return Cn(xo(Date.prototype.valueOf.call(this)));
  }
}.prototype.toTemporalInstant;
var _i = [Instant, PlainDate, PlainDateTime, Duration, PlainMonthDay, PlainTime, PlainYearMonth, ZonedDateTime];
for (const e2 of _i) {
  const t2 = Object.getOwnPropertyDescriptor(e2, "prototype");
  (t2.configurable || t2.enumerable || t2.writable) && (t2.configurable = false, t2.enumerable = false, t2.writable = false, Object.defineProperty(e2, "prototype", t2));
}

// src/internal-model.ts
var MAX_REQUEST_BYTES = 262144;
var MAX_RESPONSE_BYTES = 524288;
var MAX_TOTAL_SOURCE_INTERVALS = 1e4;
var MAX_HORIZON_NS = 366n * 86400n * 1000000000n;
var MAX_RECURRENCE_LOOKBACK_NS = MAX_HORIZON_NS;
var ScheduleError = class extends Error {
  constructor(code, message, details) {
    super(message);
    this.code = code;
    this.details = details;
  }
};

// src/instants.ts
function parseInstant(value, field) {
  try {
    return qi.Instant.from(value).epochNanoseconds;
  } catch {
    throw new ScheduleError("INVALID_INPUT", `${field} is not a valid RFC 3339 instant`);
  }
}
function formatInstant(epochNanoseconds) {
  return qi.Instant.fromEpochNanoseconds(epochNanoseconds).toString();
}

// src/interval-algebra.ts
function clipInterval(interval, horizon) {
  const start = interval.start > horizon.start ? interval.start : horizon.start;
  const end = interval.end < horizon.end ? interval.end : horizon.end;
  if (end <= start) return void 0;
  return { start, end, sources: new Set(interval.sources) };
}
function executeOperation(operation, schedules, horizon) {
  switch (operation) {
    case "union":
      return normalize(schedules.flatMap((schedule) => schedule.normalized));
    case "intersection":
      return schedules.slice(1).reduce(
        (current, schedule) => intersectTwo(current, schedule.normalized),
        schedules[0]?.normalized ?? []
      );
    case "difference":
      return subtract(
        schedules[0]?.normalized ?? [],
        schedules[1]?.normalized ?? []
      );
    case "gaps":
      return complement(
        normalize(schedules.flatMap((schedule) => schedule.normalized)),
        horizon
      );
    case "overlaps":
      return overlapSegments(schedules.flatMap((schedule) => schedule.raw));
  }
}
function normalize(intervals) {
  const sorted = intervals.map((interval) => ({ ...interval, sources: new Set(interval.sources) })).sort(compareIntervals);
  const result = [];
  for (const interval of sorted) {
    const previous = result.at(-1);
    if (previous && interval.start <= previous.end) {
      previous.end = previous.end > interval.end ? previous.end : interval.end;
      for (const source of interval.sources) previous.sources.add(source);
    } else {
      result.push(interval);
    }
  }
  return result;
}
function intersectTwo(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    const a2 = left[leftIndex];
    const b2 = right[rightIndex];
    if (!a2 || !b2) break;
    const start = a2.start > b2.start ? a2.start : b2.start;
    const end = a2.end < b2.end ? a2.end : b2.end;
    if (start < end) {
      result.push({ start, end, sources: /* @__PURE__ */ new Set([...a2.sources, ...b2.sources]) });
    }
    if (a2.end <= b2.end) leftIndex += 1;
    else rightIndex += 1;
  }
  return normalize(result);
}
function subtract(left, right) {
  const result = [];
  for (const interval of left) {
    let pieces = [
      { start: interval.start, end: interval.end, sources: new Set(interval.sources) }
    ];
    for (const blocker of right) {
      if (blocker.end <= interval.start) continue;
      if (blocker.start >= interval.end) break;
      pieces = pieces.flatMap((piece) => {
        if (blocker.end <= piece.start || blocker.start >= piece.end) return [piece];
        const next = [];
        if (blocker.start > piece.start) {
          next.push({
            start: piece.start,
            end: blocker.start,
            sources: new Set(piece.sources)
          });
        }
        if (blocker.end < piece.end) {
          next.push({ end: piece.end, start: blocker.end, sources: new Set(piece.sources) });
        }
        return next;
      });
      if (pieces.length === 0) break;
    }
    result.push(...pieces);
  }
  return normalize(result);
}
function complement(intervals, horizon) {
  const gaps = [];
  let cursor = horizon.start;
  for (const interval of intervals) {
    if (interval.start > cursor) {
      gaps.push({ start: cursor, end: interval.start, sources: /* @__PURE__ */ new Set() });
    }
    if (interval.end > cursor) cursor = interval.end;
  }
  if (cursor < horizon.end) {
    gaps.push({ start: cursor, end: horizon.end, sources: /* @__PURE__ */ new Set() });
  }
  return gaps;
}
function overlapSegments(intervals) {
  const events = /* @__PURE__ */ new Map();
  for (const interval of intervals) {
    const startEvent = events.get(interval.start) ?? { starts: [], ends: [] };
    startEvent.starts.push(interval);
    events.set(interval.start, startEvent);
    const endEvent = events.get(interval.end) ?? { starts: [], ends: [] };
    endEvent.ends.push(interval);
    events.set(interval.end, endEvent);
  }
  const times = [...events.keys()].sort((a2, b2) => a2 < b2 ? -1 : a2 > b2 ? 1 : 0);
  const active = /* @__PURE__ */ new Set();
  const result = [];
  let previous;
  for (const time of times) {
    if (previous !== void 0 && previous < time && active.size >= 2) {
      result.push({
        start: previous,
        end: time,
        sources: new Set([...active].flatMap((interval) => [...interval.sources]))
      });
    }
    const event = events.get(time);
    if (!event) continue;
    for (const interval of event.ends) active.delete(interval);
    for (const interval of event.starts) active.add(interval);
    previous = time;
  }
  return mergeEquivalentSegments(result);
}
function mergeEquivalentSegments(intervals) {
  const result = [];
  for (const interval of intervals) {
    const previous = result.at(-1);
    if (previous && previous.end === interval.start && sameSources(previous.sources, interval.sources)) {
      previous.end = interval.end;
    } else {
      result.push(interval);
    }
  }
  return result;
}
function sameSources(left, right) {
  return left.size === right.size && [...left].every((source) => right.has(source));
}
function compareIntervals(left, right) {
  if (left.start < right.start) return -1;
  if (left.start > right.start) return 1;
  if (left.end < right.end) return -1;
  if (left.end > right.end) return 1;
  return [...left.sources].sort().join("\0").localeCompare([...right.sources].sort().join("\0"));
}

// src/recurrence.ts
var import_rrule = __toESM(require_rrule(), 1);
var { rrulestr } = import_rrule.default;
var NANOSECONDS_PER_SECOND = 1000000000n;
var ALLOWED_RRULE_KEYS = /* @__PURE__ */ new Set([
  "FREQ",
  "INTERVAL",
  "COUNT",
  "UNTIL",
  "BYDAY",
  "BYMONTHDAY",
  "BYMONTH",
  "WKST"
]);
var ALLOWED_FREQUENCIES = /* @__PURE__ */ new Set(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]);
function expandRecurrence(scheduleId, recurrence, context) {
  const source = `${scheduleId}/recurrence/${recurrence.id}`;
  const dtstart = parseLocalDateTime(recurrence.dtstart, source);
  const dtstartResolution = resolveLocal(dtstart, recurrence.timeZone, source);
  if (dtstartResolution.fold) {
    context.warnings.add(`${source}: ambiguous DTSTART used the earlier instant`);
  }
  if (dtstartResolution.instant < context.horizon.start - MAX_RECURRENCE_LOOKBACK_NS || dtstartResolution.instant >= context.horizon.end) {
    throw new ScheduleError(
      "LIMIT_EXCEEDED",
      `${source} DTSTART must fall within one year before the horizon and before its end`
    );
  }
  const normalizedRule = normalizeRRule(recurrence.rrule, recurrence.timeZone);
  if (normalizedRule.untilInstant !== void 0 && normalizedRule.untilInstant < dtstartResolution.instant) {
    throw new ScheduleError("INVALID_RRULE", `${source} UNTIL precedes DTSTART`);
  }
  let rule;
  try {
    rule = rrulestr(
      `DTSTART:${plainToCompact(dtstart)}Z
RRULE:${normalizedRule.engineRule}`,
      { forceset: false, compatible: true }
    );
  } catch (error) {
    throw new ScheduleError(
      "INVALID_RRULE",
      `${source} has an invalid RRULE`,
      error instanceof Error ? error.message : void 0
    );
  }
  const durationNs = BigInt(recurrence.durationSeconds) * NANOSECONDS_PER_SECOND;
  const queryStart = instantToPseudoDate(
    context.horizon.start - durationNs,
    recurrence.timeZone
  );
  const queryEnd = instantToPseudoDate(context.horizon.end, recurrence.timeZone);
  const candidates = rule.between(
    queryStart,
    queryEnd,
    true,
    (_date, length) => length <= recurrence.maxOccurrences + 2
  );
  const intervals = [];
  let clippedBefore = false;
  let clippedAfter = false;
  for (const candidate of candidates) {
    const plain = pseudoDateToPlain(candidate);
    const resolved = resolveLocal(plain, recurrence.timeZone, source);
    if (normalizedRule.untilInstant !== void 0 && resolved.instant > normalizedRule.untilInstant) {
      continue;
    }
    if (resolved.fold) {
      context.warnings.add(
        `${source}: ambiguous occurrence ${plain.toString()} used the earlier instant`
      );
    }
    const occurrence = {
      start: resolved.instant,
      end: resolved.instant + durationNs,
      sources: /* @__PURE__ */ new Set([source])
    };
    if (occurrence.start < context.horizon.start) clippedBefore = true;
    if (occurrence.end > context.horizon.end) clippedAfter = true;
    const clipped = clipInterval(occurrence, context.horizon);
    if (clipped) intervals.push(clipped);
  }
  if (intervals.length > recurrence.maxOccurrences) {
    throw new ScheduleError(
      "LIMIT_EXCEEDED",
      `${source} exceeds maxOccurrences inside the horizon`,
      { observedAtLeast: intervals.length, maxOccurrences: recurrence.maxOccurrences }
    );
  }
  context.totalGenerated += intervals.length;
  context.recurrence.push({
    source,
    generated: intervals.length,
    truncatedBeforeHorizon: clippedBefore || Boolean(rule.before(queryStart, true)),
    truncatedAfterHorizon: clippedAfter || candidateIsWithinUntil(
      rule.after(queryEnd, true),
      recurrence.timeZone,
      normalizedRule.untilInstant
    )
  });
  return intervals;
}
function normalizeRRule(value, timeZone) {
  const rule = value.trim().replace(/^RRULE:/i, "");
  if (rule.includes("\n") || rule.includes("\r")) {
    throw new ScheduleError("INVALID_RRULE", "RRULE must be a single content line");
  }
  const entries = /* @__PURE__ */ new Map();
  for (const part of rule.split(";")) {
    const separator = part.indexOf("=");
    if (separator <= 0 || separator === part.length - 1) {
      throw new ScheduleError("INVALID_RRULE", "RRULE parts must be KEY=VALUE");
    }
    const key = part.slice(0, separator).toUpperCase();
    const itemValue = part.slice(separator + 1).toUpperCase();
    if (!ALLOWED_RRULE_KEYS.has(key)) {
      throw new ScheduleError(
        "UNSUPPORTED_RRULE",
        `RRULE property ${key} is outside the bounded MVP subset`
      );
    }
    if (entries.has(key)) {
      throw new ScheduleError("INVALID_RRULE", `RRULE property ${key} is duplicated`);
    }
    entries.set(key, itemValue);
  }
  const frequency = entries.get("FREQ");
  if (!frequency || !ALLOWED_FREQUENCIES.has(frequency)) {
    throw new ScheduleError(
      "UNSUPPORTED_RRULE",
      "FREQ must be DAILY, WEEKLY, MONTHLY, or YEARLY"
    );
  }
  if (!entries.has("COUNT") && !entries.has("UNTIL")) {
    throw new ScheduleError(
      "UNBOUNDED_RRULE",
      "RRULE requires COUNT or an inclusive UTC UNTIL in addition to the horizon"
    );
  }
  validateBoundedInteger(entries.get("COUNT"), "COUNT");
  validateBoundedInteger(entries.get("INTERVAL"), "INTERVAL");
  const until = entries.get("UNTIL");
  let untilInstant;
  if (until) {
    if (!/^\d{8}T\d{6}Z$/.test(until)) {
      throw new ScheduleError(
        "INVALID_RRULE",
        "RRULE UNTIL must be an inclusive UTC date-time like 20250131T120000Z"
      );
    }
    try {
      const untilValue = qi.Instant.from(compactUtcToIso(until));
      const untilLocal = untilValue.toZonedDateTimeISO(timeZone).toPlainDateTime().add({ days: 1 });
      entries.set("UNTIL", `${plainToCompact(untilLocal)}Z`);
      untilInstant = untilValue.epochNanoseconds;
    } catch {
      throw new ScheduleError("INVALID_RRULE", "RRULE UNTIL is not a valid UTC instant");
    }
  }
  return {
    engineRule: [...entries.entries()].map(([key, itemValue]) => `${key}=${itemValue}`).join(";"),
    ...untilInstant === void 0 ? {} : { untilInstant }
  };
}
function candidateIsWithinUntil(candidate, timeZone, untilInstant) {
  if (!candidate) return false;
  if (untilInstant === void 0) return true;
  const plain = pseudoDateToPlain(candidate);
  const fields = {
    timeZone,
    year: plain.year,
    month: plain.month,
    day: plain.day,
    hour: plain.hour,
    minute: plain.minute,
    second: plain.second
  };
  try {
    return qi.ZonedDateTime.from(fields, { disambiguation: "earlier" }).epochNanoseconds <= untilInstant;
  } catch {
    return false;
  }
}
function validateBoundedInteger(value, name) {
  if (value && (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 1e4)) {
    throw new ScheduleError("LIMIT_EXCEEDED", `RRULE ${name} must be between 1 and 10000`);
  }
}
function parseLocalDateTime(value, source) {
  try {
    return qi.PlainDateTime.from(value);
  } catch {
    throw new ScheduleError("INVALID_INPUT", `${source} DTSTART is invalid`);
  }
}
function resolveLocal(plain, timeZone, source) {
  const fields = {
    timeZone,
    year: plain.year,
    month: plain.month,
    day: plain.day,
    hour: plain.hour,
    minute: plain.minute,
    second: plain.second
  };
  try {
    const earlier = qi.ZonedDateTime.from(fields, { disambiguation: "earlier" });
    const later = qi.ZonedDateTime.from(fields, { disambiguation: "later" });
    const earlierMatches = qi.PlainDateTime.compare(earlier.toPlainDateTime(), plain) === 0;
    const laterMatches = qi.PlainDateTime.compare(later.toPlainDateTime(), plain) === 0;
    if (!earlierMatches || !laterMatches) {
      throw new ScheduleError(
        "DST_GAP",
        `${source} occurrence ${plain.toString()} does not exist in ${timeZone}`
      );
    }
    return {
      instant: earlier.epochNanoseconds,
      fold: earlier.epochNanoseconds !== later.epochNanoseconds
    };
  } catch (error) {
    if (error instanceof ScheduleError) throw error;
    const message = error instanceof Error ? error.message : "invalid time zone";
    if (/time zone|timezone|identifier/i.test(message)) {
      throw new ScheduleError("INVALID_TIME_ZONE", `${source} has an invalid IANA time zone`);
    }
    throw new ScheduleError(
      "DST_GAP",
      `${source} occurrence ${plain.toString()} does not exist in ${timeZone}`
    );
  }
}
function instantToPseudoDate(epochNanoseconds, timeZone) {
  let local;
  try {
    local = qi.Instant.fromEpochNanoseconds(epochNanoseconds).toZonedDateTimeISO(timeZone).toPlainDateTime();
  } catch {
    throw new ScheduleError("INVALID_TIME_ZONE", `invalid IANA time zone: ${timeZone}`);
  }
  return new Date(
    Date.UTC(local.year, local.month - 1, local.day, local.hour, local.minute, local.second)
  );
}
function pseudoDateToPlain(value) {
  return new qi.PlainDateTime(
    value.getUTCFullYear(),
    value.getUTCMonth() + 1,
    value.getUTCDate(),
    value.getUTCHours(),
    value.getUTCMinutes(),
    value.getUTCSeconds()
  );
}
function plainToCompact(value) {
  return [
    String(value.year).padStart(4, "0"),
    String(value.month).padStart(2, "0"),
    String(value.day).padStart(2, "0"),
    "T",
    String(value.hour).padStart(2, "0"),
    String(value.minute).padStart(2, "0"),
    String(value.second).padStart(2, "0")
  ].join("");
}
function compactUtcToIso(value) {
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(
    9,
    11
  )}:${value.slice(11, 13)}:${value.slice(13, 15)}Z`;
}

// src/core.ts
function runSchedule(input2) {
  try {
    const requestBytes = Buffer.byteLength(JSON.stringify(input2), "utf8");
    if (requestBytes > MAX_REQUEST_BYTES) {
      throw new ScheduleError("LIMIT_EXCEEDED", "request exceeds 262144 UTF-8 bytes", {
        requestBytes,
        limitBytes: MAX_REQUEST_BYTES
      });
    }
    const parsed = ScheduleRequestSchema.safeParse(input2);
    if (!parsed.success) {
      throw new ScheduleError(
        "INVALID_INPUT",
        "request does not match the closed schedule contract",
        parsed.error.issues.slice(0, 20).map((issue) => ({
          path: issue.path.join("."),
          message: issue.message
        }))
      );
    }
    const request = parsed.data;
    const horizon = parseHorizon(request);
    validateOperationContract(request);
    const context = {
      horizon,
      recurrence: [],
      warnings: /* @__PURE__ */ new Set(),
      totalGenerated: 0
    };
    const schedules = request.schedules.map((schedule) => expandSchedule(schedule, context));
    const intervals = executeOperation(request.operation, schedules, horizon);
    if (intervals.length > request.maxResultIntervals) {
      throw new ScheduleError(
        "LIMIT_EXCEEDED",
        `result contains more than ${request.maxResultIntervals} intervals`,
        { resultIntervals: intervals.length, maxResultIntervals: request.maxResultIntervals }
      );
    }
    const result = {
      ok: true,
      operation: request.operation,
      semantics: {
        interval: "[start,end)",
        touchingEndpointsOverlap: false,
        normalized: true,
        recurrenceGapPolicy: "reject",
        recurrenceFoldPolicy: "earlier"
      },
      horizon: { start: formatInstant(horizon.start), end: formatInstant(horizon.end) },
      intervals: intervals.map((interval) => ({
        start: formatInstant(interval.start),
        end: formatInstant(interval.end),
        sources: [...interval.sources].sort()
      })),
      recurrence: context.recurrence,
      truncated: context.recurrence.some(
        (item) => item.truncatedBeforeHorizon || item.truncatedAfterHorizon
      ),
      warnings: [...context.warnings].sort(),
      provenance: {
        recurrenceEngine: "rrule@2.8.1",
        temporalEngine: "@js-temporal/polyfill@0.5.1",
        timeZoneAuthority: "runtime Intl/ICU tzdb",
        runtime: process.version,
        icu: process.versions.icu ?? "unknown",
        tzdb: process.versions.tz ?? "unknown"
      }
    };
    const responseBytes = Buffer.byteLength(JSON.stringify(result), "utf8");
    if (responseBytes > MAX_RESPONSE_BYTES) {
      throw new ScheduleError("OUTPUT_LIMIT", "response exceeds 524288 UTF-8 bytes", {
        responseBytes,
        limitBytes: MAX_RESPONSE_BYTES
      });
    }
    return result;
  } catch (error) {
    if (error instanceof ScheduleError) {
      const result = {
        ok: false,
        error: {
          code: error.code,
          message: error.message,
          ...error.details === void 0 ? {} : { details: error.details }
        }
      };
      return result;
    }
    return {
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: error instanceof Error ? error.message : "unknown schedule error"
      }
    };
  }
}
function validateOperationContract(request) {
  if (request.operation === "intersection" && request.schedules.length < 2) {
    throw new ScheduleError(
      "OPERATION_CONTRACT",
      "intersection requires at least two schedules"
    );
  }
  if (request.operation === "difference" && request.schedules.length !== 2) {
    throw new ScheduleError(
      "OPERATION_CONTRACT",
      "difference requires exactly two schedules: left then subtractor"
    );
  }
}
function parseHorizon(request) {
  const start = parseInstant(request.horizon.start, "horizon.start");
  const end = parseInstant(request.horizon.end, "horizon.end");
  if (end <= start) {
    throw new ScheduleError(
      "INVALID_INTERVAL",
      "horizon must be a positive half-open interval"
    );
  }
  if (end - start > MAX_HORIZON_NS) {
    throw new ScheduleError("LIMIT_EXCEEDED", "horizon cannot exceed 366 elapsed days");
  }
  return { start, end, sources: /* @__PURE__ */ new Set() };
}
function expandSchedule(schedule, context) {
  const raw = [];
  for (const [index, interval] of (schedule.intervals ?? []).entries()) {
    const start = parseInstant(interval.start, `${schedule.id}.intervals.${index}.start`);
    const end = parseInstant(interval.end, `${schedule.id}.intervals.${index}.end`);
    if (end <= start) {
      throw new ScheduleError(
        "INVALID_INTERVAL",
        `${schedule.id}.intervals.${index} must have end after start`
      );
    }
    const clipped = clipInterval(
      {
        start,
        end,
        sources: /* @__PURE__ */ new Set([
          `${schedule.id}/interval/${interval.id ?? `item-${index + 1}`}`
        ])
      },
      context.horizon
    );
    if (clipped) raw.push(clipped);
  }
  for (const recurrence of schedule.recurrences ?? []) {
    raw.push(...expandRecurrence(schedule.id, recurrence, context));
  }
  context.totalGenerated += schedule.intervals?.length ?? 0;
  if (context.totalGenerated > MAX_TOTAL_SOURCE_INTERVALS) {
    throw new ScheduleError(
      "LIMIT_EXCEEDED",
      `request expands beyond ${MAX_TOTAL_SOURCE_INTERVALS} source intervals`
    );
  }
  return { raw, normalized: normalize(raw) };
}

// src/worker-entry.ts
if (!parentPort) {
  throw new Error("schedule worker requires a parent port");
}
var input;
try {
  input = JSON.parse(String(workerData));
} catch {
  input = void 0;
}
parentPort.postMessage(runSchedule(input));
