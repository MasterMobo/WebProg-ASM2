/* RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: Ly Minh Phuc
  ID: s3976250 */

// check for token in local storage
const token = localStorage.getItem("token");
if (!token) {
  // window.location.href = "/login";
}

const start = async () => {
  const profile = document.querySelector(".profile-content");
  const res = await fetch("http://localhost:3000/api/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data);
  const {
    username,
    role,
    name,
    address,
    profilePicURL,
    businessName,
    businessAddress,
    distributionHubId,
  } = data.user;

  if (distributionHubId) {
    const hubRes = await fetch(
      `http://localhost:3000/api/v1/hub/${distributionHubId}`
    );
    var hub = (await hubRes.json()).hub;
  }

  profile.innerHTML = `
    <div class="profile-picture-and-name">
    <div id="profile-picture">
    <img src="${profilePicURL}" alt="profile picture">
    </div>
    <h2>${username}</h2>
    <p>${role}</p>
</div>
<div class="profile-information">
    ${name ? `<p>Name: ${name}</p>` : ""}
    ${address ? `<p>Address: ${address}</p>` : ""}
    ${businessName ? `<p>Business Name: ${businessName}</p>` : ""}
    ${businessAddress ? `<p>Business Address: ${businessAddress}</p>` : ""}
    ${
      distributionHubId
        ? `<p>Distribution Hub: ${hub.name}</p>
    <p>Distribution Hub Address: ${hub.address}</p>`
        : ""
    }
    <a class="logout" href="">Log out</a>
</div>`;
};
start();
