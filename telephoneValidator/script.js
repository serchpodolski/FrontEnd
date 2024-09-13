const clearButton = document.getElementById("clear-btn");
const checkButton = document.getElementById("check-btn");
const phoneDisplay = document.getElementById("phone-display");
const resultsDiv = document.getElementById("results-div");
const userInput = document.getElementById("user-input")

const clearDisplay = () =>{
  resultsDiv.innerHTML = "";
  totalChecks = 0;
  isHidden=true;
  resultsDiv.classList.toggle('hidden');
}

const checkInput = () =>{
  if(!userInput.value){
    alert("Please provide a phone number");
    return false;
  }else{
    return true;
  }
}

const validRegex = /^(1)?(\s)?((\(\d{3}\))|(\d{3}))(\-)?(\s)?\d{3}(\-)?(\s)?\d{4}$/gi;
let isHidden=true;
let totalChecks = 0;

const validatePhone = () => {
  const isInput = checkInput();

  if(totalChecks>=7){
    resultsDiv.style.overflowY = "scroll";
  }
  if(isInput){
    if(userInput.value.match(validRegex)){
        resultsDiv.innerHTML += `
            <p>Valid US Number: <strong>${userInput.value}</strong></p>
          `
      }else{
        resultsDiv.innerHTML += `
            <p class="invalid">Invalid US number: <strong>${userInput.value}</strong></p>
          `
      }
      if(isHidden){
        resultsDiv.classList.toggle('hidden');
        isHidden=false;
      }
      totalChecks++;
    }
  console.log(totalChecks)
  userInput.value = "";
}


clearButton.addEventListener("click", clearDisplay);
checkButton.addEventListener("click", validatePhone);
userInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    validatePhone();
  }
})
