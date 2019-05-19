Todo-Timer
===

## What is this?

A simple Todo app with timer. Built with a modern web-frontend including React, Redux, TypeScript, etc.

In addition to the typical todo example, this app has the following features.

### Time tracking

Todo list tracks what you do, but does not track how much time you are spending. I believe this is an important but missing perspective because our time is always limited.

In this app, when you start working on a task, press "start". The app records how much time you spend on each task, which helps you finish them efficiently and plan ahead.

### Persisted State

Some example todo list apps are useless because they lose the data when you reload the tab. 

In this app, your todo list is stored on the browsers. If close the tab, the data will not be lost. When you reopen the app, the data will be retrieved.

### Web App Manifest

You can install the app to the homescreen. This makes it easier to access and enhance user experience.

The app is available at https://shumbo-todo-timer.netlify.com/

## Installation

```bash
git clone https://github.com/shumbo/todo-timer.git
yarn
yarn start # start webpack-dev-server at localhost:8080
yarn build:prod # production build. output at ./dist
```

You may use npm instead of yarn.

## List of technologies in use

+ TypeScript
+ React
  + Hooks (all components are function components!)
+ Redux for state management
  + Redux-Persist for storing the state to LocalStorage
+ evergreen for UI components
+ Webpack
+ Jest+Enzyme for testing
+ Storybook for component catalog
+ Prettier for code formatting

## Testing

Unit tests for reducers and react components are included.

```bash
yarn test # run test
yarn coverage # see code coverage
```

Since enzyme does not support React hooks at this moment, some components are not covered in the tests.

## Storybook

You can use storybook to browse components used in this app.

To open, hit

```bash
yarn storybook
```

or just open https://shumbo-todo-timer.netlify.com/storybook.

---

## このリポジトリについて

タイマー機能付きのシンプルなTodoリストです。React, Redux, TypeScriptなどのモダンなフロントエンドスタックを用いて作られています。

通常のTodoリストのサンプル実装に加えて、以下のような機能を備えています。

### タイムトラッキング

Todoリストは何をしたか記録してくれますが、どれだけの時間を使ったかは記録してくれません。常に限られた時間の中で過ごしている私たちにとって、この観点は重要だと考えています。

このアプリでは、作業を開始するときに"Start"ボタンを押してください。アプリがそれぞれのタスクにどれだけ時間を使ったか記録します。タスクを効率的に消化したり、今後の計画をしたりすることに役立つでしょう。

### 永続化されたステート

よくあるTodoリストのサンプル実装はリロード時にデータがリセットされてしまうため、実際に使用するには難しい場合があります。

この実装では、Todoリストはブラウザに保存されるためページを閉じてもデータは失われません。再度アプリを開けば、データが再度読み込まれます。

### Web App Manifest

このアプリをホームスクリーンにインストールすることができます。アクセスしやすくなるほか、ユーザーエクスペリエンスも向上します。

アプリは https://shumbo-todo-timer.netlify.com/ にて利用できます。

## インストール

```bash
git clone https://github.com/shumbo/todo-timer.git
yarn
yarn start # webpack-dev-server が localhost:8080 にて起動します
yarn build:prod # ./dist にproduction buildが生成されます
```

## 使用している技術

+ TypeScript
+ React
  + Hooks (全てのコンポーネントがFunction Componentとして書かれています)
+ Redux を用いた状態管理
  + Redux-Persist を用いたデータの永続化
+ evergreen を用いたUI
+ Webpack
+ Jest+Enzyme を用いたテスト
+ Storybook を用いたコンポーネントカタログ
+ Prettier を用いたコードフォーマット

## テスト

ReducerとReact componentの単体テストが含まれています。

```bash
yarn test # テストを実行
yarn coverage # コードカバレッジを確認
```

EnzymeにてReact Hooksのテストがサポートされていないため、テストが書かれていないコンポーネントがあります。

## Storybook

Storybookを用いてコンポーネントを確認できます。

```bash
yarn storybook
```

を実行するか、 https://shumbo-todo-timer.netlify.com/storybook を開いてください。
