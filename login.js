// login.js

// Form switching functionality
function switchToSignup() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
}

function switchToLogin() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
}

// Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleIcon = input.nextElementSibling.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        toggleIcon.innerHTML = '🙈';
    } else {
        input.type = 'password';
        toggleIcon.innerHTML = '👁️';
    }
}

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateName(name) {
    // Only letters, spaces, hyphens, and apostrophes allowed
    const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
    return nameRegex.test(name);
}

// Error handling functions
function showFieldError(inputId, message) {
    const input = document.getElementById(inputId);
    const inputGroup = input.parentElement;
    
    // Remove existing error
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    input.style.borderBottomColor = '#e74c3c';
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
        animation: slideIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    
    inputGroup.appendChild(errorDiv);
    
    // Add shake animation to input
    input.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

function clearFieldError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const inputGroup = input.parentElement;
    const errorMessage = inputGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    input.style.borderBottomColor = '';
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderBottomColor = '';
    });
}

// Success message functions
function showSuccess() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    
    // Add confetti effect
    createConfetti();
    
    // Play success sound (optional - only if you have a sound file)
    playSuccessSound();
}

function createConfetti() {
    const colors = ['#ffb347', '#e5533d', '#fff', '#ffd700', '#ff6b6b'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4;
        
        confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            top: -10px;
            left: ${Math.random() * 100}%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
            pointer-events: none;
            z-index: 1002;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 5000);
    }
}

function playSuccessSound() {
    // Optional: You can add a success sound here
    try {
        const audio = new Audio('success.mp3'); // Add your sound file
        audio.volume = 0.3;
        audio.play().catch(() => {});
    } catch (error) {}
}

// Loading state functions
function setButtonLoading(button, isLoading, loadingText = 'Please wait...') {
    const span = button.querySelector('span');
    
    if (isLoading) {
        button.setAttribute('data-original-text', span.textContent);
        span.textContent = loadingText;
        button.disabled = true;
        button.style.background = 'rgba(255, 179, 71, 0.6)';
        button.style.cursor = 'not-allowed';
    } else {
        span.textContent = button.getAttribute('data-original-text');
        button.disabled = false;
        button.style.background = '';
        button.style.cursor = 'pointer';
        button.removeAttribute('data-original-text');
    }
}

// Redirect function for success message
function redirectToHome() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        const userData = sessionStorage.getItem('cookbot_user') || localStorage.getItem('cookbot_user');
        if (userData) {
            window.location.href = './home.html';
        } else {
            window.location.href = './index.html';
        }
    }, 500);
}

