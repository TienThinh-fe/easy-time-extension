'use strict';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('message received in background.js:', request);
  if (request.action === 'textSelected') {
    chrome.storage.local.set({ selectedText: request.text });
  }
});
