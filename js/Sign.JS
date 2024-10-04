// تحديد نمط التحقق
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // تأكد من استخدام نفس الاسم
const namePattern = /^[a-zA-Z]+$/; // نمط الأسماء (الحروف فقط)

const signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener('submit', function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // قراءة القيم
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const result = document.getElementById('signUpResult');
    let valid = true;
 
    // مسح رسائل الخطأ السابقة
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    result.textContent = '';

    // التحقق من صحة المدخلات
    if (!namePattern.test(firstName)) {
        document.getElementById('nameError').textContent = "First name is required and should contain only letters.";
        valid = false;
    } else if (!namePattern.test(lastName)) {
        document.getElementById('nameError').textContent = "Last name is required and should contain only letters.";
        valid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = "Invalid email format.";
        valid = false;
    }

    // Check password criteria
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = "Password must be at least 8 characters long.";
        valid = false;
    } else if (!/[A-Z]/.test(password)) {
        document.getElementById('passwordError').textContent = "Password must contain at least one uppercase letter.";
        valid = false;
    } else if (!/[a-z]/.test(password)) {
        document.getElementById('passwordError').textContent = "Password must contain at least one lowercase letter.";
        valid = false;
    } else if (!/\d/.test(password)) {
        document.getElementById('passwordError').textContent = "Password must contain at least one number.";
        valid = false;
    } else if (!/[@$!%*?&]/.test(password)) {
        document.getElementById('passwordError').textContent = "Password must contain at least one special character (e.g., @$!%*?&).";
        valid = false;
    }

    // تحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = "Passwords do not match.";
        valid = false;
    }

    // إذا كانت المدخلات صحيحة
    if (valid) {
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        // تخزين البيانات في LocalStorage
        localStorage.setItem(email, JSON.stringify(userData));

        result.textContent = "Sign up successful!";
        result.className = "success";
    }
});