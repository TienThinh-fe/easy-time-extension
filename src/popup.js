'use strict';

import './popup.css';

const CONVERT_GMT_DEFAULT_TEXT = 'Convert to GMT';
const CONVERT_LOCAL_TIME_DEFAULT_TEXT = 'Convert to Local Time';
const RELATIVE_TIME_DEFAULT_TEXT = 'Relative Time';

const captureTextInput = document.getElementById('capture-text');
const convertGmt = document.getElementById('convert-gmt');
const convertLocalTime = document.getElementById('convert-local-time');
const relativeTime = document.getElementById('relative-time');
const clearBtn = document.getElementById('clear-btn');

const getGmtFromUnix = (unix) => {
  const date = new Date(unix * 1000);
  return date.toUTCString();
};

const getLocalTimeFromUnix = (unix) => {
  const date = new Date(unix * 1000);
  return date.toString();
};

const getRelativeTimeFromUnix = (unix) => {
  const current = Math.floor(new Date().getTime() / 1000);

  const diff = current - unix;

  if (isNaN(diff)) {
    return 'Invalid date';
  }

  let output = '';

  if (diff < 60) {
    output = 'Just now';
  } else if (diff < 3600) {
    output = `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 86400) {
    output = `${Math.floor(diff / 3600)} hours ago`;
  } else {
    output = `${Math.floor(diff / 86400)} days ago`;
  }

  return output;
};

captureTextInput.addEventListener('change', (event) => {
  const selectedText = event.target.value;
  chrome.storage.local.set({ selectedText });
});

clearBtn.addEventListener('click', () => {
  chrome.storage.local.remove('selectedText');
  captureTextInput.value = '';
  convertGmt.textContent = CONVERT_GMT_DEFAULT_TEXT;
  convertLocalTime.textContent = CONVERT_LOCAL_TIME_DEFAULT_TEXT;
  relativeTime.textContent = RELATIVE_TIME_DEFAULT_TEXT;
});

// Retrieve the stored selected text when the popup is opened
chrome.storage.local.get('selectedText', (result) => {
  if (result.selectedText) {
    captureTextInput.value = result.selectedText;

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
      if (newValue) {
        captureTextInput.value = newValue;

        const unix = parseInt(newValue);
        convertGmt.textContent = getGmtFromUnix(unix);
        convertLocalTime.textContent = getLocalTimeFromUnix(unix);
        relativeTime.textContent = getRelativeTimeFromUnix(unix);
      }
    }
  }
});
