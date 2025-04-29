import { users } from "./userData.js";


let currentUser = null; // Preselect the first user for simplicity

window.handlePrint = handlePrint;


// let captcha = "";

// // Generate a 6-character random captcha
// function generateCaptcha() {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   captcha = ""; // Reset captcha
//   for (let i = 0; i < 6; i++) {
//     captcha += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   displayCaptcha();
// }

// // Display the captcha in the UI
// function displayCaptcha() {
//   const captchaElement = document.getElementById("captchaimg");
//   if (captchaElement) {
//     captchaElement.innerText = captcha; // Display the generated captcha
//   } else {
//     console.error("Captcha element not found in the DOM.");
//   }
// }

// // Refresh the captcha
// function refreshCaptcha() {
//   // refresh the captcha and generate a new one id="refreshCaptcha"
//   document.getElementById("refreshIcon").value = ""; // Clear the captcha input

//   generateCaptcha();

// }

// // Validate the captcha input
// function validateCaptchaInput() {
//   const userInput = document.getElementById("vpb_captcha_code").value.trim();
//   if (userInput === captcha) {
//     return true;
//   } else {
//     alert("Invalid captcha. Please try again.");
//     refreshCaptcha(); // Generate a new captcha if validation fails
//     document.getElementById("vpb_captcha_code").value = ""; // Clear the captcha input
//     return false;
//   }
// }


// Handle "NEXT" button click
function handleReferenceSubmission() {
  const referenceNumber = document.getElementById("reference_numb").value.trim();
  currentUser = users.find((user) => user.referenceNumber === referenceNumber);

  if (!currentUser) {
    alert("Invalid reference number. Please try again.");
    return;
  }

  // if (!validateCaptchaInput()) {
  //   return;
  // }

  if (currentUser && currentUser.details) {
    renderUserInfo(currentUser.details);
  } else {
    alert("User Not Found. Please try again.");
  }

  document.getElementById("reference-section").style.display = "none";
  // document.getElementById("otp-section").style.display = "block";
}


// Generate unique URL for a user
function generateUserUrl(referenceNumber) {
  return `https://evisa.e-gev-kg.cc/printStatus.html?id=${referenceNumber}`
}
// Get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// generate qr code




// Function to validate OTP and render user details
// function handleOtpValidation() {
//   const otpInput = document.getElementById("otp_input").value.trim();

//   if (currentUser && otpInput === currentUser.otp) {
//     renderUserInfo(currentUser.details);
//   } else {
//     alert("Invalid OTP. Please try again.");
//   }
// }

// Function to handle print button click
function handlePrint() {
  const printButton = document.getElementById("print-btn");

  printButton.style.display = "none"; // Hide the button

  window.print();

  printButton.style.display = "block"; // Show the button again
}


