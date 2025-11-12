# Asagiri CSS Framework

<div align="center">

🌅 **朝霧** - A modern, lightweight CSS framework

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/BoxPistols/asagiri)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![CSS Size](https://img.shields.io/badge/size-60KB-orange.svg)]()

</div>

## 📖 目次

- [概要](#概要)
- [特徴](#特徴)
- [インストール](#インストール)
- [クイックスタート](#クイックスタート)
- [ドキュメント](#ドキュメント)
- [運用・更新マニュアル](#運用更新マニュアル)
- [開発](#開発)
- [ライセンス](#ライセンス)

## 概要

Asagiri（朝霧）は、モダンで軽量なCSSフレームワークです。シンプルさを保ちながら、最新のCSS機能を活用した汎用性の高いフレームワークを目指しています。

### v2.0の主な変更点

- ✨ Modern Normalize v3.0.1に更新
- 🎯 CSS Grid完全サポート
- 📏 体系的なスペーシングシステム（m-*, p-*）
- 🎨 流動的タイポグラフィ（clamp関数）
- ♿ アクセシビリティ大幅強化（focus-visible, reduced-motion）
- 📱 モバイルファーストのブレークポイントシステム
- 🗂️ 包括的なユーティリティクラス

## 特徴

### 🚀 モダンなCSS技術

- **Modern Normalize v3.0.1** - 最新のリセットCSS
- **CSS Custom Properties** - テーマのカスタマイズが容易
- **CSS Grid & Flexbox** - 柔軟なレイアウトシステム
- **Fluid Typography** - clamp()による流動的なフォントサイズ
- **Accessibility First** - WCAGガイドライン準拠

### 🎨 包括的なコンポーネント

- Typography（見出し、段落、リンク）
- Buttons（多様なバリエーション）
- Forms（入力、選択、テキストエリア）
- Tables（デフォルト、ストライプ）
- Lists（UL、OL、DL）
- Grid Systems（Flexbox & CSS Grid）

### 🛠️ 豊富なユーティリティ

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

## ドキュメント

完全なドキュメントとデモは `showcase.html` を参照してください：

```bash
# ローカルサーバーで開く
python3 -m http.server 8000
# http://localhost:8000/showcase.html
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
└── showcase.html             # デモ・ドキュメント
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

#### 4. showcase.htmlを更新

新しい機能を追加したら、必ず `showcase.html` にデモを追加してください。

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

1. ✅ **常にSCSSを編集** - CSSファイルを直接編集しない
2. ✅ **モバイルファースト** - 小さい画面から設計
3. ✅ **コメントを残す** - 意図を明確に記載
4. ✅ **showcase.htmlを更新** - 新機能のデモを追加
5. ✅ **セマンティックバージョニング** - MAJOR.MINOR.PATCH

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

- ✅ Chrome/Edge (最新2バージョン)
- ✅ Firefox (最新2バージョン)
- ✅ Safari (最新2バージョン)
- ✅ iOS Safari (最新2バージョン)
- ❌ Internet Explorer (非サポート)

## ライセンス

MIT License - See [LICENSE](LICENSE) for details

## リンク

- [GitHub Repository](https://github.com/BoxPistols/asagiri)
- [Issues](https://github.com/BoxPistols/asagiri/issues)
- [Showcase Demo](./showcase.html)

## 謝辞

- [Modern Normalize](https://github.com/sindresorhus/modern-normalize)
- All Contributors

---

<div align="center">
Made with ❤️ by <a href="https://github.com/BoxPistols">BoxPistols</a>
</div>
