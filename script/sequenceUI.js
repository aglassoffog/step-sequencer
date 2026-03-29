function initUI() {
  const container = document.getElementById("sequencer");

  patterns.forEach((pattern, trackIndex) => {
    const row = document.createElement("div");
    row.className = "row";

    pattern.forEach((step, stepIndex) => {
      const div = document.createElement("div");
      div.className = "step";
      div.onclick = () => {
        pattern[stepIndex] ^= 1;
        div.classList.toggle("active");
      };

      row.appendChild(div);
    });

    container.appendChild(row);
  });

  updateUI();
}

function highlightStep(step) {
  const rows = document.querySelectorAll(".row");

  rows.forEach(row => {
    [...row.children].forEach((cell, i) => {
      cell.classList.toggle("playing", i === step);
    });
  });
}

function updateUI() {
  const rows = document.querySelectorAll(".row");

  rows.forEach((row, trackIndex) => {
    [...row.children].forEach((cell, stepIndex) => {
      const isActive = patterns[trackIndex][stepIndex];
      cell.classList.toggle("active", isActive);
    });
  });
}
