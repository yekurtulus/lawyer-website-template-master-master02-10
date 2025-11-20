// Ýngilizce Açýklama: This file contains the logic for user registration and login using localStorage.
// It manages a list of users, saves the currently logged-in user in sessionStorage,
// and handles redirection after successful operations.

// Kullanýcýlarý Local Storage'dan alýr, yoksa boþ bir dizi oluþturur.
function getUsers() {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
}

// Kullanýcý listesini Local Storage'a kaydeder.
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// ----------------------------------------------------------------------------------
// KAYIT ÝÞLEMÝ (Request 1 ve Request 3'ün Kayýt Kýsmýný Çözer)
// ----------------------------------------------------------------------------------

const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        let users = getUsers();

        // 1. E-posta Kontrolü
        if (users.some(user => user.email === email)) {
            registerMessage.textContent = 'Bu e-posta adresi zaten kayýtlý.';
            registerMessage.className = 'text-danger';
            return;
        }

        // Yeni kullanýcý objesi
        const newUser = {
            name: name,
            email: email,
            password: password, // Not: Gerçek projelerde þifreler þifrelenmelidir (hash).
            // Request 2 için ekstra alanlar ekleyebiliriz:
            phone: '',
            address: ''
        };

        users.push(newUser);
        saveUsers(users);

        registerMessage.textContent = 'Kayýt Baþarýlý! Ana sayfaya yönlendiriliyorsunuz...';
        registerMessage.className = 'text-success';

        // ÝSTEK 1: Kayýt olduktan sonra ana sayfaya (index.html) yönlendirme
        // Yönlendirmeden önce kullanýcýyý oturum açmýþ olarak iþaretlemek isteyebiliriz.
        sessionStorage.setItem('loggedInUser', JSON.stringify(newUser));

        // 2 saniye sonra yönlendir
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}

// ----------------------------------------------------------------------------------
// GÝRÝÞ ÝÞLEMÝ (Request 3 ve Request 4'ü Çözer)
// ----------------------------------------------------------------------------------

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById.value; // Hata: Bu satýrda bir hata olabilir, düzeltiyoruz.
        // Düzeltilmiþ hali:
        const passwordInput = document.getElementById('loginPassword');
        if (!passwordInput) {
            console.error("loginPassword bulunamadý.");
            return;
        }
        const passwordValue = passwordInput.value;

        const users = getUsers();

        // ÝSTEK 3: Tüm kayýtlý kullanýcýlarla giriþ yapabilme kontrolü
        const foundUser = users.find(user => user.email === email && user.password === passwordValue);

        if (foundUser) {
            // Baþarýlý Giriþ
            sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));

            // Request 4: Türkçe karakter hatasý düzeltildi ve yönlendirme eklendi
            loginMessage.textContent = 'Giriþ Baþarýlý! Yönlendiriliyorsunuz...';
            loginMessage.className = 'text-success';

            // 2 saniye sonra yönlendir
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            // Baþarýsýz Giriþ
            loginMessage.textContent = 'Hatalý E-posta veya Þifre.';
            loginMessage.className = 'text-danger';
        }
    });
}

// ----------------------------------------------------------------------------------
// Genellikle tüm sayfalarda oturum kontrolü için bu fonksiyon çaðrýlýr.
// Kullanýcýnýn oturum açýp açmadýðýný kontrol eder.
function checkLoginStatus() {
    return sessionStorage.getItem('loggedInUser') !== null;
}

// Örn: Ana sayfada (index.html) oturum açmýþ kullanýcýya özel bir link gösterilebilir.
// Bu kodu main.js'e veya ilgili HTML dosyasýna ekleyebilirsiniz.
// console.log("Kullanýcý oturum açtý mý? " + checkLoginStatus());