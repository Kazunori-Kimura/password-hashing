//password generator
//passgen.js
var fs = require("fs"),
    crypto = require("crypto"),
    url = require("url"),
    util = require("util");

//passwordに使用する文字
var nums = "0123456789",
    chars  = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
    symbols = "^@!#$%&,.?-+*/=<>[]{}";
//パスワード使用文字
var password_chars = nums + chars + symbols;

//設定
var config = {
        user: "hapkoyuki@gmail.com",
        salt: "koyuki"
    };

//引数でとれるようにする
var target_service_name = "aaa";
var secret_key_word = "password";

var password_base = config.salt + config.user + target_service_name + secret_key_word;

//sha1hash取得
var shasum = crypto.createHash("sha1");
shasum.update(password_base);
var dgst = shasum.digest("hex");
//console.log(dgst);
//文字列置換
var buf = [],
    p1 = 0,
    p2 = 2;
while(p1 < dgst.length){
    //2文字取得して10進数に変換
    //console.log("%d, %d, %s", p1, p2, dgst.slice(p1, p2));
    var i = parseInt(dgst.slice(p1, p2), 16),
        pos = i % password_chars.length;
    buf.push(password_chars[pos]);
    //console.log("%d, %d", i, pos);
    p1 = p2;
    p2 += 2;
}
var pass = buf.join("");

console.log("%s  (%d)", pass, pass.length);
