const http = require("http");

const { contentIndex } = require("./chatbot-data");

const PORT = process.env.PORT || 3000;

// Build links using stored metadata (url + anchor).
const buildUrl = (entry) => (entry.anchor ? `${entry.url}#${entry.anchor}` : entry.url);

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);

// Pick the most relevant sources from the indexed site content.
const pickSources = (question) => {
  const terms = tokenize(question);
  const scored = contentIndex.map((entry) => {
    const haystack = `${entry.title} ${entry.content}`.toLowerCase();
    const score = terms.reduce((total, term) => (haystack.includes(term) ? total + 1 : total), 0);
    return { entry, score };
  });

  const sorted = scored.sort((a, b) => b.score - a.score);
  const top = sorted.filter((item) => item.score > 0).slice(0, 4);
  const fallback = sorted.slice(0, 3);
  return (top.length ? top : fallback).map((item) => item.entry);
};

// Isolated Gemini call for response generation.
const callGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 300,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Gemini request failed.");
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

const parseGeminiResponse = (text, allowedLinks) => {
  const fallback = {
    answer:
      "I couldn’t find that in the site content yet. Try asking about experience, research projects, or background.",
    learnMore: allowedLinks.slice(0, 2),
  };

  if (!text) {
    return fallback;
  }

  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    const answer = typeof parsed.answer === "string" ? parsed.answer.trim() : fallback.answer;
    const requestedIds = Array.isArray(parsed.learnMore) ? parsed.learnMore : [];
    const learnMore = allowedLinks.filter((link) => requestedIds.includes(link.id));
    return {
      answer,
      learnMore: learnMore.length ? learnMore : allowedLinks.slice(0, 2),
    };
  } catch (error) {
    return fallback;
  }
};

// Build a strict prompt so Gemini only uses the indexed sources.
const createPrompt = (question, sources) => {
  const sourceText = sources
    .map(
      (entry) =>
        `ID: ${entry.id}\nTitle: ${entry.title}\nContent: ${entry.content}\nLink: url=${entry.url} anchor=${entry.anchor}`
    )
    .join("\n\n");

  return `You are the portfolio assistant. Use ONLY the sources below to answer the question.\n` +
    `If the answer is not in the sources, say you don't know.\n` +
    `Keep the answer concise (1-3 sentences).\n` +
    `Return JSON ONLY with keys:\n` +
    `- answer: string\n` +
    `- learnMore: array of source IDs from the list below\n\n` +
    `Question: ${question}\n\n` +
    `Sources:\n${sourceText}`;
};

const handleChat = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body);
      const question = (data.question || "").trim();
      if (!question) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Question is required." }));
        return;
      }

      const sources = pickSources(question);
      const allowedLinks = sources.map((entry) => ({
        id: entry.id,
        label: entry.title,
        url: buildUrl(entry),
      }));

      const prompt = createPrompt(question, sources);
      const responseText = await callGemini(prompt);
      const payload = parseGeminiResponse(responseText, allowedLinks);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(payload));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          answer:
            "Sorry, I ran into an issue while generating a response. Please try again shortly.",
          learnMore: [],
        })
      );
    }
  });
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    handleChat(req, res);
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found." }));
});

server.listen(PORT, () => {
  console.log(`Chatbot server listening on http://localhost:${PORT}`);
});
