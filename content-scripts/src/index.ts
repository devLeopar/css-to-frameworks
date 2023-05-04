chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "selectElement") {
    const selectedElement = getSelectedElement();
    if (selectedElement) {
      chrome.runtime.sendMessage({
        action: "selectedElement",
        payload: selectedElement.outerHTML,
      });
    }
  }
});

function getSelectedElement(): Element | null {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (range) {
      const startNode =
        range.startContainer.nodeType === Node.ELEMENT_NODE
          ? (range.startContainer as Element)
          : range.startContainer.parentElement;
      const endNode =
        range.endContainer.nodeType === Node.ELEMENT_NODE
          ? (range.endContainer as Element)
          : range.endContainer.parentElement;
      if (startNode && startNode === endNode) {
        return startNode;
      } else if (startNode) {
        // Selection spans multiple elements, return the common ancestor
        return startNode.closest(":root");
      }
    }
  }
  return null;
}
