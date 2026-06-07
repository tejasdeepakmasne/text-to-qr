const generateButton = document.getElementById("qr-generate-button");
const clearButton = document.getElementById("clear-button");
const copyButton = document.getElementById("copy-button");
const textInput = document.getElementById("text-input-main");
const qrContainer = document.getElementById("qr-output");
const messageSpace = document.getElementById("message-space");

generateButton.addEventListener("click", function () {
  qrContainer.innerHTML = "";
  const extractedtext = textInput.value;
  console.log(extractedtext);
  const isValid = validateInput(extractedtext);
  console.log(isValid);
  if (isValid === true) {
    new QRCode(qrContainer, extractedtext);
    console.log("qr generated");
  } else {
    messageSpace.innerHTML =
      '<p color="red">Input is empty, please give input</p>';
  }
});

clearButton.addEventListener("click", function () {
  textInput.value = "";
  qrContainer.innerHTML = "";
  messageSpace.innerHTML = "";
  textInput.focus();
});

copyButton.addEventListener("click", () => {
  const qrImage = qrContainer.querySelector("img");
  if (qrImage && qrImage.src) {
    fetch(qrImage.src)
      .then((response) => response.blob())
      .then((blob) => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
        messageSpace.innerHTML = "<p>QR copied to clipboard</p>";
      });
  }
});

function validateInput(input) {
  if (input == "") return false;
  return true;
}
