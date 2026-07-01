const display = document.getElementById("display");
const historyBox = document.getElementById("history");
const themeToggle = document.getElementById("themeToggle");

// BUTTON PRESS
document.querySelectorAll(".buttons button").forEach(btn => {
  btn.addEventListener("click", () => press(btn.textContent));
});

function press(value) {
  if (value === "pi") value = Math.PI;
  if (value === "e") value = Math.E;
  if (value === "C") return clearDisplay();
  if (value === "=") return calculate();

  display.value += value;
}

// CLEAR
function clearDisplay() {
  display.value = "";
}

// CALCULATE
function calculate() {
  let expression = display.value;

  try {
    expression = expression.replace(/sin/g, "Math.sin");
    expression = expression.replace(/cos/g, "Math.cos");
    expression = expression.replace(/tan/g, "Math.tan");
    expression = expression.replace(/log/g, "Math.log10");
    expression = expression.replace(/ln/g, "Math.log");
    expression = expression.replace(/sqrt/g, "Math.sqrt");
    expression = expression.replace(/\^/g, "**");

    const result = eval(expression);

    addHistory(expression, result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

// HISTORY
function addHistory(exp, result) {
  const item = document.createElement("div");
  item.textContent = `${exp} = ${result}`;
  historyBox.prepend(item);
}

// KEYBOARD SUPPORT
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/().".includes(key)) {
    press(key);
  }

  if (key === "Enter") calculate();
  if (key === "Backspace") display.value = display.value.slice(0, -1);
  if (key === "Escape") clearDisplay();
});

// DARK MODE
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
