const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResearch = async (prompt) => {
  const model = genAI.getGenerativeModel({
   model: "gemini-2.5-flash",
  });
  if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in server environment variables");
}

  const result = await model.generateContent(`
You are ResearchPilot AI.

Generate a clear research response for this prompt:

"${prompt}"

Return ONLY valid JSON. Do not use markdown. Do not wrap it in backticks.

Format:
{
  "summary": "short but useful summary",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "tags": ["tag1", "tag2"]
}
`);

  let text = result.response.text();

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
};

const answerFromDocument = async (documentText, question) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(`
You are ResearchPilot AI.

Answer the user's question using ONLY the document text below.

If the answer is not available in the document, say:
"I could not find this information in the uploaded document."

Document:
${documentText.slice(0, 12000)}

Question:
${question}
`);

  return result.response.text();
};

module.exports = {
  generateResearch,
  answerFromDocument,
};