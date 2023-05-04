import React, { useState, useEffect } from "react";

const Popup: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const handleMessage = (message: any) => {
    console.log(message);
    if (message.action === "selectedElement") {
      setSelectedElement(message.payload);
    }
  };

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "selectElement" });

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div>
      <h1>
        {selectedElement
          ? `Selected Element: ${selectedElement}`
          : "Please select an element on the page"}
      </h1>
    </div>
  );
};
export default Popup;

