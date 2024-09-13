const numberInput = document.getElementById('number');
const convertButton = document.getElementById('convert-btn');
const outputDiv = document.getElementById('output');

const checkInput = () => {
  const inputInt = parseInt(numberInput.value);
  if(!numberInput.value || isNaN(inputInt)){
    outputDiv.innerHTML = "Please enter a valid number";
  }else if(inputInt<0){
    outputDiv.innerHTML = "Please enter a number greater than or equal to 1";
  }else if(inputInt>3999){
    outputDiv.innerHTML = "Please enter a number less than or equal to 3999";
  }else{
    outputDiv.innerHTML = getRomanNumeral(inputInt);
  }
  outputDiv.classList.remove('hidden');
}

const getRomanNumeral = (num) =>{
  if((num-1000)>=0){
    return "M" + getRomanNumeral(num-1000);
  }else if((num-900)>=0){
    return "CM" + getRomanNumeral(num-900);
  }else if((num-500)>=0){
    return "D" + getRomanNumeral(num-500);
  }else if((num-400)>=0){
    return "CD" + getRomanNumeral(num-400);
  }else if((num-100)>=0){
    return "C" + getRomanNumeral(num-100);
  }else if((num-90)>=0){
    return "XC" + getRomanNumeral(num-90);
  }else if((num-50)>=0){
    return "L" + getRomanNumeral(num-50);
  }else if((num-40)>=0){
    return "XL" + getRomanNumeral(num-40);
  }else if((num-10)>=0){
    return "X" + getRomanNumeral(num-10);
  }else if((num-9)>=0){
    return "IX" + getRomanNumeral(num-9);
  }else if((num-5)>=0){
    return "V" + getRomanNumeral(num-5);
  }else if((num-4)>=0){
    return "IV" + getRomanNumeral(num-4);
  }else if((num-1)>=0){
    return "I" + getRomanNumeral(num-1);
  }else{
    return "";}

}
convertButton.addEventListener("click",checkInput);
numberInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    checkInput();
  }
})
