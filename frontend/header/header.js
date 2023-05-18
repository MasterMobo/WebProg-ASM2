const hamburger_menu = () => {
  let menu = document.querySelector("#menu-icon");
  let navbar = document.querySelector("#responsive_nav");
  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navbar.classList.toggle("close");
    navbar.classList.toggle("open");
  };
};

function redirectFunction() {
  location.href("https://www.tutorialspoint.com/index.htm");
}

document.querySelector(".btn-log").addEventListener("click", redirectFunction);

hamburger_menu();
