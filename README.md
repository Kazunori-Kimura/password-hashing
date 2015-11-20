# password-hashing

password hashing library for nodejs


* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
* https://github.com/Kazunori-Kimura/passgen/blob/master/passgen.js
* http://www.atmarkit.co.jp/ait/articles/1110/06/news154.html

* モジュールの作り方
  - http://phiary.me/node-js-ones-own-module-create-memo/
  - https://github.com/kriskowal/q/blob/v1/q.js


password-hashing
  generate(password : string, options : object) : string
    options
      algorithm : string
      salt : string
      stretching : number
  verify(password : string, hash : string, options : object) : boolean
