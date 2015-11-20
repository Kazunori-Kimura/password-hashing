// test.js
"use strict";
var assert = require("power-assert");
var PassHash = require("../");

describe("password-hashing", function(){
  // テストデータ
  const password = "password";
  const algorithm = "sha256";
  const encoding = "base64";
  const salt = "salt";
  const stretching = 100;

  // 結果
  const passwordhash = "sha256,base64,100,salt,OuXr9veEcn+RMubx4hIV5UpnoZ5gv8k7N6mVelxXvd0=";

  describe("#digest()", function(){
    it("オプション未指定で実行", function(){
      var passhash = new PassHash();
      const result = passhash.digest(password);
      // パスワードと異なる文字列が返ってくる
      assert(result !== password);
    });

    it("saltを固定して実行", function(){
      var passhash = new PassHash({ salt });
      // 何度実行しても同じ結果が返ってくる
      assert(passhash.digest(password) === passhash.digest(password));
    });

    it("オプションをすべて指定して実行", function(){
      var passhash = new PassHash({
        algorithm,
        encoding,
        salt,
        stretching
      });
      // テスト結果と同じ結果が返ってくる
      assert(passhash.digest(password) === passwordhash);
    });
  });

  describe("#list()", function(){
    var passhash = new PassHash();

    it("Setが返ってくる", function(){
      assert(passhash.list() instanceof Set);
    });

    it("sha1が含まれている", function(){
      assert(passhash.list().has("sha1"));
    });
  });
});
