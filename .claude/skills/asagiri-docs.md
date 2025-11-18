# Asagiri Documentation Skill

このスキルは、Asagiri CSSフレームワークのドキュメント検索、コンポーネント参照、コード例提供をサポートします。

## スキルの目的

ユーザーがAsagiriフレームワークについて質問したとき、以下のタスクを実行します：

1. **ドキュメント検索**: 関連するドキュメントページを見つける
2. **コンポーネント参照**: 特定のコンポーネントの使い方を説明
3. **コード例提供**: 実用的なコード例を提供
4. **テスト戦略提案**: テストアーキテクチャのガイダンスを提供

## ドキュメント構造

### Getting Started
- **パス**: `docs/getting-started.html`
- **内容**: 基本的な導入、インストール方法、クイックスタート

### Guides
- **Dark Mode** (`docs/guides/dark-mode.html`): ダークモード実装ガイド
- **Theming** (`docs/guides/theming.html`): テーマカスタマイズ方法
- **Practical Examples** (`docs/guides/practical-examples.html`): 実用的なコード例集
- **Developer Guide** (`docs/guides/developer-guide.html`): API仕様とアーキテクチャ
- **Testing Architecture** (`docs/guides/testing-architecture.html`): テスト設計完全ガイド

### Reference
- **API Reference** (`docs/api-reference.html`): CSS変数・クラス名完全リファレンス
- **Components Showcase** (`showcase.html`): 全コンポーネントデモ

## よくある質問とその回答

### Q: ダークモードを実装したい
**回答**:
1. HTMLタグに `data-theme="light"` 属性を追加
2. テーマ切り替えボタンを設置
3. JavaScriptで `toggleTheme()` 関数を実装
4. localStorageでテーマ設定を保存

**参照**: `docs/guides/dark-mode.html#quick-start`

### Q: カスタムカラーを設定したい
**回答**:
CSS変数をオーバーライドします：

```css
:root {
  --color-primary: #8b5cf6;
  --color-secondary: #ec4899;
}
```

**参照**: `docs/guides/theming.html#custom-colors`

### Q: ボタンのバリエーションは？
**回答**:
- `.btn-primary` - プライマリボタン
- `.btn-secondary` - セカンダリボタン
- `.btn-success` - 成功ボタン
- `.btn-danger` - 危険ボタン
- `.btn-outline-*` - アウトラインバリエーション

**参照**: `showcase.html#buttons`

### Q: グリッドレイアウトの作り方は？
**回答**:
```html
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**参照**: `docs/api-reference.html#grid-utilities`

### Q: レスポンシブ対応は？
**回答**:
モバイルファーストのブレークポイント：
- `sm:` - 640px以上
- `md:` - 768px以上
- `lg:` - 1024px以上
- `xl:` - 1280px以上

**参照**: `docs/developer-guide.html#responsive-design`

### Q: アクセシビリティテストのやり方は？
**回答**:
1. axe-coreを使用した自動テスト
2. キーボードナビゲーションの検証
3. スクリーンリーダーでの確認
4. コントラスト比チェック（4.5:1以上）

**参照**: `docs/guides/testing-architecture.html#accessibility`

### Q: ビジュアルリグレッションテストは？
**回答**:
推奨ツール：
- **Chromatic**: PR自動コメント付き（推奨）
- **Percy**: GitHub Actions統合
- **BackstopJS**: セルフホスト

**参照**: `docs/guides/testing-architecture.html#visual-regression`

### Q: パフォーマンス最適化は？
**回答**:
目標指標：
- FCP < 2.0s
- LCP < 2.5s
- CLS < 0.1
- Bundle Size < 50 KB (gzip)

**参照**: `docs/guides/testing-architecture.html#performance`

## コード例テンプレート

### ダークモード実装（完全版）
```html
<!DOCTYPE html>
<html lang="ja" data-theme="light">
<head>
  <script>
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  </script>
  <link rel="stylesheet" href="dist/asagiri.min.css">
</head>
<body>
  <button onclick="toggleTheme()">🌓 テーマ切替</button>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
  </script>
</body>
</html>
```

### カードコンポーネント
```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### フォームレイアウト
```html
<form class="form">
  <div class="form-group">
    <label for="email" class="form-label">Email</label>
    <input type="email" id="email" class="form-control" required>
  </div>

  <div class="form-group">
    <label for="password" class="form-label">Password</label>
    <input type="password" id="password" class="form-control" required>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

## 使用方法

1. **ドキュメント検索時**:
   - ユーザーの質問キーワードから関連ページを特定
   - 該当セクションへの直接リンクを提供

2. **コード例提供時**:
   - 上記テンプレートを基に、ユーザーのニーズに合わせてカスタマイズ
   - 実際に動作するコードのみを提供

3. **トラブルシューティング時**:
   - よくある落とし穴セクションを参照
   - 具体的な解決策とコード例を提示

4. **テスト戦略提案時**:
   - プロジェクトの規模に応じた適切なツールを推奨
   - CI/CD統合方法を説明

## 更新履歴

- 2025-01-XX: Testing Architecture ガイド追加
- 2025-01-XX: Mobile Navigation 改善
- 2025-01-XX: Practical Examples 拡充
- 2025-01-XX: API Reference 検索機能追加
