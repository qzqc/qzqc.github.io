// JavaScript to handle cookie consent and preferences
window.addEventListener('load', () => {
  // Check if the user has already accepted cookies
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  
  if (!cookiesAccepted) {
    // Show cookie consent banner if not accepted
    document.getElementById('cookie-consent-banner').style.display = 'flex';
  }

  // Show the cookie management modal when the user clicks "Manage Cookies"
  document.getElementById('manage-cookies').addEventListener('click', () => {
    document.getElementById('cookie-management-modal').style.display = 'flex';
  });

  // Handle "I Agree" button click
  document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-consent-banner').style.display = 'none';
  });

  // Handle "Save Preferences" button click
  document.getElementById('save-preferences').addEventListener('click', () => {
    // Collect cookie preferences
    const preferences = {
      necessary: true,  // Necessary cookies are always active
      preferences: document.getElementById('preferences-cookies').checked,
      statistics: document.getElementById('statistics-cookies').checked,
      marketing: document.getElementById('marketing-cookies').checked
    };
    
    // Store preferences in localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));

    // Hide the modal and consent banner
    document.getElementById('cookie-management-modal').style.display = 'none';
    document.getElementById('cookie-consent-banner').style.display = 'none';
  });

  // Handle "Cancel" button click
  document.getElementById('cancel-preferences').addEventListener('click', () => {
    document.getElementById('cookie-management-modal').style.display = 'none';
  });
});
