import { users } from "./userData.js";

// Get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to render user details
function renderUserInfo(userDetails) {
  if (!userDetails) {
    document.body.innerHTML = "<h2>User not found!</h2>";
    return;
  }

  const userInfoHtml = `
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
        <table width="800" cellspacing="2" style="border-bottom: 2px solid black;">
          <tr>
            <td align="left">
              <img src='/images/img/mainLogo.png' width="90" />
            </td>
            <td align="center" style="font-size: 17px;">
              <b>
                <p>КЫРГЫЗ РЕСПУБЛИКАСЫНЫН ТЫШКЫ ИШТЕР МИНИСТРЛИГИ</p>
                <p>MINISTRY OF FOREIGN AFFAIRS OF THE KYRGYZ REPUBLIC</p>
                <p>Электрондук виза – «E-visa»</p>
              </b>
            </td>
          </tr>
        </table>
        <br>
        <table width="800" cellspacing="1">
          <tr>
            <td>
              <img src="${userDetails.userPhoto}" width="120" height="145" alt="User Photo" />
            </td>
            <td align="right">
              <b>Reference Number:</b> C_${userDetails.visaNumber}<br>
              <div id="qr-info" style="margin-top: 10px;"></div>
            </td>
          </tr>
        </table>
        <br>
        <table width="800" cellspacing="1">
          <tr><td>Full Name:</td><td>${userDetails.fullName}</td></tr>
          <tr><td>Date of Birth:</td><td>${userDetails.dob}</td></tr>
          <tr><td>Citizenship:</td><td>${userDetails.citizenship}</td></tr>
          <tr><td>Passport Number:</td><td>${userDetails.passportNumber}</td></tr>
          <tr><td>Type of Passport:</td><td>${userDetails.passportType}</td></tr>
          <tr><td>Issue Date:</td><td>${userDetails.issueDate}</td></tr>
          <tr><td>Expiry Date:</td><td>${userDetails.expiryDate}</td></tr>
          <tr><td>Visa Type:</td><td>${userDetails.visaType}</td></tr>
          <tr><td>Validity of Visa:</td><td>${userDetails.validity}</td></tr>
          <tr><td>Number of Entries:</td><td>${userDetails.entries}</td></tr>
          <tr><td>Period of Stay:</td><td>${userDetails.periodOfStay} days</td></tr>
          <tr><td>Invitation Party:</td><td>${userDetails.invitation}</td></tr>
          <tr><td>Date of Issue:</td><td>${userDetails.dateOfIssue}</td></tr>
        </table>
      </center>
    </div>
  `;

  document.body.innerHTML = userInfoHtml;
}

// Get Reference Number from URL
const refNo = getQueryParam("refNo");

// Find the user by RefNo
const currentUser = users.find((user) => user.referenceNumber === refNo);

// Render User Details
renderUserInfo(currentUser ? currentUser.details : null);
