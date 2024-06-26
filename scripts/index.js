
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
        const difference= chosenDate.getTime() - today.getTime();

        if(difference>0)
            showResultFuture();
        else if(difference<0)
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

function showResultFuture(){
    console.log('Future');
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