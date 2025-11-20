// İngilizce Açıklama: Core logic for user authentication (Login/Register) using jQuery and HTML IDs.
// It uses localStorage for persistent user data (mimicking a database) and sessionStorage for session tracking.
// This single file handles the interaction for all login and registration related pages.

// Kullanıcıları Local Storage'dan alır, yoksa boş bir dizi (array) oluşturur.
function getUsers() {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Kullanıcı listesini Local Storage'a kaydeder.
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Genel mesaj gösterme fonksiyonu (jQuery tabanlı)
function showMessage(selector, text, type) {
    const $messageArea = $(selector);
    $messageArea.removeClass('d-none alert-info alert-success alert-danger alert-warning')
        .addClass(type)
        .html(text) // Mesajı HTML olarak gösterir.
        .slideDown();
}

$(document).ready(function () {

    // ----------------------------------------------------------------------------------
    // KAYIT İŞLEMİ (REGISTER.HTML)
    // İSTEK 1 (Yönlendirme), İSTEK 3 (Tüm e-postaları kaydetme) çözülür.
    // ----------------------------------------------------------------------------------
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();

        // Form alanlarının ID'leri register.html'deki ID'lerdir
        const name = $('#nameInput').val().trim();
        const email = $('#emailInput').val().trim();
        const password = $('#passwordInput').val();
        const confirmPassword = $('#confirmPasswordInput').val();

        // Mesaj alanının ID'si register.html'de #messageArea
        const $messageArea = $('#messageArea');

        // Şifre Eşleşme Kontrolü
        if (password !== confirmPassword) {
            showMessage('#messageArea', 'Hata: Şifreler eşleşmiyor! Lütfen kontrol edin.', 'alert-danger');
            return;
        }

        if (!name || !email || !password) {
            showMessage('#messageArea', 'Hata: Lütfen tüm alanları doldurun.', 'alert-danger');
            return;
        }

        let users = getUsers();

        // E-posta Kontrolü
        if (users.some(user => user.email === email)) {
            showMessage('#messageArea', 'Hata: Bu e-posta adresi zaten kayıtlı.', 'alert-danger');
            return;
        }

        // Yeni kullanıcı objesi (İSTEK 2 için gerekli alanlar)
        const newUser = {
            name: name,
            email: email,
            password: password, // Gerçek projede hash'lenmeli.
            phone: 'Belirtilmemiş',
            address: 'Belirtilmemiş'
        };

        users.push(newUser);
        saveUsers(users);

        // Başarılı Kayıt ve Oturum Açma
        sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));

        showMessage('#messageArea', '✅ Kayıt Başarılı! Ana sayfaya yönlendiriliyorsunuz...', 'alert-success');

        // İSTEK 1: Kayıt olduktan sonra 2 saniye sonra ana sayfaya yönlendirme
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });

    // ----------------------------------------------------------------------------------
    // GİRİŞ İŞLEMİ (LOGIN.HTML)
    // İSTEK 3 (Tüm e-postalarla giriş), İSTEK 4 (Türkçe karakter ve genel giriş başarısı) çözülür.
    // ----------------------------------------------------------------------------------
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        // Form alanlarının ID'leri login.html'deki ID'lerdir (emailInput, passwordInput)
        const email = $('#emailInput').val().trim();
        const password = $('#passwordInput').val();

        // Mesaj alanının ID'si login.html'de #messageArea
        const $messageArea = $('#messageArea');

        if (!email || !password) {
            showMessage('#messageArea', 'Hata: Lütfen e-posta ve şifrenizi girin.', 'alert-danger');
            return;
        }

        const users = getUsers();

        // İSTEK 3: Tüm kayıtlı kullanıcılarla giriş yapabilme kontrolü
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            // Başarılı Giriş
            sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));

            // İSTEK 4: Türkçe karakter hatası düzeltildi ve yönlendirme eklendi
            showMessage('#messageArea', '✅ Giriş Başarılı! Yönlendiriliyorsunuz...', 'alert-success');

            // 2 saniye sonra ana sayfaya yönlendir
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            // Başarısız Giriş
            showMessage('#messageArea', '❌ Hata: Hatalı E-posta veya Şifre. Lütfen kontrol edin.', 'alert-danger');
        }
    });

    // ----------------------------------------------------------------------------------
    // ŞİFREMİ UNUTTUM İŞLEMİ (FORGOT-PASSWORD.HTML)
    // ----------------------------------------------------------------------------------
    $('#forgotPasswordForm').on('submit', function (e) {
        e.preventDefault();

        const email = $('#emailInput').val().trim();
        const $messageArea = $('#messageArea');
        const users = getUsers();

        if (users.some(user => user.email === email)) {
            showMessage('#messageArea', `Şifre sıfırlama talimatları ${email} adresine gönderildi (Simülasyon). Lütfen e-postanızı kontrol edin.`, 'alert-success');
        } else {
            showMessage('#messageArea', 'Hata: Bu e-posta adresi sistemde kayıtlı değil.', 'alert-danger');
        }
    });
});