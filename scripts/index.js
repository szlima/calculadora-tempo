
// ----------- -----------

const dateForm= document.querySelector('#form__input');
const buttonForm= document.querySelector('#form__button');
const alertForm= document.querySelector('#form__alert');

// ----------- -----------

window.onload= () => clearDateForm();

dateForm.onkeyup= e => {
    if(e.code === 'Enter')
        calculateTime();
};

buttonForm.onclick= () => calculateTime();

// ----------- -----------

function calculateTime(){

    const chosenDate= getChosenDate(dateForm.value);

    if(checkChosenDate(chosenDate)){
        console.log('tudo certo');
    }else{
        showAlert();
    }
}

function checkChosenDate(chosenDate){
    return chosenDate >= 0;
}

function showAlert(){
    clearDateForm();
    dateForm.classList.add('form__input--alert');
    alertForm.classList.remove('hide');

    setInterval(() => {
        dateForm.classList.remove('form__input--alert');
        alertForm.classList.add('hide');
    }, 4000);    
}

function clearDateForm(){
    dateForm.value= '';
}

function getChosenDate(date){
    return new Date(`${date}T00:00:00Z`).getTime();
}
