# テーマ（ダーク/ライトモード）の設定方法 / Theme Handling Guide

Asagiri CSSフレームワークでダーク/ライトモードを切り替える方法を説明します。

## 最も簡単な方法：HTMLにdata-theme属性を追加

### ライトモード（デフォルト）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <link rel="stylesheet" href="path/to/asagiri/css/main.css">
</head>
<body>
  <!-- ライトモードで表示されます -->
</body>
</html>
```

### ダークモード

```html
<!DOCTYPE html>
<html lang="ja" data-theme="dark">
<head>
  <link rel="stylesheet" href="path/to/asagiri/css/main.css">
</head>
<body>
  <!-- ダークモードで表示されます -->
</body>
</html>
```

**たったこれだけです。** `data-theme="dark"`を追加するだけで、すべてのコンポーネントが自動的にダークモードになります。

---

## JavaScriptで動的に切り替える

### パターン1：シンプルなトグルボタン

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <link rel="stylesheet" href="path/to/asagiri/css/main.css">
</head>
<body>
  <button id="themeToggle">テーマ切り替え</button>

  <script>
    const toggleButton = document.getElementById('themeToggle');
    const html = document.documentElement;

    toggleButton.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // ページ読み込み時：保存されたテーマを復元
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
    }
  </script>
</body>
</html>
```

### パターン2：システム設定を尊重する（推奨）

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <link rel="stylesheet" href="path/to/asagiri/css/main.css">
</head>
<body>
  <button id="themeToggle">テーマ切り替え</button>

  <script>
    const html = document.documentElement;

    // 初期テーマを決定
    function getInitialTheme() {
      // 1. localStorageに保存された設定を優先
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }

      // 2. システム設定を確認
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }

    // テーマを適用
    function setTheme(theme) {
      if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
      } else {
        html.removeAttribute('data-theme');
      }
      localStorage.setItem('theme', theme);
    }

    // トグルボタン
    document.getElementById('themeToggle').addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });

    // システム設定の変更を監視（オプション）
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // ユーザーが明示的に選択していない場合のみ
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // 初期化
    setTheme(getInitialTheme());
  </script>
</body>
</html>
```

### パターン3：アイコン付きトグル

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <link rel="stylesheet" href="path/to/asagiri/css/main.css">
  <style>
    .theme-toggle {
      position: fixed;
      top: 1rem;
      right: 1rem;
      padding: 0.5rem;
      background: var(--color-box);
      border: 1px solid var(--color-border);
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <button class="theme-toggle" id="themeToggle" aria-label="テーマ切り替え">
    <span id="themeIcon">Dark</span>
  </button>

  <script>
    const html = document.documentElement;
    const toggleButton = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    function updateIcon(theme) {
      themeIcon.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }

    function setTheme(theme) {
      if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
      } else {
        html.removeAttribute('data-theme');
      }
      localStorage.setItem('theme', theme);
      updateIcon(theme);
    }

    toggleButton.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });

    // 初期化
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  </script>
</body>
</html>
```

---

## React / Next.jsでの実装

### Reactコンポーネント

```jsx
import { useEffect, useState } from 'react';
import 'asagiri/css/main.css';

function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // 初期テーマを取得
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;
```

### Next.js（App Router）

```jsx
// app/components/ThemeProvider.jsx
'use client';

import { useEffect } from 'react';

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return <>{children}</>;
}
```

```jsx
// app/layout.jsx
import './globals.css';
import 'asagiri/css/main.css';
import ThemeProvider from './components/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Vue.jsでの実装

### Vueコンポーネント

```vue
<template>
  <button @click="toggleTheme">
    {{ theme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'asagiri/css/main.css';

const theme = ref('light');

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  theme.value = savedTheme || (prefersDark ? 'dark' : 'light');

  if (theme.value === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';

  if (theme.value === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  localStorage.setItem('theme', theme.value);
};
</script>
```

---

## よくある質問

### Q1: data-theme属性はどこに付ける？

**A:** `<html>`要素に付けます。

```html
<!-- 正しい -->
<html lang="ja" data-theme="dark">

<!-- 間違い -->
<body data-theme="dark">
```

### Q2: CSSで直接スタイルを当てたい場合は？

**A:** `[data-theme="dark"]`セレクタを使います。

```css
/* カスタムスタイル */
.my-component {
  background: white;
  color: black;
}

[data-theme="dark"] .my-component {
  background: #1e1e1e;
  color: white;
}
```

ただし、Asagiriのコンポーネントは自動的にダークモード対応しているため、CSS変数を使えば個別のスタイル定義は不要です：

```css
/* 推奨：CSS変数を使う */
.my-component {
  background: var(--color-box);
  color: var(--color-text);
}
```

### Q3: システム設定（OS設定）に自動追従させたい

**A:** `data-theme`属性を設定しなければ、自動的にシステム設定に従います。

```html
<!-- システム設定に従う -->
<html lang="ja">
```

JavaScriptで明示的に制御する場合：

```javascript
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const theme = e.matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
});
```

### Q4: デフォルトをダークモードにしたい

**A:** HTMLに最初から`data-theme="dark"`を設定します。

```html
<html lang="ja" data-theme="dark">
```

または、JavaScriptで：

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

### Q5: 切り替えアニメーションを追加したい

**A:** CSSトランジションを追加します。

```css
html {
  transition: background-color 0.3s ease, color 0.3s ease;
}

* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

**注意:** パフォーマンスへの影響があるため、必要最小限の要素にのみ適用してください。

---

## まとめ

### 最小限の実装（5行）

```html
<html lang="ja">
<head>
  <link rel="stylesheet" href="path/to/asagiri/css/main.css">
</head>
<body>
  <button onclick="document.documentElement.toggleAttribute('data-theme', 'dark')">
    テーマ切り替え
  </button>
</body>
</html>
```

### 推奨実装（localStorage + システム設定対応）

```html
<html lang="ja">
<head>
  <link rel="stylesheet" href="path/to/asagiri/css/main.css">
</head>
<body>
  <button id="themeToggle">テーマ切り替え</button>
  <script>
    const html = document.documentElement;

    function setTheme(theme) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }

    document.getElementById('themeToggle').addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // 初期化
    const saved = localStorage.getItem('theme');
    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved || (prefersDark ? 'dark' : 'light'));
  </script>
</body>
</html>
```

詳細なドキュメントは [DARK_MODE.md](./DARK_MODE.md) を参照してください。
