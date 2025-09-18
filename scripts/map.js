// Embed a real Google Map (iframe) centered on Winter Suites Hotel, Owerri.
// This provides native Google Map controls (zoom, pan, fullscreen in the iframe) without requiring an API key.
(() => {
  const lat = 5.4836;
  const lng = 7.0355;
  const zoom = 18; // default zoom level (1-21)
  const mapEl = document.getElementById('map');
  if (!mapEl) return;
  // Ensure the container is visible and sized
  mapEl.innerHTML = '';
  const iframe = document.createElement('iframe');
  // Use maps.google.com with query and output=embed. 't=k' requests satellite imagery when available.
  iframe.src = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&t=k&output=embed`;
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.style.border = '0';
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('loading', 'lazy');
  iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  mapEl.appendChild(iframe);

  // Optional: update info-card link (if present) to match the same coords
  const infoLink = document.querySelector('.info-card a.action-btn');
  if (infoLink) {
    infoLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    infoLink.target = '_blank';
    infoLink.rel = 'noopener';
  }

  // Scroll and highlight the Winter Suites info card so it's shown first
  const infoCard = document.getElementById('winterInfo');
  if (infoCard) {
    // Smooth scroll into view and add highlight class
    setTimeout(() => {
      infoCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      infoCard.classList.add('highlight');
      // Remove highlight after animation completes
      setTimeout(() => infoCard.classList.remove('highlight'), 2200);
    }, 300);
  }
})();
