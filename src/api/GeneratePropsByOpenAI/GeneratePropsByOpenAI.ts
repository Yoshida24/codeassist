import { systemPrompt } from "./Prompt";

async function callChatCompletionAPI(
  API_KEY: string,
  systemPrompt: string,
  MODEL: string,
  userInput: string,
  maxTokens: number,
) {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
  console.log(systemPrompt);
  console.log(userInput);

  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userInput },
    ],
    max_tokens: maxTokens,
  };

  return fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      const code = res.choices[0].message.content;
      console.log(code);
      console.log(JSON.stringify(res.usage));
      if (!code.includes(`\`\`\`json`) || !code.includes(`\`\`\`html`)) {
        throw new Error("an Error Occured\n" + code);
      }
      return {
        json: code.split(`\`\`\`json`)[1].split(`\`\`\``)[0].trim(),
        html: code.split(`\`\`\`html`)[1].split(`\`\`\``)[0].trim(),
      };
    });
}

function getOpenAIAPIKeyOrDusplayInputDialog(): string {
  const key = "openAIAPIKey";
  const openAIAPIKey = window.localStorage.getItem(key);
  const isOpenAIAPIKeyExists =
    openAIAPIKey != null && openAIAPIKey !== "undefined" && openAIAPIKey !== "";
  if (isOpenAIAPIKeyExists && openAIAPIKey !== null) {
    return openAIAPIKey;
  } else {
    const userInputKey = window.prompt("Please enter your OpenAI key");
    if (userInputKey !== null) {
      window.localStorage.setItem(key, userInputKey);
      return userInputKey;
    } else {
      return "";
    }
  }
}

export async function GenerateByOpenAI(
  promptUserInput: string,
  jsonSchema: string,
  mustache: string,
) {
  const openAIAPIKey = getOpenAIAPIKeyOrDusplayInputDialog();
  const MODEL =
    import.meta.env.VITE_OPENAI_DEFAULT_MODEL || "gpt-4-1106-preview";
  const maxTokens = 1600;

  try {
    const res = await callChatCompletionAPI(
      openAIAPIKey,
      systemPrompt({ jsonSchema, mustache }),
      MODEL,
      promptUserInput,
      maxTokens,
    );
    console.log(res);
    return res;
  } catch (e) {
    throw new Error("Faid to generate code. Please retry.");
  }
}
