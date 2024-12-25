'use strict';

import './popup.css';

const captureText = document.getElementById('capture-text');
const convertGmt = document.getElementById('convert-gmt');
const convertLocalTime = document.getElementById('convert-local-time');
const relativeTime = document.getElementById('relative-time');

const getGmtFromUnix = (unix) => {
  const date = new Date(unix * 1000);
  return date.toUTCString();
};

const getLocalTimeFromUnix = (unix) => {
  const date = new Date(unix * 1000);
  return date.toString();
};

const getRelativeTimeFromUnix = (unix) => {
  const date = new Date(unix * 1000);
  return date.toLocaleString();
};

// Retrieve the stored selected text when the popup is opened
chrome.storage.local.get('selectedText', (result) => {
  if (result.selectedText) {
    captureText.textContent = result.selectedText;

    const unix = parseInt(result.selectedText);
    convertGmt.textContent = getGmtFromUnix(unix);
    convertLocalTime.textContent = getLocalTimeFromUnix(unix);
    relativeTime.textContent = getRelativeTimeFromUnix(unix);
  }
});

// Listen for changes in storage and update the popup text
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'selectedText') {
      captureText.textContent = newValue;

      const unix = parseInt(newValue);
      convertGmt.textContent = getGmtFromUnix(unix);
      convertLocalTime.textContent = getLocalTimeFromUnix(unix);
      relativeTime.textContent = getRelativeTimeFromUnix(unix);
    }
  }
});
