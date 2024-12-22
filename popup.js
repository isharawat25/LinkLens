function renderTable() {
  chrome.runtime.sendMessage({ action: "getLinksData" }, (response) => {
    console.log(response);
    const linksData = response.linksData;
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    for (const hostname in linksData) {
      const { hyperlinks, occurrences } = linksData[hostname];

      for (const link in hyperlinks) {
        const tr = document.createElement("tr");
        const siteCell = document.createElement("td");
        const linkCell = document.createElement("td");
        const occurrenceCell = document.createElement("td");

        siteCell.textContent = hostname;
        linkCell.textContent = link;
        occurrenceCell.textContent = occurrences[link];

        tr.appendChild(siteCell);
        tr.appendChild(linkCell);
        tr.appendChild(occurrenceCell);
        tableBody.appendChild(tr);
      }
    }
  });
}

console.log("CALLED");
document.addEventListener("DOMContentLoaded", renderTable);
