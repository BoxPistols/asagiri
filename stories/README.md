# Asagiri Storybook

このディレクトリには、Asagiri CSS Frameworkの全コンポーネントのStorybookストーリーが含まれています。

## 📂 ディレクトリ構造

```
stories/
├── Introduction.mdx              # Storybookのイントロダクション
├── components/                   # コンポーネントストーリー
│   ├── Alert.stories.js         # Alertコンポーネント
│   ├── Badge.stories.js         # Badgeコンポーネント
│   ├── Button.stories.js        # Buttonコンポーネント
│   ├── Card.stories.js          # Cardコンポーネント
│   └── ...                      # その他24+のコンポーネント
├── foundations/                  # デザイン基礎
│   └── DesignTokens.mdx         # デザイントークンドキュメント
└── templates/                    # テンプレート
    ├── Portfolio.stories.js     # ポートフォリオテンプレート
    ├── Blog.stories.js          # ブログテンプレート
    └── ...                      # その他のテンプレート
```

## 🚀 使い方

### Storybookの起動

```bash
npm run storybook
```

ブラウザで http://localhost:6006 が自動的に開きます。

### ストーリーの追加

新しいコンポーネントのストーリーを作成する場合：

```javascript
// stories/components/NewComponent.stories.js
export default {
  title: 'Components/NewComponent',
  tags: ['autodocs'],
  argTypes: {
    // コントロール定義
  },
};

export const Default = {
  render: () => `<div class="new-component">Content</div>`,
};
```

## 🧪 テスト

### アクセシビリティテスト

Storybookの「Accessibility」タブでリアルタイムにアクセシビリティ問題を確認できます。

```bash
# テストランナーを実行
npm run test:a11y
```

### ビジュアルリグレッションテスト

Chromaticを使用してビジュアルリグレッションテストを実行：

```bash
npm run test:visual
```

## 📋 ストーリー作成のベストプラクティス

### 1. 包括的なバリエーション

すべての状態とバリエーションをカバーする：

```javascript
export const AllVariants = {
  render: () => `
    <div class="btn btn-primary">Primary</div>
    <div class="btn btn-secondary">Secondary</div>
    <div class="btn btn-success">Success</div>
  `,
};
```

### 2. インタラクティブなコントロール

argTypesでプロパティを制御可能にする：

```javascript
argTypes: {
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'success'],
  },
  disabled: {
    control: 'boolean',
  },
}
```

### 3. アクセシビリティ

適切なARIA属性とセマンティックHTMLを使用：

```javascript
export const Accessible = {
  render: () => `
    <button class="btn btn-primary" aria-label="Submit form">
      Submit
    </button>
  `,
};
```

### 4. レスポンシブテスト

複数のビューポートサイズでテスト可能にする：

```javascript
parameters: {
  viewport: {
    viewports: {
      mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
      tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
    },
  },
}
```

### 5. ダークモードサポート

テーマ切り替えをサポート（toolbar経由で自動的に可能）

## 🔧 デザイントークンの検証

デザイントークンを分析してインラインスタイルを検出：

```bash
npm run analyze:tokens
```

結果は `docs/design-tokens.md` に出力されます。

## 📚 参考リソース

- [Storybook公式ドキュメント](https://storybook.js.org/docs)
- [axe-core (アクセシビリティテスト)](https://github.com/dequelabs/axe-core)
- [Chromatic (ビジュアルリグレッション)](https://www.chromatic.com/)
- [Asagiri Documentation](../docs/getting-started.html)

## 🤝 コントリビューション

新しいコンポーネントを追加する場合は、必ずStorybookストーリーも作成してください：

1. `stories/components/` に `.stories.js` ファイルを作成
2. 最低でも `Default` と `AllVariants` ストーリーを含める
3. アクセシビリティテストを実行して合格を確認
4. PRを作成する前に `npm run test:a11y` を実行

---

**Happy Coding! 🎨**
