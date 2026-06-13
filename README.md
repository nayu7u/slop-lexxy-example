# Slop Lexxy Example

[Lexxy](https://github.com/basecamp/lexxy) を使った Action Text リッチテキストエディタのデモ・プレイグラウンドアプリです。

2 つのデモページを用意しています。

## セットアップ

```bash
bundle install
bin/rails db:setup
bin/rails server
```

- **機能一覧:** http://localhost:3000
- **実務ユースケース:** http://localhost:3000/practicals

## 1. 機能一覧プレイグラウンド（15 機能）

Lexxy が持つ個々の機能を独立して試せるページです。

| # | 機能 | 説明 |
|---|------|------|
| 1 | 基本エディタ | `form.rich_text_area` による標準的なリッチテキスト編集 |
| 2 | プレーンテキスト | `rich-text="false"` で装飾を無効化 |
| 3 | 単一行 | `multi-line="false"` で改行を禁止 |
| 4 | ツールバーなし | `preset="simple"` でツールバーを非表示 (キーボードショートカットは有効) |
| 5 | 最小ツールバー | `preset="minimal"` でアップロードボタンのみ非表示 |
| 6 | Markdown 無効 | `preset="nomarkdown"` で Markdown ショートカットを無効化 |
| 7 | コードシンタックスハイライト | コードブロックのリアルタイム構文強調表示 |
| 8 | @メンション (Inline) | `lexxy-prompt` にインラインデータを埋め込んだ mention |
| 9 | @メンション (Remote) | サーバーから非同期に候補を読み込む mention |
| 10 | ハッシュタグ (Free HTML) | `insert-editable-text` で編集可能なテキストとして挿入 |
| 11 | 文字色・背景色 | ハイライト機能によるテキスト装飾 |
| 12 | イベントモニター | `lexxy:change`, `lexxy:focus/blur`, `lexxy:upload-*` をリアルタイム表示 |
| 13 | リンクアンファール | URL ペースト時に `lexxy:insert-link` イベントでリンクを置換 |
| 14 | ファイル添付 | Active Storage 経由の画像・PDF・動画アップロード |
| 15 | 添付タイプ制限 | `permitted-attachment-types` で許可する MIME タイプを制限 |

## 2. 実務ユースケース（5 シナリオ）

実際のプロダクトを想定した、機能を組み合わせた実践的なデモページです。

| # | ユースケース | デモ内容 | 活用している機能 |
|---|-------------|---------|----------------|
| 1 | ブログ記事エディタ | タイトル・カテゴリ・SEO メタ・コードブロック・画像添付 | フルツールバー + 添付 |
| 2 | 社内お知らせ + @メンション | メンションでチームメンバーを指名、ファイル添付 | メンション (remote) + 添付 |
| 3 | カスタマーサポート返信 | 既存スレッド表示 + 返信エディタ（画像/PDF のみ許可） | 既読表示 + メンション + 添付制限 |
| 4 | メールテンプレート変数挿入 | `{{` で顧客名・プロモコードなどの変数を挿入 | カスタムプロンプト (insert-editable-text) |
| 5 | 簡易タスク管理 | 単一行タイトル + 最小ツールバー + 期限/優先度/担当者 | singleline + minimal プリセット |

### 実務適用のポイント

- **ユースケースに応じた設定**: タスク管理では `preset="singleline"` や `preset="minimal"` でツールバーを制限し、UX を最適化
- **カスタムプロンプト**: `<lexxy-prompt>` で業務固有の入力をガイド（メール変数、ハッシュタグなど）
- **メンション + 添付の組み合わせ**: サポート返信や社内連絡で同時に有効にし、コミュニケーションを効率化
- **Action Text 互換**: 既存の `has_rich_text` モデルをそのまま利用可能

## 技術スタック

- Ruby 4.0.5 / Rails 8.1.3
- [Lexxy](https://github.com/basecamp/lexxy) 0.9.18 (Lexical ベースのリッチテキストエディタ)
- Action Text / Active Storage
- Hotwire (Turbo + Stimulus)
- Tailwind CSS v4
- Propshaft + Import Maps
- SQLite
