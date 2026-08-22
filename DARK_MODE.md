# ダークモード使用ガイド / Dark Mode Usage Guide

Asagiriフレームワークv2.0では、包括的なダークモードサポートを提供しています。

## 目次 / Table of Contents

- [基本的な使い方](#基本的な使い方--basic-usage)
- [JavaScript実装](#javascript実装--javascript-implementation)
- [カラーシステム](#カラーシステム--color-system)
- [コンポーネント対応](#コンポーネント対応--component-support)
- [カスタマイズ](#カスタマイズ--customization)

---

## 基本的な使い方 / Basic Usage

### HTML属性で切り替え

ダークモードを有効にするには、`<html>`要素に`data-theme="dark"`属性を追加するだけです：

```html
<!-- ライトモード (デフォルト) -->
<html lang="ja">

<!-- ダークモード -->
<html lang="ja" data-theme="dark">
```

### CSSのインポート

```html
<!-- メインCSSを読み込む -->
<link rel="stylesheet" href="path/to/asagiri/css/main.css">
```

これだけで、すべてのコンポーネント、ユーティリティクラス、レイアウトが自動的にダークモードに対応します。

---

## JavaScript実装 / JavaScript Implementation

### シンプルなトグル実装

```javascript
// テーマを切り替える
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// ボタンに紐付け
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
```

### システム設定と連携する実装

```javascript
// 保存されたテーマまたはシステム設定を取得
function getPreferredTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }

  // システムのダークモード設定を確認
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// 初期テーマを設定
function initTheme() {
  const theme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', theme);
}

// テーマを切り替え
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // アイコンを更新（オプション）
  updateThemeIcon(newTheme);
}

// アイコン更新（オプション）
function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle .icon');
  if (icon) {
    // SVG icons are toggled via display property instead of text content
  }
}

// システム設定変更の監視
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
  }
});

// ページ読み込み時に初期化
initTheme();
```

### HTMLボタンの例

```html
<button id="theme-toggle" aria-label="テーマ切り替え">
  <span class="icon">Dark</span>
  <span class="text">ダークモード</span>
</button>
```

---

## カラーシステム / Color System

### ダークモードのカラーパレット

Asagiriのダークモードは、`[data-theme="dark"]` が意味トークンだけを再マップする
単一の仕組みで実装されています。コンポーネント側に色のためのダークモード用
セレクタは不要です。

以下の値は実装（`css/main.css`）から生成しています。

<!-- BEGIN GENERATED: color-tokens -->

<!-- このセクションは scripts/generate-token-docs.mjs が css/main.css から
     生成します。手で編集しても次回の生成で上書きされます。
     再生成: npm run docs:tokens -->

#### 背景・サーフェス / Surfaces

| 変数名 | ライト | ダーク | 用途 |
|---|---|---|---|
| `--color-bg` | `#f5f5f8` | `#0a0a0b` | ページ背景 |
| `--color-surface` | `#ffffff` | `#17171a` | カード・シート |
| `--color-surface-1` | `#f8fcfc` | `#21252a` | 標高1（最も低い） |
| `--color-surface-3` | `#ecf6f8` | `#2e363d` | 標高3 |
| `--color-surface-5` | `#e3f2f5` | `#39454b` | 標高5（最も高い） |
| `--color-surface-variant` | `#efeff3` | `#26262b` | 控えめな面（バッジ基底など） |
| `--color-surface-inverse` | `#1d1d21` | `#e4e4ea` | 反転面（ツールチップ） |
| `--color-surface-brand` | `#003c4b` | `#003c4b` | ブランド外装（テーマ不変） |

#### テキスト / Text

| 変数名 | ライト | ダーク | 用途 |
|---|---|---|---|
| `--color-text-primary` | `#26262b` | `#efeff3` | 本文 |
| `--color-text-secondary` | `#53535a` | `#cacad2` | 補助テキスト |
| `--color-text-tertiary` | `#6a6a74` | `#acacb5` | 三次テキスト |
| `--color-text-link` | `#006e82` | `#89d4e5` | リンク |
| `--color-on-scrim` | `#ffffff` | `#ffffff` | スクリム上の前景（両モード共通） |

#### ブランド / Brand

| 変数名 | ライト | ダーク | 用途 |
|---|---|---|---|
| `--color-primary` | `#4fabbf` | `#71bbcc` | ブランド主色（ラベル付き塗り） |
| `--color-primary-emphasis` | `#0089a0` | `#5bc1d7` | インジケータ塗り・フォーカスリング |
| `--color-on-primary-emphasis` | `#000000` | `#002831` | emphasis 塗り上の文字 |
| `--color-primary-hover` | `#6bb8ca` | `#87c6d4` | ホバー時の塗り |
| `--color-on-primary` | `#002831` | `#002831` | primary 上の前景 |
| `--color-secondary` | `#56648a` | `#919cba` | ブランド副色 |
| `--color-on-secondary` | `#ffffff` | `#0e1528` | secondary 上の前景 |

#### 機能カラー / Functional

| 変数名 | ライト | ダーク | 用途 |
|---|---|---|---|
| `--color-success` | `#007a44` | `#22c55e` | 成功 |
| `--color-warning` | `#8a6100` | `#eab308` | 警告 |
| `--color-danger` | `#b3261e` | `#e55353` | エラー |
| `--color-info` | `#0e7490` | `#22d3ee` | 情報 |
| `--color-accent` | `#c026d3` | `#e879f9` | アクセント |

#### 境界・フォーカス / Borders

| 変数名 | ライト | ダーク | 用途 |
|---|---|---|---|
| `--color-border` | `#000000` (α0.14) | `#ffffff` (α0.12) | 標準の境界 |
| `--color-border-strong` | `#000000` (α0.24) | `#ffffff` (α0.22) | 強い境界 |
| `--color-focus-ring` | `#0089a0` | `#5bc1d7` | フォーカスリング |
| `--color-focus-ring-on-brand` | `#89d4e5` | `#89d4e5` | ブランド面上のフォーカスリング |

コントラスト比は `npm run test:contrast` が全ペアについて実ブラウザで検証し、
`scripts/contrast-baseline.json` を基準に退行を検出します。

<!-- END GENERATED: color-tokens -->

---

## コンポーネント対応 / Component Support

### 自動対応コンポーネント

以下のコンポーネントは、CSS変数を使用しているため自動的にダークモードに対応します：

- **ボタン** - すべてのバリエーション（Primary, Secondary, Accent, Success, Warning, Danger, Info, Elegant）
- **フォーム** - Input, Textarea, Select（カスタムarrow付き）
- **テーブル** - デフォルト、Stripe、Dark header
- **モーダル** - Header, Body, Footer
- **コードブロック** - Pre, Code, Code Block
- **ナビゲーション** - Sidebar Nav
- **レイアウト** - Doc Layout, Patterns
- **ユーティリティ** - Color, Spacing, Display, Grid

### 使用例

```html
<!-- ボタンは自動的にテーマに対応 -->
<button class="btn-primary">プライマリボタン</button>
<button class="btn-success">成功ボタン</button>

<!-- フォームも自動対応 -->
<input type="text" placeholder="テキスト入力">
<select>
  <option>選択肢1</option>
</select>

<!-- テーブルも自動対応 -->
<table class="stripe">
  <thead class="dark">
    <tr><th>ヘッダー</th></tr>
  </thead>
  <tbody>
    <tr><td>データ</td></tr>
  </tbody>
</table>
```

---

## カスタマイズ / Customization

### カラー変数の上書き

独自のダークモードカラーを設定する場合：

```css
[data-theme="dark"] {
  /* 背景色をカスタマイズ */
  --color-bg: #000000;
  --color-box: #1a1a1a;

  /* テキスト色をカスタマイズ */
  --color-text: #ffffff;

  /* プライマリカラーの明度を調整 */
  --primary-l: 70%;
}
```

### 新しいコンポーネントでの使用

新しいコンポーネントを作成する場合、CSS変数を使用することで自動的にダークモード対応になります：

```css
.my-component {
  background: var(--color-box);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: var(--box-shadow);
}

/* ダークモード用の個別スタイルは不要！ */
```

### 特定の要素のみダークモード対応を無効化

```css
.always-light {
  background: #ffffff !important;
  color: #333333 !important;
}

[data-theme="dark"] .always-light {
  /* 上書きを防ぐため、!importantを使用 */
  background: #ffffff !important;
  color: #333333 !important;
}
```

---

## アクセシビリティ / Accessibility

### WCAG準拠

デザインシステムが提供する前景／背景の組み合わせは、ライト・ダーク両モードで
以下を満たします。

- **通常テキスト**: 4.5:1以上（SC 1.4.3）
- **大きいテキスト**: 3:1以上（SC 1.4.3）
- **ラベルを持たない UI インジケータ**: 3:1以上（SC 1.4.11）

これは主張ではなく検証結果です。`npm run test:contrast` が全トークンペアを
実ブラウザで解決して両モードで測定し、`scripts/contrast-baseline.json` を
基準に退行を検出します。

WCAG が適合を要求しない項目（無効状態のテキスト、装飾的な区切り線、ラベルで
識別できる塗り）は、免除として明示のうえ数値だけ記録しています。

なお、これはトークンの組み合わせに対する保証です。トークンを独自の色で
上書きした場合や、任意の色を直接指定した場合は対象外なので、
`npm run test:contrast` で再検証してください。

### 推奨事項

1. **テーマ切り替えボタンにaria-labelを設定**
   ```html
   <button id="theme-toggle" aria-label="ダークモードに切り替え">
   ```

2. **システム設定を尊重**
   - ユーザーがOS設定でダークモードを選択している場合、デフォルトでダークモードを適用

3. **選択を保存**
   - `localStorage`を使用してユーザーの選択を保存

---

## トラブルシューティング / Troubleshooting

### ダークモードが適用されない

1. **HTML属性を確認**
   ```javascript
   console.log(document.documentElement.getAttribute('data-theme'));
   // "dark"と表示されるべき
   ```

2. **CSSが正しく読み込まれているか確認**
   ```html
   <link rel="stylesheet" href="css/main.css">
   ```

3. **CSSにdata-theme="dark"のスタイルが含まれているか確認**
   ```bash
   grep "data-theme" css/main.css
   ```

### 一部のコンポーネントが対応していない

固定色（`#fff`, `#333`など）を使用している場合、CSS変数に置き換えてください：

```css
/* 悪い例 */
.my-component {
  background: #ffffff;
  color: #333333;
}

/* 良い例 */
.my-component {
  background: var(--color-box);
  color: var(--color-text);
}
```

---

## サンプルコード / Sample Code

完全な実装例は`index.html`を参照してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Asagiri Dark Mode Demo</title>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <header>
    <h1>Asagiri Framework</h1>
    <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
      <svg id="theme-icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      <svg id="theme-icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><circle cx="12" cy="12" r="5"></circle></svg>
    </button>
  </header>

  <main>
    <p>ダークモード対応のコンテンツ</p>
    <button class="btn-primary">プライマリボタン</button>
    <button class="btn-success">成功ボタン</button>
  </main>

  <script>
    // テーマ初期化
    function initTheme() {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

      document.documentElement.setAttribute('data-theme', theme);
      updateIcon(theme);
    }

    // テーマ切り替え
    function toggleTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon(newTheme);
    }

    // アイコン更新
    function updateIcon(theme) {
      const icon = document.getElementById('theme-icon');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'Light' : 'Dark';
      }
    }

    // イベントリスナー
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // システム設定変更の監視
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateIcon(newTheme);
      }
    });

    // 初期化
    initTheme();
  </script>
</body>
</html>
```

---

## まとめ / Summary

- `data-theme="dark"`属性を追加するだけで簡単に切り替え
- すべてのコンポーネントが自動対応
- WCAG 2.1 AA を満たすカラーパレット（`npm run test:contrast` で検証）
- システム設定との連携が可能
- CSS変数を使用した拡張性の高い設計

詳細は[README.md](./README.md)を参照してください。
