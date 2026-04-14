import fs from "fs";
import path from "path";
import { model } from "./gemini";

let cachedDocs: string[] | null = null;

function loadDocs() {
  if (cachedDocs) return cachedDocs;

  const filePath = path.join(process.cwd(), "data", "docs.txt");
  const text = fs.readFileSync(filePath, "utf-8");

  cachedDocs = text.split("\n\n");
  return cachedDocs;
}

export async function queryRAG(question: string) {
  const docs = loadDocs();

  // (basic retrieval for now)
  const context = docs.slice(0, 3).join("\n");

  const prompt = `
You are a helpful AI assistant.

Answer the question using ONLY the information provided in the context below.

Guidelines:
- Do not use outside knowledge or make assumptions.
- Give a clear, concise, and direct answer (avoid unnecessary explanation).
- If needed, summarize the relevant information in 1-3 sentences.
- If the answer is not present in the context, say:
  "I'm not sure—I couldn't find that in the provided information."
- Keep the tone natural and easy to understand.

Context:
${context}

Question:
${question}

Answer:
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}