// background.js
//alert("background.js works")
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
  });
  