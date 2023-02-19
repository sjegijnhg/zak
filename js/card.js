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
        name: "DinersClub",
        length: "14,16",
        prefixes: "36,38,54,55",
        checkdigit: true
    };
    cards[3] = {
        name: "CarteBlanche",
        length: "14",
        prefixes: "300,301,302,303,304,305",
        checkdigit: true
    };
    cards[4] = {
        name: "AmEx",
        length: "15",
        prefixes: "34,37",
        checkdigit: true
    };
    cards[5] = {
        name: "Discover",
        length: "16",
        prefixes: "6011,622,64,65",
        checkdigit: true
    };
    cards[6] = {
        name: "JCB",
        length: "16",
        prefixes: "35",
        checkdigit: true
    };
    cards[7] = {
        name: "enRoute",
        length: "15",
        prefixes: "2014,2149",
        checkdigit: true
    };
    cards[8] = {
        name: "Solo",
        length: "16,18,19",
        prefixes: "6334,6767",
        checkdigit: true
    };
    cards[9] = {
        name: "Switch",
        length: "16,18,19",
        prefixes: "4903,4905,4911,4936,564182,633110,6333,6759",
        checkdigit: true
    };
    cards[10] = {
        name: "Maestro",
        length: "12,13,14,15,16,18,19",
        prefixes: "5018,5020,5038,6304,6759,6761,6762,6763",
        checkdigit: true
    };
    cards[11] = {
        name: "VisaElectron",
        length: "16",
        prefixes: "4026,417500,4508,4844,4913,4917",
        checkdigit: true
    };
    cards[12] = {
        name: "LaserCard",
        length: "16,17,18,19",
        prefixes: "6304,6706,6771,6709",
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

let card = document.querySelector('.pay__card');
let btn = document.querySelector('.form__button');
let out = document.querySelector('.message');
let cvv = document.querySelector('.cvv')
let date = document.querySelector('.date')
let email = document.querySelector('.email')
let lables = document.querySelectorAll('.label-float label')

btn.onclick = function (){
    if(validCreditcard(card.value).message !== null){
        // console.log(validCreditcard(card.value));
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
