# Asagiri CSS Framework

<div align="center">

**朝霧** - A modern, lightweight CSS framework

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/BoxPistols/asagiri)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![CSS Size](https://img.shields.io/badge/size-63KB-orange.svg)]()

[**Documentation**](docs/getting-started.html) | [**Showcase**](showcase.html) | [**Get Started**](#インストール)

</div>

## 目次

- [概要](#概要)
- [新機能 v2.1](#新機能-v21)
- [特徴](#特徴)
- [インストール](#インストール)
- [クイックスタート](#クイックスタート)
- [コンポーネント](#コンポーネント)
- [ダークモード](#ダークモード)
- [React / Vue での使用](#react--vue-での使用)
- [ドキュメント](#ドキュメント)
- [運用・更新マニュアル](#運用更新マニュアル)
- [開発](#開発)
- [ライセンス](#ライセンス)

## 概要

Asagiri（朝霧）は、モダンで軽量なCSSフレームワークです。シンプルさを保ちながら、最新のCSS機能を活用した汎用性の高いフレームワークを目指しています。

## 新機能 v2.1

**13個の新規UIコンポーネント**を追加し、世界トップクラスのデザインシステムに進化しました！

### 新コンポーネント

- **Alert** - 通知システム（dismissible、サイズバリエーション）
- **Badge** - ステータス表示（8色、形状、アニメーション）
- **Tabs** - ARIA完全対応タブナビゲーション
- **Accordion** - アコーディオンパネル
- **Pagination** - ページネーション
- **Breadcrumb** - パンくずナビゲーション
- **Progress** - プログレスバー（striped、animated）
- **Loading** - スピナー（4種類のスタイル）
- **Skeleton** - コンテンツプレースホルダー
- **Card** - カードコンポーネント（hover、clickable）
- **Avatar** - プロフィール画像（グループ、ステータス）
- **Form Validation** - バリデーション状態
- **Dropdown** - ドロップダウンメニュー

### 強化機能

- **TypeScript型定義**: 600+ 型定義（400個追加）
- **アクセシビリティ**: 完全なARIA対応
- **ダークモード**: 全コンポーネント対応
- **レスポンシブ**: モバイルファースト設計
- **パフォーマンス**: Reduced motion サポート

### v2.0の主な変更点

- Modern Normalize v3.0.1に更新
- **包括的なダークモードサポート**（WCAG AA準拠）
- CSS Grid完全サポート
- 体系的なスペーシングシステム（m-*, p-*）
- 流動的タイポグラフィ（clamp関数）
- アクセシビリティ大幅強化（focus-visible, reduced-motion）
- モバイルファーストのブレークポイントシステム
- 包括的なユーティリティクラス

## 特徴

### モダンなCSS技術

- **Modern Normalize v3.0.1** - 最新のリセットCSS
- **CSS Custom Properties** - テーマのカスタマイズが容易
- **CSS Grid & Flexbox** - 柔軟なレイアウトシステム
- **Fluid Typography** - clamp()による流動的なフォントサイズ
- **Accessibility First** - WCAGガイドライン準拠

### 包括的なコンポーネント

- Typography（見出し、段落、リンク）
- Buttons（多様なバリエーション）
- Forms（入力、選択、テキストエリア）
- Tables（デフォルト、ストライプ）
- Lists（UL、OL、DL）
- Grid Systems（Flexbox & CSS Grid）

### 豊富なユーティリティ

- **Spacing** - マージン・パディング（m-*, p-*, mx-*, my-*, etc.）
- **Display** - 表示制御（d-*, position-*, opacity-*, etc.）
- **Grid** - CSS Grid（grid-cols-*, gap-*, col-span-*, etc.）
- **Layout** - Flexbox（flex-*, justify-*, align-*, etc.）

## インストール

### コンパイル済みCSSを使用

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BoxPistols/asagiri@2.0/css/main.css">
```

### NPM経由

```bash
npm install asagiri
```

```html
<link rel="stylesheet" href="node_modules/asagiri/css/main.css">
```

### ダウンロード

[Releases](https://github.com/BoxPistols/asagiri/releases)から最新版をダウンロード

## クイックスタート

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Asagiri Framework</title>
  <link rel="stylesheet" href="path/to/asagiri/css/main.css">
</head>
<body>
  <div class="container">
    <h1>Hello, Asagiri!</h1>

    <!-- CSS Grid -->
    <div class="grid grid-cols-3 gap-4 my-4">
      <div class="p-4">Grid 1</div>
      <div class="p-4">Grid 2</div>
      <div class="p-4">Grid 3</div>
    </div>

    <!-- Buttons -->
    <button class="button btn-primary">Primary</button>
    <button class="button btn-success">Success</button>
  </div>
</body>
</html>
```

## ダークモード

Asagiri v2.0は、包括的なダークモードサポートを提供します。すべてのコンポーネントが自動的にダークテーマに対応します。

### 基本的な使い方

HTML要素に`data-theme="dark"`属性を追加するだけです：

```html
<html lang="ja" data-theme="dark">
```

### JavaScriptでの切り替え

```javascript
// テーマを切り替える
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
```

### 主な特徴

- WCAG AA準拠 - コントラスト比4.5:1以上
- 自動対応 - すべてのコンポーネントが自動的にテーマ切り替え
- システム連携 - `prefers-color-scheme`に対応
- カスタマイズ可能 - CSS変数で簡単にカスタマイズ

### ドキュメント

- **[テーマ設定Wiki](./WIKI_THEME_HANDLING.md)** - 実装パターン集（バニラJS、React、Vue対応）
- **[ダークモード詳細ガイド](./DARK_MODE.md)** - カラーシステム、カスタマイズ、トラブルシューティング

## React / Vue での使用

Asagiri v2.0は、React、Vue、その他のJavaScriptフレームワークでの使用に最適化されています。

### インストール

```bash
npm install asagiri
# または
yarn add asagiri
```

### React での使用

#### 基本的な使い方

```jsx
// CSSのインポート
import 'asagiri/css/main.css';

function App() {
  return (
    <div className="container">
      <h1 className="head-1">Hello, Asagiri!</h1>
      <div className="grid grid-cols-3 gap-4 my-4">
        <div className="p-4">Grid 1</div>
        <div className="p-4">Grid 2</div>
        <div className="p-4">Grid 3</div>
      </div>
      <button className="btn btn-primary">Primary</button>
    </div>
  );
}
```

#### ヘルパー関数を使用（推奨）

```jsx
import 'asagiri/css/main.css';
import { cn } from 'asagiri';

function Button({ variant, size, className, children }) {
  return (
    <button
      className={cn(
        'btn',
        variant && `btn-${variant}`,
        size && `btn-${size}`,
        className
      )}
    >
      {children}
    </button>
  );
}

// 使用例
<Button variant="primary" size="lg" className="mt-4">
  Click me
</Button>
```

#### TypeScript での使用

```tsx
import 'asagiri/css/main.css';
import { cn, AsagiriClass } from 'asagiri';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

function Card({ className, children }: CardProps) {
  return (
    <div className={cn('card', 'p-6', 'm-4', className)}>
      {children}
    </div>
  );
}
```

#### 条件付きクラス

```jsx
import { cn } from 'asagiri';

function Alert({ type, isVisible }) {
  return (
    <div
      className={cn(
        'alert',
        type && `alert-${type}`,
        isVisible && 'd-block',
        !isVisible && 'd-none'
      )}
    >
      Alert message
    </div>
  );
}

// オブジェクト形式も可能
function Card({ isActive, isDisabled }) {
  return (
    <div
      className={cn('card', {
        'opacity-50': isDisabled,
        'border-primary': isActive
      })}
    >
      Card content
    </div>
  );
}
```

### Vue での使用

#### 基本的な使い方（Vue 3 Composition API）

```vue
<script setup>
import 'asagiri/css/main.css';
import { computed } from 'vue';

const props = defineProps({
  variant: String,
  size: String
});
</script>

<template>
  <div class="container">
    <h1 class="head-1">Hello, Asagiri!</h1>
    <div class="grid grid-cols-3 gap-4 my-4">
      <div class="p-4">Grid 1</div>
      <div class="p-4">Grid 2</div>
      <div class="p-4">Grid 3</div>
    </div>
    <button class="btn btn-primary">Primary</button>
  </div>
</template>
```

#### ヘルパー関数を使用（推奨）

```vue
<script setup>
import 'asagiri/css/main.css';
import { cn } from 'asagiri';
import { computed } from 'vue';

const props = defineProps({
  variant: String,
  size: String,
  disabled: Boolean
});

const buttonClass = computed(() =>
  cn(
    'btn',
    props.variant && `btn-${props.variant}`,
    props.size && `btn-${props.size}`,
    { 'opacity-50': props.disabled }
  )
);
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

#### TypeScript での使用（Vue 3）

```vue
<script setup lang="ts">
import 'asagiri/css/main.css';
import { cn, AsagiriClass } from 'asagiri';
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'lg';
  className?: string;
}

const props = defineProps<Props>();

const buttonClass = computed(() =>
  cn('btn', props.variant && `btn-${props.variant}`, props.size && `btn-${props.size}`, props.className)
);
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

### ヘルパー関数 API

#### `cn(...classes)`

複数のクラス名を結合します。文字列、配列、オブジェクト、条件式に対応しています。

```js
import { cn } from 'asagiri';

// 基本的な使用
cn('btn', 'btn-primary'); // => 'btn btn-primary'

// 条件式
cn('btn', isActive && 'active'); // => 'btn active' (isActiveがtrueの場合)

// オブジェクト形式
cn('btn', {
  active: isActive,
  disabled: isDisabled
}); // => 'btn active' (isActiveがtrueの場合)

// 配列
cn(['btn', 'btn-primary']); // => 'btn btn-primary'

// 混合
cn('btn', { active: true }, ['m-4', 'p-2']); // => 'btn active m-4 p-2'
```

#### `asagiri(...classes)`

`cn()`のエイリアス。Asagiri特有のクラス名に対して型安全性を提供します（TypeScript使用時）。

```ts
import { asagiri } from 'asagiri';

const classes = asagiri('m-4', 'p-2', 'd-flex'); // 型チェック付き
```

### Vite / Webpack での設定

#### Vite

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // SCSSファイルを直接使う場合
        additionalData: `@import "asagiri/scss/Tokens/Token";`
      }
    }
  }
});
```

#### Webpack

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

### Next.js での使用

```jsx
// pages/_app.js または app/layout.js
import 'asagiri/css/main.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

```jsx
// components/Button.jsx
import { cn } from 'asagiri';

export default function Button({ variant, children, ...props }) {
  return (
    <button
      className={cn('btn', variant && `btn-${variant}`)}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Nuxt での使用

```js
// nuxt.config.js (Nuxt 3)
export default defineNuxtConfig({
  css: ['asagiri/css/main.css']
});
```

```vue
<!-- components/Button.vue -->
<script setup>
import { cn } from 'asagiri';

const props = defineProps({
  variant: String
});

const buttonClass = computed(() =>
  cn('btn', props.variant && `btn-${props.variant}`)
);
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

### SCSSファイルを直接インポート

カスタマイズが必要な場合は、SCSSファイルを直接インポートできます：

```scss
// あなたのプロジェクトの main.scss
@import 'asagiri/scss/Tokens/Token';
@import 'asagiri/scss/Utility/UtilityAll';

// カスタムスタイルを追加
.your-custom-class {
  // Asagiriのトークンを使用
  color: var(--color-primary);
  margin: var(--spacing-4);
}
```

## ドキュメント

### オンラインドキュメント

- **[Getting Started](./docs/getting-started.html)** - 導入ガイドとクイックスタート
- **[コンポーネント一覧](./showcase.html)** - 24+のコンポーネントデモ
- **[実用的なコード例集](./docs/guides/practical-examples.html)** - コピペですぐ使える実装例
- **[ダークモード実装ガイド](./docs/guides/dark-mode.html)** - コピペで実装できるダークモード
- **[テーマカスタマイズ](./docs/guides/theming.html)** - オリジナルテーマの作成方法
- **[Developer Guide](./docs/guides/developer-guide.html)** - API仕様・アーキテクチャ・拡張ガイド
- **[Testing Architecture](./docs/guides/testing-architecture.html)** - テスト設計アーキテクチャ完全ガイド
- **[API Reference](./docs/api-reference.html)** - 完全なCSS変数・クラス名リファレンス

### コンポーネント別ドキュメント

- **[Alert](./docs/components/alert.html)** - 通知・アラートメッセージ
- **[Badge](./docs/components/badge.html)** - ステータス・カウント表示
- その他24+のコンポーネント（[一覧を見る](./showcase.html)）

### 実践的なテンプレート

- **[管理画面ダッシュボード](./examples/admin-dashboard.html)** - サイドバー、統計、テーブル付き
- **[ログインページ](./examples/login-page.html)** - バリデーション、ソーシャルログイン付き

### ローカルで確認

```bash
# ローカルサーバーで開く
python3 -m http.server 8000
# http://localhost:8000/docs/getting-started.html
# http://localhost:8000/showcase.html
# http://localhost:8000/examples/admin-dashboard.html
```

### Storybook - インタラクティブなコンポーネントカタログ

Asagiriのすべてのコンポーネントを、Storybookで実際に操作しながら確認できます。

```bash
# Storybookを起動
npm run storybook

# ブラウザで開く
# http://localhost:6006
```

**Storybookの機能：**
- **全24+コンポーネント**をインタラクティブに検証
- **デザイントークン**の完全なドキュメント
- **アクセシビリティテスト**（axe-core統合）
- **ビジュアルリグレッションテスト**（Chromatic対応）
- **レスポンシブテスト**（複数のビューポート）
- **ダークモード切り替え**（ツールバーから）

**Storybookをビルド：**

```bash
# 静的サイトとしてビルド
npm run build-storybook

# 出力先: storybook-static/
```

### 主要なユーティリティ

#### スペーシング

```html
<div class="m-4">マージン 1rem（全方向）</div>
<div class="mt-2">マージントップ 0.5rem</div>
<div class="px-6 py-3">パディング 水平1.5rem 垂直0.75rem</div>
<div class="mx-auto">中央配置</div>
```

#### CSS Grid

```html
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- 自動レスポンシブ -->
<div class="grid grid-auto-fit-md gap-4">
  <!-- メディアクエリ不要 -->
</div>
```

#### Display

```html
<div class="d-flex">フレックス表示</div>
<div class="d-grid">グリッド表示</div>
<div class="d-none">非表示</div>
<div class="opacity-50">50%透明度</div>
```

## 運用・更新マニュアル

### プロジェクト構造

```
asagiri/
├── css/
│   └── main.css              # コンパイル済みCSS（本番用）
├── scss/
│   ├── main.scss             # メインSCSSファイル
│   ├── _Normalize.scss       # Modern Normalize
│   ├── _Typography.scss      # タイポグラフィ
│   ├── _Accessibility.scss   # アクセシビリティ
│   ├── Tokens/               # デザイントークン
│   │   ├── _Breakpoints.scss # レスポンシブ
│   │   ├── _Color.scss       # カラーシステム
│   │   └── _Spacing.scss     # スペーシング
│   ├── Utility/              # ユーティリティ
│   │   ├── _Grid.scss        # CSS Grid
│   │   ├── _SpacingSystem.scss # スペーシング
│   │   └── _Display.scss     # 表示制御
│   └── Components/           # コンポーネント
└── components.html             # デモ・ドキュメント
```

### 開発環境のセットアップ

```bash
# 1. リポジトリをクローン
git clone https://github.com/BoxPistols/asagiri.git
cd asagiri

# 2. 依存関係をインストール
npm install

# 3. SCSSをコンパイル
npx sass scss/main.scss css/main.css --no-source-map

# 4. 開発中は watch モード
npx sass scss/main.scss css/main.css --watch --no-source-map
```

### スタイルの変更手順

#### 1. カラーを変更

```scss
// scss/Tokens/_Color.scss を編集
:root {
  --color-primary: #your-color;  // ← 変更
}
```

#### 2. ブレークポイントを変更

```scss
// scss/Tokens/_Breakpoints.scss を編集
$breakpoints: (
  'md': 768px,  // ← 変更可能
  'lg': 1024px  // ← 変更可能
) !default;
```

#### 3. 新しいユーティリティを追加

```scss
// 1. scss/Utility/_YourUtility.scss を作成
.your-utility {
  // スタイルを定義
}

// 2. scss/Utility/_UtilityAll.scss にインポート追加
@import "YourUtility";

// 3. コンパイル
npx sass scss/main.scss css/main.css
```

#### 4. components.htmlを更新

新しい機能を追加したら、必ず `components.html` にデモを追加してください。

### コンパイルコマンド

```bash
# 通常コンパイル
npx sass scss/main.scss css/main.css --no-source-map

# 監視モード（開発用）
npx sass scss/main.scss css/main.css --watch --no-source-map

# 圧縮版（本番用）
npx sass scss/main.scss css/main.min.css --style=compressed --no-source-map
```

### バージョン管理

```bash
# 1. 変更をテスト
npx sass scss/main.scss css/main.css

# 2. package.json のバージョンを更新
# "version": "2.1.0"

# 3. コミット
git add .
git commit -m "feat: add new feature"
git push

# 4. タグを作成
git tag v2.1.0
git push origin v2.1.0
```

### トラブルシューティング

#### SCSSコンパイルエラー

```bash
# Sassを再インストール
npm install --save-dev sass

# キャッシュクリア
rm -rf node_modules package-lock.json
npm install
```

#### スタイルが反映されない

1. ブラウザキャッシュをクリア（Ctrl+Shift+R）
2. CSSファイルのタイムスタンプを確認
   ```bash
   ls -l css/main.css
   ```
3. HTMLのリンクパスを確認

### ベストプラクティス

1. **常にSCSSを編集** - CSSファイルを直接編集しない
2. **モバイルファースト** - 小さい画面から設計
3. **コメントを残す** - 意図を明確に記載
4. **components.htmlを更新** - 新機能のデモを追加
5. **セマンティックバージョニング** - MAJOR.MINOR.PATCH

### NPM Package運用マニュアル

このセクションでは、Asagiriフレームワークをnpmパッケージとして公開・管理する手順を説明します。

#### 事前準備

##### 1. npm アカウントの作成とログイン

```bash
# npmアカウントを持っていない場合
# https://www.npmjs.com/signup でアカウント作成

# npmにログイン
npm login

# ログイン状態の確認
npm whoami
```

##### 2. 2要素認証 (2FA) の設定

セキュリティのため、2FAの有効化を強く推奨します。

```bash
# npmのプロフィール設定で2FAを有効化
# https://www.npmjs.com/settings/your-username/tfa

# 2FAモード
# - Auth-only: ログイン時のみ必要
# - Auth-and-writes: ログイン + 公開時に必要（推奨）
```

#### パッケージの初回公開

##### 1. package.json の確認

公開前に以下の項目を確認してください：

```json
{
  "name": "asagiri",                    // パッケージ名（重複不可）
  "version": "2.0.0",                   // セマンティックバージョニング
  "description": "...",                  // 簡潔な説明
  "main": "css/main.css",               // メインエントリーポイント
  "files": [                            // 公開するファイル
    "css/",
    "scss/",
    "index.js",
    "index.mjs",
    "index.d.ts"
  ],
  "keywords": [...],                    // 検索用キーワード
  "license": "MIT",                     // ライセンス
  "repository": {...},                  // GitHubリポジトリ
  "engines": {                          // Node.jsバージョン要件
    "node": ">=14.0.0"
  }
}
```

##### 2. パッケージ内容の確認

```bash
# 公開されるファイルの一覧を確認
npm pack --dry-run

# 実際にtarballを作成して確認
npm pack
tar -tzf asagiri-2.0.0.tgz
rm asagiri-2.0.0.tgz
```

##### 3. ビルドとテスト

```bash
# SCSSをコンパイル
npm run build
npm run build:compressed

# ビルド成果物の確認
ls -la css/

# ローカルでパッケージをテスト
npm link
cd /path/to/test-project
npm link asagiri
```

##### 4. 初回公開

```bash
# 公開（publicパッケージとして）
npm publish --access public

# スコープ付きパッケージの場合
npm publish --access public

# 公開の確認
npm view asagiri
```

#### パッケージの更新

##### 1. バージョニング規則（Semantic Versioning）

```
MAJOR.MINOR.PATCH (例: 2.1.3)

- MAJOR: 破壊的変更（Breaking Changes）
- MINOR: 後方互換性のある機能追加
- PATCH: 後方互換性のあるバグ修正
```

##### 2. バージョンアップの手順

```bash
# パッチバージョンアップ（バグ修正）
npm version patch      # 2.0.0 → 2.0.1

# マイナーバージョンアップ（機能追加）
npm version minor      # 2.0.1 → 2.1.0

# メジャーバージョンアップ（破壊的変更）
npm version major      # 2.1.0 → 3.0.0

# カスタムバージョン指定
npm version 2.1.5

# プレリリースバージョン
npm version prerelease --preid=beta  # 2.0.0 → 2.0.1-beta.0
npm version prerelease --preid=alpha # 2.0.0 → 2.0.1-alpha.0
```

##### 3. 更新公開のワークフロー

```bash
# 1. 変更内容の確認
git status
git diff

# 2. ビルド
npm run build
npm run build:compressed

# 3. テスト（任意だが推奨）
# npm test

# 4. バージョンアップ（自動でgit commitとtagが作成される）
npm version minor -m "feat: add new utility classes"

# 5. GitHubにプッシュ
git push origin main
git push origin --tags

# 6. npmに公開
npm publish

# 7. 公開の確認
npm view asagiri version
npm info asagiri
```

#### タグ管理 (dist-tags)

```bash
# デフォルトは "latest" タグ
npm publish                           # latest
npm publish --tag beta                # beta版として公開
npm publish --tag next                # next版として公開

# タグの確認
npm dist-tag ls asagiri

# タグの追加
npm dist-tag add asagiri@2.1.0 stable

# タグの削除
npm dist-tag rm asagiri beta

# 特定タグをインストール
npm install asagiri@beta
npm install asagiri@next
```

#### パッケージ情報の更新

```bash
# package.jsonのメタデータを変更後
npm publish

# READMEのみ更新（バージョンアップ不要）
# README.md を編集後
npm publish
```

#### 非推奨化 (Deprecate)

```bash
# 特定バージョンを非推奨に
npm deprecate asagiri@1.0.0 "Please upgrade to 2.0.0"

# バージョン範囲で非推奨に
npm deprecate asagiri@"< 2.0.0" "Version 1.x is no longer supported"

# 非推奨を解除
npm deprecate asagiri@1.0.0 ""
```

#### パッケージの削除（非推奨）

```bash
# 公開から72時間以内のみ削除可能（それ以降は非推奨化を使用）
npm unpublish asagiri@2.0.0

# パッケージ全体を削除（非推奨、使用禁止）
# npm unpublish asagiri --force
```

#### アクセス権限の管理

```bash
# コラボレーターを追加
npm owner add <username> asagiri

# コラボレーターを削除
npm owner rm <username> asagiri

# 所有者リストの確認
npm owner ls asagiri

# パッケージのアクセス権限を変更
npm access public asagiri
npm access restricted asagiri   # スコープ付きのみ
```

#### トラブルシューティング

##### 公開エラー: "You do not have permission to publish"

```bash
# 1. ログイン状態を確認
npm whoami

# 2. 再ログイン
npm logout
npm login

# 3. パッケージ名の重複確認
npm view asagiri
```

##### 公開エラー: "Package name too similar to existing package"

```bash
# パッケージ名を変更するか、スコープを追加
# @your-org/asagiri のような形式
```

##### バージョンエラー: "Version already published"

```bash
# バージョンを上げる
npm version patch
npm publish
```

##### ファイルが含まれていない

```bash
# .npmignoreを確認（存在する場合、.gitignoreより優先される）
cat .npmignore

# package.json の "files" フィールドを確認
# "files": ["css/", "scss/", "index.js", ...]

# 実際の公開内容を確認
npm pack --dry-run
```

#### CI/CD による自動公開（GitHub Actions）

`.github/workflows/publish.yml` の例：

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm run build:compressed
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

GitHub Secretsに `NPM_TOKEN` を追加：
1. npmで Access Token を生成: https://www.npmjs.com/settings/your-username/tokens
2. GitHubリポジトリの Settings > Secrets > New repository secret
3. Name: `NPM_TOKEN`, Value: 生成したトークン

#### ベストプラクティス

1. **必ず prepublishOnly スクリプトを使用**
   ```json
   {
     "scripts": {
       "prepublishOnly": "npm run build && npm run build:compressed"
     }
   }
   ```

2. **セマンティックバージョニングを厳守**
   - 破壊的変更はメジャーバージョンアップ
   - 機能追加はマイナーバージョンアップ
   - バグ修正はパッチバージョンアップ

3. **CHANGELOG.md を維持**
   - 各バージョンの変更内容を記録

4. **タグとリリースノートを作成**
   ```bash
   git tag -a v2.1.0 -m "Release version 2.1.0"
   git push origin v2.1.0
   ```

5. **公開前にローカルテスト**
   ```bash
   npm link
   cd ../test-project
   npm link asagiri
   ```

6. **2要素認証を有効化** - セキュリティ向上

7. **不要なファイルを除外**
   - `.npmignore` または `package.json` の `files` で制御

8. **公開後72時間以上経過したパッケージは削除しない**
   - 代わりに `npm deprecate` を使用

## 開発

### ブランチ戦略

- `main` - 本番環境（安定版）
- `develop` - 開発環境
- `feature/*` - 新機能開発
- `fix/*` - バグ修正

### コントリビューション

プルリクエストを歓迎します！

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ブラウザサポート

- Chrome/Edge (最新2バージョン)
- Firefox (最新2バージョン)
- Safari (最新2バージョン)
- iOS Safari (最新2バージョン)
- Internet Explorer (非サポート)

## ライセンス

MIT License - See [LICENSE](LICENSE) for details

## リンク

- [GitHub Repository](https://github.com/BoxPistols/asagiri)
- [Issues](https://github.com/BoxPistols/asagiri/issues)
- [Showcase Demo](./components.html)

## 謝辞

- [Modern Normalize](https://github.com/sindresorhus/modern-normalize)
- All Contributors

---

<div align="center">
Made with love by <a href="https://github.com/BoxPistols">BoxPistols</a>
</div>
