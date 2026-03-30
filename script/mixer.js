const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const masterGain = audioCtx.createGain();
masterGain.gain.value = 0.8;
masterGain.connect(audioCtx.destination);

const mixGains = [
  audioCtx.createGain(),
  audioCtx.createGain()
];

const seqGains = [
  audioCtx.createGain(),
  audioCtx.createGain()
];

mixGains.forEach(g => {
  g.gain.value = 0.5;
});

seqGains.forEach(g => {
  g.gain.value = 1.0;
});

seqGains[0].connect(mixGains[0]).connect(masterGain);
seqGains[1].connect(mixGains[1]).connect(masterGain);


function setVolume(seqIndex, value) {
  seqGains[seqIndex].gain.value = parseFloat(value);
}

function setBalance(value) {
  mixGains[0].gain.value = 1 - parseFloat(value);
  mixGains[1].gain.value = parseFloat(value);
}
