const translations = {
    en: {
        login_title: "Login | Stock Exchange",
        username: "Username",
        password: "Password",
        login_button: "Login",
        forgot_password: "? Forgot password",
        create_account: "Create new account",
        signup_title: "Sign Up",
        full_name: "Full Name",
        email: "Email",
        confirm_password: "Confirm Password",
        signup_button: "Sign Up",
        already_have_account: "Already have an account? Login",
        error_empty_field: "Please fill in this field",
        error_invalid_email: "Invalid email format",
        error_password_mismatch: "Passwords don't match",
        login_success: "Login successful!",
        delete_confirm: "Are you sure you want to delete your account? This cannot be undone."
    },
    ar: {
        login_title: "تسجيل الدخول",
        username: "اسم المستخدم",
        password: "كلمة المرور",
        login_button: "تسجيل الدخول",
        forgot_password: "هل نسيت كلمة المرور؟",
        create_account: "إنشاء حساب جديد",
        signup_title: "تسجيل حساب جديد",
        full_name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        confirm_password: "تأكيد كلمة المرور",
        signup_button: "تسجيل",
        already_have_account: "لديك حساب بالفعل؟ تسجيل الدخول",
        error_empty_field: "يرجى ملء هذا الحقل",
        error_invalid_email: "صيغة البريد الإلكتروني غير صالحة",
        error_password_mismatch: "كلمات المرور غير متطابقة",
        login_success: "تم تسجيل الدخول بنجاح!",
        delete_confirm: "هل أنت متأكد أنك تريد حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء."
    },
    ckb: {
        login_title: "چوونەژوورەوە | بۆرسە",
        username: "ناوی بەکارهێنەر",
        password: "وشەی نهێنی",
        login_button: "چوونەژوورەوە",
        forgot_password: "وشەی نهێنیت لەبیرکردووە؟",
        create_account: "حیسابێکی نوێ دروست بکە",
        signup_title: "تۆمارکردن",
        full_name: "ناوی تەواو",
        email: "ئیمەیڵ",
        confirm_password: "دووبارەکردنەوەی وشەی نهێنی",
        signup_button: "تۆمارکردن",
        already_have_account: "هەژمارت هەیە؟ چوونەژوورەوە",
        error_empty_field: "تکایە ئەم خانە پڕ بکەرەوە",
        error_invalid_email: "فۆرماتی ئیمەیڵ نادروستە",
        error_password_mismatch: "وشە نهێنیەکان ناگونجاون",
        login_success: "چوونەژوورەوە سەرکەوتووبوو!",
        delete_confirm: "دڵنیایت کە دەتەوێت هەژمارەکە بسڕیتەوە؟ ناتوانیت ئەم کارە بگەڕێنیتەوە."
    },
    badini: {
        login_title: "چووناژوور | بۆرسە",
        username: "ناڤێ بکارهێنەری",
        password: "پەیڤا نهێنی",
        login_button: "چووناژوور",
        forgot_password: "پەیڤا نهێنی تە ژبیرکریە؟",
        create_account: "هژمارەکا نوی دروست بکە",
        signup_title: "تۆمارکرن",
        full_name: "ناوی تەواو",
        email: "ئیمەیڵ",
        confirm_password: "دووبارەکرنا پەیڤا نهێنی",
        signup_button: "تۆمارکرن",
        already_have_account: "هژمار تە هەیە؟ چووناژوور",
        error_empty_field: "تکایە ئەڤ خانە پڕ بکە",
        error_invalid_email: "فۆرماتا ئیمەیڵێ راست نیە",
        error_password_mismatch: "پەیڤان نهێنی نا یەک دەچن",
        login_success: "چووناژوور یا سەرکەفتیبوو!",
        delete_confirm: "دەقینیت کە دەڤێت هژمارەکا تە بسریتەڤە؟ نەڤێت ئەڤ کارە بگریتەڤە."
    }
};

let currentUser = null;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    setupForms();
    setupViewportHandling();
    setupLanguageSwitcher();
    addNotificationStyles();
});

function initializeLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage') || 
                     (navigator.language.startsWith('ar') ? 'ar' : 
                      navigator.language.startsWith('ckb') ? 'ckb' :
                      navigator.language.startsWith('badini') ? 'badini' : 'en');
    changeLanguage(savedLang);
}

