function openPitch(seqIndex, trackIndex) {
  const popup = document.getElementById("stepPopup");
  const subTitle = document.getElementById("subTitle");
  const sliders = document.getElementById("stepSliders");
  const control = document.getElementById("stepControl");

  popup.classList.remove("hidden");
  subTitle.innerHTML = "";
  sliders.innerHTML = "";
  control.innerHTML = "";

  const popTitle = document.getElementById("popTitle");
  popTitle.textContent = "Pitch";

  const seqTitle = document.createElement("span");
  seqTitle.textContent = "Sequence" + (seqIndex+1);
  seqTitle.className = "seq" + (seqIndex+1);
  subTitle.appendChild(seqTitle);

  const trackTitle = document.getElementById("trackTitle");
  trackTitle.textContent = " Track " + (trackIndex+1);
  trackTitle.className = "seq" + (seqIndex+1);

  pitches[seqIndex][trackIndex].forEach((step, stepIndex) => {
    const input = document.createElement("input");
    input.type = "range";
    input.min = 0;
    input.max = 1;
    input.step = 0.01;
    input.value = step;

    if ((stepIndex + 1) % 4 === 0) {
      input.classList.add("group-end");
    }

    input.oninput = () => {
      pitches[seqIndex][trackIndex][stepIndex] = parseFloat(input.value);
    };

    sliders.appendChild(input);
  });
}
