"use strict";

// テストデータ
const password = "password";
const algorithm = "sha256";
const encoding = "base64";
const salt = "salt";
const stretching = 100;

const obj = {
  password,
  algorithm,
  encoding,
  salt,
  stretching
};

console.log(obj);

var mySet = new Set(["a", "b"]);

console.log(mySet instanceof Set);
