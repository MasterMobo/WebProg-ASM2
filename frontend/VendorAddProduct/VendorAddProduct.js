// check for token in local storage
const token = localStorage.getItem("token");
if (!token) {
    // window.location.href = "/login";
}

document
    .querySelector(".add-product-wrapper")
    .addEventListener("submit", async function (e) {
        alert("Successfully added product");
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
        }
        console.log(data);
    });
