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

function showItem(answer) {
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
    } else {
        document.getElementById("shipper_distribution").classList.add("hide");
        document.getElementById("shipper_distribution").required = false;
    }
}

function openFilePicker() {
    var uploadInput = document.getElementById("uploadInput");
    uploadInput.click();
}

// Example code to handle the selected file
document
    .getElementById("uploadInput")
    .addEventListener("change", function (event) {
        var file = event.target.files[0];
        let input_file = document.getElementById("uploadInput");
        let output_text = document.getElementById("custom_text");
        // Do something with the selected file
        console.log(file.name);
        output_text.innerHTML = file.name;
    });

document
    .querySelector(".sign-up-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        // const res = await fetch("localhost:3000/api/v1/register", {
        // });
    });

// document.querySelector(".sign-btn").addEventListener("click", function () {
//     console.log("clicked");
//     const signUpForm = document.querySelector(".sign-up-form");

//     const formData = new FormData(signUpForm);
//     console.log(formData);
// });
