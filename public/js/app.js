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
        error_empty_field: "Please fill in this field"
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
        error_empty_field: "يرجى ملء هذا الحقل"
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
        error_empty_field: "تکایە ئەم خانە پڕ بکەرەوە"
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
        error_empty_field: "تکایە ئەڤ خانە پڕ بکە"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 
                     (navigator.language.startsWith('ar') ? 'ar' : 
                      navigator.language.startsWith('ckb') ? 'ckb' :
                      navigator.language.startsWith('badini') ? 'badini' : 'en');
    
    const languageSwitcher = document.querySelector('.language-switcher');
    
    if (languageSwitcher) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'lang-toggle-btn';
        toggleBtn.innerHTML = `
            <span class="logo-lang-btn">🌐</span>
        `;
        
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'lang-buttons-container';
        
        const existingButtons = Array.from(languageSwitcher.querySelectorAll('.lang-btn'));
        existingButtons.forEach(btn => {
            buttonsContainer.appendChild(btn);
        });
        
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
    
    changeLanguage(savedLang);
    
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        form.querySelectorAll('input[required]').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    hideError(this);
                }
            });
        });
    });
});

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' || lang === 'ckb' || lang === 'badini' ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    localStorage.setItem('preferredLanguage', lang);
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input);
        } else {
            hideError(input);
        }
    });
    
    return isValid;
}

function showError(input) {
    let errorSpan = input.nextElementSibling;
    
    if (!errorSpan || !errorSpan.classList.contains('error-message')) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        input.parentNode.insertBefore(errorSpan, input.nextSibling);
    }
    
    errorSpan.textContent = translations[document.documentElement.lang].error_empty_field;
    errorSpan.style.color = 'red';
    errorSpan.style.fontSize = '0.8rem';
    errorSpan.style.marginTop = '5px';
    errorSpan.style.display = 'block';
}

function hideError(input) {
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('error-message')) {
        errorSpan.remove();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        const viewport = document.querySelector('meta[name="viewport"]');
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      });
  
      input.addEventListener('blur', function() {
        const viewport = document.querySelector('meta[name="viewport"]');
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      });
    });
  });

  