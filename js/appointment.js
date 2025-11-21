// İngilizce Açıklama: Handles appointment form submission and saves the data to localStorage.

document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentMessage = document.getElementById('appointmentMessage');
    const loggedInUserJson = sessionStorage.getItem('loggedInUser');

    if (!loggedInUserJson) {
        // Bu sayfaya yetkisiz erişimi engelleme
        if (appointmentMessage) {
            appointmentMessage.textContent = "Randevu alabilmek için giriş yapmalısınız.";
            appointmentMessage.className = "mt-3 text-center alert alert-danger";
            appointmentMessage.style.display = 'block';
        }
        return;
    }

    const user = JSON.parse(loggedInUserJson);

    // Giriş yapan kullanıcının adını ve e-postasını forma otomatik doldur
    document.getElementById('appointmentName').value = user.name;
    document.getElementById('appointmentEmail').value = user.email;

    // Randevuları Local Storage'dan yükle veya yeni boş dizi oluştur
    function getAppointments() {
        const appsJson = localStorage.getItem('userAppointments');
        return appsJson ? JSON.parse(appsJson) : [];
    }

    // Randevuları Local Storage'a kaydet
    function saveAppointments(appointments) {
        localStorage.setItem('userAppointments', JSON.stringify(appointments));
    }

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const newAppointment = {
                userId: user.email,
                date: document.getElementById('appointmentDate').value,
                time: document.getElementById('appointmentTime').value,
                lawyer: document.getElementById('appointmentLawyer').value,
                area: document.getElementById('appointmentLawyer').options[document.getElementById('appointmentLawyer').selectedIndex].text.match(/\(([^)]+)\)/)[1] // Avukat parantez içindeki uzmanlık alanını yakala
            };

            if (!newAppointment.lawyer || newAppointment.lawyer === "") {
                appointmentMessage.textContent = "Lütfen bir avukat seçiniz.";
                appointmentMessage.className = "mt-3 text-center alert alert-danger";
                appointmentMessage.style.display = 'block';
                return;
            }

            let appointments = getAppointments();
            appointments.push(newAppointment);
            saveAppointments(appointments);

            appointmentMessage.textContent = `✅ Randevunuz başarıyla kaydedildi! Randevu: ${newAppointment.date} ${newAppointment.time}`;
            appointmentMessage.className = "mt-3 text-center alert alert-success";
            appointmentMessage.style.display = 'block';

            // Formu temizle (Ad ve E-posta hariç)
            document.getElementById('appointmentDate').value = '';
            document.getElementById('appointmentTime').value = '';
            document.getElementById('appointmentLawyer').value = '';

            setTimeout(() => {
                window.location.href = 'kisisel-bilgiler.html'; // Randevu alındıktan sonra profile yönlendir
            }, 3000);
        });
    }
});