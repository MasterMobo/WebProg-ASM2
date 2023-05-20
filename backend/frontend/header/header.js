const hamburger_menu = () => {
  let menu = document.querySelector("#menu-icon");
  let navbar = document.querySelector("#responsive_nav");
  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("close");
    navbar.classList.toggle("open");
  };
};

function logout() {
  document.querySelector("#logout").addEventListener("click", function () {
    localStorage.setItem("token", "");
    localStorage.removeItem("user");
});
  document.querySelector("#res-logout").addEventListener("click", function () {
    localStorage.setItem("token", "");
    localStorage.removeItem("user");
});
}

logout();



hamburger_menu();

function showMyAccount() {
    var token = localStorage.getItem('token'); // Access the token value from the response data

  if (token !== "") {
    document.getElementById("login").classList.add("close");
    document.getElementById("res-login").classList.add("close");
    document.getElementById("register").classList.add("close");
    document.getElementById("res-register").classList.add("close");
    document.getElementById("my-account").classList.remove("close");
    document.getElementById("res-my-account").classList.remove("close");
    document.getElementById("logout").classList.remove("close");
    document.getElementById("res-logout").classList.remove("close");
  }
}

showMyAccount();
