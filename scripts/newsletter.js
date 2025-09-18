document.addEventListener('DOMContentLoaded', function () {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach((form) => {
        const nameInput = form.querySelector('input[name="name"]');
        const emailInput = form.querySelector('input[name="email"]') || form.querySelector('#newsletterEmail');
        const messageBox = form.parentElement.querySelector('.newsletter-message');
        const sendingText = form.querySelector('.sending-text');
        const submitButton = form.querySelector('button[type="submit"]');

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

            form.addEventListener('submit', async function (e) {
                e.preventDefault();
                // preserve scroll position to avoid page jump when UI updates
                const scrollX = window.scrollX || window.pageXOffset;
                const scrollY = window.scrollY || window.pageYOffset;
                clearMessage(messageBox);

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';

            if (!email) {
                showMessage(messageBox, 'Please enter your email address.', 'error');
                emailInput.focus();
                return;
            }

            if (!emailRegex.test(email)) {
                showMessage(messageBox, 'Please enter a valid email address.', 'error');
                emailInput.focus();
                return;
            }

            // UI: show sending
            form.classList.add('sending');
            if (sendingText) sendingText.style.display = 'inline-block';
            submitButton.disabled = true;
            emailInput.disabled = true;
            if (nameInput) nameInput.disabled = true;

            try {
                // If API url provided, attempt POST otherwise simulate
                const apiUrl = form.dataset.apiUrl && form.dataset.apiUrl.trim();
                if (apiUrl) {
                    const res = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email }),
                    });

                    if (!res.ok) throw new Error('Network response not ok');
                } else {
                    // Simulate network call
                    await new Promise((r) => setTimeout(r, 1200));
                }

                showMessage(messageBox, "Thanks — you're subscribed! Check your inbox for confirmation.", 'success');
                showNotification('Subscribed', `Thanks ${name || 'friend'} — you'll get updates at ${email}`);
                // clear inputs
                if (nameInput) nameInput.value = '';
                emailInput.value = '';
            } catch (err) {
                console.error('Subscribe error', err);
                showMessage(messageBox, 'Could not subscribe — please try again later.', 'error');
                    } finally {
                        form.classList.remove('sending');
                        if (sendingText) sendingText.style.display = 'none';
                        submitButton.disabled = false;
                        emailInput.disabled = false;
                        if (nameInput) nameInput.disabled = false;
                        // restore scroll after DOM updates (use timeout to ensure layout settled)
                        setTimeout(() => window.scrollTo(scrollX, scrollY), 0);
                    }
        });
    });

    function showMessage(el, text, type) {
        if (!el) return;
        el.textContent = text;
        el.classList.remove('success', 'error');
        el.classList.add(type === 'success' ? 'success' : 'error');
        el.style.opacity = '1';
    }

    function clearMessage(el) {
        if (!el) return;
        el.textContent = '';
        el.classList.remove('success', 'error');
        el.style.opacity = '0';
    }

    function showNotification(title, message) {
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `<h4>${title}</h4><p>${message}</p>`;
        container.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }
});
