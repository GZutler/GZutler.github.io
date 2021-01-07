let dateF = document.querySelector('.date1 input');
let monthF = document.querySelector('.month input');
let yearF = document.querySelector('.year input')

let nextDr = document.querySelector('.date-of-next-birthday');
let tillNextDr = document.querySelector('.to-the-next-birthday');

let alert = document.querySelector('.alert');

let posdrCard = document.querySelector('.posdr-card');
let posdr = document.querySelector('.posdr');

let candels = document.querySelector('.candles');

let agesSpan = document.querySelector('.ages')

let date;
let month;
let year;

let wholeDate = new Date();

let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

let isNum = function (s) {
    if (s.length === 0) {
        return false
    }
    for (let i = 1; i < s.length; i++) {
        if (!(s[i] in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])) {
            return false
        }
    }
    return true
}

let getNextDr = function (dateDr, dateNow) {
    if (dateNow.getMonth() < dateDr.getMonth() || (dateNow.getMonth() === dateDr.getMonth() && dateNow.getDate() < dateDr.getDate())) {
        return new Date(dateNow.getFullYear(), dateDr.getMonth(), dateDr.getDate())
    } else {
        return new Date(dateNow.getFullYear() + 1, dateDr.getMonth(), dateDr.getDate())
    }
}

dateF.onchange = function () {
    if (isNum(monthF.value) && isNum(yearF.value) && isNum(dateF.value)) {
        alert.classList.add('hidden')
        date = parseInt(dateF.value);
        wholeDate.setDate(date);
        nextDr.textContent = getNextDr(wholeDate, new Date()).toLocaleString('ru', options)
    } else if (isNum(dateF.value)) {
        alert.classList.add('hidden')
        date = parseInt(dateF.value);
        wholeDate.setDate(date);
    } else {
        alert.classList.remove('hidden')
    }
}


yearF.oninput = function () {
    if (isNum(monthF.value) && isNum(yearF.value) && isNum(dateF.value)) {
        alert.classList.add('hidden')
        year = parseInt(yearF.value);
        wholeDate.setFullYear(year);
        nextDr.textContent = getNextDr(wholeDate, new Date()).toLocaleString('ru', options)
    } else if (isNum(yearF.value)) {
        alert.classList.add('hidden');
        year = parseInt(yearF.value);
        wholeDate.setFullYear(year);
    } else {
        alert.classList.remove('hidden')
    }
}

monthF.onchange = function () {
    if (isNum(monthF.value) && isNum(yearF.value) && isNum(dateF.value)) {
        alert.classList.add('hidden')
        month = parseInt(monthF.value);
        wholeDate.setMonth((parseInt(monthF.value) - 1));
        nextDr.textContent = getNextDr(wholeDate, new Date()).toLocaleString('ru', options)
    } else if (isNum(monthF.value)) {
        alert.classList.add('hidden')
        month = parseInt(monthF.value);
        wholeDate.setMonth((parseInt(monthF.value) - 1));
    } else {
        alert.classList.remove('hidden')
    }
}

let timer = setInterval(function () {
    let dateNow = new Date();
    let tillNext = Math.floor(((getNextDr(wholeDate, dateNow) - dateNow) / 1000))
    tillNextDr.textContent = Math.trunc(tillNext / 24 / 3600).toString() + 'д.' + Math.floor((tillNext % (24 * 3600) / 3600)).toString() + 'ч.' + Math.floor((tillNext % (3600) / 60)).toString() + 'м.' +Math.floor(tillNext%(60)).toString() + 'с.';
    if (dateNow.getMonth()===wholeDate.getMonth() && dateNow.getDate()===wholeDate.getDate() && isNum(monthF.value) && isNum(yearF.value) && isNum(dateF.value)){
        posdrCard.classList.add('active');
        let age = dateNow.getFullYear()-wholeDate.getFullYear();
        if (!(candels.childElementCount === age)) {
            while (candels.firstChild) {
                    candels.removeChild(candels.firstChild);
                }
            for (let i=0;i<=age-1;i++){
                let newElement = document.createElement('div');
                newElement.classList.add('candle');
                newElement.onclick = function (){
                    newElement.classList.toggle('another')
                }
                candels.append(newElement)
        }}
    } else {
        posdrCard.classList.remove('active');
        posdr.classList.remove('active')
    }
    let age = dateNow.getFullYear()-wholeDate.getFullYear();
    if (!(agesSpan.textContent === age.toString())) {

        agesSpan.textContent = age.toString()
    }
}, 1000)

posdr.onclick = function (){
    posdr.classList.add('active')
}

