// check for token in local storage
const token = localStorage.getItem("token");
if (!token) {
    // window.location.href = "/login";
}

const start = async () => {
    // get user from local storage
    const user = localStorage.getItem("user");
    console.log(user);
};
start();
