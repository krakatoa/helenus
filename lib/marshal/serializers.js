var UUIDjs = require('uuid-js');

/**
 * Serializers for various types
 * @class
 */
var Serializers = {};

/**
 * Encodes an N length Integer
 * @param {Number} bits The number of bits to encode to
 * @param {Number} num The number to encode
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeInteger = function(bits, num){
  var buf = new Buffer(bits/8), func;

  if(typeof num !== 'number'){
    num = parseInt(num, 10);
  }

  switch(bits){
    case 8:  buf.writeUInt8(num, 0);    break;
    case 16: buf.writeUInt16BE(num, 0); break;
    case 32: buf.writeUInt32BE(num, 0); break;
    case 64:
      var hex = num.toString(16);
      hex = new Array(17 - hex.length).join('0') + hex;
      buf.writeUInt32BE(parseInt(hex.slice( 0, 8), 16), 0);
      buf.writeUInt32BE(parseInt(hex.slice( 8, 16), 16), 4);
  }

  return buf;
};

/**
 * Does binary encoding
 * @param {String} val The binary string to serialize
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeBinary = function(val){
  return new Buffer(val, 'binary');
};

/**
 * Encodes a Long (UInt64)
 * @param {Number} val The number to serialize into a long
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeLong = function(val){
  return Serializers.encodeInteger(64, val);
};

/**
 * Encodes a 16bit Unsinged Integer
 * @param {Number} val The number to serialize into a 16-bit integer
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeInt16 = function(val){
  return Serializers.encodeInteger(16, val);
};

/**
 * Encodes a 32bit Unsinged Integer
 * @param {Number} val The number to serialize into a 32-bit integer
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeInt32 = function(val){
  return Serializers.encodeInteger(32, val);
};

/**
 * Encodes for UTF8
 * @param {String} val The utf8 string value to serialize
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeUTF8 = function(val){
  return new Buffer(val, 'utf8');
};

/**
 * Encodes for Ascii
 * @param {String} val The ascii string value to serialize
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeAscii = function(val){
  return new Buffer(val, 'ascii');
};

/**
 * Encode a Double Precision Floating Point Type
 * @param {Number} val The number to serialize into a Double Precision Floating Point
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeDouble = function(val){
  if(typeof val !== 'number'){
    val = parseInt(val, 10);
  }

  var buf = new Buffer(8);
  buf.writeDoubleBE(val, 0);
  return buf;
};

/**
 * Encode a Double Precision Floating Point Type
 * @param {Number} val The number to serialize into a Single Precision Floating Point
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeFloat = function(val){
  if(typeof val !== 'number'){
    val = parseInt(val, 10);
  }

  var buf = new Buffer(4);
  buf.writeFloatBE(val, 0);
  return buf;
};

/**
 * Encodes a boolean type
 * @param {Boolean} val true or false, will be serialized into the proper boolean value
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeBoolean = function(val){
  var buf = new Buffer(1);
  if(val){
    buf.write('\x01', 0);
  } else {
    buf.write('\x00', 0);
  }
  return buf;
};

/**
 * Encodes a Date object
 * @param {Date} val The date to serialize
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeDate = function(val){
  var t = 1000;

  if(val instanceof Date){
    t *= val.getTime();
  } else {
    t *= new Date(val).getTime();
  }

  return Serializers.encodeLong(t);
};

/**
 * Encodes a UUID Object
 * @param {UUID} val The uuid object to serialize
 * @returns {Buffer} A buffer containing the value bytes
 * @static
 */
Serializers.encodeUUID = function(val){
  return new Buffer(val.toBytes());
};

module.exports = Serializers;