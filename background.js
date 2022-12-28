chrome.runtime.onInstalled.addListener(function() {
    alert('Thanks for installing!');
    chrome.tabs.create({
        url: 'https://google.com',
        active: true
    });
    return false;
});