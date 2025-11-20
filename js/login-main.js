// İngilizce Açıklama: Core logic for user authentication. 
// This version includes extensive debug logging to diagnose form submission failure.

// Kullanıcıları Local Storage'dan alır, yoksa boş bir dizi (array) oluşturur.
function getUsers() {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Kullanıcı listesini Local Storage'a kaydeder.
function saveUsers(users) {
    try {
        localStorage.setItem('users', JSON.stringify(users));
        console.log("DEBUG: LocalStorage'a kaydetme başarılı. users anahtarı oluştu.");
    } catch (e) {
        console.error("KRİTİK HATA: Local Storage'a kaydetme başarısız oldu.", e);
    }
}

// Genel mesaj gösterme fonksiyonu (Pure JS)
function showMessage(elementId, text, type) {
    const messageElement = document.getElementById(elementId);
    if (messageElement) {
        messageElement.className = `mt-3 text-center alert alert-${type}`;
        messageElement.textContent = text;
        messageElement.style.display = 'block';
    }
}

// ----------------------------------------------------------------------------------
// TÜM MANTIK BURADA BAŞLIYOR (DOMContentLoaded sargısı ile güvenli çalışma)
// ----------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

    // KONSOL DEBUG ADIMI: Formların varlığını kontrol et
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    console.log("DEBUG KONTROL 1: registerForm elementi bulundu mu?", registerForm ? "EVET, Kayıt Hazır." : "HAYIR");
    console.log("DEBUG KONTROL 2: loginForm elementi bulundu mu?", loginForm ? "EVET, Giriş Hazır." : "HAYIR");

    // ----------------------------------------------------------------------------------
    // KAYIT İŞLEMİ (REGISTER.HTML)
    // ----------------------------------------------------------------------------------
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Hata ayıklamayı kolaylaştırmak için tüm mantığı try-catch içine alıyoruz
            try {
                const name = document.getElementById('regName').value.trim();
                const email = document.getElementById('regEmail').value.trim();
                const password = document.getElementById('regPassword').value;
                const confirmPassword = document.getElementById('regConfirmPassword').value;

                // Konsola gönderilen verileri yaz
                console.log("DEBUG: Kayıt Denemesi:", { name, email, password });

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

                const newUser = {
                    name: name,
                    email: email,
                    password: password,
                    phone: 'Belirtilmemiş',
                    address: 'Belirtilmemiş'
                };

                users.push(newUser);
                saveUsers(users); // Veri kaydetme fonksiyonunu çağırdık.

                // Oturum açma
                sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));

                showMessage('registerMessage', '✅ Kayıt Başarılı! Ana sayfaya yönlendiriliyorsunuz...', 'success');

                // Yönlendirme (2 saniye bekleme)
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);

            } catch (error) {
                // Eğer kod çalışırken beklenmedik bir hata olursa yakala
                showMessage('registerMessage', `KRİTİK HATA: İşlem başarısız. Konsolu kontrol edin.`, 'danger');
                console.error("KRİTİK HATA: Kayıt işlemi (Register Logic) çalışırken bir hata oluştu.", error);
            }
        });
    }

    // ----------------------------------------------------------------------------------
    // GİRİŞ İŞLEMİ (LOGIN.HTML)
    // ----------------------------------------------------------------------------------
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                showMessage('loginMessage', 'Hata: Lütfen e-posta ve şifrenizi girin.', 'danger');
                return;
            }

            const users = getUsers();
            const foundUser = users.find(user => user.email === email && user.password === password);

            console.log("DEBUG: Giriş Denemesi:", email, "Bulundu mu?", foundUser ? "EVET" : "HAYIR");

            if (foundUser) {
                // Başarılı Giriş
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
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

    // ... (Diğer formlar buraya eklenebilir)
});