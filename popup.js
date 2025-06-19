chrome.storage.local.get(["contentList"], (res) => {
  const list = res.contentList || [];
  const ul = document.getElementById("content-list");

  list.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${item.url}" target="_blank">${item.title}</a>
      <br><small>Time: ${item.timeSpent}s, ${new Date(item.timestamp).toLocaleString()}</small>
    `;
    ul.appendChild(li);
  });
});
