// ステップ長（16分音符）
function stepDuration() {
  return (60 / tempo) / 4;
}

// スケジュール
function scheduleStep(step, time) {
  if (patterns[0][0][step]) playHihat(0, time);
  if (patterns[0][1][step]) playSnare(0, time);
  if (patterns[0][2][step]) playKick(0, time);
  if (patterns[1][0][step]) playHihat(1, time);
  if (patterns[1][1][step]) playSnare(1, time);
  if (patterns[1][2][step]) playKick(1, time);

  highlightStep(step);
}

// 次へ
function nextNote() {
  nextNoteTime += stepDuration();
  currentStep = (currentStep + 1) % steps;
}

// スケジューラ
function scheduler() {
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    // パターン選択
    scheduleStep(currentStep, nextNoteTime);
    nextNote();
  }
}

function start() {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  currentStep = 0;
  nextNoteTime = audioCtx.currentTime;
  timerID = setInterval(scheduler, lookahead);
}

function stop() {
  clearInterval(timerID);
}
