# Slop Lexxy Example

[Lexxy](https://github.com/basecamp/lexxy) を使った Action Text リッチテキストエディタのデモ・プレイグラウンドアプリです。

## セットアップ

```bash
bundle install
bin/rails db:setup
bin/rails server
```

http://localhost:3000 にアクセスするとプレイグラウンドが表示されます。

## デモ機能一覧

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

## 技術スタック

- Ruby 4.0.5 / Rails 8.1.3
- [Lexxy](https://github.com/basecamp/lexxy) 0.9.18 (Lexical ベースのリッチテキストエディタ)
- Action Text / Active Storage
- Hotwire (Turbo + Stimulus)
- Tailwind CSS v4
- Propshaft + Import Maps
- SQLite
