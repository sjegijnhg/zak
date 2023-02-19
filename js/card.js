let card = document.querySelector('.pay__card');
let btn = document.querySelector('.form__button');
let out = document.querySelector('.message');
let cvv = document.querySelector('.cvv')
let date = document.querySelector('.date')
let email = document.querySelector('.email')
let lables = document.querySelectorAll('.label-float label')
let master = document.querySelector('.form__card-info .master')
let visa = document.querySelector('.form__card-info .visa')
let mir = document.querySelector('.form__card-info .mir')


const validCreditcard = cardnumb => {
    const ccErrors = [];
    ccErrors[0] = "Неизвестный тип карты";
    ccErrors[1] = "Номер карты не указан";
    ccErrors[2] = "Номер кредитной карты указан в недопустимом формате";
    ccErrors[3] = "Номер кредитной карты недействителен";
    ccErrors[4] = "Номер кредитной карты содержит неподходящее количество цифр";
    ccErrors[5] = "Предупреждение! Этот номер кредитной карты связан с попыткой мошенничества";

    const response = (success, message = null, type = null) => ({
        message,
        success,
        type
    });

    const validCardnumb = numb => {
        const regex = new RegExp("^[0-9]{13,19}$");
        if (!regex.test(numb)) {
            return false;
        }
        return luhnCheck(numb);
    }

    const luhnCheck = val => {
        let validsum = 0;
        let k = 1;
        for (let l = val.length - 1; l >= 0; l--) {
            let calck = 0;
            calck = Number(val.charAt(l)) * k;
            if (calck > 9) {
                validsum = validsum + 1;
                calck = calck - 10;
            }
            validsum = validsum + calck;
            if (k == 1) {
                k = 2;
            } else {
                k = 1;
            }
        }
        return (validsum % 10) == 0;
    }

    const cards = [];
    cards[0] = {
        name: "Visa",
        length: "13,16",
        prefixes: "4",
        checkdigit: true
    };
    cards[1] = {
        name: "MasterCard",
        length: "16",
        prefixes: "51,52,53,54,55",
        checkdigit: true
    };
    
    cards[2] = {
        name: "Mir",
        length: "16",
        prefixes: "2200",
        checkdigit: true
    };

    if (cardnumb.length == 0) {
        return response(false, ccErrors[1]);
    }

    cardnumb = cardnumb.replace(/\s/g, "");

    if (!validCardnumb(cardnumb)) {
        return response(false, ccErrors[2]);
    }

    if (cardnumb == '5490997771092064') {
        return response(false, ccErrors[5]);
    }

    let lengthValid = false;
    let prefixValid = false;
    let cardCompany = "";

    for (let l = 0; l < cards.length; l++) {
        const prefix = cards[l].prefixes.split(",");
        for (let k = 0; k < prefix.length; k++) {
            const exp = new RegExp("^" + prefix[k]);
            if (exp.test(cardnumb)) {
                prefixValid = true;
            }
        }

        if (prefixValid) {
            const lengths = cards[l].length.split(",");
            for (let k = 0; k < lengths.length; k++) {
                if (cardnumb.length == lengths[k]) {
                    lengthValid = true;
                }
            }
        }

        if (lengthValid && prefixValid) {
            cardCompany = cards[l].name;
            return response(true, null, cardCompany);
        }
    }

    if (!prefixValid) {
        return response(false, ccErrors[3]);
    }

    if (!lengthValid) {
        return response(false, ccErrors[4]);
    }

    return response(true, null, cardCompany);
}


card.onchange = function() {
    if(validCreditcard(card.value).type == 'MasterCard'){
        master.style.display = 'block';
        visa.style.display = 'none';
        mir.style.display = 'none';
    }
    else if (validCreditcard(card.value).type == 'Visa'){
        master.style.display = 'none';
        visa.style.display = 'block';
        mir.style.display = 'none';
    }
    else if (validCreditcard(card.value).type == 'Mir'){
        master.style.display = 'none';
        visa.style.display = 'none';
        mir.style.display = 'block';
    }
    else{
        master.style.display = 'none';
        visa.style.display = 'none';
        mir.style.display = 'none';
    }
};


btn.onclick = function (){
    console.log(validCreditcard(card.value).type);
    if(validCreditcard(card.value).type == 'MasterCard'){
        master.style.display = 'block';
    }
    if(validCreditcard(card.value).message !== null){
        console.log(validCreditcard(card.value));
        out.innerHTML = validCreditcard(card.value).message;
        out.classList.add('message--active')
        card.style.borderColor = 'red';
        for (let i = 0; i < lables.length; i++){
            lables[0].style.color = 'red';
        }
    }
    else if(date.value === ''){
        out.innerHTML = 'Не указана дата';
        out.classList.add('message--active')
        card.style.borderColor = '#E2E2E2';
        date.style.borderColor = 'red';
        for (let i = 0; i < lables.length; i++){
            lables[0].style.color = '#E2E2E2';
            lables[1].style.color = 'red';
        }
    }
    else if(cvv.value === ''){
        out.innerHTML = 'Не указан CVV';
        card.style.borderColor = '#E2E2E2';
        date.style.borderColor = '#E2E2E2';
        cvv.style.borderColor = 'red';
        for (let i = 0; i < lables.length; i++){
            lables[0].style.color = '#E2E2E2';
            lables[1].style.color = '#E2E2E2';
            lables[2].style.color = 'red';
        }
    }
    else if(email.value === ''){
        out.innerHTML = 'Не указан email';
        card.style.borderColor = '#E2E2E2';
        date.style.borderColor = '#E2E2E2';
        cvv.style.borderColor = '#E2E2E2';
        email.style.borderColor = 'red';
        for (let i = 0; i < lables.length; i++){
            lables[0].style.color = '#E2E2E2';
            lables[1].style.color = '#E2E2E2';
            lables[2].style.color = '#E2E2E2';
            lables[3].style.color = 'red';
        }
    }
    else{
        console.log(validCreditcard(card.value));
        out.innerHTML= ''
        out.classList.remove('message--active')
        card.style.borderColor = '#E2E2E2';
        date.style.borderColor = '#E2E2E2';
        cvv.style.borderColor = '#E2E2E2';
        email.style.borderColor = '#E2E2E2';
        for (let i = 0; i < lables.length; i++){
            lables[0].style.color = '#E2E2E2';
            lables[1].style.color = '#E2E2E2';
            lables[2].style.color = '#E2E2E2';
            lables[3].style.color = '#E2E2E2';
        }
    }
}
