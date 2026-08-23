let actx = null;

function blip(freq = 520, dur = 0.06, type = "square") {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = actx.createOscillator();
    const gain = actx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = freq;
    gain.gain.value = 0.05;

    oscillator.connect(gain);
    gain.connect(actx.destination);

    oscillator.start();
    oscillator.stop(actx.currentTime + dur);
  } catch (error) {
    // Audio is optional. The portfolio still works if the browser blocks it.
  }
}
