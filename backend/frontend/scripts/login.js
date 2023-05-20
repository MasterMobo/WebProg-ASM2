const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
    });
});

toggle_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
    });
});

function moveSlider() {
    let index = this.dataset.value;

    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach((img) => img.classList.remove("show"));
    currentImage.classList.add("show");

    const textSlider = document.querySelector(".text-group");
    textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach((bull) => bull.classList.remove("active"));
    this.classList.add("active");
}

bullets.forEach((bullet) => {
    bullet.addEventListener("click", moveSlider);
});

async function showItem(answer) {
    if (answer.value == "customer") {
        document.getElementById("customer_name").classList.remove("hide");
        document.getElementById("customer_name").required = true;
        document.getElementById("customer_address").classList.remove("hide");
        document.getElementById("customer_address").required = true;
    } else {
        document.getElementById("customer_name").classList.add("hide");
        document.getElementById("customer_name").required = false;
        document.getElementById("customer_address").classList.add("hide");
        document.getElementById("customer_address").required = false;
        document.getElementById("agreement").classList.add("hide");
    }

    if (answer.value == "vendor") {
        document.getElementById("vendor_name").classList.remove("hide");
        document.getElementById("vendor_name").required = true;
        document.getElementById("vendor_address").classList.remove("hide");
        document.getElementById("vendor_address").required = true;
    } else {
        document.getElementById("vendor_name").classList.add("hide");
        document.getElementById("vendor_name").required = false;
        document.getElementById("vendor_address").classList.add("hide");
        document.getElementById("vendor_address").required = false;
        document.getElementById("agreement").classList.add("hide");
    }

    if (answer.value == "shipper") {
        document
            .getElementById("shipper_distribution")
            .classList.remove("hide");
        document.getElementById("agreement").classList.remove("hide");
        document.getElementById("shipper_distribution").required = true;
        await getHubs();
    } else {
        document.getElementById("shipper_distribution").classList.add("hide");
        document.getElementById("shipper_distribution").required = false;
    }
}

function openFilePicker() {
    var uploadInput = document.getElementById("uploadInput");
    uploadInput.click();
}

document.querySelector(".upload-btn").addEventListener("click", function (e) {
    e.preventDefault();
    openFilePicker();
});

// Example code to handle the selected file
document
    .getElementById("uploadInput")
    .addEventListener("change", function (event) {
        event.preventDefault(); // Prevent default form submission
        var file = event.target.files[0];
        let input_file = document.getElementById("uploadInput");
        let output_text = document.getElementById("custom_text");
        output_text.innerHTML = file.name;
    });

document
    .querySelector(".sign-up-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        //Log out entries
        console.log(Object.fromEntries(formData.entries()));
        const res = await fetch("http://localhost:3000/api/v1/auth/register", {
            method: "POST",
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            body: formData,
        });
        const data = await res.json();
        console.log(data);
        if (res.status >= 200 && res.status < 300) {
            window.location.href = "../pages/login.html";
            alert('Account created successfully');
        } else {
            // show error
            alert(data.message);
        }
    });

document
    .querySelector(".sign-in-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        //Log out entries

        const jsonObj = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(jsonObj);
        const res = await fetch("http://localhost:3000/api/v1/auth/login", {
            method:      "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonObj,
        });
        const data = await res.json();

        if (res.status >= 200 && res.status < 300) {
            // Store token in local storage
            localStorage.setItem("token", data.token);
            // store user in local storage
            localStorage.setItem("user", JSON.stringify(data.user));
        }
        console.log(data);

        if (res.status == 200) {
            // redirect to dashboard
            if (data.user.role == "customer") {
                window.location.href = "../pages/customerPage.html";
            }
            if (data.user.role == "vendor") {
                window.location.href = "../pages/VendorPage/vendor.html";
            }
            if (data.user.role == "shipper") {
                window.location.href = "../pages/ShipperPage/shipperPage.html";
            }
        } else {
            // show error
            alert(data.message);
        }
    });

const getHubs = async () => {
    const hubs = document.getElementById("distribution_hubs");
    const res = await fetch("http://localhost:3000/api/v1/hub", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    console.log(data);
    data.hubs.forEach((hub) => {
        const option = document.createElement("option");
        option.value = hub._id;
        option.innerHTML = `${hub.name} - ${hub.address}`;
        hubs.appendChild(option);
    });
};


