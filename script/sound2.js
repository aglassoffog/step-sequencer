function play303(dest, time, velocity) {
  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.value = 110;

  filter.type = "lowpass";
  filter.frequency.value = 800;
  filter.Q.value = 18;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(0.4 * velocity, time + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

  filter.frequency.setValueAtTime(200, time);
  filter.frequency.exponentialRampToValueAtTime(1200, time + 0.05);
  filter.frequency.exponentialRampToValueAtTime(200, time + 0.3);

  osc.connect(filter).connect(gain).connect(dest);

  osc.start(time);
  osc.stop(time + 0.3);
}


function playClap(dest, time, velocity) {
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const osc = audioCtx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = 200;

  const oscGain = audioCtx.createGain();
  oscGain.gain.value = 0.3;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 2000;
  bandpass.Q.value = 1.5;

//  const highpass = audioCtx.createBiquadFilter();
//  highpass.type = "highpass";
//  highpass.frequency.value = 1200;

  const shaper = audioCtx.createWaveShaper();
  shaper.curve = makeDistortionCurve(3);
  shaper.oversample = "4x";

  const gain = audioCtx.createGain();

  const times = [0, 0.008, 0.016, 0.024];
  // const times = [0, 0.012, 0.025, 0.04, 0.06];
  times.forEach(t => {
    gain.gain.setValueAtTime(0.0, time + t);
    gain.gain.linearRampToValueAtTime(1 * velocity, time + t + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.001, time + t + 0.03);
  });

  const pan = audioCtx.createStereoPanner();
  pan.pan.value = Math.random() * 0.6 - 0.3;

//  osc.connect(oscGain);
//  oscGain.connect(gain);
  noise.connect(bandpass);
  bandpass.connect(shaper);
//  highpass.connect(shaper);
  shaper.connect(gain);
  // bandpass.connect(gain);
  gain.connect(dest);
  // pan.connect(dest);

  noise.start(time);
  noise.stop(time + 0.3);

  osc.start(time);
  osc.stop(time + 0.05);
}
