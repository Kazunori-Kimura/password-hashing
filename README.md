# password-hashing

パスワードのハッシュ値を取得するコマンドラインツールと
ハッシュ値計算の定型処理をラッピングしたモジュールを提供します。

* nodejs >= 4.2.2

<br>

## コマンドラインツールの使い方

### インストール方法

```sh
npm install -g password-hashing
```

### 使い方

```sh
$ passhash -h

  Usage: passhash [options] [command]


  Commands:

    digest [options] <password>         パスワードからハッシュを取得します。
    verify [options] <password> <hash>  パスワードとハッシュが一致しているかチェックします。
    list                                サポートされているハッシュアルゴリズムを表示します。

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

#### パスワードからハッシュ値を計算する

```sh
$ passhash digest -h

  Usage: digest [options] <password>

  パスワードからハッシュを取得します。

  Options:

    -h, --help               output usage information
    -A, --algorithm <value>  ハッシュアルゴリズムを指定します。デフォルト:'sha1'
    -E, --encoding <value>   エンコードを指定します(binary,hex,base64)。デフォルト:'hex'
    -S, --salt <value>       パスワードに付与するsaltを指定します。
    -s, --stretching <n>     ストレッチング回数を指定します。デフォルト:1000
    -O, --hashonly           ハッシュ値のみを返します。
```

ハッシュ値の計算結果は、カンマ区切りで以下のように出力されます。

`ハッシュアルゴリズム`,`エンコード`,`ストレッチング回数`,`salt`,`ハッシュ値`

<br>

使用例:

```sh
$ passhash digest password
sha1,hex,1000,h3FU+tu74TH+blPNor6aug==,c8a4d21099dceb9ac2e0cb68870c0b155346d652

$ passhash digest password -A sha256 -E base64
sha256,base64,1000,Mc40p6oodCK7yUPFk/go8A==,u62B5sb93iFuWI2Emj4wZZPmR7bLYwLWoDsVRoSzvEU=

$ passhash digest password -A sha256 -E base64 -S MySalt
sha256,base64,1000,MySalt,R6/qNl2hV1PvJLVngM3vTWvMyR+ZcQD85F+/+AyjP9c=
```

#### パスワードとハッシュを検証する

```sh
$ passhash verify -h

  Usage: verify [options] <password> <hash>

  パスワードとハッシュが一致しているかチェックします。

  Options:

    -h, --help               output usage information
    -A, --algorithm <value>  ハッシュアルゴリズムを指定します。デフォルト:'sha1'
    -E, --encoding <value>   エンコードを指定します(binary,hex,base64)。デフォルト:'hex'
    -S, --salt <value>       パスワードに付与するsaltを指定します。
    -s, --stretching <n>     ストレッチング回数を指定します。デフォルト:1000
```

`digest` コマンドの計算結果(カンマ区切りの文字列)を `<hash>` に指定すると
アルゴリズム等のオプション設定を文字列から判断して使用します。

<br>

使用例:

```sh
$ passhash verify password R6/qNl2hV1PvJLVngM3vTWvMyR+ZcQD85F+/+AyjP9c= -A sha256 -E base64 -S MySalt
検証結果: true

$ passhash verify password sha256,base64,1000,MySalt,R6/qNl2hV1PvJLVngM3vTWvMyR+ZcQD85F+/+AyjP9c=
検証結果: true
```
