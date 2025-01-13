// Dummy user data
const users = [
  {
    referenceNumber: "ABCD1234",
    otp: "123456",
    pdf: "../../images/pdfs/abcd1234.pdf"
  },
  {
    referenceNumber: "EFGH5678",
    otp: "654321",
    pdf: "../../images/pdfs/abcd1234.pdf"
  },
];


let currentUser = null;

// Generate a 6-character random captcha
function generateCaptcha() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  generatedCaptcha = captcha;
  displayCaptcha();
}

// Display the captcha in the UI
function displayCaptcha() {
  const captchaElement = document.getElementById("captchaimg");
  if (captchaElement) {
    captchaElement.innerText = generatedCaptcha; // Display the captcha text
  } else {
    console.error("Captcha display element not found.");
  }
}

// Refresh the captcha
function refreshCaptcha() {
  generateCaptcha(); // Generate a new captcha
}

// Validate the captcha input
function validateCaptchaInput() {
  const userInput = document.getElementById("vpb_captcha_code").value.trim();
  if (userInput === "") {
    alert("Please enter the captcha code.");
    return false;
  }
  if (userInput === generatedCaptcha) {
    return true;
  } else {
    alert("Invalid captcha. Please try again.");
    refreshCaptcha(); // Refresh captcha if validation fails
    return false;
  }
}

// Handle "NEXT" button click
function handleReferenceSubmission() {
  const referenceNumber = document.getElementById("reference_numb").value.trim();

  // Validate reference number
  currentUser = users.find((user) => user.referenceNumber === referenceNumber);

  if (!currentUser) {
    alert("Invalid reference number. Please try again.");
    return;
  }

  // Check captcha validation
  if (!validateCaptchaInput()) return;

  // Show OTP section
  document.getElementById("reference-section").style.display = "none";
  document.getElementById("otp-section").style.display = "block";
}

// Handle "VALIDATE OTP" button click
function handleOtpValidation() {
  const otpInput = document.getElementById("otp_input").value.trim();

  if (otpInput === currentUser.otp) {
    alert("OTP validated successfully!");
    displayPdf();
  } else {
    alert("Invalid OTP. Please try again.");
  }
}

// Display PDF after successful OTP validation
function displayPdf() {
  if (!currentUser) {
    console.error("No user data available to display.");
    return;
  }

  // Hide OTP section and information box
  document.getElementById("otp-section").style.display = "none";
  const infoBox = document.querySelector(".informBox_5566");
  if (infoBox) {
    infoBox.style.display = "none";
  }

  // Display the PDF
  const userInfo = document.getElementById("user-info");
  userInfo.innerHTML = `
      <div style="position: relative; width: 100%; height: 500px;">
        <iframe 
          id="pdf_iframe" 
          src="${currentUser.pdf}" 
          style="width: 100%; height: 100%; border: 1px solid #ddd;" 
          frameborder="0">
        </iframe>
        <div style="position: absolute; top: 10px; right: 10px; display: flex; gap: 10px;">
          <button id="btn_print" class="btn_3256">Print</button>
          <a id="btn_download" class="btn_3256" href="${currentUser.pdf}" download>Download</a>
        </div>
      </div>
    `;
  userInfo.style.display = "block"; // Make it visible

  // Add print functionality
  document.getElementById("btn_print").addEventListener("click", () => {
    const iframe = document.getElementById("pdf_iframe");
    if (iframe) {
      iframe.contentWindow.focus(); // Focus the iframe window
      iframe.contentWindow.print(); // Print the visible part of the PDF
    }
  });
}

// Handle "SEND ME SECURITY CODE BY EMAIL" button click
function sendSecurityCodeByEmail() {
  // Show the modal notification
  showModal();
}

// Show the modal
function showModal() {
  const modal = document.getElementById("email-notification-modal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Modal element not found.");
  }
}

// Close the modal
function closeModal() {
  const modal = document.getElementById("email-notification-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Generate captcha on page load
  generateCaptcha();

  // Attach event listeners
  document.getElementById("btn_next").addEventListener("click", handleReferenceSubmission);
  document.getElementById("btn_validate_otp").addEventListener("click", handleOtpValidation);
  document.getElementById("btn_send_code").addEventListener("click", sendSecurityCodeByEmail);
  document.querySelector(".modal-dialog-close").addEventListener("click", closeModal);
  document.querySelector(".modal-dialog-ok").addEventListener("click", closeModal);
});

