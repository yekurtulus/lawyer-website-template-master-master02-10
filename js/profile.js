// Ýngilizce Açýklama: Script to load and display user's profile and simulated appointments. (Updated for Request 1)

document.addEventListener('DOMContentLoaded', () => {
    const userInfoDisplay = document.getElementById('userInfoDisplay');
    const loggedInUserJson = sessionStorage.getItem('loggedInUser');

    if (!loggedInUserJson) {
        userInfoDisplay.innerHTML = `<div class="alert alert-danger text-center">Bu sayfayý görüntülemek için giriþ yapmalýsýnýz. <a href="login.html" class="alert-link">Giriþ sayfasýna git</a></div>`;
        return;
    }

    const user = JSON.parse(loggedInUserJson);

    // Randevularý Local Storage'dan yükle
    function getAppointments(email) {
        const apps = localStorage.getItem('userAppointments');
        if (!apps) return [];
        const allAppointments = JSON.parse(apps);
        // Sadece giriþ yapan kullanýcýya ait randevularý filtrele
        return allAppointments.filter(app => app.userId === email);
    }

    const userAppointments = getAppointments(user.email);

    // Randevu listesi HTML'i oluþtur
    const appointmentListHTML = userAppointments.length > 0
        ? `
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead class="bg-primary text-white">
                        <tr>
                            <th>Tarih</th>
                            <th>Saat</th>
                            <th>Avukat</th>
                            <th>Uzmanlýk Alaný</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${userAppointments.map(app => `
                            <tr>
                                <td>${app.date}</td>
                                <td>${app.time}</td>
                                <td>${app.lawyer.split('(')[0].trim()}</td>
                                <td>${app.area}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `
        : `<div class="alert alert-info text-center">Randevunuz bulunmamaktadýr. Hemen Randevu Alýn!</div>`;


    // ----------------------------------------------------
    // PROFÝL VE RANDEVU BÝLGÝLERÝNÝ GÖSTERME (Görsel iyileþtirme)
    // ----------------------------------------------------
    userInfoDisplay.innerHTML = `
        <h2 class="mt-4 mb-4 text-primary"><i class="fa fa-calendar-check mr-2"></i> Randevularým (${userAppointments.length})</h2>
        ${appointmentListHTML}
        
        <h2 class="mt-5 mb-4 text-primary"><i class="fa fa-user-circle mr-2"></i> Profil Bilgileri</h2>
        <table class="table table-bordered table-striped">
            <tbody>
                <tr><th scope="row" style="width: 30%;">Ad Soyad</th><td>${user.name || 'Belirtilmemiþ'}</td></tr>
                <tr><th scope="row">E-posta Adresi</th><td>${user.email || 'Belirtilmemiþ'}</td></tr>
            </tbody>
        </table>

        <div class="alert alert-warning mt-4">
            <a href="randevu-al.html" class="alert-link">Yeni Randevu Oluþturmak Ýçin Týklayýn.</a>
        </div>
    `;
});