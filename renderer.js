const lengthValue = document.querySelector("#length-value");
const lengthInput = document.querySelector("#length-input");
const passwordArea = document.querySelector(".password-area");
const copyBtn = document.querySelector("#copy-btn");
const refreshBtn = document.querySelector("#refresh-btn");
const numbersLabel = document.querySelector("#numbers-label");
const symbolsLabel = document.querySelector("#symbols-label");

lengthInput.value = 20;
lengthValue.textContent = lengthInput.value;

let hasNumbers = false;
let hasSymbols = false;
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

const createPassword = (length = 8, hasNumbers = false, hasSymbols = false) => {
  let chars = letters;
  hasNumbers ? (chars += numbers) : "";
  hasSymbols ? (chars += symbols) : "";
  return generatePassword(length, chars);
};

const renderNewPassword = () => {
  passwordArea.textContent = createPassword(length, hasNumbers, hasSymbols);
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
