chrome.action.onClicked.addListener(async () => {
  const notesUrl = chrome.runtime.getURL('notes.html');
  const tabs = await chrome.tabs.query({ url: notesUrl });

  if (tabs.length > 0) {
    await chrome.tabs.update(tabs[0].id, { active: true });
    await chrome.windows.update(tabs[0].windowId, { focused: true });
  } else {
    chrome.tabs.create({ url: notesUrl });
  }
});
