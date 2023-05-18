// check for token in local storage
const token = localStorage.getItem("token");
if (!token) {
    // window.location.href = "/login";
}

const renderShipper = () => {
    // Get user from local storage
    const user = localStorage.getItem("user");
    console.log(JSON.parse(user));
};

const start = () => {
    // get user from local storage
    const user = localStorage.getItem("user");
    renderShipper();
    console.log(user);
};
start();
