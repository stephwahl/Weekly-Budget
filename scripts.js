

document.querySelector("#submit_budget_amount").addEventListener("click", updateRemaining);
document.querySelector("#submit_expense").addEventListener("click",addExpense);

let weeklyBudget = document.querySelector("#weekly_budget");
let entertainmentInput = document.querySelector("#ent_input");
let entRemainingBalance = document.querySelector("#ent_remaining");
let foodInput = document.querySelector("#food_input");
let foodRemainingBalance = document.querySelector("#food_remaining");
let clothingInput = document.querySelector("#clothing_input");
let clothingRemainingBalance = document.querySelector("#clothing_remaining");
let billsInput = document.querySelector("#bills_input");
let billsRemainingBalance = document.querySelector("#bills_remaining");
let nameInput = document.querySelector("#name_input");
let amountInput = document.querySelector("#amount_input");
let totalExpenses = document.querySelector("#total_expenses");

let remainingBalance = document.querySelector("#remaining_balance");
let expenseList = document.querySelector("#expense_list");

let entBudget = 0;
let entExpenses = [];
let entExpenseTotal = 0;
let entBalance = 0;

let foodBudget = 0;
let foodExpenses = [];
let foodExpenseTotal = 0;
let foodBalance = 0;

let clothingBudget = 0;
let clothingExpenses = [];
let clothingExpenseTotal = 0;
let clothingBalance = 0;

let billsBudget = 0;
let billsExpenses = [];
let billsExpenseTotal = 0;
let billsBalance = 0;

function updateRemaining(event) {
  event.preventDefault();
  entBudget = entertainmentInput.value;
  entRemainingBalance.innerText = "$" + entertainmentInput;
  entertainmentInput.value = "";

  foodBudget = foodInput.value;
  foodRemainingBalance.innerText = "$" + foodInput;
  foodInput.value = "";

  clothingBudget = clothingInput.value;
  clothingRemainingBalance.innerText = "$" + clothingInput;
  clothingInput.value = "";

  billsBudget = billsInput.value;
  billsRemainingBalance.innerText = "$" + billsInput;
  billsInput.value = "";
  updateBalance();
}

function updateBalance() {
    entBalance = entBudget - entExpenseTotal;
    entRemainingBalance.innerText = "$" + entBalance;
    if (entBalance < 0) {
        entRemainingBalance.classList.remove("green");
        entRemainingBalance.classList.add("red");
        alert('Your Entertainment expenses have exceeded your budget');
    }   else {
        entRemainingBalance.classList.remove("red");
        entRemainingBalance.classList.add("green");
    }
    
    foodBalance = foodBudget - foodExpenseTotal;
    foodRemainingBalance.innerText = "$" + foodBalance;
    if (foodBalance < 0) {
        foodRemainingBalance.classList.remove("green");
        foodRemainingBalance.classList.add("red");
        alert('Your Food expenses have exceeded your budget');
    }   else {
        foodRemainingBalance.classList.remove("red");
        foodRemainingBalance.classList.add("green");
    }
    clothingBalance = clothingBudget - clothingExpenseTotal;
    clothingRemainingBalance.innerText = "$" + clothingBalance;
    if (clothingBalance < 0) {
        clothingRemainingBalance.classList.remove("green");
        clothingRemainingBalance.classList.add("red");
        alert('Your Clothing expenses have exceeded your budget');
    }   else {
        clothingRemainingBalance.classList.remove("red");
        clothingRemainingBalance.classList.add("green");
    }
    billsBalance = billsBudget - billsExpenseTotal;
    billsRemainingBalance.innerText = "$" + billsBalance;
    if (billsBalance < 0) {
        billsRemainingBalance.classList.remove("green");
        billsRemainingBalance.classList.add("red");
        alert('Your Bills expenses have exceeded your budget');
    }   else {
        billsRemainingBalance.classList.remove("red");
        billsRemainingBalance.classList.add("green");
    }
}

//when you select a category and enter the amount, you have to call the category using the id for the category  
//this will all be input as a function of the submit button 
//the new expense will be calculated by taking the current value and subtracting the newly input expense 
function addExpense(event) {
    event.preventDefault();
    let expense = {
        expenseName: nameInput.value,
        expenseAmount: amountInput.value
    };
    let newExpense = document.createElement("p");
    newExpense.innerText = expense.expenseName + ": $" + expense.expenseAmount;
    expenseList.appendChild(newExpense);
    expenseAmount = parseInt(amountInput.value);
    if (expense.expenseName == "Entertainment") {
      entExpenses.push(expenseAmount);
      nameInput.value = "";
      amountInput.value = "";
      updateExpenseTotal();
    } else if (expense.expenseName == "Food") {
      foodExpenses.push(expenseAmount);
      nameInput.value = "";
      amountInput.value = "";
      updateExpenseTotal();
    } else if (expense.expenseName == "Clothing") {
      clothingExpenses.push(expenseAmount);
      nameInput.value = "";
      amountInput.value = "";
      updateExpenseTotal();
    } if (expense.expenseName == "Bills") {
      billsExpenses.push(expenseAmount);
      nameInput.value = "";
      amountInput.value = "";
      updateExpenseTotal();
    }
}

function updateExpenseTotal() {
    entExpenseTotal = 0;
    foodExpenseTotal = 0;
    clothingExpenseTotal = 0;
    billsExpenseTotal = 0;
    
    for (let i = 0; i < entExpenses.length; i++) {
      entExpenseTotal += entExpenses[i];
    }

    for (let i = 0; i < foodExpenses.length; i++) {
      foodExpenseTotal += foodExpenses[i];
    }

    for (let i = 0; i < clothingExpenses.length; i++) {
      clothingExpenseTotal += clothingExpenses[i];
    }

    for (let i = 0; i < billsExpenses.length; i++) {
      billsExpenseTotal += billsExpenses[i];
    }
 
  let total = entExpenseTotal + foodExpenseTotal + clothingExpenseTotal + billsExpenseTotal;
    totalExpenses.innerText = "$" + total;
    updateBalance();
    drawChart(entExpenseTotal, foodExpenseTotal, clothingExpenseTotal, billsExpenseTotal);
  }

// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  entBalance = entBudget - entExpenseTotal;
  var data = google.visualization.arrayToDataTable([
  ['Category', 'Budget Amount Spent'],
  ['Entertainment', entExpenseTotal],
  ['Food', foodExpenseTotal],
  ['Clothing', clothingExpenseTotal],
  ['Bills', billsExpenseTotal]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {title: 'Amount Spent by Category', legend: 'right', pieSliceText: 'value','width':325, 'height':150, pieHole: 0.2};
  
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}