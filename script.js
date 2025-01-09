class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.timeLeft = this.workTime;
        this.isRunning = false;
        this.isWorkTime = true;
        this.timer = null;

        // DOM elements
        this.timerDisplay = document.querySelector('.timer');
        this.modeDisplay = document.querySelector('.mode');
        this.startButton = document.getElementById('startPause');
        this.resetButton = document.getElementById('reset');

        // Event listeners
        this.startButton.addEventListener('click', () => this.toggleStartStop());
        this.resetButton.addEventListener('click', () => this.reset());

        // Initial display
        this.updateDisplay();
        this.updateTitle();
    }

    toggleStartStop() {
        if (this.isRunning) {
            this.pause();
            this.startButton.textContent = 'Start';
        } else {
            this.start();
            this.startButton.textContent = 'Pause';
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => this.tick(), 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timer);
    }

    reset() {
        this.pause();
        this.isWorkTime = true;
        this.timeLeft = this.workTime;
        this.modeDisplay.textContent = 'Work Time';
        this.updateDisplay();
        this.startButton.textContent = 'Start';
    }

    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
        } else {
            this.switchMode();
        }
    }

    switchMode() {
        this.isWorkTime = !this.isWorkTime;
        this.timeLeft = this.isWorkTime ? this.workTime : this.breakTime;
        this.modeDisplay.textContent = this.isWorkTime ? 'Work Time' : 'Break Time';
        this.updateDisplay();
        this.notifyUser();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timerDisplay.textContent = timeString;
        this.updateTitle(timeString);
    }

    updateTitle(timeString) {
        // If timeString is undefined (initial state), generate it from the current timeLeft
        if (!timeString) {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        document.title = `${timeString} - ${this.isWorkTime ? 'Work Time' : 'Break Time'}`;
    }

    notifyUser() {
        if (Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
                body: `Time for ${this.isWorkTime ? 'work' : 'a break'}!`,
                icon: 'https://example.com/icon.png'
            });
        }
    }
}

// Initialize the timer
const pomodoro = new PomodoroTimer();

// Request notification permission
if ('Notification' in window) {
    Notification.requestPermission();
} 