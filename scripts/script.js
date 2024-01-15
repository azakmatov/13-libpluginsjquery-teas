$(window).on('load', function () {
    $('#accordion').accordion();
    new WOW({
        animateClass: 'animate__animated'
    }).init();
    $('.image__popup').magnificPopup({
        type: 'image'
    });
    $('.main__image').slick({
    //     infinite: true,
    //     slidesToShow: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,


        // accessibility: true,
        // draggable: true,
        // infinite: true,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        // swipeToSlide: true,
        // autoplay: false,
        // // autoplaySpeed: 2000,
        prevArrow: $('.arrow-left__image'),
        nextArrow: $('.arrow-ritht__image'),
        // dots: false,



        // dotsClass: $('#feedback__dots'),
        // variableWidth: true,
        // responsive: [
        //     {
        //         breakpoint: 844, // - от какой ширины изменять настройки(992 и ниже)
        //         settings: {
        //             // вносим изменения на ширине 992 и ниже
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         }
        //     },
            // {
            //     breakpoint: 480, // брекпоинтов может быть сколько угодно
            //     settings: {
            //         slidesToShow: 1,
            //         slidesToScroll: 1
            //     }
            // }
        // ],
    });

    function disableChar(obj, param) {
        obj.on('keydown', (e) => {
            for (let i = 0; i < param.length; i++) { /* Второй параметр задан как массив запрещённых значений для ввода */
                if (param[i] === 'num') { /* Если во втором параметре есть строка 'num' */
                    if (!isNaN(parseFloat(e.key))) { /* Если введённый символ является числом */
                        if ((e.key.toLowerCase() !== 'backspace') && (e.key.toLowerCase() !== 'delete') && (e.key !== '+')) {
                            return false;
                        }
                    }
                } else if (param[i] === 'toTel') { /* Если во втором параметре есть строка 'str' */
                    if (isNaN(parseFloat(e.key))) { /* Если введённый символ не является числом */
                        if ((e.key.toLowerCase() !== 'backspace') && (e.key.toLowerCase() !== 'delete') && (e.key.toLowerCase() !== 'arrowLeft'.toLowerCase()) && (e.key.toLowerCase() !== 'arrowRight'.toLowerCase()) && (e.key !== '+') && (e.key !== '(') && (e.key !== ')') && (e.key !== '-') && (e.key !== ' ')) {
                            return false;
                        }
                    }
                } else if (param[i] === 'str') { /* Если во втором параметре есть строка 'str' */
                    if (isNaN(parseFloat(e.key))) { /* Если введённый символ не является числом */
                        if ((e.key.toLowerCase() !== 'backspace') && (e.key.toLowerCase() !== 'delete') && (e.key.toLowerCase() !== 'arrowLeft'.toLowerCase()) && (e.key.toLowerCase() !== 'arrowRight'.toLowerCase())) {
                            return false;
                        }
                    }
                } else { /* Иначе запрещаем любое для ввода значение, идентичное данному элементу  */
                    if ((e.key === param[i])) {
                        if ((e.key !== 'backspace') || (e.key !== 'delete')) {
                            return false;
                        }
                    }
                }
            }
        });
    }

    function checkDataInObject(obj) {
        if (obj) {
            if (obj !== '') {
                return 1;
            } else {
                return 0;
            }
        } else {
            return -1;
        }
    }

    function checkInput(obj) {
        for (let i = 0; i < obj.length; i++) {
            switch (checkDataInObject(obj[i][0])) {
                case -1:
                    alert('У поля "' + obj[i][1] + '" некорректные введённые данные.\nПожалуйста, введите корректные данные!\nЗаполните поле "' + obj[i][1] + '"');
                    return false;
                case 0:
                    alert('Поле "' + obj[i][1] + '" пустое.\n Пожалуйста, введите корректные данные!\nЗаполните поле "' + obj[i][1] + '"');
                    return false;
            }
        }
        return true;
    }

    let name = $('#name');
    let surname = $('#surname');
    let tel = $('#tel');
    let country = $('#country');
    let index = $('#index');
    let address = $('#address');
    let form = $('.form');
    let formTitle = $('.form__title');
    let dialogText = $('.dialog__text')
    let formAction = $('#form__action');
    let dialog = $('#dialog');
    disableChar(name, ['num', '.', ',', '/']);
    disableChar(surname, ['num', '.', ',', '/']);
    disableChar(tel, ['toTel']);
    disableChar(country, ['num', ',', '/']);
    disableChar(index, ['str']);
    tel.inputmask({'mask': '+999(999)999999'});
    formAction.on('click', () => {
        let formInfo = [
            [name.val(), 'Имя'],
            [surname.val(), 'Фамилия'],
            [tel.val(), 'Телефон'],
            [country.val(), 'Страна'],
            [index.val(), 'Индекс'],
            [address.val(), 'Адрес']
        ];
        if (checkInput(formInfo)) {
            if (index.val().length !== 6) {
                alert('Длина поля индекса должна быть 6 символов.');
            } else {
                form.addClass('hidden');
                formTitle.addClass('hidden');
                dialogText.removeClass('hidden');
                dialog.dialog({
                    close:function() {
                        form.removeClass('hidden');
                        name.val('');
                        surname.val('');
                        tel.val('');
                        country.val('');
                        index.val('');
                        address.val('');
                        formTitle.removeClass('hidden');
                        dialogText.addClass('hidden');
                    },
                });
            }
        }
    });
});