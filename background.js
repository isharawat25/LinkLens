const linksData = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateLinks") {
    const { links, url } = message;
    const hostname = new URL(url).hostname;

    if (!linksData[hostname]) {
      linksData[hostname] = { hyperlinks: {}, occurrences: {} };
    }

    links.forEach((link) => {
      if (!linksData[hostname].hyperlinks[link]) {
        linksData[hostname].hyperlinks[link] = 0;
      }
      linksData[hostname].hyperlinks[link]++;
      linksData[hostname].occurrences[link] =
        (linksData[hostname].occurrences[link] || 0) + 1;
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getLinksData") {
    sendResponse({ linksData });
  }
});
