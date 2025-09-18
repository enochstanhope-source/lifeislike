// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    const uploadArea = document.getElementById('uploadArea');
    const previewArea = document.getElementById('previewArea');
    const fileInput = document.getElementById('receipt');
    const copyButtons = document.querySelectorAll('.copy-btn');

    // Handle file upload drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        uploadArea.classList.add('highlight');
    }

    function unhighlight(e) {
        uploadArea.classList.remove('highlight');
    }

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle file input change
    fileInput.addEventListener('change', function(e) {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        const file = files[0];
        if (!file) return;

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid file type (JPG, PNG, or PDF)');
            return;
        }

        // Show preview
        previewArea.innerHTML = '';
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            previewArea.appendChild(img);
        } else {
            const fileInfo = document.createElement('div');
            fileInfo.className = 'file-info';
            fileInfo.innerHTML = `
                <i class="fas fa-file-pdf"></i>
                <span>${file.name}</span>
            `;
            previewArea.appendChild(fileInfo);
        }
    }

    // Handle copy buttons
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.dataset.copy;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show feedback
                const originalIcon = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    this.innerHTML = originalIcon;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // Form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic form validation
        const amount = document.getElementById('amount').value;
        const payerName = document.getElementById('payerName').value;
        const payerEmail = document.getElementById('payerEmail').value;
        const transactionRef = document.getElementById('transactionRef').value;
        const receipt = document.getElementById('receipt').files[0];

        if (!amount || !payerName || !payerEmail || !transactionRef || !receipt) {
            alert('Please fill in all fields and upload a receipt');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payerEmail)) {
            alert('Please enter a valid email address');
            return;
        }

        // Here you would typically send the form data to your server
        // For this example, we'll just show a success message
        const formData = new FormData(this);
        
        // Simulate form submission
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        setTimeout(() => {
            alert('Payment verification submitted successfully! We will review and confirm your payment.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verify Payment';
            paymentForm.reset();
            previewArea.innerHTML = '';
        }, 2000);
    });

    // Add custom styling for drag and drop
    document.addEventListener('dragenter', function(e) {
        uploadArea.classList.add('dragover');
    });

    document.addEventListener('dragleave', function(e) {
        uploadArea.classList.remove('dragover');
    });
});
