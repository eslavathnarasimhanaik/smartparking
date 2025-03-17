const parkingSlots = [
    { id: 1, status: 'available', type: 'regular' },
    { id: 2, status: 'available', type: 'vip' },
    { id: 3, status: 'occupied', type: 'regular' },
    { id: 4, status: 'available', type: 'regular' },
    { id: 5, status: 'available', type: 'vip' },
    { id: 6, status: 'occupied', type: 'regular' },
    { id: 7, status: 'available', type: 'regular' },
    { id: 8, status: 'available', type: 'regular' },
    { id: 9, status: 'occupied', type: 'vip' },
    { id: 10, status: 'available', type: 'regular' },
];

let selectedSlot = null;

function initializeParking() {
    const parkingGrid = document.getElementById('parkingGrid');
    parkingGrid.innerHTML = '';

    parkingSlots.forEach(slot => {
        const slotElement = document.createElement('div');
        slotElement.className = `parking-slot ${slot.status === 'occupied' ? 'occupied' : ''} ${slot.type}`;
        slotElement.innerHTML = `
            <h3>${slot.id}</h3>
            ${slot.type === 'vip' ? '<i class="fas fa-star"></i>' : ''}
        `;
         slotElement.addEventListener('click', () => handleSlotClick(slot));
        parkingGrid.appendChild(slotElement);
    });

    updateAvailableSpaces();
}

function handleSlotClick(slot) {
    if (slot.status === 'available') {
        selectedSlot = slot;
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('reservationForm').style.display = 'block';
    }
}

function closeForm() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('reservationForm').style.display = 'none';
}

document.getElementById('reservationFormContent').addEventListener('submit', (e) => {
    e.preventDefault();
    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const duration = document.getElementById('duration').value;

    if (vehicleNumber && duration) {
        parkingSlots.find(s => s.id === selectedSlot.id).status = 'occupied';
        initializeParking();
        closeForm();
        alert(`Reservation confirmed!\nSpot: ${selectedSlot.id}\nVehicle: ${vehicleNumber}\nDuration: ${duration} hours`);
    }
});

function updateAvailableSpaces() {
    const available = parkingSlots.filter(slot => slot.status === 'available').length;
    document.getElementById('available-spaces').textContent = available;
}

// Initialize parking system
initializeParking();

function reserveSpot() {
    if (!selectedSlot) {
        alert("Please select a parking spot first.");
        return;
    }

    const vehicleNumber = prompt("Enter Vehicle Number:");
    const duration = prompt("Enter Duration (in hours):");

    if (vehicleNumber && duration) {
        parkingSlots.find(s => s.id === selectedSlot.id).status = 'occupied';
        initializeParking();
        alert(`Reservation confirmed!\nSpot: ${selectedSlot.id}\nVehicle: ${vehicleNumber}\nDuration: ${duration} hours`);
        selectedSlot = null;
    } else {
        alert("Reservation cancelled. Please enter valid details.");
    }
}

// Add event listener for the reserve button
document.getElementById('reserveBtn').addEventListener('click', reserveSpot);
