---
title: "Next.js + Tailwindでポートフォリオサイトを作った"
date: "2025-05-28"
category: "アプリ開発"
excerpt: "このサイト自体の制作メモ。技術選定の理由やMarkdownブログの実装方法を書いています。"
---

## 技術スタック

- **Next.js 16** — App Router
- **TypeScript** — 型安全に開発するため
- **Tailwind CSS v4** — 最新版でユーティリティファーストなスタイリング
- **gray-matter** — MarkdownのFront-matterパース
- **remark** — MarkdownをHTMLに変換

## なぜNext.jsか

- ファイルベースルーティングが直感的
- ISR（Incremental Static Regeneration）でブログを静的に配信できる
- 画像最適化が標準搭載
- デプロイはVercelで簡単

## Markdownブログの仕組み

`content/posts/` ディレクトリに `.md` ファイルを置くだけで記事が増える設計にした。

```
content/
  posts/
    my-first-post.md
    another-post.md
```

`gray-matter` でFront-matterを、`remark` で本文をHTMLに変換する。

## ハマったところ

Tailwind v4はv3と設定ファイルの書き方が大きく変わっていた。`tailwind.config.js` が不要になり、`globals.css` に `@import "tailwindcss"` と書くだけになった。

## まとめ

シンプルな構成でも十分な機能を持つサイトが作れた。今後はOGP対応やRSSフィードの追加を予定している。
