window.onload = function() {
  /*
  const input = document.getElementById('input');
  const btn = document.getElementById('btn');
  */

  let emojisBars = [];
  for (let i = 1; i <= 20; i++) {
    const emojis = document.getElementById(i).children;
    const asArray = Array.prototype.slice.call(emojis);
    emojisBars.push(asArray)
  }

  // btn.addEventListener('click', start);

  let audio;
  let audioCtx;
  let source;
  let analyser;
  let array;

  function setupAnalyzer() {
    audio = new Audio();

    audio.crossOrigin = 'anonymous';
    audio.loop = true;
    audio.autoplay = true;
    audio.src = 'pegboard.mp3';
    audio.play();

    audiotCtx = new (window.AudioContext || window.webkitAudioContext)();
    source = audiotCtx.createMediaElementSource(audio);
    analyser = audiotCtx.createAnalyser();
    array = new Uint8Array(analyser.frequencyBinCount);

    source.connect(analyser);
    analyser.connect(audiotCtx.destination);
  }

  function render() {
    analyser.getByteFrequencyData(array);
    clear();
    emojisBars.forEach((emojis, i) => {
      const showingEmojis = emojis.length - Math.ceil(array[i] / emojis.length);
      for (let i = emojis.length - 1; i >= showingEmojis; i--)
        emojis[i].style.opacity = 1;
    });
    requestAnimationFrame(render);
  }

  function clear() {
    emojisBars.forEach(emojis => emojis.forEach(e => e.style.opacity = 0));
  }

  function start() {
    setupAnalyzer();
    requestAnimationFrame(render);
  }

  start();
}
