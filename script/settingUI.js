tempoBar.oninput = () => {
  tempo = parseInt(tempoBar.value);
  updateSlidbar(tempoBar);
  tempoSpan.textContent = tempo;
};
updateSlidbar(tempoBar);

const sequenceOptions = [
  "Fix",
  "Sequence1 in order", "Sequence2 in order",
  "alternate in order",
  "Sequence1 in random", "Sequence2 in random",
  "alternate in randowm"
];

sequenceOptions.forEach((mode, i) => {
  const label = document.createElement("label");
  const radio = document.createElement("input");
  const text = document.createElement("span");
  label.classList.add("radio-label");
  text.textContent = mode;
  text.classList.add("radio-span");
  radio.type = "radio";
  radio.name = "sequenceMode";
  radio.value = i;
  radio.addEventListener("change", () => {
    if (radio.checked) {
      sequenceMode = parseInt(radio.value);
    }
  });

  if (i === sequenceMode) radio.checked = true;

  label.appendChild(radio);
  label.appendChild(text);
  sequenceModes.appendChild(label);
});
