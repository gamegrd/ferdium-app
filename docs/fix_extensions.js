chrome.notifications = {
  onClicked: { addListener: v => {} },
  onClosed: { addListener: v => {} },
  onRemoved: { addListener: v => {} },
};
chrome.windows['onRemoved'] = {
  addListener: v => {},
};
