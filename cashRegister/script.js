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

class Drawer {
  constructor(cid, price){
    this.cid = cid;
    this.cashBack = [];
    this.finalCashbackList = [];
    this.price = price;
    this.fundsAvailable = false;
    this.moneyValues = [
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
    this.counts = [];
  };

  draw(){
    cashTotals.innerHTML = "";
    cashTotals.innerHTML += `<p>Cash by denomination:</p>`;
    this.cid.forEach((denomination) =>{
      cashTotals.innerHTML += `
        <p>${denomination[0]}: $${(denomination[1])}</p>
      `
    })
  };

  getCounts(){
    for(let i=0; i<this.moneyValues.length; i++){
      this.counts[i] = [this.moneyValues[i][0], Math.round(this.cid[i][1]/this.moneyValues[i][1])];
    }
  };

  getCashBack(paid){
    let needed = 0;
    this.cashBack = [];
    this.fundsAvailable = false;

    let reverseCid = this.cid.reverse();
    let reverseCounts = this.counts.reverse();
    let reverseMoneyValues = this.moneyValues.reverse();
    let cash = (paid - this.price).toFixed(2);

    for(let i = 0; i<reverseCounts.length; i++){
      needed = Math.floor(cash/reverseMoneyValues[i][1]);
      if(needed>reverseCounts[i][1]){
        cash = cash - (reverseCounts[i][1]*reverseMoneyValues[i][1]);
        this.cashBack.push([reverseCid[i][0],(reverseCounts[i][1]*reverseMoneyValues[i][1])]);
        reverseCid[i][1] = reverseCid[i][1] - (reverseCounts[i][1]*reverseMoneyValues[i][1]);
        reverseCounts[i][1] = 0;
      }else{
        reverseCounts[i][1] = reverseCounts[i][1] - needed;
        this.cashBack.push([reverseCid[i][0], needed*reverseMoneyValues[i][1]]);
        cash = cash - (needed*reverseMoneyValues[i][1]);
        reverseCid[i][1] = reverseCid[i][1] - (needed*reverseMoneyValues[i][1]);
      }
      cash = cash.toFixed(2);
    }
    console.log("cash remaining", cash)
    if(cash==0.00){
        this.fundsAvailable=true;
        console.log("funds available")
    }

  }

  reverseArrays(){
    this.cid = this.cid.reverse();
    this.counts = this.counts.reverse();
    this.moneyValues = this.moneyValues.reverse();
  }

  displayCashback(){
    this.finalCashbackList = [];
    this.cashBack.forEach((denomination)=>{
        if(denomination[1]!=0){
          this.finalCashbackList.push(denomination);
        }
    })
    console.log(this.finalCashbackList);
  }

}

const drawer = new Drawer([...cid], price);
drawer.draw();
drawer.getCounts();

const getCashTotals = (cashPaid) =>{
  drawer.getCashBack(cashPaid);
  if(drawer.fundsAvailable){
    drawer.displayCashback();

    for(let item of drawer.finalCashbackList){
      changeDue.innerHTML += `<p>${item[0]}: $${item[1]}</p>`;
    }
  }else{
    changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
  }

  drawer.reverseArrays();
  drawer.draw();
  drawer.getCounts();
}

const calculateCashback = () =>{
  let cashPaid = cash.value;
  cashPaid = Number(cashPaid).toFixed(2);
  console.log("paid", cashPaid);
  let sumCid = 0;
  cid.forEach((num) => {
      sumCid+=num[1];
    });
  sumCid = sumCid.toFixed(2);
  let cashDue = (cashPaid-price).toFixed(2);
  console.log(sumCid);
  console.log("CASH DUE: ", cashDue)
  console.log(cashDue>sumCid);
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

purchaseBtn.addEventListener("click",calculateCashback);
