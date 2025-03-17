document.addEventListener("DOMContentLoaded", function() {
    // Example data fetching function
    function fetchData() {
        return {
            occupancyRate: "75%",
            peakHour: "5 PM",
            averageDuration: "2h",
            dailyRevenue: "$500",
            hourlyTrend: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            vehicleTypeDistribution: [60, 30, 10],
            parkingDetails: [
                { id: 1, type: "Regular", status: "Occupied", duration: "1h", vehicle: "Car", revenue: "$10" },
                { id: 2, type: "VIP", status: "Available", duration: "0h", vehicle: "N/A", revenue: "$0" },
                // Add more data as needed
            ]
        };
    }

    // Update statistics
    function updateStatistics(data) {
        document.getElementById("occupancy-rate").textContent = data.occupancyRate;
        document.getElementById("peak-hour").textContent = data.peakHour;
        document.getElementById("average-duration").textContent = data.averageDuration;
        document.getElementById("daily-revenue").textContent = data.dailyRevenue;
    }

    // Update charts
    function updateCharts(data) {
        const hourlyTrendCtx = document.getElementById("hourlyTrendChart").getContext("2d");
        new Chart(hourlyTrendCtx, {
            type: "line",
            data: {
                labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"],
                datasets: [{
                    label: "Hourly Parking Trend",
                    data: data.hourlyTrend,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)"
                }]
            }
        });

        const vehicleTypeCtx = document.getElementById("vehicleTypeChart").getContext("2d");
        new Chart(vehicleTypeCtx, {
            type: "doughnut",
            data: {
                labels: ["Cars", "Bikes", "Trucks"],
                datasets: [{
                    label: "Vehicle Type Distribution",
                    data: data.vehicleTypeDistribution,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
                }]
            }
        });
    }

    // Update parking details table
    function updateParkingDetails(data) {
        const tbody = document.getElementById("parking-details");
        tbody.innerHTML = ""; // Clear existing rows
        data.parkingDetails.forEach(detail => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${detail.id}</td>
                <td>${detail.type}</td>
                <td>${detail.status}</td>
                <td>${detail.duration}</td>
                <td>${detail.vehicle}</td>
                <td>${detail.revenue}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Fetch data and update dashboard
    const data = fetchData();
    updateStatistics(data);
    updateCharts(data);
    updateParkingDetails(data);
});