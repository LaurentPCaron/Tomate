const timerTemplate = () => {
  return `
  <div class="controls">
  <p id="cycle_name">Travail</p>
  
  <input id="duration" type="text" value="25:00" />
  <p id="error_message">YOP</p>
 
  <div>
    <button id="start"><i class="fas fa-play"></i></button>
    <button id="pause"><i class="fas fa-pause"></i></button>
    <button id="skip"><i class="fas fa-step-forward"></i></button>
  </div>
</div>
<svg class="dial">
  <circle
    r="190"
    cx="200"
    cy="200"
    fill="transparent"
    stroke="orange"
    stroke-width="15"
    transform="rotate(-90 200 200)"
  ></circle>
</svg>

  `;
};

document.querySelector('.timer').innerHTML = timerTemplate();

const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const skipBtn = document.querySelector('#skip');
const cycleHeader = document.querySelector('#cycle_name');
const circle = document.querySelector('circle');
const errorMsg = document.querySelector('#error_message');

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
    durationInput.classList.remove('error');
    errorMsg.style.display = 'none';
    errorMsg.innerHTML = '';
    _duration = null;
    circle.setAttribute('stroke-dashoffset', 0);
  },

  onError(error) {
    durationInput.classList.add('error');
    errorMsg.style.display = 'inline-block';
    errorMsg.innerHTML = error;
  },
});
