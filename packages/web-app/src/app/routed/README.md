# Routed Modules 

ルーテッドモジュールは、Angular NgModule の中でルートの要素を持つモジュールです。

https://angular.jp/guide/module-types

ルーテッドモジュールはどこからも import されず、app-routing.module.ts の中で、遅延ロードされることが想定されています。

## Routed Module の一覧

- auth:  prefix は login。認証に関するルートを保有します。
- boards:  prefix は `/repos/_user/_repo/boards`。認証に関するルートを保有します。

## ルール

Routed Module の中では以下の点に注意して下さい。

- サービスはすべて injectedIn: Module のスコープで作成します。
  - injectedIn: "root" のサービスは作成しないで下さい。
