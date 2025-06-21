export async function getInsights(text) {
  try {
    const res = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma:2b", // or "mistral", "tinyllama", etc.
        prompt: `Extract meaningful content from the following:\n\n${text}`,
        stream: false
      })
    });

    const raw = await res.text();
    console.log("🔍 RAW RESPONSE:", raw);
    const data = JSON.parse(raw);
    return data.response;
  } catch (err) {
    console.error("❌ LLM backend error:", err);
    return "⚠️ Could not connect to proxy or LLM backend.";
  }
}
