import { users } from "./userData.js";

// Get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to render user details
function renderUserInfo(userDetails) {
  const userDetailsContainer = document.getElementById("user-details");

  if (!userDetails) {
    userDetailsContainer.innerHTML = "<h2 class='user-not-found'>User not found!</h2>";
    return;
  }

  const userInfoHtml = `
    <table>
      <tr><td><strong>Full Name:</strong></td><td>${userDetails.fullName}</td></tr>
      <tr><td><strong>Date of Birth:</strong></td><td>${userDetails.dob}</td></tr>
      <tr><td><strong>Citizenship:</strong></td><td>${userDetails.citizenship}</td></tr>
      <tr><td><strong>Passport Number:</strong></td><td>${userDetails.passportNumber}</td></tr>
      <tr><td><strong>Type of Passport:</strong></td><td>${userDetails.passportType}</td></tr>
      <tr><td><strong>Issue Date:</strong></td><td>${userDetails.issueDate}</td></tr>
      <tr><td><strong>Expiry Date:</strong></td><td>${userDetails.expiryDate}</td></tr>
      <tr><td><strong>Visa Type:</strong></td><td>${userDetails.visaType}</td></tr>
      <tr><td><strong>Validity of Visa:</strong></td><td>${userDetails.validity}</td></tr>
      <tr><td><strong>Number of Entries:</strong></td><td>${userDetails.entries}</td></tr>
      <tr><td><strong>Period of Stay:</strong></td><td>${userDetails.periodOfStay} days</td></tr>
      <tr><td><strong>Invitation Party:</strong></td><td>${userDetails.invitation}</td></tr>
      <tr><td><strong>Date of Issue:</strong></td><td>${userDetails.dateOfIssue}</td></tr>
    </table>
  `;

  userDetailsContainer.innerHTML = userInfoHtml;
}

// Get Reference Number from URL
const refNo = getQueryParam("refNo");

// Find the user by RefNo
const currentUser = users.find((user) => user.referenceNumber === refNo);

// Render User Details
renderUserInfo(currentUser ? currentUser.details : null);
