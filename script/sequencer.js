let sequenceMode = 0;
let currentSequence = 0;

// ステップ長（16分音符）
function stepDuration() {
  return (60 / tempo) / 4;
}

// スケジュール
function scheduleStep(step, time) {
  patterns.forEach((pattern, seqIndex) => {
    if (pattern[0][step] > 0) {
      playSound(seqIndex, time, pattern[0][step], sounds[seqIndex][0].type);
    }
    if (pattern[1][step] > 0) {
      playSound(seqIndex, time, pattern[1][step], sounds[seqIndex][1].type);
    }
    if (pattern[2][step] > 0) {
      playSound(seqIndex, time, pattern[2][step], sounds[seqIndex][2].type);
    }
  });
  highlightStep(step);
}

// 次へ
function nextNote() {
  nextNoteTime += stepDuration();
  currentStep = (currentStep + 1) % steps;
}

function selectPattern() {
  if (currentStep === 0) {
    if (sequenceMode === 0) {

    } else if (sequenceMode === 1) {
      if (currentPatternList.length <= currentPattern) {
        currentPattern = 0;
      }
      loadPattern(0, currentPatternList[currentPattern]); 
      currentPattern++;
    } else if (sequenceMode === 2) {
      if (currentPatternList.length <= currentPattern) {
        currentPattern = 0;
      }
      loadPattern(1, currentPatternList[currentPattern]); 
      currentPattern++;
    } else if (sequenceMode === 3) {
      if (currentPatternList.length <= currentPattern) {
        currentPattern = 0;
      }
      loadPattern(currentSequence, currentPatternList[currentPattern]); 
      currentPattern++;
      currentSequence = currentSequence ^ 1;
    } else if (sequenceMode === 4) {
      loadPattern(0, currentPatternList[Math.floor(Math.random() * currentPatternList.length)]); 
    } else if (sequenceMode === 5) {
      loadPattern(1, currentPatternList[Math.floor(Math.random() * currentPatternList.length)]); 
    } else if (sequenceMode === 6) {
      loadPattern(currentSequence, currentPatternList[Math.floor(Math.random() * currentPatternList.length)]); 
      currentSequence = currentSequence ^ 1;
    }    
  }
}

// スケジューラ
function scheduler() {
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    selectPattern();
    scheduleStep(currentStep, nextNoteTime);
    nextNote();
  }
}

playBtn.addEventListener("pointerdown", async () => {
  if (!isRunning) {
    await initAudio();
    isRunning = true;
  }
  if (!isPlaying) {
    currentStep = 0;
    nextNoteTime = audioCtx.currentTime;
    timerID = setInterval(scheduler, lookahead);
  } else {
    clearInterval(timerID);
  }
  isPlaying = !isPlaying;
  playBtn.classList.toggle("playing", isPlaying);
  playBtn.textContent = isPlaying ? "Stop" : "Start";
});
