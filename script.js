document.getElementById('expForm').addEventListener('submit', addExpense);

// initial array of expenses, reading from localStorage
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense(e){
    //to change the behaviour when button is clicked
    console.log(e.preventDefault());

    // get type, name, date, and amount
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let date = document.getElementById('date').value;
    let amount = document.getElementById('amount').value;

    if(type != 'chooseOne' && name.length > 0 && date != "" && amount > 0){
        const expense = {
            type, 
            name, 
            date,
            amount, 
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        }

        // console.log(expense);
        expenses.push(expense);
        // console.log(expenses);
        
        // store expense in localStorage 
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // to clear all values from form
    document.getElementById('expForm').reset();
    showExpenses();
}

const showExpenses = () => {

    const expenseTable = document.getElementById('expenseTable');

    expenseTable.innerHTML = '';
    for(let i = 0; i < expenses.length; i++){
        console.log("My exp = " , expenses[i]);
        expenseTable.innerHTML += `
            <tr>
                <td>${expenses[i].type}</td>
                <td>${expenses[i].name}</td>
                <td>${expenses[i].date}</td>
                <td>$${expenses[i].amount}</td>
                <td><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">
                    Delete</td>
            </tr>
        `;
    }
}

const deleteExpense = (id) => {

    for(let i=0;i<expenses.length;i++){
        if(id == expenses[i].id){
            expenses.splice(i,1);
        }
    }



    // localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showExpenses();
}

showExpenses();