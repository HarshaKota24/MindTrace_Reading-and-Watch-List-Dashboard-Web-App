let startTime = Date.now();

window.addEventListener("beforeunload", () => {
  const timeSpent = Math.floor((Date.now() - startTime) / 1000);
  const pageData = {
    title: document.title,
    url: window.location.href,
    timeSpent,
    timestamp: new Date().toISOString()
  };

  chrome.runtime.sendMessage({ type: "SAVE_PAGE", data: pageData });
});
