// passhash.js
"use strict";
var crypto = require('crypto');

/**
 * cryptoモジュールで使用できるアルゴリズム
 */
const algorithmSet = new Set(crypto.getHashes());
/**
 * cryptoモジュールで使用できるencoding
 */
const encodingSet = new Set(["binary", "hex", "base64"]);
/**
 * 基数 - stretchingの表示・取得に使用
 */
const radix = 10;

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

/**
 * generate salt string
 * @return {string}
 */
function _generateSalt() {
  const d = "" + Date.now();
  var hash = crypto.createHash("md5");
  hash.update(d);
  const result = hash.digest("base64");
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
      stretching: 1000,
      hashonly: false
    }, params);

    if (this.options.salt.length > 0) {
      this.options.fixedSalt = true;
    } else {
      this.options.fixedSalt = false;
    }
  }

  /**
   * validate parameters
   */
  validate() {
    if (typeof this.password !== "string") {
      // Error!
      throw new TypeError("passwordがstringではありません");
    }
    if (typeof this.passhash !== "string") {
      // Error!
      throw new TypeError("passhashがstringではありません");
    }
    if (typeof this.options.algorithm !== "string") {
      // Error!
      throw new TypeError("algorithmがstringではありません");
    }
    if (!algorithmSet.has(this.options.algorithm.toLowerCase())) {
      // Error!
      throw new Error("指定されたalgorithmは使用できません");
    }
    if (typeof this.options.encoding !== "string") {
      // Error!
      throw new TypeError("encodingがstringではありません");
    }
    if (!encodingSet.has(this.options.encoding.toLowerCase())) {
      // Error!
      throw new Error("指定されたencodingは使用できません");
    }
    if (typeof this.options.salt !== "string") {
      // Error!
      throw new TypeError("saltがstringではありません");
    }
    if (typeof this.options.stretching !== "number") {
      // Error!
      throw new TypeError("stretchingがnumberではありません");
    }
  }

  /**
   * 指定された設定でパスワードのハッシュ値を計算する
   * @param {string} password
   * @param {object} [parameters] - algorithm, encoding, salt, stretching
   * @return {string} password hash
   */
  digest(password, params) {
    if (password === undefined) {
      // Error!
      throw new Error("passwordが指定されていません");
    }
    this.password = password.toString();

    if (params === undefined) {
      params = {};
    }
    this.options = Object.assign(this.options, params);

    if (!this.options.fixedSalt) {
      this.options.salt = _generateSalt();
    }

    this.validate();

    // password hashing
    this.passhash = _digest(this.password, this.options);

    var ret = "";
    if (this.options.hashonly) {
      ret = this.passhash;
    } else {
      // ex. "$sha1$1000$salt.passhash"
      ret = `${this.options.algorithm},${this.options.encoding},${this.options.stretching.toString(radix)},${this.options.salt},${this.passhash}`;
    }
    return ret;
  }

  /**
   * 指定されたパスワードを検証し、ハッシュと一致するかどうかを返す
   * @param {string} password
   * @param {string} password hash
   * @param {object} [parameters] - algorithm, encoding, salt, stretching
   * @return {boolean}
   */
  verify(password, passhash, params) {
    if (password === undefined) {
      // Error!
      throw new Error("passwordが指定されていません");
    }
    this.password = password.toString();

    if (passhash === undefined) {
      // Error!
      throw new Error("passhashが指定されていません");
    }
    this.passhash = passhash.toString();

    if (params === undefined) {
      params = {};
    }
    this.options = Object.assign(this.options, params);

    const reg = /^(.+)\,(.+)\,(.+)\,(.+)\,(.+)$/;
    if (reg.test(this.passhash)) {
      // passhashを元にoptionsを取得
      const result = this.passhash.match(reg);
      this.options.algorithm = result[1];
      this.options.encoding = result[2];
      this.options.stretching = parseInt(result[3], radix);
      this.options.salt = result[4];
      this.passhash = result[5];
    }

    this.validate();

    // password hashing
    const ph = _digest(this.password, this.options);
    return this.passhash === ph;
  }

  /**
   * パスワードハッシュで指定可能なアルゴリズムの一覧を返す
   * @return {Set}
   */
  list() {
    return algorithmSet;
  }
}

module.exports = PasswordHash;
