const theTimer = document.querySelector("#timer");
const textArea = document.querySelector("#inputArea");
const sampleText = document.querySelector("#textDisplay");
const staTus = document.querySelector("#status");
const resetBtn = document.querySelector("#resetBtn");
var timer = [0 , 0 , 0 , 0]
var timeRunnig = false; // to check if the timer is running or not
var interval; // to store the setInterval function
var backspaceCount = 0;
var typing = false;  // to check if the user has finished typing or not

// add leading zero to numbers 9 or below (purely for aesthetics):

const leadingZero = time =>{
    if(time <=9){
        time = '0'+time;
    }
    return time
}

// run a standard minute/second/hundredths timer:

function runTimer(){
   let currentTime = leadingZero(timer[0])+':'+leadingZero(timer[1])+':'+leadingZero(timer[2]);
   theTimer.innerHTML = currentTime;
   timer[3]++;
   timer[0]=Math.floor((timer[3]/100)/60);
   timer[1]=Math.floor((timer[3]/100)-(timer[0]*60));
   timer[2]=Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000));
   
}

// create random text sample

 function createTextSample(){
    let textSamples = [
        "این یک متن نمونه برای تست سرعت تایپ شما است.",
        "سعی کنید با دقت و سرعت این متن را تایپ کنید." ,
        "تایپ سریع و دقیق مهارتی است که با تمرین مداوم به دست می‌ آید.",
        "هر روز چند دقیقه وقت بگذارید و تمرین کنید." ,
        "مکان حروف می‌ تواند به بهبود سرعت تایپ شما کمک کند." ,
        "تمرکز و دقت در تایپ بسیار مهم است." ,
        "از اشتباهات خود درس بگیرید و سعی کنید بهتر شوید." ,
    ]
     let randomIndex = Math.floor(Math.random()*textSamples.length);
     sampleText.textContent = textSamples[randomIndex];
     
 }

 // spell check

function spellCheck(){
    let textEntered = textArea.value;

    let samleTextMatch = sampleText.textContent.substring(0 , textEntered.length);
    textArea.classList.remove('correct' , 'typing' , 'wrong');
    
    if( textEntered==sampleText.textContent)
    {
        textArea.classList.add('correct');
        clearInterval(interval);
        typing = true;
    }
    else if( textEntered==samleTextMatch)
    {
        textArea.classList.add('typing');
    }
    else if(textEntered!=samleTextMatch){
        textArea.classList.add('wrong');
    }
    
}

// mistake counter

function mistake(event){
    if(event.key === 'Backspace' && !typing){
        backspaceCount++ ;
        staTus.innerHTML = `<p>تعداد خطاها: ${backspaceCount} </p>`
    }
}

// start the timer when the user types the first character

const start = () => {
    let textLength = textArea.value.length;
    if(textLength==0 && !timeRunnig)
    {   
        timeRunnig= true
       interval = setInterval(runTimer , 10);
    }
}

// reset function

function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0 , 0 , 0 , 0];
    typing = false;
    timeRunnig = false;
    backspaceCount = 0;
    textArea.value = "";
    textArea.classList.remove('correct' , 'wrong' , 'typing');
    theTimer.innerHTML = '00:00:00'
    staTus.innerHTML = `<p>تعداد خطاها: 0 </p>`
}
window.onload =  createTextSample(); // load the text sample when the window loads
textArea.addEventListener('keypress', start); // start the timer
textArea.addEventListener('keyup' , spellCheck);
textArea.addEventListener('keydown' , mistake);
resetBtn.addEventListener('click' , reset);