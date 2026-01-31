# Test Scripts

包括的なバリデーションスクリプトで、スタイル崩れやリンク切れを防ぎます。

## 利用可能なテスト

### 1. CSS Path Validation (`validate-styles.js`)
全HTMLファイルのCSSパスを検証し、スタイルシート読み込みエラーを防止します。

```bash
npm run test:styles
```

**検証内容:**
- CSSファイルの存在確認
- 不正なパス（`dist/asagiri.min.css`等）の検出
- 相対パスの解決と検証

### 2. Link Checking (`check-links.js`)
内部リンクの整合性をチェックし、404エラーを防止します。

```bash
npm run test:links
```

**検証内容:**
- 内部リンクの存在確認
- 壊れたリンクの検出
- リダイレクトページの除外

### 3. All Tests (`test-all.js`)
全てのバリデーションテストを一括実行します。

```bash
npm test
```

## CI/CD統合

### GitHub Actions
`.github/workflows/validate.yml`で自動実行されます。

- `push`時: main, developブランチ
- `pull_request`時: 全てのPR

### Pre-commit Hook
`.husky/pre-commit`でコミット前に自動実行されます。

```bash
# Huskyのセットアップ
npx husky install
```

## トラブルシューティング

### テストが失敗する場合

1. **CSS path not found**
   - ファイルパスを確認
   - `css/main.css`が正しくビルドされているか確認
   - 相対パスが正しいか確認

2. **Broken link**
   - リンク先ファイルの存在確認
   - パスのスペルミスチェック
   - アンカーリンク（#）は無視されます

3. **No stylesheet found**
   - redirect用の最小限HTMLは警告のみ（正常）
   - 実際のページには`<link rel="stylesheet">`が必要

## 新しいHTMLファイルを追加する場合

1. 正しいCSSパスを使用:
   ```html
   <!-- ルートから -->
   <link rel="stylesheet" href="css/main.css">

   <!-- docsから -->
   <link rel="stylesheet" href="../css/main.css">

   <!-- docs/guidesから -->
   <link rel="stylesheet" href="../../css/main.css">
   ```

2. コミット前にテスト実行:
   ```bash
   npm test
   ```

3. エラーがあれば修正してから再度テスト

## 除外ルール

以下のファイル/ディレクトリは自動的に除外されます:
- `node_modules/`
- `storybook-static/`
- `.storybook/`
- `.git/`
- `.husky/`
- コード例内のリンク（`<code>`、`<pre>`タグ内）
- リダイレクト専用ページ
