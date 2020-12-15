// Load google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Category', 'Budget Amount Spent'],
  ['Entertainment', 100],
  ['Food', 200],
  ['Clothing', 125],
  ['Bills', 175]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {title: 'Amount Spent by Category', legend: 'right', pieSliceText: 'value','width':325, 'height':150, pieHole: 0.2};
  
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

// document
//     .querySelector("#update_income")
//     .addEventListener("click", updateBudget);
    

document.querySelector("#submit_expense").addEventListener("click",addExpense);

let weeklyBudget = document.querySelector("#weekly_budget");
let incomeInput = document.querySelector("#income_input");
let remainingBalance = document.querySelector("#remaining_balance");
let amountInput = document.querySelector("#amount_input");
let nameInput = document.querySelector("#name_input");
let expenseList = document.querySelector("#expense_list");
let totalExpenses = document.querySelector("#total_expenses");

let weeklyIncome = 0;
let expenses = [];
let expenseTotal = 0;
let balance = 0;

// function updateBudget(event) {
//     event.preventDefault();
//     monthlyIncome = incomeInput.value;
//     monthlyBudget.innerText = "$" + monthlyIncome;
//     incomeInput.value = "";
//     updateBalance();    
// }

// function updateBalance() {
//     balance = monthlyIncome - expenseTotal;
//     remainingBalance.innerText = "$" + balance;
//     if (balance < 0) {
//         remainingBalance.classList.remove("green");
//         remainingBalance.classList.add("red");
//     }   else {
//         remainingBalance.classList.remove("red");
//         remainingBalance.classList.add("green");
//     }
// }

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
    expenses.push(expenseAmount);
    nameInput.value = "";
    amountInput.value = "";
    updateExpenseTotal();
}

// function updateExpenseTotal() {
//     expenseTotal = 0;
//     for (let i = 0; i < expenses.length; i++) {
//         expenseTotal += expenses[i];
//     }
//     totalExpenses.innerText = "$" + expenseTotal;
//     updateBalance();
// }

