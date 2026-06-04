---
title: "Claude APIを使ってチャットボットを作ってみた"
date: "2025-05-05"
category: "AI"
excerpt: "AnthropicのClaude APIを使って、シンプルなチャットボットを実装する手順をまとめました。"
---

## はじめに

最近、業務の一部をAIで自動化したいと思い、Claude APIを触ってみた。公式ドキュメントが丁寧なので比較的スムーズに実装できた。

## セットアップ

```bash
npm install @anthropic-ai/sdk
```

環境変数に APIキーを設定する。

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

## 基本的な使い方

```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'こんにちは！' }
  ],
})

console.log(message.content[0].text)
```

## システムプロンプトでキャラクター付け

```typescript
const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: 'あなたは丁寧で親切なサポートスタッフです。',
  messages: [
    { role: 'user', content: '返金の手続きを教えてください。' }
  ],
})
```

## 感想

レスポンスの品質が高く、日本語にも対応しているので非常に使いやすかった。次はストリーミングレスポンスを実装してUXを改善したい。
