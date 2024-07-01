
// ----------- -----------

const dateForm= document.querySelector('#form__input');
const buttonForm= document.querySelector('#form__button');
const alertForm= document.querySelector('#form__alert');
const containerResult= document.querySelector('#container__result');
const textResult= document.querySelector('#result__text');

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
            showResultPast();
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

function showResultFuture(today, chosenDate){
    const {years, months, days}= getDifferenceDates(today, chosenDate);
    console.log({years, months, days});
}

function showResultPast(){
    console.log('Past');
}

function showResultToday(chosenDate){
    textResult.innerText= `${chosenDate.toLocaleDateString()} é a data de hoje!`;
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

const getSizeMonth= (month, year) => {
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
        days= (getSizeMonth(previousMonth2,year2)-day1) + day2;

        if(months === 0){
            months= 11;
            years--;
        }else
            months--;
    }

    return {years, months, days};
}