// JavaScript to handle cookie consent
window.addEventListener('load', () => {
  // Check if the user has already accepted cookies
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  
  if (!cookiesAccepted) {
    // Show cookie consent banner if not accepted
    document.getElementById('cookie-consent-banner').style.display = 'flex';
  }

  // Handle "I Agree" button click
  document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-consent-banner').style.display = 'none';
  });
});
