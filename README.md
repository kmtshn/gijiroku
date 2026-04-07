# AI議事録メーカー

完全オンデバイスAIによる商談メモ・議事録自動整形PWAです。  
入力したデータは一切外部サーバーに送信されません。

**https://kmtshn.github.io/gijiroku/**

---

## 特徴

- **完全オンデバイスAI** — ブラウザ内のWebGPUでGemma 2Bモデルを実行。API通信なし
- **プライバシー保護** — 全データがデバイス内で処理され、外部に一切送信されない
- **PWA対応** — ホーム画面に追加してネイティブアプリのように使用可能
- **オフライン動作** — モデルダウンロード後はオフラインでも動作
- **ダーク/ライトモード** — システム連動 + 手動切替

## 出力フォーマット

雑多な商談メモを入力すると、AIが以下の形式で自動整形します：

```
【要約】
会議・商談の概要を3〜5文で簡潔にまとめ

【決定事項】
・決まったことを箇条書き

【ネクストアクション（担当者・期限）】
・担当者と期限を明記した箇条書き

【次回アジェンダ】
・次回の会議で話すべき議題
```

## 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フレームワーク | React 19 + TypeScript |
| ビルドツール | Vite 8 |
| UI | Tailwind CSS 4 + Lucide React |
| AIエンジン | WebLLM (mlc-ai) |
| AIモデル | gemma-2-2b-it-q4f16_1-MLC |
| PWA | vite-plugin-pwa + Workbox |
| データ保存 | LocalStorage（ブラウザ内のみ） |

## プロジェクト構成

```
src/
├── App.tsx                        # メインアプリケーション
├── main.tsx                       # エントリーポイント
├── index.css                      # Tailwind CSS + カスタムスタイル
├── types/
│   └── index.ts                   # TypeScript 型定義
├── lib/
│   ├── llm-engine.ts              # WebLLM 統合（モデル初期化・推論・プロンプト）
│   └── storage.ts                 # LocalStorage 履歴管理
├── hooks/
│   ├── useWebLLM.ts               # モデル初期化・生成のカスタムフック
│   └── useTheme.ts                # ダーク/ライトモード管理
└── components/
    ├── Header.tsx                 # ヘッダー + テーマ切替
    ├── ModelLoader.tsx            # モデルDL進捗バー + WebGPU チェック
    ├── MemoInput.tsx              # メモ入力エリア + 生成ボタン
    ├── ResultOutput.tsx           # 構造化議事録出力 + コピーボタン
    ├── HistoryPanel.tsx           # 履歴一覧（選択・削除）
    └── PrivacyBadge.tsx           # プライバシー保護バッジ
```

## セットアップ

### 必要環境

- Node.js 20+
- npm 9+

### ローカル開発

```bash
# 依存パッケージのインストール
npm install --legacy-peer-deps

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 使い方

1. アプリを開くと「**モデルをダウンロード**」ボタンが表示されます
2. ボタンをクリックしてGemma 2Bモデルをダウンロード（初回のみ、約1.5GB）
3. ダウンロード完了後、テキストエリアに商談メモを入力
4. 「**議事録を生成**」をクリック
5. AIがストリーミングで構造化された議事録を生成
6. 「**コピー**」ボタンで結果をクリップボードにコピー

## ブラウザ対応

WebGPU対応ブラウザが必要です。

| ブラウザ | 対応状況 |
|----------|----------|
| Chrome 113+ | 対応 |
| Edge 113+ | 対応 |
| Chrome for Android 113+ | 対応 |
| Safari / Firefox | 未対応（WebGPU未サポート） |

## ライセンス

MIT
