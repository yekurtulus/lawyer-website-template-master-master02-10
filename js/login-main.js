// İngilizce Açıklama: Core logic for user authentication (Login/Register) using pure JavaScript (No jQuery dependency for core logic).
// Uses localStorage for persistent user data (mimicking a database) and sessionStorage for session tracking.
// This version is heavily modified to fix ID mismatch and logic errors in previous attempts.

// Kullanıcıları Local Storage'dan alır, yoksa boş bir dizi (array) oluşturur.
function getUsers() {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Kullanıcı listesini Local Storage'a kaydeder.
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Genel mesaj gösterme fonksiyonu (Pure JS)
function showMessage(elementId, text, type) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        // Eski sınıfları temizle ve yenilerini ekle
        messageElement.className = `mt-3 text-center alert alert-${type}`;
        messageElement.textContent = text;
        messageElement.style.display = 'block'; // Mesajı görünür yap
    }
}

// ----------------------------------------------------------------------------------
// KAYIT İŞLEMİ (REGISTER.HTML)
// ----------------------------------------------------------------------------------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // HTML Düzeltmelerine göre yeni ID'ler
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        if (password !== confirmPassword) {
            showMessage('registerMessage', 'Hata: Şifreler eşleşmiyor!', 'danger');
            return;
        }

        if (!name || !email || !password) {
            showMessage('registerMessage', 'Hata: Lütfen tüm alanları doldurun.', 'danger');
            return;
        }

        let users = getUsers();

        // E-posta Kontrolü
        if (users.some(user => user.email === email)) {
            showMessage('registerMessage', 'Hata: Bu e-posta adresi zaten kayıtlı.', 'danger');
            return;
        }

        // Yeni kullanıcı objesi
        const newUser = {
            name: name,
            email: email,
            password: password,
            phone: 'Belirtilmemiş',
            address: 'Belirtilmemiş'
        };

        users.push(newUser);
        saveUsers(users);

        // Başarılı Kayıt ve Oturum Açma
        sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));

        showMessage('registerMessage', '✅ Kayıt Başarılı! Ana sayfaya yönlendiriliyorsunuz...', 'success');

        // İSTEK 1: Kayıt olduktan sonra 2 saniye sonra ana sayfaya yönlendirme
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}

// ----------------------------------------------------------------------------------
// GİRİŞ İŞLEMİ (LOGIN.HTML)
// ----------------------------------------------------------------------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // HTML Düzeltmelerine göre yeni ID'ler
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            showMessage('loginMessage', 'Hata: Lütfen e-posta ve şifrenizi girin.', 'danger');
            return;
        }

        const users = getUsers();

        // İSTEK 3: Tüm kayıtlı kullanıcılarla giriş yapabilme kontrolü
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            // Başarılı Giriş
            sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));

            // İSTEK 4: Giriş Başarılı mesajı ve yönlendirme
            showMessage('loginMessage', '✅ Giriş Başarılı! Yönlendiriliyorsunuz...', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            // Başarısız Giriş
            showMessage('loginMessage', '❌ Hata: Hatalı E-posta veya Şifre.', 'danger');
        }
    });
}

// ----------------------------------------------------------------------------------
// ŞİFREMİ UNUTTUM İŞLEMİ (FORGOT-PASSWORD.HTML)
// Not: Bu sayfanın ID'leri de yukarıdaki gibi kontrol edilmelidir.
// ----------------------------------------------------------------------------------
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('emailInput').value.trim();
        const users = getUsers();

        if (users.some(user => user.email === email)) {
            showMessage('messageArea', `Şifre sıfırlama talimatları ${email} adresine gönderildi (Simülasyon).`, 'success');
        } else {
            showMessage('messageArea', 'Hata: Bu e-posta adresi sistemde kayıtlı değil.', 'danger');
        }
    });
}