
function savePattern() {
  const name = document.getElementById("patternName").value.trim();
  if (!name) return alert("名前を入れて");

  const data = {
    patterns,
    tempo
  };

  console.log(data.patterns);

  localStorage.setItem("pattern_" + name, JSON.stringify(data));

  updatePatternList();
}

function updatePatternList() {
  const list = document.getElementById("patternList");
  list.innerHTML = "";

  Object.keys(localStorage).forEach(key => {
    if (!key.startsWith("pattern_")) return;

    const name = key.replace("pattern_", "");

    const li = document.createElement("li");

    // ロードボタン
    const loadBtn = document.createElement("button");
    loadBtn.textContent = "Load";
    loadBtn.onclick = () => loadPattern(name);

    // 削除ボタン
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
      localStorage.removeItem(key);
      updatePatternList();
    };

    li.textContent = name + " ";
    li.appendChild(loadBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function loadPattern(name) {
  const data = localStorage.getItem("pattern_" + name);
  if (!data) return;

  const parsed = JSON.parse(data);

  patterns = parsed.patterns;
  tempo = parsed.tempo || 120;

  updateUI();
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
