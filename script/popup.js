function openStepPopup(seqIndex, trackIndex, track, title) {
  stepPopup.classList.remove("hidden");
  popTitle.textContent = title;
  subTitle.innerHTML = "";
  stepSliders.innerHTML = "";

  const seqTitle = document.createElement("span");
  seqTitle.textContent = "Sequence" + (seqIndex+1);
  seqTitle.className = "seq" + (seqIndex+1);
  subTitle.appendChild(seqTitle);

  const trackTitle = document.createElement("span");
  trackTitle.textContent = " Track " + (trackIndex+1);
  trackTitle.className = "seq" + (seqIndex+1);
  subTitle.appendChild(trackTitle);

  track.forEach((step, stepIndex) => {
    const input = document.createElement("input");
    input.type = "range";
    input.min = 0;
    input.max = 1;
    input.step = 0.01;
    input.value = step;

    if ((stepIndex + 1) % 4 === 0) {
      input.classList.add("group-end");
    }

    input.addEventListener("input", () => {
      updateSlidbar(input);
      track[stepIndex] = parseFloat(input.value);
      updateUI(seqIndex);
    });

    updateSlidbar(input);
    stepSliders.appendChild(input);
  });
}

stepPopup.addEventListener("pointerdown", e => {
  if (e.target === stepPopup) {
    stepPopup.classList.add("hidden");
  }
});

function openVelocity(seqIndex, trackIndex) {
  openStepPopup(seqIndex, trackIndex, patterns[seqIndex][trackIndex], "Velocity");
}

function openPitch(seqIndex, trackIndex) {
  openStepPopup(seqIndex, trackIndex, pitches[seqIndex][trackIndex], "Pitch");
}
