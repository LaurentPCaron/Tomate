const DELAY = 20;

class Timer {
  constructor(durationInput, startBtn, pauseBtn, callbacks) {
    this.durationInput = durationInput;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplet = callbacks.onComplet;
      this.onReset = callbacks.onReset;
    }

    this.counter = 0;
    this.cycles = [
      {
        name: 'Travail',
        length: 25,
        counter: 0,
      },
      {
        name: 'Pause Courte',
        length: 5,
        counter: 0,
      },
      {
        name: 'Pause Longue',
        length: 15,
      },
    ];

    this.startBtn.addEventListener('click', this.start);
    this.pauseBtn.addEventListener('click', this.pause);
    this.durationInput.addEventListener('click', this.pause);
    this.durationInput.addEventListener('change', this.reset);
  }

  get timeLeft() {
    return parseFloat(this.durationInput.value); ///RENDU À CHANGER LES MILISECONDE EN MINUTE.SECONDE
  }

  set timeLeft(time) {
    this.durationInput.value =
      Math.floor(time / 60) + ((time % 60) / 100).toFixed(2);
  }

  start = () => {
    this.displayPauseBtn();
    if (this.onStart) {
      this.onStart(this.timeLeft);
    }
    if (!this.interval) {
      this.tick();
      this.interval = setInterval(this.tick, DELAY);
    }
  };

  pause = () => {
    this.displayPlayBtn();
    clearInterval(this.interval);
    this.interval = null;
  };

  reset = () => {
    this.pause();
    if (this.onReset) {
      this.onReset();
    }
  };

  tick = () => {
    if (this.timeLeft > 0) {
      this.timeLeft -= DELAY / 1000;
    } else {
      this.timeLeft = 0;
      this.counter++;
      this.pause();
      if (this.onComplet) {
        this.onComplet(this.getCycleName());
      }
      this.reset();
    }
    if (this.onTick) {
      this.onTick(this.timeLeft);
    }
  };

  displayPlayBtn = () => {
    this.pauseBtn.style.display = 'none';
    this.startBtn.style.display = 'inline-block';
  };

  displayPauseBtn = () => {
    this.pauseBtn.style.display = 'inline-block';
    this.startBtn.style.display = 'none';
  };

  getCycleName = () => {
    switch (this.counter % 6) {
      case 0:
      case 2:
      case 4:
        this.timeLeft = this.cycles[0].length;
        return this.cycles[0].name;

      case 1:
      case 3:
        this.timeLeft = this.cycles[1].length;
        return this.cycles[1].name;

      case 5:
        this.timeLeft = this.cycles[2].length;
        return this.cycles[2].name;

      default:
        return 'OMG~BBQ';
    }
  };
}
