import {
  CreateMLCEngine,
  type MLCEngine,
  type InitProgressReport,
} from "@mlc-ai/web-llm";

const MODEL_ID = "gemma-2-2b-it-q4f16_1-MLC";

const SYSTEM_PROMPT = `あなたは優秀なビジネスアシスタントです。ユーザーから渡される雑多な商談メモや打ち合わせメモを解析し、以下の形式で構造化された議事録を日本語で作成してください。

出力フォーマット:

【要約】
会議・商談の概要を3〜5文で簡潔にまとめてください。

【決定事項】
・会議で決まったことを箇条書きで列挙してください。

【ネクストアクション（担当者・期限）】
・次にやるべきことを、担当者と期限がわかる場合は明記して箇条書きにしてください。

【次回アジェンダ】
・次回の会議で話すべき議題を箇条書きにしてください。

注意事項:
- メモに明記されていない情報は推測せず、「（メモに記載なし）」と記載してください。
- 出力は日本語で行ってください。
- 余計な前置きや説明は不要です。上記フォーマットのみを出力してください。`;

let engine: MLCEngine | null = null;

export function checkWebGPUSupport(): boolean {
  return "gpu" in navigator && typeof (navigator as any).gpu !== "undefined";
}

export async function initEngine(
  onProgress: (report: InitProgressReport) => void,
): Promise<MLCEngine> {
  if (engine) return engine;

  if (!checkWebGPUSupport()) {
    throw new Error(
      "このブラウザはWebGPUに対応していません。Chrome 113以降またはEdge 113以降をお使いください。",
    );
  }

  engine = await CreateMLCEngine(MODEL_ID, {
    initProgressCallback: onProgress,
    logLevel: "SILENT",
  });

  return engine;
}

export async function generateMinutes(
  inputText: string,
  onStream: (text: string) => void,
): Promise<string> {
  if (!engine) {
    throw new Error("AIモデルが初期化されていません。");
  }

  let fullResponse = "";

  const response = await engine.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `以下の商談メモを構造化された議事録にしてください:\n\n${inputText}`,
      },
    ],
    temperature: 0.3,
    max_tokens: 2048,
    stream: true,
  });

  for await (const chunk of response) {
    const delta = chunk.choices[0]?.delta?.content || "";
    fullResponse += delta;
    onStream(fullResponse);
  }

  return fullResponse;
}

export function getEngine(): MLCEngine | null {
  return engine;
}

export function isEngineReady(): boolean {
  return engine !== null;
}
