let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

// let cid = [
//   ["PENNY", 0.01],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 1],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0]
// ];

console.log(price);
//Setup references for html elements
const changeDue = document.getElementById("change-due");
const priceDiv = document.getElementById("price-div");
const secondPriceP = priceDiv.getElementsByTagName("p")[1]; //get second <p> element of div
const purchaseBtn = document.getElementById("purchase-btn");
const cash = document.getElementById("cash");
const cashTotals = document.getElementById("cash-totals");

secondPriceP.textContent = price;


// Setup some variables to work with the functions
let cashBack = [];
let finalCashbackList = [];
let fundsAvailable = false;
const moneyValues = [
    ["PENNY", 0.01],
    ["NICKLE", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["DOLLAR",1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["HUNDRED", 100]
  ];
let counts = [];
let sumCid = 0;
console.log("starting cid", cid);

// Get the cid displayed on the right side screen (cashTotals div)
const draw = () => {
    cashTotals.innerHTML = "";
    cashTotals.innerHTML += `<p>Cash by denomination:</p>`;
    [...cid].forEach((denomination) =>{
      cashTotals.innerHTML += `
        <p>${denomination[0]}: $${(denomination[1])}</p>
      `
    })
};

// Get the total amount of bills to use in the change calculation function
const getCounts = () => {
    for(let i=0; i<moneyValues.length; i++){
      counts[i] = [moneyValues[i][0], Math.round(cid[i][1]/moneyValues[i][1])];
    }
};

// Calculate the cash amount to return to the Customer
const getCashBack = (paid) =>{
    let needed = 0;
    cashBack = [];
    fundsAvailable = false;

    let reverseCid = [...cid].reverse();
    let reverseCounts = [...counts].reverse();
    let reverseMoneyValues = [...moneyValues].reverse();
    let cash = (paid - price).toFixed(2);
    reverseCid.forEach((item) => {
      item[1] = Number(item[1]);
    })

    // console.log(reverseCid);
    for(let i = 0; i<reverseCounts.length; i++){
      needed = Math.floor(cash/reverseMoneyValues[i][1]);
      if(needed>reverseCounts[i][1]){
        cash = cash - (reverseCounts[i][1]*reverseMoneyValues[i][1]);
        cashBack.push([reverseCid[i][0],(reverseCounts[i][1]*reverseMoneyValues[i][1]).toFixed(2)]);
        reverseCid[i][1] = (reverseCid[i][1] - (reverseCounts[i][1]*reverseMoneyValues[i][1])).toFixed(2);
        reverseCounts[i][1] = 0;
      }else{
        reverseCounts[i][1] = reverseCounts[i][1] - needed;
        cashBack.push([reverseCid[i][0], (needed*reverseMoneyValues[i][1]).toFixed(2)]);
        cash = cash - (needed*reverseMoneyValues[i][1]);
        reverseCid[i][1] = (reverseCid[i][1] - (needed*reverseMoneyValues[i][1])).toFixed(2);
      }
      cash = cash.toFixed(2);
    }
    if(cash==0.00){
        fundsAvailable=true;
    }



  }

const updateCid = () =>{
  for(let i=0; i<counts.length; i++){
    cid[i][1] = Number((counts[i][1]*moneyValues[i][1]).toFixed(2));
  }
  console.log("updated cid", cid);
}

const displayCashback = () => {
    finalCashbackList = [];
    cashBack.forEach((denomination)=>{
        if(denomination[1]!=0){
          console.log(denomination[1])
          finalCashbackList.push(denomination);
        }
    })
    console.log(finalCashbackList);
  }


const getCashTotals = (cashPaid) =>{
  getCashBack(cashPaid);
  if(fundsAvailable){
    displayCashback();

    for(let item of finalCashbackList){
      changeDue.innerHTML += `<p>${item[0]}: $${Number(item[1]).toString()}</p>`;
    }
  }else{
    changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
  }
  // reverseArrays();
  draw();
}


const calculateCashback = () =>{
  let cashPaid = cash.value;
  cashPaid = Number(cashPaid).toFixed(2);
  console.log("paid", cashPaid);
  updateCid();
  sumCid=0;
  cid.forEach((num) => {
      sumCid+=num[1];
    });
  sumCid = Number(sumCid.toFixed(2));
  let cashDue = Number((cashPaid-price).toFixed(2));
  console.log(sumCid);
  console.log("CASH DUE: ", cashDue)
  console.log(cashDue>sumCid);
  console.log("subtraction result:", Number((cashDue-sumCid).toFixed(2)));
  changeDue.innerHTML = "";
  if(cashPaid<price){
    alert("Customer does not have enough money to purchase the item");
  }else if(cashDue==0){
    console.log(cashDue);
    changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`
  }else if(cashDue-sumCid>0){
    changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
  }else if(cashDue===sumCid){
    changeDue.innerHTML = `<p>Status: CLOSED</p>`;
    getCashTotals(cashPaid);
  }else{
    changeDue.innerHTML = `<p>Status: OPEN</p>`;
    getCashTotals(cashPaid);
  }
  cash.value="";
}

draw();
getCounts();

purchaseBtn.addEventListener("click",calculateCashback);
