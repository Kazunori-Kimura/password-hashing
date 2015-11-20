// index.js
"use strict";

var crypto = require('crypto');

/**
 * cryptoモジュールで使用できるアルゴリズム
 */
let algorithmSet = new Set(crypto.getHashes());
/**
 * cryptoモジュールで使用できるencoding
 */
let encodingSet = new Set(["binary", "hex", "base64"]);

/**
 * get digest from crypto module
 * @param {string} password
 * @param {object} options - algorithm, encoding, salt, stretching
 * @return {string} password hash
 */
function _digest(password, options) {
  var result = options.salt + password;

  for (var i=0; i<options.stretching; i++) {
    // hashはdigestを一度呼ぶと使用できなくなるので、毎回生成する
    var hash = crypto.createHash(options.algorithm.toLowerCase());
    hash.update(result);
    result = hash.digest(options.encoding.toLowerCase());
  }

  return result;
}


class PasswordHash {

  /**
   * @param {object} [parameters] - algorithm, encoding, salt, stretching
   */
  constructor(params) {
    this.password = "password";
    this.passhash = "";

    if (params === undefined) {
      params = {};
    }

    this.options = Object.assign({
      algorithm: "sha1",
      encoding: "hex",
      salt: "",
      stretching: 1000
    }, params);
  }

  /**
   * validate parameters
   */
  validate() {
    if (typeof this.password !== "string") {
      // Error!
    }
    if (typeof this.passhash !== "string") {
      // Error!
    }
    if (typeof this.options.algorithm !== "string") {
      // Error!
    }
    if (!algorithmSet.has(this.options.algorithm.toLowerCase())) {
      // Error!
    }
    if (typeof this.options.encoding !== "string") {
      // Error!
    }
    if (!encodingSet.has(this.options.encoding.toLowerCase())) {
      // Error!
    }
    if (typeof this.options.salt !== "string") {
      // Error!
    }
    if (typeof this.options.stretching !== "number") {
      // Error!
    }
  }

  /**
   * @param {string} password
   * @param {object} [parameters] - algorithm, encoding, salt, stretching
   * @return {string} password hash
   */
  digest(password, params) {
    if (password === undefined) {
      // Error!
    }
    this.password = password.toString();

    if (params === undefined) {
      params = {};
    }
    this.options = Object.assign(this.options, params);

    this.validate();

    // password hashing
    this.passhash = _digest(this.password, this.options);

    return this.passhash;
  }

  /**
   * @param {string} password
   * @param {string} password hash
   * @param {object} [parameters] - algorithm, encoding, salt, stretching
   * @param {boolean}
   */
  verify(password, passhash, params) {
    if (password === undefined) {
      // Error!
    }
    this.password = password.toString();

    if (passhash === undefined) {
      // Error!
    }
    this.passhash = passhash.toString();

    if (params === undefined) {
      params = {};
    }
    this.options = Object.assign(this.options, params);

    this.validate();

    // password hashing
    let ph = _digest(this.password, this.options);

    return this.passhash === ph;
  }
}

exports.PasswordHash = PasswordHash;
