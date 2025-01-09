document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const toggleModeButton = document.getElementById('toggleMode');
    const modeDisplay = document.querySelector('.mode');
    const timerDisplay = document.querySelector('.timer');
    const startPauseButton = document.getElementById('startPause');
    const resetButton = document.getElementById('reset');

    let isWorkMode = true;
    let timerInterval;
    let timeLeft = 25 * 60; // Default to 25 minutes

    function updatePageTitle() {
        const modeText = isWorkMode ? 'Sprint' : 'Chill';
        document.title = `${modeText} - ${timerDisplay.textContent}`;
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        updatePageTitle(); // Update the page title whenever the timer display is updated
    }

    function startTimer() {
        if (timerInterval) return; // Prevent multiple intervals
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                startPauseButton.textContent = 'Start'; // Reset button text
                modeDisplay.textContent = 'Do What You Want'; // Reset mode text
                updatePageTitle(); // Update the page title when the timer ends
                // Optionally, notify the user or switch modes automatically
            }
        }, 1000);
        modeDisplay.textContent = isWorkMode ? 'Sprint' : 'Chill'; // Change mode text when timer starts
        updatePageTitle(); // Update the page title when the timer starts
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
        updateTimerDisplay();
        startPauseButton.textContent = 'Start'; // Reset button text
        modeDisplay.textContent = 'Do What You Want'; // Reset mode text
        updatePageTitle(); // Update the page title when the timer is reset
    }

    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeIcon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    toggleModeButton.addEventListener('click', () => {
        isWorkMode = !isWorkMode;
        modeDisplay.textContent = isWorkMode ? 'Sprint' : 'Chill';
        toggleModeButton.textContent = isWorkMode ? 'Chill' : 'Sprint';
        timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
        updateTimerDisplay();
        startPauseButton.textContent = 'Start'; // Reset button text
        updatePageTitle(); // Update the page title when the mode changes
    });

    startPauseButton.addEventListener('click', () => {
        if (timerInterval) {
            pauseTimer();
            startPauseButton.textContent = 'Start';
        } else {
            startTimer();
            startPauseButton.textContent = 'Pause';
        }
    });

    resetButton.addEventListener('click', resetTimer);

    // Initialize display
    updateTimerDisplay();
}); 