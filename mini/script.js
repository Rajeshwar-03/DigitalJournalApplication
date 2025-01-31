// Initialize entries array to store journal data
let entries = [];

// Get DOM elements
const journalForm = document.getElementById('journalForm');
const entryList = document.getElementById('entryList');
const moodChartContainer = document.getElementById('moodChartContainer');
const entryPage = document.getElementById('entryPage');
const viewPage = document.getElementById('viewPage');
const backButton = document.getElementById('backButton');

// Chart.js setup
const ctx = document.getElementById('moodChart').getContext('2d');
let moodChart;

// Function to render journal entries
function renderEntries() {
  entryList.innerHTML = '';
  entries.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${entry.date}</strong><br>
      Mood: ${entry.mood}<br>
      Notes: ${entry.notes}
    `;
    entryList.appendChild(li);
  });
}

// Function to update the mood chart
function updateChart() {
  const moodData = entries.map(entry => entry.mood);
  const dates = entries.map(entry => entry.date);

  if (moodChart) {
    moodChart.destroy(); // Destroy existing chart
  }

  moodChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Mood Over Time',
        data: moodData,
        borderColor: '#007bff',
        fill: false,
      }],
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return value;
            },
          },
        },
      },
    },
  });
}

// Handle form submission
journalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const mood = document.getElementById('mood').value;
  const notes = document.getElementById('notes').value;

  // Validate inputs
  if (!mood || !notes) {
    alert('Please fill out all fields.');
    return;
  }

  // Create new entry
  const newEntry = {
    date: new Date().toLocaleDateString(),
    mood,
    notes,
  };

  // Add entry to array
  entries.push(newEntry);

  // Change background color based on mood
  document.body.setAttribute('data-mood', mood);

  // Switch to view page
  entryPage.classList.add('hidden');
  viewPage.classList.remove('hidden');

  // Render entries and update chart
  renderEntries();
  updateChart();

  // Reset form
  journalForm.reset();
});

// Handle back button click
backButton.addEventListener('click', () => {
  viewPage.classList.add('hidden');
  entryPage.classList.remove('hidden');
});

// Initial render
renderEntries();