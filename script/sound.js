function loadSound(seqIndex, trackIndex, typeIndex) {
  const rows = document.querySelectorAll(".row"+seqIndex);

  rows.forEach((row, i) => {
    if (i === trackIndex) {
      const span = row.querySelector(":scope > span");
      span.textContent = soundNames[typeIndex];
    }
  });

  sounds[seqIndex][trackIndex].type = typeIndex;
}

function playSound(seqIndex, time, velocity, typeIndex) {

  if (typeIndex === 0) {
    playHihat(seqIndex, time, velocity);
  } else if (typeIndex === 1) {
    playSnare(seqIndex, time, velocity);
  } else if (typeIndex === 2) {
    playKick(seqIndex, time, velocity);
  }

}




