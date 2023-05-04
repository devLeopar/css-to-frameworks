chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "selectElement") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0 && tabs[0].id !== undefined) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "selectElement" });
            }
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "selectedElement") {
        chrome.runtime.sendMessage({
            action: "updateSelectedElement",
            payload: message.payload,
        });
    }
});