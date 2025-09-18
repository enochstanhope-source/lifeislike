document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const cardNumber = document.getElementById('cardNumber');
    const cardHolder = document.getElementById('cardHolder');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');

    // Get preview elements
    const cardNumberPreview = document.getElementById('cardNumberPreview');
    const cardHolderPreview = document.getElementById('cardHolderPreview');
    const cardExpiryPreview = document.getElementById('cardExpiryPreview');

    // Selected room display
    const selectedRoomName = document.getElementById('selectedRoomName');
    const selectedRoomPrice = document.getElementById('selectedRoomPrice');
    const selectedRoomFeatures = document.getElementById('selectedRoomFeatures');

    // Populate selected room from URL (room param)
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (selectedRoomName && room) {
        selectedRoomName.textContent = decodeURIComponent(room);
    }
    const price = params.get('price');
    const features = params.get('features');
    if (selectedRoomPrice && price) selectedRoomPrice.textContent = decodeURIComponent(price);
    if (selectedRoomFeatures && features) selectedRoomFeatures.textContent = decodeURIComponent(features);

    // Format card number with spaces
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        
        for(let i = 0; i < value.length; i++) {
            if(i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
        cardNumberPreview.textContent = formattedValue || '•••• •••• •••• ••••';
        });
    }

    // Update card holder name
    if (cardHolder) {
        cardHolder.addEventListener('input', function(e) {
            if (cardHolderPreview) cardHolderPreview.textContent = e.target.value.toUpperCase() || 'YOUR NAME';
        });
    }

    // Format expiry date
    if (expiryDate) {
        expiryDate.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 2) {
                value = value.substr(0, 2) + '/' + value.substr(2);
            }
            
            e.target.value = value;
            if (cardExpiryPreview) cardExpiryPreview.textContent = value || 'MM/YY';
        });
    }

    // Validate CVV to be numbers only
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // Form submission
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your payment processing logic here
        alert('Payment processing would happen here');
    });
});