function setupLanguageSwitcher() {
    const languageSwitcher = document.querySelector('.language-switcher');
    
    if (!languageSwitcher) return;
    
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'lang-toggle-btn';
    toggleBtn.innerHTML = `<span class="logo-lang-btn">🌐</span>`;
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'lang-buttons-container';
    
    const existingButtons = Array.from(languageSwitcher.querySelectorAll('.lang-btn'));
    existingButtons.forEach(btn => buttonsContainer.appendChild(btn));
    
    languageSwitcher.innerHTML = '';
    languageSwitcher.appendChild(toggleBtn);
    languageSwitcher.appendChild(buttonsContainer);
    
    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        buttonsContainer.classList.toggle('show-lang-buttons');
    });
    
    document.addEventListener('click', function() {
        buttonsContainer.classList.remove('show-lang-buttons');
    });
    
    buttonsContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    buttonsContainer.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            buttonsContainer.classList.remove('show-lang-buttons');
        });
    });
}

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = ['ar', 'ckb', 'badini'].includes(lang) ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang]?.[key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    localStorage.setItem('preferredLanguage', lang);
}

function setupForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                handleFormSubmission(this);
            }
        });
        
        form.querySelectorAll('input[required]').forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    showError(this, translations[document.documentElement.lang].error_empty_field);
                } else {
                    hideError(this);
                }
            });
        });
    });
}

function handleFormSubmission(form) {
    const currentLang = document.documentElement.lang;
    showNotification(translations[currentLang].login_success, 'success');
    
    // Store user data
    if (form.id === 'signup-form') {
        currentUser = {
            name: form.querySelector('#full-name')?.value || form.querySelector('#username').value,
            email: form.querySelector('#email').value,
            username: form.querySelector('#username').value
        };
    } else if (form.id === 'login-form') {
        currentUser = {
            username: form.querySelector('#username').value,
            name: form.querySelector('#username').value,
            email: form.querySelector('#username').value + "@example.com"
        };
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    setTimeout(() => {
        window.location.href = '../html/home.html'; 
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    const currentLang = document.documentElement.lang;
    
    inputs.forEach(input => hideError(input));
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, translations[currentLang].error_empty_field);
            animateError(input);
        } else {
            if (input.type === 'email' && !validateEmail(input.value)) {
                isValid = false;
                showError(input, translations[currentLang].error_invalid_email);
                animateError(input);
            }
            
            if (input.id === 'confirm-password') {
                const password = form.querySelector('#password').value;
                if (input.value !== password) {
                    isValid = false;
                    showError(input, translations[currentLang].error_password_mismatch);
                    animateError(input);
                }
            }
        }
    });
    
    if (!isValid) {
        showNotification(translations[currentLang].error_empty_field, 'error');
    }
    
    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    let errorSpan = input.nextElementSibling;
    
    if (!errorSpan || !errorSpan.classList.contains('error-message')) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        input.parentNode.insertBefore(errorSpan, input.nextSibling);
    }
    
    errorSpan.textContent = message;
    input.classList.add('error');
}

function hideError(input) {
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('error-message')) {
        errorSpan.remove();
    }
    input.classList.remove('error');
}

function animateError(input) {
    input.style.animation = 'none';
    void input.offsetWidth; 
    input.style.animation = 'shake 0.5s';
    
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

function showNotification(message, type = 'error') {
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `form-notification notification-${type}`;
    notification.textContent = message;
    
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(notification, form.firstChild);
    }
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function addNotificationStyles() {
    const notificationCSS = `
    .form-notification {
        position: relative;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 10px;
        color: white;
        text-align: center;
        animation: slideDown 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transition: opacity 0.3s ease;
    }
    
    .notification-error {
        background-color: #ff4444;
    }
    
    .notification-success {
        background-color: #1F7D53;
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = notificationCSS;
    document.head.appendChild(styleElement);
}

function setupViewportHandling() {
    function setViewport() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            if (window.innerWidth <= 768) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            } else {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            }
        }
    }
    
    setViewport();
    window.addEventListener('resize', setViewport);
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// User management functions
function checkLoginStatus() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.location.href = '../index.html';
}

function deleteAccount() {
    const currentLang = document.documentElement.lang;
    if (confirm(translations[currentLang].delete_confirm || "Are you sure you want to delete your account? This cannot be undone.")) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        window.location.href = '../index.html';
    }
}