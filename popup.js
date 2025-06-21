import { getInsights } from './llama-api.js';

chrome.storage.local.get(["history"], (result) => {
  const list = document.getElementById("list");

  // make a reversed copy to use everywhere
  const reversed = [...result.history].reverse();

  reversed.forEach((item, idx) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <b>${item.title}</b> (${item.timeSpent}s)
      <br><i>${item.url}</i>
      <br><button data-idx="${idx}">Extract Insight</button>
      <hr>`;
    list.appendChild(div); // append normally now
  });

  list.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
      const idx = e.target.dataset.idx;
      const item = reversed[idx]; // uses the same reversed list
      const text = item.content || item.title;

      console.log("⏳ Sending request to Ollama...");
      const insight = await getInsights(text);
      console.log("📥 Received:", insight);

      alert("💡 Key Ideas:\n" + insight);
    }
  });
});