// Function to render user information
function renderUserInfo(userDetails) {
  // Clear the page and set the background to white

  document.body.innerHTML = ""; // Clear the entire page content
  document.body.style.backgroundColor = "#ffffff"; // Set white background
  document.body.style.backgroundImage = "none"; // Remove any background image
  document.body.style.padding = "0";
  document.body.style.margin = "0";


  function generateQRCode(containerId, referenceNumber) {
    const qrContainer = document.getElementById(containerId);
    if (qrContainer) {
      qrContainer.innerHTML = ""; // Clear previous QR code
      new QRCode(qrContainer, {
        text: `https://evisa.e-gev-kg.cc/printStatus.html?id=${referenceNumber}`,
        width: 100,
        height: 100,
      });
    }
  }

  // Add user details inside a container
const userInfoHtml = `

  <style>
  /* Hide the dynamic URL by default */
  .print-url {
    display: none;
  }
  /* Hide the print button during printing */
  @media print {
    #print-btn {
      display: block !important; /* Ensure it is hidden during printing */
    }
  }
  /* Additional rule for smaller screens */
  @media print and (max-width: 600px) {
    #print-btn {
      display: block !important; /* Ensure it is hidden on mobile */
    }

   /* Show the dynamic URL on mobile */
  .print-url {
      display: none;
    }
  }
</style>
    <div class="mainDiv" style="
      max-width: 900px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      font-size: 16px;
      line-height: 1.6;
      font-family: 'Source Serif Variable', serif;
    ">
     
      
         <center>
        <table width="800" cellspacing="2" style="border-bottom: 2px solid black; ">
          <tr>
              <td align="left" valign="top">
                  <img src='/images/img/mainLogo.png'  width="90" />
              </td>
              <td align="left" valign="top" style="line-height:22px;font-size:17px;">
                  <b>
                      <p align="center">КЫРГЫЗ РЕСПУБЛИКАСЫНЫН ТЫШКЫ ИШТЕР МИНИСТРЛИГИ</p>
                      <p align="center">MINISTRY OF FOREIGN AFFAIRS OF THE KYRGYZ REPUBLIC</p>
                      <p align="center">Электрондук виза – «E-visa»</p>
                  </b>
              </td>
          </tr>
        </table>
        <br>
        <table width="800"  cellspacing="1"  style="border-collapse: separate; style= "border-spacing: 10px">
          <tr>
              <td>
                  <!-- Dynamic User Photo -->
                  <img src='${userDetails.userPhoto}' width="120" height="145"  alt="User Photo" />
              </td>
              <td align="right">
                  Арыздын номери/Reference number C_${userDetails.visaNumber}<br>
                  <div id="qr-info" style="display: inline-block; margin: 10px 0px;">
                      <!-- QR code will be generated here -->

                  </div>
              </td>
          </tr>
          <tr>
               <table width="800" cellspacing="1" style="border-collapse: separate; padding: 10px 0">
                  <colgroup>
                    <col style="width: 65%;"> <!-- First column (label) is larger -->
                    <col style="width: 35%;"> <!-- Second column (value) is smaller -->
                  </colgroup>

                      <tr>
                        <td>Толук аты-жөнү/Full name:</td>
                        <td>${userDetails.fullName}</td>
                      </tr>
                      <tr>
                        <td>Туулган датасы/Date of birth:</td>
                        <td>${userDetails.dob}</td>
                      </tr>
                      <tr>
                        <td>Жарандыгы/Citizenship:</td>
                        <td>${userDetails.citizenship}</td>
                      </tr>
                      <tr>
                        <td>Жол жүрүүчү документтин (паспорттун) номери /<br> Number of Travel document (passport):</td>
                        <td>${userDetails.passportNumber}</td>
                      </tr>
                      <tr>
                        <td>Жол жүрүүчү документтин түрү/Type of travel document:</td>
                        <td>${userDetails.passportType}</td>
                      </tr>
                      <tr>
                        <td>Жол жүрүүчү документтин (паспорттун) берилген датасы/ <br> DATE of issue of the travelling document (passport):</td>
                        <td>${userDetails.issueDate}</td>
                      </tr>
                      <tr>
                        <td>Жол жүрүүчү документтин (паспорттун) бүткөн датасы/<br> Date of expiry of the travelling document (passport):</td>
                        <td>${userDetails.expiryDate}</td>
                      </tr>
                      let tableRow;
                      if (userDetails.rightToStudy) {
                        tableRow = `<tr>
                                      <td>Иштөөгө уруксут/The right to study:</td>
                                      <td>${userDetails.rightToStudy}</td>
                                    </tr>`;
                      } else {
                        tableRow = `<tr>
                                      <td>Иштөөгө уруксут/The right to work:</td>
                                      <td>${userDetails.rightToWork}</td>
                                    </tr>`;
                      }
                      <tr>
                        <td>Визанын түрү/Type of visa:</td>
                        <td>${userDetails.visaType}</td>
                      </tr>
                      <tr>
                        <td>Визанын колдонулуу мөөнөтү/Validity of visa:</td>
                        <td>${userDetails.validity}</td>
                      </tr>
                      <tr>
                        <td>Кирүүлөрдүн саны/Number of entries:</td>
                        <td>${userDetails.entries}</td>
                      </tr>
                      <tr>
                        <td>Жүрүү мөөнөтү/Period of stay(days):</td>
                        <td>${userDetails.periodOfStay}</td>
                      </tr>
                      <tr>
                        <td>Чакыруучу тарап/Invitation party:</td>
                        <td>${userDetails.invitation}</td>
                      </tr>
                      <tr>
                        <td>Чакыруу тараптын жеке салык номери/ <br> Inviting party's individual taxpayer number:</td>
                        <td>${userDetails.invitingPartyTIN}</td>
                      </tr>
                        if(userDetails.rightToStudy){
                          <tr>
                              <td>Иштөөгө уруксут/The right to study:</td>
                              <td>${userDetails.rightToStudy}</td>
                          </tr>
                        }else {
                           <tr>
                              <td>Иштөөгө уруксут/The right to work:</td>
                              <td>${userDetails.rightToWork}</td>
                          </tr>
                      }
                      <tr>
                        <td>Берилген датасы/Date of issue:</td>
                        <td>${userDetails.dateOfIssue}</td>
                      </tr>
                      <tr>
                        <td align="center" colspan="2">
                          <br>
                          <b>
                            Validity period of a visa is generally longer than period of stay. The validity period establishes the first and last dates during which the visa can be used. Period of stay indicates the length of time you have permission to remain in Kyrgyzstan within the validity period of the visa.
                          </b>
                        </td>
                      </tr>
          </table>

          </tr>
        </table>
      
      </center>
          
    </div>
  `;

  document.body.innerHTML = userInfoHtml += tableRow;


  // Generate the QR code
  generateQRCode("qr-info", userDetails.visaNumber);


}

// Handle "SEND ME SECURITY CODE BY EMAIL" button click
function sendSecurityCodeByEmail() {
  showModal();
}

// Show the modal
function showModal() {
  const modal = document.getElementById("email-notification-modal");
  if (modal) {
    modal.style.display = "block";
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

  // generateCaptcha();

  // Attach event listeners for "NEXT" button
  const nextButton = document.getElementById("btn_next");
  if (nextButton) {
    nextButton.addEventListener("click", handleReferenceSubmission);
  } else {
    console.error("NEXT button (btn_next) not found in the DOM.");
  }

  // // Attach event listeners for "VALIDATE OTP" button
  // const validateOtpButton = document.getElementById("btn_validate_otp");
  // if (validateOtpButton) {
  //   validateOtpButton.addEventListener("click", handleOtpValidation);
  // } else {
  //   console.error("VALIDATE OTP button (btn_validate_otp) not found in the DOM.");
  // }


  const refNo = getQueryParam("refNo");
  // Find the user by RefNo
  const currentUser = users.find((user) => user.referenceNumber === refNo);
  renderUserInfo(currentUser.details);
  console.log(currentUser, currentUser.details);



  // Attach event listeners
  document.getElementById("btn_next").addEventListener("click", handleReferenceSubmission);
  // document.getElementById("btn_validate_otp").addEventListener("click", handleOtpValidation);
  document.getElementById("btn_send_code").addEventListener("click", sendSecurityCodeByEmail);
  document.querySelector(".modal-dialog-close").addEventListener("click", closeModal);
  document.querySelector(".modal-dialog-ok").addEventListener("click", closeModal);

});
