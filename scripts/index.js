
// ----------- -----------

const dateForm= document.querySelector('#form__input');
const buttonForm= document.querySelector('#form__button');
const alertForm= document.querySelector('#form__alert');
const containerResult= document.querySelector('#container__result');
const textResult= document.querySelector('#result__text');

// ----------- -----------

const YEAR= 'years';
const MONTH= 'months';
const DAY= 'days';
const FUTURE= 'future';
const PAST= 'past';

const MSGS= {
    'future': {
        msgNearDay: 'Amanhã é',
        msgDefaultDays: ['O tempo que falta', 'para']
    },
    'past': {
        msgNearDay: 'Ontem foi',
        msgDefaultDays: ['O tempo que passou', 'desde']
    }
};

// ----------- -----------

window.onload= () => clearDateForm();

dateForm.onkeyup= e => {
    if(e.key === 'Enter')
        calculateTime();
};

buttonForm.onclick= () => calculateTime();

// ----------- -----------

function calculateTime(){
    const today= getTodayDate();
    const chosenDate= getChosenDate(dateForm.value);

    if(checkChosenDate(chosenDate)){
        const difference= chosenDate - today;

        if(difference > 0)
            showResultFuture(today, chosenDate);
        else if(difference < 0)
            showResultPast(today, chosenDate);
        else
            showResultToday(chosenDate);

        clearDateForm();
        showResult();
    }else{
        showAlert();
    }
}

function checkChosenDate(chosenDate){
    return chosenDate.getTime() >= 0;
}

function clearDateForm(){
    dateForm.value= '';
}

function hideResult(){
    containerResult.classList.add('hide');
}

function showResult(){
    containerResult.classList.remove('hide');
}

function showAlert(){
    clearDateForm();
    hideResult();
    dateForm.classList.add('form__input--alert');
    alertForm.classList.remove('invisible');

    setInterval(() => {
        dateForm.classList.remove('form__input--alert');
        alertForm.classList.add('invisible');
    }, 4000);    
}

function showResultToday(chosenDate){
    textResult.innerText= `${chosenDate.toLocaleDateString()} é a data de hoje!`;
}

function showResultDifferentDate(difference, chosenDate, time){

    if(difference.years === 0 && difference.months === 0 && difference.days === 1)
        textResult.innerText= `${MSGS[time].msgNearDay} ${chosenDate.toLocaleDateString()}!`;
    else{
        const div1= document.createElement('div');
        const div2= document.createElement('div');
        const div3= document.createElement('div');

        div1.innerText= MSGS[time].msgDefaultDays[0];
        div2.innerText= `${MSGS[time].msgDefaultDays[1]} ${chosenDate.toLocaleDateString()} é de`;

        for(unit in difference)
            if(difference[unit] > 0)
                div3.appendChild(getMeasurementElement(difference[unit], unit));

        div3.classList.add('result__time');
        textResult.innerText= '';

        textResult.appendChild(div1);
        textResult.appendChild(div2);
        textResult.appendChild(div3);
    }
}

function showResultFuture(today, chosenDate){
    const differenceResult= getDifferenceDates(today, chosenDate);
    showResultDifferentDate(differenceResult, chosenDate, FUTURE);
}

function showResultPast(today, chosenDate){
    const differenceResult= getDifferenceDates(chosenDate, today);
    showResultDifferentDate(differenceResult, chosenDate, PAST);
}

function getChosenDate(date){
    return new Date(`${date}T12:00:00Z`);
}

function getTodayDate(){
    const today= new Date();
    let day= today.getDate();
    let month= today.getMonth()+1;
    const year= today.getFullYear();

    if(month.toString().length === 1)
        month= '0'+month;

    if(day.toString().length === 1)
        day= '0'+day;

    return getChosenDate(`${year}-${month}-${day}`);
}

function getSizeMonth(month, year) {
    switch(month){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            return (year%400 == 0) || (year%4 == 0 && year%100 != 0) ? 29 : 28;
    }
};

function getDifferenceDates(date1, date2){
    const year1= date1.getFullYear(),
        year2= date2.getFullYear(),
        month1= date1.getMonth()+1,
        month2= date2.getMonth()+1,
        day1= date1.getDate(),
        day2= date2.getDate();

    let years= year2 - year1,
        months, days;

    if(month2 >= month1)
        months= month2- month1;
    else{
        months= (12-month1) + month2;
        years--;
    }

    if(day2 >= day1)
        days= day2 - day1;
    else{
        const previousMonth2= (month2 === 1) ? 12 : (month2-1);
        const accumulatedDays= getSizeMonth(previousMonth2,year2) - day1;
        days= ((accumulatedDays >= 0) ? accumulatedDays : 0 ) + day2;

        if(months === 0){
            months= 11;
            years--;
        }else
            months--;
    }

    return {years, months, days};
}

function getMeasurementElement(time, unit){
    const span= document.createElement('span');

    const getMeasurementText= () => {
        const measurementUnits= {
            'years': {
                singular: 'ano',
                plural: 'anos'
            },
            'months': {
                singular: 'mês',
                plural: 'meses'
            },
            'days': {
                singular: 'dia',
                plural: 'dias'
            }
        };

        return (time > 1) ? `${time} ${measurementUnits[unit].plural}` :
            `${time} ${measurementUnits[unit].singular}`;
    };

    span.innerText= getMeasurementText();
    span.classList.add('time__unit');

    return span;
}