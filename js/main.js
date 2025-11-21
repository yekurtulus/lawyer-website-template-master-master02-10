// İngilizce Açıklama: Main template scripts including dynamic navigation control (Request 2) and appointment restriction (Request 1).

(function ($) {
    "use strict";

    // İngilizce Açıklama: Static data structure for attorney profiles and reviews.
    const attorneyData = {
        "Av. Ahmet Yılmaz": {
            bio: "Ceza Hukuku alanında 15 yılı aşkın tecrübesiyle, müvekkillerine en etkin savunmayı sunar.",
            area: "Ceza Hukuku",
            reviews: [
                { client: "O. Demir", text: "Zorlu sürecimde yanımda oldu ve hızlı çözüm sağladı." },
                { client: "M. Kara", text: "Profesyonel yaklaşımı sayesinde beraat ettim." }
            ]
        },
        "Av. Elif Kaya": {
            bio: "Aile Hukuku uyuşmazlıkları, boşanma ve velayet davalarında uzmandır. Duyarlı ve çözüm odaklı yaklaşımıyla bilinir.",
            area: "Aile Hukuku",
            reviews: [
                { client: "A. Gündüz", text: "Boşanma sürecimi çok kolay yönetti, kendisine minnettarım." },
                { client: "S. Tekin", text: "Velayet davamızda harika bir sonuç aldık." }
            ]
        },
        // ... diğer avukatları da buraya ekleyebilirsin
    };
    window.logout = function () {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    }

    // YENİ FONKSİYON: Kullanıcı giriş yapmadıysa randevu almayı engeller (İSTEK 1)
    window.checkLoginForAppointment = function (e) {
        if (!sessionStorage.getItem('loggedInUser')) {
            e.preventDefault();
            alert("Randevu oluşturmak için lütfen önce giriş yapınız.");
            window.location.href = 'login.html';
        }
        // Eğer giriş yapıldıysa, tarayıcı randevu formuna yönlendirir.
    }


    $(document).ready(function () {

        // ----------------------------------------------------------------------
        // OTURUM KONTROLÜ VE DİNAMİK MENÜ GÜNCELLEMESİ (İSTEK 2) 🚀
        // ----------------------------------------------------------------------
        const $userActionContainer = $('#user-action-container');
        const loggedInUserJson = sessionStorage.getItem('loggedInUser');

        if ($userActionContainer.length) {
            if (loggedInUserJson) {
                const user = JSON.parse(loggedInUserJson);
                const firstName = user.name ? user.name.split(' ')[0] : 'Profilim';

                // Giriş Yapmışsa: Bilgilerim ve Çıkış Yap butonu
                $userActionContainer.html(`
                    <a href="kisisel-bilgiler.html" class="btn btn-primary mr-2">${firstName} - Bilgilerim</a>
                    <button onclick="logout()" class="btn btn-danger">Çıkış Yap</button>
                `);
            } else {
                // Giriş Yapmamışsa: Giriş Yap ve Kayıt Ol butonu (İSTEK 2)
                $userActionContainer.html(`
                    <a href="login.html" class="btn btn-secondary mr-2">GİRİŞ YAP</a>
                    <a href="register.html" class="btn btn-primary">KAYIT OL</a>
                `);
            }
        }
        // ----------------------------------------------------------------------

        // İSTEK 1 UYGULAMASI: Randevu form linkine click listener ekle
        // Randevu Alın butonunu bul ve JS fonksiyonunu bağla.
        $('a[href="#appointment"], a[href^="tel"]').not('#user-action-container a').each(function () {
            const href = $(this).attr('href');
            if (href === '#appointment') {
                $(this).removeAttr('href').on('click', window.checkLoginForAppointment);
            }
        });


        // Dropdown on mouse hover (Mevcut kod)
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);


        // ... (Diğer carousel ve scroll kodları buraya devam eder) ...

        // Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        $('.back-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        });


        // Date and time picker
        $('#date').datetimepicker({
            format: 'L'
        });
        $('#time').datetimepicker({
            format: 'LT'
        });


        // Service carousel (Uzmanlık alanları kaldırıldı, ancak carousel hataları için korundu)
        $(".service-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            margin: 30,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });


        // Team carousel
        $(".team-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            margin: 30,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });


        // Testimonials carousel
        $(".testimonial-carousel").owlCarousel({
            center: true,
            autoplay: true,
            smartSpeed: 1000,
            margin: 30,
            dots: true,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
        // Avukat resmine tıklandığında modalı açma ve içeriği doldurma
        $('.team-img img').on('click', function () {
            const attorneyName = $(this).closest('.team-item').find('h5').text();
            const data = attorneyData[attorneyName] || { bio: "Detay bulunamadı.", reviews: [] };

            // Modal içeriğini doldur
            $('#attorneyModalLabel').text(attorneyName);
            $('#attorneyBio').text(data.bio);
            $('#attorneyArea').text(`Uzmanlık Alanı: ${data.area}`);

            const reviewsHtml = data.reviews.length > 0
                ? data.reviews.map(r => `
            <div class="alert alert-light p-2 mb-2">
                <strong>${r.client}:</strong> ${r.text}
            </div>
        `).join('')
                : '<p class="text-muted">Bu avukat hakkında henüz bir müvekkil yorumu bulunmamaktadır.</p>';

            $('#attorneyReviews').html(reviewsHtml);

            // Modalı göster
            $('#attorneyDetailModal').modal('show');
        });
    });

})(jQuery);