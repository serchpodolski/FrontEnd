var inputWord = document.getElementById('text-input');
var checkBtn = document.getElementById('check-btn');
var result = document.getElementById('result');

function validateInput(){
    if(!inputWord.value){
    alert("Please input a value");
    return false;
    }else{
      //console.log(inputWord.value)
      return true;
    }
}

function cleanInput(str){
  const regex = /[+\W_]/g;
  return str.replace(regex, '');
}

function checkPalindrome(){

  if(validateInput()){
    var fwdWord = cleanInput(inputWord.value);
    var reversedWord = cleanInput(inputWord.value).split("").reverse().join("");
    console.log(fwdWord);
    console.log(reversedWord);
    if(fwdWord.toLowerCase() === reversedWord.toLowerCase()){
      console.log("Palindrome found");
      return true;
    }else{
      console.log("Not a palindrome");
      return false;
    }
  }
}

function displayResult(){
  var palindrome = checkPalindrome();
  var outText = "";
  if(palindrome){
    outText = `${inputWord.value} is a palindrome`
  }else{
    outText = `${inputWord.value} is not a palindrome`
  }
  result.classList.remove('hide');
  result.textContent = `${outText}`
};


checkBtn.addEventListener("click", displayResult);
result.addEventListener(
  "click", () => {
    result.classList.add('hide');
  }
)
