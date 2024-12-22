function extractLinks() {
  const links = Array.from(document.querySelectorAll("a")).map(
    (link) => link.href
  );
  chrome.runtime.sendMessage({
    action: "updateLinks",
    links,
    url: window.location.href,
  });
}

extractLinks();
