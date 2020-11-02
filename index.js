const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const skipBtn = document.querySelector('#skip');
const cycleHeader = document.querySelector('#cycle_name');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let _duration;
const timer = new Timer(durationInput, startBtn, pauseBtn, skipBtn, {
  onStart(duration) {
    if (!_duration) {
      _duration = duration;
    }
  },
  onTick(timeLeft) {
    document.title = `${cycleHeader.textContent}  --  ${durationInput.value}`;
    circle.setAttribute(
      'stroke-dashoffset',
      (perimeter * timeLeft) / _duration - perimeter
    );
  },
  onComplet(cycle) {
    new Audio('./sound/checkpoint.mp3').play();
    switch (cycle.index) {
      case 0:
        circle.setAttribute('stroke', 'orange');
        break;

      default:
        circle.setAttribute('stroke', 'green');
        break;
    }
    cycleHeader.innerHTML = cycle.name;
  },
  onReset() {
    _duration = null;
    circle.setAttribute('stroke-dashoffset', 0);
  },
});
