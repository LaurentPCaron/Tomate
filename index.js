const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let _duration;
const timer = new Timer(durationInput, startBtn, pauseBtn, {
  onStart(duration) {
    _duration = duration;
  },
  onTick(timeLeft) {
    circle.setAttribute(
      'stroke-dashoffset',
      (perimeter * timeLeft) / _duration - perimeter
    );
  },
  onComplet() {
    console.log('Timer completed');
  },
});
