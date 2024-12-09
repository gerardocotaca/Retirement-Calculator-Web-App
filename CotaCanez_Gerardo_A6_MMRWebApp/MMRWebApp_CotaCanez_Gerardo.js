"use strict";

// Function to calculate the retirement fund
function calculateRetirement() {
    console.log("Calculate Retirement button clicked");

    // Retrieve and parse input values
    const startingAge = parseInt(document.querySelector('[placeholder="Starting Age"]').value);
    const startingSalary = parseFloat(document.querySelector('[placeholder="Starting Salary"]').value);
    const annualRaisePercent = parseFloat(document.querySelector('[placeholder="Annual Raise%"]').value) / 100;
    const retirementAge = parseInt(document.querySelector('[placeholder="Retirement Age"]').value);
    const annualSavingsPercent = parseFloat(document.querySelector('[placeholder="Annual Savings%"]').value) / 100;
    const interestRatePercent = parseFloat(document.querySelector('[placeholder="Interest Rate%"]').value) / 100;

    // Initialize summary variables for retirement calculations
    let yearsToInvest = retirementAge - startingAge;  
    let lifetimeSalary = 0;  
    let totalSaved = 0;     
    let earnedInterest = 0;  
    let retirementFund = 0;  

    // Clearing any existing rows in the detail table to start fresh
    const detailTable = document.querySelector('.detail-table');
    detailTable.innerHTML = `
        <tr>
            <th>Age</th>
            <th>Salary</th>
            <th>Savings</th>
            <th>Interest</th>
            <th>Retirement</th>
        </tr>`;

    // Initializing values for first year (startingAge)
    let currentSalary = startingSalary;
    let currentSavings = currentSalary * annualSavingsPercent;
    retirementFund = currentSavings;  
    let initialInterest = retirementFund * interestRatePercent; 

    // Add first row for the starting age
    const initialRow = document.createElement('tr');
    initialRow.innerHTML = `
        <td>${startingAge}</td>
        <td>${formatNumberWithCommas(currentSalary)}</td>
        <td>${formatNumberWithCommas(currentSavings)}</td>
        <td>${formatNumberWithCommas(initialInterest)}</td>
        <td>${formatNumberWithCommas(retirementFund + initialInterest)}</td>
    `;
    detailTable.appendChild(initialRow);

    // Updating totals based on initial values
    totalSaved += currentSavings;
    earnedInterest += initialInterest;
    retirementFund += initialInterest;  // Add initial interest to the retirement fund

    // Loop through each year from starting age + 1 to retirement age
    for (let age = startingAge + 1; age <= retirementAge; age++) {
        // Calculate salary increase based on annual raise percentage
        currentSalary += currentSalary * annualRaisePercent;

        // Calculate savings for the current year
        currentSavings = currentSalary * annualSavingsPercent;
        totalSaved += currentSavings;  // Update total saved

        // Add this year's savings to the retirement fund
        retirementFund += currentSavings;

        // Calculate interest based on the updated retirement fund
        const currentInterest = retirementFund * interestRatePercent;
        earnedInterest += currentInterest;  // Update total earned interest

        // Add current years interest to the retirement fund
        retirementFund += currentInterest;

        // Update lifetime salary with the current year's salary
        lifetimeSalary += currentSalary;

        // Appending a new row to the detail table for this year
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${age}</td>
            <td>${formatNumberWithCommas(currentSalary)}</td>
            <td>${formatNumberWithCommas(currentSavings)}</td>
            <td>${formatNumberWithCommas(currentInterest)}</td>
            <td>${formatNumberWithCommas(retirementFund)}</td>
        `;
        detailTable.appendChild(row);
    }

    // Updating summary values for display
    document.querySelector('.summary-table .summary-row:nth-child(1) .summary-value').textContent = yearsToInvest;
    document.querySelector('.summary-table .summary-row:nth-child(2) .summary-value').textContent = formatNumberWithCommas(retirementFund);
    document.querySelector('.summary-table .summary-row:nth-child(3) .summary-value').textContent = formatNumberWithCommas(lifetimeSalary);
    document.querySelector('.summary-table .summary-row:nth-child(4) .summary-value').textContent = formatNumberWithCommas(totalSaved);
    document.querySelector('.summary-table .summary-row:nth-child(5) .summary-value').textContent = formatNumberWithCommas(earnedInterest);
}

// Helper function to format large numbers with commas
function formatNumberWithCommas(num) {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

// Function to clear input values
function clearInputs() {
    console.log("Clear button clicked");
    // Clear each input field
    document.querySelector('[placeholder="Starting Age"]').value = "";
    document.querySelector('[placeholder="Starting Salary"]').value = "";
    document.querySelector('[placeholder="Annual Raise%"]').value = "";
    document.querySelector('[placeholder="Retirement Age"]').value = "";
    document.querySelector('[placeholder="Annual Savings%"]').value = "";
    document.querySelector('[placeholder="Interest Rate%"]').value = "";

    // Clear summary and detail tables
    document.querySelectorAll('.summary-table .summary-value').forEach((element) => {
        element.textContent = "";
    });
    document.querySelector('.detail-table').innerHTML = `
        <tr>
            <th>Age</th>
            <th>Salary</th>
            <th>Savings</th>
            <th>Interest</th>
            <th>Retirement</th>
        </tr>`;
}

// Function to set default values
function setDefaults() {
    console.log("Defaults button clicked");
    document.querySelector('[placeholder="Starting Age"]').value = 25;
    document.querySelector('[placeholder="Starting Salary"]').value = 50000;
    document.querySelector('[placeholder="Annual Raise%"]').value = 2.0;
    document.querySelector('[placeholder="Retirement Age"]').value = 65;
    document.querySelector('[placeholder="Annual Savings%"]').value = 10.0;
    document.querySelector('[placeholder="Interest Rate%"]').value = 7.0;
}

// Event listeners for buttons
document.querySelector('.right-button button').addEventListener('click', calculateRetirement);
document.querySelector('.left-buttons button:nth-child(1)').addEventListener('click', clearInputs);
document.querySelector('.left-buttons button:nth-child(2)').addEventListener('click', setDefaults);