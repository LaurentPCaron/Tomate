const DELAY = 20;

class Timer {
  constructor(durationInput, startBtn, pauseBtn, callbacks) {
    this.durationInput = durationInput;
    console.log(duration);
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplet = callbacks.onComplet;
    }

    this.startBtn.addEventListener('click', this.start);
    this.pauseBtn.addEventListener('click', this.pause);
  }

  get timeLeft() {
    return parseFloat(this.durationInput.value);
  }

  set timeLeft(time) {
    this.durationInput.value = time.toFixed(2);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeLeft);
    }
    if (!this.interval) {
      this.tick();
      this.interval = setInterval(this.tick, DELAY);
    }
  };

  pause = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  tick = () => {
    if (this.timeLeft > 0) {
      this.timeLeft -= DELAY / 1000;
      if (this.onTick) {
        this.onTick(this.timeLeft);
      }
    } else {
      this.pause();
      if (this.onComplet) {
        this.onComplet();
      }
    }
  };
}
