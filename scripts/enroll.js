document.addEventListener('DOMContentLoaded', () => {
    const enrollmentForm = document.getElementById('enrollmentForm');

    // Get the selected room from URL parameters (if provided)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCourse = urlParams.get('course');
    const selectedPrice = urlParams.get('price');
    const selectedFeatures = urlParams.get('features');

    // Set the selected course in the input field
    const courseInput = document.getElementById('selectedCourse');
    if (courseInput && selectedCourse) {
        courseInput.value = decodeURIComponent(selectedCourse);
    }

    // Populate price and features if present
    const priceEl = document.getElementById('selectedPrice');
    const featuresEl = document.getElementById('selectedFeatures');
    if (priceEl && selectedPrice) priceEl.textContent = decodeURIComponent(selectedPrice);
    if (featuresEl && selectedFeatures) featuresEl.textContent = decodeURIComponent(selectedFeatures);

    // On submit, validate and redirect to checkout.html with the selected room
    enrollmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const course = document.getElementById('selectedCourse').value.trim();

        // Basic validation
        if (!firstName || !lastName || !phone || !course) {
            alert('Please fill in all fields');
            return;
        }

        // Optionally you can send the enrollment data to your server here

        // Redirect to checkout with the selected room name, price and features
        const params = new URLSearchParams();
        params.set('room', course);
        if (priceEl && priceEl.textContent) params.set('price', priceEl.textContent.trim());
        if (featuresEl && featuresEl.textContent) params.set('features', featuresEl.textContent.trim());
        const target = `checkout.html?${params.toString()}`;
        window.location.href = target;
    });

    // Phone input formatting (keep existing behaviour)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 11) {
                    value = value.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
                }
            }
            e.target.value = value;
        });
    }

    // Add focus/blur animations for inputs
    const formFields = document.querySelectorAll('.form-field input, .form-field select');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            if (field.parentElement) field.parentElement.style.transform = 'translateY(-2px)';
            field.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });

        field.addEventListener('blur', () => {
            if (field.parentElement) field.parentElement.style.transform = 'none';
            field.style.boxShadow = 'none';
        });
    });
});
