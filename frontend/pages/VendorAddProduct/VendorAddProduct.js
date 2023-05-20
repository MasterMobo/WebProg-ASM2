/* RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: Nguyen Trong Tien
  ID: s3978616 */

// check for token in local storage
const token = localStorage.getItem("token");
if (!token) {
  // window.location.href = "/login";
}

document
  .querySelector(".add-product-wrapper")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    //Log out entries
    console.log(Object.fromEntries(formData.entries()));
    const res = await fetch("http://localhost:3000/api/v1/vendor/product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();

    if (res.status == 201) {
      // Successfully added product
      // console.log("Successfully added product");
      alert("Successfully added product");
    }
    console.log(data);
  });
