(function () {
  function isGenerating() {
    // Claude shows a stop button (with aria-label or specific attributes) while generating
    const stopButton = document.querySelector(
      'button[aria-label*="Stop"], button[aria-label*="stop"], ' +
      'button[data-testid*="stop"], button[data-testid*="Stop"]'
    );
    if (stopButton) return true;

    // Fallback: look for the streaming indicator class or any visible stop button
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      const label = (btn.getAttribute('aria-label') || '').toLowerCase();
      const title = (btn.getAttribute('title') || '').toLowerCase();
      const text = (btn.textContent || '').toLowerCase().trim();
      if (
        label.includes('stop') ||
        title.includes('stop') ||
        text === 'stop'
      ) {
        return true;
      }
    }

    return false;
  }

  document.addEventListener(
    'keydown',
    function (e) {
      if (e.key === 'Escape' && isGenerating()) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        // Do NOT call e.preventDefault() so the browser's native ESC behavior
        // (e.g. closing dialogs) can still work when NOT generating.
      }
    },
    true // capture phase — fires before React/app listeners
  );
})();
