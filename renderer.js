const lengthValue = document.querySelector("#length-value");
const lengthInput = document.querySelector("#length-input");
const passwordArea = document.querySelector(".password-area");
const copyBtn = document.querySelector("#copy-btn");
const refreshBtn = document.querySelector("#refresh-btn");
const numbersLabel = document.querySelector("#numbers-label");
const symbolsLabel = document.querySelector("#symbols-label");
const checkLineIcon = document.querySelector(".check-line-icon");

lengthInput.value = 20;
lengthValue.textContent = lengthInput.value;

const clipboard = new ClipboardJS(copyBtn);

clipboard.on("success", function (e) {
  copyBtn.classList.add("active");
  e.clearSelection();

  setTimeout(() => {
    copyBtn.classList.remove("active");
  }, 1500);
});

let hasNumbers = true;
let hasSymbols = true;
let length = lengthInput.value;

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-+=";

const generatePassword = (length = 8, chars) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const createPassword = (length = 8, hasNumbers = true, hasSymbols = true) => {
  let chars = letters;
  hasNumbers ? (chars += numbers) : "";
  hasSymbols ? (chars += symbols) : "";
  return generatePassword(length, chars);
};

const renderNewPassword = () => {
  passwordArea.textContent = "";
  const newPassword = createPassword(length, hasNumbers, hasSymbols);
  const arrayOfPasswrod = [...newPassword];

  arrayOfPasswrod.forEach((item) => {
    if (/[0-9]/.test(item)) {
      passwordArea.insertAdjacentHTML(
        "beforeend",
        `<span class="password-area__numbers">${item}</span>`
      );
    } else if (/\W/.test(item)) {
      passwordArea.insertAdjacentHTML(
        "beforeend",
        `<span class="password-area__symbols">${item}</span>`
      );
    } else {
      passwordArea.insertAdjacentHTML("beforeend", `<span>${item}</span>`);
    }
  });
};

lengthInput.addEventListener("input", (e) => {
  lengthValue.textContent = e.target.value;
  length = lengthInput.value;
  renderNewPassword();
});

refreshBtn.addEventListener("click", () => {
  renderNewPassword();
});

numbersLabel.addEventListener("click", (e) => {
  if (e.target.checked) {
    hasNumbers = true;
  } else {
    hasNumbers = false;
  }

  renderNewPassword();
});

symbolsLabel.addEventListener("click", (e) => {
  if (e.target.checked) {
    hasSymbols = true;
  } else {
    hasSymbols = false;
  }

  renderNewPassword();
});

renderNewPassword();
