/*
 * password-hashing
 */
"use strict";

var PassHash = require("./lib/").PasswordHash;
var passhash = new PassHash({salt: "hoge", encoding: "base64"});

let pass = passhash.digest("password");

console.log(pass);

console.log(passhash.verify("password", "862e52b42b26c0f7e2b6ef5f635226bf0fd3f7fb"));

console.log(passhash.verify("password", "hoge"));
