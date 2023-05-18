// check for token in local storage
const token = localStorage.getItem("token");
if (!token) {
    // window.location.href = "/login";
}

const renderShipper = async () => {
    // Get user from local storage
    const user = localStorage.getItem("user");
    const shipper = JSON.parse(user);
    console.log(shipper);
    const distributionHub = await fetch(
        `http://localhost:3000/api/v1/hub/${shipper.distributionHubId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const hub = await distributionHub.json();
    const shipperContainer = document.querySelector(".profile");
    shipperContainer.innerHTML = "";
    const shipperPhoto = document.createElement("div");
    shipperPhoto.classList.add("profile-image");
    shipperPhoto.innerHTML = `
    <div class="profile-img-wrapper">
        <img src="${shipper.profilePicURL}" alt="${shipper.username} photo" />
    </div>
    <div class="star-wrapper">
        <a href="#" class="fas fa-star s1"></a>
        <a href="#" class="fas fa-star s2"></a>
        <a href="#" class="fas fa-star s3"></a>
        <a href="#" class="fas fa-star s4"></a>
        <a href="#" class="fas fa-star s5"></a>
    </div>
    <script src="https://kit.fontawesome.com/5ea815c1d0.js"></script>
    </div>
    `;
    const shipperInfo = document.createElement("div");
    shipperInfo.classList.add("profile-info");
    shipperInfo.innerHTML = `
    <h1>${shipper.username}</h1>
    <div class="contact-info">
        <p><i>Contact Info</i></p>
        <h3>Distribution Hub: ${hub.name} - ${hub.address}</h3>
    </div>
    `;
    shipperContainer.appendChild(shipperPhoto);
    shipperContainer.appendChild(shipperInfo);
};

const getHubOrders = async (hubId) => {
    const res = await fetch(`http://localhost:3000/api/v1/order/hub/${hubId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.orders;
};

const start = async () => {
    // get user from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    renderShipper();
    const orders = await getHubOrders(user.distributionHubId);
    console.log(orders);
    renderOrders(orders);
};
start();

const renderOrders = (orders) => {
    const cardsContainer = document.querySelector(".carousel-inner");
    const PRODUCT_LIMIT = 6;

    const showOders = orders.slice(0, PRODUCT_LIMIT);

    showOders.forEach((order) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `                  
        <div class="card">
    <div class="img-wrapper">
        <img
            src="${order.products[0].imageURL}"
            class="d-block w-100"
            alt="..."
        />
    </div>
    <div class="card-body">
        <h5 class="card-title">${order.products[0].name}</h5>
        <p>Delivery Hub: ${order.distributionHubName}</p>
        <p>Customer Name: ${order.customerName}</p>
        <form
            class="order-form"
            id="${order._id}"
        >
            <p>Order Status:</p>
             
            <input
                type="radio"
                id="active"
                name="status"
                value="active"
                ${order.status === "active" ? "checked" : ""}
            />
              <label for="html">Active</label><br />
             
            <input
                type="radio"
                id="delivered"
                name="status"
                value="delivered"
                ${order.status === "delivered" ? "checked" : ""}
            />
              <label for="css">Delivered</label><br />
             
            <input
                type="radio"
                id="cancelled"
                name="status"
                value="cancelled"
                ${order.status === "cancelled" ? "checked" : ""}
            />
              <label for="javascript">Cancelled</label>
            </form>
            <button class="btn-update" form="${order._id}">Update</button>
            </div>
</div>`;
        cardsContainer.appendChild(card);
    });

    document.querySelectorAll(".btn-update").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target.form);

            const dataObj = JSON.stringify(
                Object.fromEntries(formData.entries())
            );

            const res = await fetch(
                `http://localhost:3000/api/v1/shipper/order/${e.target.form.id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: dataObj,
                }
            );
            const data = await res.json();
            console.log(data);
        });
    });

    // Update order status
    document.querySelectorAll(".order-form").forEach((form) => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
        });
    });
};
