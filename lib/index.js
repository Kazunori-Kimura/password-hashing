// index.js
"use strict";

var crypto = require('crypto');

let algorithmSet = new Set(crypto.getHashes());

class PasswordHash {
  constructor(params) {
    this.password = "password";
    this.passhash = "";

    if (params === undefined) {
      params = {};
    }

    this.options = Object.assign({
      algorithm: "sha1",
      salt: "",
      stretching: 1000
    }, params);

    validate();
  }

  generate(password, params) {
    if (password === undefined) {
      // Error!
    }
    this.password = password.toString();

    if (params === undefined) {
      params = {};
    }
    this.options = Object.assign(this.options, params);

    validate();

    return this.hash;
  }

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

    validate();
  }

  function validate(){
    if (typeof this.password !== "string") {
      // Error!
    }
    if (typeof this.passhash !== "string") {
      // Error!
    }
    if (!algorithmSet.has(this.options.algorithm)) {
      // Error!
    }
    if (typeof this.options.salt !== "string") {
      // Error!
    }
    if (typeof this.options.stretching !== "number") {
      // Error!
    }
  }



}
