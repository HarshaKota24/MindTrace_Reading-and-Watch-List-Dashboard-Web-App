chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SAVE_PAGE") {
    chrome.storage.local.get(["contentList"], (res) => {
      const contentList = res.contentList || [];
      contentList.push(msg.data);
      chrome.storage.local.set({ contentList });
    });
  }
});
