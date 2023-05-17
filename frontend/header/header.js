const hamburger_menu = () => {
    let menu = document.querySelector("#menu-icon");
        let navbar = document.querySelector("#responsive_nav");
        menu.onclick = () =>{
            menu.classList.toggle("bx-x");
            navbar.classList.toggle("close");
            navbar.classList.toggle("open");
        }
}

hamburger_menu()
