let audioCtx = null;
let isRunning = false;
let isPlaying = false;
let tempo = 120;
let steps = 16;
let currentStep = 0;
let nextNoteTime = 0;
let timerID;

const scheduleAheadTime = 0.1;
const lookahead = 25;

// パターン（3トラック）
let patterns = [[
    Array(16).fill(0),
    Array(16).fill(0),
    Array(16).fill(0)
  ],[
    Array(16).fill(0),
    Array(16).fill(0),
    Array(16).fill(0)
  ]];

initUI();
updatePatternList();
