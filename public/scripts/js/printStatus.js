import { users } from "./userData.js";



window.handlePrint = handlePrint;


// Function to get the query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function handlePrint() {
  const printButton = document.getElementById("print-btn");

  printButton.style.display = "none"; // Hide the button

  window.print();

  printButton.style.display = "block"; // Show the button again
}



// Function to render user details
function renderUserInfo(userDetails) {
  if (!userDetails) {
    document.body.innerHTML = "<h2>User not found!</h2>";
    return;
  }

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
                      <tr>
                        <td>Бирдиктүү документтин мөөнөтү / <br> Validity of uniform permit:</td>
                        <td>${userDetails.uniformPermit}</td>
                      </tr>
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

  document.body.innerHTML = userInfoHtml;

}

// Get Reference Number from URL
const id = getQueryParam("id");

const currentUser = users.find(user => {
  return String(user.referenceNumber) === String(id); // Ensure both are strings
});

// Render User Details
renderUserInfo(currentUser ? currentUser.details : null);
