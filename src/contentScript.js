'use strict';

document.addEventListener('dblclick', () => {
  console.log('double click event');
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    chrome.runtime.sendMessage({ action: 'textSelected', text: selectedText });
  }
});

document.addEventListener('mouseup', () => {
  console.log('mouse up event');
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    chrome.runtime.sendMessage({ action: 'textSelected', text: selectedText });
  }
});
