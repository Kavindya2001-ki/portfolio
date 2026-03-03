// ==========================================
// Form Validator for Contact Form
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]*$/,
            message: 'Name must be at least 2 characters and contain only letters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            pattern: /^[\d\s\-\+\(\)]*$/,
            message: 'Please enter a valid phone number'
        },
        subject: {
            required: true,
            minLength: 3,
            message: 'Subject must be at least 3 characters'
        },
        service: {
            required: true,
            message: 'Please select a service'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Message must be at least 10 characters'
        },
        terms: {
            required: true,
            message: 'You must agree to be contacted'
        }
    };
    
    // Validate field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        
        if (!rules) return true;
        
        // Check if required
        if (rules.required && (!value || value.trim() === '')) {
            return { valid: false, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` };
        }
        
        // Check pattern
        if (rules.pattern && value && !rules.pattern.test(value)) {
            return { valid: false, message: rules.message };
        }
        
        // Check min length
        if (rules.minLength && value && value.length < rules.minLength) {
            return { valid: false, message: rules.message };
        }
        
        return { valid: true };
    }
    
    // Show error message
    function showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}Error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        if (inputElement) {
            inputElement.classList.add('is-invalid');
            inputElement.classList.remove('is-valid');
        }
    }
    
    // Clear error message
    function clearError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}Error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        if (inputElement) {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
        }
    }
    
    // Validate form
    function validateForm() {
        let isValid = true;
        const formData = new FormData(contactForm);
        
        for (let [fieldName, value] of formData.entries()) {
            if (fieldName === 'terms') {
                // Special handling for checkbox
                const isChecked = document.getElementById('terms').checked;
                const validation = { valid: isChecked, message: 'You must agree to be contacted' };
                
                if (!validation.valid) {
                    showError(fieldName, validation.message);
                    isValid = false;
                } else {
                    clearError(fieldName);
                }
            } else {
                const validation = validateField(fieldName, value);
                
                if (!validation.valid) {
                    showError(fieldName, validation.message);
                    isValid = false;
                } else {
                    clearError(fieldName);
                }
            }
        }
        
        return isValid;
    }
    
    // Real-time validation on input
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => {
            const fieldName = field.name;
            let value = field.value;
            
            if (fieldName === 'terms') {
                value = field.checked;
            }
            
            const validation = validateField(fieldName, value);
            
            if (!validation.valid && value) {
                showError(fieldName, validation.message);
            } else {
                clearError(fieldName);
            }
        });
        
        field.addEventListener('change', () => {
            clearError(field.name);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showNotification('Please fix the errors above', 'error');
            return;
        }
        
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Simulate form submission (replace with actual backend endpoint)
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validation passed, simulate sending
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Clear validation states
            contactForm.querySelectorAll('input, textarea, select').forEach(field => {
                clearError(field.name);
            });
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Reset button
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                successMessage.style.display = 'none';
            }, 3000);
            
            console.log('Form data:', data);
            
        } catch (error) {
            console.error('Submit error:', error);
            showNotification('There was an error sending your message. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
});

// ==========================================
// Notification Function
// ==========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type}`;
    notification.innerHTML = `
        <div class="container">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${message}
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// Input Masking
// ==========================================

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        
        e.target.value = value;
    });
}

// ==========================================
// Animations
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
    }
    
    .is-valid {
        border-color: #28a745 !important;
    }
`;
document.head.appendChild(style);

console.log('Form validator loaded! ✅');
