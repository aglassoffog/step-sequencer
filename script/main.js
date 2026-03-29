let audioCtx = null;
audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let tempo = 120;
let steps = 16;
let currentStep = 0;
let nextNoteTime = 0;
let timerID;

const scheduleAheadTime = 0.1;
const lookahead = 25;

// パターン（3トラック）
let patterns = [
  Array(16).fill(0), // kick
  Array(16).fill(0), // snare
  Array(16).fill(0)  // hihat
];

// 初期パターン
for (let i=0;i<16;i++) patterns[0][i] = 1;
patterns[1][4] = patterns[1][12] = 1;
patterns[2][0] = patterns[2][4] = patterns[2][8] = patterns[2][12] = 1;

initUI();

// スタート
function start() {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  currentStep = 0;
  nextNoteTime = audioCtx.currentTime;
  timerID = setInterval(scheduler, lookahead);
}

// ストップ
function stop() {
  clearInterval(timerID);
}

function savePattern() {
  const data = {
    patterns: patterns,
    tempo: tempo
  };

  localStorage.setItem("sequencerPattern", JSON.stringify(data));
  localStorage.setItem("pattern_" + name, JSON.stringify(data));
  console.log("Saved!");
}

function loadPattern() {
  const data = localStorage.getItem("sequencerPattern");
  if (!data) return;

  const parsed = JSON.parse(data);

  patterns = parsed.patterns;
  tempo = parsed.tempo || 120;

  updateUI();
  console.log("Loaded!");
}

function clearPattern() {
  patterns.forEach(track => track.fill(0));
  updateUI();
}

function exportPattern() {
  const data = JSON.stringify({ patterns, tempo });
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "pattern.json";
  a.click();
}
