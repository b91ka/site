window.onload = function () {

    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.phone').mask('+7(999)999-99-99');
    $('#time').mask('99:99 99.99.9999');

    $('#master-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        customPaging: function (slider, i) {
            return '<a>' + (i + 1) + '</a>';
        },
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
    });

    let gallery = $('#our-gallery');
    gallery.slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 1070,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 835,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('.parent-container').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        },
    });


    let accordion = (function () {

        let getItem = function (elements, className) {
            let element = undefined;
            elements.forEach(function (item) {
                if (item.classList.contains(className)) {
                    element = item;
                }
            });
            return element;
        };

        return function () {
            let mainElement = document.getElementById('accordion');
            let items = document.getElementsByClassName('accordion-item');


            let actionClick = function (e) {
                    if (!e.target.classList.contains('accordion-title')) {
                        return;
                    }
                    e.preventDefault(); // отменям стандартное действие
                    // получаем необходимые данные
                    let item = e.target.parentElement;
                    let itemActive = getItem(items, 'show');
                    if (itemActive === undefined) {
                        item.classList.add('show');
                    } else {
                        itemActive.classList.remove('show');
                        if (itemActive !== item) {
                            item.classList.add('show');
                        }
                    }
                },
                setupListeners = function () {
                    mainElement.addEventListener('click', actionClick);
                };

            return {
                init: function (element) {
                    mainElement = (typeof element === 'string' ? document.querySelector(element) : element);
                    items = mainElement.querySelectorAll('.accordion-item');
                    setupListeners();
                }
            }
        }
    })();
    let accordionName = accordion();
    accordionName.init('#accordion');

    $('#btn-question').click(() => {
        let phone = $('#form-question-control');

        if (phone.val()) {
            $.ajax({
                type: 'post',
                url: 'mail-faq.php',
                data: 'phone=' + phone.val(),
                success: () => {
                    $('#questions-form-thanks').show();
                },
                error: () => {
                    alert('Ошибка отправки. Свяжитесь, пожалуйста, с нами по номеру телефона +7(981)458-85-96.');
                }
            });
        } else {
            $('#questions-form-error').show();
            phone.css('border-color', 'red');
        }
    });

    let btnArr = document.getElementsByClassName('btn-action');
    Array.prototype.forEach.call(btnArr, function (element) {
        element.addEventListener('click', function () {

            document.getElementById('reservation-container').style.display = 'flex';

            if (element.classList.contains('product')) {
                let optionArr = document.getElementById('selector').getElementsByTagName('option');
                let eClass = element.classList;
                switch (true) {
                    case(eClass.contains('product1')):
                        optionArr[1].selected = true;
                        break;
                    case(eClass.contains('product2')):
                        optionArr[2].selected = true;
                        break;
                    case(eClass.contains('product3')):
                        optionArr[3].selected = true;
                        break;
                    case(eClass.contains('product4')):
                        optionArr[4].selected = true;
                        break;
                }
            }
        });
    });

    document.getElementById('reservation-cancel').addEventListener('click', function () {
        document.getElementById('reservation-container').style.display = 'none';
    });


    $('#reserve-button').click(() => {
        let name = $('#name');
        let phone = $('#phone');
        let product = $('#product');
        let time = $('#time');

        if (name.val() && phone.val() && product.val() && time.val()) {
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name=' + name.val() + '&phone=' + phone.val()
                    + '&product=' + product.val() + '&time=' + time.val(),
                success: () => {
                    $('#reservation-sent').show();
                    $('#reservation-content').hide();
                },
                error: () => {
                    $('#reservation-container').hide();
                    alert('Ошибка бронирования. Свяжитесь, пожалуйста по номеру телефона');
                }
            });
        } else {

            $('#reserve-error').show();
        }
    });
}