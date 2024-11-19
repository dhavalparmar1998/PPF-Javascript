document.getElementById('ppfForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Get form values
    let principal = parseFloat(document.getElementById('principal').value);
    let rate = parseFloat(document.getElementById('rate').value);
    let time = parseFloat(document.getElementById('time').value);
    
    // Clear previous results
    document.getElementById('ppfTableBody').innerHTML = '';
    
    // Calculate PPF for each year
    let totalAmount = principal;
    let interest, yearData = [];
    for (let year = 1; year <= time; year++) {

        interest = totalAmount * (rate / 100);
        interest = Math.round(interest)
        totalAmount += interest;
        totalAmount = Math.round(totalAmount)
        
        // Append to table
        let row = `<tr>
                    <td>${year}</td>
                    <td>${principal}</td>
                    <td>${interest}</td>
                    <td>${totalAmount}</td>
                   </tr>`;
        document.getElementById('ppfTableBody').insertAdjacentHTML('beforeend', row);
        
        // Collect data for chart
        yearData.push({
            year: year,
            principal: principal,
            interest: interest,
            total: totalAmount
        });
    }

    // Display PPF result
    document.getElementById('ppfResult').innerText = `Total Amount after ${time} years: ₹${totalAmount.toFixed(2)}`;
    
    // Render pie chart
    let ctx = document.getElementById('ppfChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [principal, totalAmount - principal],
                backgroundColor: ['#4caf50', '#ff6f61']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'PPF Breakdown'
            }
        }
    });
});
