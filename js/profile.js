// Ýngilizce Açýklama: Script to load and display the logged-in user's personal data from sessionStorage.
document.addEventListener('DOMContentLoaded', () => {
    const userInfoDisplay = document.getElementById('userInfoDisplay');
    const loggedInUserJson = sessionStorage.getItem('loggedInUser');

    if (!loggedInUserJson) {
        // Kullanýcý giriþ yapmamýþsa, login sayfasýna yönlendir veya mesaj göster
        userInfoDisplay.innerHTML = `
            <div class="alert alert-danger text-center">
                Bu sayfayý görüntülemek için giriþ yapmalýsýnýz. 
                <a href="login.html" class="alert-link">Giriþ sayfasýna git</a>
            </div>
        `;
        return;
    }

    const user = JSON.parse(loggedInUserJson);

    // Kayýtlý kullanýcý bilgilerini detaylý olarak gösterme
    userInfoDisplay.innerHTML = `
        <table class="table table-bordered table-striped">
            <tbody>
                <tr>
                    <th scope="row" style="width: 30%;">Ad Soyad</th>
                    <td>${user.name || 'Belirtilmemiþ'}</td>
                </tr>
                <tr>
                    <th scope="row">E-posta Adresi</th>
                    <td>${user.email || 'Belirtilmemiþ'}</td>
                </tr>
                <tr>
                    <th scope="row">Þifre</th>
                    <td>********** (Güvenlik nedeniyle gösterilemez)</td>
                </tr>
                <tr>
                    <th scope="row">Telefon</th>
                    <td>${user.phone || 'Belirtilmemiþ'}</td>
                </tr>
                <tr>
                    <th scope="row">Adres</th>
                    <td>${user.address || 'Belirtilmemiþ'}</td>
                </tr>
            </tbody>
        </table>
        <div class="alert alert-warning mt-4">
            <i class="fa fa-exclamation-triangle"></i> NOT: Bu veriler tarayýcýnýzýn yerel depolama alanýnda tutulmaktadýr (Local Storage).
        </div>
    `;
});