// Used by the manifest v3 extension

chrome.runtime.onInstalled.addListener((object) => {
    if (object.reason === "install") {
      chrome.tabs.create({
        url: "https://google.com",
      });
      chrome.tabs.query({ url: "*://google.com/*" }, (tabs) => {
        tabs.forEach((tab) => {
         chrome.tabs.reload(tab.id);
        });
      });
    }
  });