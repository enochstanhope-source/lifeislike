// Enrollment functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get all enroll buttons
    const enrollButtons = document.querySelectorAll('.enroll');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if user is logged in by checking Firebase auth state
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in, allow enrollment
                    const card = e.target.closest('.product-card');
                    const courseName = card.querySelector('h3').textContent;
                    // Extract price and a short features/description smartly
                    // Prefer using data attributes if present on the card
                    const priceEl = card.dataset.price ? card.dataset.price : (card.querySelector('.price') ? card.querySelector('.price').textContent : '');
                    let price = priceEl ? String(priceEl).trim() : '';

                    // Clean price: remove '/ Per night' and excessive whitespace
                    price = price.replace(/\/Per night/i, '').trim();

                    // Features: prefer a data attribute, else take .duration text and strip icons
                    let features = '';
                    if (card.dataset.features) {
                        features = card.dataset.features.trim();
                    } else {
                        const featuresEl = card.querySelector('.course-details .duration');
                        if (featuresEl) {
                            // Remove any child icon text (like the <i> element)
                            // Clone the node and remove icons to get only the text
                            const clone = featuresEl.cloneNode(true);
                            clone.querySelectorAll('i').forEach(i => i.remove());
                            features = clone.textContent.trim();
                        }
                    }

                    // Normalize whitespace and limit length for URL safety
                    features = features.replace(/\s+/g, ' ').trim();
                    if (features.length > 220) features = features.substr(0, 217) + '...';
                    const params = new URLSearchParams();
                    params.set('course', courseName);
                    if (price) params.set('price', price);
                    if (features) params.set('features', features);
                    window.location.href = `enroll.html?${params.toString()}`;
                } else {
                    // User is not signed in, show message on the card
                    const card = e.target.closest('.product-card');
                    
                    // Create message element if it doesn't exist
                    let messageEl = card.querySelector('.login-message');
                    if (!messageEl) {
                        messageEl = document.createElement('div');
                        messageEl.className = 'login-message';
                        messageEl.style.color = '#ff4444';
                        messageEl.style.fontSize = '0.9rem';
                        messageEl.style.marginTop = '10px';
                        messageEl.style.textAlign = 'center';
                        messageEl.style.padding = '8px';
                        messageEl.style.borderRadius = '4px';
                        messageEl.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                        card.querySelector('.product-info').appendChild(messageEl);
                    }
                    
                    messageEl.textContent = 'Please login to access this feature';
                    
                    // Remove message after 3 seconds
                    setTimeout(() => {
                        if (messageEl && messageEl.parentNode) {
                            messageEl.remove();
                        }
                    }, 3000);
                }
            });
        });
    });
});
