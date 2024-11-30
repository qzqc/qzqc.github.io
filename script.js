// Wait for the page to fully load before initializing the effect
window.addEventListener("load", () => {
  // Initialize the Fairy Dust Cursor Effect
  new cursoreffects.fairyDustCursor({
    colors: ["#ff0000", "#00ff00", "#0000ff"] // Custom colors for the dust particles
  });

  // Ensure the canvas covers the entire page
  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }
});
