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

Asagiriのダークモードは、WCAG AA基準（コントラスト比4.5:1以上）を満たすように設計されています。

#### 背景色 / Background Colors

| 変数名 | ライトモード | ダークモード | 用途 |
|--------|-------------|-------------|------|
| `--color-bg` | `#f9f9f9` | `#0f0f0f` | メイン背景 |
| `--color-box` | `#fff` | `#18181b` | カード、ボックス |
| `--color-bg-code` | `#f0f0f0` | `#1e1e1e` | コードブロック |
| `--color-item-bg` | `#e8e8f1` | `#1f1f23` | アイテム背景 |

#### テキスト色 / Text Colors

| 変数名 | ライトモード | ダークモード | コントラスト比 |
|--------|-------------|-------------|--------------|
| `--color-text` | `#4c5059` | `#e4e4e7` | 9.8:1 |
| `--color-text-p` | `#393d43` | `#d4d4d8` | 8.5:1 |
| `--color-text-secondary` | `#666` | `#a1a1aa` | 4.6:1 |

#### 機能カラー / Functional Colors

すべての機能カラー（Success, Warning, Danger, Info, Accent）は、ダークモードで明度を調整し、視認性を確保しています：

```css
/* ライトモード */
--color-success: #00a859;
--color-warning: #ebbb0c;
--color-danger: #e1323c;
--color-info: #1ec2c2;
--color-accent: #d429e0;

/* ダークモード */
--color-success: #22c55e;
--color-warning: #fbbf24;
--color-danger: #ef4444;
--color-info: #22d3ee;
--color-accent: #e879f9;
```

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

Asagiriのダークモードは、WCAG 2.1 AA基準を満たしています：

- **通常テキスト**: 4.5:1以上のコントラスト比
- **大きいテキスト**: 3:1以上のコントラスト比
- **UI要素**: 3:1以上のコントラスト比

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
- WCAG AA準拠のアクセシブルなカラーパレット
- システム設定との連携が可能
- CSS変数を使用した拡張性の高い設計

詳細は[README.md](./README.md)を参照してください。
