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

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
                // Optionally, notify the user or switch modes automatically
            }
        }, 1000);
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
    }

    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeIcon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    toggleModeButton.addEventListener('click', () => {
        isWorkMode = !isWorkMode;
        modeDisplay.textContent = isWorkMode ? 'Sprint' : 'Chill';
        toggleModeButton.textContent = isWorkMode ? 'Rest' : 'Work';
        timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
        updateTimerDisplay();
        startPauseButton.textContent = 'Start'; // Reset button text
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