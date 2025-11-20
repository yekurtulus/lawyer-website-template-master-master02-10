// İngilizce Açıklama: This file contains the main template functionalities and added session control logic.

(function ($) {
    "use strict";

    // ----------------------------------------------------------------------
    // GLOBAL FONKSİYON: ÇIKIŞ YAPMA
    // ----------------------------------------------------------------------
    window.logout = function () {
        // Oturum bilgisini siliyoruz
        sessionStorage.removeItem('loggedInUser');
        // Ana sayfaya yönlendiriyoruz (veya login.html'e de yönlendirilebilir)
        window.location.href = 'index.html';
    }

    // Dropdown on mouse hover
    $(document).ready(function () {

        // ----------------------------------------------------------------------
        // OTURUM KONTROLÜ VE DİNAMİK MENÜ GÜNCELLEMESİ 🚀
        // ----------------------------------------------------------------------
        const $userActionContainer = $('#user-action-container');
        const loggedInUserJson = sessionStorage.getItem('loggedInUser');

        if ($userActionContainer.length && loggedInUserJson) {
            const user = JSON.parse(loggedInUserJson);
            // Kullanıcının sadece ilk adını alıp menüde gösteriyoruz
            const firstName = user.name ? user.name.split(' ')[0] : 'Profilim';

            // Giriş yapmışsa: Kişisel Bilgiler ve Çıkış Yap butonu göster
            $userActionContainer.html(`
                <a href="kisisel-bilgiler.html" class="btn btn-primary mr-2">${firstName} - Bilgilerim</a>
                <button onclick="logout()" class="btn btn-danger">Çıkış Yap</button>
            `);
        } else if ($userActionContainer.length) {
            // Giriş yapmamışsa: Varsayılan Giriş Yap butonu göster (index.html'deki varsayılan hali)
            $userActionContainer.html(`
                <a href="login.html" class="btn btn-secondary mr-3">MÜVEKKİL GİRİŞİ</a>
            `);
        }
        // ----------------------------------------------------------------------


        // Dropdown on mouse hover
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


        // Service carousel
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

    });

})(jQuery);