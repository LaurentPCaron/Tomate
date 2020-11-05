const DELAY = 1; //En sec

class Timer {
  constructor(durationInput, startBtn, pauseBtn, skipBtn, callbacks) {
    this.durationInput = durationInput;
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    this.shikBtn = skipBtn;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplet = callbacks.onComplet;
      this.onReset = callbacks.onReset;
      this.onError = callbacks.onError;
    }

    this.timer = new easytimer.Timer();
    this.timer.addEventListener('secondsUpdated', e => {
      this.tick();
    });
    this.haveError = false;
    this.counter = 0;
    this.cycles = [
      {
        name: 'Travail',
        length: '25:00',
        index: 0,
      },
      {
        name: 'Pause <br/> Courte',
        length: '5:00',
        index: 1,
      },
      {
        name: 'Pause <br/> Longue',
        length: '15:00',
        index: 2,
      },
    ];

    this.startBtn.addEventListener('click', this.start);
    this.pauseBtn.addEventListener('click', this.pause);
    this.shikBtn.addEventListener('click', this.endCycle);
    this.durationInput.addEventListener('click', this.pause);
    this.durationInput.addEventListener('change', this.reset);
  }

  get timeLeft() {
    return this.minutesToSecondes(this.durationInput.value).toString();
  }

  set timeLeft(time) {
    this.durationInput.value = this.secondesToMinutes(time);
  }

  start = () => {
    if (!this.haveError) {
      this.displayPauseBtn();
      if (this.onStart) {
        this.onStart(this.timeLeft);
      }
      if (!this.timer.isRunning()) {
        this.timer.start();
      }
    }
  };

  pause = () => {
    this.displayPlayBtn();
    this.timer.pause();
  };

  reset = () => {
    const input = this.durationInput.value;
    this.haveError = false;

    try {
      if (!input.search(new RegExp(/^\d+((:[0-5])?\d?)?$/)) < 1) {
        throw new Error('Invalid Format. Use mm:ss');
      }
    } catch (e) {
      this.haveError = true;
      this.onError(e);
    }

    this.pause();
    if (this.onReset && !this.haveError) {
      this.onReset();
    }
  };

  tick = () => {
    if (this.timeLeft > 0) {
      this.timeLeft = this.timeLeft - DELAY;
    } else {
      this.endCycle();
    }
    if (this.onTick) {
      this.onTick(this.timeLeft);
    }
  };

  endCycle = () => {
    this.timeLeft = 0;
    this.counter++;
    this.pause();
    if (this.onComplet) {
      this.onComplet(this.getCycleName());
    }
    this.reset();
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
    switch (this.counter % 8) {
      case 0:
      case 2:
      case 4:
      case 6:
        this.timeLeft = this.minutesToSecondes(this.cycles[0].length);
        return this.cycles[0];

      case 1:
      case 3:
      case 5:
        this.timeLeft = this.minutesToSecondes(this.cycles[1].length);
        return this.cycles[1];

      case 7:
        this.timeLeft = this.minutesToSecondes(this.cycles[2].length);
        return this.cycles[2];

      default:
        return 'OMG~BBQ';
    }
  };

  secondesToMinutes = value => {
    return `${Math.floor(value / 60)}:${value % 60 < 10 ? 0 : ''}${value % 60}`;
  };

  minutesToSecondes = value => {
    const minutes = value.split(':')[0];
    const secondes = value.split(':')[1];

    return parseFloat(minutes) * 60 + (secondes ? parseFloat(secondes) : 0);
  };
}