// Main event listeners
document.addEventListener('DOMContentLoaded', function() {
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes confetti-fall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        
        .error-message { animation: slideIn 0.3s ease-out; }
        .ripple-effect { z-index: 1; }
    `;
    document.head.appendChild(additionalStyles);

    const loginForm = document.getElementById('loginFormElement');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            let isValid = true;
            
            clearFieldError('loginEmail');
            clearFieldError('loginPassword');
            
            if (!email.trim()) {
                showFieldError('loginEmail', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showFieldError('loginEmail', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!password) {
                showFieldError('loginPassword', 'Password is required');
                isValid = false;
            } else if (password.length < 6) {
                showFieldError('loginPassword', 'Password must be at least 6 characters');
                isValid = false;
            }
            
            if (isValid) {
                const button = this.querySelector('.auth-btn');
                setButtonLoading(button, true, 'Logging in...');
                
                setTimeout(() => {
                    const userData = {
                        email: email.trim(),
                        rememberMe: document.getElementById('rememberMe').checked,
                        loginTime: new Date().toISOString()
                    };
                    
                    if (document.getElementById('rememberMe').checked) {
                        localStorage.setItem('cookbot_user', JSON.stringify(userData));
                    } else {
                        sessionStorage.setItem('cookbot_user', JSON.stringify(userData));
                    }
                    
                    console.log('Login successful:', userData);
                    setButtonLoading(button, false);
                    showSuccess();
                }, 1500);
            }
        });
    }
    
    const signupForm = document.getElementById('signupFormElement');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            let isValid = true;
            
            clearFieldError('firstName');
            clearFieldError('lastName');
            clearFieldError('signupEmail');
            clearFieldError('signupPassword');
            clearFieldError('confirmPassword');
            
            if (!firstName.trim()) {
                showFieldError('firstName', 'First name is required');
                isValid = false;
            } else if (!validateName(firstName.trim())) {
                showFieldError('firstName', 'Please enter a valid first name');
                isValid = false;
            }
            
            if (!lastName.trim()) {
                showFieldError('lastName', 'Last name is required');
                isValid = false;
            } else if (!validateName(lastName.trim())) {
                showFieldError('lastName', 'Please enter a valid last name');
                isValid = false;
            }
            
            if (!email.trim()) {
                showFieldError('signupEmail', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showFieldError('signupEmail', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!password) {
                showFieldError('signupPassword', 'Password is required');
                isValid = false;
            } else if (!validatePassword(password)) {
                showFieldError('signupPassword', 'Password must be 8+ characters with uppercase, lowercase & number');
                isValid = false;
            }
            
            if (!confirmPassword) {
                showFieldError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showFieldError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
            
            if (!agreeTerms) {
                const termsCheckbox = document.getElementById('agreeTerms').parentElement;
                termsCheckbox.style.color = '#e74c3c';
                setTimeout(() => termsCheckbox.style.color = '', 3000);
                showFieldError('agreeTerms', 'You must agree to the terms and conditions');
                isValid = false;
            }
            
            if (isValid) {
                const button = this.querySelector('.auth-btn');
                setButtonLoading(button, true, 'Creating Account...');
                
                setTimeout(() => {
                    const userData = {
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: email.trim(),
                        signupTime: new Date().toISOString()
                    };
                    
                    sessionStorage.setItem('cookbot_user', JSON.stringify(userData));
                    
                    console.log('Signup successful:', userData);
                    setButtonLoading(button, false);
                    showSuccess();
                }, 2000);
            }
        });
    }

    // Real-time validation for better UX
    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword) {
        signupPassword.addEventListener('input', function() {
            const password = this.value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password.length > 0) {
                if (validatePassword(password)) {
                    this.style.borderBottomColor = '#4CAF50';
                    clearFieldError('signupPassword');
                } else {
                    this.style.borderBottomColor = '#e74c3c';
                }
            } else {
                this.style.borderBottomColor = '';
            }
            
            const confirmPasswordField = document.getElementById('confirmPassword');
            if (confirmPassword && password !== confirmPassword) {
                confirmPasswordField.style.borderBottomColor = '#e74c3c';
            } else if (confirmPassword) {
                confirmPasswordField.style.borderBottomColor = '#4CAF50';
                clearFieldError('confirmPassword');
            }
        });
    }
    
    const confirmPasswordField = document.getElementById('confirmPassword');
    if (confirmPasswordField) {
        confirmPasswordField.addEventListener('input', function() {
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = this.value;
            
            if (confirmPassword.length > 0) {
                if (password === confirmPassword) {
                    this.style.borderBottomColor = '#4CAF50';
                    clearFieldError('confirmPassword');
                } else {
                    this.style.borderBottomColor = '#e74c3c';
                }
            } else {
                this.style.borderBottomColor = '';
            }
        });
    }
    
    const emailFields = ['signupEmail', 'loginEmail'];
    emailFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email.length > 0) {
                    if (validateEmail(email)) {
                        this.style.borderBottomColor = '#4CAF50';
                        clearFieldError(fieldId);
                    } else {
                        this.style.borderBottomColor = '#e74c3c';
                    }
                } else {
                    this.style.borderBottomColor = '';
                }
            });
            
            field.addEventListener('focus', function() {
                if (this.style.borderBottomColor === 'rgb(231, 76, 60)') {
                    this.style.borderBottomColor = '';
                }
            });
        }
    });
    
    const nameFields = ['firstName', 'lastName'];
    nameFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                const name = this.value.trim();
                if (name.length > 0) {
                    if (validateName(name)) {
                        this.style.borderBottomColor = '#4CAF50';
                        clearFieldError(fieldId);
                    } else {
                        this.style.borderBottomColor = '#e74c3c';
                    }
                } else {
                    this.style.borderBottomColor = '';
                }
            });
            
            field.addEventListener('focus', function() {
                if (this.style.borderBottomColor === 'rgb(231, 76, 60)') {
                    this.style.borderBottomColor = '';
                }
            });
        }
    });

    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    const buttons = document.querySelectorAll('.auth-btn, .success-btn, .back-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.tagName === 'INPUT') {
                const form = activeElement.closest('form');
                if (form) {
                    e.preventDefault();
                    const submitButton = form.querySelector('.auth-btn');
                    if (submitButton && !submitButton.disabled) {
                        submitButton.click();
                    }
                }
            }
        }
        
        if (e.key === 'Escape') {
            const successMessage = document.getElementById('successMessage');
            if (successMessage && successMessage.classList.contains('show')) {
                successMessage.classList.remove('show');
            }
        }
    });
    
    const authForms = document.querySelectorAll('.auth-form form');
    authForms.forEach(form => {
        form.addEventListener('invalid', function(e) {
            e.preventDefault();
            const container = this.closest('.auth-container');
            container.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                container.style.animation = '';
            }, 500);
        });
    });
    
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.style.borderBottomColor === 'rgb(231, 76, 60)') {
                setTimeout(() => {
                    clearFieldError(this.id);
                }, 100);
            }
        });
    });
});

const AuthUtils = {
    isLoggedIn() {
        return sessionStorage.getItem('cookbot_user') || localStorage.getItem('cookbot_user');
    },
    
    getCurrentUser() {
        const userData = sessionStorage.getItem('cookbot_user') || localStorage.getItem('cookbot_user');
        return userData ? JSON.parse(userData) : null;
    },
    
    logout() {
        sessionStorage.removeItem('cookbot_user');
        localStorage.removeItem('cookbot_user');
        window.location.href = './index.html';
    },
    
    getPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        return {
            score: strength,
            level: levels[Math.min(strength, 4)]
        };
    }
};

window.AuthUtils = AuthUtils;

console.log('🍳 COOKBOT Authentication System Loaded Successfully!');
console.log('🔐 Features: Form validation, real-time feedback, animations, session management');